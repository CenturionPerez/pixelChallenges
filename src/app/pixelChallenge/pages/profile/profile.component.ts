import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { PixelChallengeService } from '../../services/pixelChallenge.service';
import { User } from '../interfaces/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { literals } from 'src/app/utils/interfaces/util.constants';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public showInputs: boolean = false;
  public showImg: boolean = false;
  public user: User = {
    email: '',
    img: '',
    name: '',
    password: ''
  }

  public updateUserForm: FormGroup = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    img: new FormControl('',[
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private router: Router, 
    private pixelChallengeService: PixelChallengeService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.pixelChallengeService.getUser('example').subscribe((resp) => {
      // this.user = resp
      this.user = {
        email: 'Prueba@gmail.commm',
        img: 'example',
        name: 'Prueba Gmail',
        password: 'defergt54tt'
      }
      this.pixelChallengeService.showPixelChallengeSpinner(false);
    })
  }

  public showInputPass(): void {
  this.showInputs = !this.showInputs;
  }

  public showInputImg(): void {
  this.showImg = !this.showImg;
  }

  public update(): void {
    this.pixelChallengeService.modifyUser(this.requestModifyData()).subscribe((resp) => {
      if(resp){
        this.authService.generateSnackBar(false, literals.modify_user_ok);
        this.router.navigateByUrl('profile');
      }else{
        this.authService.generateSnackBar(true, literals.modify_user_ko);
      }
    });
  }

  private requestModifyData(): User {
    return {
      email: this.updateUserForm.get('email')?.value,
      img: this.updateUserForm.get('img')?.value,
      name: this.updateUserForm.get('username')?.value,
      password: this.updateUserForm.get('password')?.value
    }
  }
}
