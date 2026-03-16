export interface User {
    name: string;
    email: string;
    password: string;
    loggedIn: boolean;
}

export const users: User[] = [
    {
        name: 'Karoly',
        email: 'karoly@email.com',
        password: 'password',
        loggedIn: true
    }
];

export const currentUser: User = users[0];