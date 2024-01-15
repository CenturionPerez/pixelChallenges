import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { RequestService, ResponseService } from '../../utils/interfaces/util.interface';
import { ClientAuthentication, ClientRegister } from '../interfaces/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { User } from 'src/app/pixelChallenge/pages/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi: string = 'http://localhost:5000/v1/';

  constructor(private http: HttpClient, private _snackbar: MatSnackBar) { }

  private showAuthSpinnerSubject = new BehaviorSubject<boolean>(false);
  public showAuthSpinner$ = this.showAuthSpinnerSubject.asObservable();

  private userLoggedSubject = new BehaviorSubject<boolean>(false);
  private readonly sessionKey = 'userLogged';
  public userLogged$ = this.userLoggedSubject.asObservable();

  showAuthSpinner(value: boolean) {
    console.log('showAuthSpinner$ updated:', value);
    this.showAuthSpinnerSubject.next(value);
  }

  setUserLoggedInSessionStorage(value: boolean) {
    console.log('userLogged:', value);
    this.userLoggedSubject.next(value);
    sessionStorage.setItem(this.sessionKey, JSON.stringify(value));
  }

  getUserLoggedFromSessionStorage(): boolean {
    const storedValue = sessionStorage.getItem(this.sessionKey);
    return storedValue ? JSON.parse(storedValue) : false;
  }

  generateSnackBar(error: boolean, message: string): void {
    this._snackbar.open(message, literals.accept, {
      duration: 10000,
      panelClass: error? ['snackbarKo']: ['snackbarOk']
    });
  }

  public verifyUser(data: ClientAuthentication): Observable<boolean> {
    return this.initCall({apiUrl: 'verifyUser', data});
  }

  public createUser(data: ClientRegister): Observable<boolean> {
    return this.initCall({apiUrl: 'createUser', data});
  }

  public getUser(data: string): Observable<User> {
    return this.http.get<User>(this.urlApi + 'user/' + data).pipe(delay(2000));
  }

  public modifyUser(data: User): Observable<any> {
    return this.http.put<User>(this.urlApi + 'updateUser', data);
  }

  private initCall({apiUrl, data} : RequestService): Observable<boolean> {
    console.log(data);
    return this.http.post<ResponseService>(this.urlApi + apiUrl, data).pipe(
      map((resp) => {
        return resp.data as boolean;
      }),
      catchError((error) => {
        console.error(error);
        this.setUserLoggedInSessionStorage(false);
        return of(false);
      })
    ).pipe(delay(2000))
  }
}
