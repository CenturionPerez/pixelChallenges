import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { literals } from './utils/interfaces/util.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public title = 'pixelChallenges';
  public logged: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private router: Router, private authService: AuthService, private cdr: ChangeDetectorRef){ }

  ngOnInit(): void {
    this.subscription = this.authService.userLogged$.subscribe((resp) => {
      this.logged = resp;
    })
    this.logged = this.authService.getUserLoggedFromSessionStorage();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

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

  public updateLoggedUser(): void {
    this.authService.setUserLoggedInSessionStorage(false);
    this.authService.deletedIdUserSession();
    this.gotohome();
    this.authService.generateSnackBar(true, literals.loggout_session_ok);
  }
}
