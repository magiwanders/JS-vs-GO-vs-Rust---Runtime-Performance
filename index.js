import init from '/JS-vs-GO-vs-Rust---Runtime-Performance/runtime_experiments.js';
import draw_plot from '/JS-vs-GO-vs-Rust---Runtime-Performance/plot.js';

var rust
window.test = test
window.run_tests = run_tests

init().then((wasm)=>{
    console.log('Rust WASM Initialized.')
    rust = wasm
//    var P = 10, N = 40;
//    test(P, N)
})

export async function run_tests() {
    var data = {
        'js_time': [],
        'go_time': [],
        'go_parallelized_time': [],
        'rust_time': [],
        'P': [],
        'N': []
    }

    for (var P = 0; P <= 25; P+=5) {
        for (var N = 0; N <= 500; N+=50) {
            data.P.push(P)
            data.N.push(N)
            var times = test(P, N)
            data.js_time.push(times.js)
            data.js_time_multithreaded.push(times.js_multithreaded)
            data.go_time.push(times.go)
            data.go_time_multithreaded.push(times.go_multithreaded)
            data.rust_time.push(times.rust)
        }
    }

    draw_plot(data)
}

export async function test(P, N) {
    const start = performance.now();
    js_test(P, N)
    const end1a = performance.now();
    await js_test_multithreaded(P, N)
    const end1b = performance.now();
    go_test(P, N, false)
    const end2a = performance.now();
    go_test(P, N, true)
    const end2b = performance.now();
    rust.rust_test(P, N)
    const end3 = performance.now();

    var times = {
        'js': ((end1a-start)/1000),
        'js_multithreaded': ((end1b-end1a)/1000),
        'go': ((end2a-end1b)/1000),
        'go_multithreaded': ((end2b-end2a)/1000),
        'rust': ((end3-end2b)/1000)
    }

    console.log("RESULTS FOR: ", P, N)
    console.log("JS: " + times.js + ' s')
    console.log("JS Multithreaded: " + times.js_multithreaded + ' s')
    console.log("Go: " + times.go + ' s')
    console.log("Go Multithreaded: " + times.go_multithreaded + ' s')
    console.log("Rust: " + times.rust + ' s')

    return times
}

function js_test(P, N) {
    var a = 1
    var b = 1
    for (var p = 0; p < P; p++) {
        a = Math.random()
        for (var i = 0; i < N; i++) {
            for (var j = 0; j < N; j++) {
                for (var k = 0; k < N; k++) {
                    b += b*a
                }
            }
        }
    }
    return b
}

async function js_test_multithreaded(P, N) {
    var worker = new Array(P).fill(new Worker('mult.js'))
    var finished = new Array(P).fill(false)
    var a = 1
    var b = 1
    for (var p = 0; p < P; p++) {
        worker[p].postMessage([b, a, N]);
        worker[p].onmessage = function(e) {
			var b = e.data[0]
            finished[worker.indexOf(e.srcElement)] = true
		};
    }

    while(!finished.every(worker => worker === true)) await delay(1)

    return [matrixRes_multithreaded, finished]
}

const delay = ms => new Promise(res => setTimeout(res, ms));