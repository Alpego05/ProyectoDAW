const userService = require('./../services/userServices');

const userController = {
    // Obtener todos los usuarios
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            return res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Obtener un usuario por ID
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);

            return res.status(200).json({
                success: true,
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
    },

    // Crear un nuevo usuario
    createUser: async (req, res) => {
        try {
            const userData = req.body;
            const newUser = await userService.createUser(userData);

            return res.status(201).json({
                success: true,
                message: 'Usuario creado correctamente',
                data: newUser
            });
        } catch (error) {
            if (error.message === 'Faltan campos requeridos' ||
                error.message === 'El correo ya está registrado') {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    },

    // Actualizar un usuario
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const userData = req.body;

            const updatedUser = await userService.updateUser(id, userData);

            return res.status(200).json({
                success: true,
                message: 'Usuario actualizado correctamente',
                data: updatedUser
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
    },

    // Eliminar un usuario
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);

            return res.status(200).json({
                success: true,
                message: 'Usuario eliminado correctamente'
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
    },

    // Login de usuario
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const authData = await userService.authenticateUser(email, password);

            return res.status(200).json({
                success: true,
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
};

module.exports = userController;