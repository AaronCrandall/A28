import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  ngOnInit(): void{
    const token = localStorage.getItem('jwt');
    if(!token){
      document.getElementById("link1")?.setAttribute("routerLink", "/")
      document.getElementById("link2")?.setAttribute("routerLink", "/")
      document.getElementById("link3")?.setAttribute("routerLink", "/")
    }
  }
  handleClick(){
    localStorage.removeItem("jwt");
  }
}
