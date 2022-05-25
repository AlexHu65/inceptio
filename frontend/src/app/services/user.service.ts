import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from "../interfaces/IUsers";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  private http : HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getQuery(params:any, query:string):Observable<Usuario>{
    const url = `http://localhost:3000${query}/${params}`;
    return this.http.get<Usuario>(url);
  }

  postQuery(params:any, query: any): Observable<Usuario>{
    const url = `http://localhost:3000${query}`;
    return this.http.post<Usuario>(url, params);
  }

  getUsers(){
    return this.getQuery('', '/movies');
  }

  login(params:any){
    return this.postQuery(params, `/users/login`).pipe(map((data:any)=> { return data[0] }));
  }
  

}
