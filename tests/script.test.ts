import { describe, expect, it, afterEach, beforeEach, jest } from '@jest/globals';
import main from '../src';
import { AxiosError, AxiosResponse, default as axios } from 'axios';
import { firstCallData, secondCallData, thirdCallData } from './utils';
import fs, { WriteStream } from 'fs';

jest.mock('fs');
const mockedFs = fs as jest.Mocked<typeof fs>;

describe('API fetch logic test', () => {
    beforeEach(() => {
        const mWriteStream = {
            pipe: jest.fn().mockReturnThis(),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            on: jest.fn().mockImplementation(function (event, handler: any) {
                handler();
                return this;
            }),
            write: jest.fn(),
            end: jest.fn()
        };
        mockedFs.createWriteStream.mockReturnValueOnce(mWriteStream as unknown as WriteStream);
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should fetch 3 times for 3 pages', async () => {
        let axiosGetCount = 0;
        const axiosSpy = jest.spyOn(axios, 'get').mockImplementation(async () => {
            axiosGetCount += 1;
            if (axiosGetCount === 1) return { data: firstCallData };
            else if (axiosGetCount === 2) return { data: secondCallData };
            return { data: thirdCallData };
        });

        await main();
        expect(axiosSpy).toBeCalledTimes(3);
    });

    it('should immediately exit when axios error (non-retryable errors)', async () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce(
            new AxiosError('Error', '404', undefined, undefined, {
                status: 404,
                data: 'Mock Error'
            } as AxiosResponse)
        );
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        await main();
        expect(axiosSpy).toBeCalledTimes(1);
        expect(consoleSpy).toBeCalledWith('Mock Error');
    });

    it('should immediately exit when axios error (retryable errors)', async () => {
        const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce(
            new AxiosError('Error', '500', undefined, undefined, {
                status: 500,
                data: 'Mock Error'
            } as AxiosResponse)
        );
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        await main();
        expect(axiosSpy).toBeCalledTimes(1);
        expect(consoleSpy).toBeCalledWith('Mock Error');
    });
});
