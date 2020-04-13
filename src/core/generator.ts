import express = require('express');
import * as fs from 'fs';
import { Controller } from '../type/controller';
import { Util as util, Util } from "./util";

//模板
const controllerTemplate = './ControllerClass.java.ejs';
const dtoTemplate = './Dto.java.ejs';
const voTemplate = './Vo.java.ejs';

export class Generator {
    private path: { controller: string; dto: string; vo: string; };
    private app = express();
    constructor(currentPath: string) {
        this.initPath(currentPath)
    }

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
                    if (variable == "body") {
                        this.render(dtoTemplate, {
                            paramList: api.request[variable],
                            info: {
                                name: api.name,
                                desc: api.desc,
                                author: data.author,
                                package: data.package
                            }
                        }, `${this.path.dto}/${this.firstLetter2UpperCase(api.name)}Dto.java`)
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
                        this.render(voTemplate, {
                            paramList: api.response[variable],
                            info: {
                                name: api.name,
                                desc: api.desc,
                                author: data.author,
                                package: data.package
                            }
                        }, `${this.path.vo}/${this.firstLetter2UpperCase(api.name)}Vo.java`)
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
            controller: currentPath + "/../out/controller",
            dto: currentPath + "/../out/dto", vo: currentPath + "/../out/vo"
        }
        const output = currentPath + "/../out"
        Util.deleteFolderRecursive(output)
        fs.mkdirSync(output)
        fs.mkdirSync(this.path.dto)
        fs.mkdirSync(this.path.controller)
        fs.mkdirSync(this.path.vo)
    }

}
