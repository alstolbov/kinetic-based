var onLoading = function (total, complete) {
    // console.log(complete + ' frome ' + total);
}

var moveBox = function () {
    console.log(Store);
    if (Store.activeBlockId) {

    }
};

var getMoveVector = function () {
    var res;
    var x1 = Store.mousePos.startPos.x;
    var y1 = Store.mousePos.startPos.y;
    var x2 = Store.mousePos.endPos.x;
    var y2 = Store.mousePos.endPos.y;
    if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
        if ((x2 - x1) > 0) {
            res = "right";
        } else {
            res = "left";
        }
    } else {
        if ((y2 - y1) > 0) {
            res = "down";
        } else {
            res = "up";
        }
    }

    return res;
};

var resetActiveBlockFromStore = function () {
    Store.activeBlockId = false;
    Store.mousePos = {
        startPos: {
            x: false,
            y: false
        },
        endPos: {
            x: false,
            y: false
        }
    };
};

var boxOnHitWall = function (box, wall) {
    switch (Store.moveVector) {
        case "up":
            box.set({
                y: wall.obj.getY() + wall.obj.getHeight()
            })
            break;
        case "down":
            box.set({
                y: wall.obj.getY() - box.obj.getHeight()
            });
            break;
        case "left":
            box.set({
                 x: wall.obj.getX() + wall.obj.getWidth()
            });
            break;
        case "right":
            box.set({
                x: wall.obj.getX() - box.obj.getWidth()
            });
            break;
    }
};
