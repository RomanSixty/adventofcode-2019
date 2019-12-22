let aoc_svg = {
    svg: function(width = 100, height = 100, x = 0, y = 0) {
        let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        svg.setAttribute('version', '1.1');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        svg.setAttribute('viewBox', x + ' ' + y + ' ' + width + ' ' + height);

        return svg;
    },
    setViewBox: function(svg, width, height, x, y) {
        svg.setAttribute('viewBox', x + ' ' + y + ' ' + width + ' ' + height);
    },
    group: function() {
        return document.createElementNS('http://www.w3.org/2000/svg', 'g');
    },
    rect: function(x = 0, y = 0, width = '100%', height = '100%', fill = 'black') {
        let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

        rect.setAttribute('x', x);
        rect.setAttribute('y', y);

        rect.setAttribute('width', width);
        rect.setAttribute('height', height);

        rect.setAttribute('fill', fill);

        return rect;
    },
    circle: function(x = 0, y = 0, radius = 1, fill = 'black') {
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', radius);

        circle.setAttribute('fill', fill);

        return circle;
    },
    path: function(coordinates = [], width = 1, color = 'black') {
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        path.setAttribute('d', 'M' + coordinates.join(" "));

        path.setAttribute('stroke', color);
        path.setAttribute('stroke-width', width);

        path.setAttribute('fill', 'none');

        return path;
    },
    setPosition: function(element, x = 0, y = 0) {
        if (element.nodeName === 'circle') {
            element.setAttribute('cx', x);
            element.setAttribute('cy', y);
        } else {
            element.setAttribute('x', x);
            element.setAttribute('y', y);
        }
    }
};