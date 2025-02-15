// stats.js - http://github.com/mrdoob/stats.js
var Stats = function () {
    function h(a) {
        c.appendChild(a.dom);
        return a
    }

    function k(a) {
        l = a
    }
    var l = 0,
        c = document.createElement("div");
    c.addEventListener("click", function (a) {
        a.preventDefault();
        k(++l % c.children.length)
    }, !1);
    var g = (performance || Date).now(),
        e = g,
        a = 0,
        f = h(new Stats.Panel("MS", "#0f0", "#020"));
    if (self.performance && self.performance.memory) var t = h(new Stats.Panel("MB", "#f08", "#201"));
    k(0);
    return {
        REVISION: 16,
        dom: c,
        addPanel: h,
        showPanel: k,
        begin: function () {
            g = (performance || Date).now()
        },
        end: function () {
            a++;
            var c = (performance || Date).now();
            f.update(c - g, 200);
            if (c > e + 1E3 && (r.update(1E3 * a / (c - e), 100), e = c, a = 0, t)) {
                var d = performance.memory;
                t.update(d.usedJSHeapSize / 1048576, d.jsHeapSizeLimit / 1048576)
            }
            return c
        },
        update: function () {
            g = this.end()
        },
        domElement: c,
        setMode: k
    }
};
Stats.Panel = function (h, k, l) {
    var c = Infinity,
        g = 0,
        e = Math.round,
        a = e(window.devicePixelRatio || 1),
        r = 80 * a,
        f = 48 * a,
        t = 3 * a,
        u = 2 * a,
        d = 3 * a,
        m = 15 * a,
        n = 74 * a,
        p = 30 * a,
        q = document.createElement("canvas");
    q.width = r;
    q.height = f;
    var b = q.getContext("2d");
    b.fillStyle = l;
    b.fillRect(0, 0, r, f);
    b.fillStyle = k;
    b.fillText(h, t, u);
    b.fillRect(d, m, n, p);
    b.fillStyle = l;
    b.globalAlpha = .9;
    b.fillRect(d, m, n, p);
    return {
        dom: q,
        update: function (f,
            v) {
            c = Math.min(c, f);
            g = Math.max(g, f);
            b.fillStyle = 1;
            b.globalAlpha = 1;
            b.fillRect(0, 0, r, m);
            b.fillStyle = k;
            b.fillText(e(f) + " " + h + " (" + e(c) + "-" + e(g) + ")", t, u);
            b.drawImage(q, d + a, m, n - a, p, d, m, n - a, p);
            b.fillRect(d + n - a, m, a, p);
            b.fillStyle = l;
            b.globalAlpha = .9;
            b.fillRect(d + n - a, m, a, e((1 - f / v) * p))
        }
    }
};
"object" === typeof module && (module.exports = Stats);