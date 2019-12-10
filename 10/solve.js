adventofcode.activate(10);

adventofcode.day10_asteroids = [];

adventofcode.day10_part1 = function(input) {
    adventofcode.day10_asteroids = [];

    adventofcode.day10_get_asteroids(input);

    adventofcode.day10_asteroids.forEach((asteroid1, nr1) => {
        adventofcode.day10_asteroids.forEach((asteroid2, nr2) => {
            // don't check against ourself
            if (asteroid1.x === asteroid2.x && asteroid1.y === asteroid2.y)
                return;

            // those would already have seen us, so we needn't check them again
            if (asteroid2.y < asteroid1.y || asteroid2.y === asteroid1.y && asteroid2.x < asteroid1.x)
                return;

            let diff_x = asteroid2.x - asteroid1.x;
            let diff_y = asteroid2.y - asteroid1.y;

            const gcd = adventofcode.day10_greatest_common_divisor(Math.abs(diff_x), Math.abs(diff_y));

            diff_x /= gcd;
            diff_y /= gcd;

            if (adventofcode.day10_line_of_sight(asteroid1, diff_x, diff_y)) {
                adventofcode.day10_asteroids[nr1].seeing++;
                adventofcode.day10_asteroids[nr2].seeing++;

                adventofcode.day10_asteroids[nr1].losFractions.push([diff_x, diff_y]);
                adventofcode.day10_asteroids[nr2].losFractions.push([-diff_x, -diff_y]);
            }
        });
    });

    let max_seeing = 0;

    adventofcode.day10_asteroids.forEach(asteroid => {
        max_seeing = Math.max(asteroid.seeing, max_seeing);
    });

    return max_seeing;
};

adventofcode.day10_part2 = function(input) {
    return 'maybe tomorrow';
};

adventofcode.day10_get_asteroids = function(input) {
    input.split("\n").forEach((data, row) => {
        data.split("").forEach((value, col) => {
            if (value === '#') {
                adventofcode.day10_asteroids.push({
                    x: col,
                    y: row,
                    seeing: 0,       // number of other asteroids we see
                    losFractions: [] // line of sight fractions
                });
            }
        });
    });
};

adventofcode.day10_line_of_sight = function(asteroid, diff_x, diff_y) {
    for (let fraction in asteroid.losFractions) {
        // actually we only need to check if the fractions match
        if (diff_x === asteroid.losFractions[fraction][0] && diff_y === asteroid.losFractions[fraction][1])
            return false;
    }

    return true;
};

adventofcode.day10_greatest_common_divisor = function(x, y) {
    return (!y) ? x : adventofcode.day10_greatest_common_divisor(y, x % y);
};