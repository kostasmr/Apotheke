import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { RegisterPageComponent } from '../../forms/register-page/register-page.component';
import { MatDialog } from '@angular/material/dialog';
import { Message } from "primeng/api";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  loginForm!: FormGroup
  resetForm!: FormGroup
  isSubmitted = false;
  isSubmitted2 = false;
  returnUrl = '';
  errorMessage = '';
  loginMessage = '';
  successLogin = false;
  msgs: Message[] | undefined;
  registerSuccess: boolean = false;
  resetPass: boolean = false;

  constructor(private formBuilder:FormBuilder, private userService:UserService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private _dialog: MatDialog){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.resetForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;

    this.msgs = [
      { 
        severity: 'success', 
        summary: 'Login Successfull', 
        detail:  "Welcome back!"
      },
      { 
        severity: 'error', 
        summary: 'Login Declined', 
        detail: "Email or password is invalid"
      },
    ]
  }

  get fc(){
    return this.loginForm.controls;
  }

  get reset_fc(){
    return this.resetForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) {
      return;
    }
    this.successLogin = true;
    console.log("message = ", this.msgs)
    this.userService.login({email: this.fc.email.value,
      password: this.fc.password.value}).subscribe(
        {
          next: () => {
            return this.router.navigateByUrl(
              this.returnUrl
            );
          },
        });
  }

  registerForm(){
    const dialofRef = this._dialog.open(RegisterPageComponent);
    dialofRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          alert("You have successfully registered!");
        }
      }
    });
  }

  resetPassword(){
    this.isSubmitted2 = true;
    if(this.resetForm.invalid){
      return;
    }
    this.resetPass = false; 

    this.userService.resetPassword({ email: this.reset_fc.email.value }).subscribe(() => {
    });
    alert("An email has been sent")
    window.location.reload();
  }
}
