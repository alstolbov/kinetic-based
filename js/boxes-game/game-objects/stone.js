Game.createClass('stone', {
    init: {
        width: 50,
        height: 50,
        fill: 'grau'
    },
    onHit: function (box) {
        var _this = this;
        var boxObj = box.obj;
        switch (Store.moveVector) {
            case "up":
                boxObj.set({
                    y: _this.obj.getY() + _this.obj.getHeight()
                })
                break;
            case "down":
                boxObj.set({
                    y: _this.obj.getY() - boxObj.obj.getHeight()
                });
                break;
            case "left":
                boxObj.set({
                     x: _this.obj.getX() + _this.obj.getWidth()
                });
                break;
            case "right":
                boxObj.set({
                    x: _this.obj.getX() - boxObj.obj.getWidth()
                });
                break;
        }
        resetActiveBlockFromStore();
        Store.animation.stop();
    }
});
