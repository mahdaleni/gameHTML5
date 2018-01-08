var loadBarCommand;
var preloader = {
    title: new createjs.Bitmap("img/title.png"),
    startPug: new createjs.Bitmap("img/pug.png"),
    queue: new createjs.LoadQueue(true),
    loadBar: new createjs.Shape(),
    load:function(){
        this.loadBar.graphics.beginFill("#f8eeb9");
        this.loadBar.x = 0;
        //80% from top
        this.loadBar.y =(window.innerHeight/10)*7;
        loadBarCommand = this.loadBar.graphics.drawRect(0,0, 0, 5).command;
        game.stage.addChild(this.loadBar);
        

        this.queue.installPlugin(createjs.Sound);
        this.queue.on("progress", this.progress, this);
        //  Animation before starting the game
        this.queue.on("complete", this.animation, this);
        this.queue.loadManifest([
            {id:'bgMusic', src:'audio/bg.mp3'},
            {id:'whoosh', src:'audio/whoosh.mp3'},
            {id:'woof', src:'audio/woof.m4a'},
            {id:'gameover', src:'audio/gameover.mp3'},
            "spritesheets/hero.png",
            "spritesheets/enemy.png",
            "img/pug.png",
            "img/title.png",
            "img/title-xs.png",
            "img/close.png",
            "img/instruction.png",
            "img/tapswipe.png",
            "img/audiomute.png",
            "img/audioplay.png",
            {id:'heroJson', src:'spritesheets/hero.json'},
            {id:'enemyJson', src:'spritesheets/enemy.json'},
            "js/ticker.js", "js/objects.js",
            "js/controls.js"
        ])
    },
    progress:function(e){
        loadBarCommand.w = Math.round(e.progress*100)*(window.innerWidth/100);
        game.stage.update();
    },
    animation:function(){
        game.stage.removeAllChildren();
        var loadTextDOM = document.getElementById( 'loadingText' );
        loadTextDOM.parentNode.removeChild( loadTextDOM );
        ticker.start();
        
        preloader.title.width=233;
        preloader.title.height=94;
        preloader.title.x=window.innerWidth/2-(preloader.title.width/2);
        preloader.title.y=(window.innerHeight/10)*2;
        game.stage.addChild(preloader.title);

        preloader.startPug.width=167;
        preloader.startPug.height=140;
        preloader.startPug.x=-preloader.startPug.width;
        preloader.startPug.y=window.innerHeight/2+50;
        game.stage.addChild(preloader.startPug);

        createjs.Sound.play('whoosh',{delay:520});
        createjs.Sound.play('whoosh',{delay:1550});
        createjs.Tween.get(preloader.startPug).to({x:(window.innerWidth/2)-(preloader.startPug.width/2)},1500, createjs.Ease.backInOut).call(preloader.animationOut);
    },
    animationOut:function(){
        createjs.Tween.get(preloader.title).wait(200).to({y:50},300).call(game.startScreen);
        createjs.Tween.get(preloader.startPug).to({x:window.innerWidth},500, createjs.Ease.backInOut);
    }


};

