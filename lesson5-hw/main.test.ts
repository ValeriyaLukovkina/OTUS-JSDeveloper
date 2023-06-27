import * as fs from "fs";
import { JSDOM } from 'jsdom';
import { getPath } from "./main";

describe('module', () => {
    const html = fs.readFileSync(__dirname+'/mockHtml.html');
    const { document } = (new JSDOM(html)).window;
    it('if element with id=id, should be return right selector ', () => {
        const q = document.getElementById('id');
        expect(getPath(q)).toBe('body > div.selector-3:nth-child(3) > p:nth-child(1)');
    })
    it(`if element don't exit, shoul be return 'Произошла ошибка'`, () => {
        const q = document.getElementById('r');
        expect(getPath(q)).toBe('Произошла ошибка');
    })
    it(`if similar elements in page^ shoud be return only one`, () => {
        const q = document.getElementsByTagName('li')[0];
        console.log(q)
        const selector = getPath(q);
        let elemsLength;
        if (selector) {
            elemsLength = document.querySelectorAll(selector).length;
        }
        expect(elemsLength).toBe(1);
    })
})