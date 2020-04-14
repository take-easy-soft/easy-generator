import { Valid } from "./valid";

export interface Controller {
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
    /** 暂时无用 */
    platform?: string;
    /** 暂时无用 */
    userType?: string
}

/**
 * 请求
 */
export interface Api {
    name: string;
    desc: string;
    path: string;
    method: ApiType;
    /** API 请求参数 */
    request: {
        pathVar?: Request;
        queryParam?: Request;
        body?: Request;
    };
    /** API 响应实体 */
    response: { body: Response };
}

/**
 * API类型
 */
export enum ApiType {
    GET = "GET", POST = "POST", PUT = "PUT", DELETE = "DELETE"
}

/**
 * 请求实体
 */
export interface Request {
    [paramName: string]: Param
}

/**
 * 请求实体参数
 */
export interface Param {
    /** Java类型 */
    type: string;
    /** 参数注释 */
    desc: string;
    /** 
     * 参数验证,可空 
     * PathVariable当前只支持一个Valid
     */
    valid?: Valid | Valid[];
}

/**
 * 响应实体
 */
export interface Response {
    [itemName: string]: ResponseItem
}


/** 响应实体项 */
export interface ResponseItem {
    /** java类型 */
    type: string;
    /** 注释 */
    desc: string;
}