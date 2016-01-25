"use strict";

class Canvas {
    constructor() {
        this.canvas = document.getElementById('stars');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.components = [];
    }

    draw() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.context.globalCompositeOperation = 'lighter';

        this.components.map(_ => _.render());

        window.requestAnimationFrame(this.draw.bind(this));
    }

    init() {
        this.draw();
    }
}

class Utils {
    static randomNum(max, min) {
        return Math.floor((max - min) * Math.random()) + min;
    }

    static color(opacity) {
        return `hsla(${this.randomNum(360, 1)}, 70%, 60%, ${opacity})`;
    }
}

class Stars {
    constructor(_) {
        this.total = _.total;
        this.spawn = [];
        this.z = 300;
        this.canvas = _.canvas;
        this.xw = this.canvas.width * this.z;
        this.xh = this.canvas.height * this.z;
    }

    create() {
        while (this.spawn.length < this.total) {
            this.spawn.push({
                pos: [this.xw * Math.random() - this.canvas.width / 2 * this.z, this.xh * Math.random() - this.canvas.height / 2 * this.z, this.z],
                vel: [0, 0, -1],
                r: Utils.randomNum(400, 100),
                color: Utils.color(1)
            });
        }
    }

    draw() {
        for (let i = 0; i < this.spawn.length; ++i) {
            let t = this.spawn[i];
            let x = t.pos[0] / t.pos[2];
            let y = t.pos[1] / t.pos[2];
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

    render() {
        this.create();
        this.canvas.context.save();
        this.canvas.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.draw();
        this.canvas.context.restore();
    }
}

window.onload = () => {
    const _canvas = new Canvas();
    _canvas.components.push(new Stars({
        canvas: _canvas,
        total: 50
    }));
    _canvas.init();
};

