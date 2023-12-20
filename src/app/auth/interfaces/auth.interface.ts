interface ClientAuthentication {
    username: string,
    email: string,
    password: string
};

interface ClientRegister extends ClientAuthentication {
    nationality: string,
    name: string;
    msisdn: string
}

export { ClientAuthentication, ClientRegister }