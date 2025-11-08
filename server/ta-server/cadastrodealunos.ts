import { Aluno } from '../../gui/ta-gui/src/app/aluno';

export class CadastroDeAlunos {
  alunos: Aluno[] = [];

  criar(aluno: Aluno): any {
    let e_cpf = this.alunos.find(a => a.cpf == aluno.cpf);
    // MODIFICADO: Verifica se o github não é vazio ANTES de procurar
    let e_git = (aluno.github && aluno.github.length > 0) ? this.alunos.find(a => a.github == aluno.github) : null;

    if (e_cpf) {
      return { "failure": "CPF duplicado" };
    }
    if (e_git) {
      return { "failure": "GitHub duplicado" };
    }

    var result = new Aluno();
    result.copyFrom(aluno);
    this.alunos.push(result);
    return result; // Sucesso
  }

  atualizar(aluno: Aluno): any {
    var result = this.alunos.find(a => a.cpf == aluno.cpf);
    if (result) {
      // MODIFICADO: Verifica se o github não é vazio ANTES de procurar
      const conflitoGithub = (aluno.github && aluno.github.length > 0) ? this.alunos.find(a => a.github == aluno.github && a.cpf != aluno.cpf) : null;
      if (conflitoGithub) {
           return { "failure": "GitHub duplicado" };
      }
      result.copyFrom(aluno);
    }
    return result; // Retorna o aluno atualizado ou undefined (se não encontrou)
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}
