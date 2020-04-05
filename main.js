//模板
let controllerTemplate = './ControllerClass.java.ejs';

//加载
let express = require('express');
let app = express();
let fs = require('fs');

app.render(controllerTemplate, {}, function (err, str) {
	if (err) {
		console.error(err);
		return;
	}
	fs.writeFileSync("/Users/linqunxun/Downloads/Demo.java", str.trim());
});

