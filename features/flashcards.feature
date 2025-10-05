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