import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cycle } from '../models/cycle';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CycleService {
// private baseUrl = 'http://localhost:8084/';
private url = environment.baseUrl + 'api/cycles';
  constructor(private http: HttpClient) {}

//TODO: get, post, put, delete

//getAll
index(){
  return this.http.get<Cycle[]>(this.url)
  .pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError('error in cycle service index method');
    })
  );
}

create(cycle: Cycle){
return this.http.post<Cycle>(this.url, cycle).pipe(
  catchError((err: any) => {
      console.log('error in service create');
      return throwError('oh no, error creating cycle in the service level!');
    })

);

}

destroy(id: number){
  return this.http.delete<Cycle>(`${this.url}/${id}`).pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError('Error deleting a cycle' + err);
    })
  );

}

update(cycle: Cycle){
  return this.http.put<Cycle>(`${this.url}/${cycle.id}`, cycle).pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError('Error updating a cycle' + err);
    })

  );
}


}
