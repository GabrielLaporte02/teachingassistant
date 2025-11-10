"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
exports.closeServer = closeServer;
const express = require("express");
const bodyParser = require("body-parser");
const cadastrodealunos_1 = require("./cadastrodealunos");
var app = express();
exports.app = app;
var cadastro = new cadastrodealunos_1.CadastroDeAlunos();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.get('/alunos', function (req, res) {
    res.send(JSON.stringify(cadastro.getAlunos()));
});
app.post('/aluno', function (req, res) {
    var aluno = req.body;
    var result = cadastro.criar(aluno);
    if (result && result.failure) {
        res.status(400).send(result);
    }
    else {
        res.send(result);
    }
});
app.put('/aluno', function (req, res) {
    var aluno = req.body;
    var result = cadastro.atualizar(aluno);
    if (result && result.failure) {
        res.status(400).send(result);
    }
    else if (result) {
        res.send(result);
    }
    else {
        res.status(404).send({ "failure": "Aluno não encontrado" });
    }
});
// ***** ROTA DELETE ADICIONADA *****
app.delete('/aluno/:cpf', function (req, res) {
    var cpf = req.params.cpf; // Pega o CPF da URL
    var result = cadastro.remover(cpf);
    if (result) {
        res.send(result); // Sucesso (envia o aluno removido)
    }
    else {
        res.status(404).send({ "failure": "Aluno não encontrado" });
    }
});
var server = app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
exports.server = server;
function closeServer() {
    server.close();
}
//# sourceMappingURL=ta-server.js.map