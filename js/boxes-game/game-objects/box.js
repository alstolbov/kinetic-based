Game.createClass('box', {
    init: {
        x: 150,
        y: 60,
        width: 50,
        height: 50,
        _background: 'woodBox'
    },
    events: {
        mousedown: function () {
            if (!Store.activeBlockId) {
                Store.activeBlockId = this.obj._id;
                Store.mousePos.startPos = Game.Stage.getPointerPosition();
            }
        }
    },
    boxMove: function () {
        var _this = this;
        if (Store.animation) {
            Store.animation.start();
        } else {
            Store.animation = Game.createAnimationOnLayer('mainLayer');
            Game.addLayerAnimation({layerName: 'mainLayer'}, function () {
                if (Store.activeBlockId) {
                    switch (getMoveVector()) {
                        case "up":
                            _this.set({
                                y: _this.obj.getY() - 1
                            });
                            break;
                        case "down":
                            _this.set({
                                y: _this.obj.getY() + 1
                            });
                            break;
                        case "left":
                            _this.set({
                                x: _this.obj.getX() - 1
                            });
                            break;
                        case "right":
                            _this.set({
                                x: _this.obj.getX() + 1
                            });
                            break;
                    }
                    var collide = Game.isCollide(_this, 'stone');
                    console.log(collide);
                    if (collide.isHit) {
                        resetActiveBlockFromStore();
                        Store.animation.stop();
                    }
                }
            });
        }
    }
});
