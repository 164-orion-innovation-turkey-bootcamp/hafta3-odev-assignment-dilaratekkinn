import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private dataservice: DataserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      user_mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  onSubmit() {
    const user = {
      email: this.loginForm.get('user_mail').value,
      password: this.loginForm.get('password').value,
    };
    if (this.loginForm.valid) {
      this.dataservice.postData(user);
    }
  }
  get() {
    this.dataservice.getData().subscribe((data) => {
      console.log(data);
      this.router.navigate(['/dashboard']);
      
    });
  }
}
