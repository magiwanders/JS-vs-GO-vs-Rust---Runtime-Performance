//  python3 -m http.server

mod utils;

use wasm_bindgen::prelude::*;
use rand::prelude::*;


// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() -> i32 {
    0
}

#[wasm_bindgen]
pub fn rust_test(P:usize, N:usize) -> i32 {
    let mut a = 1;
    let mut b = 1;
    for p  in 0..P {
        a = random();
        for i in 0..N {
            for j in 0..N {
                for k in 0..N {
                    b += b * a;
                }

            }
        }
    }
    b
}
