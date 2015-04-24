var Settings = {
    canvasWidth: 600,
    canvasHeight: 200
};

var images = [{
    box: 'osm.png'
}];

Game.init({
    width: Settings.canvasWidth,
    height: Settings.canvasHeight
});

Game.createClass('clickArea', {
    init: {
        width: Game.Stage.getWidth(),
        height: Game.Stage.getHeight(),
        x: 0,
        y: 0      
    }
});

Game.createClass('player', {
    init: {
        width: 10,
        height: 10,
        x: 10,
        y: 10,
        fill: '#ddd'
    },
    events: {
        click: function (e) {
            console.log('player ID: ', this._id);
        }
    }
});

var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer');
    var clickArea = Game.createObject('clickArea',{layer: 'mainLayer'});
    var player = Game.createObject('player',{layer: 'mainLayer'});

    clickArea.on('mousedown', function () {
        var mousePos = Game.Stage.getPointerPosition();
        var tween = new Kinetic.Tween({
            node: player,
            duration: 1,
            x: mousePos.x,
            y: mousePos.y
        }).play();
    });
}

Game.loadImages(
    images,
    onLoadEnd
);

