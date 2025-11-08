import { Aluno } from '../../gui/ta-gui/src/app/aluno';

export class CadastroDeAlunos {
  alunos: Aluno[] = [];

  criar(aluno: Aluno): any {
    let e_cpf = this.alunos.find(a => a.cpf == aluno.cpf);
    
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
    return result; 
  }

  atualizar(aluno: Aluno): any {
    var result = this.alunos.find(a => a.cpf == aluno.cpf);
    if (result) {

      const conflitoGithub = (aluno.github && aluno.github.length > 0) ? this.alunos.find(a => a.github == aluno.github && a.cpf != aluno.cpf) : null;
      if (conflitoGithub) {
           return { "failure": "GitHub duplicado" };
      }
      result.copyFrom(aluno);
    }
    return result; 
  }

  // ***** MÉTODO 'remover' ADICIONADO *****
  remover(cpf: string): Aluno {
    var result = this.alunos.find(a => a.cpf == cpf);
    if (result) {
      // Filtra o array, removendo o aluno com o CPF correspondente
      this.alunos = this.alunos.filter(a => a.cpf != cpf);
    }
    return result; // Retorna o aluno que foi removido (ou undefined se não achou)
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}
