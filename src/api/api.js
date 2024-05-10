// Placeholder data json instead of making API calls

export const portfolio = [
    {
        id: 1,
        name: 'The Winter Collection',
        value: 714501,
    },
    {
        id: 2,
        name: 'The 1957 Collection',
        value: 360072,
    },
    {
        id: 3,
        name: 'The Japan Collection',
        value: 175909,
    },
    {
        id: 4,
        name: 'The California Collection',
        value: 162643,
    },
    {
        id: 5,
        name: 'The 1997 Collection',
        value: 75123,
    },
    {
        id: 6,
        name: 'The Atlanta Collection',
        value: 76774,
    },
    {
        id: 7,
        name: 'The Autumn Collection',
        value: 48401,
    },
    {
        id: 8,
        name: 'The asdf Collection',
        value: 162643,
    },
    {
        id: 9,
        name: 'The asdf Collection',
        value: 75123,
    },
    {
        id: 10,
        name: 'The asdf Collection',
        value: 76774,
    },
];

// In a real DB, pieces could probabaly be referenced by their IDs,
// and the other info could be extracted from the pieces DB,
// but I'm declaring them explicitly here since we have no pieces DB to reference

export const upcomingReports = [
    {
        id: 1,
        date: '2023-12-31',
        pieces: [
            {
                title: 'All',
                artist: 'All',
                collection: 'The Winter Collection',
            },
            {
                title: '1957-J No. 2',
                artist: 'Clyfford Still',
                collection: 'The 1957 Collection',
            },
            {
                title: 'All',
                artist: 'All',
                collection: 'The Japan Collection',
            },
            {
                title: 'Deep Blue Sea',
                artist: 'Anna Althea Hills',
                collection: 'The California Collection',
            },
        ],
    },
    {
        id: 2,
        date: '2024-03-15',
        pieces: [
            {
                title: 'All',
                artist: 'All',
                collection: 'The Monet Collection',
            },
        ],
    },
    {
        id: 3,
        date: '2024-06-30',
        pieces: [
            {
                title: 'RE-ECHO',
                artist: 'Lee Krasner',
                collection: 'The 1957 Collection',
            },
            {
                title: 'Into the Mystic',
                artist: 'Camille Rose Garcia',
                collection: 'The California Collection',
            },
        ],
    },
];

// Here is where we would define endpoints to perform the following:
// get portfolio
// get upcoming reports

export const loggedOut = [
    {
        user: {
            username: '',
        },
    },
];

export const loggedIn = [
    {
        user: {
            username: 'testUser',
        },
    },
];
