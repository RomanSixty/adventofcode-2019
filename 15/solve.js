adventofcode.activate(15);

adventofcode.day15_part1 = function(input) {
    this.day15_map = [];

    this.day15_current_position = {x: 0, y: 0, state: 1, move_queue: [1, 2, 3]};
    this.day15_last_move = 4;

    this.day15_map.push(this.day15_current_position);

    this.day15_path = [];
    this.day15_shortest_path = [];

    aoc_intcode.process(input, [this.day15_last_move], this.day15_explore);

    this.day15_draw_map(this.day15_map);

    return this.day15_shortest_path.length + 1;
};

adventofcode.day15_part2 = function(input) {
    this.showImage('https://i.giphy.com/media/kPtv3UIPrv36cjxqLs/giphy.webp');

    return "let's think about that";
};

adventofcode.day15_explore = function(droid_state) {
    let new_x = adventofcode.day15_current_position.x,
        new_y = adventofcode.day15_current_position.y;

    switch (adventofcode.day15_last_move) {
        case 1: new_y--; break;
        case 2: new_y++; break;
        case 3: new_x--; break;
        case 4: new_x++; break;
    }

    let proposed_position = {
        x: new_x,
        y: new_y,
        move_queue: adventofcode.day15_get_move_queue(adventofcode.day15_last_move)
    };

    // have we been here before?

    for (let cell of adventofcode.day15_map) {
        if (cell.x === new_x && cell.y === new_y)
            proposed_position = cell;
    }

    if (typeof proposed_position.state === 'undefined') {
        proposed_position.state = droid_state[0];

        adventofcode.day15_map.push(proposed_position);

        // we don't have any loops in the maze, so we can just
        // assume, this is actually already the shortest path

        if (proposed_position.state === 2)     // copy, not ref
            adventofcode.day15_shortest_path = JSON.parse(JSON.stringify(adventofcode.day15_path));

        if (proposed_position.state !== 0) {
            adventofcode.day15_path.push(adventofcode.day15_last_move);
        }
    }

    if (proposed_position.state === 0)
        proposed_position.move_queue = [];
    else
        adventofcode.day15_current_position = proposed_position;

    if (adventofcode.day15_current_position.move_queue.length > 0) {
        adventofcode.day15_last_move = adventofcode.day15_current_position.move_queue.pop();
    } else {
        adventofcode.day15_last_move = undefined;

        // backtrack
        if (adventofcode.day15_path.length > 0) {
            let last_move = adventofcode.day15_path.pop();
            switch (last_move) {
                case 1: adventofcode.day15_last_move = 2; break;
                case 2: adventofcode.day15_last_move = 1; break;
                case 3: adventofcode.day15_last_move = 4; break;
                case 4: adventofcode.day15_last_move = 3; break;
            }
        }
    }

    return adventofcode.day15_last_move;
};

adventofcode.day15_get_move_queue = function(last_move) {
    switch (last_move) {
        case 1: return [1, 3, 4];
        case 2: return [2, 3, 4];
        case 3: return [1, 2, 3];
        case 4: return [1, 2, 4];
    }
};

adventofcode.day15_draw_map = function(map) {
    let svg = aoc_svg.svg();

    let min_x = 0,
        min_y = 0,
        max_x = 0,
        max_y = 0;

    let background = aoc_svg.rect(0, 0, '100%', '100%', 'grey');

    svg.appendChild(background);

    map.forEach(cell => {
        min_x = Math.min(min_x, cell.x);
        max_x = Math.max(max_x, cell.x);
        min_y = Math.min(min_y, cell.y);
        max_y = Math.max(max_y, cell.y);

        let color = 'black';

        switch (cell.state) {
            case 0: color = 'grey'; break;
            case 1: color = 'black'; break;
            case 2: color = 'red'; break;
        }

        svg.appendChild(aoc_svg.rect(cell.x, cell.y, 1, 1, color));
    });

    svg.appendChild(aoc_svg.circle(.5, .5, .5, 'green'));

    aoc_svg.setViewBox(svg, max_x - min_x + 1, max_y - min_y + 1, min_x, min_y);
    aoc_svg.setPosition(background, min_x, min_y);

    // draw path
    let x = .5,
        y = .5;

    let nodes = [];

    this.day15_shortest_path.forEach(move => {
        switch (move) {
            case 1: y--; break;
            case 2: y++; break;
            case 3: x--; break;
            case 4: x++; break;
        }
        nodes.push(x+','+y);
    });

    svg.appendChild(aoc_svg.path(nodes, .1, 'yellow'));

    document.querySelectorAll("#output_area svg").forEach(elem => elem.remove());
    document.querySelector('#output_area').appendChild(svg);
};