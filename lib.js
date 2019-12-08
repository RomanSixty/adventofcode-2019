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
        document.querySelectorAll("#output_area svg").forEach(elem => elem.remove());

        const day  = document.querySelector('#day').value;
        const part = document.querySelector('#part').value;

        const input = document.querySelector('#input').value;

        eval('document.querySelector("#output").value = this.day'+day+'_part'+part+'(input);');
    },
    to_array: function(input) {
        return input.split("\n");
    }
};

adventofcode.init();