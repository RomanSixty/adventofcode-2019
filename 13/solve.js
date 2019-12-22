adventofcode.activate(13);

adventofcode.day13_part1 = function(input) {
    let screen_data = aoc_intcode.process(input).split(',');

    let tiles = [[],[],[],[],[]];

    let max_x = 0,
        max_y = 0;

    for (let i = 0; i < screen_data.length; i+=3) {
        tiles[screen_data[i+2]].push({x: screen_data[i], y: screen_data[i+1]});

        max_x = Math.max(max_x, screen_data[i]);
        max_y = Math.max(max_y, screen_data[i+1]);
    }

    this.day13_print_screen(tiles, max_x, max_y);

    return tiles[2].length;
};

adventofcode.day13_part2 = function(input) {
    input = input.replace(0,2);

    let screen_data = aoc_intcode.process(input, [], this.day13_gameplay).split(',');

    return this.day13_gameplay(screen_data, true);
};

adventofcode.day13_gameplay = function(screen_data, return_score = false) {
    let tiles = [[],[],[],[],[]];
    let score = 0;

    let max_x = 0,
        max_y = 0;

    let ball_x   = 0;
    let paddle_x = 0;

    let paddle_movement = 0;

    for (let i = 0; i < screen_data.length-2; i+=3) {
        if (parseInt(screen_data[i]) === -1 && parseInt(screen_data[i+1]) === 0) {
            score = screen_data[i+2];
        } else {
            tiles[screen_data[i+2]].push({x: screen_data[i], y: screen_data[i+1]});

            max_x = Math.max(max_x, screen_data[i]);
            max_y = Math.max(max_y, screen_data[i+1]);

            if (screen_data[i+2] === 4)
                ball_x = screen_data[i];
            else if (screen_data[i+2] === 3)
                paddle_x = screen_data[i];
        }
    }

    if (paddle_x > ball_x)
        paddle_movement = -1;
    else if (paddle_x < ball_x)
        paddle_movement = 1;

    // if you want to see the game play out, uncomment this...
    // however it will last a few minutes... especially towards the end
    //setTimeout(() => {
    //    adventofcode.day13_print_screen(tiles, max_x, max_y);
    //}, 0);

    return return_score ? score : paddle_movement;
};

adventofcode.day13_print_screen = function(tiles, max_x, max_y) {
    let svg;

    // for the game in part 2 only changed tiles are returned
    // hence we update the existing svg

    if (document.querySelector('#game_area'))
        svg = document.querySelector('#game_area');
    else
        svg = aoc_svg.svg(max_x + 1, max_y + 1);

    tiles[0].forEach(tile => svg.appendChild(aoc_svg.rect(tile.x, tile.y, 1, 1, 'black')));
    tiles[1].forEach(tile => svg.appendChild(aoc_svg.rect(tile.x, tile.y, 1, 1, 'gray')));
    tiles[2].forEach(tile => svg.appendChild(aoc_svg.rect(tile.x, tile.y, 1, 1, 'yellow')));
    tiles[3].forEach(tile => svg.appendChild(aoc_svg.rect(tile.x, tile.y, 1, 1, 'blue')));

    tiles[4].forEach(tile => {
        svg.appendChild(aoc_svg.circle(parseInt(tile.x) + .5, parseInt(tile.y) + .5, .5, 'red'));
    });

    document.querySelector('#output_area').appendChild(svg);
};