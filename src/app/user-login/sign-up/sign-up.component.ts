import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { SignupService } from '../../signup.service';
import { Router } from '@angular/router';
import { OrganizationData } from '../organizationData';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  public ErrorMessage: string = "";
  submitted = false;
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private signUpService: SignupService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      'organisationDisplayName': ['', Validators.required],
      'organisationName': ['', Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'Password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      'ConfirmPassword': [null, Validators.required]
    });
  }
  data;

  get formInputControls() { return this.signUpForm.controls; }

  GenerateAccount(): void {
    this.submitted = true;

    // stop here if form is invalid
    console.log(this.signUpForm.value.Password);
    console.log(this.signUpForm.value.ConfirmPassword);
    if (this.signUpForm.valid && this.signUpForm.value.Password == this.signUpForm.value.ConfirmPassword) {
      var formInputValue = this.signUpForm.value;
      console.log("This is the form data coming " + formInputValue);
      this.signUpService.post(formInputValue).subscribe(data => {
        //console.log(this.signUpForm.value.Password);

        this.data = data.json();
        // this.signUpService.updateData(this.data); //why is this function called?
        this.localStorage.store("signUpData", this.data);
        console.log(data.json());
      });
      this.router.navigate(['/userlogin/addagents']);
    }
    else {
      if (this.signUpForm.value.Password != this.signUpForm.value.ConfirmPassword) {
        this.ErrorMessage = "*Password does not match";
        console.log("password does not match");
      }
      //alert("Password Does not match");
      return;
    }
  }


  get customer_name() {
    return this.signUpForm.get('organisationName');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get Password() {
    return this.signUpForm.get('Password');
  }
}
