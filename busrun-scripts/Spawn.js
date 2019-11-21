let matConfig = {
    key: 'spawn',
    type: Phaser.AUTO,
    height: 900,
    width: 400,
    pixelArt: true,
    physics: {                
        matter: {
            debug: false,
            gravity:{y:0}
        }
    }
}


let value = 10;
let hold = 0;
const HOLDCAP = 50;
const SPEED = 0.15;


class Spawn extends Phaser.Scene {
    constructor(){
        super(matConfig);
    }

    preload(){
        this.load.atlas('cars', '../assets/cars.png', '../assets/cars.json');
        //this.load.scenePlugin('PhaserMatterCollisionPlugin', 'phaser-matter-collision-plugin.min.js', 'matterCollision','matterCollision')
        //this.load.image('coin', 'assets/coin.png');
        this.load.image('fuel', '../assets/fuel.png');
        this.load.image('whiteFlare', '../assets/white-flare.png');
        this.load.image('fuelindicator', '../assets/fuelgauge.png');
        this.load.audio('pickup', '../assets/p-ping.mp3');
        this.load.audio('rev', '../assets/fuel.wav');
        this.load.image('road3', '../assets/Road3.png');
    }
    create(){
        Spawn.allowance = bank;
        var check = 0;
        Spawn.road = this.add.image(200, 0, 'road3');

        this.tweens.add({
            targets: Spawn.road,
            y: 900,
            duration:1500,
            loop: Infinity,
        });

        Spawn.score = 0;

        Spawn.bgm = this.sound.add('bgm');
        //Spawn.bgm.play();

        Spawn.bus = this.matter.add.sprite(200, 725,'bus').setScale(0.25);
        Spawn.bus.setFrictionAir(0);
        Spawn.bus.setBody({
            type: 'rectangle',
            width: 45,
            height: 205,
        });
        Spawn.bus.setMass(Infinity);

        Spawn.scoreUI = this.add.text(25,25, 'Score ' + 0, {font: '16px Lucida Console'});

        Spawn.oncoming = this.time.addEvent({
            //cars will appear every 3 seconds
            delay: 3000,
            callback: function(){
                //CREATING CARS
                //random cars
                this.spawnCar();
                if(Spawn.score>5000){
                    this.spawnCar();
                }

                //coins
                this.spawnCoin();

                //fuel
                this.spawnFuel();

            },
            callbackScope: this,
            repeat: -1
        })

        const currency = this.add.sprite(320,33,'coinSpin', 'Gold_21.png').setScale(0.04);
        Spawn.bankText = this.add.text(340,25, bank, {font: '16px Lucida Console', fill: "#ffff00"});
        currency.play('coinToss');

        Spawn.cursors = this.input.keyboard.createCursorKeys();

        //mouse controls / touch controls
        this.input.on('pointermove', function(pointer){
            hold = 0;
            if(pointer.movementX != 0){
                Spawn.bus.setVelocityX(pointer.movementX/30);
            }
        });

        this.add.image(35, 150, 'fuelindicator').setScale(0.45);

        Spawn.rect = this.add.rectangle(35, 150, 8, 165, 0x99ff33).setRotation(3.14);

        Spawn.rect2 = this.add.rectangle(35,67,0,18);

        Spawn.particles = this.add.particles('whiteFlare');

        Spawn.emitter = Spawn.particles.createEmitter({
            speed: 100,
            scale: {start: 0.015, end: 0},
            gravityY: -1500,
            blendMode: "ADD"
        })

        Spawn.emitter.startFollow(Spawn.rect2);
        var coinSfx = this.sound.add('pickup');
        var revSfx = this.sound.add('rev');

        this.matter.world.on('collisionstart', (event)=> {
            var pairs = event.pairs;
            
            for(var i = 0; i<pairs.length; i++){
                var bodyA = pairs[i].bodyA;
                var bodyB = pairs[i].bodyB;

                //coins has circle body as their label
                if(bodyA.mass === Infinity){
                    if(bodyB.label === "Circle Body"){
                        Spawn.coin.destroy();
                        bank += value;
                        Spawn.bankText.setText(bank);
                        localStorage.setItem('bal', bank);
                        //value of bal set here in local storage
                        coinSfx.play();

                    }
                    //cars has rectangle body as their label
                    if(bodyB.label === "Rectangle Body"){
                        if(bodyB.mass === Epsilon){
                            Spawn.fuel.destroy();
                            Spawn.rect.height += 45;
                            Spawn.rect2.y -= 45;
                            revSfx.play();
                        }
                        else{
                            this.lose();
                        }
                    }
                }
            }
                /*This method of identifying objects may come prop up problems if we decide to add fuel or the such to the game
                It's kinda unintuitive, if we find a better way we can use it instead of the code here since.
                This is in the update method because the game suffers from huge amounts of lag if it's in the 
                update method and touching a coin would reward the player with thousands of coins.
                I figured out how to specify the object using console.log
                */
        });

    }
    //broke up the timed event code into functions
    spawnCar = function(){
        Spawn.car = this.matter.add.image(Phaser.Math.Between(20, 380), -200, 'cars', 'cars_0' + Phaser.Math.Between(1,6) + '.png').setScale(0.6);

        Spawn.car.setBody({
            width: 50,
            height: 107
        })
        Spawn.car.setFrictionAir(0);
        Spawn.car.setVelocityY(11);
    }
    spawnCoin = function(){
        Spawn.coin = this.matter.add.image(Phaser.Math.Between(40,160), -500, 'coinSpin', 'Gold_21.png').setScale(0.05).setAlpha(0.9);
        Spawn.coin.setBody({
            type: 'circle',
            width: 30,
            height: 30
        });
        Spawn.coin.setFrictionAir(0);
        Spawn.coin.setVelocityY(10);
        Spawn.coin.setMass(Epsilon);
    }
    spawnFuel = function(){
        Spawn.fuel = this.matter.add.image(Phaser.Math.Between(240, 360), -500, 'fuel').setScale(0.18);
        Spawn.fuel.setBody({
            width: 30,
            height: 30
        })
        Spawn.fuel.setMass(Epsilon);
        Spawn.fuel.setFrictionAir(0);
        Spawn.fuel.setVelocityY(10);
    }
    lose = function(){
        Spawn.bgm.pause();
        game.scene.pause('menu');
        game.scene.pause('spawn');
        game.scene.start('gameover');
    }


