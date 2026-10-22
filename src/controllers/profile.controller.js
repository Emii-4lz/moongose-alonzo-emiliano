import { profileModel } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
    try {
        const { first_name, last_name, bio, address } = req.body;
        const newProfile = await profileModel.create({first_name, last_name, bio, address})

        return res.status(201).json({message: "Perfil creado satisfactoriamente!", data: newProfile})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const getAllProfiles = async (req, res) => {
        try {
            const profiles = await profileModel.find()

            return res.status(200).json({
                data: profiles
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Error interno del servidor."});
        }
    };

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { bio, address } = req.body;

        const updatedProfile = await profileModel.findByIdAndUpdate(
            id,
            {bio, address},
            {returnDocument: "after"},
        );

        if(!updatedProfile) {
            return res.status(404).json({message: "No se ha encontrado el perfil."})
        };

        return res.status(200).json({
            data: updatedProfile
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params

        const deletedProfile = await profileModel.findByIdAndDelete(id);

        if(!deletedProfile) {
            return res.status(404).json({message: "No se ha encontrado el perfil."})
        };

        return res.status(200).json({message: "Perfil eliminado satisfactoriamente!", data: deletedProfile});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};