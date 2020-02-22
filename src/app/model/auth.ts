export class LoginResponse {
    status: string;
    message: string;
    token: string;
    user: string;
}

export class User {
    name: string;
    email: string;
    password: string;
}
