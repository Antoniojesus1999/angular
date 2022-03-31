let express = require('express'); // importamos express
let path = require('path') // importamos path
let app = express();// importamos cargamos nuestro aplicación

let port = 8089; // configuramos el puerto

app.use(express.static('angular')); // marcamos nuestra aplicación
app.get('*', (req, res, next) => { // marcamos donde esta el index.html
res.sendFile(path.resolve('angular/index.html'));
});

//creamos un log para cuando arranquemos
app.listen(port,()=>{
    console.log('El servidor express se ha iniciado correctamente en le puerto '+port);
})