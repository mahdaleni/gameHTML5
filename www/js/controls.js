var firstClickPassed=false;
var controls = {
    coordinates: {
        x: (window.innerWidth / 2)-32,
        y: (window.innerHeight/2)-32
    },
    initialize: function () {
        window.addEventListener("click", this.updateCoordinates);
        window.addEventListener("touchstart", this.updateCoordinatesTouch);
        window.addEventListener("touchmove", this.updateCoordinatesTouch);
    },
    updateCoordinates: function (e) {
        if (firstClickPassed===false){

            if (game.score.value>10){
                firstClickPassed=true;
            }

        }

        if (e.clientY>70 && firstClickPassed===true){
            controls.coordinates = {
                x: e.clientX-(game.hero.width/2),
                y: e.clientY-(game.hero.height/2)
            };
        }



    },

    updateCoordinatesTouch: function (e) {

        e.preventDefault();

            touchobj = e.changedTouches[0]; // reference first touch point
            controls.coordinates = {
                x: parseInt(touchobj.clientX),
                y: parseInt(touchobj.clientY)
            };




         /*   if (e.targetTouches.length == 1 && e.clientY>70) {


                controls.coordinates = {
                    x: e.targetTouches[0].pageX,
                    y: e.targetTouches[0].pageY
                };
            }*/
    }
};