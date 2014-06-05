(function () {
    var SETTINGS = {
        scale: 1, // How much to scale the Canvas up by
        target: 'canvas', // Id or element to append the Canvas element to
        speed: 1, // Speed per frame
        sequenceIndex: 0,
        sequence: [0], // Animation sequence for the sprite
        frame: 0,
        repeat: false,
        _loaded: false
    };

    var _event = {
        imageReady: function () {
            this._loaded = true;

            // Number of frames
            this.frameWidth = (this.spriteSheet.canvas.width / (this.width * this.scale));
            this.frameHeight = (this.spriteSheet.canvas.height / (this.height * this.scale));

            this.draw();
        }
    };

    /**
     * Allows you to quickly create a sprite animation on the fly (lightweight)
     * @param image {string|object} Canvas element, url, or dataurl
     * @param width {number} Size of a frame on the sprite, should be the real size of the image (not scaled)
     * @param height {number}
     * @param options {object} @see SETTINGS
     * @returns {*}
     * @constructor
     */
    var SimpleSprite = function (image, width, height, options) {
        // Inject settings
        for (var key in SETTINGS) {
            this[key] = SETTINGS[key];
        }

        if (typeof options === 'object') {
            for (var key in options) {
                this[key] = options[key];
            }
        }

        // Setup the Canvas at the correct location
        if (this.target.nodeName === 'CANVAS') {
            this.canvas = this.target;

        } else if (typeof this.target === 'string') {
            this.target = document.getElementById(this.target);

            if (this.target.nodeName === 'CANVAS') {
                this.canvas = this.target;
            } else {
                this.canvas = document.createElement('canvas');
                this.target.appendChild(canvas);
            }

        } else { // Assumed target is a parent element
            this.canvas = document.createElement('canvas');
            this.target.appendChild(canvas);
        }

        this.setCanvas(width, height, this.scale);
        this.spriteSheet = new SimpleSpriteSheet(image, {
            scale: this.scale,
            callback: _event.imageReady.bind(this)
        });

        this.ctx = this.canvas.getContext('2d');
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;
    };

    SimpleSprite.prototype.setCanvas = function (width, height, scale) {
        this.scale = scale;
        this.width = width;
        this.height = height;

        this.canvas.width = this.width * this.scale;
        this.canvas.height = this.height * this.scale;
    };

    SimpleSprite.prototype.draw = function () {
        if (!this._loaded) return;
        this.ctx.clearRect(0, 0, this.width * this.scale, this.height * this.scale);
        var frameX = this.frame % this.frameWidth; // Current frame pos
        var frameY = Math.floor(this.frame / this.frameWidth);

        this.ctx.drawImage(this.spriteSheet.canvas,
            this.width * this.scale * frameX, this.height * this.scale * frameY, this.width * this.scale, this.height * this.scale,
            0, 0, this.width * this.scale, this.height * this.scale);
    };

    SimpleSprite.prototype.update = function () {
//        if (this.sequenceIndex >= this.sequence.length) {
//            if (this.repeat) {
//                this.sequenceIndex = 0;
//                this.frame = this.sequence[this.sequenceIndex];
//            }
//        } else {
//            this.frame = this.sequence[this.sequenceIndex];
//            this.sequenceIndex += 1;
//        }

        if (this.sequenceIndex >= this.sequence.length - 1) {
            if (this.repeat) this.sequenceIndex = 0;
        } else {
            this.sequenceIndex += 1;
        }

        this.frame = this.sequence[this.sequenceIndex];

        this.draw();
    };

    SimpleSprite.prototype.setFrame = function (frame) {
        this.frame = frame;
        this.draw();
    };

    SimpleSprite.prototype.rewind = function () {
        this.stop();
        this.play();
    };

    SimpleSprite.prototype.play = function () {
        if (this.timer) window.clearInterval(this.timer);
        this.frame = this.sequence[this.sequenceIndex];
        this.draw();
        this.timer = window.setInterval(this.update.bind(this), this.speed * 1000);
    };

    SimpleSprite.prototype.stop = function () {
        if (this.timer) window.clearInterval(this.timer);
        this.sequenceIndex = 0;
        this.frame = this.sequence[this.sequenceIndex];
        this.draw();
    };

    SimpleSprite.prototype.pause = function () {
        if (this.timer) window.clearInterval(this.timer);
    };

    SimpleSprite.prototype.setSequence = function (index, frame) {

    };

    SimpleSprite.prototype.getSequence = function (index) {

    };

    window.SimpleSprite = SimpleSprite;
})();