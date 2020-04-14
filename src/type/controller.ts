import { Valid } from "./valid";

/**
 * class基础信息
 */
export class ClassInfo {
    /** ClassName */
    name: string;
    /** 包名 */
    package: string
    /** Controller注释 */
    desc: string;
    /** 创建者 */
    author: string;
    /** 默认路径 */
}

export class ListAble {
    /** 是否为List, 只适用于根级属性 */
    isList?: boolean = false
}

export class Controller extends ClassInfo {
    path: string;
    /** api列表 */
    apis: Api[]
    /** 暂时无用 */
    platform?: string;
    /** 暂时无用 */
    userType?: string
}

/**
 * 请求实体
 */
export class Api {
    /**
     * 请求方法名称
     */
    name: string;
    /**
     * 请求方法注释
     */
    desc: string;
    /**
     * 请求路径
     */
    path: string;
    /**
     * 请求类型
     */
    method: ApiType;
    /** API 请求参数 */
    request?: {
        /**
         * 路径参数:/path/{param}, 会转为方法参数
         */
        pathVar?: Request;
        /**
         * query参数, 会创建一个Dto实体
         */
        queryParam?: Request;
        /**
         * body参数, 会创建一个Dto实体
         */
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
export class Request extends ListAble {
    [paramName: string]: Param | boolean
}

/**
 * 请求实体参数
 */
export class Param extends ListAble {
    /** Java类型 */
    type: Type;
    /** 子实体 */
    sub?: Request;
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
export class Response extends ListAble {
    [itemName: string]: ResponseItem | boolean
}


/** 响应实体项 */
export class ResponseItem extends ListAble{
    /** java类型 */
    type: Type;
    /** 子实体 */
    sub?: Response;
    /** 注释 */
    desc: string;
}

export enum Type {
    string = "String", Date = "Date", int = "Integer", long = "Long", boolean = "Boolean", number = "Integer",
    double = "Double", float = "Float", object = "Object"
}