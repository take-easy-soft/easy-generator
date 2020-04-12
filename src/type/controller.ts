export class Controller {
    name: string;
    desc: string;
    platform: string;
    userType: string
    package: string
    author: string;
    path: string;
    apis: Api[]
}

export class Api {
    name: string;
    desc: string;
    path: string;
    method: ApiType;
    request: Request;
    response: Response;
}

export enum ApiType {
    GET="GET", POST="POST", PUT="PUT", DELETE="DELETE"
}

export class Request {
    pathVar?: Param[];
    queryParam?: Param[];
    body?: Param[];
}

export class Param {
    name: string;
    type: string;
    desc: string;
    valid: Valid;
}

export class Response {
    body: ResponseItem[]
}

export class ResponseItem {
    /**field名称 */
    name: string;
    /**java类型 */
    type: string;
    /**注释 */
    desc: string;
}

export class Valid{
    type:string;
    regexp:string;
    message:string;
}