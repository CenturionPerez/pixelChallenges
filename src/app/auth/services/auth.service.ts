import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, map, of } from 'rxjs';
import { RequestService, ResponseService } from '../../utils/interfaces/util.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi: string = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  private showAuthSpinnerSubject = new BehaviorSubject<boolean>(false);
  showAuthSpinner$ = this.showAuthSpinnerSubject.asObservable();

  showAuthSpinner(value: boolean) {
    this.showAuthSpinnerSubject.next(value);
  }

  public verifyUser(data : Object): Observable<boolean> {
    console.log(JSON.stringify(data));
    return this.initCall({apiUrl: 'verifyUser', data});
  }

  public createUser(data : Object): Observable<boolean> { 
    return this.initCall({apiUrl: 'createUser', data});
  }

  private initCall({apiUrl, data} : RequestService): Observable<boolean> {
    return this.http.post<ResponseService>(this.urlApi + apiUrl, data).pipe(
      map((resp) => {
        return resp.data as boolean;
      }),
      catchError((error) => {
        console.error(error);
        return of(false);
      })
    ).pipe(delay(2000))
  }
}
