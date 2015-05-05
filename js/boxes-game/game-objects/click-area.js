Game.createClass('clickArea', {
    init: {
        width: Settings.canvasWidth,
        height: Settings.canvasHeight,
        x: 0,
        y: 0      
    },
    events: {
        touchend: function () {
            if (!Store.mousePos.endPos.x) {
                Store.mousePos.endPos = Game.Stage.getPointerPosition();
                var box = Game.getById('box', Store.activeBlockId);
                if (box) {
                    Game.getLayerByName(this._layerName).hide();
                    box.boxMove();
                }
            }
        },
        mouseup: function () {
            if (!Store.mousePos.endPos.x) {
                Store.mousePos.endPos = Game.Stage.getPointerPosition();
                var box = Game.getById('box', Store.activeBlockId);
                if (box) {
                    Game.getLayerByName(this._layerName).hide();
                    box.boxMove();
                }
            }
        }
    }
});
