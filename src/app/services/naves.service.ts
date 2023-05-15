import { Injectable } from '@angular/core';
import { Naves } from '../models/naves';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavesService {
  endpoint = "";
  constructor(private http: HttpClient) {

  }

  getAll() {
    return this.http.get<Naves[]>(`${environment.apiUrl}naves/todas`);
  }
}
