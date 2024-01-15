import { Component} from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private router: Router) { }


  showInputs: boolean = false;
  showImg: boolean = false;

 public changeImage(): void {

 }

 public showInputPass(): void {

  this.showInputs = !this.showInputs;

 }

 public showInputImg(): void {
  this.showImg = !this.showImg;
 }

 public confirmarCambio(): void {

 }

  public update(): void {

  }
}
