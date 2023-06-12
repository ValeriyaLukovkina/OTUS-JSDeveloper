const sum = (num?: number): number | any => {
    if (!num) {
        return res;
    }
    res = 0;
    function add (num?: number) {
        if (num) {
            res += num;
            return add
        } else {
            return res;
        }
    }
    return add(num)
}

let res = 0

console.log(sum());
console.log(sum(1)(2)(4)(2)(4)(2)(4)());
console.log(sum());
console.log(sum(1)(4)(5)(7)(4)(2)(4)());
console.log(sum());

export { };