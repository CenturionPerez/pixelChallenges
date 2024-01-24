import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, catchError, delay, map, of } from "rxjs";
import { Gamer } from "../pages/classification/interfaces/classification.interface";
import { TEMPLATE_GAMER } from "../pages/classification/interfaces/mocks/getGamerList";
import { ResponseService } from "src/app/utils/interfaces/util.interface";
import { User } from "src/app/interfaces/user.interface";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class PixelChallengeService {
    private urlApi: string = 'http://localhost:8080/api/v1/';
    private headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    constructor(private http: HttpClient, private authService: AuthService) { }

    private showPixelChallengeSpinnerSubject = new BehaviorSubject<boolean>(false);
    public showPixelChallengeSpinner$ = this.showPixelChallengeSpinnerSubject.asObservable();

    public showPixelChallengeSpinner(value: boolean): void {
        this.showPixelChallengeSpinnerSubject.next(value);
    }

    public getClassification(): Observable<Array<User>> {
        return this.http.get<Array<User>>(this.urlApi + 'classification', {headers: this.headers}).pipe(
            catchError((error) => {
                console.log(error);
                this.showPixelChallengeSpinner(false);
                return of(TEMPLATE_GAMER);
            }),
            delay(2000)
        );
    }

    public getUser(): Observable<User> {
        const idUser = this.authService.getIdUserSession();
        if(idUser){
            return this.http.get<User>(this.urlApi + 'user/' + idUser, {headers: this.headers}).pipe(
                catchError((error) => {
                    console.error('Error al obtener usuario:', error);
                    this.showPixelChallengeSpinner(false);
                    return EMPTY;
                }),
                delay(2000)
            );
        }
        return new Observable((observer) => {
            observer.error('ID Not found');
        });
    }
    
    public modifyUser(data: User): Observable<boolean> {
        data.id = this.authService.getIdUserSession();
        return this.http.put<ResponseService>(this.urlApi + 'update', data, {headers: this.headers}).pipe(
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