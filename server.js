const express = require('express');
const path = require('path');

const app = express();

const server = require('http').createServer(app);

const io  = require('socket.io')(server);


app.use(express.static(path.join(__dirname,'frontend')));

app.set('views',path.join(__dirname,'frontend'));

app.engine('html',require('ejs').renderFile);

app.set('view engine','html');

app.use('/',(req,res)=>{
    res.render('index.html');
});

let mensagens = [];

io.on('connection',socket=>{
    //console.log(`socket connectado: ${socket.id}`);

    socket.emit('mensagensAnteriores',mensagens);

    socket.on('enviaMensagem',data=>{
        mensagens.push(data);
        socket.broadcast.emit('mensagemRecebida',data);
    });
});

server.listen(3000);