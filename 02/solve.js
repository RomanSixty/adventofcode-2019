adventofcode.activate(2);

adventofcode.day2_part1 = function(input) {
    input = input.split(",").map(x => parseInt(x));

    input[1] = 12;
    input[2] = 2;

    return this.day2_opcode_process(input);
};

adventofcode.day2_part2 = function(input) {
    input = input.split(",").map(x => parseInt(x));

    for (let noun=0; noun<=99; noun++) {
        for (let verb=0; verb<=99; verb++) {
            let program = input.slice();

            program[1] = noun;
            program[2] = verb;

            if (this.day2_opcode_process(program) === 19690720) {
                return 100 * noun + verb;
            }
        }
    }
};

adventofcode.day2_opcode_process = function(program) {
    let current = 0;

    while (program[current] !== 99) {
        switch (program[current]) {
            case 1:
                program[program[current+3]] = program[program[current+1]] + program[program[current+2]];
                break;

            case 2:
                program[program[current+3]] = program[program[current+1]] * program[program[current+2]];
                break;
        }

        current += 4;
    }
    return program[0];
};