import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent { 

    constructor(private router: Router){}

    navigateToRegister(){
      this.router.navigateByUrl('/login/register');
    }

}