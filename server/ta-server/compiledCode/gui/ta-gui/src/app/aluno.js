"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aluno = void 0;
class Aluno {
    constructor() {
        this.metas = {}; // Alterado de Map<string,string> para um objeto simples
        this.clean();
    }
    clean() {
        this.nome = "";
        this.cpf = "";
        this.email = "";
        this.github = "";
        this.metas = {
            "requisitos": "",
            "gerDeConfiguracao": "",
            "gerencia de projetos": "", // NOVA META
            "testes": "" // NOVA META
        };
    }
    clone() {
        var aluno = new Aluno();
        aluno.copyFrom(this);
        return aluno;
    }
    copyFrom(from) {
        this.nome = from.nome;
        this.cpf = from.cpf;
        this.email = from.email;
        this.github = from.github;
        this.copyMetasFrom(from.metas);
    }
    // Este método agora lida com objetos JSON simples
    copyMetasFrom(from) {
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
exports.Aluno = Aluno;
//# sourceMappingURL=aluno.js.map