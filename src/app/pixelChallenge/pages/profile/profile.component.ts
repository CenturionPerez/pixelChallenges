import { Component} from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { formatCurrency } from '@angular/common';
import { ProfileFormComponent } from './Components/profile-form/profile-form.component';







@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  showInputs: boolean = false;
  showImg: boolean = false;

  constructor(private router: Router, public dialog: MatDialog) { }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ProfileFormComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

 public showInputPass(): void {

  this.showInputs = !this.showInputs;

 }

  public update(): void {

  }
}
