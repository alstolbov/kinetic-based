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
    events: {
        mousedown: function () {
            var mousePos = Game.Stage.getPointerPosition();
            player._state.isMoved = true;
            player.set(mousePos);
        }
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
    _pub: function () {
        return {
            addAnim: function () {
                var _this = this;
                Game.addLayerAnimation(
                    {
                        layerName: this._layerName,
                        objId: this._id
                    },
                    function (frame) {
                        if (_this._state.isMoved) {
                            _this.set({x: _this.getAttr('x') - 1});
                        }
                        if (_this.getAttr('x') <= 10) {
                            _this._state.isMoved = false;
                        }
                        var collide = Game.isCollide(_this, 'block');
                        if (collide.isHit) {
                            _this._state.isMoved = false;
                        }
                    }
                );

            }
        }
    },
    _onCreate: [
        'addAnim'
    ],
    _state: {
        isMoved: false
    }
});

Game.createClass('block', {
    init: {
        x: 50,
        y: 20,
        width: 10,
        height: Game.Stage.getHeight() - 40,
        fill: 'red'
    }
})

var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer');
    var clickArea = Game.createObject('clickArea',{layer: 'mainLayer'});
    var block = Game.createObject('block', {layer: 'mainLayer'});
    player = Game.createObject('player',{layer: 'mainLayer'});
    // clickArea.on('mousedown', function () {
    //         var mousePos = Game.Stage.getPointerPosition();
    //         console.log(player._pub().setMoved());
    //         console.log(player._pub());
    //     }
    // )
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
