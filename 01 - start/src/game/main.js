game.module(
    'game.main'
)
.body(function() {

// load sprite sheet
game.addAsset('betty.atlas');

game.createScene('Main', {

    init: function() {
        // set background color for the scene
        this.backgroundColor = '#cceeff';

        // create floor tiles
        var groundY = this.makeFloor();
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

}); // module