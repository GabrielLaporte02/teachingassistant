import express = require('express');
import bodyParser = require("body-parser");

import {Aluno} from '../../gui/ta-gui/src/app/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

var app = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/alunos', function (req, res) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

// ***** ROTA POST MODIFICADA *****
app.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  var result = cadastro.criar(aluno); // 'result' pode ser Aluno ou {failure: ...}

  // Verifica se o 'result' é um objeto de falha
  if (result && result.failure) { 
    res.status(400).send(result); // Envia o erro (ex: {"failure": "CPF duplicado"})
  } else {
    res.send(result); // Envia o aluno (sucesso)
  }
})

// ***** ROTA PUT MODIFICADA *****
app.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  var result = cadastro.atualizar(aluno); // 'result' pode ser Aluno ou {failure: ...}

  // Verifica se o 'result' é um objeto de falha
  if (result && result.failure) {
     res.status(400).send(result); // Envia o erro (ex: {"failure": "GitHub duplicado"})
  } else if (result) {
     res.send(result); // Sucesso
  } else {
     // Se o 'result' for undefined (não encontrou o aluno)
     res.status(404).send({"failure": "Aluno não encontrado"});
  }
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
   server.close();
}

export { app, server, closeServer }
