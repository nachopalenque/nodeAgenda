const express = require('express')
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const moduloItems = require('./models/items');
const moduloUsers = require('./models/User');

const mongoose = require('mongoose');
//Cargamos la configuracion establecida en el fichero oculto para las variables de entorno
require('dotenv').config();

//Establecemos la conexión con la base de datos mediante la cadena de conexión establecida en el fichero de variables de entorno
mongoose.connect(process.env.Database_URL)
  .then(() => console.log('Connected!'));

app.listen(3000)

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('index')
})

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());


  // Registrar Usuario
  app.post("/register", async (req, res) => {
    try{
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      moduloUsers.crearNuevoUsuario(req.body.name,req.body.email,hashedPassword);
      res.send('index');

    }catch(error){
      console.error(error);
      res.status(500).send('Hubo un error al registrar el usuario');
    }
  });

    // Registrar Usuario
    app.post("/login", async (req, res) => {
      try{

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        moduloUsers.logIn(req.body.email,hashedPassword)
        .then(item=>res.json(item))
        .catch(err=>res.status(500).json({"error":err}))
        res.status(200).send('Usuario logeado correctamente');
  
      }catch(error){
        console.error(error);
        res.status(500).send('Hubo un error al registrar el usuario');
      }
    });



  // Obtener todos los ítems
  app.get("/items", (req, res) => {
    moduloItems.buscarTodos()
    .then(items=>res.json(items))
    .catch(err=>res.status(500).json({"error":err}))
  });
  
  
  // Obtener un ítem por ID
  app.get("/items/:id", (req, res) => {
    const itemId = req.params.id;
    moduloItems.buscarPorId(itemId)
    .then(item=>res.json(item))
    .catch(err=>res.status(500).json({"error":err}))
  });

    // Obtener un ítem por nombre
    app.get("/items/nombre/:nombre", (req, res) => {
      const nombre = req.params.nombre;
      moduloItems.buscarPorNombre(nombre)
      .then(item=>res.json(item))
      .catch(err=>res.status(500).json({"error":err}))
    });

  // Crear un nuevo ítem

app.post("/items", (req, res) => {
    moduloItems.crearNuevoItem(req.body.nombre,req.body.descripcion,req.body.tarea_nota,req.body.terminada)
    res.status(201);
  });


// Actualizar un ítem existente
app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  item = req.body;
  //res.send(ordenador);
  moduloItems.actualizarElemento(itemId,item)
  .then(
    elementoAtualizado=>res.status(200).json(elementoAtualizado)
  )
  .catch(err=>res.status(500).send("error al actualizar el ordenador"))

});


// Eliminar un ítem
app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  moduloItems.borrarTarea(itemId)
  .then(item=>res.status(200).json(item))
  .catch(err=>res.status(500).send("Error"))
});
