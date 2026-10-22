import { postModel } from "../models/post.model.js";

export const createPost = async (req, res) => {
    try {
        const { title, content, user, tags } = req.body;
        const newPost = await postModel.create({
            title,
            content,
            user: req.user?.id || user, // Soporta middleware de auth o envío manual
            tags
        });

        return res.status(201).json({message: "Post creado satisfactoriamente!", data: newPost})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find()
            .populate('user', 'username email')
            .populate('tags');

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
        const { title, content, tags } = req.body;

        const updatedPost = await postModel.findByIdAndUpdate(
            id,
            { title, content, tags },
            { returnDocument: "after" },
        ).populate('user').populate('tags');

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

// PROFILE CONTROLLER
import { profileModel } from "../models/profile.model.js";

export const createProfile = async (req, res) => {
    try {
        const { first_name, last_name, bio, address, user } = req.body;
        const newProfile = await profileModel.create({
            first_name,
            last_name,
            bio,
            address,
            user: req.user?.id || user
        });

        return res.status(201).json({message: "Perfil creado satisfactoriamente!", data: newProfile})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await profileModel.find().populate('user', 'username email');

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
            { bio, address },
            { returnDocument: "after" },
        ).populate('user');

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

// TAG CONTROLLER
import { tagModel } from "../models/tag.model.js";

export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = await tagModel.create({name})

        return res.status(201).json({message: "Tag/Categoria creada satisfactoriamente!", data: newTag})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
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
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedTag = await tagModel.findByIdAndUpdate(
            id,
            {name},
            {returnDocument: "after"},
        );

        if(!updatedTag) {
            return res.status(404).json({message: "No se ha encontrado el tag o categoria."})
        };

        return res.status(200).json({
            data: updatedTag
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params

        const deletedTag = await tagModel.findByIdAndDelete(id);

        if(!deletedTag) {
            return res.status(404).json({message: "No se ha encontrado el tag o categoria."})
        };

        return res.status(200).json({message: "Tag/Categoria eliminada satisfactoriamente!", data: deletedTag});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};

// USER CONTROLLER
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

        return res.status(200).json({message: "Usuario eliminado satisfactoriamente!", data: deletedUser});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Error interno del servidor."});
    }
};