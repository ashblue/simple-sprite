var vulture = new SimpleSprite('./images/vulture.png', 17, 13, {
    scale: 4,
    target: 'vulture',
    frame: 0,
    sequence: [0, 1, 2, 3, 4, 5, 4, 5, 4, 5, 4, 5],
    repeat: true,
    speed: 0.3
});

// Editable sequence
$('#change-sequence').click(function (e) {
    e.preventDefault();

    vulture.sequence = $('#sequence').val().split(',')
        .map(function (frame) {
            return parseInt(frame.trim(), 10);
        });

    vulture.rewind();
});

// Live scaling change
$('#scale-change').change(function () {
    vulture.setScale(parseInt($(this).val(), 10));
});

// Playback controles
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

//window.onload = function () {
//    var vulture = new SimpleSprite(document.getElementById('my-image'), 17, 13, {
//        scale: 4,
//        target: 'vulture',
//        frame: 0,
//        sequence: [0, 1, 2, 3, 4, 5, 4, 5, 4, 5, 4, 5],
//        repeat: true,
//        speed: 0.3
//    });
//};