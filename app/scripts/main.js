var barrel = new SimpleSprite('/images/barrel.png', 11, 16, {
    scale: 4
});

var vulture = new SimpleSprite('/images/vulture.png', 17, 13, {
    scale: 4,
    target: 'vulture',
    frame: 0,
    sequence: [0, 1, 2, 3, 4, 5, 4, 5, 4, 5, 4, 5],
    repeat: true,
    speed: 0.3
});

$('#play').click(function () {
    vulture.play();
});

$('#pause').click(function () {
    vulture.pause();
});

$('#stop').click(function () {
    vulture.stop();
});

$('#rewind').click(function () {
    vulture.rewind();
});