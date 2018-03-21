
1.Boilerplate（http://html5boilerplate.com/）

babel 
	npm install --save-dev babel-cli babel-preset-env

HTTP
安装一个能显示HTTP 请求状态码和所有重定向的浏览器插
件。这样在解决重定向问题或者不正确的状态码时会更加容易，它们经常被
忽视。对于Chrome 来说，Ayima 的Redirect Path 特别好用。在大多数浏览
器中， 都能在开发者工具的网络部分看到状态码。


路由和中间件的添加顺序至关重要

因此我推荐使用另外一个抽象程度较低的模板框架Handlebars。

GIT 
如果你不了解Git，建议你看一下Jon Loeliger 的Version Control with Git (O’Reilly，http://
shop.oreilly.com/product/9780596520137.do）。另外，Code School 也有很好的Git 入门课程
（https://try.github.io/）。

git clone https://github.com/EthanRBrown/web-development-with-node-and-express

Markdown 文档（http://daringfireball.net/projects/markdown/）。

 Web 开发中，质量可以分解为四个维度：
 	1.到达率 , 2.功能 3.可用性 4.审美

5.2 逻辑与展示

5.3 测试的类型  : 单元测试和集成测试

5.4 QA技术概览 
	1.页面测试 用 Mocha 进行页面测试。
	2.跨页测试 测试用的是 Zombie.js。
	3.逻辑测试 逻辑测试会对逻辑域进行单元和集成测试。它只会测试JavaScript，跟所有表示功能分开。
	4.去毛     是要找潜在的错误 会用 JSHint 做去毛。
	5.链接检查 用 LinkChecker 做链接检查。

5.5 运行你的服务器 
	nodemon（https://npmjs.org/package/nodemon）非常受欢迎，并且它还有一个 Grunt 插件（https://www.npmjs.org/package/grunt-nodemon）。

5.6 页面测试

	测试通常需要一个assert（或expect）函数。Node框架中有这个函数，但浏览器中没有,所以我们要用 Chai 断言库：
	测试驱动开发（TDD）更具可行性，你描述的是测试集和其中的测试。(Mocha 支持多种“界面”来控制测试的风格。默认界面是行为驱动开发（BDD），它让你以行为的方式思考。)



document.referrer

https://mochajs.org/
http://chaijs.com/
http://eslint.org/
用 LinkChecker（http://wummel.github.io/linkchecker/）。
QA test
	mocha -u tdd -R spec qa/tests-crosspage.js 2>/dev/null
	mocha -u tdd -R spec qa/tests-unit.js
	mocha --compilers js:babel-core/register -u tdd -R spec qa/tests-unit.js


Mocha http://blog.csdn.net/SimGenius/article/details/76152799
	mocha --compilers js:babel-core/register qa/tests-unit.js
首先要查看 Express 的 API 文档（http://expressjs.com/api.html）。
有时就不得不深入研究 Express 源码（https://github.com/visionmedia/express/tree/master）。

只有在某些最简单的情况下才会使用JavaScript 生成 HTML。

//修改handlebars 的扩展名
const handlebars = handler.create({ extname: '.hbs',defaultLayout:'main' });
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');
//公用模块
app.use(function(req, res, next){
if(!res.locals.partials) res.locals.partials = {};
res.locals.partials.weather = getWeatherData();
next();
});

form
	get => req.query
	post => body-parser
			req.xhr 和 req.accepts。
				放弃$.ajax 用法 使用 axios

formidbale 

cookie

npm install --save cookie-parser
app.use(require('cookie-parser')(credentials.cookieSecret));
res.cookie('monster', 'nom nom');
res.cookie('signed_monster', 'nom nom', { signed: true });
var monster = req.cookies.monster;
var signedMonster = req.signedCookies.monster;
res.clearCookie(KEY)
会话 
npm install --save express-session
req.session.name= 'xy
var colorScheme = req.session.colorScheme || 'dark';'
req.session.userName = null; // 这会将 'userName' 设为 null
							// 但不会移除它
delete req.session.colorScheme; // 这会移除 'colorScheme'