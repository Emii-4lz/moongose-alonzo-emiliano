import { postModel } from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await postModel.create({title, content})

        return res.status(201).json({message: "Post creado satisfactoriamente!", data: newPost})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const getAllPosts = async (req, res) => {
        try {
            const posts = await postModel.find()

            return res.status(200).json({
                data: posts
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "Error interno del servidor."});
        }
    };

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatedPost = await postModel.findByIdAndUpdate(
            id,
            {title, content},
            {returnDocument: "after"},
        );

        if(!updatedPost) {
            return res.status(404).json({message: "No se ha encontrado el post."})
        };

        return res.status(200).json({
            data: updatedPost
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params

        const deletedPost = await postModel.findByIdAndDelete(id);

        if(!deletedPost) {
            return res.status(404).json({message: "No se ha encontrado el post."})
        };

        return res.status(200).json({message: "Post eliminado satisfactoriamente!", data: deletedPost});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};