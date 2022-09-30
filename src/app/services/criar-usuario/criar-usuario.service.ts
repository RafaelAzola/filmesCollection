import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class CriarUsuarioService {
  private url = 'http://localhost:3000/usuarios';
  constructor(private httpClient: HttpClient){}

  lerUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.url);
  }

  salvarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(this.url, usuario);
  }

  updateUsuario(usuario: Usuario, id: any): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.url}/${id.id}`, usuario);
  }

  deletarUsuario(id: any){
    return this.httpClient.delete(`${this.url}/${id}`)
  }
}
