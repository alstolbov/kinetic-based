Game.createClass('box', {
    init: {
        x: 150,
        y: 60,
        width: 50,
        height: 50,
        fill: 'gray'
    },
    events: {
        mousedown: function () {
            var mousePos = Game.Stage.getPointerPosition();
            console.log('block:', mousePos);
        }
    }
});
