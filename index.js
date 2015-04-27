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
            // player._state.isMoved = true;
            player._state.resCoords = mousePos;
            // player.set(mousePos);
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
            console.log('player ID: ', this.obj._id);
            Game.getLayerAnimation(this._layerName).stop();
        }
    },
    addAnim: function () {
        var _this = this;
        _this._state.resCoords = {
            x: _this.obj.getX(),
            y: _this.obj.getY()
        };
        Game.addLayerAnimation(
            {
                layerName: this._layerName,
                objId: this.obj._id
            },
            function (frame) {
                if (_this._state.resCoords.x !== _this.obj.getX() &&
                _this._state.resCoords.y !== _this.obj.getY()) {
                    _this.set(_this.linePoints());
                }
                var collide = Game.isCollide(_this, 'block');
                if (collide.isHit) {
                    // _this._state.isMoved = false;
                    _this._state.resCoords = _this.obj.position();
                }
            }
        );

    },
    linePoints: function () {
        var x1 = this.obj.getX();
        var y1 = this.obj.getY();
        var x2 = this._state.resCoords.x;
        var y2 = this._state.resCoords.y;
        var dx = Math.floor(x2 - x1);
        var dy = Math.floor(y2 - y1);
        var length = Math.floor(Math.sqrt(dx * dx + dy * dy));
        var coeff = Math.floor(length / this._state.speed);
        var incrementX;
        if (Math.abs(dx) > coeff) {
            incrementX = Math.floor(dx / coeff);
        } else {
            incrementX = dx;
        }
        var incrementY;
        if (Math.abs(dy) > coeff ) {
            incrementY = Math.floor(dy / coeff);
        } else {
            incrementY = dy;
        }

        var newX = Math.floor(x1 + incrementX);
        var newY = Math.floor(y1 + incrementY);

        return {
            x: newX,
            y: newY
        }
    },
    _onCreate: [
        'addAnim'
    ],
    _state: {
        isMoved: false,
        speed: 10,
        resCoords: {}
    }
});

Game.createClass('block', {
    init: {
        x: 150,
        y: 60,
        width: 140,
        height: 10,
        fill: 'red'
    }
})

var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer', {animated: false});
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
