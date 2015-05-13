Game.createClass('wall', {
    init: {
        width: 50,
        height: 50,
        fill: 'grau'
    },
    onHit: function (box) {
        boxOnHitWall(box, this);
        resetActiveBlockFromStore();
        Store.animation.stop();
    }
});
