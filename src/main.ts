import * as fs from 'fs';
import { Generator } from './core/generator';
import { data } from "./test/mock";
import { Controller } from './type/controller';

//模板
let controllerTemplate = './ControllerClass.java.ejs';
let dtoTemplate = './Dto.java.ejs';
let voTemplate = './Vo.java.ejs';

//加载

const outputPath = __dirname + "/../out"
if (!fs.existsSync(outputPath)) {
	fs.mkdirSync(outputPath)
}

const firstLetter2UpperCase = function (word) {
	if (!word) {
		return word;
	}
	return word.replace(word[0], word[0].toUpperCase());
}


function generateController(testController: Controller) {
	Generator.render(controllerTemplate, { data: testController }, `${outputPath}/${firstLetter2UpperCase(data.name)}Controller.java`)

}

function generateDto(data: Controller) {
	for (const api of data.apis) {
		if (api.request) {
			for (const variable in api.request) {
				if (variable == "body") {
					Generator.render(dtoTemplate, {
						paramList: api.request[variable],
						info: {
							name: api.name,
							desc: api.desc,
							author: data.author,
							package: data.package
						}
					}, `${outputPath}/${firstLetter2UpperCase(api.name)}Dto.java`)
				}
			}
		}
	}
}

function generateVo(data: Controller) {
	for (const api of data.apis) {
		if (api.request) {
			for (const variable in api.response) {
				if (variable == "body") {
					Generator.render(voTemplate, {
						paramList: api.response[variable],
						info: {
							name: api.name,
							desc: api.desc,
							author: data.author,
							package: data.package
						}
					}, `${outputPath}/${firstLetter2UpperCase(api.name)}Vo.java`)
				}
			}
		}
	}
}

generateController(data)
generateDto(data)
generateVo(data)