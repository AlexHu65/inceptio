import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/IMovies';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html'
})
export class CarritoComponent {

  carrito:Movie[] = [];
  total: number = 0;

  constructor() { 
    this.cargarStorage();
  }

  cargarStorage(){

    if(localStorage.getItem('carrito')){
      this.carrito = JSON.parse(localStorage.getItem('carrito')  || '{}');
    }

    for (let index = 0; index < this.carrito.length; index++) {
     this.total += this.carrito[index].sell_price;
    }
    
  }

   
  deleteCarrito(id:number){
  
    this.total = 0;
    localStorage.removeItem('carrito');


    let cart = this.carrito.filter(function(item){ 
      return item.id != id; 
    });

    this.carrito = cart;
    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    this.carrito.map(((movie:Movie) => {
      this.total += movie.sell_price; 
    }));

    
  }

}
