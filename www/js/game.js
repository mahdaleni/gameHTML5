var game = {
    isRunning: false,
    canvas: document.getElementById('canvas'),
    stage:new createjs.Stage("canvas"),
    init:function(){
        preloader.load();
        window.addEventListener('resize', game.resizeCanvas);
        this.canvas.width=window.innerWidth;
        this.canvas.height = window.innerHeight;
    },
    startScreen: function(){
        document.getElementById("close").className= "invisible";
        document.getElementById("credits").className= "invisible";
        document.getElementById("instructions").className= "invisible";
        objects.getPug();
        objects.getButtons();
        objects.getMuteButton();
    },
    setupGame:function(){
        game.stage.removeChild(preloader.startPug, objects.audioButton, preloader.title);
        document.getElementById("button-holder").className= "invisible";
        objects.addBar();
        game.stage.addChild(objects.bar);
        if (game.canvas.width>655){
            objects.getTitleXs();
            game.stage.addChild(preloader.title);
        }
        game.isRunning=true;
        objects.audioButtonGame();
        game.stage.addChild(objects.audioButton);
        game.score = objects.getScore();
        game.stage.addChild(game.score);
        game.hero = objects.getHero();
        game.stage.addChild(game.hero);
        this.sound= objects.playBgSound();
        controls.initialize();
    },
    howToPlay:function(){
        document.getElementById("close").className= "close-button";
        document.getElementById("instructions").className= "instructions centered";
        document.getElementById("instructions").style.top= 25+"px";
        document.getElementById("instructions").style.left= 25+"px";
        document.getElementById("instructions").style.height= game.stage.canvas.height-50+"px";
        document.getElementById("instructions").style.width= window.innerWidth-100+"px";
        document.getElementById("close").addEventListener('click', game.startScreen);
        document.getElementById("close").addEventListener('touchstart', game.startScreen);
    },
    credits:function(){
        document.getElementById("close").className= "close-button";
        document.getElementById("credits").className= "credits centered";
        document.getElementById("credits").style.top= 25+"px";
        document.getElementById("credits").style.left= 25+"px";
        document.getElementById("credits").style.height= game.stage.canvas.height-50+"px";
        document.getElementById("credits").style.width= window.innerWidth-100+"px";
        document.getElementById("close").addEventListener('click', game.startScreen);
        document.getElementById("close").addEventListener('touchstart', game.startScreen);
    }
};
