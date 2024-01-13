import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy { 

  public spinner$: Observable<boolean> = of(false);
  private subscription: Subscription | undefined;

  constructor( private authService: AuthService, public cdr: ChangeDetectorRef ){ }

  ngOnInit(): void {
    this.subscription = this.authService.showAuthSpinner$.subscribe((resp) => {
      this.spinner$ = of(resp);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
