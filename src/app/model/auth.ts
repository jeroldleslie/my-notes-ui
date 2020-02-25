export class LoginResponse {
    status: string;
    message: string;
    token: string;
    user: string;
    user_id: BigInteger;
}

export class User {
    name: string;
    email: string;
    password: string;
}
