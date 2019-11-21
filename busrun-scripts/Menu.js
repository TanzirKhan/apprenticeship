class Menu extends Phaser.Scene {

    constructor(){
        super('menu');
    }

    preload(){
        this.load.image('collider', '../assets/collider.png');
        this.load.image('bus', '../assets/bus-a.png');
        this.load.image('road', '../assets/Road3.png');
        this.load.image('selfplug', '../assets/techholic.png');
        this.load.image('touch', '../assets/touch.png');
        this.load.image('coin', '../assets/coin.png');
        this.load.atlas('anim', '../assets/titleanim.png', '../assets/titleanim.json');
        this.load.image('logo', '../assets/bus.png');
        this.load.atlas('coinSpin', '../assets/sprites.png', '../assets/sprites.json');
        this.load.audio('bgm', '../assets/bgm.mp3');
    }
    create(){
        //ANIMATION
        this.anims.create({
            key:'shine',
            frames: this.anims.generateFrameNames(
                'anim',
            ),
            loop: Infinity
        });
        this.anims.create({
            key: 'coinToss',
            frames: this.anims.generateFrameNames(
                'coinSpin',
                {
                    prefix: "Gold_",
                    suffix: ".png",
                    start: 21,
                    end: 30,
                    zeroPad: 2,
                }
            ),
            repeat: -1
        });
        Menu.road = this.add.image(200,0,'road').setScale(1.01);
        var selfPlug = this.add.image(350,850, 'selfplug').setAlpha(0.8).setScale(0.3);
        Menu.bus = this.physics.add.image(200,725,'bus').setScale(0.25);
        //hsv = Phaser.Display.Color.HSVColorWheel();
        //logo = this.add.text(75, 100, 'BUSRUN', {font: "75px Impact"});
        Menu.logo = this.physics.add.sprite(200,175,'anim').setScale(0.8);
        Menu.logo.setVelocity(0, 50);
        Menu.logo.setGravity(0,150);
        Menu.logo.setBounce(1);
    
    
        
        //Menu.logo.setGravity(0, 150);
        var startButt = this.add.image(200, 400,'touch').setScale(0.6);
    
    
        //COLLIDER BOTTOM
        var collide = this.physics.add.image(200, 300, 'collider').setScale(1).setAlpha(0);
        collide.setCollideWorldBounds(true);
        collide.body.immovable = true;

        //COLLIDERS
        this.physics.add.collider(Menu.logo, collide);

        //looping animation and duration 
        Menu.drive = this.tweens.add({
            targets: Menu.road,
            y: 900,
            duration:1500,
            loop: Infinity,
        });


        //Flashing in 
        this.tweens.add({
            targets: startButt,
            ease: 'Cubic',
            delay: 0,
            alpha: {
                getStart: () => 0.3,
                getEnd: () => 1,
            },
            yoyo: true,
            duration: 1000,
            loop: Infinity,
        });

        this.time.addEvent({
            delay: 3000,
            callback: this.animation,
            callbackScope: this,
            repeat: -1
        })

        var check = 0//stopping multiple mouse clicks from resetting Spawn scene, allows more friendly mouse and touch controls
        game.canvas.addEventListener('mousedown', function(pointer){
            if(check === 0){
                game.input.mouse.requestPointerLock();
                Menu.drive.stop();
                Menu.road.setAlpha(0);
                Menu.bus.destroy();
                game.scene.start('spawn', false, false);
                Menu.logo.setVelocity(0,-750);
                Menu.logo.setGravity(0,0);
                startButt.destroy();
                selfPlug.destroy();
                collide.destroy();
                check++;
                //game.scene.stop('menu');
            }
        })
        const currency = this.add.sprite(320,33,'coinSpin', 'Gold_21.png').setScale(0.04);
        Menu.bankText = this.add.text(340,25, bank, {font: '16px Lucida Console', fill: "#ffff00"});
        currency.play('coinToss');
        
    }

    animation(){
        Menu.logo.play('shine');
    }
}
