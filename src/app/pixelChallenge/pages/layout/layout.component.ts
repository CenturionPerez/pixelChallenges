import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PixelChallengeService } from '../services/pixelChallenge.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit { 

  public spinner$: Observable<boolean> = of(false);

  constructor(private pixelChallengeService: PixelChallengeService, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.pixelChallengeService.showPixelChallengeSpinner$.subscribe((resp) => {
      this.spinner$ = of(resp);
      this.cdr.detectChanges();
    });
  }
}
