const fn1 = (): Promise<number> => {
    console.log('fn1')
    return Promise.resolve(1)
}
const fn2 = (): Promise<number> => new Promise((resolve) => {
    console.log('fn2')
    setTimeout(() => resolve(2), 1000)
})

type ReducerType = (memo: number, value: number) => number

const promiseReduce = async (asyncFunctions: Array<any>, reducer: ReducerType, initialValue: number = 1) => {

    let result: number = await asyncFunctions.reduce(async ( accum: number, el: any ) => {
        try {
            return reducer (await accum, await el())
        } catch (err) {
            throw err
        }
    }, initialValue)

    return Promise.resolve(result);
}

promiseReduce(
    [fn1, fn2],
    function (memo: number, value: number): number {
        console.log('reduce')
        return memo * value
    },
    1
).then(console.log)

export {}