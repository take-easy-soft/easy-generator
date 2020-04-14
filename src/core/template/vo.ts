import { Render } from "../generator";
import { ClassInfo, Field, Bean } from '../../type/controller';
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
${this.renderParamList(data as Bean)}
}`.replace(/^\s/, "");
    }

    /**
     * 构建Field和内部类列表
     * @param bean Java实体对象
     */
    private renderParamList(bean: Bean): string {
        let paramContent: string = "";
        for (const fieldName in bean) {
            //TODO 数组需要额外处理,先跳过
            if (fieldName == "isList") continue;
            const field = bean[fieldName] as Field
            //生成field信息
            paramContent += `
    /**
     * ${field.desc}
     */
    private ${Util.wrapList(field.sub ? Util.firstLetter2UpperCase(fieldName) : field.type,field.isList)} ${fieldName};\n`
            //复杂类型, 生成内部类
            if (field.sub) {
                const sub = field.sub
                paramContent += `
    @Data
    public static class ${Util.firstLetter2UpperCase(fieldName)}{
        ${this.renderParamList(sub)}
    } 
    `
            }
        }
        return paramContent;
    }

}