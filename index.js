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

export function run_tests() {
    var data = {
        'js_time': [],
        'go_time': [],
        'go_parallelized_time': [],
        'rust_time': [],
        'P': [],
        'N': []
    }

    for (var P = 0; P <= 25; P+=5) {
        for (var N = 0; N <= 500; N+=10) {
            data.P.push(P)
            data.N.push(N)
            var times = test(P, N)
            data.js_time.push(times.js)
            data.go_time.push(times.go)
            data.go_parallelized_time.push(times.go_parallelized)
            data.rust_time.push(times.rust)
        }
    }

    draw_plot(data)
}

export function test(P, N) {
    const start = performance.now();
    js_test(P, N)
    const end1 = performance.now();
    go_test(P, N, false)
    const end2a = performance.now();
    go_test(P, N, true)
    const end2b = performance.now();
    rust.rust_test(P, N)
    const end3 = performance.now();

    var times = {
        'js': ((end1-start)/1000),
        'go': ((end2a-end1)/1000),
        'go_parallelized': ((end2b-end2a)/1000),
        'rust': ((end3-end2)/1000)
    }

    console.log("RESULTS FOR: ", P, N)
    console.log("JS: " + times.js + ' s')
    console.log("Go: " + times.go + ' s')
    console.log("Go Parallelized: " + times.go_parallelized + ' s')
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
