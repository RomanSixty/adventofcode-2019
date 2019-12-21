adventofcode.activate(7);

adventofcode.day7_part1 = function(input) {
    const permutations = adventofcode.day7_permute([0,1,2,3,4]);

    let highest_signal = 0;

    permutations.forEach(perm => {
        let last_output = 0;

        perm.forEach(phase_setting => {
            last_output = adventofcode.opcode_process(input,[phase_setting, last_output]);
        });

        highest_signal = Math.max(highest_signal, last_output);
    });

    return highest_signal;
};

adventofcode.day7_part2 = function(input) {
    const permutations = adventofcode.day7_permute([5,6,7,8,9]);

    return "I don't get it... how is the feedback loop supposed to terminate?";
};

/**
 * return all permutations of an array
 * @see https://stackoverflow.com/questions/9960908/permutations-in-javascript
 *
 * @param {int[]} values possible values
 * @returns {array} all permutations
 */
adventofcode.day7_permute = function(values) {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    };

    permute(values);

    return result;
};