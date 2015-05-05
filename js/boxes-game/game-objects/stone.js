Game.createClass('stone', {
    init: {
        width: 50,
        height: 50,
        fill: 'grau'
    },
    onHit: function () {
        resetActiveBlockFromStore();
        Store.animation.stop();
    }
});
