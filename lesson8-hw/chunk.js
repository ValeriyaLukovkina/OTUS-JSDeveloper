const fs = require('fs');
const readline = require('readline');

let size = 12500000;
const sizeBuffering = 1250000;
let streams = [];
let bufferArray = [];
let iteration = 0;

let writeFunc = (writeStream, data) => {
    if (!writeStream.write(data)) {
        return new Promise((resolve) => {
            writeStream.once('drain', resolve)
        })
    }
}

let createFile = async () => {
    const writeStream = fs.createWriteStream('main');
    console.log('The process of forming main file...');
    for (let count = size; count > 0; count--) {
        await writeFunc(writeStream, count + '\n')
    }
    writeStream.close();
    console.log('The process of forming main file successfully completed');
    separateMain()
}

createFile()

const separateMain = () => {
    let counter = 0;
    let lastNum = '';

    const readStream = fs.createReadStream('main', { highWaterMark: sizeBuffering })
    fs.mkdir('files', err => {
        if (err) throw err
    });
    readStream.on('data', chunk => {
        counter++;
        const arrNum = (lastNum + chunk.toString()).split('\n')
        lastNum = arrNum.at(-1);
        arrNum.pop();
        arrNum.sort((a, b) => a - b);
        readStream.pause();
        const writeStream = fs.createWriteStream('files/file' + counter);
        writeStream.write(arrNum.join('\n'));
        writeStream.close();
        readStream.resume();
    })
    readStream.on('end', () => {
        readStream.close();
        console.log('The process of separating main file successfully completed');
        startWrite();
    })
}

const commonWriteStream = fs.createWriteStream('result.txt', { encoding: 'utf8' });

const startWrite = () => {
    fs.readdir('files', (err, files) => {
        numberOfFiles = files.length;
        files.map(file => {
            const readStream = fs.createReadStream("files/" + file, { encoding: 'utf8', highWaterMark: 1 });
            streams.push(readStream);
        })
        streams.map(stream => {
            func(stream)
        })
    });
}

const funcWrite = () => {
    const min = Math.min(...bufferArray);
    bufferArray = bufferArray.filter(el => el !== min)
    if(min) {
        const result = min + '\n';
        commonWriteStream.write(result);
    }
    if (bufferArray.length === 0) {
        commonWriteStream.close();
        console.log('Ready')
    }
}

const func = async (stream) => {
    const rl = readline.createInterface({ input: stream });
    stream.on('end', () => {
        streams = streams.filter(el => stream.path !== el.path)
        stream.close();
    })
    for await (const chunk of rl) {
        rl.pause();
        bufferArray.push(Number(chunk));
        iteration += 1;
        if (iteration > numberOfFiles * 10){
            funcWrite()
        } 
        rl.resume();

        if (streams.length === 0) {
            do {
                funcWrite()
            } while (bufferArray.length > 0)
        }
    }
}