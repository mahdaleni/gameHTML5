var speedAdded=false;
var objects = {
    audioButton: new createjs.Bitmap("img/audioplay.png"),
    bar : new createjs.Shape(),
    heroCurrentAnimation: "stand",
    getHero:function(){
        var heroSS = new createjs.SpriteSheet(preloader.queue.getResult("heroJson"));
        var hero = new createjs.Sprite(heroSS, "stand");
        hero.width=32;
        hero.height=32.5;

        //should be dependent on screen size
        hero.speed=15;

        hero.x=controls.coordinates.x;
        hero.y=controls.coordinates.y;
        hero.gotoAndStop("stand");

        hero.move=function(){
            this.x += (controls.coordinates.x-this.x)/this.speed;
            this.y += (controls.coordinates.y-this.y)/this.speed;

         if (Math.abs(controls.coordinates.x - this.x)>Math.abs(controls.coordinates.y - this.y)){
             // plus and minus 10 because hero.x keeps changing and never becomes completely equal to controls.coordinates
             if (objects.heroCurrentAnimation!="right" && this.x < controls.coordinates.x-10 && this.x < controls.coordinates.x+10){
                 hero.gotoAndPlay("right");
                 objects.heroCurrentAnimation="right";
             }
             if (objects.heroCurrentAnimation!="left" && this.x > controls.coordinates.x-10 && this.x > controls.coordinates.x+10){
                 hero.gotoAndPlay("left");
                 objects.heroCurrentAnimation="left";
             }
         }

         if (Math.abs(controls.coordinates.x - this.x)<Math.abs(controls.coordinates.y - this.y)){
             if (objects.currentAnimation!="down" && this.y < controls.coordinates.y-10 && this.y < controls.coordinates.y+10){
                 hero.gotoAndPlay("down");
                 objects.currentAnimation="down";
             }
             if (objects.currentAnimation!="up" && this.y > controls.coordinates.y-10 && this.y > controls.coordinates.y+10){
                 hero.gotoAndPlay("up");
                 objects.currentAnimation="up";
             }
         }

        };
        return hero;
    },
    enemyProperties: {
        enemies: [],
        //general phone size 360*640 = 230400. Dynamic generating around the same difficulty for any screen size.
        //was 23040
        maxEnemies: 1,
        //was 230400
        enemySpeed: 3,
        currentAnimation: "stand"
    },
    getEnemy:function() {
        var rand = objects.getRandomInt(0, 100);
        var rand2 = objects.getRandomInt(0,1);
        var rand3 = objects.getRandomInt(0,1);
        var randX = objects.getRandomInt(-100,game.stage.canvas.width+100);
        var randY = objects.getRandomInt(-100,game.stage.canvas.height+100);
        var numEnemies = objects.enemyProperties.enemies.length;

        if (objects.enemyProperties.enemies.length < objects.enemyProperties.maxEnemies) {
            var enemySS = new createjs.SpriteSheet(preloader.queue.getResult("enemyJson"));
            var enemy = new createjs.Sprite(enemySS, "down");
            if (rand2===1){
                //top or bottom
                if (rand3===1){
                    //top
                    enemy.y=-100;
                    enemy.x= randX;
                } else {
                    //bottom
                    enemy.y=game.stage.canvas.height+100;
                    enemy.x= randX;
                }
            }else {
                //left or right
                if (rand3===1){
                    //left
                    enemy.x=-100;
                    enemy.y=randY;
                }else {
                    //right
                    enemy.x=game.stage.canvas.width+100;
                    enemy.y=randY;
                }
            }
            enemy.width = 32;
            enemy.height = 48;
            enemy.speed = objects.enemyProperties.enemySpeed;

            game.stage.addChild(enemy);
            objects.enemyProperties.enemies.push(enemy);
        }
    },
    moveEnemy:function(){
        var numEnemies= objects.enemyProperties.enemies.length;
        for(var i=numEnemies-1;i>=0;i--){
            var tx = game.hero.x - objects.enemyProperties.enemies[i].x,
                ty = game.hero.y - objects.enemyProperties.enemies[i].y,
                dist = Math.sqrt(tx*tx+ty*ty);
            objects.enemyProperties.enemies[i].x += (tx/dist)*objects.enemyProperties.enemies[i].speed;
            objects.enemyProperties.enemies[i].y += (ty/dist)*objects.enemyProperties.enemies[i].speed;

            if (Math.abs(game.hero.x - objects.enemyProperties.enemies[i].x)>Math.abs(game.hero.y - objects.enemyProperties.enemies[i].y)){
                // plus and minus 10 because hero.x keeps changing and never becomes completely equal to controls.coordinates
                if (objects.enemyProperties.enemies[i].currentAnimation!="right" && objects.enemyProperties.enemies[i].x < game.hero.x-10 && objects.enemyProperties.enemies[i].x < game.hero.x+10){
                    objects.enemyProperties.enemies[i].gotoAndPlay("right");
                    objects.enemyProperties.enemies[i].currentAnimation="right";
                }
                if (objects.enemyProperties.enemies[i].currentAnimation!="left" && objects.enemyProperties.enemies[i].x > game.hero.x-10 && objects.enemyProperties.enemies[i].x > game.hero.x+10){
                    objects.enemyProperties.enemies[i].gotoAndPlay("left");
                    objects.enemyProperties.enemies[i].currentAnimation="left";
                }
            }

            if (Math.abs(game.hero.x - objects.enemyProperties.enemies[i].x)<Math.abs(game.hero.y - objects.enemyProperties.enemies[i].y)){
                if (objects.enemyProperties.enemies[i].currentAnimation!="down" && objects.enemyProperties.enemies[i].y < game.hero.y-10 && objects.enemyProperties.enemies[i].y < game.hero.y+10){
                    objects.enemyProperties.enemies[i].gotoAndPlay("down");
                    objects.enemyProperties.enemies[i].currentAnimation="down";
                }
                if (objects.enemyProperties.enemies[i].currentAnimation!="up" && objects.enemyProperties.enemies[i].y > game.hero.y-10 && objects.enemyProperties.enemies[i].y > game.hero.y+10){
                    objects.enemyProperties. enemies[i].gotoAndPlay("up");
                    objects.enemyProperties.enemies[i].currentAnimation="up";
                }
            }
        }

        //every 5 seconds a random enemy walks outside the screen
       /* var rand = objects.getRandomInt(0, numEnemies-1);
        if (game.score.seconds%5===0 || game.score.seconds%5===1){
            objects.enemyProperties.enemies[rand].x+=1*objects.enemyProperties.enemies[rand].speed;
            objects.enemyProperties.enemies[rand].y+=1*objects.enemyProperties.enemies[rand].speed;
        }*/

    },
    increaseDifficulty:function(){
        if (game.canvas.width*game.canvas.height > 230400 && speedAdded===false){
            objects.enemyProperties.enemySpeed+=(game.canvas.width*game.canvas.height/921600);
            speedAdded=true;
        }
        //increase with 0,1%
        // was /100
        objects.enemyProperties.maxEnemies+= 0.01;
        //increase with 0,01%
        objects.enemyProperties.enemySpeed+= 0.0005;
    },
    checkCollisions: function(){
        var numEnemies=objects.enemyProperties.enemies.length;
        for(var i=0; i<numEnemies; i++){
            if(objects.hitTest(game.hero,objects.enemyProperties.enemies[i])){
               objects.gameOver();
            }
        }
    },
    hitTest: function(rect1, rect2){
        if ( rect1.x >= rect2.x + rect2.width
            || rect1.x + rect1.width <= rect2.x
            || rect1.y >= rect2.y + rect2.height
            || rect1.y + rect1.height <= rect2.y){
            return false;
        }
        return true;
    },
    getRandomInt: function(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getScore:function(){
        var score = new createjs.Text("SECONDS UNDRESSED: 0", "25px TakeItOrLeaveIt", "#ee125f");
        score.x=game.canvas.width-200;
        score.y=24;
        score.value=0;
        score.seconds=0;
        score.update= function(){
            this.value++;
            if (this.value===60){
                this.value=0;
                this.seconds++;
            }
            this.text="SECONDS UNDRESSED: " + this.seconds;
        };
        return score;
    },
    playBgSound:function() {
        var bgSound = createjs.Sound.play('bgMusic',{loop:-1});
        bgSound.volume=1;
    },
    getPug:function(){
        preloader.startPug.rotation=-20;
        createjs.Tween.get(preloader.startPug).to({
            x:game.canvas.width-100,
            y: game.canvas.height-80
        }, 1000, createjs.Ease.sineInOut);
        createjs.Sound.play('woof',{delay:520});
    },
    getButtons:function(){
        document.getElementById("button-holder").className= "container";
        if ((game.stage.canvas.height/2)-((150+(game.stage.canvas.height/10))/2)>194){
            //alert("should be vertical aligned");
            document.getElementById("button-holder").style.top= (game.stage.canvas.height/2)-((150+(game.stage.canvas.height/10))/2) + "px";
        }

        var button1 = document.getElementById("button1");
        var button2 = document.getElementById("button2");
        var button3 = document.getElementById("button3");
        button1.addEventListener('click', game.setupGame);
        button2.addEventListener('click', game.howToPlay);
        button3.addEventListener('click', game.credits);
        button1.addEventListener('touchstart', game.setupGame);
        button2.addEventListener('touchstart', game.howToPlay);
        button3.addEventListener('touchstart', game.credits);

        //button3.addEventListener('touchstart', game.setupGame);
    },
    getMuteButton:function(){
        objects.audioButton.x=10;
        objects.audioButton.y=game.canvas.height-60;
        game.stage.addChild(objects.audioButton);
        game.stage.update();
        objects.audioButton.addEventListener('click', this.audioMute);
        objects.audioButton.addEventListener('touchstart', this.audioMute);
    },
    audioMute:function(){
        if (createjs.Sound.muted === false){
            createjs.Sound.setMute(true);
            objects.audioButton.image.src="img/audiomute.png";
        }else{
            createjs.Sound.setMute(false);
            objects.audioButton.image.src="img/audioplay.png";
        }
    },
    getTitleXs:function(){
        preloader.title.image.src="img/title-xs.png";
        preloader.title.width=280;
        preloader.title.y=25;
        preloader.title.x=(game.canvas.width/2)-(preloader.title.width/2);
    },
    addBar:function(){
        objects.bar.graphics.beginFill("#f8eeb9");
        objects.bar.graphics.drawRect(0,0,game.canvas.width,70);
        objects.bar.x=0;
        objects.bar.y=0;
    },
    audioButtonGame:function(){
        objects.audioButton.x=10;
        objects.audioButton.y=10;
    },
    barOnTop:function(){
        game.stage.removeChild(objects.bar, objects.audioButton, game.score);
        if (game.canvas.width>655){game.stage.removeChild(preloader.title);}
        game.stage.addChild(objects.bar, objects.audioButton, game.score);
        if (game.canvas.width>655){game.stage.addChild(preloader.title);}
    },
    gameOver:function(){
        //empty enemy array
        game.stage.removeChild(game.hero);

        var numEnemies=objects.enemyProperties.enemies.length;
        objects.enemyProperties.enemies.slice(0,numEnemies-1);
        for(var j=numEnemies-1;j>=0;j--){
            objects.enemyProperties.enemies[j].gotoAndStop("down");
        }
        game.isRunning=false;
        createjs.Sound.stop('bgMusic');
        createjs.Sound.play('gameover');
        rand = objects.getRandomInt(1,4);
        var swalText;
        if (rand===1){
            swalText="You should eat less and run faster";
        }
        if (rand===2){
            swalText="Sexy and I know it";
        }
        if (rand===3){
            swalText="You little princess";
        }
        if (rand===4){
            swalText="Pug You!";


        }
        //height gameover is 500
        document.getElementById("gameover").style.top= (game.canvas.height/2)-230+"px";
        document.getElementById("gameover").style.left=(game.canvas.width/10)/2+"px";
        document.getElementById("gameoverScreen").className= "wrapper";
        document.getElementById("menu").addEventListener('click', objects.backToMenu);
        document.getElementById("menu").addEventListener('touchstart', objects.backToMenu);
        document.getElementById("retry").addEventListener('click', objects.restart);
        document.getElementById("retry").addEventListener('touchstart', objects.restart);
        document.getElementById("gameoverText").innerHTML= swalText;
        document.getElementById("gameoverScore").innerHTML= game.score.seconds + " Seconds";
    },
    backToMenu:function(){
        var numEnemies=objects.enemyProperties.enemies.length;
        //reset values and go to menu
        game.isRunning=false;
        controls.coordinates= {
            x: (window.innerWidth / 2)-32,
            y: (window.innerHeight/2)-32
        };
        firstClickPassed=false;
        game.score.seconds=0;
        game.score.value=0;
        maxEnemies= (game.stage.canvas.width*game.stage.canvas.height)/23040;
        enemySpeed= (game.stage.canvas.width*game.stage.canvas.height)/230400;
        objects.enemyProperties.enemies.slice(0,numEnemies-1);
        for(var l=numEnemies-1;l>=0;l--){
            game.stage.removeChild(objects.enemyProperties.enemies[l]);
            objects.enemyProperties.enemies.splice(l,1);
        }
        game.stage.removeAllChildren();
        document.getElementById("gameoverScreen").className= "invisible";
        preloader.startPug.rotation=-20;
        createjs.Tween.get(preloader.startPug).to({
            x:game.canvas.width-100,
            y: game.canvas.height-80
        }, 1000, createjs.Ease.sineInOut);
        createjs.Sound.play('woof',{delay:520});

        preloader.title.image.src="img/title.png";
        preloader.title.width=233;
        preloader.title.height=94;
        preloader.title.x=window.innerWidth/2-(preloader.title.width/2);
        preloader.title.y=50;
        game.stage.addChild(preloader.title, preloader.startPug);
        game.startScreen();
    },
    restart:function(){
        document.getElementById("gameoverScreen").className= "invisible";
        var numEnemies=objects.enemyProperties.enemies.length;
        //reset values
        game.isRunning=true;
        controls.coordinates= {
            x: (window.innerWidth / 2),
            y: (window.innerHeight/2)
        };
        game.hero.x=(window.innerWidth / 2);
        game.hero.y=(window.innerHeight / 2);
        game.stage.addChild(game.hero);
        firstClickPassed=false;
        game.score.seconds=0;
        game.score.value=0;
        objects.enemyProperties.maxEnemies=1;
        objects.enemyProperties.enemySpeed=3;
        objects.enemyProperties.enemies.slice(0,numEnemies-1);
        for(var k=numEnemies-1;k>=0;k--){
            game.stage.removeChild(objects.enemyProperties.enemies[k]);
            objects.enemyProperties.enemies.splice(k,1);
        }
    }




};


