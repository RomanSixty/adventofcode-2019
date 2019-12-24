adventofcode.activate(24);

adventofcode.day24_part1 = function(input) {
    let map = this.day24_parse_input(input);

    let states = {};

    while (true) {
        let fingerprint = JSON.stringify(map);

        if (typeof states[fingerprint] !== 'undefined')
            break;

        states[fingerprint] = true;

        this.day24_progress(map);
    }

    return this.day24_calculate_biodiversity(map);
};

adventofcode.day24_part2 = function(input) {
    this.showImage('https://i.giphy.com/media/13vnMtmLqU6xzO/giphy.webp');

    return 'ugh...';
};

adventofcode.day24_parse_input = function(input) {
    return input.split("\n").map(row => row.split(""));
};

adventofcode.day24_progress = function(map) {
    let live = [];
    let die  = []; // https://www.youtube.com/watch?v=OeQ7huY9mEE :)

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === '#') {
                if (this.day24_count_neighbours(map, row, col) !== 1)
                    die.push([row, col]);
            } else {
                let n = this.day24_count_neighbours(map, row, col);
                if (n === 1 || n === 2)
                    live.push([row, col]);
            }
        }
    }

    live.forEach(cell => map[cell[0]][cell[1]] = '#');
    die.forEach(cell  => map[cell[0]][cell[1]] = '.');
};

adventofcode.day24_count_neighbours = function(map, row, col) {
    let neighbours = 0;

    if (row > 0 && map[row-1][col] === '#') neighbours++;
    if (row < 4 && map[row+1][col] === '#') neighbours++;
    if (col > 0 && map[row][col-1] === '#') neighbours++;
    if (col < 4 && map[row][col+1] === '#') neighbours++;

    return neighbours;
};

adventofcode.day24_calculate_biodiversity = function(map) {
    let biodiversity = 0;

    for (let row = 0; row < map.length; row++)
        for (let col = 0; col < map[row].length; col++)
            if (map[row][col] === '#')
                biodiversity += Math.pow(2, row*5 + col);

    return biodiversity;
};