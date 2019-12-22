adventofcode.activate(8);

adventofcode.day8_part1 = function(input) {
    this.day8_build_layers(input);

    return this.day8_checksum;
};

adventofcode.day8_part2 = function(input) {
    const layers = this.day8_build_layers(input);

    this.day8_print_svg(layers);

    return " ";
};

adventofcode.day8_build_layers = function(input) {
    this.day8_width  = 25;
    this.day8_height =  6;

    const pixels_per_layer = this.day8_width * this.day8_height;

    let min_zeroes = 99999999;

    this.day8_checksum = 0;

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
            this.day8_checksum = ones * twos;
            min_zeroes = zeroes;
        }
    }

    return layers;
};

adventofcode.day8_print_svg = function(layers) {
    let svg = aoc_svg.svg(this.day8_width, this.day8_height);

    layers = layers.reverse();

    layers.forEach(layer => {
        let layergroup = aoc_svg.group();

        layer.split("").forEach((color,idx) => {
            if (color < 2) {
                const y = Math.floor(idx / this.day8_width);
                const x = idx % this.day8_width;

                layergroup.appendChild(aoc_svg.rect(x, y, 1, 1, color === '0' ? 'white' : 'black'));
            }
        });

        svg.appendChild(layergroup);
    });

    document.querySelector('#output_area').appendChild(svg);
};