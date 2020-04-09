//模板
let controllerTemplate = './ControllerClass.java.ejs';

//加载
let express = require('express');
let app = express();
let fs = require('fs');


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

app.render(controllerTemplate, {data:data}, function (err, str) {
	if (err) {
		console.error(err);
		return;
	}
	fs.writeFileSync("/Users/linqunxun/Downloads/Demo.java", str.trim());
});

