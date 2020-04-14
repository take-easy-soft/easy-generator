import { Render } from "../generator";
import { ClassInfo, Param, Request } from '../../type/controller';
import { Util } from "../util";

export class DTORender implements Render {

    /**
     * 构建一个完整DTO
     * @param info 类基础信息
     * @param data Request对象
     */
    render(info: ClassInfo, data: any): string {
        // 构建类信息
        return `
package ${info.package};

import lombok.Data;
import javax.validation.constraints.*;
import java.util.*;

/**
 * ${info.desc}请求参数实体
 *
 * @author ${info.author}
 * @date ${Date().toLocaleString()}
 */
@Data
public class ${Util.firstLetter2UpperCase(info.name)}DTO {
${this.renderParamList(data as Request)}
}`.replace(/^\s/, "");
    }

    /**
     * 构建Field和内部类列表
     * @param request request对象
     */
    private renderParamList(request: Request): string {
        let paramContent: string = "";
        for (const paramName in request) {
            //TODO 数组需要额外处理,先跳过
            if (paramName == "isList") continue;
            const param = request[paramName] as Param
            //生成field信息
            paramContent += `
    /**
     * ${param.desc}
     */${Util.getAnnotationByValid(param.valid, paramName, "\n    ", true)}
    private ${Util.wrapList(param.sub ? Util.firstLetter2UpperCase(paramName) : param.type,param.isList)} ${paramName};\n`
            if (param.sub) {
                const sub = param.sub
                paramContent += `
    public static class ${Util.firstLetter2UpperCase(paramName)}{
        ${this.renderParamList(sub)}
    } 
    `
            }
        }
        return paramContent;
    }

}