import mongoose from "mongoose"

export const startDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mongoose");

        console.log("Conectado a la base de datos correctamente!")
    } catch (error) {
        console.log("No se pudo establecer la conexión con la base de datos.", error);
    }
};