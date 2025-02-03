const express = require('express')
const app = express()
const moduloItems = require('./models/items');
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('index')
})

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());



app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)


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

    // Obtener un ítem por ID
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
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: "Ítem no encontrado" });
  }
});

// Eliminar un ítem
app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Ítem no encontrado" });
  }
});
