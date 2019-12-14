adventofcode.activate(10);

adventofcode.day10_part1 = function(input) {
    adventofcode.day10_asteroids = [];

    adventofcode.day10_get_asteroids(input);

    return adventofcode.day10_max_seeing;
};

adventofcode.day10_part2 = function(input) {
    adventofcode.day10_asteroids = [];

    adventofcode.day10_get_asteroids(input);

    // lets just sort all the y/x fractions of the best asteroid clockwise
    // the order is as follows:
    //   -∞ -> +∞ for positive x, then
    //   -∞ -> +∞ for negative x
    let list = adventofcode.day10_asteroids[adventofcode.day10_best_asteroid].losFractions.sort(function(a, b){
        // divisions by 0 suck... hence
        if (a[0] === 0)
            a[0] = 0.0001;

        if (b[0] === 0)
            b[0] = 0.0001;

        if (a[0] > 0) {
            if (b[0] > 0)
                return (a[1]/a[0] > b[1]/b[0]);
            else
                return -1;
        } else {
            if (b[0] < 0)
                return (a[1]/a[0] > b[1]/b[0]);
            else
                return 1;
        }
    });

    // also we're lucky knowing we found more than 200 asteroids on first sight
    // so the laser doesn't have to wrap around and we don't need to calculate
    // all newly visible asteroids again

    const asteroid_200 = adventofcode.day10_asteroids[list[199][2]];

    return ( asteroid_200.x * 100 + asteroid_200.y);
};

adventofcode.day10_get_asteroids = function(input) {
    input.split("\n").forEach((data, row) => {
        data.split("").forEach((value, col) => {
            if (value === '#') {
                adventofcode.day10_asteroids.push({
                    x: col,
                    y: row,
                    seeing: 0,       // number of other asteroids we see
                    losFractions: [] // line of sight fractions and id of asteroid as third value
                });
            }
        });
    });

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

            const gcd = adventofcode.greatestCommonDivisor(Math.abs(diff_x), Math.abs(diff_y));

            diff_x /= gcd;
            diff_y /= gcd;

            if (adventofcode.day10_line_of_sight(asteroid1, diff_x, diff_y)) {
                adventofcode.day10_asteroids[nr1].seeing++;
                adventofcode.day10_asteroids[nr2].seeing++;

                adventofcode.day10_asteroids[nr1].losFractions.push([diff_x, diff_y,   nr2]);
                adventofcode.day10_asteroids[nr2].losFractions.push([-diff_x, -diff_y, nr1]);
            }
        });
    });

    adventofcode.day10_max_seeing    = 0;
    adventofcode.day10_best_asteroid = 0;

    adventofcode.day10_asteroids.forEach((asteroid, nr) => {
        if (adventofcode.day10_max_seeing < asteroid.seeing) {
            adventofcode.day10_max_seeing = asteroid.seeing;
            adventofcode.day10_best_asteroid = nr;
        }
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