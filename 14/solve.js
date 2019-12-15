adventofcode.activate(14);

adventofcode.day14_part1 = function(input) {
    adventofcode.day14_leftovers = {};

    return adventofcode.day14_get_ingredients(input, 'FUEL', 1);
};

adventofcode.day14_part2 = function(input) {
    adventofcode.day14_leftovers = {};

    const cargo_hold = 1000000000000;

    let fuel_produced = 0;

    // first estimate how much is needed
    // however since we always have leftovers from previous runs
    // the actual amount of ore might be lower than that

    let increment = Math.floor(cargo_hold / adventofcode.day14_get_ingredients(input, 'FUEL', 1));

    // so now home in on the actual amount

    while (increment > 0) {
        adventofcode.day14_leftovers = {};

        let ore_needed = adventofcode.day14_get_ingredients(input, 'FUEL', fuel_produced + increment);

        if (ore_needed < cargo_hold)
            fuel_produced += increment;
        else
            increment = Math.floor(increment/2);
    }

    return fuel_produced;
};

/**
 * get amount of ORE needed
 *
 * @param {string} input whole text input
 * @param {string} product_name e.g. FUEL or some other ingredient
 * @param {int} product_needed how much of product_name we need
 *
 * @returns {int} how much ORE is needed
 */
adventofcode.day14_get_ingredients = function(input, product_name, product_needed) {
    if (typeof adventofcode.day14_leftovers[product_name] === 'undefined')
        adventofcode.day14_leftovers[product_name] = 0;

    // do we already have some product left from a previous reaction?
    // then we need less now

    while (product_needed > 0 && adventofcode.day14_leftovers[product_name] > 0) {
        product_needed--;
        adventofcode.day14_leftovers[product_name]--;
    }

    let ore_needed = 0;

    if (product_needed > 0) {
        // parse ingredient list for current product
        let product_regexp = new RegExp('(.*) => (\\d+) ' + product_name, 'ig');

        let matches = product_regexp.exec(input);

        let product_produced = parseInt(matches[2]);

        matches[1].split(', ').forEach(ingredient_raw => {
            [ingredient_amount, ingredient_name] = ingredient_raw.split(' ');

            let factor = 1;

            if (product_produced < product_needed)
                factor = Math.ceil(product_needed / product_produced);

            // recursively check what's needed for any ingredient

            adventofcode.day14_leftovers[product_name] = factor * product_produced - product_needed;

            // stop recursion once we reach ORE as most basic ingredient

            if (ingredient_name === 'ORE')
                ore_needed += factor * ingredient_amount;
            else {
                let needed = factor * ingredient_amount;

                ore_needed += adventofcode.day14_get_ingredients(input, ingredient_name, needed);
            }
        });
    }

    return ore_needed;
};