import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PixelChallengeService } from '../services/pixelChallenge.service';
import { Observable, Subscription, of } from 'rxjs';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit { 

  public spinner$: Observable<boolean> = of(false);
  private subscription: Subscription | undefined;

  constructor(private pixelChallengeService: PixelChallengeService, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscription = this.pixelChallengeService.showPixelChallengeSpinner$.subscribe((resp) => {
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
