"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastroDeAlunos = void 0;
const aluno_1 = require("../../gui/ta-gui/src/app/aluno");
class CadastroDeAlunos {
    constructor() {
        this.alunos = [];
    }
    criar(aluno) {
        let e_cpf = this.alunos.find(a => a.cpf == aluno.cpf);
        let e_git = (aluno.github && aluno.github.length > 0) ? this.alunos.find(a => a.github == aluno.github) : null;
        if (e_cpf) {
            return { "failure": "CPF duplicado" };
        }
        if (e_git) {
            return { "failure": "GitHub duplicado" };
        }
        var result = new aluno_1.Aluno();
        result.copyFrom(aluno);
        this.alunos.push(result);
        return result;
    }
    atualizar(aluno) {
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
    remover(cpf) {
        var result = this.alunos.find(a => a.cpf == cpf);
        if (result) {
            // Filtra o array, removendo o aluno com o CPF correspondente
            this.alunos = this.alunos.filter(a => a.cpf != cpf);
        }
        return result; // Retorna o aluno que foi removido (ou undefined se não achou)
    }
    getAlunos() {
        return this.alunos;
    }
}
exports.CadastroDeAlunos = CadastroDeAlunos;
//# sourceMappingURL=cadastrodealunos.js.map