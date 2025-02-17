const mongoose = require('mongoose');

  const itemSchema = new mongoose.Schema({
    nombre:String,
    descripcion:String,
    tarea_nota:Number,
    terminada:Number
  })
  const Item = mongoose.model('item',itemSchema,'items')



  //FUNCIONES CRUD ITEMS
  //---------------------------
  //Función que obtiene el primer registro de la colección en mongoDB
  const buscarPrimero =()=>{
    
    return Item.findOne()
    .then( itemResult=>{
    if(itemResult){
      console.log('La primera tarea encontrada',itemResult)
      return itemResult
    }else{
      console.log('No se ha encontrado ningun registro')
      return null
    }
   
    })
    .catch(err=>console.error('Error al obtener la tarea',err));
      throw err;
     }
     //----------------------------------------------------------


  //Función que obtiene todos los registro de la colección en mongoDB
     const buscarTodos =()=>{
    
        //buscamos todos registro
       return Item.find()
        .then( itemsResult=>{
        if(itemsResult.length > 0){
          console.log('items encontrados',itemsResult)
          return itemsResult;
        }else{
          console.log('No se ha encontrado ningun registro')
          return null;
        }
       
        })
        .catch(err=>{console.error('Error al obtener los items',err);
          throw err;
        });
       
         }

         const buscarPorId =(id)=>{
    
            //buscamos el primer registro
            return Item.findById(id)
            .then( itemResult=>{
            if(itemResult){
              console.log('El primer item encontrado',itemResult)
              return itemResult;
            }else{
              console.log('No se ha encontrado ningun registro con el id' +id)
              return null;
            }
           
            })
            .catch(err=>console.error('Error al obtener el item',err));
              throw err;
             }


             const buscarPorNombre =(nombre)=>{
    
              return Item.find({nombre:{$regex: nombre, $options: 'i' }})
              .then( itemResult=>{
              if(itemResult.length>0){
                console.log('items encontrado',itemResult)
                return itemResult;
              }else{
                console.log('No se ha encontrado items')
                return null;
              }
             
              })
              .catch(err=>console.error('Error al obtener items',err));
                throw err;
         }     

        const buscarTerminadas =(estadoTarea)=>{
    
                return Item.find({terminada:{estadoTarea}})
                .then( itemResult=>{
                if(itemResult.length>0){
                  console.log('items encontrado',itemResult)
                  return itemResult;
                }else{
                  console.log('No se ha encontrado items')
                  return null;
                }
               
                })
                .catch(err=>console.error('Error al obtener items',err));
                  throw err;
           }


//Función para crear una nueva tarea.
        const crearNuevoItem= (nombre,descripcion,tarea_nota,terminada)=>{
 // Crear una nueva tarea
            const nuevoItem = new Item({
             nombre: nombre,
             descripcion: descripcion,
             tarea_nota:tarea_nota,
             terminada:terminada
        });
  // Guardar el ordenador en la base de datos
        nuevoItem.save()
        .then(itemResult => console.log('item guardado:', itemResult))
        .catch(err => console.error('Error al guardar el item:', err));

        }

const actualizarEstadoTarea = (idItem, estadoTarea)=>{
    //le pasamos el idItem, le pasamos el objeto precio con nuevo precio
    //{new:true} para devolver el objeto actualizado
   return Item.findByIdAndUpdate(idItem, { terminada: estadoTarea }, { new: true })
  .then(itemResult => {
    if (itemResult) {
      console.log('item actualizado:', itemResult);
      return itemResult;
    } else {
      console.log('No se encontró ningún item con ese ID.');
      return null;
    }
  })
  .catch(err => console.error('Error al actualizar el item:', err));
     throw err;

}

const actualizarNombreTarea = (idItem, nombreTarea)=>{
    //le pasamos el idItem, le pasamos el objeto precio con nuevo precio
    //{new:true} para devolver el objeto actualizado
    return Item.findByIdAndUpdate(idItem, { nombre: nombreTarea }, { new: true })
  .then(itemResult => {

    if (itemResult) {

      console.log('item actualizado:', itemResult);
      return itemResult;

    } else {

      console.error('No se encontró ningún item con ese ID.');
      return null

    }
  })
  .catch(err => console.error('Error al actualizar item:', err));
    throw err;

}       

const actualizarDescripcionTarea = (idItem, descripcionTarea)=>{
    //{new:true} para devolver el objeto actualizado
   return Item.findByIdAndUpdate(idItem, { descripcion: descripcionTarea }, { new: true })
  .then(itemResult => {
    if (itemResult) {

      console.log('item actualizado:', itemResult);
      return itemResult;

    } else {

      console.log('No se encontró ningún item con ese ID.');
      return null;
    }
  })
  .catch(err => console.error('Error al actualizar el item:', err));
  throw err;
}      



const borrarTarea = (idItemDelete)=>{
  return Item.findByIdAndDelete(idItemDelete)
 .then(itemDelete => {
   if (itemDelete) {
     console.log('Item eliminado:', itemDelete);
     return itemDelete
   } else {
     console.log('No se encontró ningún item con ese ID.');
     return null
   }
 })
 .catch(err => console.error('Error al eliminar el item:', err))
 throw err;

}



     module.exports = {crearNuevoItem,Item,buscarPrimero, buscarPorNombre, buscarTodos,buscarPorId, buscarTerminadas, actualizarNombreTarea,actualizarDescripcionTarea, actualizarEstadoTarea, borrarTarea}