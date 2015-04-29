Game.createClass('clickArea', {
    init: {
        width: Settings.canvasWidth,
        height: Settings.canvasHeight,
        x: 0,
        y: 0      
    },
    events: {
        mouseup: function () {
            var mousePos = Game.Stage.getPointerPosition();
            console.log('area:', mousePos);
        }
    }
});
