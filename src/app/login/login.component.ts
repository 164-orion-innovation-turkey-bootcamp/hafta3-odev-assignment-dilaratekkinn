
import { HttpClient } from '@angular/common/http';
import { faCoffee,faKey} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  faCoffee = faCoffee;
  faKey=faKey;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,


  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required],
    });
  }
  login() {
    this.http.get<any>('http://localhost:3000/signupUsers').subscribe((res) => {
      console.log(res, 'res');

      const user = res.find((a: any) => {
        console.log('a.password', a.password);
        console.log('a.email', a.email);

        console.log('this.loginForm.value.email', this.loginForm.value.email);
        console.log('this.loginForm.value.password',this.loginForm.value.password);

        return (
          a.email === this.loginForm.value.email &&
          a.password === this.loginForm.value.password
        ); //sistemdeki iki değer karşılaştırılacak
      });

      //let user = res[0];

      console.log(user);

      if (user) {
        alert('Login Sucess');
        this.loginForm.reset(); //validation sıfırlama
        this.router.navigate(['dashboard']);
      } else {
        alert('Can not find user!');
      }
    });
  }
}
