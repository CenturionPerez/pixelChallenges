import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ListOfPieces } from './utils/geometricPieces';
import { PieceTetris } from './utils/interfaces/tetris.interface';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tetrisContainer') canvasRef!: ElementRef<HTMLCanvasElement>;
  public isMantenaint: boolean = false;
  public context!: CanvasRenderingContext2D;
  public canvas!: HTMLCanvasElement;
  public isGameOver: boolean = false;
  private listOfPiecesFixed: Array<PieceTetris> = [];
  private pieceTetris: PieceTetris = this.generateRandomPiece();
  private counterDropPiece: number = 0;
  private BLOCK_SIZE: number = 30;
  private BOARD_WIDTH: number = 15;
  private BOARD_HEIGHT: number = 31;
  private allowedKeys: string[] = ['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
  private BOARD!: number[][];

  // [
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  // ];

  //! TODO: Cuando esta abierto el wc y perdemos, si no salimso y le damos a modo invitado, seguimos en la pagina pero el juego por detras comienza.
  //! TODO: Añadir sistema de puntajes
  //! TODO: Añadir Menu
  //! TODO: Añadir guardar puntaje y enviarlo al backend
  //! TODO: Añadir fondo al juego, como tambien cuadriculas a las fichas o una apariencia mas detallista, con mas calidad.
  //! TODO: Conseguir que las piezas al colisionar guarden su color. (Pensar como y utilizar la lista de piezas)
  //! TODO: Refactorizar todo (haciendo mas simples funciones, exportar datos importantes, generar funcion de la tabla para no tenerla a mano metida)
  //! TODO: ...
  
  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.initCanvas();
    //this.createEmptyBoard();
    this.update();
    document.addEventListener('keydown', event => {
      if(this.allowedKeys.includes(event.key)) {
        if(event.key === 'ArrowLeft'){
          this.pieceTetris.positionX --;
          if(this.checkCollision()){
            this.pieceTetris.positionX ++;
          }
        }else if(event.key === 'ArrowRight'){
          this.pieceTetris.positionX ++;
          if(this.checkCollision()){
            this.pieceTetris.positionX --;
          }
        }else if(event.key === 'ArrowDown'){
          this.pieceTetris.positionY ++
          if(this.checkCollision()){
            this.collisionArrowDown();
          }
        }else {
          this.rotatePiece();
        }
        event.preventDefault();
      } 
    });
    document.addEventListener('click', () => {
      this.rotatePiece();
    });
  }

  ngOnDestroy(){ }

  initCanvas(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d')!;
    this.canvas.width = this.BLOCK_SIZE * this.BOARD_WIDTH;
    this.canvas.height = this.BLOCK_SIZE * this.BOARD_HEIGHT;
    this.context.scale(this.BLOCK_SIZE, this.BLOCK_SIZE);
  }

  //game loop
  update(): void {
    if(!this.isGameOver){
      this.counterDropPiece++
      //Contador en ms
      if(this.counterDropPiece === 100){
        this.counterDropPiece = 0;
        this.pieceTetris.positionY++;
        if(this.checkCollision()){
          this.collisionArrowDown();
        }
      }
      this.draw();
      window.requestAnimationFrame(this.update.bind(this));
    } else {
      
    }
  }

  draw(): void {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.BOARD.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value === 1){
          this.context.fillStyle = 'yellow';
          this.context.fillRect(x, y, 1, 1);
        }
      });
    });

    this.pieceTetris.bidimensionalData.forEach((row, y) =>{
      row.forEach((value, x) => {
        if(value){
          this.context.fillStyle = this.pieceTetris.color;
          this.context.fillRect(x + this.pieceTetris.positionX, y + this.pieceTetris.positionY, 1, 1);
        }
      });
    });
  }

  private generateRandomColor(): string {
    // Generar componentes RGB aleatorios entre 0 y 255
    const red = Math.floor(Math.random() * 256); // 0 a 255 inclusive
    const green = Math.floor(Math.random() * 256); // 0 a 255 inclusive
    const blue = Math.floor(Math.random() * 256); // 0 a 255 inclusive

    // Convertir los componentes a formato hexadecimal y concatenarlos
    const colorHex = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);

    return colorHex;
  } 

  private checkCollision(): number[] | undefined {
    return this.pieceTetris.bidimensionalData.find((row, y) => {
      return row.find((value, x) => {
        return (value !== 0 && this.BOARD[y + this.pieceTetris.positionY]?.[x + this.pieceTetris.positionX] !== 0)
      })
    })
  }

  private generateRandomPiece(): PieceTetris {
    return {
      positionX: 7,
      positionY: 0,
      color: this.generateRandomColor(),
      allPositionXFixed: [],
      allPositionYFixed: [],
      bidimensionalData: ListOfPieces[Math.floor(Math.random() * ListOfPieces.length)]
    }
  }

  private solidificationPiece(): void {
    this.pieceTetris.bidimensionalData.forEach((row, y) => {
      row.forEach((value, x) => {
        if(value === 1){
          this.BOARD[y + this.pieceTetris.positionY][x + this.pieceTetris.positionX] = 1;
        }
      });
    });
    this.listOfPiecesFixed.push(this.pieceTetris);
  }

  private removeRows(): void {
    this.BOARD.forEach((rows, y) => {
      if(rows.every((value, x) => value === 1)){
        this.BOARD.splice(y);
        this.BOARD.unshift(Array(this.BOARD_WIDTH).fill(0));
      }
    })
  }

  private collisionArrowDown(): void {
    this.pieceTetris.positionY --;
    this.solidificationPiece();
    this.pieceTetris = this.generateRandomPiece();
    if(this.checkCollision()){
      this.isGameOver = true;
    }else{
      this.removeRows();
      this.draw();
    }
  }

  private rotatePiece(): void {
    //matriz n x m
    const previousMatriz = structuredClone(this.pieceTetris.bidimensionalData);
    const matriz = this.pieceTetris.bidimensionalData;
    const n = matriz.length;
    const m = matriz[0].length;
    console.log('Matriz antigua de -> '+n+'x'+m);
    const newMatriz = Array.from({length: m}, () => Array(n).fill(0));
    console.log('Matriz nueva de -> '+newMatriz.length+'x'+newMatriz[0].length);

    //Damos la vuelta a las filas para empezar por las ultimas
    matriz.reverse();
    //Generamos rotacion
    matriz.forEach((row, index) => {
      row.forEach((value, subIndex) => {
        //Rellenamos matriz nueva
        newMatriz[subIndex][index] = value;
      });
    });

    //Actualizamos matriz de la pieza
    this.pieceTetris.bidimensionalData = newMatriz;
    if(this.checkCollision()){//Si se produce colision dejamos la que teniamos previamente
      this.pieceTetris.bidimensionalData = previousMatriz;
    }
  }

  private createEmptyBoard(): void {
    // Crear un tablero vacío de 40x30 (alto x ancho)
    this.BOARD = [[]];
    for (let row = 0; row < 30; row++) {
      this.BOARD.push(Array.from({ length: 15 }, () => 0));
    }
    // Array.from({ length: this.BOARD_HEIGHT }, () => {
    //   return Array(15).fill(0);
    // })
  }
}
