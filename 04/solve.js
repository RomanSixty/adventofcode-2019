adventofcode.activate(4);

adventofcode.day4_part1 = function(input) {
    let possibilities = this.day4_collect_part1(input);

    return possibilities.length;
};

adventofcode.day4_part2 = function(input) {
    let possibilities = this.day4_collect_part1(input);

    let remaining = [];

    for (let i = 0; i < possibilities.length; i++) {
        const digits = possibilities[i].toString().split("").map(x => parseInt(x));

        if (                           digits[0] === digits[1] && digits[1] !== digits[2]
         || digits[0] !== digits[1] && digits[1] === digits[2] && digits[2] !== digits[3]
         || digits[1] !== digits[2] && digits[2] === digits[3] && digits[3] !== digits[4]
         || digits[2] !== digits[3] && digits[3] === digits[4] && digits[4] !== digits[5]
         || digits[3] !== digits[4] && digits[4] === digits[5]) {
            remaining.push(possibilities[i]);
        }
    }

    return remaining.length;
};

adventofcode.day4_collect_part1 = function(input) {
    [ lower, upper ] = input.split("-").map(x => parseInt(x));

    let possibilities = [];

    for (let i = lower; i <= upper; i++) {
        const digits = i.toString().split("").map(x => parseInt(x));

        // small to large
        if (digits[0] > digits[1]
         || digits[1] > digits[2]
         || digits[2] > digits[3]
         || digits[3] > digits[4]
         || digits[4] > digits[5]) {
            continue;
        }

        // at least one pair of digits that are the same
        if (digits[0] !== digits[1]
         && digits[1] !== digits[2]
         && digits[2] !== digits[3]
         && digits[3] !== digits[4]
         && digits[4] !== digits[5]) {
            continue;
        }

        possibilities.push(i);
    }

    return possibilities;
};