import express = require('express');
import * as fs from 'fs';
import { Controller, ClassInfo } from '../type/controller';
import { Util as util, Util } from "./util";
import { DTORender } from './template/dto';
import { VORender } from './template/vo';

//模板
const controllerTemplate = __dirname + '/../../res/views/ControllerClass.java.ejs';
const dtoTemplate = __dirname + '/../../res/views/Dto.java.ejs';
const voTemplate = __dirname + '/../../res/views/Vo.java.ejs';

export class Generator {
    private path: { controller: string; dto: string; vo: string; };
    private app = express();
    constructor(workingPath: string) {
        this.initPath(workingPath)
    }

    /**
     * 开始进行生成
     * @param data Controller数据
     */
    public genrate(data: Controller) {
        this.generateController(data)
        this.generateDto(data)
        this.generateVo(data)
        console.log("generate end.")
    }

    private firstLetter2UpperCase = function (word: string) {
        if (!word) {
            return word;
        }
        return word.replace(word[0], word[0].toUpperCase());
    }


    private generateController(data: Controller) {
        this.render(controllerTemplate, { data: data }, `${this.path.controller}/${this.firstLetter2UpperCase(data.name)}Controller.java`)

    }

    private generateDto(data: Controller) {
        for (const api of data.apis) {
            if (api.request) {
                for (const variable in api.request) {
                    if (variable == "body" || variable == "queryParam") {
                        fs.writeFileSync(`${this.path.dto}/${this.firstLetter2UpperCase(api.name)}DTO.java`, new DTORender().render({
                            name: api.name,
                            desc: api.desc,
                            author: data.author,
                            package: data.package
                        }, api.request[variable]))
                    }
                }
            }
        }
    }

    private generateVo(data: Controller) {
        for (const api of data.apis) {
            if (api.request) {
                for (const variable in api.response) {
                    if (variable == "body") {
                        fs.writeFileSync(`${this.path.vo}/${this.firstLetter2UpperCase(api.name)}VO.java`, new VORender().render({
                            name: api.name,
                            desc: api.desc,
                            author: data.author,
                            package: data.package
                        }, api.response[variable]))
                    }
                }
            }
        }
    }

    private render(template: string, data: any, generatePath: string) {

        if (!generatePath) throw new Error("路径不可为空!");

        // return new Promise(resolve => {
        this.app.render(template, { ...data, util }, async (err, str) => {
            if (err) {
                console.error(err);
                return;
            }
            fs.writeFileSync(generatePath, str.trim());
        });
        // })
    }

    /**
     * 重置输出文件夹
     */
    private initPath(currentPath: string) {
        this.path = {
            controller: currentPath + "/generate/controller",
            dto: currentPath + "/generate/dto", vo: currentPath + "/generate/vo"
        }
        const output = currentPath + "/generate"
        Util.deleteFolderRecursive(output)
        fs.mkdirSync(output)
        fs.mkdirSync(this.path.dto)
        fs.mkdirSync(this.path.controller)
        fs.mkdirSync(this.path.vo)
    }

}

export interface Render {
    render(classInfo: ClassInfo, data: any): string;
}