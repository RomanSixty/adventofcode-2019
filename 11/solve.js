adventofcode.activate(11);

adventofcode.day11_part1 = function(input) {
    this.day11_robot_position = {x: 0, y: 0, angle: 0};
    this.day11_hull_tiles = [
        {x: 0, y: 0, color: 0}
    ];

    this.day11_current_tile = this.day11_hull_tiles[0];

    this.opcode_process(input, [0], this.day11_robot_control);

    return this.day11_hull_tiles.length;
};

adventofcode.day11_part2 = function(input) {
    this.day11_robot_position = {x: 0, y: 0, angle: 0};
    this.day11_hull_tiles = [
        {x: 0, y: 0, color: 0}
    ];

    this.day11_current_tile = this.day11_hull_tiles[0];

    this.opcode_process(input, [1], this.day11_robot_control);

    this.day11_paint_hull(this.day11_hull_tiles);

    return 'read this:';
};

adventofcode.day11_robot_control = function(robot_status) {
    [color, turn] = robot_status;

    adventofcode.day11_current_tile.color = color;

    if (turn === 0)
        adventofcode.day11_robot_position.angle = (adventofcode.day11_robot_position.angle + 270) % 360;
    else
        adventofcode.day11_robot_position.angle = (adventofcode.day11_robot_position.angle + 90) % 360;

    switch (adventofcode.day11_robot_position.angle) {
        case   0: adventofcode.day11_robot_position.y--; break;
        case  90: adventofcode.day11_robot_position.x++; break;
        case 180: adventofcode.day11_robot_position.y++; break;
        case 270: adventofcode.day11_robot_position.x--; break;
    }

    let tile_found = false;

    for (let tile of adventofcode.day11_hull_tiles) {
        if (adventofcode.day11_robot_position.x === tile.x && adventofcode.day11_robot_position.y === tile.y) {
            adventofcode.day11_current_tile = tile;
            tile_found = true;
            break;
        }
    }

    if (!tile_found) {
        adventofcode.day11_current_tile = {
            x: adventofcode.day11_robot_position.x,
            y: adventofcode.day11_robot_position.y,
            color: 0
        };

        adventofcode.day11_hull_tiles.push(adventofcode.day11_current_tile);
    }

    return adventofcode.day11_current_tile.color;
};

adventofcode.day11_paint_hull = function(tiles) {
    let min_x = 0,
        max_x = 0,
        min_y = 0,
        max_y = 0;

    svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('version', '1.1');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    let background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('fill', 'black');
    background.setAttribute('width', '100%');
    background.setAttribute('height', '100%');
    svg.appendChild(background);

    tiles.forEach(tile => {
        min_x = Math.min(min_x, tile.x);
        max_x = Math.max(max_x, tile.x);
        min_y = Math.min(min_y, tile.y);
        max_y = Math.max(max_y, tile.y);

        if (tile.color === 1) {
            let pixel = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            pixel.setAttribute('x', tile.x);
            pixel.setAttribute('y', tile.y);
            pixel.setAttribute('width', '1');
            pixel.setAttribute('height', '1');
            pixel.setAttribute('fill', 'white');
            svg.appendChild(pixel);
        }
    });

    svg.setAttribute('viewBox', min_x + ' ' + min_y +' ' + (max_x - min_x + 1) + ' ' + (max_y - min_y + 1));

    document.querySelector('#output_area').appendChild(svg);
};