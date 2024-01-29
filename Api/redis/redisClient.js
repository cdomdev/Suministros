const redis = require('redis')

// cliente
const client = redis.createClient()

// eventos y conexion 

client.on('connect', () => {
    console.log('Conectado a Redis...');
});

client.on('error', (error)=>{
    console.error('Error en redis', error)
} )

module.exports = client;