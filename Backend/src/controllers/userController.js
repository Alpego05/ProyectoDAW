const userService = require('./../services/userServices');
const bcrypt = require("bcrypt");

//Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        return res.status(200).json({
            data: users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);

        return res.status(200).json({
            data: user
        });
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const userData = {
            id: req.body.id, 
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'patient',
        };

        const createdUser = await userService.createUser(userData);

        const { password, ...userWithoutPassword } = createdUser.toJSON();

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: userWithoutPassword,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Error al crear el usuario',
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.editUser(
            req.params.id,
            req.body
        );
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const deleted = await userService.deleteUser(req.params.id);
        if (deleted) {
            res.status(204).json({ message: "Usuario eliminado" });
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Login de usuario
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const authData = await userService.authenticateUser(email, password);

        return res.status(200).json({
            message: 'Login exitoso',
            token: authData.token,
            user: authData.user
        });
    } catch (error) {
        const errorMessage = error.message;

        if (errorMessage === 'Email y contraseña son requeridos') {
            return res.status(400).json({
                success: false,
                message: errorMessage
            });
        }

        if (errorMessage === 'Usuario no encontrado') {
            return res.status(404).json({
                success: false,
                message: errorMessage
            });
        }

        if (errorMessage === 'Contraseña incorrecta') {
            return res.status(401).json({
                success: false,
                message: errorMessage
            });
        }

        return res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    login,
    updateUser,
    deleteUser
};