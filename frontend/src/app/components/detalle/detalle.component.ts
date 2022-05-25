import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/IMovies';
import { MoviesService } from 'src/app/services/movies.service';
import { Usuario } from "../../interfaces/IUsers";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnChanges, OnInit {

  @Input() movieId:number = 1;
  
  movie:any;
  display:boolean = false;
  carrito:Movie[] = [];

  constructor(private service: MoviesService) { 
    this.service.getMovie(this.movieId).subscribe((data) => {
      this.movie = data;
    });
  }

  ngOnChanges() {
    this.getMovie();
  }

  ngOnInit(): void {
    this.cargarStorage();    
  }

  getMovie(){
    this.service.getMovie(this.movieId).subscribe((data) => {
      this.movie = data;
    });
  }

  movieInformation(){
      this.display = true;
  }

  addCarrito(id:number){

    const found = this.movie.find((movie:Movie) => { 
      return movie.id === id;
    });

    const cart = this.carrito.find((item:Movie) => { 
      return item.id === id;
    });

    if(found && !cart){
      this.carrito.push(found);
      localStorage.setItem('carrito', JSON.stringify(this.carrito ));

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Agregado al carrito',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  cargarStorage(){
    if(localStorage.getItem('carrito')){
      this.carrito = JSON.parse(localStorage.getItem('carrito')  || '{}');
    }
  }

}
