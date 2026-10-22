import { userModel } from "../models/user.model.js";

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = await userModel.create({username, email, password})

        return res.status(201).json({message: "Usuario creado satisfactoriamente!", data: newUser})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const getAllUsers = async (req, res) => {
        try {
            const users = await userModel.find()

            return res.status(200).json({
                data: users
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Error interno del servidor."});
        }
    };

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            {username},
            {returnDocument: "after"},
        );

        if(!updatedUser) {
            return res.status(404).json({message: "No se ha encontrado el usuario."})
        };

        return res.status(200).json({
            data: updatedUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const deletedUser = await userModel.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.status(404).json({message: "No se ha encontrado el usuario."})
        };

        return res.status(200).json({message: "Usuario eliminada satisfactoriamente!", data: deletedUser});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};