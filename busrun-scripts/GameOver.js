class GameOver extends Phaser.Scene{
	constructor(loser, pointsUI, coinsUI){
		super('gameover');
		this.loser = loser;
		this.pointsUI = pointsUI;
		this.coinsUI = coinsUI;
	}

	preload(){
		this.load.image('loser', '../assets/scorescreen.png');
		this.load.audio('whoosh', '../assets/whoosh.mp3');
		this.load.audio('count', '../assets/score-count.wav');
		this.load.audio('loss', '../assets/loss2.wav');
	}
	create(){
		this.f = 0;
		this.points = 0;
		this.count = 0;
		this.coins = bank - Spawn.allowance;
		var writing = {
			font: '20px Lucida Console',
			fill: '#ffffff'
		}
        var loss = this.sound.add('loss');
		loss.play();
		var whoosh = this.sound.add('whoosh');
		var collider = this.physics.add.image(200, 915, 'collider').setAlpha(0).setScale(0.3);
		collider.setGravityY(0);
		collider.setImmovable(true);
		this.loser = this.physics.add.sprite(200, -660, 'loser').setScale(0.75);
		this.loser.setGravityY(3000);
		this.loser.setBounce(0.2);
		this.physics.add.collider(this.loser, collider);
		this.time.addEvent({
			delay: 1500,
			callback:() => {
				this.pointsUI = this.add.text(255, 423, this.points, writing);
				this.coinsUI = this.add.text(255, 340, this.count, writing);
				var button = this.add.circle(200, 725, 40);
				button.inputEnabled = true;
				button.setInteractive();
				button.on('pointerdown', (pointer) => {
			        loss.pause();
			        whoosh.play();
			        this.loser.setGravityY(0);
			        this.loser.setVelocityY(-2000);
			        this.pointsUI.destroy();
			        this.coinsUI.destroy();
			        button.destroy();
			        //game.scene.stop('gameover');
			        game.input.mouse.requestPointerLock();
			        game.scene.start('spawn');

				})
			repeat: 0
			},
		})
	}
	update(){
		this.f++;
		if(this.f > 90){
			if (this.points < Spawn.score){
				this.points += 5;
				this.pointsUI.setText(this.points);
			}
			if(this.count < this.coins){
				this.count++;
				this.coinsUI.setText(this.count);
			}
		}
		if(this.loser.y < -660){
			game.scene.pause('gameover');
		}
	}
}