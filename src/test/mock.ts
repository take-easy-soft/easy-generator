import { ApiType, Controller, Type } from "../type/controller";
import { ValidType } from "../type/valid";

export default {
    name:"sdf",
    desc:"sdf",
    package:"sdocmsdf",
    platform: "P",
    author: "乌龙茶",
    path: "/valid",
    apis: [
        {
            name: "getUsersdfsd",
            desc: "校验路径参数",
            path: "/path_variable/{name}",
            method: ApiType.GET,
            request: {
                pathVar: {
                    organizationId: {
                        type: Type.int,
                        desc: "名称",
                        valid: [{
                            type: ValidType.PATTERN,
                            regexp: "\\d{5}",
                            message: "名称格式不正确"
                        },{ type: ValidType.NOT_EMPTY }]
                    }
                }, queryParam: {
                    name: {
                        type: Type.string,
                        desc: "姓名",
                        valid: {
                            type: ValidType.NOT_EMPTY
                        }
                    },
                    age: {
                        type: Type.int,
                        desc: "年龄"
                    }
                }
            },
            response: {
                body: {
                    result: { type: Type.string, desc: "结果" },
                    message: { type: Type.string, desc: "附带详情" }
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
                        type: Type.string,
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
                        type: Type.string,
                        desc: "结果"
                    }
                }
            }
        }
    ]

} as Controller;
