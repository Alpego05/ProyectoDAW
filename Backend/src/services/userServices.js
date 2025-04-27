const User = require('../database/models/UserModel');
const jwt = require('jsonwebtoken');
const db = require('../database/models/associations');


// Obtener todos los usuarios
const getAllUsers = async () => {
    try {
        return await User.findAll({
            attributes: { exclude: ['password'] }
        });
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error.message}`);
    }
}

// Obtener un usuario por ID
const getUserById = async (id) => {
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
}

// Verificar si existe un usuario con el email proporcionado
const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ where: { email } });
        return !!user;
    } catch (error) {
        throw new Error(`Error al verificar el usuario: ${error.message}`);
    }
}

// Crear un nuevo usuario
const createUser = async (userData) => {
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
}

// Actualizar un usuario
const updateUser = async (id, userData) => {
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
}

// Eliminar un usuario
const deleteUser = async (id) => {
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
}

const loginUser = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email: email,
            },
        });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        return user;
    } catch (error) {
        throw new Error("Error al logear el usuario: " + error.message);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    deleteUser,
    createUser,
    updateUser,
    loginUser,
}