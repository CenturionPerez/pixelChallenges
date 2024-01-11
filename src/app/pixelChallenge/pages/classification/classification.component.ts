import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent { 
  displayedColumns: string[] = ['Ranking', 'Jugador', 'Puntuación', 'Nacionalidad'];
  public dataSource = new MatTableDataSource ([
    {rank: 1, nationality: 'Hydrogen', matches: 1.0079, player: 'H', score: Math.floor(Math.random()*10)},
    {rank: 2, nationality: 'Helium', matches: 4.0026, player: 'He', score: Math.floor(Math.random()*10)},
    {rank: 3, nationality: 'Lithium', matches: 6.941, player: 'Li', score: Math.floor(Math.random()*10)},
    {rank: 4, nationality: 'Beryllium', matches: 9.0122, player: 'Be', score: Math.floor(Math.random()*10)},
    {rank: 5, nationality: 'Boron', matches: 10.811, player: 'B', score: Math.floor(Math.random()*10)},
    {rank: 6, nationality: 'Carbon', matches: 12.0107, player: 'C', score: Math.floor(Math.random()*10)},
    {rank: 7, nationality: 'Nitrogen', matches: 14.0067, player: 'N', score: Math.floor(Math.random()*10)},
    {rank: 8, nationality: 'Oxygen', matches: 15.9994, player: 'O', score: Math.floor(Math.random()*10)},
    {rank: 9, nationality: 'Fluorine', matches: 18.9984, player: 'F', score: Math.floor(Math.random()*10)},
    {rank: 10, nationality: 'Neon', matches: 20.1797, player: 'Ne', score: Math.floor(Math.random()*10)},
  ]);

  constructor() { }

  public filter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    if(filterValue) this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
