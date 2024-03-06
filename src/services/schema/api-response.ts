export default interface APIResponse<T> {
    code: number,
    data?: T,
    message?: string | string[]
}