export class Aluno {
  nome: string;
  cpf: string;
  email: string;
  github: string; 
  metas: any = {}; // Alterado de Map<string,string> para um objeto simples

  constructor() {
    this.clean();
  }

  clean(): void {
    this.nome = "";
    this.cpf = "";
    this.email = "";
    this.github = ""; 
    this.metas = { 
        "requisitos": "",
        "gerDeConfiguracao": "",
        "testes": ""
    };
  }

  clone(): Aluno {
    var aluno: Aluno = new Aluno();
    aluno.copyFrom(this);
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.email = from.email;
    this.github = from.github; 
    this.copyMetasFrom(from.metas);
  }

  // Este método agora lida com objetos JSON simples
  copyMetasFrom(from: any): void {
    this.metas = {}; // Limpa
    if (from) {
        for (const key in from) {
            if (from.hasOwnProperty(key)) {
                this.metas[key] = from[key]; // Copia os valores do objeto
            }
        }
    }
  }
}
