// Importa el módulo 'mysql2/promise'. Este módulo proporciona una interfaz promisificada para interactuar con MySQL.
const mysql = require('mysql2/promise');

// Define una función asíncrona llamada 'conectarBaseDeDatos'.
async function conectarBaseDeDatos() {
    try {
        // Intenta crear una conexión con la base de datos MySQL.
        // Los detalles de la conexión se pasan como un objeto al método 'createConnection'.
        const conexion = await mysql.createConnection({
        // El host de la base de datos. Si tu base de datos se encuentra en otro servidor, debes cambiar 'localhost' por la dirección IP o el nombre del host de ese servidor.
        host:'localhost', 
        // El nombre de usuario de la base de datos. Cambia 'root' por tu nombre de usuario.
        user: 'root',    
        // La contraseña de la base de datos. Cambia '' por tu contraseña.
        password: '',
        // El nombre de la base de datos a la que te quieres conectar. Cambia 'pago_verificado_v03' por el nombre de tu base de datos.
        database: 'MediDexDB', 
      });
      // Si la conexión es exitosa, imprime un mensaje en la consola.
      console.log('Conexión exitosa a la base de datos MySQL.');
      // Devuelve la conexión.
      return conexion;
    } catch (error) {
      // Si ocurre un error durante la conexión, imprime el error en la consola.
      console.error('Error al conectar con la base de datos:', error);
    }
};

// Exporta la función 'conectarBaseDeDatos' para que pueda ser utilizada en otros módulos.
module.exports = {
    conectarBaseDeDatos,
};