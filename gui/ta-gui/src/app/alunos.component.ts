import { Component, OnInit, NgZone } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})

export class AlunosComponent implements OnInit {

   constructor(private alunoService: AlunoService, private zone: NgZone) {}

   aluno: Aluno = new Aluno();
   alunos: Aluno[];
   cpfduplicado: boolean = false;
   githubduplicado: boolean = false;

   criarAluno(a: Aluno): void {
     this.cpfduplicado = false;
     this.githubduplicado = false;

     this.alunoService.criar(a)
        .then(ab => {
           if (ab) {
              this.alunos.push(ab);
              this.aluno = new Aluno();
           }
        })
        .catch(erro => {
         

            this.zone.run(() => {

              if (erro.failure === "CPF duplicado") {
                  this.cpfduplicado = true;
              } else if (erro.failure === "GitHub duplicado") {
                  this.githubduplicado = true;
              } else {
                  alert("Erro desconhecido ao tentar criar aluno");
              }
            });
        });
   }

   // ***** MÉTODO 'removerAluno' ADICIONADO *****
   removerAluno(aluno: Aluno): void {
     this.alunoService.remover(aluno.cpf)
        .then(a => {
           if (a) {
             // Remove o aluno do array local (para a UI atualizar)
             this.alunos = this.alunos.filter(al => al.cpf !== a.cpf);
           } else {
             alert("Aluno não removido (erro no servidor).");
           }
        })
        .catch(erro => {
            alert(erro.message || "Erro desconhecido ao tentar remover aluno");
        });
   }

   onMove(): void {
      this.cpfduplicado = false;
      this.githubduplicado = false;
   }

   ngOnInit(): void {
     this.alunoService.getAlunos()
         .then(as => this.alunos = as)
         .catch(erro => alert(erro));
   }

}

