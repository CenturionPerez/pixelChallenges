import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private loginUser(request : RequestService): Observable<boolean> { 
    return this.initCall(request);
  }

  private createUser(request : RequestService): Observable<boolean> { 
    return this.initCall(request);
  }

  private initCall({apiUrl, data} : RequestService): Observable<boolean> {
    return this.http.post<ResponseService>(apiUrl, data).pipe(
      map((resp) => {
        return resp.data as boolean;
      }),
      catchError((error) => {
        console.error(error);
        return of(false);
      })
    )
  }
}
