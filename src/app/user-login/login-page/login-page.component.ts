import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { LocalStorageService } from 'ngx-webstorage';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  token;
  loginForm: FormGroup;
  unauthorized: string = null;
  isSubmitted = false;

  //for testing
  @Output() submitted = new EventEmitter();

  constructor(private router: Router, public fb: FormBuilder, private _loginService: LoginService, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      //change this to EmailId later
      'Username': ['', Validators.required],
      'Password': [null, [Validators.compose([Validators.required, Validators.minLength(6)])]]
    });
  }

  get formInputControls() { return this.loginForm.controls; }

  get Username() {
    console.log(this.loginForm.get('Username'));
    return this.loginForm.get('Username');
  }

  get Password() {
    console.log(this.loginForm.get('Password'));
    return this.loginForm.get('Password');
  }

  LoginToAccount() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._loginService.getToken(this.loginForm.value).subscribe(result => {
        this.token = result.toString();
        // console.log(this.token);
        this.localStorage.store('token', this.token);
        if (this.token) {
          this.router.navigate(['/console/home']);
        }
      }, error => {
        if (error) {
          console.log('Error');
          this.unauthorized = "Login failed. Please check your Username or Password";
        }
      });
    }
    else {
      return;
    }
  }

  // for testing
  onSubmit({ Username, Password }) {
    this.submitted.emit({ Username, Password });
  }

  // viewPassword()
  // {
  //   var passwordInput = document.getElementById('validationCustom04');
  //   var passStatus = document.getElementById('pass-status');

  //   if (passwordInput.type == 'password'){
  //     passwordInput.type = 'text';
  //     passStatus.className = 'fa fa-eye-slash';
  //   }
  //   else {
  //     passwordInput.type = 'password';
  //     passStatus.className = 'fa fa-eye';
  //   }
  // }
}
