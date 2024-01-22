import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { RequestService, ResponseService } from '../../utils/interfaces/util.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { User } from 'src/app/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi: string = 'http://localhost:8080/api/v1/';
  private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

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

  getIdUserSession(): number {
    const idUser = sessionStorage.getItem('id');
    return idUser? parseInt(idUser): 0;
  }

  deletedIdUserSession(): void {
    sessionStorage.removeItem('id');
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

  public verifyUser(data: User): Observable<boolean> {
    return this.initCall({apiUrl: 'verify', data});
  }

  public createUser(data: User): Observable<boolean> {
    return this.initCall({apiUrl: 'register', data});
  }

  private initCall({apiUrl, data} : RequestService): Observable<boolean> {
    return this.http.post<ResponseService>(this.urlApi + apiUrl, data, {headers: this.headers}).pipe(
      map((resp) => {
        sessionStorage.setItem('id', resp.data);
        return true;
      }),
      catchError((error) => {
        console.error(error);
        this.setUserLoggedInSessionStorage(false);
        return of(false);
      })
    ).pipe(delay(2000))
  }
}
