export type SignupErrors = {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    phone?: string;
    shippingAddress?: string;
};

export type ValidateProps = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    shippingAddress: string;
    errors: SignupErrors;
};