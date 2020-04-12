import * as fs from 'fs';
import express = require('express');
const app = express();
const outputPath = __dirname + "/../out"
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath)
}

export class Generator {

    public static render(template: string, data: any, generatePath: string) {

        if (!generatePath) generatePath = outputPath + "/default.java"

        app.render(template, data, function (err, str) {
            if (err) {
                console.error(err);
                return;
            }
            fs.writeFileSync(generatePath, str.trim());
        });
    }

}