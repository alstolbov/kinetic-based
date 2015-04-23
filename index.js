Game.createClass('box', {
    init: {
        width: 100,
        height: 100,
        fill: 'red',
        _background: 'box',
        draggable: true
    },
    events: {
        click: function (e) {
            console.log('ID: ', this._id, e);
        }
    }
});

Game.init({
    width: 578,
    height: 200,
    draggable: true
});

var images = [{
    box: 'osm.png'
}];

Game.loadImages(images, function () {
    var boxLayer = Game.layer('boxLayer');

    var addBox = function () {
        var box = Game.createObject('box', {layer: 'boxLayer'});
        box.set({
            x: 120*i,
            y: 50
        });
    };

    for (var i = 0; i < 5; i ++) {
        addBox();
    }
});

