//const https = require('https');
const app = require('./app')
const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{
    console.log('Listening on '+ PORT)
})

function normalizePort(port){
    if(port){
        if (!isNaN(port))
            return port;
        else return port.toString();
    }
    else throw new Error('PORT NUMBER NOT PROVIDED')
}

