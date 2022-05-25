import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/IUsers';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from '../../interfaces/IMovies';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})


export class HomeComponent {

  movies:Movie[] = [];

  loggedUser:Usuario = {
    id: 0,
    email: "",
    name: "",
    avatar: ""
  };

  mainMovie:number;

  constructor(private service: MoviesService) { 

    this.mainMovie = 1;

    this.service.getMovies().subscribe((data:any) => {

      this.movies = data;

      if(this.movies.length > 0){
        this.mainMovie = this.movies[0].id;
      }else{
        this.mainMovie = 1;
      }

    });

    //validate user
    let local = JSON.parse(localStorage.getItem('user')  || '{}');
    if(local[0]){
      this.loggedUser = {
        email: local[0].email,
        id: local[0].id,
        name: local[0].name,
        avatar: local[0].avatar
      }
    }

  }

  movieDetail(idMovie:number){
    this.mainMovie = idMovie;
  }

}
