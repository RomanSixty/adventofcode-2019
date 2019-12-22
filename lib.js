let adventofcode = {
    days: 25,
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