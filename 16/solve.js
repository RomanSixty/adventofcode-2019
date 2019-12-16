adventofcode.activate(16);

adventofcode.day16_part1 = function(input) {
    let numbers = input.split("").map(x => parseInt(x));

    for (let phase = 0; phase < 100; phase++)
        numbers = adventofcode.day16_calculate_phase(numbers);

    return numbers.join("").substring(0,8);
};

adventofcode.day16_part2 = function(input) {
    let message_offset = parseInt(input.substring(0, 7));
    let message = input;

    for (let i = 1; i < 10000; i++)
        message += input;

    let numbers = message.substring(message_offset).split("").map(x => parseInt(x));

    // it's a kind of magic...
    for (let phase = 0; phase < 100; phase++)
        for (let i = numbers.length - 1; i >= 0; i--)
            numbers[i] = Math.abs((numbers[i + 1] || 0) + numbers[i]) % 10;

    return numbers.join("").substring(0,8);
};

adventofcode.day16_calculate_phase = function(numbers) {
    let pattern = [0, 1, 0, -1];

    let return_signal = [];

    for (let i = 0; i < numbers.length; i++) {
        let factors = [];

        for (let j = 0; j <= numbers.length; j++)
            factors.push(pattern[Math.floor(j / (i+1)) % 4]);

        return_signal.push(
            Math.abs(numbers
                .map((number, index) => number * factors[index+1])
                .reduce((accumulator, value) => accumulator + value)) % 10
        );
    }

    return return_signal;
};