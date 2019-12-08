let adventofcode = {
    days: 24,
    init: function() {
        for (let day = 1; day <= this.days; day++) {
            let filepath = day.toString().padStart(2, "0") + "/solve.js";

            fetch(filepath).then(function(response){
                if (response.ok) {
                    let script = document.createElement("script");
                    script.src = filepath;

                    document.head.appendChild(script);

                    let option = document.createElement("option");
                    option.text = day;

                    document.querySelector('#day').appendChild(option);
                }
            });
        }
    },
    submit: function() {
        document.querySelector("#output").value = 'calculating...';

        document.querySelectorAll('svg').forEach(elem => elem.remove());

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