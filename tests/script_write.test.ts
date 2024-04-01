import { describe, expect, it, afterEach, beforeAll, jest } from '@jest/globals';
import main from '../src';
import { default as axios } from 'axios';
import { expectedData, firstCallData, secondCallData, thirdCallData } from './utils';
import fs from 'fs';

beforeAll(() => {
    fs.rmSync('./tests/output.json', { force: true });
});
describe('Writing to file test', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should correctly write data as valid JSON', async () => {
        let axiosGetCount = 0;
        jest.spyOn(axios, 'get').mockImplementation(async () => {
            axiosGetCount += 1;
            if (axiosGetCount === 1) return { data: firstCallData };
            else if (axiosGetCount === 2) return { data: secondCallData };
            return { data: thirdCallData };
        });

        await main();

        // Wait for output filestream to be closed before checking contents
        await new Promise((r) => setTimeout(r, 1000));

        const fileContents = fs.readFileSync('./tests/output.json');
        const data = JSON.parse(fileContents.toString());
        expect(data).toMatchObject(expectedData);
    });
});
