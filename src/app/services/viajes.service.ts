import { Injectable } from '@angular/core';
import { Viajes } from '../models/viajes';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ViajesService {
  endpoint = "";
  constructor(private http: HttpClient) {
    this.endpoint = environment.apiUrl+"documentos";
  }

  getAll(nave:string) {
    return this.http.get<Viajes[]>(`${environment.apiUrl}viajes/todos?nave=${nave}`);
  }

}
