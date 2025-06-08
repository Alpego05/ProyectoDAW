const userService = require('./../services/userServices');
const moment = require("moment");
const jwt = require("jwt-simple");

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

        return res.status(201).json({
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

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const updatedUser = await updateUser(id, userData);
        res.status(200).json({
            message: updatedUser.message || 'Usuario actualizado correctamente',
            data: updatedUser
        });
    } catch (error) {
        console.error('Error in updateUserController:', error);

        let statusCode = 500;
        if (error.message.includes('no encontrado')) {
            statusCode = 404;
        } else if (error.message.includes('contraseña temporal no es correcta') ||
            error.message.includes('nueva contraseña debe ser diferente')) {
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            message: error.message,
            error: error.message
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { tempPassword, newPassword } = req.body;

        if (!tempPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Contraseña temporal y nueva contraseña son requeridas'
            });
        }

        if (tempPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: 'La nueva contraseña debe ser diferente a la temporal'
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'La nueva contraseña debe tener al menos 6 caracteres'
            });
        }

        const updatedUser = await userService.updateUser(id, {
            tempPassword,
            newPassword
        });

        res.status(200).json({
            message: updatedUser.message || 'Contraseña actualizada correctamente',
            data: {
                dni: updatedUser.dni,
                nombre: updatedUser.nombre,
                updatedAt: updatedUser.updatedAt
            }
        });
    } catch (error) {
        console.error('Error in changePassword controller:', error);

        let statusCode = 500;
        if (error.message.includes('no encontrado')) {
            statusCode = 404;
        } else if (error.message.includes('contraseña temporal no es correcta') ||
            error.message.includes('nueva contraseña debe ser diferente')) {
            statusCode = 400;
        }

        res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};


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

//creamos el token al iniciar el usuario
const createToken = (user) => {
    const payload = {
        usuarioId: user.id,
        createdAt: moment().unix(),
        expiredAt: moment().add(60, "minutes").unix()
    }
    return jwt.encode(payload, process.env.JWT_SECRET)
}


const login = async (req, res) => {
    try {
        const { dni, clave } = req.body;

        // Validación básica
        if (!dni || !clave) {
            throw new Error('Dni y contraseña son requeridos');
        }

        // Lógica de autenticación
        const authData = await userService.loginUser(dni, clave);

        return res.status(200).json({
            message: 'Login exitoso',
            token: createToken(authData),
            user: authData.id,
            rol: authData.tipo_usuario
        });
    } catch (error) {
        const errorMessage = error.message;

        if (errorMessage === 'Dni y contraseña son requeridos') {
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
};



module.exports = {
    getAllUsers,
    getUserById,
    login,
    updateUser,
    deleteUser, 
    changePassword
};