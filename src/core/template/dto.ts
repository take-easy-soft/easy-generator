import { Render } from "../generator";
import { ClassInfo, Param, Request } from '../../type/controller';
import { Util } from "../util";

export class DtoRender implements Render {

    render(info: ClassInfo, data: any): string {
        return `
package ${info.package};

import lombok.Data;
import javax.validation.constraints.*;

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

    private renderParamList(request: Request, level?: number): string {
        if (!level) level = 1
        let paramContent: string = "";
        for (const paramName in request) {
            //TODO 数组需要额外处理,先跳过
            if (paramName == "isArray") continue;
            const param = request[paramName] as Param
            //生成field信息
            paramContent += `
    /**
     * ${param.desc}
     */${Util.getAnnotationByValid(param.valid, paramName, "\n    ", true)}
    private ${param.sub ? Util.firstLetter2UpperCase(paramName) : param.type} ${paramName};\n`
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