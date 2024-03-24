import { ListOfPieces } from "./geometricPieces";

export class TetrisGame extends Phaser.Scene {
    public blockSize = 30; // Tamaño de cada bloque en píxeles
    public board: number[][] = [[]]; // Array bidimensional para representar el tablero
    public graphics!: Phaser.GameObjects.Graphics; // Objeto para dibujar
    public initialPositionYPiece: number = 0;
    public initialPositionXPiece: number = 0;
    public color: number | undefined;
    public currentPiece: number[][] = [[]];
    public numberRowsPiece: number = 0;
    public numberColsPiece: number = 0;
    private timerEvent: Phaser.Time.TimerEvent | undefined;
    private placedPiecesGraphics: Phaser.GameObjects.Graphics[] = [];

    constructor() {
        super({key: 'game'});
    }

    preload() {
    }

    create(){
        this.board = this.createEmptyBoard();
        this.drawBoard();
        this.drawFigure();
        console.log(this.board);
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
            this.add.graphics().strokeRect(x, y, this.blockSize, this.blockSize);
          }
        }
    }

    private drawFigure(): void {
        this.inicializePropertiesFigure();
        //Creamos intancia grafica y pusheamos
        this.graphics = this.add.graphics();
        this.placedPiecesGraphics.push(this.graphics); 
        // Dibujar figura
        this.currentPiece = this.generateSpawnFigure();
        this.numberRowsPiece = this.currentPiece.length;
        this.numberColsPiece = this.currentPiece[0].length;
        this.initialPositionXPiece = this.generateRandomPositionX();
        this.color = this.generateRandomColor();
        for(let row = 0; row < this.currentPiece.length; row++){
            for(let col = 0; col < this.currentPiece.length; col++){
                const x = (col + this.initialPositionXPiece) * this.blockSize;
                const y = (row + this.initialPositionYPiece) * this.blockSize;
                if (this.currentPiece[row][col] === 1) {
                    this.board[row + this.initialPositionYPiece][col + this.initialPositionXPiece] = 1;
                    this.graphics.fillStyle(this.color);
                    this.graphics.fillRect(x, y, this.blockSize, this.blockSize);
                    this.graphics.lineStyle(1, 0x000000);
                    this.graphics.strokeRect(x, y, this.blockSize, this.blockSize);
                }
            }
        }
        this.destroyedTime();
        this.createTime();
    }

    private inicializePropertiesFigure(): void {
        this.initialPositionYPiece = 0;
        this.initialPositionXPiece = 0;
        this.currentPiece = [[]];
        this.numberRowsPiece = 0;
    };

    private generateSpawnFigure(): number[][] {
        const indice = Math.floor(Math.random() * ListOfPieces.length);
        return ListOfPieces[indice];
    }

    private generateRandomPositionX(): number {
        //Si la posicion donde empezaria a pintarse es 30, restamos a 30 la longitud para que no sobrepase la matriz horizaontalmente
        const position: number = Math.floor(Math.random() * 30);
        return position + this.numberColsPiece <= 30 ? position: 30 - this.numberColsPiece;
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

    private movePieceToDown(): void {
        console.log(this.board); 
        try {
            if(this.isNotThereCollision()){
                this.clearPiece();
                this.reDrawPiece();
            }else {
                this.fixPiece();
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
            delay: 1000,
            callback: this.movePieceToDown,
            callbackScope: this,
            loop: true // Hacer que se repita automáticamente
        });
    }

    private isNotThereCollision(): boolean {
        return this.initialPositionYPiece + this.numberRowsPiece < this.board.length;
    }

    private clearPiece(): void {
        for(let cols = 0; cols < 30; cols++){
            this.board[this.initialPositionYPiece][cols] = 0;
        }
        this.graphics.clear();
        this.drawBoard();
    }

    private reDrawPiece(): void {
        this.initialPositionYPiece++;
        // Dibuja la pieza en su nueva posición
        for(let row = 0; row < this.currentPiece.length; row++){
            for(let col = 0; col < this.currentPiece[row].length; col++){
                const x = (col + this.initialPositionXPiece) * this.blockSize;
                const y = (row + this.initialPositionYPiece) * this.blockSize;
                if (this.currentPiece[row][col] === 1) {
                    this.board[row + this.initialPositionYPiece][col + this.initialPositionXPiece] = 1;
                    this.graphics.fillStyle(this.color!);
                    this.graphics.fillRect(x, y, this.blockSize, this.blockSize);
                    this.graphics.lineStyle(1, 0x000000);
                    this.graphics.strokeRect(x, y, this.blockSize, this.blockSize);
                }
            }
        }
    }

    private fixPiece(): void {
        this.drawFigure();
    }
}
