import { Component, OnInit, NgZone } from '@angular/core'; // 1. IMPORTAR NgZone
import { NgModule } from '@angular/core';

import { Aluno } from './aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
   // 2. INJETAR NgZone
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
            // 3. O .catch() agora lê o JSON de erro enviado pelo serviço

            // 'erro' é o JSON: { failure: "..." }
            // 4. USAR NgZone para forçar a atualização da tela
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

