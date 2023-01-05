
# Quick start

# Performance
* 5 warm-ups, mean results of 10 times

| speed(ms)              | vanilla js | dlight        | react         | solid         |
|------------------------|------------|---------------|---------------|---------------|
| add 1000 rows          | 54.31      | 66.65(1.22x)  | 67.21(1.24x)  | 57.35(1.06x)  |
| append 1000 rows       | 53.97      | 64.76(1.20x)  | 76.75(1.42x)  | 54.64(1.01x)  |
| add 10000 rows         | 434.80     | 528.67(1.21x) | 702.20(1.61x) | 452.79(1.04x) |
| update every 10th rows | 20.88      | 24.39(1.17x)  | 28.26(1.35x)  | 21.04(1.01x)  |
| swap 2 and 998 rows    | 6.36       | 5.92(0.93x)   | 58.73(9.23x)  | 6.72(1.05x)   |
| select row             | 4.53       | 4.48(0.99x)   | 6.73(1.49x)   | 5.26(1.16x)   |         
| delete rows            | 12.90      | 12.78(0.99x)  | 20.16(1.56x)  | 14.15(1.2x)   |

| memory(MB) | vanilla js | dlight      | react       | solid       |
|------------|------------|-------------|-------------|-------------|
| load       | 1.1        | 1.3(1.18x)  | 1.8(1.64x)  | 0.81(0.73x) |
| 1000 rows  | 2.3        | 2.9(1.26x)  | 5.1(2.21x)  | 2.8(1.22x)  |
| 10000 rows | 11.7       | 15.2(1.30x) | 35.0(2.99x) | 19.5(1.67x) |


# TODO
* features
- [x] if
- [x] for
- [x] prop
- [x] dot prop
- [x] shortcut for style (e.g. div("hello").*height)
- [x] element map out
- [x] support text node
- [ ] error hints
* plugins
- [x] vite transpiler plugin
- [ ] vscode language server for auto completion
