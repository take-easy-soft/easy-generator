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

export class Controller extends ClassInfo {
    /**
     * 定义类型, 用于请求或响应复用
     */
    definitions: Bean[];
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
        pathVar?: Bean;
        /**
         * query参数, 会创建一个Dto实体
         */
        queryParam?: Bean;
        /**
         * body参数, 会创建一个Dto实体
         */
        body?: Bean;
    };
    /** API 响应实体 */
    response: { body: Bean };
}

/**
 * API类型
 */
export enum ApiType {
    GET = "GET", POST = "POST", PUT = "PUT", DELETE = "DELETE"
}

/**
 * 请求或响应实体
 */
export class Bean {
    /**
     * 是否支持显示为List
     */
    isList?: boolean;
    [paramName: string]: Field | boolean
}

/**
 * 请求实体参数
 */
export class Field {
    /**
     * 是否支持显示为List
     */
    isList?: boolean
    /** Java类型 */
    type: Type;
    /** 子实体 */
    sub?: Bean;
    /** 参数注释 */
    desc: string;
    /** 
     * 参数验证,可空, 只对Dto生效
     */
    valid?: Valid | Valid[];
}

export enum Type {
    string = "String", Date = "Date", int = "Integer", long = "Long", boolean = "Boolean", number = "Integer",
    double = "Double", float = "Float", object = "Object"
}