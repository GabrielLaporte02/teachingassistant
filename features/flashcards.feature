Feature: Apresentação e coleta de respostas de flashcards
  Como aluno,
  Quero visualizar os flashcards e responder às perguntas apresentadas,
  Para testar meus conhecimentos e acompanhar meu progresso de aprendizado.


  Feature: Apresentação e coleta de respostas de flashcards
  Como aluno,
  Quero visualizar os flashcards e responder às perguntas apresentadas,
  Para testar meus conhecimentos e acompanhar meu progresso de aprendizado.

  Scenario: Aluno acerta a resposta de um flashcard
    Given que o aluno está visualizando um flashcard
    When o aluno clica em "Mostrar Resposta"
    And o aluno marca a resposta como "Eu acertei"
    Then o sistema deve registrar o acerto e avançar para o próximo flashcard.

  Scenario: Aluno erra a resposta de um flashcard
    Given que o aluno está visualizando um flashcard
    When o aluno clica em "Mostrar Resposta"
    And o aluno marca a resposta como "Eu errei"
    Then o sistema deve registrar o erro e avançar para o próximo flashcard.

    Scenario: Sistema não apresenta mais flashcards para a disciplina
  Given que o aluno revisou todos os flashcards de uma disciplina
  When o aluno tenta iniciar uma nova revisão
  Then o sistema deve notificar o aluno que não há mais flashcards disponíveis.

  Scenario: Tentativa de resposta sem visualizar a frente do flashcard
  Given que o aluno está visualizando a pergunta do flashcard
  When o aluno tenta marcar "Eu acertei" ou "Eu errei"
  Then o sistema deve impedir a ação
  And exibir uma mensagem pedindo para o aluno visualizar a resposta primeiro.

  Scenario: Aluno tenta responder a um flashcard com dados inválidos
  Given que o aluno está em um flashcard interativo
  When o aluno tenta submeter uma resposta com caracteres especiais
  Then o sistema deve bloquear a submissão
  And exibir uma mensagem de erro indicando formato inválido.

   Scenario: Sistema falha ao carregar o próximo flashcard
    Given que o aluno respondeu corretamente ao flashcard atual
    When o sistema tenta carregar o próximo flashcard
    Then o sistema deve exibir uma mensagem de erro amigável
    And o erro deve ser registrado no log do servidor.