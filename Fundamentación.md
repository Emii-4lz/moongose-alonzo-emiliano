--- Modelo de "Profile" embebido ---
 Decidí meter la dirección dentro del modelo de perfil ya que no consideré necesario crear una colección aparte, ya que no es un dato que tenga valor propio fuera del perfil del usuario, el cual ya contiene otros datos personales. Gracias a esto, se ahorra tiempo a la hora de realizar consultas.

--- Referenciado: "Profile" y "User" ---
 Supuse que una persona puede registrarse con sus datos personales, luego tener UN SOLO usuario en el cual se guardaran los posts (publicaciones) de su propio blog personal. Esto a su vez, he de admitir que la estructura de "Blog personal con User, Profile, Tags y Posts" fue reutilizado de un trabajo anterior que se encuentra en mi perfil de Github, reemplazando "Articles" por Posts.

Referenciado: "User" y "Post"
 En Post se referencia a su usuario creador (bajo el alias de "author"), esto permite que UN SOLO usuario pueda tener varios POSTS (publicaciones).
 
Referenciado: "Tag" y "Post"
 En Post, debajo de author. Se encuentra un array que apunta a "Tags". Esto permite que una publicación pueda contener uno o varios tags/categorias y que estas mismas puedan ser compartidas por varios posts, a su vez, permitiendo que los tags existan de forma independiente (Es aca donde se aplica .populate() para traerlas cuando sea necesario).


 --- INVESTIGACIÓN ---
 ¿Cómo se utiliza el populate desde colecciones que no tienen referencias?
  Mediante un "virtual populate", tomemos de ejemplo el modelo de Tag, ya que no tiene campos para guardar las IDs de los posts. Para poder realizar una consulta y que me devuelva los posts correspondientes, se debe hacer lo siguiente:

    ----------------------------------------------------------------------------------
    tagSchema.virtual('posts', {
    ref: 'Post',             // Modelo al que apunta
    localField: '_id',       // Campo en Tag
    foreignField: 'tags'     // Campo en Post que contiene el ID del tag
    });

// Importante para que Mongoose incluya los virtuals al convertir a JSON/Object:
tagSchema.set('toObject', { virtuals: true });
tagSchema.set('toJSON', { virtuals: true });
    ----------------------------------------------------------------------------------
    A tener en cuenta: tras poner eso dentro del modelo, en el controlador hay que añadir a "getAllTags" la propiedad de .populate()

 * Eliminación lógica y eliminación en cascada
  La eliminación LÓGICA NO ELIMINA fisicamente el documento, si no que actualiza un estado denominado "isDeleted" a true si dicho documento es "eliminado". Luego, a la hora de realizar un find(), se filtra para incluir aquellos elementos que contengan "isDeleted: false".
  La eliminación en CASCADA elimina fisicamente el documento, no solo este, si no que tambien elimina aquellos documentos asociados a este mismo. Es una eliminación en "cadena", pues al borrar por ejemplo un usuario, se eliminan todos sus posts a la vez.

 * Endpoint para agregar un nuevo vinculo en una relación M:M
    Esto es hecho utilizando el operador "$addToSet" dentro del controlador del modelo deseado. Tomemos por ejemplo, otra vez, a Tag:
    ----------------------------------------------------------------------------------
    import { postModel } from "../models/post.model.js";

export const addTagToPost = async (req, res) => {
    try {
        const { postId, tagId } = req.params;

        // $addToSet añade el tag al array 'tags' solo si no existe previamente
        const updatedPost = await postModel.findByIdAndUpdate(
            postId,
            { $addToSet: { tags: tagId } },
            { returnDocument: "after" }
        ).populate('tags');

        if (!updatedPost) {
            return res.status(404).json({ message: "Post no encontrado." });
        }

        return res.status(200).json({
            message: "¡Etiqueta vinculada al post exitosamente!",
            data: updatedPost
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
};
    ----------------------------------------------------------------------------------