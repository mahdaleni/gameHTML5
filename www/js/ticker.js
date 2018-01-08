var ticker = {
    start:function(){
        createjs.Ticker.setFPS(60);
        createjs.Ticker.on("tick", this.tock)
    },
    tock:function(e){
        if (game.isRunning) {
            game.hero.move();
            game.score.update();
            objects.barOnTop();
            objects.getEnemy();
            objects.moveEnemy();
            objects.checkCollisions();
            objects.increaseDifficulty();
        }
        game.stage.update(e);
    }
};
