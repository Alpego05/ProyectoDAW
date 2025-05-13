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
        const updatedUser = await userService.updateUser(
            req.params.id,
            req.body
        );
        if (updatedUser) {
            res.status(201).json(updatedUser);
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

//creamos el token al iniciar el usuario
const createToken=(user) => { 
  const payload={
    usuarioId:user.id,
    createdAt:moment().unix(),
    expiredAt:moment().add(60,"minutes").unix()
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
            message: "Error en el servidor: " + errorMessage
        });
    }
};



module.exports = {
    getAllUsers,
    getUserById,
    login,
    updateUser,
    deleteUser
};