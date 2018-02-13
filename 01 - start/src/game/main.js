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

    makeFloor() {
        for(var i=0; i<5; i++) {
            // get sprite from sprite sheet
            var floor = new game.Sprite("floor.png");

            // add it to the stage and place it
            floor.addTo(this.stage);
            floor.y = game.height-floor.height;
            floor.x = floor.width*i;
        }
        return game.height-floor.height;
    }
});

}); // module