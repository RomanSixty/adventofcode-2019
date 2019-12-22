adventofcode.activate(9);

adventofcode.day9_part1 = function(input) {
    return aoc_intcode.process(input, [1]);
};

adventofcode.day9_part2 = function(input) {
    return aoc_intcode.process(input, [2]);
};