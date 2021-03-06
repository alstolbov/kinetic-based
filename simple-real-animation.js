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
            Game.layerAnimation(this._layerName).stop();
        }
    },
    pub: function () {
        return {
            addAnim: function () {
                Game.addLayerAnimation(
                    {
                        layerName: this._layerName,
                        objId: this._id
                    },
                    function (frame) {
                        console.log(frame.timeDiff);
                    }
                );

            }
        }
    },
    onCreate: [
        'addAnim'
    ]
});

var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer');
    var clickArea = Game.createObject('clickArea',{layer: 'mainLayer'});
    var player = Game.createObject('player',{layer: 'mainLayer'});
    // player.getPub('addAnim');
    // Game.addLayerAnimation(
    //     {
    //         layerName: player._layerName,
    //         objId: player._id
    //     },
    //     function (frame) {
    //         console.log(frame.timeDiff);
    //     }
    // );

    // Game.layerAnimation(player._layerName).stop();
};

Game.loadImages(
    images,
    onLoadEnd
);

// var getDuration = function (startPos, endPos, speed) {
//     var vectorX = Math.abs(endPos.x - startPos.x);
//     var vectorY = Math.abs(endPos.y - startPos.y);
//     var pathLength = Math.sqrt(vectorX*vectorX + vectorY*vectorY);

//     return pathLength/speed;
// };
