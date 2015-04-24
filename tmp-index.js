var animationsArray = {
    standing: [
        0, 0, 35, 20,
        35, 0, 35, 20,
        70, 0, 35, 20
    ]
};

Game.createClass('simpleBlock', {
    init: {
        width: 100,
        height: 50,
        fill: 'red',
        draggable: true
    },
    events: {
        click: function (e) {
            console.log('ID: ', this._id, e);
            this.set({
                x: 0,
                y: 0
            });
        }
    }
});


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

Game.createClass('sprite', {
    init: {
        width: 100,
        height: 100,
        fill: 'red',
        _sprite: 'box',
        draggable: true,
        animation: 'standing',
        animations: animationsArray,
        frameRate: 4,
        frameIndex: 0
    },
    events: {
        click: function (e) {
            console.log(this.getWidth());
        }
        // frameIndexChange: function (e) {
        //     console.log('asd');
        // }
    }
});

var images = [{
    box: 'osm.png'
}];

var onLoadEnd = function () {
    var boxLayer = Game.layer('boxLayer');

    var addBox = function (i) {
        var box = Game.createObject('box', {layer: 'boxLayer'});
        box.set({
            x: 120*i,
            y: 50
        });
    };

    for (var i = 0; i < 3; i ++) {
        addBox(i);
    }

    var sprite = Game.createObject(
        'sprite',
        {
            layer: 'boxLayer',
            attrs: {
                x: 400,
                y: 75
            }
        }
    );
    sprite.start();

    var block = Game.createObject(
        'simpleBlock',
        {
            layer: 'boxLayer',
            attrs: {
                x: 20,
                y: 150
            }
        }
    );

    // var velocity = 50;
    // var anim = new Kinetic.Animation(function (frame) {
    //     var dist = velocity * (frame.timeDiff / 1000);
    //     console.log(dist);
    // });

    // anim.start();
}


Game.init({
    width: 578,
    height: 200,
    draggable: true
});

Game.loadImages(
    images,
    onLoadEnd
);


    /*

    [obj].position();
    [obj].setAttrs({});


    events:
    [obj].on([event_name],function(e){});
        
        mousedown
        mouseup
        mouseover
        mouseout
        mouseenter
        mouseleave
        mousemove
        mousewheel
        click
        dblclick
        touchstart
        touchend
        touchmove
        tap
        dbltap
        dragstart
        dragmove
        dragend
        draw
        beforeDraw
        frameIndexChange
  
    */
