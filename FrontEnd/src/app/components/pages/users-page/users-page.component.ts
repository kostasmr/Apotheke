import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';
import { UserFormPageComponent } from '../../forms/user-form-page/user-form-page.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
  providers: [ConfirmationService]
})
export class UsersPageComponent  implements OnInit{
  users: User[] = []
  searchTerm = '';
  msgs: Message[] = [];
  user!:User;

  constructor(activatedRoute:ActivatedRoute, 
    private router:Router,
    private userService:UserService,
    private _dialog: MatDialog,
    private confService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private orderService: OrderService) {
    let userObservable: Observable<User[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm){

        userObservable = this.userService.getAllUsersBySearchTerm(params.searchTerm);
        this.searchTerm = params.searchTerm;
      }
      else{
        userObservable = userService.getAll();
      }
      userObservable.subscribe((serverUsers) => {
        this.users = serverUsers;
      })

      userService.userObservable.subscribe((newUser) =>{
        this.user = newUser;
      })
    })
  }

  search(term:string):void{
    if(term){
      this.router.navigateByUrl('/searchUser/' + term);
    }
    else{
      this.router.navigateByUrl('/users-page');
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        window.location.reload();
      },
      error: console.log,
    })
    window.location.reload();
  }

  openEditPrForm(data: any){
    const dialogRef = this._dialog.open(UserFormPageComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
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
          this.deleteUser(id)
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
  
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    throw new Error('Method not implemented.');
  }
}  

