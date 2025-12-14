export type SignupErrors = {
    first_name?: string;
    last_name?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
};

export type ValidateProps = {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    errors: SignupErrors;
};