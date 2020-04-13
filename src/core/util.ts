import * as fs from 'fs';

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

    public static getAnnotationByValid(valid) {
        // TODO 需要增加其他的
        if (!valid) {
            return "";
        }
        let type = valid.type.toUpperCase();
        let annotation = "";
        switch (type) {
            case "PATTERN": // pattern
                annotation = `@Pattern(regexp="${valid.regexp.replace('\\', '\\\\')}",`;
                break;
            case "NOTNULL": // not null
                annotation = "@NotNull(";
                break;
            case "NOTBLANK": // not blank
                annotation = "@NotBlank(";
                break;
        }
        if (annotation) {
            annotation += `message="${valid.message}") `;
        }
        return annotation;
    }

}