    update(){
        Spawn.bus.y = 725;
        Spawn.bus.setRotation(Spawn.bus.body.velocity.x/HOLDCAP);
        if(hold > HOLDCAP){
            hold = HOLDCAP;
        }
        else if(hold < -HOLDCAP){
            hold = -HOLDCAP;
        }
        if(Spawn.cursors.left.isDown){
            //Spawn.bus.body.velocity.x -= 10;
            hold--;
            Spawn.bus.setVelocityX(SPEED*hold);
        }
        else if(Spawn.cursors.right.isDown){
            //Spawn.bus.body.velocity.x += 10;
            hold++;
            Spawn.bus.setVelocityX(SPEED*hold);
        }
        else if(Spawn.bus.body.velocity.x === 0){
            Spawn.bus.setVelocityX(0);
            hold = 0;
        }
        else{
            //ease straight when no button is down
            if(Spawn.bus.body.velocity.x > 0){
                hold--;
                Spawn.bus.setVelocityX(SPEED*hold);
            }
            else if(Spawn.bus.body.velocity.x < 0){
                hold++;
                Spawn.bus.setVelocityX(SPEED*hold);
            }
            else{
                hold = 0;
            }
        };
        if(Spawn.score%5000 == 0 && Spawn.score != 0){
            value += 5;
        }
        Spawn.rect.height -= 0.15;

        if(Spawn.rect.height < 1){
            Spawn.rect.height = 0;
            Spawn.emitter.setAlpha(0);
            this.lose();
        }
        if(Spawn.rect.height > 165){
            Spawn.rect.height = 165;
            Spawn.rect2.y = 67;
        }
        if(Spawn.rect.height < HOLDCAP){
            Spawn.rect.setFillStyle(0xcc0000);
        }
        if(Spawn.rect.height >= HOLDCAP){
            Spawn.rect.setFillStyle(0x99ff33);
        }
        Spawn.rect2.y += 0.15;

        if(Spawn.bus.x > 400){
            Spawn.bus.x = 400;
            hold = 0;
        }
        else if(Spawn.bus.x < 0){
            Spawn.bus.x = 0;
            hold = 0;
        }

        if(Spawn.score %5650 == 0){
            Spawn.bgm.play();
        }

        Spawn.score++;
        Spawn.scoreUI.setText('Score ' + Spawn.score);

    };

}