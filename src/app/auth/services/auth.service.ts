import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of } from 'rxjs';
import { RequestService, ResponseService } from '../../utils/interfaces/util.interface';
import { ClientAuthentication, ClientRegister } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi: string = 'http://localhost:5000/v1/';

  constructor(private http: HttpClient) { }

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

  public verifyUser(data : ClientAuthentication): Observable<boolean> {
    return this.initCall({apiUrl: 'verifyUser', data});
  }

  public createUser(data : ClientRegister): Observable<boolean> {
    return this.initCall({apiUrl: 'createUser', data});
  }

  private initCall({apiUrl, data} : RequestService): Observable<boolean> {
    console.log(data);
    return this.http.post<ResponseService>(this.urlApi + apiUrl, data).pipe(
      map((resp) => {
        this.setUserLoggedInSessionStorage(true);
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
