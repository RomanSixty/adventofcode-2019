adventofcode.activate(22);

adventofcode.day22_part1 = function(input) {
    let cards = Array.from(Array(10007).keys());

    input.split("\n").forEach(command => {
        let regexp = new RegExp('(cut|deal with increment|deal into new stack)( -?\\d+)?', 'i');

        [dummy, technique, param] = regexp.exec(command);

        cards = this.day22_shuffler[technique.replace(RegExp(' ', 'g'), '_')](cards, parseInt(param));
    });

    return cards.indexOf(2019);
};

adventofcode.day22_part2 = function(input) {
    /*
    let cards = Array.from(Array(119315717514047).keys());

    input.split("\n").forEach(command => {
        let regexp = new RegExp('(cut|deal with increment|deal into new stack)( -?\\d+)?', 'i');

        [dummy, technique, param] = regexp.exec(command);

        cards = this.day22_shuffler[technique.replace(RegExp(' ', 'g'), '_')](cards, parseInt(param));
    });

    return cards[2020];
    */

    this.showImage('https://i.giphy.com/media/GQmkN38qmBf5m/giphy.webp');

    return 'mah array is tooo biiig';
};

adventofcode.day22_shuffler = {
    deal_into_new_stack: function(cards, param = 0) {
        cards.reverse();

        return cards;
    },
    cut: function(cards, param = 0) {
        if (param > 0) {
            let new_cards = cards.splice(0, param);
            return cards.concat(new_cards);
        } else {
            let new_cards = cards.splice(cards.length + param, Math.abs(param));
            return new_cards.concat(cards);
        }
    },
    deal_with_increment: function(cards, param = 0) {
        let new_cards = [];

        for (let i = 0; i < cards.length; i++)
            new_cards[(i*param) % cards.length] = cards[i];

        return new_cards;
    }
};