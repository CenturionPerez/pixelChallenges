import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gamer } from "../classification/interfaces/classification.interface";
import { RequestService } from "src/app/utils/interfaces/util.interface";
import { BehaviorSubject, Observable, catchError, delay, of } from "rxjs";
import { TEMPLATE_GAMER } from "../classification/interfaces/mocks/getGamerList";

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
}