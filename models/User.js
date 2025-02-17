const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});
const User = mongoose.model('User',userSchema); 



//Función para crear una nueva tarea.
        const crearNuevoUsuario= (name,email,password)=>{
 // Crear una nueva tarea
            const nuevoUsuario = new User({
                name: name,
                email: email,
                password:password
        });
  // Guardar el ordenador en la base de datos
         nuevoUsuario.save()
        .then(itemResult => console.log('item guardado:', itemResult))
        .catch(err => console.error('Error al guardar el item:', err));

        }



        const logIn =(email, password)=>{
            
                    //buscamos el primer registro
                    return Item.findByEmail(email)
                    .then( itemResult=>{
                    if(itemResult){

                       if(itemResult.password === password){
                        console.log('El primer item encontrado',itemResult)
                        return itemResult;
                       } else{
                        console.log('La contraseña no es correcta')
                        return null;
                       }
               
                    }else{
                      console.log('No se ha encontrado ningun registro con el id' +email)
                      return null;
                    }
                   
                    })
                    .catch(err=>console.error('Error al obtener el item',err));
                      throw err;
                     }


module.exports = User, crearNuevoUsuario, logIn;