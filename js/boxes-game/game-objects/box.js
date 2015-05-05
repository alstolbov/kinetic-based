Game.createClass('box', {
    init: {
        width: 50,
        height: 50,
        _background: 'woodBox'
    },
    events: {
        touchstart: function () {
            if (!Store.activeBlockId) {
                Store.activeBlockId = this.obj._id;
                Store.mousePos.startPos = Game.Stage.getPointerPosition();
                Game.getLayerByName('clickLayer').show();
            }
        },
        mousedown: function () {
            if (!Store.activeBlockId) {
                Store.activeBlockId = this.obj._id;
                Store.mousePos.startPos = Game.Stage.getPointerPosition();
                Game.getLayerByName('clickLayer').show();
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
                    Store.moveVector = getMoveVector();
                    switch (Store.moveVector) {
                        case "up":
                            _this.set({
                                y: _this.obj.getY() - Settings.speed
                            });
                            break;
                        case "down":
                            _this.set({
                                y: _this.obj.getY() + Settings.speed
                            });
                            break;
                        case "left":
                            _this.set({
                                x: _this.obj.getX() - Settings.speed
                            });
                            break;
                        case "right":
                            _this.set({
                                x: _this.obj.getX() + Settings.speed
                            });
                            break;
                    }

                    var collide = Game.isCollide(_this, 'stone');
                    if (collide.isHit) {
                        var collider;
                        var i;
                        var colliderIndex = false;
                        var isNeedStop = false;
                        for(var i=0; i <collide.objects.length; i++) {
                            collider = collide.objects[i];
                            switch (Store.moveVector) {
                                case "up":
                                    if (collider.obj.getX() == _this.obj.getX() &&
                                    (collider.obj.getY() + collider.obj.getHeight()) >= _this.obj.getY()) {
                                        isNeedStop = true;
                                        colliderIndex = i;
                                        _this.set({
                                            y: collider.obj.getY() + collider.obj.getHeight()
                                        });
                                    }
                                    break;
                                case "down":
                                    if (collider.obj.getX() == _this.obj.getX() &&
                                    collider.obj.getY() <= (_this.obj.getY() + _this.obj.getHeight())) {
                                       isNeedStop = true;
                                        colliderIndex = i;
                                        _this.set({
                                            y: collider.obj.getY() - _this.obj.getHeight()
                                        });
                                    }
                                    break;
                                case "left":
                                    if (collider.obj.getY() == _this.obj.getY() &&
                                    (collider.obj.getX() + collider.obj.getWidth()) >= _this.obj.getX()) {
                                        isNeedStop = true;
                                        colliderIndex = i;
                                        _this.set({
                                            x: collider.obj.getX() + collider.obj.getWidth()
                                        });
                                    }
                                    break;
                                case "right":
                                    if (collider.obj.getY() == _this.obj.getY() &&
                                    collider.obj.getX() <= (_this.obj.getX() + _this.obj.getWidth())) {
                                        isNeedStop = true;
                                        colliderIndex = i;
                                        _this.set({
                                            x: collider.obj.getX() - _this.obj.getWidth()
                                        });
                                    }
                                    break;
                            }
                        }
                        if(isNeedStop) {
                            collide.objects[colliderIndex].onHit();
                        }
                    }
                }
            });
        }
    }
});
