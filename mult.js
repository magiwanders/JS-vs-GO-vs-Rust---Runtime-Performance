onmessage = function(e) {
    var b = e.data[0]
    var a = e.data[1]
    var N = e.data[2]
    for (var i = 0; i < N; i++) {
        for (var j = 0; j < N; j++) {
            for (var k = 0; k < N; k++) {
                b += b*a
            }
        }
    }
    postMessage([b])
}