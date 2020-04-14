//模板
var controllerTemplate = './ControllerTemplate.java.ejs'; 
var entityTemplate = './EntityTemplate.java.ejs'; 
var enumTemplate = './EnumTemplate.java.ejs';

//加载
var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

//指定路径
var filePath = process.argv.splice(2) + "";

//没有指定 默认为 ./data.json文件
if(filePath == ""){
	filePath = "./data.json"
}
var datas  =JSON.parse(fs.readFileSync(filePath)); //读取数据

//包名
var packageName = datas.package
var writeStr = "./" + packageName.replace(new RegExp("\\.","g"),'/') +"/"; // 根据package得到文件夹路径

//作者
var author = datas.author
//注释
var description = datas.description
//当前时间
var day = new Date();
day.setTime(day.getTime());
var now = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();

var controllerDatas = [];
console.log(datas.functions)
console.log(datas.functions.length)

for(var l = 0;l < datas.functions.length ; l++){
	var data = datas.functions[l];
	console.log(data)
/**
	创建枚举
*/
//将column的枚举放到数组里面
var enums  =new Array();
var inColumnsEnumPackages =new Array();
var outColumnsEnumPackages =new Array();
for(var i = 0 ;i < data.inColumns.length ;i++){
	if(data.inColumns[i].children){
		for(var j = 0 ;j < data.inColumns[i].children.length ;j++){
			if( data.inColumns[i].children[j].type == "enum" ){
			var currentEnum =data.inColumns[i].children[j].enums;
			currentEnum["author"] = author;
			currentEnum["date"] = now;
			currentEnum["package"]= packageName +".enumeration";
			currentEnum["description"] = data.inColumns[i].children[j].doc +"枚举";
			enums.push(currentEnum);
			inColumnsEnumPackages.push( packageName + ".enumeration" + "." +currentEnum.name);
			}
		}
	}
	if( data.inColumns[i].type == "enum" ){
		var currentEnum = data.inColumns[i].enums;
		currentEnum["author"] = author;
		currentEnum["date"] = now;
		currentEnum["package"]= packageName +".enumeration";
		currentEnum["description"] = data.inColumns[i].doc +"枚举";
		enums.push(currentEnum);
		inColumnsEnumPackages.push( packageName + ".enumeration" + "." +currentEnum.name);
	}
}

for(var i = 0 ;i < data.outColumns.length ;i++){
	if(data.outColumns[i].children){
		for(var j = 0 ;j < data.outColumns[i].children.length ;j++){
			if( data.outColumns[i].children[j].type == "enum" ){
			var currentEnum =data.outColumns[i].children[j].enums;
			currentEnum["author"] = author;
			currentEnum["date"] = now;
			currentEnum["package"]= packageName+".enumeration";
			currentEnum["description"] = data.outColumns[i].children[j].doc +"枚举";
			enums.push(currentEnum);
			outColumnsEnumPackages.push( packageName + ".enumeration" + "." +currentEnum.name);
			}
		}
	}
	if( data.outColumns[i].type == "enum" ){
		var currentEnum = data.outColumns[i].enums;
		currentEnum["author"] = author;
		currentEnum["date"] = now;
		currentEnum["package"]= packageName +".enumeration";
		currentEnum["description"] = data.inColumns[i].doc +"枚举";
		enums.push(currentEnum);
		outColumnsEnumPackages.push( packageName + ".enumeration" + "." +currentEnum.name);
	}
}
//去重
 for(let i = enums.length - 1; i > 0; i--) {
    for(let j = i - 1; j > -1 ; j--) {
        if(enums[i].name === enums[j].name && i != j) {
            enums.splice(j, 1)
        }
     }
}
//创建目录
mkdirs(writeStr + "enumeration",() => {
	//保存
	for(let i = 0 ;i < enums.length;i++){
		var enumParam = enums[i];
		//导出文件
		app.render(enumTemplate, enumParam, function (err, str) {
	
			if (err) {
				console.error(err);
				return;
			}
			fs.writeFileSync(writeStr + "enumeration/" + enumParam.name +'.java', str);
		});
	}
		console.log("创建枚举成功");

});



	
/**
	创建DTO
**/

// 入参
var inColumns = data.inColumns;
//DTO类名
var inEntityName  = data.methodName.charAt(0).toUpperCase() + data.methodName.slice(1)+ "DTO"
//DTO包名
var inPackage = packageName + ".pojo.dto";
//设置Dto的ejs参数
var inParam = {
	"package":inPackage,
	"name":inEntityName,
	"columns":inColumns,
	"author":author,
	"description":description + "入参",
	"date":now,
	"enumPackages":inColumnsEnumPackages,
	"type":"in"

}

mkdirs(writeStr + "pojo/dto",() => {

	//创建目录成功后
	
	//遍历数组导出文件
	//导出文件
	app.render(entityTemplate, inParam, function (err, str) {
		if (err) {
			console.error(err);
			return;
		}
		fs.writeFileSync(writeStr + "pojo/dto/" + inParam.name +'.java', str);
	});
		console.log("创建dto成功");

});
/**
	创建VO
**/

// 出参
var outColumns = data.outColumns;
//VO类名
var outEntityName  = data.methodName.charAt(0).toUpperCase() + data.methodName.slice(1) + "VO"
//VO包名
var outPackage = packageName + ".pojo.vo";
//设置Dto的ejs参数
var outParam = {
	"package":outPackage,
	"name":outEntityName,
	"columns":outColumns,
	"author":author,
	"description":description + "出参",
	"date":now,
	"enumPackages":outColumnsEnumPackages,
	"type":"out"
}
mkdirs(writeStr + "pojo/vo",() => {
	//创建目录成功后
	
	//遍历数组导出文件
	//导出文件
	app.render(entityTemplate, outParam, function (err, str) {
		if (err) {
			console.error(err);
			return;
		}
		fs.writeFileSync(writeStr + "pojo/vo/" + outParam.name +'.java', str);
	});
	console.log("创建vo成功");

});
var controllerData = {
	"outEntityImport" : outPackage + "."+ outEntityName,
	"inEntityImport" : inPackage + "." + inEntityName,
	"method": data.methodType,
	"url" : data.url,
	"outEntityName" : outEntityName,
	"methodName": data.methodName,
	"inEntityName" :  inEntityName
}
controllerDatas.push(controllerData);
}
console.log(controllerDatas)
/**
	创建Controller
*/
//controller的Mapping
var controllerMapping = datas.controllerMapping;
//VO包名
var controllerPackage = packageName + ".controller";
//类名
var controllerName = datas.controllerName;
//参数
var controllerParam = {
	"package" : controllerPackage,
	"description" : datas.description,
	"author" : datas.author,
	"date" : now,
	"mapping" :controllerMapping,
	"name" :controllerName,
	"functions":controllerDatas

}
mkdirs(writeStr + "controller",() => {

	//创建目录成功后
	
	//遍历数组导出文件
	//导出文件
	app.render(controllerTemplate, controllerParam, function (err, str) {
		if (err) {
			console.error(err);
			return;
		}
		fs.writeFileSync(writeStr + "controller/" + controllerName +'.java', str);
	});
		console.log("创建controller成功");


});

/**
	下面是创建文件夹的方法
**/

// 递归创建目录 异步方法  
function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            // console.log(path.dirname(dirname));  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
                console.log('在' + path.dirname(dirname) + '目录创建好' + dirname  +'目录');
            });  
        }  
    });  
}  
// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
      return true;
    } else {
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
  }
 



