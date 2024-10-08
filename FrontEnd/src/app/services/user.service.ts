import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_BY_SEARCH_URL, USER_BY_ID_URL, USER_LOGIN_URL, USER_LOGOUT_URL, USER_PAGE_URL, USER_REGISTER_PAGE_URL, USER_RESET_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private toastrService:ToastrService, private router:Router) {
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  getAll(){
    return this.http.get<User[]>(USER_PAGE_URL);
  }

  getUserByid(userId:string):Observable<User>{
    return this.http.get<User>(USER_BY_ID_URL + userId);
  }

  getAllUsersBySearchTerm(searchTerm: string) {
    return this.http.get<User[]>(USERS_BY_SEARCH_URL + searchTerm);
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
      next: (user) => {
        setTimeout(() => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        }, 500);

      },
      error: (errorResponse) => {
        setTimeout(function() {
        }, 3000);

        this.toastrService.error(errorResponse.error, 'Login Failed');
      }
    }));
  }

  logout(userId: any){
    this.removeTokenResponse(userId);
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  removeTokenResponse(id: any){
    return this.http.get(USER_LOGOUT_URL, id);
  }
  
  addUser(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_PAGE_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
        },
        error: (errorResponse) => {
        }
      })
    )
  }

  editUser(id: any ,data: any): Observable<any> {
    return this.http.put(`http://localhost:8080/api/users/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/users/${id}`);
  }

  resetPassword(email: any): Observable<any>{
    return this.http.post(USER_RESET_URL, email);
  }

  changePassword(data: any): Observable<any> {
    return this.http.patch(USER_RESET_URL, data);
  }

}
