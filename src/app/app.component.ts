import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'pixelChallenges';

  constructor(private router: Router){ }

  public gotoinit(){
    this.router.navigateByUrl('auth/init');
  }

  public gotohome() {
    this.router.navigateByUrl('');
  }

  public navigateToGame(){
    this.router.navigateByUrl('game');
  }

  public goToPerfil(){
    this.router.navigateByUrl('profile');
  }

  public goToClasification() {
    this.router.navigateByUrl('classification');
  }
}
