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

/*
// Crear un nuevo usuario
const createUser = async (userData) => {
    try {
        const { id, username, email, password, role } = userData;

        // Validate required fields
        if (!id || !username || !email || !password) {
            const error = new Error('Faltan campos requeridos');
            error.statusCode = 400;
            throw error;
        }

        // Validar formato del DNI
        if (!/^\d{8,10}$/.test(id)) {
            const error = new Error('El DNI debe contener entre 8 y 10 dígitos numéricos');
            error.statusCode = 400;
            throw error;
        }

        // Check if user already exists (by email or DNI)
        const existingUserEmail = await User.findOne({
            where: { email }
        });

        const existingUserDNI = await User.findOne({
            where: { id }
        });

        if (existingUserEmail) {
            const error = new Error('El correo ya está registrado');
            error.statusCode = 409;  // Conflict
            throw error;
        }

        if (existingUserDNI) {
            const error = new Error('El DNI ya está registrado');
            error.statusCode = 409;  // Conflict
            throw error;
        }

        // Create new user (password will be hashed by hook)
        const newUser = await User.create({
            id,  // DNI como identificador
            username,
            email,
            password,
            role: role || 'patient'
        });

        return newUser;
    } catch (error) {
        // Add status code if not already present
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        throw error;
    }
}
*/

// Actualizar un usuario
const updateUser = async (id, userData) => {
    try {
        const { nombre, apellido1, apellido2, clave, email } = userData;

        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Actualizar campos si existen en la solicitud
        if (nombre) user.nombre = nombre;
        if (apellido1) user.apellido1 = apellido1;
        if (apellido2) user.apellido2 = apellido2;
        if (clave) user.clave = clave;
        if (email) user.email = email;
        
        await user.save();

        // Excluir la contraseña de la respuesta
        const userWithoutPassword = {
            name: user.nombre,
            apellido1: user.apellido1,
            apellido2: user.apellido2,
            email: user.email,
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
    updateUser,
    loginUser,
}