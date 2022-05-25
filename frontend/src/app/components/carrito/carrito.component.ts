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

    //almacenamos el carrito antes de borrarlo
    const cart = this.carrito.find((item:Movie) => { 
      return item.id !== id;
    });  

    this.carrito = [];
    localStorage.removeItem('carrito');
    this.total = 0;

    if(cart){
      this.carrito.push(cart);
      localStorage.setItem('carrito', JSON.stringify(this.carrito ));
    }

    for (let index = 0; index < this.carrito.length; index++) {
      this.total += this.carrito[index].sell_price;
    }
  }

}
