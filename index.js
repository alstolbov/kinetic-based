var Settings = {
    canvasWidth: 600,
    canvasHeight: 200
};

var images = [
    {
        tmp: 'osm.png'
    }, {
        woodBox: 'images/woodCrate6.png'
    }
];

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
            var _this = this;
            var mousePos = Game.Stage.getPointerPosition();
            var activeBlockId = false;
            for (var i in Game.objectCollection.block) {
                var block = Game.objectCollection.block[i];
                var blockParams = block.obj.position();
                blockParams.w = block.obj.getWidth();
                blockParams.h = block.obj.getHeight();
                console.log(blockParams);
                if( blockParams.x < mousePos.x && mousePos.x < (blockParams.x + blockParams.w) ) {
                    if( blockParams.y < mousePos.y && mousePos.y < (blockParams.y + blockParams.h) ) {
                        activeBlockId = block.obj._id;
                    }
                }
            }
            console.log(activeBlockId);
            _this._state.activeBlockId = activeBlockId;
        }
    },
    _state: {
        activeBlockId: false
    }
});

Game.createClass('block', {
    init: {
        x: 150,
        y: 60,
        width: 50,
        height: 50,
        _background: 'woodBox'
    }
});

var onLoading = function (total, complete) {
    // console.log(complete + ' frome ' + total);
}

var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer', {animated: false});
    var clickArea = Game.createObject('clickArea',{layer: 'mainLayer'});
    var block = Game.createObject('block', {layer: 'mainLayer'});
    // player = Game.createObject('player',{layer: 'mainLayer'});
};

Game.loadImages(
    images,
    onLoading,
    onLoadEnd
);
