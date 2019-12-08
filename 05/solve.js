adventofcode.activate(5);

adventofcode.day5_part1 = function(input) {
    return adventofcode.day5_opcode_process(input, 1);
};

adventofcode.day5_part2 = function(input) {
    return adventofcode.day5_opcode_process(input, 5);
};

adventofcode.day5_opcode_process = function(input, input_suggestion) {
    let program = input.split(",").map(x => parseInt(x));

    let pointer = 0;
    let output = '';

    while (program[pointer] !== 99) {
        const opcode   = program[pointer].toString().padStart(5, "0");
        const op_parts = opcode.split("").map(x => parseInt(x));

        // ATTENTION parameter order is reversed
        // first:  op_parts[2]
        // second: op_parts[1]
        // third:  op_parts[0]

        switch (op_parts[4]) {
            case 1:
                program[program[pointer+3]] = adventofcode.day5_get_parameter(program, pointer+1, op_parts[2]) + adventofcode.day5_get_parameter(program, pointer+2, op_parts[1]);
                pointer += 4;
                break;

            case 2:
                program[program[pointer+3]] = adventofcode.day5_get_parameter(program, pointer+1, op_parts[2]) * adventofcode.day5_get_parameter(program, pointer+2, op_parts[1]);
                pointer += 4;
                break;

            case 3:
                program[program[pointer+1]] = parseInt(prompt('Input: ', input_suggestion));
                pointer += 2;
                break;

            case 4:
                output = adventofcode.day5_get_parameter(program, pointer+1, op_parts[2]);
                pointer += 2;
                break;

            // part 2
            case 5:
                if (adventofcode.day5_get_parameter(program, pointer+1, op_parts[2]) > 0) {
                    pointer = adventofcode.day5_get_parameter(program, pointer+2, op_parts[1]);
                } else {
                    pointer += 3;
                }
                break;

            case 6:
                if (adventofcode.day5_get_parameter(program, pointer+1, op_parts[2]) === 0) {
                    pointer = adventofcode.day5_get_parameter(program, pointer+2, op_parts[1]);
                } else {
                    pointer += 3;
                }
                break;

            case 7:
                program[program[pointer+3]] = (adventofcode.day5_get_parameter(program, pointer+1, op_parts[2]) < adventofcode.day5_get_parameter(program, pointer+2, op_parts[1])) ? 1 : 0;
                pointer += 4;
                break;

            case 8:
                program[program[pointer+3]] = (adventofcode.day5_get_parameter(program, pointer+1, op_parts[2]) === adventofcode.day5_get_parameter(program, pointer+2, op_parts[1])) ? 1 : 0;
                pointer += 4;
                break;
        }
    }
    return output;
};

adventofcode.day5_get_parameter = function(program, pointer, mode) {
    return (mode === 1) ? program[pointer] : program[program[pointer]];
};