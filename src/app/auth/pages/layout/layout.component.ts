import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit { 

  public spinner$: Observable<boolean> = of(false);

  constructor( private authService: AuthService, public cdr: ChangeDetectorRef ){ }

  ngOnInit(): void {
    this.authService.showAuthSpinner$.subscribe((resp) => {
      this.spinner$ = of(resp);
      this.cdr.detectChanges();
    });
  }
}
