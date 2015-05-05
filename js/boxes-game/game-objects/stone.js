Game.createClass('stone', {
    init: {
        width: 50,
        height: 50,
        fill: 'grau'
    },
    onHit: function () {
        console.log(Store);
        resetActiveBlockFromStore();
        Store.animation.stop();
    }
});
