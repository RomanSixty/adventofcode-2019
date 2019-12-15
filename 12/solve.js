adventofcode.activate(12);

adventofcode.day12_part1 = function(input) {
    adventofcode.day12_get_moons(input);

    for (let step = 0; step < 1000; step++)
        adventofcode.day12_tick();

    return adventofcode.day12_calculate_energy();
};

adventofcode.day12_part2 = function(input) {
    adventofcode.day12_get_moons(input);

    let loop_length = {x: 0, y: 0, z: 0};

    // damn JavaScript for pass-by-reference...
    const initial_state = JSON.parse(JSON.stringify(adventofcode.day12_moons));

    let tick = 0;

    while (loop_length.x === 0 || loop_length.y === 0 || loop_length.z === 0) {
        adventofcode.day12_tick();

        ['x', 'y', 'z'].forEach(coordinate => {
            if (loop_length[coordinate] === 0) {
                if (adventofcode.day12_moons[0].position[coordinate] === initial_state[0].position[coordinate]
                 && adventofcode.day12_moons[0].velocity[coordinate] === initial_state[0].velocity[coordinate]
                 && adventofcode.day12_moons[1].position[coordinate] === initial_state[1].position[coordinate]
                 && adventofcode.day12_moons[1].velocity[coordinate] === initial_state[1].velocity[coordinate]
                 && adventofcode.day12_moons[2].position[coordinate] === initial_state[2].position[coordinate]
                 && adventofcode.day12_moons[2].velocity[coordinate] === initial_state[2].velocity[coordinate]
                 && adventofcode.day12_moons[3].position[coordinate] === initial_state[3].position[coordinate]
                 && adventofcode.day12_moons[3].velocity[coordinate] === initial_state[3].velocity[coordinate] ) {
                    loop_length[coordinate] = tick + 1;
                }
            }
        });

        tick++;
    }

    return adventofcode.leastCommonMultiple(loop_length.x,
               adventofcode.leastCommonMultiple(loop_length.y, loop_length.z));
};

adventofcode.day12_get_moons = function(input) {
    adventofcode.day12_moons = [];

    input.split("\n").forEach(moon_position => {

        let coordinates = moon_position.match(/x=(-?\d+), y=(-?\d+), z=(-?\d+)/);

        adventofcode.day12_moons.push({
            position: {
                x: parseInt(coordinates[1]),
                y: parseInt(coordinates[2]),
                z: parseInt(coordinates[3])
            },
            velocity: {
                x: 0,
                y: 0,
                z: 0
            }
        });
    });
};

adventofcode.day12_tick = function() {
    // update velocities
    [[0,1], [0,2], [0,3], [1,2], [1,3], [2,3]].forEach(pair => {
        ['x', 'y', 'z'].forEach(coordinate => {
            const pos_1 = adventofcode.day12_moons[pair[0]].position[coordinate];
            const pos_2 = adventofcode.day12_moons[pair[1]].position[coordinate];

            if (pos_1 < pos_2) {
                adventofcode.day12_moons[pair[0]].velocity[coordinate]++;
                adventofcode.day12_moons[pair[1]].velocity[coordinate]--;
            } else if (pos_1 > pos_2) {
                adventofcode.day12_moons[pair[0]].velocity[coordinate]--;
                adventofcode.day12_moons[pair[1]].velocity[coordinate]++;
            }
        });
    });

    // update positions
    for (let moon of adventofcode.day12_moons) {
        ['x', 'y', 'z'].forEach(coordinate => {
            moon.position[coordinate] += moon.velocity[coordinate];
        });
    }
};

adventofcode.day12_calculate_energy = function() {
    let total_energy = 0;

    for (let moon of adventofcode.day12_moons) {
        const potential_energy = Math.abs(moon.position.x) + Math.abs(moon.position.y) + Math.abs(moon.position.z);
        const kinetic_energy   = Math.abs(moon.velocity.x) + Math.abs(moon.velocity.y) + Math.abs(moon.velocity.z);

        total_energy += potential_energy * kinetic_energy;
    }

    return total_energy;
};