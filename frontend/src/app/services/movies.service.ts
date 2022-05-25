import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responses } from '../interfaces/IResponses';
import { Movie } from '../interfaces/IMovies';
 

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  
  private http : HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getQuery(params:any, query:string):Observable<Movie>{
    const url = `http://localhost:3000${query}/${params}`;
    return this.http.get<Movie>(url);
  }

  postQuery(params:any, query: any): Observable<Responses>{
    const url = `http://localhost:3000${query}`;
    return this.http.post<Responses>(url, params);
  }

  getMovies(){
    return this.getQuery('', '/movies');
  }

  getMovie(id:number){
    return this.getQuery(id, `/movies`);
  }

}

