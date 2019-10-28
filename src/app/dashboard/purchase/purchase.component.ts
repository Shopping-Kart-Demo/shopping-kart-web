import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  public productos: Array<any> = [
    {
        id:1,
        nombre: "Iphone Blanco 32Gb",
        descripcion: "Sin bordes en pantalla y sin el icónico botón de inicio. Todas las interacciones se realizan en pantalla mediante gestos. Pantalla OLED de 5.8 pulgadas. (Super Retina Display). Resolución 2046 × 1125p con soporte para HDR, Dolby Vision y HDR10.",
        precio: 500,
        imagen: "https://images.unsplash.com/photo-1510166089176-b57564a542b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1910&q=80"
    },
    {
       id:2,
        nombre: "Calzados Adidas",
        descripcion: "Zapatos para realizar ejercicios de forma comoda, mantiene el pie fresco y comodo por mucho mas tiempo.",
        precio: 200,
        imagen: "https://images.unsplash.com/photo-1543908753-04c7ebbecc21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
    },
    {
       id:3,
        nombre: "Camisa Adidas",
        descripcion: "Camisa adidas roja, para brindar estilo y frescura a tu atuendo.",
        precio: 150,
        imagen: "https://images.unsplash.com/photo-1511746315387-c4a76990fdce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    }, 
    { 
      id:4,
       nombre: "Nike Rojo",
       descripcion: "Zapatos de mallas de color Rojo, comodo para tus pies, Modelo 2019.",
       precio: 250,
       imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    }
]


public carrito: Array<any> = [];


  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }


  public agregar(producto: any): void { 

    console.log(producto.nombre);

    this.carrito.push(producto);

  }

 

}
