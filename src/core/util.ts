import * as fs from 'fs';
import { Valid, ValidType } from '../type/valid';

export class Util {

    public static deleteFolderRecursive = function (path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    Util.deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    // 将单词的首字母转大写
    public static firstLetter2UpperCase(word) {
        if (!word) {
            return word;
        }
        return word.replace(word[0], word[0].toUpperCase());
    }

    // 将单词的首字母转小写
    public static firstLetter2LowerCase(word) {
        if (!word) {
            return word;
        }
        return word.replace(word[0], word[0].toLowerCase());
    }

    public static fixWord(word) {
        if (word.toUpperCase() === "PATTERN") {
            return "Pattern";
        }
    }

    /**
     * 根据检验参数实体生成对应的注解行
     * @param validParam 检验参数实体,可为一个数组
     * @param paramName 参数名, 用于生成对应的message
     * @param separator 多个参数实体信息之间的分隔符
     * @param atFirst 第一行是否使用分隔符
     */
    public static getAnnotationByValid(validParam: Valid | Valid[], paramName: string, separator: string, atFirst = false): string {
        if (!validParam) {
            return "";
        }
        const validArray: Valid[] = Array.isArray(validParam) ? validParam : Array.of(validParam)
        let annotationList = "";
        for (let index = 0; index < validArray.length; index++) {
            let valid = validArray[index]
            let annotation = "";
            switch (valid.type) {
                case ValidType.PATTERN:
                    annotation = `@${valid.type}(regexp="${valid.regexp.replace('\\', '\\\\')}",`;
                    if (!valid.message) valid.message = `参数${paramName}非法!`
                    break;
                case ValidType.MIN:
                    annotation = `@${valid.type}(value="${valid.value}",`;
                    if (!valid.message) valid.message = `参数${paramName}小于最小长度!`
                    break;
                case ValidType.MAX:
                    annotation = `@${valid.type}(value="${valid.value}",`;
                    if (!valid.message) valid.message = `参数${paramName}超过最大长度!`
                    break;
                case ValidType.NOT_NULL:
                    annotation = `@${valid.type}(`;
                    if (!valid.message) valid.message = `参数${paramName}不可为Null!`
                    break;
                case ValidType.NOT_EMPTY:
                    annotation = `@${valid.type}(`;
                    if (!valid.message) valid.message = `参数${paramName}不可为空!`
                    break;
                case ValidType.NOT_BLANK:
                    annotation = `@${valid.type}(`;
                    if (!valid.message) valid.message = `参数${paramName}不可为空字符串!`
                    break;
                case ValidType.LENGTH:
                    annotation = `@${valid.type}(${valid.min ? "min=" + valid.min + "," : ""}${valid.max ? "max=" + valid.max + "," : ""}`;
                    if (!valid.message) valid.message = `参数${paramName}长度超过限制!`
                    break;
                case ValidType.SIZE:
                    annotation = `@${valid.type}(${valid.min ? "min=" + valid.min + "," : ""}${valid.max ? "max=" + valid.max + "," : ""}`;
                    if (!valid.message) valid.message = `参数${paramName}大小超过限制!`
                    break;
                default:
                    annotation = `unsupport valid ${valid.type}`
                    break;
            }
            if (annotation) {
                annotation += `message="${valid.message}")`;
            }
            if (index == 0 && atFirst && separator) {
                annotationList += separator
            }
            if (index > 0 && separator) {
                annotationList += separator
            }
            annotationList += annotation
        }

        return annotationList + " ";
    }

}
