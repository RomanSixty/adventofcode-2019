adventofcode.activate(19);

adventofcode.day19_part1 = function(input) {
    let affected = 0;

    for (let y = 0; y < 50; y++) {
        for (let x = 0; x < 50; x++)
            if (parseInt(this.opcode_process(input, [x, y])) === 1)
                affected++;
        }

    return affected;
};

adventofcode.day19_part2 = function(input) {
    // an educated guess
    let x = 55;
    let y = 50;

    // let's start here and check the highest x value of this y where the beam persists
    // then check if x-100|y+100 is also affected
    // if so we found it
    // otherwise we check a y further down and proceed the same way

    while (true) {
        if (parseInt(this.opcode_process(input, [x+1, y])) === 0) {
            if (parseInt(this.opcode_process(input, [x-99, y+99])) === 1) {
                break;
            }

            y++;
        } else
            x++;
    }

    return (x-99)*10000 + y;
};