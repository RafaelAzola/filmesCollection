import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from 'src/app/models/filme.model';

@Injectable({
  providedIn: 'root'
})
export class CriarFilmeService {

  // url do DB local
  private url = 'http://localhost:3000/filmes';
  constructor(private httpClient: HttpClient){}

  // CRUD:
  // get > lerFilme
  // post > salvarFilme
  // put > updateFilme
  // delete > deletarFilme

  lerFilmes(): Observable<Filme[]>{
    return this.httpClient.get<Filme[]>(this.url);
  }

  salvarFilme(filme: Filme): Observable<Filme>{
    return this.httpClient.post<Filme>(this.url, filme);
  }

  updateFilme(filme: Filme, id: any): Observable<Filme> {
    return this.httpClient.put<Filme>(`${this.url}/${id.id}`, filme);
  }

  deletarFilme(id: any){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
