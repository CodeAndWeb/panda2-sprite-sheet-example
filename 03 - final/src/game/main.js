game.module(
    'game.main'
)
.body(function() {

game.addAsset('betty.atlas');

game.createScene('Main', {
    init: function() {
        this.backgroundColor = '#cceeff';

        var groundY = this.makeFloor();

        this.player = new game.Player();
        this.player.addTo(this.stage);
        this.player.setPosition(game.width/2, groundY);
        
        var text = new game.SystemText(
            "Use arrow keys to move Betty", 
            {color: '#000', size:20, x:10, y:10}
        );
        text.addTo(this.stage);
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
        if(game.input.touches.length)
        {
            console.log(game.input.touches);
        }
    },

    makeFloor: function() {
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
        this.sprite.anims.run = this.sprite;
        this.sprite.anims.stand = game.Animation.fromTextures('stand/right');

        this.direction = 1;
    },

    addTo: function(container) {
        this.sprite.addTo(container);
    },
    
    setPosition: function(x,y) {
        this.sprite.position.set(x,y);
    },
    
    run: function(direction) {
        this.direction = direction;
        var speed = 400;
        this.sprite.x += direction * speed * game.delta;
        this.changeAnimation('run');
    },
    
    stand: function() {
        this.changeAnimation('stand');  
    },
    
    changeAnimation: function(action) {
        this.sprite.scale.x = this.direction;
        if (this.sprite.currentAnim === this.sprite.anims[action]) return;
        this.sprite.play(action);
    }
});

}); // module

