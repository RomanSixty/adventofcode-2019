adventofcode.activate(3);

// bounds of fuel management system
adventofcode.day3_min_x = 0;
adventofcode.day3_min_y = 0;
adventofcode.day3_max_x = 0;
adventofcode.day3_max_y = 0;

adventofcode.day3_part1 = function(input) {
    let paths     = this.day3_get_paths(input.split("\n"));
    let crossings = this.day3_get_crossings(paths);

    // get the crossing closest to the origin [0,0]
    let crossing_distances = crossings.map(node => Math.abs(node.x) + Math.abs(node.y));

    this.day3_print_svg(paths, crossings);

    return Math.min(...crossing_distances);
};

adventofcode.day3_part2 = function(input) {
    let paths     = this.day3_get_paths(input.split("\n"));
    let crossings = this.day3_get_crossings(paths);

    let shortest = 999999999;

    let best_crossing = [];

    crossings.map(crossing => {
        const distance_node = paths[0][crossing.node1].distance + paths[1][crossing.node2].distance;

        // now that we have the distance to the last corners of the wire
        // we just need the last section of the segment up to the crossing

        let distance_node_to_crossing = 0;

        if (paths[0][crossing.node1].x === crossing.x) {
            distance_node_to_crossing += Math.abs(crossing.y - paths[0][crossing.node1].y);
        } else {
            distance_node_to_crossing += Math.abs(crossing.x - paths[0][crossing.node1].x);
        }

        if (paths[1][crossing.node2].x === crossing.x) {
            distance_node_to_crossing += Math.abs(crossing.y - paths[1][crossing.node2].y);
        } else {
            distance_node_to_crossing += Math.abs(crossing.x - paths[1][crossing.node2].x);
        }

        let s = Math.min(shortest, distance_node + distance_node_to_crossing)

        if ( s <= shortest) {
            shortest = s;
            best_crossing = crossing;
        }
    });

    this.day3_print_svg(paths, [best_crossing]);

    return shortest;
};

/**
 * translate input to nodes
 *
 * @param {string[]} wires input data
 * @returns {object[]} two arrays with nodes x,y,distance
 */
adventofcode.day3_get_paths = function(wires) {
    let paths = [[],[]];
    paths[0].push({x: 0, y: 0, distance: 0});
    paths[1].push({x: 0, y: 0, distance: 0});

    wires.forEach((wire, index) => {
        let x = 0,
            y = 0,
            d = 0;

        wire.split(",").forEach(node => {
            let distance = parseInt(node.substring(1));

            switch (node[0]) {
                case 'L':
                    x -= distance;
                    this.day3_min_x = Math.min(this.day3_min_x, x);
                    break;

                case 'U':
                    y -= distance;
                    this.day3_min_y = Math.min(this.day3_min_y, y);
                    break;

                case 'R':
                    x += distance;
                    this.day3_max_x = Math.max(this.day3_max_x, x);
                    break;

                case 'D':
                    y += distance;
                    this.day3_max_y = Math.max(this.day3_max_y, y);
                    break;
            }

            d += distance;

            paths[index].push({x: x, y: y, distance: d});
        });
    });

    return paths;
};

/**
 * check each wire segment of wire A for possible
 * crossings with any segment of wire B
 *
 * @param {object[]} paths wire coordinates
 * @returns {object[]} found crossings [x,y,segments_1,segments_2]
 */
adventofcode.day3_get_crossings = function(paths) {
    let crossings = [];

    for (let idx = 1; idx < paths[0].length; idx++) {
        [ x_min_0, y_min_0, x_max_0, y_max_0 ] = this.day3_get_bounds(paths[0][idx], paths[0][idx-1]);

        for (let idy = 1; idy < paths[1].length; idy++) {
            [ x_min_1, y_min_1, x_max_1, y_max_1 ] = this.day3_get_bounds(paths[1][idy], paths[1][idy-1]);

            if (x_min_1 > x_max_0 || x_max_1 < x_min_0
             || y_min_1 > y_max_0 || y_max_1 < y_min_0) {
                continue;
            }

            // actually ignoring lines exactly on top of each other
            if (x_min_0 === x_max_0) {
                if (y_min_1 === y_max_1) {
                    crossings.push({x: x_min_0, y: y_min_1, node1: idx-1, node2: idy-1});
                }
            } else {
                if (x_min_1 === x_max_1) {
                    crossings.push({x: x_min_1, y: y_min_0, node1: idx-1, node2: idy-1});
                }
            }
        }
    }

    return crossings;
};

/**
 * compare two nodes and return the lower and higher values of their coordinates
 *
 * @param {object[]} node_1 first node  [x,y,distance]
 * @param {object[]} node_2 second node [x,y,distance]
 * @returns {int[]} lower x value, lower y value, higher x value, higher y value
 */
adventofcode.day3_get_bounds = function(node_1, node_2) {
    const x_min = Math.min(node_1.x, node_2.x);
    const x_max = Math.max(node_1.x, node_2.x);

    const y_min = Math.min(node_1.y, node_2.y);
    const y_max = Math.max(node_1.y, node_2.y);

    return [ x_min, y_min, x_max, y_max ];
};

/**
 * create an svg image to display for visualization
 *
 * @param {object[]} paths both wires, containing x,y,distance
 * @param {object[]} crossings found crossings [x,y,node1,node2]
 */
adventofcode.day3_print_svg = function(paths, crossings) {
    let svg = aoc_svg.svg(
        this.day3_max_x + Math.abs(this.day3_min_x) + 100,
        this.day3_max_y + Math.abs(this.day3_min_y) + 100,
        this.day3_min_x - 50,
        this.day3_min_y - 50
    );

    svg.appendChild(aoc_svg.path(paths[0].map(node => node.x+','+node.y), 30, 'red'));
    svg.appendChild(aoc_svg.path(paths[1].map(node => node.x+','+node.y), 30, 'green'));
    svg.appendChild(aoc_svg.circle(0, 0, 100));

    crossings.forEach(crossing => {
        svg.appendChild(aoc_svg.circle(crossing.x, crossing.y, 70, 'blue'));
    });

    document.querySelector('#output_area').appendChild(svg);
};