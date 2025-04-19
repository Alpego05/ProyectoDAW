const { User } = require('../database/models/userModel');
const jwt = require('jsonwebtoken');

const userService = {
    // Obtener todos los usuarios
    getAllUsers: async () => {
        try {
            return await User.findAll({
                attributes: { exclude: ['password'] }
            });
        } catch (error) {
            throw new Error(`Error al obtener usuarios: ${error.message}`);
        }
    },

    // Obtener un usuario por ID
    getUserById: async (id) => {
        try {
            const user = await User.findByPk(id, {
                attributes: { exclude: ['password'] }
            });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            return user;
        } catch (error) {
            throw new Error(`Error al obtener el usuario: ${error.message}`);
        }
    },

    // Verificar si existe un usuario con el email proporcionado
    checkUserExists: async (email) => {
        try {
            const user = await User.findOne({ where: { email } });
            return !!user;
        } catch (error) {
            throw new Error(`Error al verificar el usuario: ${error.message}`);
        }
    },

    // Crear un nuevo usuario
    createUser: async (userData) => {
        try {
            const { username, email, password, role } = userData;

            // Validar campos requeridos
            if (!username || !email || !password) {
                throw new Error('Faltan campos requeridos');
            }

            // Verificar si el usuario ya existe
            const existingUser = await User.findOne({ where: { email } });

            if (existingUser) {
                throw new Error('El correo ya está registrado');
            }

            const newUser = await User.create({
                username,
                email,
                password,
                role: role || 'patient'
            });

            // Excluir la contraseña de la respuesta
            const userWithoutPassword = {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                active: newUser.active,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt
            };

            return userWithoutPassword;
        } catch (error) {
            throw new Error(`Error al crear el usuario: ${error.message}`);
        }
    },

    // Actualizar un usuario
    updateUser: async (id, userData) => {
        try {
            const { username, email, password, role, active } = userData;

            const user = await User.findByPk(id);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            // Actualizar campos si existen en la solicitud
            if (username) user.username = username;
            if (email) user.email = email;
            if (password) user.password = password;
            if (role) user.role = role;
            if (active !== undefined) user.active = active;

            await user.save();

            // Excluir la contraseña de la respuesta
            const userWithoutPassword = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                active: user.active,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            };

            return userWithoutPassword;
        } catch (error) {
            throw new Error(`Error al actualizar el usuario: ${error.message}`);
        }
    },

    // Eliminar un usuario
    deleteUser: async (id) => {
        try {
            const user = await User.findByPk(id);

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            await user.destroy();
            return true;
        } catch (error) {
            throw new Error(`Error al eliminar el usuario: ${error.message}`);
        }
    },

    // Autenticar usuario
    authenticateUser: async (email, password) => {
        try {
            if (!email || !password) {
                throw new Error('Email y contraseña son requeridos');
            }

            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            const isPasswordValid = await user.validPassword(password);

            if (!isPasswordValid) {
                throw new Error('Contraseña incorrecta');
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            };
        } catch (error) {
            throw new Error(`Error en la autenticación: ${error.message}`);
        }
    }
};

module.exports = userService;