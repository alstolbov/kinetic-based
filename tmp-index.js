var stage = new Kinetic.Stage({
    container: 'container',
    width: 578,
    height: 200,
    draggable: true
});

var layer = new Kinetic.Layer();

var rect = new Kinetic.Rect({
    x: 0,
    y: 0,
    width: 100,
    height: 50,
    // fill: 'red',
    stroke: 'black',
    strokeWidth: 1,
    draggable: true
});

var imageObj = new Image();
var image;
imageObj.onload = function() {
    image.setImage(this);
    layer.draw();
};
imageObj.src = 'osm.png';

image = new Kinetic.Image({
    image: imageObj,
    width: 100,
    height: 100,
    fill: 'red',
    // scale: {x: 0.2, y:0.2}
});
image.setAttrs({
    x: 20,
    y: 50
});
image.crop({
    x: 0,
    y: 0,
    width: 100,
    height: 100
});
layer.add(image);
image.on('click', function (e) {
    console.log(image.getWidth());
});

layer.draw();
var tween = new Kinetic.Tween({
        node: image, 
        duration: 6,
        // x: 400,
        // y: 75,
        // rotation: 360 * 5,
        opacity: 1,
        // strokeWidth: 6,
        scaleX: 2.3,
        scaleY: 2.3,
        easing: Kinetic.Easings.Linear,
        fillRed: 0,
        fillGreen: 0,
        fillBlue: 255
      });

// tween.play();



// layer.add(rect);
stage.add(layer);

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
