adventofcode.activate(6);

adventofcode.day6_part1 = function(input) {
    this.day6_get_orbits(input);

    return this.day6_orbit_count;
};

adventofcode.day6_part2 = function(input) {
    this.day6_get_orbits(input);

    let orbital_jumps = 0;

    // compare both rootlines and count every body,
    // that's only present in either one of them

    this.day6_orbit_objects_YOU.forEach(body => {
        if (this.day6_orbit_objects_SAN.indexOf(body) < 0)
            orbital_jumps++;
    });

    this.day6_orbit_objects_SAN.forEach(body => {
        if (this.day6_orbit_objects_YOU.indexOf(body) < 0)
            orbital_jumps++;
    });

    return orbital_jumps;
};

adventofcode.day6_get_orbits = function(input) {
    let tree = {};

    const orbits = input.split("\n").forEach(x => {
        [inner, outer] = x.split(")");

        if (typeof tree[inner] == 'undefined')
            tree[inner] = [];

        tree[inner].push(outer);
    });

    this.day6_orbit_count = 0;

    // rootlines
    this.day6_orbit_objects_YOU = '';
    this.day6_orbit_objects_SAN = '';

    this.day6_recursive_build_tree(tree, 'COM', 0, 'COM');
};

/**
 * transform flat array into the tree of bodies
 * @param {string[]} tree flat array of each body orbited by another body
 * @param {string} body current body to process
 * @param {int} orbit_count count of orbits (for checksum of part 1)
 * @param {string} orbit_objects pipe-concatenated rootline of each body (for part 2)
 */
adventofcode.day6_recursive_build_tree = function(tree, body, orbit_count, orbit_objects) {
    this.day6_orbit_count += orbit_count;

    let newtree = {};

    if (typeof tree[body] == 'undefined') {
        return newtree;
    }

    tree[body].forEach(b => {
        if (typeof newtree[b] == 'undefined')
            newtree[b] = {};

        if (b === 'SAN')
            this.day6_orbit_objects_SAN = orbit_objects.split('|');
        else if (b === 'YOU')
            this.day6_orbit_objects_YOU = orbit_objects.split('|');

        newtree[b] = this.day6_recursive_build_tree(tree, b, orbit_count+1, b+'|'+orbit_objects);
    });

    return newtree;
};