import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit { 

  public spinner: boolean = false;

  constructor( private authService: AuthService ){ }

  ngOnInit(): void {
    this.authService.showAuthSpinner$.subscribe((resp) => {
      this.spinner = resp;
    });
  }
}
