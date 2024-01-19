import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, delay, map, of } from "rxjs";
import { Gamer } from "../pages/classification/interfaces/classification.interface";
import { TEMPLATE_GAMER } from "../pages/classification/interfaces/mocks/getGamerList";
import { ResponseService } from "src/app/utils/interfaces/util.interface";
import { User } from "src/app/interfaces/user.interface";

@Injectable({
    providedIn: 'root'
  })
export class PixelChallengeService {
    private urlApi: string = 'http://localhost:8080/';
    private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    constructor(private http: HttpClient) { }

    private showPixelChallengeSpinnerSubject = new BehaviorSubject<boolean>(false);
    public showPixelChallengeSpinner$ = this.showPixelChallengeSpinnerSubject.asObservable();

    public showPixelChallengeSpinner(value: boolean): void {
        this.showPixelChallengeSpinnerSubject.next(value);
    }

    public getClassification(): Observable<Array<Gamer>> {
        return this.http.get<Array<Gamer>>(this.urlApi + 'classification', {headers: this.headers}).pipe(
            catchError((error) => {
                console.log(error);
                return of(TEMPLATE_GAMER);
            }),
            delay(2000)
        );
    }

    public getUser(data: string): Observable<User> {
        return this.http.get<User>(this.urlApi + 'user/' + data, {headers: this.headers}).pipe(delay(2000));
    }
    
    public modifyUser(data: User): Observable<boolean> {
        return this.http.put<ResponseService>(this.urlApi + 'updateUser', data, {headers: this.headers}).pipe(
            map((resp) => {
              return resp.data as boolean;
            }),
            catchError((error) => {
              console.error(error);
              return of(false);
            }),
            delay(2000)
        )
    }
}