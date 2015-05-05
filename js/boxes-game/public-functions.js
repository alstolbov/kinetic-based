var onLoading = function (total, complete) {
    // console.log(complete + ' frome ' + total);
}

var onLoadEnd = function () {
    var mainLayer = Game.layer('mainLayer', {animated: false});
    var clickLayer = Game.layer('clickLayer');
    var clickArea = Game.createObject('clickArea',{layer: 'clickLayer'});
    clickLayer.hide();
    var box = Game.createObject('box', {layer: 'mainLayer'});
    box.set({
        x: 150,
        y: 150
    });
    var stone = Game.createObject('stone', {layer: 'mainLayer'});
    stone.set({
        x: 250,
        y: 150
    });
    var stone1 = Game.createObject('stone', {layer: 'mainLayer'});
    stone1.set({
        x: 250,
        y: 200
    });
    var stone2 = Game.createObject('stone', {layer: 'mainLayer'});
    stone2.set({
        x: 150,
        y: 250
    });
    var stone3 = Game.createObject('stone', {layer: 'mainLayer'});
    stone3.set({
        x: 200,
        y: 250
    });
};

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
}