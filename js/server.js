const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();
const port = 3000;
app.use(cors());


//Configuración de la conexion a la base de datos
const db = mysql.createConnection({
    host:'localhost',
    user:'david',
    password:'david',
    database:'citas'
})

//Conectate a la base de datos
db.connect((err) =>{
    if(err){
        console.log('Error al conectar a la base de datos:', err);
    }else{
        console.log('Conexión exitosa a MySQL');
    }

});

app.use(bodyParser.json());

//Ruta para agregar una nueva cita
app.post('/api/citas',(req, res) => {
    const nuevaCita = req.body;
    console.log(nuevaCita);

  // Inserta la nueva cita en la base de datos
    db.query('INSERT INTO citas SET ?', nuevaCita, (error, results) => {
        if (error) {
        console.error('Error al agregar la cita:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } else {
        console.log('Cita agregada con éxito a MySQL');
        res.status(200).json({ message: 'Cita agregada correctamente' });
    }
  });
})
//Inicia el servidor
app.listen(port, () =>{
    console.log(`Servidor backend iniciado en ${port}`);
})