import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit{

  order!: Order;
  products!: { name: any; quantity: any; }[];
  searchTerm!: '';

  constructor( private dialogRef: MatDialogRef<OrderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){

  }

  search(term:string){
    
  }

  printOrder() {
    const dialogContent = document.querySelector('.orderContent'); // Adjust the selector as needed
    if (dialogContent) {

      const printWindow = window.open('', '_blank');
      const clonedContent = dialogContent.cloneNode(true) as HTMLElement;
      clonedContent.classList.add(...Array.from(dialogContent.classList));
      // clonedContent.setAttribute('style', dialogContent.getAttribute('style'));

      clonedContent.querySelectorAll('div').forEach((originalElement) => {
        const clonedElement = originalElement.cloneNode(true) as HTMLElement;
        clonedElement.classList.add(...Array.from(originalElement.classList));
        // clonedElement.setAttribute('style', originalElement.getAttribute('style'));
        clonedElement.removeAttribute('class'); // Remove original classes

        // Replace the original div with the cloned div
        const parent = originalElement.parentElement;
        if(parent){
          parent.insertBefore(clonedElement, originalElement);
          parent.removeChild(originalElement);
        }
       });

      if (printWindow) {

        printWindow.document.body.appendChild(clonedContent);

        // Apply a CSS rule to set the font for the print window's document
        const style = printWindow.document.createElement('style');
        style.textContent = `
          body {
            font-family: "Quicksand", sans-serif;
          }
        `;

        printWindow.document.head.appendChild(style);
        printWindow.print()
      } 
    }
  }


  ngOnInit(): void {
    this.products =this.data.products;
  }

}
