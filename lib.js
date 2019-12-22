let adventofcode = {
    days: 24,
    init: function() {
        for (let day = 1; day <= this.days; day++) {
            let filepath = day.toString().padStart(2, "0") + "/solve.js";

            let script = document.createElement("script");
            script.src = filepath;

            document.head.appendChild(script);
        }
    },
    activate: function(day) {
        document.querySelector('#day option[value="'+day+'"]').disabled = false;
    },
    submit: function() {
        document.querySelector("#output").value = 'calculating...';
        document.querySelectorAll("#output_area svg, #output_area img").forEach(elem => elem.remove());
        document.querySelector('#submit').disabled = true;

        const day  = document.querySelector('#day').value;
        const part = document.querySelector('#part').value;

        const input = document.querySelector('#input').value;

        // make this asynchronous to show "calculating..." while processing
        setTimeout(() => {
            document.getElementById("output").value = this['day' + day + '_part' + part](input);
            document.querySelector('#submit').disabled = false;
        }, 10);
    },
    showImage: function(src) {
        let img = document.createElement('img');

        img.src = src;

        document.querySelector('#output_area').appendChild(img);
    },
    greatestCommonDivisor: function(x, y) {
        return (!y) ? x : this.greatestCommonDivisor(y, x % y);
    },
    leastCommonMultiple: function(x, y) {
        return Math.abs((x * y) / this.greatestCommonDivisor(x, y));
    }
};

adventofcode.init();

/**
 * intcode processor
 *
 * @param {string} input program source code
 * @param {int[]} user_input
 * @param {function} callback function in case of missing input
 * @returns {string} return value
 */
let aoc_intcode = {
    process: function(input, user_input = [], callback = {}) {
        let program = input.split(",").map(x => parseInt(x));
        let pointer = 0;
        let output  = [];

        this.relative_base = 0;

        while (program[pointer] !== 99) {
            const opcode   = program[pointer].toString().padStart(5, "0");
            const op_parts = opcode.split("").map(x => parseInt(x));

            // ATTENTION parameter order is reversed
            // first:  op_parts[2]
            // second: op_parts[1]
            // third:  op_parts[0]

            switch (op_parts[4]) {
                case 1:
                    program[this.get_pointer(program, pointer+3, op_parts[0])] = program[this.get_pointer(program, pointer+1, op_parts[2])] + program[this.get_pointer(program, pointer+2, op_parts[1])];
                    pointer += 4;
                    break;

                case 2:
                    program[this.get_pointer(program, pointer+3, op_parts[0])] = program[this.get_pointer(program, pointer+1, op_parts[2])] * program[this.get_pointer(program, pointer+2, op_parts[1])];
                    pointer += 4;
                    break;

                case 3:
                    if (user_input.length === 0) {
                        if (typeof callback === 'function') {
                            let new_input = callback(output);

                            if (typeof new_input === 'undefined')
                                return output.join(',');

                            user_input.push(new_input);
                            output = [];
                        }
                        else
                            return output.join(',');
                    }

                    program[this.get_pointer(program, pointer+1, op_parts[2])] = user_input.shift();
                    pointer += 2;
                    break;

                case 4:
                    output.push(program[this.get_pointer(program, pointer+1, op_parts[2])]);
                    pointer += 2;
                    break;

                case 5:
                    if (program[this.get_pointer(program, pointer+1, op_parts[2])] > 0)
                        pointer = program[this.get_pointer(program, pointer+2, op_parts[1])];
                    else
                        pointer += 3;
                    break;

                case 6:
                    if (program[this.get_pointer(program, pointer+1, op_parts[2])] === 0)
                        pointer = program[this.get_pointer(program, pointer+2, op_parts[1])];
                    else
                        pointer += 3;
                    break;

                case 7:
                    program[this.get_pointer(program, pointer+3, op_parts[0])] = (program[this.get_pointer(program, pointer+1, op_parts[2])] < program[this.get_pointer(program, pointer+2, op_parts[1])]) ? 1 : 0;
                    pointer += 4;
                    break;

                case 8:
                    program[this.get_pointer(program, pointer+3, op_parts[0])] = (program[this.get_pointer(program, pointer+1, op_parts[2])] === program[this.get_pointer(program, pointer+2, op_parts[1])]) ? 1 : 0;
                    pointer += 4;
                    break;

                case 9:
                    this.relative_base += program[this.get_pointer(program, pointer+1, op_parts[2])];
                    pointer += 2;
                    break;
            }
        }

        return output.join(',');
    },
    get_pointer: function(program, pointer, mode) {
        if (mode === 2)
            return program[pointer] + this.relative_base;
        else if (mode === 1)
            return pointer;
        else
            return program[pointer];
    }
};