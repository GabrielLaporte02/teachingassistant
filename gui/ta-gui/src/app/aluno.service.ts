import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';


import { Aluno } from './aluno';

@Injectable()
export class AlunoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(aluno: Aluno): Promise<Aluno> {
    return this.http.post(this.taURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})
           .toPromise()
           .then(res => res.json() as Aluno) // O backend retorna o Aluno no sucesso
           .catch(this.tratarErro); // O tratarErro agora vai repassar o JSON
  }

  atualizar(aluno: Aluno): Promise<Aluno> {
    return this.http.put(this.taURL + "/aluno",JSON.stringify(aluno), {headers: this.headers})
           .toPromise()
           .then(res => res.json() as Aluno) // Retorna o aluno atualizado no sucesso
           .catch(this.tratarErro);
  }

  getAlunos(): Promise<Aluno[]> {
    return this.http.get(this.taURL + "/alunos")
               .toPromise()
               .then(res => res.json() as Aluno[])
               .catch(this.tratarErro);
  }

  // ***** MÉTODO 'tratarErro' MODIFICADO *****
  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de alunos', erro);
    // Repassa o *corpo JSON* do erro (que contém {failure: "..."})
    // Em vez de 'erro.message', nós rejeitamos o 'erro.json()'
    return Promise.reject(erro.json() || erro.message || erro);
  }
}
