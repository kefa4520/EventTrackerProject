import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CycleService {
private baseUrl = 'http://localhost:8084/';
private url = this.baseUrl + 'api/cycles';
  constructor() { }

//TODO: get, post, put, delete

}
