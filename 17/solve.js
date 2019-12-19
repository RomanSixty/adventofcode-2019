adventofcode.activate(17);

adventofcode.day17_part1 = function(input) {
    let characters = this.opcode_process(input);

    let image = characters.split(',').map(ascii => String.fromCharCode(ascii)).join('');

    let scanlines = image.split("\n");

    let sum_alignment_parameters = 0;

    for (let row = 1; row < scanlines.length - 1; row++) {
        for (let col = 1; col < scanlines[0].length - 1; col++) {
            if (scanlines[row][col] === '#'
             && scanlines[row][col-1] === '#'
             && scanlines[row-1][col] === '#'
             && scanlines[row][col+1] === '#') {
                sum_alignment_parameters += row * col;
            }
        }
    }

    return sum_alignment_parameters;
};

adventofcode.day17_part2 = function(input) {
    let characters = this.opcode_process(input);

    let image = characters.split(',').map(ascii => String.fromCharCode(ascii)).join('');

    let path = this.day17_pathfinder(image);

    let movement_functions = this.day17_get_segments(path);

    let main_routine = '';

    // now get the right order
    while (path !== '') {
        for (let name in movement_functions) {
            if (path.match(RegExp('^'+movement_functions[name], 'g'))) {
                main_routine += name;

                path = path.replace(movement_functions[name], '').replace(',', '');
            }
        }
    }

    let robot_inputs = [];

    main_routine = main_routine.split('').join(',') + "\n";

    main_routine.split('').forEach(routine => {
        robot_inputs.push(routine.charCodeAt(0));
    });

    for (let name in movement_functions) {
        let movements = movement_functions[name].split(',');

        movements.forEach(move => {
            move = move.replace('10', '82');
            move.split('').forEach(m => {
                robot_inputs.push(m.charCodeAt(0))
                robot_inputs.push(44); // add commas
            });
        });

        robot_inputs.pop(); // remove last comma
        robot_inputs.push(10);
    }

    robot_inputs.push(121); // continuous feed... in the other (110) we don't get the final output...
    robot_inputs.push(10);

    input = input.replace(1,2);

    return this.opcode_process(input, robot_inputs).split(',').pop(); // we get lots of output, but only the last number counts
};

/**
 * split the path in 3 recurring segments
 * I have the feeling this should work with a recursive function
 * but I'm missing something...
 *
 * @param {string} path on the scaffolding
 */
adventofcode.day17_get_segments = function(path) {
    let segment_1 = '';
    let segment_2 = '';
    let segment_3 = '';

    let found = false;

    for (let length_1 = 2; length_1 < 40 && !found; length_1++) {
        if (path.charAt(length_1) === ',') {
            segment_1 = path.substring(0, length_1);

            let work_path = this.day17_trim_segments([segment_1], path);

            for (let length_2 = 2; length_2 < 20 && !found; length_2++) {
                if (work_path.charAt(length_2) === ',') {
                    segment_2 = work_path.substring(0, length_2);

                    let work_path_2 = this.day17_trim_segments([segment_1, segment_2], path);

                    for (let length_3 = 2; length_3 < 20 && !found; length_3++) {
                        if (work_path_2.charAt(length_3) === ',') {
                            segment_3 = work_path_2.substring(0, length_3);

                            let work_path_3 = this.day17_trim_segments([segment_1, segment_2, segment_3], path);

                            if (work_path_3 === '')
                                found = true;
                        }
                    }
                }
            }
        }
    }

    return {
        A: segment_1,
        B: segment_2,
        C: segment_3
    };
};

/**
 * strip a segment from the path (start and end)
 * @param {array} segments path segments
 * @param {string} path on scaffolding
 * @returns {string} trimmed path
 */
adventofcode.day17_trim_segments = function(segments, path) {
    let path_length = 0;

    while (path_length !== path.length) {
        path_length = path.length;

        segments.forEach(segment => {
            path = path.replace(RegExp('^('+segment+',)+', 'g'), '');
            path = path.replace(RegExp('('+segment+')+$', 'g'), '');
            path = path.replace(RegExp(',$', 'g'), '');
        });
    }

    return path;
};

/**
 * find the robot's path along the scaffolding
 * @param {string} image
 * @returns {string} path segments like "R6,L10,..."
 */
adventofcode.day17_pathfinder = function(image) {
    // first get robot position
    let robot_pos = image.indexOf('<') + image.indexOf('^') + image.indexOf('>') + image.indexOf('v') + 3;

    const image_width = image.indexOf("\n") +1;

    let current_direction = 0;
    const movement_directions = [-1, image_width, 1, -image_width];

    switch (image.charAt(robot_pos)) {
        case '<': current_direction = 0; break;
        case 'v': current_direction = 1; break;
        case '>': current_direction = 2; break;
        case '^': current_direction = 3; break;
    }

    let path = [];
    let movement_key = '';

    while (true) {
        // turn right
        current_direction = (current_direction + 3) % 4;

        if (image.charAt(robot_pos + movement_directions[current_direction]) === '#')
            movement_key = 'R';
        else {
            // turn left
            current_direction = (current_direction + 2) % 4;

            if (image.charAt(robot_pos + movement_directions[current_direction]) === '#')
                movement_key = 'L';
            else
                break; // no scaffolding found anymore
        }

        let distance = 0;

        while (image.charAt(robot_pos + movement_directions[current_direction]) === '#') {
            distance++;
            robot_pos += movement_directions[current_direction];
        }

        path.push(movement_key + distance);
    }

    return path.join();
};