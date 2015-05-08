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
    var stone = Game.createObject('stone', {layer: 'mainLayer'});
    stone.set({
        x: 50,
        y: 100
    });
    var stone1 = Game.createObject('stone', {layer: 'mainLayer'});
    stone1.set({
        x: 50,
        y: 150
    });
    var stone2 = Game.createObject('stone', {layer: 'mainLayer'});
    stone2.set({
        x: 150,
        y: 50
    });
    var stone3 = Game.createObject('stone', {layer: 'mainLayer'});
    stone3.set({
        x: 100,
        y: 50
    });
    var stone2 = Game.createObject('stone', {layer: 'mainLayer'});
    stone2.set({
        x: 50,
        y: 200
    });
    var stone3 = Game.createObject('stone', {layer: 'mainLayer'});
    stone3.set({
        x: 250,
        y: 100
    });
};
