import * as fs from 'fs';
import express = require('express');

import { Controller } from '../type/controller';

//模板
const controllerTemplate = './ControllerClass.java.ejs';
const dtoTemplate = './Dto.java.ejs';
const voTemplate = './Vo.java.ejs';

export class Generator {

    private outputPath: string;
    private app = express();
    constructor(private workspacePath: string) {
        this.outputPath = this.workspacePath + "/../out"
        if (!fs.existsSync(this.outputPath)) {
            fs.mkdirSync(this.outputPath)
        }
    }

    public genrate(data: Controller) {
        this.generateController(data)
        this.generateDto(data)
        this.generateVo(data)
    }

    private firstLetter2UpperCase = function (word: string) {
        if (!word) {
            return word;
        }
        return word.replace(word[0], word[0].toUpperCase());
    }


    private generateController(data: Controller) {
        this.render(controllerTemplate, { data: data }, `${this.outputPath}/${this.firstLetter2UpperCase(data.name)}Controller.java`)

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
                        }, `${this.outputPath}/${this.firstLetter2UpperCase(api.name)}Dto.java`)
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
                        }, `${this.outputPath}/${this.firstLetter2UpperCase(api.name)}Vo.java`)
                    }
                }
            }
        }
    }

    private render(template: string, data: any, generatePath: string) {

        if (!generatePath) generatePath = this.outputPath + "/default.java"

        // return new Promise(resolve => {
        this.app.render(template, data, async (err, str) => {
            if (err) {
                console.error(err);
                return;
            }
            fs.writeFileSync(generatePath, str.trim());
        });
        // })
    }

}