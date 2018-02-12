game.module(
    'game.main'
)
.body(function() {

game.addAsset('player.atlas');

game.createScene('Main', {
    init: function() {
        this.backgroundColor = '#cceeff';

        var groundY = this.makeFloor();

        this.player = new game.Player();
        this.player.addTo(this.stage);
        this.player.setPosition(game.width/2, groundY);
    },
    
    update: function() {
        if (game.keyboard.down('LEFT')) {
            this.player.run(-1);
        }
        else if (game.keyboard.down('RIGHT')) {
            this.player.run(1);
        }
        else {
            this.player.stand();
        }
    },
    
    makeFloor() {
        for(var i=0; i<5; i++) {
            var floor = new game.Sprite("floor.png");
            floor.addTo(this.stage);
            floor.y = game.height-floor.height;
            floor.x = floor.width*i;
        }
        return game.height-floor.height;
    }
});

game.createClass('Player', {
    init: function() {
        this.sprite = game.Animation.fromTextures('right/');
        this.sprite.anims.run_right = this.sprite;
        this.sprite.anims.run_left = game.Animation.fromTextures('left/');
        this.sprite.anims.stand_right = game.Animation.fromTextures('stand/right');
        this.sprite.anims.stand_left = game.Animation.fromTextures('stand/left');
        this.sprite.play();

        this.direction = 1;
    },

    addTo: function(container) {
        this.sprite.addTo(container);
    },
    
    setPosition: function(x,y) {
        this.sprite.position.set(x,y);
    },
    
    run: function(direction) {
        var speed = 400;
        this.sprite.x += direction * speed * game.delta;
        this.changeAnimation('run', direction);
    },
    
    stand: function() {
        this.changeAnimation('stand', this.direction);  
    },
    
    changeAnimation: function(action, direction) {
        this.direction = direction;
        var anim = action+"_"+((this.direction == 1) ? 'right' : 'left') ;
        if (this.sprite.currentAnim === this.sprite.anims[anim]) return;
        this.sprite.play(anim);
    }
});

}); // module

