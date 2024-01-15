import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, delay, map, of } from "rxjs";
import { User } from "../pages/interfaces/user.interface";
import { Gamer } from "../pages/classification/interfaces/classification.interface";
import { TEMPLATE_GAMER } from "../pages/classification/interfaces/mocks/getGamerList";
import { ResponseService } from "src/app/utils/interfaces/util.interface";

@Injectable({
    providedIn: 'root'
  })
export class PixelChallengeService {
    private urlApi: string = 'http://localhost:5000/v1/';

    constructor(private http: HttpClient) { }

    private showPixelChallengeSpinnerSubject = new BehaviorSubject<boolean>(false);
    public showPixelChallengeSpinner$ = this.showPixelChallengeSpinnerSubject.asObservable();

    public showPixelChallengeSpinner(value: boolean): void {
        this.showPixelChallengeSpinnerSubject.next(value);
    }

    public getClassification(): Observable<Array<Gamer>> {
        return this.http.get<Array<Gamer>>(this.urlApi + 'classification').pipe(
            catchError((error) => {
                console.log(error);
                return of(TEMPLATE_GAMER);
            }),
            delay(2000)
        );
    }

    public getUser(data: string): Observable<User> {
        return this.http.get<User>(this.urlApi + 'user/' + data).pipe(delay(2000));
    }
    
    public modifyUser(data: User): Observable<boolean> {
        return this.http.put<ResponseService>(this.urlApi + 'updateUser', data).pipe(
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