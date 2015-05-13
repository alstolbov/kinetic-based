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
                var box = Game.getById('box', Store.activeBlockId);
                if (Store.activeBlockId) {
                    switch (Store.moveVector) {
                        case "up":
                            box.set({
                                y: box.obj.getY() - Settings.speed
                            });
                            break;
                        case "down":
                            box.set({
                                y: box.obj.getY() + Settings.speed
                            });
                            break;
                        case "left":
                            box.set({
                                x: box.obj.getX() - Settings.speed
                            });
                            break;
                        case "right":
                            box.set({
                                x: box.obj.getX() + Settings.speed
                            });
                            break;
                    }

                    var collide = Game.isCollide(box, ['box', 'wall']);
                    if (collide.isHit) {
                        var collider;
                        var i;
                        var colliderIndex = false;
                        var isNeedStop = false;
                        for(var i=0; i <collide.objects.length; i++) {
                            collider = collide.objects[i];
                            switch (Store.moveVector) {
                                case "up":
                                    if (collider.obj.getX() == box.obj.getX() &&
                                    (collider.obj.getY() + collider.obj.getHeight()) >= box.obj.getY()) {
                                        isNeedStop = true;
                                        colliderIndex = i;
                                        // _this.set({
                                        //     y: collider.obj.getY() + collider.obj.getHeight()
                                        // });
                                    }
                                    break;
                                case "down":
                                    if (collider.obj.getX() == box.obj.getX() &&
                                    collider.obj.getY() <= (box.obj.getY() + box.obj.getHeight())) {
                                       isNeedStop = true;
                                        colliderIndex = i;
                                        // _this.set({
                                        //     y: collider.obj.getY() - _this.obj.getHeight()
                                        // });
                                    }
                                    break;
                                case "left":
                                    if (collider.obj.getY() == box.obj.getY() &&
                                    (collider.obj.getX() + collider.obj.getWidth()) >= box.obj.getX()) {
                                        isNeedStop = true;
                                        colliderIndex = i;
                                        // _this.set({
                                        //     x: collider.obj.getX() + collider.obj.getWidth()
                                        // });
                                    }
                                    break;
                                case "right":
                                    if (collider.obj.getY() == box.obj.getY() &&
                                    collider.obj.getX() <= (box.obj.getX() + box.obj.getWidth())) {
                                        isNeedStop = true;
                                        colliderIndex = i;
                                        // _this.set({
                                        //     x: collider.obj.getX() - _this.obj.getWidth()
                                        // });
                                    }
                                    break;
                            }
                        }
                        if(isNeedStop && collide.objects[colliderIndex].onHit) {
                            collide.objects[colliderIndex].onHit(box);
                        }
                    }
                }
            });
        }
    },
    onHit: function (box) {
        boxOnHitWall(box, this);
        resetActiveBlockFromStore();
        Store.animation.stop();
    }

});
