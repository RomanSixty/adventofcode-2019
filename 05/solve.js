adventofcode.activate(5);

adventofcode.day5_part1 = function(input) {
    return aoc_intcode.process(input, [1]).replace(/^(0,)+/, '');
};

adventofcode.day5_part2 = function(input) {
    return aoc_intcode.process(input, [5]);
};