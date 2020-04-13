import { Valid } from "./valid";

export class Controller {
    /** ControlerName */
    name: string;
    /** 包名 */
    package: string
    /** Controller注释 */
    desc: string;
    /** 创建者 */
    author: string;
    /** 默认路径 */
    path: string;
    /** api列表 */
    apis: Api[]
    platform?: string;
    userType?: string
}

/**
 * 请求
 */
export class Api {
    name: string;
    desc: string;
    path: string;
    method: ApiType;
    /** API 请求参数 */
    request: {
        pathVar?: Param[];
        queryParam?: Param[];
        body?: Param[];
    };
    /** API 响应实体 */
    response: {
        body: ResponseItem[]
    };
}

/**
 * API类型
 */
export enum ApiType {
    GET = "GET", POST = "POST", PUT = "PUT", DELETE = "DELETE"
}

/**
 * 请求参数
 */
export class Param {
    name: string;
    type: string;
    desc: string;
    valid: Valid | Valid[];
}


/** 响应实体项 */
export class ResponseItem {
    /** field名称 */
    name: string;
    /** java类型 */
    type: string;
    /** 注释 */
    desc: string;
}