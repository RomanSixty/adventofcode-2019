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

        eval('document.querySelector("#output").value = this.day'+day+'_part'+part+'(input);');

        document.querySelector('#submit').disabled = false;
    },
    to_array: function(input) {
        return input.split("\n");
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
 * opcode processor
 * used on days 5 and 7
 *
 * @param {string} input program source code
 * @param {int[]} user_input
 * @param {int} keep program in memory for another run
 * @returns {string} return value
 */
adventofcode.opcode_process = function(input, user_input, keep = -1) {
    let program = input.split(",").map(x => parseInt(x));
    let pointer = 0;
    let output  = [];

    if (keep >= 0 ) {
        if (typeof this.opcode_memory == 'undefined')
            this.opcode_reset();

        if (typeof this.opcode_memory[keep] != 'undefined')
            program = this.opcode_memory[keep];
    }

    this.opcode_relative_base = 0;

    while (program[pointer] !== 99) {
        const opcode   = program[pointer].toString().padStart(5, "0");
        const op_parts = opcode.split("").map(x => parseInt(x));

        // ATTENTION parameter order is reversed
        // first:  op_parts[2]
        // second: op_parts[1]
        // third:  op_parts[0]

        switch (op_parts[4]) {
            case 1:
                program[this.opcode_get_pointer(program, pointer+3, op_parts[0])] = program[this.opcode_get_pointer(program, pointer+1, op_parts[2])] + program[this.opcode_get_pointer(program, pointer+2, op_parts[1])];
                pointer += 4;
                break;

            case 2:
                program[this.opcode_get_pointer(program, pointer+3, op_parts[0])] = program[this.opcode_get_pointer(program, pointer+1, op_parts[2])] * program[this.opcode_get_pointer(program, pointer+2, op_parts[1])];
                pointer += 4;
                break;

            case 3:
                program[this.opcode_get_pointer(program, pointer+1, op_parts[2])] = user_input.shift();
                pointer += 2;
                break;

            case 4:
                output.push(program[this.opcode_get_pointer(program, pointer+1, op_parts[2])]);
                pointer += 2;
                break;

            case 5:
                if (program[this.opcode_get_pointer(program, pointer+1, op_parts[2])] > 0)
                    pointer = program[this.opcode_get_pointer(program, pointer+2, op_parts[1])];
                else
                    pointer += 3;
                break;

            case 6:
                if (program[this.opcode_get_pointer(program, pointer+1, op_parts[2])] === 0)
                    pointer = program[this.opcode_get_pointer(program, pointer+2, op_parts[1])];
                else
                    pointer += 3;
                break;

            case 7:
                program[this.opcode_get_pointer(program, pointer+3, op_parts[0])] = (program[this.opcode_get_pointer(program, pointer+1, op_parts[2])] < program[this.opcode_get_pointer(program, pointer+2, op_parts[1])]) ? 1 : 0;
                pointer += 4;
                break;

            case 8:
                program[this.opcode_get_pointer(program, pointer+3, op_parts[0])] = (program[this.opcode_get_pointer(program, pointer+1, op_parts[2])] === program[this.opcode_get_pointer(program, pointer+2, op_parts[1])]) ? 1 : 0;
                pointer += 4;
                break;

            case 9:
                this.opcode_relative_base += program[this.opcode_get_pointer(program, pointer+1, op_parts[2])];
                pointer += 2;
                break;
        }
    }

    if (keep >= 0)
        this.opcode_memory[keep] = program;

    return output.join(',');
};

adventofcode.opcode_get_pointer = function(program, pointer, mode) {
    if (mode === 2)
        return program[pointer] + this.opcode_relative_base;
    else if (mode === 1)
        return pointer;
    else
        return program[pointer];
};

adventofcode.opcode_reset = function() {
    this.opcode_memory = [];
};