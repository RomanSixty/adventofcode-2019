adventofcode.activate(6);

adventofcode.day6_part1 = function(input) {
    let tree = adventofcode.day6_get_orbits(input);

    return adventofcode.day6_orbit_count;
};

adventofcode.day6_part2 = function(input) {

};

adventofcode.day6_get_orbits = function(input) {
    let tree = {};

    const orbits = input.split("\n").forEach(x => {
        [inner, outer] = x.split(")");

        if (typeof tree[inner] == 'undefined') {
            tree[inner] = [];
        }
        tree[inner].push(outer);
    });

    adventofcode.day6_orbit_count = 0;

    tree = adventofcode.day6_build_tree(tree, 'COM', 0);

    return tree['COM'];
};

adventofcode.day6_build_tree = function(tree, body, orbit_count) {
    adventofcode.day6_orbit_count += orbit_count;

    if (typeof tree[body] == 'undefined') {
        return tree;
    }

    tree[body].forEach((b, i) => {
        delete tree[body][i];

        tree[body][b] = tree[b];

        tree = adventofcode.day6_build_tree(tree, b, orbit_count+1);
    });

    return tree;
};