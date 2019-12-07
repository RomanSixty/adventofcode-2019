let adventofcode = {
    days: 1,
    init: function() {
        for (let day = 1; day <= this.days; day++) {
            console.log(day.toString().padStart(2, "0") + "/solve.js");
            let script = document.createElement("script");
            script.src = day.toString().padStart(2, "0") + "/solve.js";

            document.head.appendChild(script);
        }
    },
    submit: function() {
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