
interface RequestService {
    apiUrl: string,
    data: any
}

interface ResponseService {
    data: any,
    error: any
}

interface Literals {
    access: string,
    accept: string,
    error_email: string,
    error_password: string,
    error_form: string,
    error_name: string,
    init_session_ok: string,
    init_sesion_ko: string
}

export { RequestService, ResponseService, Literals }
