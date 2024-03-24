export class TetrisGame1 extends Phaser.Scene {
    private currentImage?: Phaser.GameObjects.Image; // Variable para almacenar la imagen actual
    private floorY: number = 600; // Posición vertical del suelo
    private imageSpeed: number = 2; // Velocidad de caída de la imagen
    private hasNewImage: boolean = false; // Bandera para indicar si se ha generado una nueva imagen

    constructor() {
        super({ key: 'game' });
    }

    preload() {
        // Carga las imágenes en el método preload
        this.load.image('gameOver', '../../../../../assets/gameOver.jpg');
        this.load.image('figure', '../../../../../assets/img1.png');
        this.load.image('figure1', '../../../../../assets/img2.png');
        this.load.image('figure2', '../../../../../assets/img3.png');
    }

    create() {
        // Muestra la imagen 'gameOver' en la parte superior de la pantalla
        this.add.image(450, 50, 'gameOver');

        // Genera la primera imagen aleatoria
        this.spawnRandomImage();
    }

    override update() {
        // Mueve la imagen hacia abajo
        if (this.currentImage) {
            this.currentImage.y += this.imageSpeed;

            // Comprueba si la imagen colisiona con el suelo
            if (!this.hasNewImage && this.currentImage.y + this.currentImage.height >= this.floorY) {
                // Detiene la imagen en la parte inferior de la pantalla
                this.currentImage.y = this.floorY - this.currentImage.height;
                // Genera otra imagen aleatoria y vuelve a colocarla en la parte superior
                this.spawnRandomImage();
                // Marca que se ha generado una nueva imagen
                this.hasNewImage = true;
            }
        }
    }

    spawnRandomImage() {
        // Elimina la imagen actual si existe
        if (this.currentImage) {
            this.currentImage.destroy();
        }

        // Lista de nombres de las imágenes de las figuras de Tetris
        const figuras = ['figure', 'figure1', 'figure2'];

        // Elige aleatoriamente un nombre de imagen de la lista
        const randomImgKey = Phaser.Math.RND.pick(figuras);

        // Crea un sprite con la imagen aleatoria y colócalo en la parte superior de la pantalla
        const width = this.game.config.width as number;
        this.currentImage = this.add.image(Phaser.Math.Between(0, width), 0, randomImgKey).setScale(0.25);

        // Centra la imagen horizontalmente
        this.currentImage.setOrigin(0.5, 0);
        
        // Restablece la bandera de nueva imagen
        this.hasNewImage = false;
    }
}
