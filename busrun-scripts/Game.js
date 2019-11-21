let config = {
    key: 'game',
    type: Phaser.AUTO,
    height: 900,
    width: 400,
    pixelArt: true,
    physics: {
        default: 'arcade',       
        arcade: {
            debug: false,
            gravity: {y: 0}
        },
        /*matter: {
            debug: true,
            gravity: {y:0}
        }*/
    },
    scene: [Menu, Spawn, GameOver]
};


/*class Game extends Phaser.Game {

    constructor(){
        super(config);

        this.scene.add('Menu', Menu, false);
        this.scene.add('Spawn', Spawn, false);

        this.scene.start('Menu');
    }
}
new Game();*/
let bank = localStorage.getItem('bal');
//bank is set to the value of bal, retaining the coins the players have gathered
bank = parseInt(bank, 10);
const Epsilon = 0.00000001
var game = new Phaser.Game(config);
console.log(window.height);