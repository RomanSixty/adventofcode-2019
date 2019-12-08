adventofcode.activate(1);

adventofcode.day1_part1 = function(input) {
    input = adventofcode.to_array(input);
    input = input.map(x => Math.floor(parseInt(x)/3) - 2);

    return input.reduce((accumulator, value) => accumulator + value);
};

adventofcode.day1_part2 = function(input) {
    input = adventofcode.to_array(input);
    input = input.map(x => {
        let fuel_total = fuel_added = Math.floor(parseInt(x)/3) - 2;

        while (true) {
            fuel_added = Math.floor(fuel_added/3) - 2;

            if (fuel_added > 0) {
                fuel_total += fuel_added;
            } else {
                break;
            }
        }

        return fuel_total;
    });

    return input.reduce((accumulator, value) => accumulator + value);
};