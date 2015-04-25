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
    },
    pub: function () {
        return {
            isMoved: false,
            playerTween: function (data) {
                var tween = new Kinetic.Tween({
                    node: this,
                    duration: data.duration,
                    x: data.newPos.x,
                    y: data.newPos.y,
                    easing: Kinetic.Easings.Linear,
                    onFinish: function () {
                        data.onEnd();
                    }
                }).play();

                return tween;
            }
        }
    }
});

var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer');
    var clickArea = Game.createObject('clickArea',{layer: 'mainLayer'});
    var player = Game.createObject('player',{layer: 'mainLayer'});

    var playerTween;
    clickArea.on('mousedown', function () {
        var mousePos = Game.Stage.getPointerPosition();
        if (player.getPub('isMoved')) {
            playerTween.destroy();
        }
        player.setPub('isMoved', true);
        playerTween = player.getPub(
            'playerTween',
            {
                duration: getDuration(
                    player.position(),
                    mousePos,
                    100
                ),
                newPos: mousePos,
                onEnd: function () {
                    player.setPub('isMoved', false);
                }
            }
        );

        // var mousePos = Game.Stage.getPointerPosition();
        // var tween = new Kinetic.Tween({
        //     node: player,
        //     duration: getDuration(
        //         player.position(),
        //         mousePos,
        //         100
        //     ),
        //     x: mousePos.x,
        //     y: mousePos.y
        // }).play();
    });
};

Game.loadImages(
    images,
    onLoadEnd
);

var getDuration = function (startPos, endPos, speed) {
    var vectorX = Math.abs(endPos.x - startPos.x);
    var vectorY = Math.abs(endPos.y - startPos.y);
    var pathLength = Math.sqrt(vectorX*vectorX + vectorY*vectorY);

    return pathLength/speed;
};

