Game.createClass(
    'box', 
    {
        width: 100,
        height: 100,
        fill: 'red',
        _sprite: 'box',
        draggable: true
    }
);

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
        // box.setImage(Game.getImage('box'));
        box.on('click', function () {
            console.log(box._id);
        });
    };

    for (var i = 0; i < 5; i ++) {
        addBox();
    }
    boxLayer.draw();
    console.log(Game);
});

