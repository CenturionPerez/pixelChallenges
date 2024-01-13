import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TEMPLATE_GAMER } from './interfaces/mocks/getGamerList';
import { Gamer } from './interfaces/classification.interface';
import { PixelChallengeService } from '../services/pixelChallenge.service';

@Component({
  selector: 'classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit{ 

  public showTable: boolean = false;
  public displayedColumns: string[] = ['Ranking', 'Jugador', 'Puntuación', 'Nacionalidad'];
  public dataSource = new MatTableDataSource ();

  constructor(private pixelChallengeService: PixelChallengeService) { }

  ngOnInit(): void {
    this.getClassification();
  }

  public filter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue) this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getClassification(): void {
    this.pixelChallengeService.showPixelChallengeSpinner(true);
    this.pixelChallengeService.getClassification().subscribe((resp) => {
      this.dataSource.data = resp;
      this.pixelChallengeService.showPixelChallengeSpinner(false);
      this.showTable = true;
    });
  }
}
