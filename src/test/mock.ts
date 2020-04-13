import { ApiType, Controller, Response, Request } from "../type/controller";
import { ValidType } from "../type/valid";

export const data: Controller = {
    name: "valid",
    desc: "C端移动端组织相关的接口",
    platform: "P",
    userType: "B",
    package: "com.etm.example",
    author: "乌龙茶",
    path: "/valid",
    apis: [
        {
            name: "validPathVariable",
            desc: "校验路径参数",
            path: "/path_variable/{name}",
            method: ApiType.GET,
            request: {
                pathVar: {
                    name: {
                        type: "String",
                        desc: "名称",
                        valid: {
                            type: ValidType.PATTERN,
                            regexp: "\\d{5}",
                            message: "名称格式不正确"
                        }
                    }
                }
            },
            response: {
                body: {
                    result: { type: "string", desc: "结果" },
                    message: { type: "string", desc: "附带详情" }
                }
            }
        },
        {
            name: "validQueryParam",
            desc: "校验查询参数",
            path: "/query_param",
            method: ApiType.GET,
            request: {
                queryParam: {
                    organizationId: {
                        type: "String",
                        desc: "组织ID",
                        valid: {
                            type: ValidType.PATTERN,
                            regexp: "\\w{5}",
                            message: "organizationId长度必须是5"
                        }
                    }
                }
            },
            response: {
                body: {
                    result: {
                        type: "String",
                        desc: "结果"
                    }
                }

            }
        },
        {
            name: "validRequestBody",
            desc: "校验请求体参数",
            path: "/request_body",
            method: ApiType.POST,
            request: {
                body: {
                    organizationId: {
                        type: "String",
                        desc: "组织ID",
                        valid: [
                            { type: ValidType.PATTERN, regexp: "\\w{5}", message: "organizationId长度必须是5" },
                            { type: ValidType.NOT_EMPTY },
                            { type: ValidType.MAX, value: 20 },
                            { type: ValidType.LENGTH, min: 3, max: 20 },
                            { type: ValidType.SIZE, min: 5, max: 10 },
                            { type: ValidType.NOT_BLANK }
                        ]
                    }
                }
            },
            response: {
                body: {
                    result: {
                        type: "String",
                        desc: "结果"
                    }
                }
            }
        }
    ]

};