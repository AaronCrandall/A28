import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  constructor(private http: HttpClient, private router:Router){

  }
  root = <HTMLElement>document.getElementById('root');
  user = new FormControl('');
  submit(){
    let username = (<HTMLInputElement>document.getElementById("user")).value;
    let password = (<HTMLInputElement>document.getElementById("pass")).value;
    console.log(username, password);
    this.http.post(`Http://localhost:3000/login?user=${username}&pass=${password}`, {user: username, pass: password}).subscribe((res: any)=>{
      localStorage.setItem('jwt', res.token);
      this.router.navigate(['/dashboard'])
    });
  }
}
