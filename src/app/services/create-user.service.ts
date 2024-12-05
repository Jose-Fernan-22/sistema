import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  url = 'http://localhost:3000/api/create-user/'

  constructor(private http: HttpClient) { }

  guardarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.url, usuario)
  }

}
