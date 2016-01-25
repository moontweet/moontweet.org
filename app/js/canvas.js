"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Canvas = (function () {
    function Canvas() {
        _classCallCheck(this, Canvas);

        this.canvas = document.getElementById('stars');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.components = [];
    }

    _createClass(Canvas, [{
        key: 'draw',
        value: function draw() {
            this.context.clearRect(0, 0, this.width, this.height);
            this.context.globalCompositeOperation = 'lighter';

            this.components.map(function (_) {
                return _.render();
            });

            window.requestAnimationFrame(this.draw.bind(this));
        }
    }, {
        key: 'init',
        value: function init() {
            this.draw();
        }
    }]);

    return Canvas;
})();

var Utils = (function () {
    function Utils() {
        _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
        key: 'randomNum',
        value: function randomNum(max, min) {
            return Math.floor((max - min) * Math.random()) + min;
        }
    }, {
        key: 'color',
        value: function color(opacity) {
            return 'hsla(' + this.randomNum(360, 1) + ', 70%, 60%, ' + opacity + ')';
        }
    }]);

    return Utils;
})();

var Stars = (function () {
    function Stars(_) {
        _classCallCheck(this, Stars);

        this.total = _.total;
        this.spawn = [];
        this.z = 300;
        this.canvas = _.canvas;
        this.xw = this.canvas.width * this.z;
        this.xh = this.canvas.height * this.z;
    }

    _createClass(Stars, [{
        key: 'create',
        value: function create() {
            while (this.spawn.length < this.total) {
                this.spawn.push({
                    pos: [this.xw * Math.random() - this.canvas.width / 2 * this.z, this.xh * Math.random() - this.canvas.height / 2 * this.z, this.z],
                    vel: [0, 0, -1],
                    r: Utils.randomNum(400, 100),
                    color: Utils.color(1)
                });
            }
        }
    }, {
        key: 'draw',
        value: function draw() {
            for (var i = 0; i < this.spawn.length; ++i) {
                var t = this.spawn[i];
                var x = t.pos[0] / t.pos[2];
                var y = t.pos[1] / t.pos[2];
                if (x < -this.canvas.width / 2 || x > this.canvas.width / 2 || y < -this.canvas.height / 2 || y > this.canvas.height / 2 || t.pos[2] < 0) {
                    this.spawn.splice(i, 1);
                    --i;
                    continue;
                }
                this.canvas.context.beginPath();
                this.canvas.context.fillStyle = '#DDD';
                this.canvas.context.arc(x, y, t.r / t.pos[2], 0, Math.PI * 2, false);
                t.pos[0] += t.vel[0];
                t.pos[1] += t.vel[1];
                t.pos[2] += t.vel[2];
                this.canvas.context.fill();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            this.create();
            this.canvas.context.save();
            this.canvas.context.translate(this.canvas.width / 2, this.canvas.height / 2);
            this.draw();
            this.canvas.context.restore();
        }
    }]);

    return Stars;
})();

window.onload = function () {
    var _canvas = new Canvas();
    _canvas.components.push(new Stars({
        canvas: _canvas,
        total: 50
    }));
    _canvas.init();
};