import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PasswordsMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit{
  resetForm!: FormGroup
  hide=true;
  hide2=true;
  isSubmitted= false;

  constructor(private formBuilder:FormBuilder,
    private userService: UserService,
    private router:Router)
  {
    this.resetForm = this.formBuilder.group({
      email: '',
      password: '',
      conf_password: '',
    },{
      validators: PasswordsMatchValidator('password','conf_password')
    })
  }

  get fc(){
    return this.resetForm.controls;
  }

  resetPassword(){
    this.isSubmitted = true;
    if(this.resetForm.valid){
      if (this.fc.password.value.length <6){
        alert("Password can not be less than 6 characters!")
        return
      }

      this.userService.changePassword({email: this.fc.email.value, password: this.fc.password.value}).subscribe({
        next: (val: any) => {
          alert("Password has changed successfully!");
        },
        error: (err: any) => {
          console.error(err);
        }
    })
    alert("Password has changed successfully!");
    this.router.navigateByUrl("/");
    }
  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });
  }
}
