// GOOS=js GOARCH=wasm go build -o main.wasm

package main

import (
	"math/rand"
	"syscall/js"
)

func go_test(this js.Value, args []js.Value) interface{} {
	var P = args[0].Int()
	var N = args[1].Int()
	var a = 1
	var b = 1
	for p := 0; p < P; p++ {
		a = rand.Int()
		for i := 0; i < N; i++ {
			for j := 0; j < N; j++ {
				for k := 0; k < N; k++ {
					b += b * a
				}
			}
		}
	}
	return b
}

func main() {
	js.Global().Set("go_test", js.FuncOf(go_test))
	<-make(chan int)
}
