export const firstCallData = {
    count: 25,
    results: [
        {
            name: 'Aa',
            height: '1',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Bb',
            height: '2',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Cc',
            height: '3',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Dd',
            height: '4',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Ee',
            height: '5',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Ff',
            height: '6',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Gg',
            height: '7',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Hh',
            height: '8',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Ii',
            height: '9',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Jj',
            height: '10',
            mass: '77',
            gender: 'male'
        }
    ]
};

export const secondCallData = {
    count: 25,
    results: [
        {
            name: 'Aaa',
            height: 'unknown',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Bbb',
            height: 'unknown',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Ccc',
            height: 'unknown',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Ddd',
            height: '107',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Eee',
            height: '106',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Fff',
            height: '105',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Ggg',
            height: '104',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Hhh',
            height: '103',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Iii',
            height: '102',
            mass: '77',
            gender: 'male'
        },
        {
            name: 'Jjj',
            height: '101',
            mass: '77',
            gender: 'male'
        }
    ]
};

export const thirdCallData = {
    count: 25,
    results: [
        {
            name: 'Aaaa',
            height: '110',
            mass: '77',
            gender: 'female'
        },
        {
            name: 'Bbbb',
            height: '109',
            mass: '77',
            gender: 'female'
        },
        {
            name: 'Cccc',
            height: '108',
            mass: '77',
            gender: 'female'
        },
        {
            name: 'Dddd',
            height: '107',
            mass: '77',
            gender: 'female'
        },
        {
            name: 'Eeee',
            height: '106',
            mass: '77',
            gender: 'female'
        }
    ]
};

export const expectedData = [
    {
        gender: 'male',
        characters: [
            {
                name: 'Aa',
                height: 1
            },
            {
                name: 'Bb',
                height: 2
            },
            {
                name: 'Cc',
                height: 3
            },
            {
                name: 'Dd',
                height: 4
            },
            {
                name: 'Ee',
                height: 5
            },
            {
                name: 'Ff',
                height: 6
            },
            {
                name: 'Gg',
                height: 7
            },
            {
                name: 'Hh',
                height: 8
            },
            {
                name: 'Ii',
                height: 9
            },
            {
                name: 'Jj',
                height: 10
            },
            {
                name: 'Jjj',
                height: 101
            },
            {
                name: 'Iii',
                height: 102
            },
            {
                name: 'Hhh',
                height: 103
            },
            {
                name: 'Ggg',
                height: 104
            },
            {
                name: 'Fff',
                height: 105
            },
            {
                name: 'Eee',
                height: 106
            },
            {
                name: 'Ddd',
                height: 107
            },
            {
                name: 'Aaa',
                height: 'unknown'
            },
            {
                name: 'Bbb',
                height: 'unknown'
            },
            {
                name: 'Ccc',
                height: 'unknown'
            }
        ]
    },
    {
        gender: 'female',
        characters: [
            {
                name: 'Eeee',
                height: 106
            },
            {
                name: 'Dddd',
                height: 107
            },
            {
                name: 'Cccc',
                height: 108
            },
            {
                name: 'Bbbb',
                height: 109
            },
            {
                name: 'Aaaa',
                height: 110
            }
        ]
    }
];
