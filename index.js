const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');

app.use(cors());

app.get('/capak',function(req,res){
    fs.readFile("./capak.json",function(err, data) {
        res.send(JSON.parse(data));
    });
});


app.get('/capak/:name', function(req,res){
    const name = req.params.name;
    fs.readFile("./capak.json",function(err, data) {
        const capak = (JSON.parse(data));
        const capaByname = capak.find((capa) => capa.name === name);
        if (!capaByname){
            res.status(404);
            res.send({error:`name: ${name} Not Found`});
            return;
        }
        res.status(200);
        res.send(capaByname);
    });
});

app.listen(9000);