import { matchedData } from "express-validator";
import { tagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
    try {
        const { name } = matchedData(req);
        const newTag = await tagModel.create({ name })

        return res.status(201).json({ message: "Tag/Categoria creada satisfactoriamente!", data: newTag })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const getAllTags = async (req, res) => {
    try {
        const tags = await tagModel.find()

        return res.status(200).json({
            data: tags
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = matchedData(req);

        const updatedTag = await tagModel.findByIdAndUpdate(
            id,
            { name },
            { returnDocument: "after" },
        );

        if (!updatedTag) {
            return res.status(404).json({ message: "No se ha encontrado el tag o categoria." })
        };

        return res.status(200).json({
            data: updatedTag
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params

        const deletedTag = await tagModel.findByIdAndDelete(id);

        if (!deletedTag) {
            return res.status(404).json({ message: "No se ha encontrado el tag o categoria." })
        };

        return res.status(200).json({ message: "Tag/Categoria eliminada satisfactoriamente!", data: deletedTag });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};