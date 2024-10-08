import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BagService } from 'src/app/services/bag.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/shared/models/Product';
import { User } from 'src/app/shared/models/User';
import { EditPageComponent } from '../../forms/edit-page/edit-page.component';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ConfirmationService]
})
export class HomeComponent  implements OnInit {

  products: Product[] = []
  searchTerm = '';
  user!:User;
  msgs: Message[] = [];

  constructor(private productService:ProductService, activatedRoute:ActivatedRoute, 
    private router:Router,private bagService: BagService,
    private userService:UserService,
    private _dialog: MatDialog,
    private confService: ConfirmationService,
    private primengConfig: PrimeNGConfig) {
    let productsObservable: Observable<Product[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){
        productsObservable = this.productService.getAllProductsBySearchTerm(params.searchTerm);
        this.searchTerm = params.searchTerm;
      }
      else{
        productsObservable = productService.getAll();
      }

      productsObservable.subscribe((serverProducts) => {
        this.products = serverProducts;
      })

      userService.userObservable.subscribe((newUser) =>{
        this.user = newUser;
      })
    })
    //productsObservable = productService.getAll();
  }

  getProductList(){
    this.productService.getProductList();
  }

  openAddEditPrForm(){
    const dialofRef = this._dialog.open(EditPageComponent);
    dialofRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          this.getProductList();
        }
      }
    });
  }

  search(term:string):void{
    if(term){
      this.router.navigateByUrl('/search/' + term);
    }
    else{
      this.router.navigateByUrl('/');
    }
  }

  addToBag(product: Product){
    this.bagService.addTobag(product);
  }

  ngOnInit(): void {
    this.getProductList();
  }
  
  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe({
      next: (res) => {
        alert("Product deleted");
        this.getProductList();
        window.location.reload();
      },
      error: console.log,
    })
    alert("Product deleted!");
    window.location.reload(); 
  }

  openEditPrForm(data: any){
    const dialogRef = this._dialog.open(EditPageComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProductList();
        }
      },
    });
  }

  confirm(id: number){
    this.confService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.msgs = [{severity:'info', summary:'Confirmed', detail:'User deleted successfully!'}];
          this.deleteProduct(id)
      },
      reject: () => {
        this.msgs = [];
        this.confService.close();
      }
    });
  }

  get isAdmin(){
    return this.user.isAdmin;
  }

  get isAuth(){
    return this.user.token;
  }
}
