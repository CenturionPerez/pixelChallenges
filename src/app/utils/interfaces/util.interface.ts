
interface RequestService {
    apiUrl: string,
    data: any
}

interface ResponseService {
    data: any,
    error: any
}

export { RequestService, ResponseService }
