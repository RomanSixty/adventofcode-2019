adventofcode.activate(8);

adventofcode.day8_part1 = function(input) {
    adventofcode.day8_build_layers(input);

    return adventofcode.day8_checksum;
};

adventofcode.day8_part2 = function(input) {
    const layers = adventofcode.day8_build_layers(input);

    adventofcode.day8_print_svg(layers);

    return " ";
};

adventofcode.day8_build_layers = function(input) {
    adventofcode.day8_width  = 25;
    adventofcode.day8_height =  6;

    const pixels_per_layer = adventofcode.day8_width * adventofcode.day8_height;

    let min_zeroes = 99999999;

    adventofcode.day8_checksum = 0;

    let layers = [];

    while (input.length > 0) {
        let layer = input.substring(0, pixels_per_layer);
        input = input.substring(pixels_per_layer);

        layers.push(layer);

        let zeroes = 0;
        let   ones = 0;
        let   twos = 0;

        layer.split("").forEach(pixel => {
            switch (pixel) {
                case "0":
                    zeroes++;
                    break;
                case "1":
                    ones++;
                    break;
                case "2":
                    twos++;
                    break;
            }
        });

        if (min_zeroes > zeroes) {
            adventofcode.day8_checksum = ones * twos;
            min_zeroes = zeroes;
        }
    }

    return layers;
};

adventofcode.day8_print_svg = function(layers) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 ' + adventofcode.day8_width + ' ' + adventofcode.day8_height);

    layers = layers.reverse();

    layers.forEach(layer => {
        let layergroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        layer.split("").forEach((color,idx) => {
            if (color < 2) {
                const y = Math.floor(idx / adventofcode.day8_width);
                const x = idx % adventofcode.day8_width;

                let pixel = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                pixel.setAttribute('x', x);
                pixel.setAttribute('y', y);
                pixel.setAttribute('width', 1);
                pixel.setAttribute('height', 1);
                pixel.setAttribute('fill', color === '0' ? 'white' : 'black');

                layergroup.appendChild(pixel);
            }
        });

        svg.appendChild(layergroup);
    });

    document.querySelector('#output_area').appendChild(svg);
};