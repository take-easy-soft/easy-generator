import { Render } from "../generator";
import { ClassInfo, Param, Response } from '../../type/controller';
import { Util } from "../util";


export class VORender implements Render {

    /**
     * 构建一个完整VO
     * @param info 类基础信息
     * @param data Request对象
     */
    render(info: ClassInfo, data: any): string {
        // 构建类信息
        return `
package ${info.package}.vo;

import lombok.Data;
import java.util.*;

/**
 * ${info.desc}请求响应实体
 *
 * @author ${info.author}
 * @date ${Date().toLocaleString()}
 */
@Data
public class ${Util.firstLetter2UpperCase(info.name)}VO {
${this.renderParamList(data as Response)}
}`.replace(/^\s/, "");
    }

    /**
     * 构建Field和内部类列表
     * @param response request对象
     */
    private renderParamList(response: Response): string {
        let paramContent: string = "";
        for (const paramName in response) {
            //TODO 数组需要额外处理,先跳过
            if (paramName == "isList") continue;
            const param = response[paramName] as Param
            //生成field信息
            paramContent += `
    /**
     * ${param.desc}
     */
    private ${Util.wrapList(param.sub ? Util.firstLetter2UpperCase(paramName) : param.type,param.isList)} ${paramName};\n`
            //复杂类型, 生成内部类
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