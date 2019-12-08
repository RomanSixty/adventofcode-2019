adventofcode.activate(5);

adventofcode.day5_part1 = function(input) {
    return adventofcode.opcode_process(input, [1]);
};

adventofcode.day5_part2 = function(input) {
    return adventofcode.opcode_process(input, [5]);
};
