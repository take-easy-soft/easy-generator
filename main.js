//模板
let controllerTemplate = './ControllerClass.java.ejs';
let dtoTemplate = './Dto.java.ejs';
let voTemplate = './Vo.java.ejs';

//加载
let express = require('express');
let app = express();
let fs = require('fs');

const outputPath = __dirname + "/out"
if (!fs.existsSync(outputPath)) {
	fs.mkdirSync(outputPath)
}

const firstLetter2UpperCase = function (word) {
	if (!word) {
		return word;
	}
	return word.replace(word[0], word[0].toUpperCase());
}

let data = {
	"name": "valid",
	"desc": "C端移动端组织相关的接口",
	"platform": "P",
	"userType": "B",
	"package": "com.etm.example",
	"author": "乌龙茶",
	"path": "/valid",
	"apis": [
		{
			"name": "validPathVariable",
			"desc": "校验路径参数",
			"path": "/path_variable/{name}",
			"method": "GET",
			"request": {
				"pathVar": [
					{
						"name": "name",
						"type": "String",
						"desc": "名称",
						"valid": {
							"type": "Pattern",
							"regexp": "\\d{5}",
							"message": "名称格式不正确"
						}
					}
				]
			},
			"response": {
				"body": [
					{
						"name": "result",
						"type": "String",
						"desc": "结果"
					}
				]
			}
		},
		{
			"name": "validQueryParam",
			"desc": "校验查询参数",
			"path": "/query_param",
			"method": "GET",
			"request": {
				"queryParam": [
					{
						"name": "organizationId",
						"type": "String",
						"desc": "组织ID",
						"valid": {
							"type": "pattern",
							"pattern": "\\w{5}",
							"message": "organizationId长度必须是5"
						}
					}
				]
			},
			"response": {
				"body": [
					{
						"name": "result",
						"type": "String",
						"desc": "结果"
					}
				]
			}
		},
		{
			"name": "validRequestBody",
			"desc": "校验请求体参数",
			"path": "/request_body",
			"method": "POST",
			"request": {
				"body": [
					{
						"name": "organizationId",
						"type": "String",
						"desc": "组织ID",
						"valid": {
							"type": "pattern",
							"pattern": "\\w{5}",
							"message": "organizationId长度必须是5"
						}
					}
				]
			},
			"response": {
				"body": [
					{
						"name": "result",
						"type": "String",
						"desc": "结果"
					}
				]
			}
		}
	]

};

function render(template, data, generatePath) {

	if (!generatePath) generatePath = outputPath + "/default.java"

	app.render(template, data, function (err, str) {
		if (err) {
			console.error(err);
			return;
		}
		fs.writeFileSync(generatePath, str.trim());
	});
}


function generateController(data) {
	render(controllerTemplate, { data: data }, `${outputPath}/${firstLetter2UpperCase(data.name)}Controller.java`)

}

function generateDto(data) {
	for (const api of data.apis) {
		if (api.request) {
			for (const variable in api.request) {
				if (variable == "body") {
					render(dtoTemplate, {
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

function generateVo(data) {
	for (const api of data.apis) {
		if (api.request) {
			for (const variable in api.response) {
				if (variable == "body") {
					render(voTemplate, {
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
console.log(__dirname)