export interface IService<Req, Res> {
    execute(request: Req): Res
}