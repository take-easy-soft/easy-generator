#!/usr/bin/env node
import { Generator } from './core/generator';
import * as fs from 'fs';
import { Controller } from './type/controller';

const pjson = require('../package.json');

const version = pjson.version;
const args = process.argv.slice(2);
const input = args[0];
if (input && input.toLowerCase() == "new") {
    fs.copyFileSync(__dirname + "/../res/template.json", process.cwd() + "/template.json")
    console.log("create template success!")
} else if (input) {

    if (!fs.existsSync(input)) {
        console.log("Valid file path.")
    }
    const inputData: string = fs.readFileSync(input, "UTF8")
    const generator = new Generator(process.cwd())
    generator.genrate(JSON.parse(inputData) as Controller)

} else {
    console.log(`Your etmgen version is ${version}`)
    console.log('')
    console.log('Usage: etmgen <path>|new')
    console.log('')
    console.log('When You type etmgen new, that will create template in current directory.')
}

