import { matchedData } from "express-validator";
import { profileModel } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
    try {
        const { first_name, last_name, bio, address, user } = matchedData(req);
        const newProfile = await profileModel.create({
            first_name,
            last_name,
            bio,
            address,
            user: req.user?.id || user
        });

        return res.status(201).json({ message: "Perfil creado satisfactoriamente!", data: newProfile });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileModel.find().populate('user', 'username email');
        return res.status(200).json({ data: profiles });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { bio, address } = matchedData(req);

        const updatedProfile = await profileModel.findByIdAndUpdate(
            id,
            { bio, address },
            { returnDocument: "after" },
        ).populate('user');

        if (!updatedProfile) {
            return res.status(404).json({ message: "No se ha encontrado el perfil." });
        };

        return res.status(200).json({ data: updatedProfile });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProfile = await profileModel.findByIdAndDelete(id);

        if (!deletedProfile) {
            return res.status(404).json({ message: "No se ha encontrado el perfil." });
        };

        return res.status(200).json({ message: "Perfil eliminado satisfactoriamente!", data: deletedProfile });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};