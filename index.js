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

var player;

Game.createClass('clickArea', {
    init: {
        width: Game.Stage.getWidth(),
        height: Game.Stage.getHeight(),
        x: 0,
        y: 0      
    },
    // events: {
    //     mousedown: function () {
    //         var mousePos = Game.Stage.getPointerPosition();
    //         console.log(mousePos);
    //         player.setPub('isMoved', true);
    //         console.log(player._pub());
    //     }
    // },
    pub: function () {
        return {
            addAnim: function () {
                Game.addLayerAnimation(
                    {
                        layerName: this._layerName,
                        objId: this._id
                    },
                    function (frame) {
                        // console.log(player.getPub('isMoved'));
                        // if (player.getPub('isMoved')) {
                        //     player.set({x: player.getAttr('x') + 1})
                        // }
                    }
                );

            }
        }
    },
    onCreate: [
        'addAnim'
    ]
});

Game.createClass('player', {
    init: {
        width: 10,
        height: 10,
        x: 10,
        y: 10,
        fill: '#ddd',
        _ddd: 'ddd'
    },
    events: {
        click: function (e) {
            console.log('player ID: ', this._id);
            Game.layerAnimation(this._layerName).stop();
        }
    },
    pub: function () {
        return {
            isMoved: 'ssdsd',
            setMoved: function () {
                this.isMoved = '>';
            }
        }
    }
});

var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer');
    var clickArea = Game.createObject('clickArea',{layer: 'mainLayer'});
    player = Game.createObject('player',{layer: 'mainLayer'});

    clickArea.on('mousedown', function () {
            var mousePos = Game.Stage.getPointerPosition();
            console.log(player._pub().setMoved());
            console.log(player._pub());
        }
    )
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
