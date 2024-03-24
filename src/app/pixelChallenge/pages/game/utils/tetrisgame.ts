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
    private ListGraphics: Phaser.GameObjects.Graphics[] = [];

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
        // Dibujar el fondo del tablero
        this.graphics = this.add.graphics();
        this.graphics.fillStyle(0xFFFFFF); // Color blanco
        this.graphics.fillRect(0, 0, this.board[0].length * this.blockSize, this.board.length * this.blockSize);
    
        // Dibujar las celdas del tablero
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                const x = col * this.blockSize;
                const y = row * this.blockSize;
                // Dibujar el borde de la celda
                this.graphics.lineStyle(1, 0x000000); // Borde negro con grosor 1
                this.graphics.strokeRect(x, y, this.blockSize, this.blockSize);
            }
        }
    }
    

    private drawPrice(): void {
        //Creamos intancia grafica
        this.graphics = Phaser.Scene.prototype.add.graphics();
        //Inicializamos datos pieza
        this.inicializePropertiesFigure();
        this.currentPiece.bidimensionalData.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    const valX = x + this.currentPiece.positionX * this.blockSize;
                    const valY = y + this.currentPiece.positionY * this.blockSize;
                    this.graphics.fillStyle(this.currentPiece.color);
                    this.graphics.lineStyle(1, 0x000000); // Borde negro con grosor 1
                    this.graphics.strokeRect(valX, valY, this.blockSize, this.blockSize);
                    this.graphics.fillRect(valX, valY, this.blockSize, this.blockSize);
                }
            })
        })
        //Pusheamos instancia
        this.ListGraphics.push(this.graphics);
        //Eventos teclas
        document.addEventListener('keydown', event => {
            if(event.key === 'ArrowLeft'){
                this.currentPiece.positionX --;
                if(this.isThereCollision()){
                    this.currentPiece.positionX ++;
                }
            }
            if(event.key === 'ArrowRight'){
                this.currentPiece.positionX ++;
                if(this.isThereCollision()){
                    this.currentPiece.positionX --;
                }
            }
            if(event.key === 'ArrowDown'){
                this.currentPiece.positionY ++;
                if(this.isThereCollision()){
                    this.solidification();
                    console.log(this.board)
                    this.drawPrice();
                }
            }
        });
        this.createTime();
    }

    private inicializePropertiesFigure(): void {
        const piece: number[][] = JSON.parse(JSON.stringify(this.generateSpawnFigure()));
        this.currentPiece = {
            totalCols: piece[0].length,
            totalRows: piece.length,
            positionX: this.generateRandomPositionX(),
            positionY: 0,
            color: this.generateRandomColor(),
            bidimensionalData: this.generateSpawnFigure()
        }
        this.destroyedTime();
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
        try {
            const totalY = this.currentPiece.positionY + this.currentPiece.totalRows;
            if(!this.isThereCollision() && totalY < 39){
                this.clearPiece();
                this.reDrawPiece();
            } else {
                console.log(this.board);
                console.log("llegamos al final");
                this.solidification(); // Solidificar la pieza en el tablero
                this.clearPiece(); // Limpiar la pieza del canvas
                this.drawPrice(); // Volver a dibujar la pieza
            }
        } catch (error) {
            console.error(error);
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
            callback: this.movePiece,
            callbackScope: this,
            loop: true // Hacer que se repita automáticamente
        });
    }

    private isThereCollision(): number[] | undefined {
        return this.currentPiece.bidimensionalData.find((row, y) => {
            return row.find((value, x) => {
                return value === 0 && 
                    this.board[y + this.currentPiece.positionY]?.[x + this.currentPiece.positionX] !== 0 || 
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
        this.currentPiece.bidimensionalData.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 1) {
                    const valX = (x + this.currentPiece.positionX) * this.blockSize;
                    const valY = (y + this.currentPiece.positionY) * this.blockSize;
                    this.graphics.fillStyle(this.currentPiece.color);
                    this.graphics.fillRect(valX, valY, this.blockSize, this.blockSize);
                }
            })
        })
    }

    private solidification(): void {
        this.currentPiece.bidimensionalData.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value === 1) {
                    const posY = y + this.currentPiece.positionY;
                    const posX = x + this.currentPiece.positionX;
                    if (posY >= 0 && posY < this.board.length && posX >= 0 && posX < this.board[0].length) {
                        this.board[posY][posX] = 1;
                    } 
                }
            })
        })
    }
}
