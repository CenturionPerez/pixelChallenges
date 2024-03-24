import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Phaser from 'phaser';
import { TetrisGame } from './utils/tetrisgame';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit, OnDestroy {
  public isMantenaint: boolean = false;
  public game!: Phaser.Game;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    this.game = new Phaser.Game({
      type: Phaser.CANVAS,
      width: 900,
      height: 1200,
      parent: "game-container",
      scene: [TetrisGame]
    })
  }

  ngOnDestroy(){
    if (this.game){
      this.game.destroy(true);
    }
  }
}
