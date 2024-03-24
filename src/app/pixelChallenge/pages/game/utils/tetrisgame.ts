import { ListOfPieces } from "./geometricPieces";
import { PieceTetris } from "./interfaces/tetris.interface";

export class TetrisGame extends Phaser.Scene {
    public blockSize = 30; // Tamaño de cada bloque en píxeles
    public board: number[][] = [[]]; // Array bidimensional para representar el tablero
    public graphics!: Phaser.GameObjects.Graphics; // Objeto para dibujar
    public initialPositionYPiece: number = 0;
    public initialPositionXPiece: number = 0;
    public currentPiece: PieceTetris = {
        totalRows: 0,
        totalCols: 0,
        positionX: 0,
        positionY: 0,
        color: 0,
        bidimensionalData: [[]]
    }
    private timerEvent: Phaser.Time.TimerEvent | undefined;

    constructor() {
        super({key: 'game'});
    }

    preload() {
    }

    create(){
        this.board = this.createEmptyBoard();
        this.drawBoard();
        this.drawPrice();
        console.log(this.board);
    }

    override update(time: number, delta: number): void {
        
    }

    private createEmptyBoard(): number[][] {
        // Crear un tablero vacío de 40x30 (alto x ancho)
        const board: number[][] = [];
        for (let row = 0; row < 40; row++) {
          board.push(Array.from({ length: 30 }, () => 0));
        }
        return board;
    }

    private drawBoard() {
        // Dibujar el tablero
        for (let row = 0; row < this.board.length; row++) {
          for (let col = 0; col < this.board[row].length; col++) {
            const x = col * this.blockSize;
            const y = row * this.blockSize;
            
            this.add.graphics().fillRect(x, y, this.blockSize, this.blockSize);
          }
        }
    }

    private drawPrice(): void {
        this.inicializePropertiesFigure();
        //Creamos intancia grafica y pusheamos
        this.graphics = this.add.graphics();
        const piece: number[][] = this.generateSpawnFigure();
        // Dibujar figura
        this.currentPiece = {
            totalCols: piece.length,
            totalRows: piece[0].length,
            positionX: this.generateRandomPositionX(),
            positionY: 0,
            color: this.generateRandomColor(),
            bidimensionalData: this.generateSpawnFigure()
        }
        this.currentPiece.bidimensionalData.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    this.graphics.fillStyle(this.currentPiece.color);
                    this.graphics.fillRect((x + this.currentPiece.positionX) * this.blockSize,
                    (y + this.currentPiece.positionY) * this.blockSize , this.blockSize, this.blockSize);
                }
            })
        })
        this.destroyedTime();
        this.createTime();
    }

    private inicializePropertiesFigure(): void {
        this.currentPiece.positionX = 0;
        this.currentPiece.positionY = 0;
        this.currentPiece.bidimensionalData = [[]];
    };

    private generateSpawnFigure(): number[][] {
        const indice = Math.floor(Math.random() * ListOfPieces.length);
        return ListOfPieces[indice];
    }

    private generateRandomPositionX(): number {
        //Si la posicion donde empezaria a pintarse es 30, restamos a 30 la longitud para que no sobrepase la matriz horizaontalmente
        const position: number = Math.floor(Math.random() * 30);
        return position + this.currentPiece.totalCols <= 30 ? position: 30 - this.currentPiece.totalCols;
    }
    private generateRandomColor(): number {
        // Generar componentes RGB aleatorios entre 1 y 255
        const red = Math.floor(Math.random() * 255) + 1;
        const green = Math.floor(Math.random() * 255) + 1;
        const blue = Math.floor(Math.random() * 255) + 1;

        // Convertir los componentes a formato hexadecimal
        const redHex = red.toString(16).padStart(2, '0');
        const greenHex = green.toString(16).padStart(2, '0');
        const blueHex = blue.toString(16).padStart(2, '0');

        // Concatenar los componentes para formar el color completo
        return Number.parseInt(`0x${redHex}${greenHex}${blueHex}`);
    }

    private movePiece(): void {
        console.log(this.board); 
        try {
            const positionX = this.currentPiece.positionX;
            const positionY = this.currentPiece.positionY;
            document.addEventListener('keydown', event => {
                if(event.key === 'ArrowLeft'){
                    this.currentPiece.positionX --;
                    if(this.isThereCollision()){
                        this.currentPiece.positionX = positionX;
                    }
                }
                if(event.key === 'ArrowRight'){
                    this.currentPiece.positionX ++;
                    if(this.isThereCollision()){
                        this.currentPiece.positionX = positionX;
                    }
                }
                if(event.key === 'ArrowDown'){
                    this.currentPiece.positionY ++;
                    if(this.isThereCollision()){
                        this.currentPiece.positionY = positionY;
                        // this.solidification();
                        this.drawPrice();
                    }
                }
            })
            if(!this.isThereCollision()){
                this.clearPiece();
                this.reDrawPiece();
            }else{
                console.log("llegamos al final")
                // this.solidification();
                this.drawPrice();
            }
        } catch (error) {
            this.destroyedTime();
        }

    }

    private destroyedTime(): void {
        if (this.timerEvent) {
            // Detener el temporizador
            console.log("Detenemos tetris por error");
            this.timerEvent.remove(false);
        }
    }
    private createTime(): void {
        this.timerEvent = this.time.addEvent({
            delay: 100,
            callback: this.movePiece,
            callbackScope: this,
            loop: true // Hacer que se repita automáticamente
        });
    }

    private isThereCollision(): number[] | undefined {
        return this.currentPiece.bidimensionalData.find((row, y) => {
            return row.find((value, x) => {
                return value === 0 && 
                    this.board[y + this.currentPiece.positionY]?.[this.currentPiece.positionX] !== 0 || 
                    this.currentPiece.positionY + this.currentPiece.totalRows > this.board.length
            })
        })
    }

    private clearPiece(): void {
        for(let cols = 0; cols < 30; cols++){
            this.board[this.currentPiece.positionY][cols] = 0;
        }
        this.graphics.clear();
        this.drawBoard();
    }

    private reDrawPiece(): void {
        this.currentPiece.positionY++;
        // Dibuja la pieza en su nueva posición
        for(let row = 0; row < this.currentPiece.bidimensionalData.length; row++){
            for(let col = 0; col < this.currentPiece.bidimensionalData[row].length; col++){
                const x = (col + this.currentPiece.positionX) * this.blockSize;
                const y = (row + this.currentPiece.positionY) * this.blockSize;
                if (this.currentPiece.bidimensionalData[row][col] === 1) {
                    this.board[row + this.currentPiece.positionY][col + this.currentPiece.positionX] = 1;
                    this.graphics.fillStyle(this.currentPiece.color);
                    this.graphics.fillRect(x, y, this.blockSize, this.blockSize);
                }
            }
        }
    }

    private fixPiece(): void {
        this.drawPrice();
    }

    // private solidification(): void {
    //     this.currentPiece.bidimensionalData.forEach((row, y) => {
    //         row.forEach((value, x) => {
    //             if (value === 1) {
    //                 this.board[y + this.currentPiece.positionY][x + this.currentPiece.positionX] = 1;
    //             }
    //         })
    //     })
    // }
}
