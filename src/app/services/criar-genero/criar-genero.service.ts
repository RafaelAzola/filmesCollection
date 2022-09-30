import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from 'src/app/models/genero.model';

@Injectable({
  providedIn: 'root'
})
export class CriarGeneroService {
  private url = 'http://localhost:3000/generos';
  constructor(private httpClient: HttpClient){}

  lerGeneros(): Observable<Genero[]>{
    return this.httpClient.get<Genero[]>(this.url);
  }

  salvarGenero(genero: Genero): Observable<Genero>{
    return this.httpClient.post<Genero>(this.url, genero);
  }

  updateGenero(genero: Genero, id: any): Observable<Genero> {
    return this.httpClient.put<Genero>(`${this.url}/${id.id}`, genero);
  }

  deletarGenero(id: any){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
