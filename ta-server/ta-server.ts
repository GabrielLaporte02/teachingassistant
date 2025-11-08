import express = require('express');

var taserver = express();

var alunos = [{nome:'Paulo',cpf:'683',email:'phmb@cin.br',metas:{'requisitos':'MA'}},{nome:'Mariana',cpf:'456',email:'@mcb@cin.br',metas:{'requisitos':'MPA'}}];

taserver.get('/', function (req, res) {
  // --- COPIE AS LINHAS ABAIXO NO VS CODE ---
  console.log(`[DEPURAÇÃO] Requisição recebida. Método: ${req.method}`);
  console.log(`[DEPURAÇÃO] IP do Cliente: ${req.ip}`);
  console.log('------------------------------------');
  // ------------------------------------------
  res.send(alunos);
})

taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})


