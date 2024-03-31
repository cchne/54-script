import axios, { AxiosError, AxiosResponse } from 'axios';
import fs from 'fs';
import _ from 'lodash';

const BASE_URL = 'https://swapi.dev/api';

function handleAxiosError(error: AxiosError) {
    if (error.response.status >= 400 && error.response.status <= 499) {
        // Maybe 404 if the page has moved, or script has hit rate limit
        console.log(error.response.data);
    } else if (error.response.status >= 500) {
        // 5xx errors can usually be retried at a later time
        console.log(error.response.data);
    }
    //
}

interface CharacterResp {
    name: string;
    height: string;
    gender: string;
    // Other response fields that are unused
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface Character {
    name: string;
    height: string | number;
}

interface AllCharacters {
    [gender: string]: {
        height: Array<Character>;
        alpha: Array<Character>;
    };
}

// interface OutputList {
//     gender: string;
//     characters: Array<Character>;
// }

export default async function main() {
    // main function
    let pages = 0;
    let itemsPerPage = 10; // We recalculate this from the first API call
    const allCharacters: AllCharacters = {};
    try {
        // First get the number of pages we need to pull from
        const response = await axios.get(`${BASE_URL}/people/`);
        const data = response.data;
        itemsPerPage = data.results.length;
        pages = Math.ceil(data.count / itemsPerPage);
        data.results.forEach((character: CharacterResp) => {
            if (allCharacters[character.gender] === undefined) {
                // Initialize the arrays for each new gender
                allCharacters[character.gender] = { height: [], alpha: [] };
            }

            if (character.height && Number(character.height)) {
                // Add to height array if known height
                const newChar = { name: character.name, height: Number(character.height) };
                allCharacters[character.gender].height.splice(
                    _.sortedIndexBy(allCharacters[character.gender].height, newChar, 'height'),
                    0,
                    newChar
                );
            } else {
                // Add to alphabetical array if unknown height
                const newChar = { name: character.name, height: character.height };
                allCharacters[character.gender].alpha.splice(
                    _.sortedIndexBy(allCharacters[character.gender].alpha, newChar, 'name'),
                    0,
                    newChar
                );
            }
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            handleAxiosError(error);
            return;
        } else {
            // Shouldn't reach here
            throw error;
        }
    }
    const requests: Array<Promise<AxiosResponse>> = [];
    for (let page = 2; page <= pages; page++) {
        requests.push(axios.get(`${BASE_URL}/people?page=${page}`));
    }

    let responses: Array<AxiosResponse>;
    try {
        responses = await Promise.all(requests);
    } catch (error) {
        console.error(error);
        // If the error is retryable, consider to do a retry here instead of outright returning
        return;
    }
    for (const response of responses) {
        const data = response.data;
        data.results.forEach((character: CharacterResp) => {
            if (allCharacters[character.gender] === undefined) {
                // Initialize the arrays for each new gender
                allCharacters[character.gender] = { height: [], alpha: [] };
            }

            if (character.height && Number(character.height)) {
                // Add to sorted height array if known height
                const newChar = { name: character.name, height: Number(character.height) };
                allCharacters[character.gender].height.splice(
                    _.sortedIndexBy(allCharacters[character.gender].height, newChar, 'height'),
                    0,
                    newChar
                );
            } else {
                // Add to sorted alphabetical array if unknown height
                const newChar = { name: character.name, height: character.height };
                allCharacters[character.gender].alpha.splice(
                    _.sortedIndexBy(allCharacters[character.gender].alpha, newChar, 'name'),
                    0,
                    newChar
                );
            }
        });
    }

    // const output: Array<OutputList> = [];

    // Instead of joining arrays to create the output object in application memory, just immediately write to file via a stream
    const stream = fs.createWriteStream(`./${process.env.NODE_ENV === 'test' ? 'tests/' : ''}output.json`);
    stream.write('[\n\t{\n');
    for (const [i, gender] of Object.keys(allCharacters).entries()) {
        // // Normally the output object would be created here
        // output.push({ gender, characters: allCharacters[gender].height.concat(allCharacters[gender].alpha) });
        // fs.write(JSON.stringify(output))

        stream.write(`\t\t"gender": "${gender}",\n\t\t"characters": [`);

        // One leading comma is needed if height array isn't empty
        let needLeadingComma = false;

        for (const [index, character] of allCharacters[gender].height.entries()) {
            stream.write(
                `\n\t\t\t{\n\t\t\t\t"name": "${character.name}",\n\t\t\t\t"height": ${character.height}\n\t\t\t}`
            );
            if (index !== allCharacters[gender].height.length - 1) {
                stream.write(',');
            } else {
                needLeadingComma = true;
            }
        }
        for (const [index, character] of allCharacters[gender].alpha.entries()) {
            if (needLeadingComma) {
                stream.write(',');
                needLeadingComma = false;
            }
            stream.write(
                `\n\t\t\t{\n\t\t\t\t"name": "${character.name}",\n\t\t\t\t"height": "${character.height}"\n\t\t\t}`
            );
            if (index !== allCharacters[gender].alpha.length - 1) {
                stream.write(',');
            }
        }
        stream.write(`\n\t\t]\n\t}`);

        if (i !== Object.keys(allCharacters).length - 1) {
            stream.write(',\n\t{\n');
        }
    }
    stream.write('\n]');
    stream.end();
}

(async () => {
    if (process.env.NODE_ENV === 'test') {
        return;
    }
    await main();
})().catch((err) => {
    console.log(err, 'Uncaught exception');
    process.exit(-1);
});
