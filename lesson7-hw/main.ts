import * as fs from 'fs';
import {join} from 'path';
import { argv } from 'node:process';
type TTree = {
    files: string[],
    dirs: string[]
}

const tree: TTree = {
    files: [],
    dirs: []
};
let folder = argv[2] ? `./${argv[2]}` : './foo';
    
const find = (dir: string) => {
    fs.readdir(dir, (err, files: string[]) => {
        let folderLength: number = files.length;
        files.forEach(file => {
            const filePath: string = join(dir, file);
            let stat = fs.statSync(filePath);
            if (stat.isFile()) {
                tree.files.push(filePath)
            } else if (stat.isDirectory()) {
                tree.dirs.push(filePath)
                find(filePath);
                folderLength--;
            }
        })
        if (folderLength == 0) {
            console.log(tree)
        }
    })
}

find(folder);