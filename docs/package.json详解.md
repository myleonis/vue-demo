# vue-demo

> this is my practice

``` bash
{
"name": "{{ name }}",// 项目名称 
"version": "1.0.0",// 版本
"description": "{{ description }}",// 描述
"author": "{{ author }}",// 作者
"private": true,//是否私人项目
"scripts": {
"dev": "node build/dev-server.js",// npm run dev 的 dev，使用node执行 build/dev-server.js
"start": "node build/dev-server.js",// npm run start 跑的是同样的命令 
"build": "node build/build.js"{{#unit}},// npm run build 跑的是 node build/build.js
// 以下脚本为单元测试用到的脚本
"unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run"{{/unit}}{{#e2e}},
"e2e": "node test/e2e/runner.js"{{/e2e}}{{#if_or unit e2e}},
"test": "{{#unit}}npm run unit{{/unit}}{{#unit}}{{#e2e}} && {{/e2e}}{{/unit}}{{#e2e}}npm run e2e{{/e2e}}"{{/if_or}}{{#lint}},
"lint": "eslint --ext .js,.vue src{{#unit}} test/unit/specs{{/unit}}{{#e2e}} test/e2e/specs{{/e2e}}"{{/lint}}
},
// dependencies 设定的是项目里使用的依赖，devDependencies设定的是开发使用的依赖
"dependencies": {
"vue": "^2.2.6"{{#router}},// 项目依赖vue.js
"vue-router": "^2.3.1"{{/router}}// 项目依赖vue-router
},
"devDependencies": {
"autoprefixer": "^6.7.2",// 是用于给css3属性自动加属性前缀的
// babel相关的都是用于处理es6语法的
"babel-core": "^6.22.1",
{{#lint}}
"babel-eslint": "^7.1.1",
{{/lint}}
"babel-loader": "^6.2.10",
"babel-plugin-transform-runtime": "^6.22.0",
"babel-preset-env": "^1.3.2",
"babel-preset-stage-2": "^6.22.0",
"babel-register": "^6.22.0",
// 
"chalk": "^1.1.3",// chalk适用于格式化输出命令行信息的，比如run dev以后的start...
"connect-history-api-fallback": "^1.3.0",//
"copy-webpack-plugin": "^4.0.1",//
"css-loader": "^0.28.0",// 所有的*-loader都是 webpack的扩展，webpack是把各种资源理解为一个模块，css-loader就是读取css模块的加载器
{{#lint}}
// eslint 是代码格式化检查工具，开启以后要严格遵照它规定的格式进行开发
"eslint": "^3.19.0",
"eslint-friendly-formatter": "^2.0.7",
"eslint-loader": "^1.7.1",
"eslint-plugin-html": "^2.0.0",
{{#if_eq lintConfig "standard"}}
"eslint-config-standard": "^6.2.1",
"eslint-plugin-promise": "^3.4.0",
"eslint-plugin-standard": "^2.0.1",
{{/if_eq}}
{{#if_eq lintConfig "airbnb"}}
"eslint-config-airbnb-base": "^11.1.3",
"eslint-import-resolver-webpack": "^0.8.1",
"eslint-plugin-import": "^2.2.0",
{{/if_eq}}
{{/lint}}
"eventsource-polyfill": "^0.9.6",
"express": "^4.14.1",// express 用于启动 node http server的服务
"extract-text-webpack-plugin": "^2.0.0",
"file-loader": "^0.11.1",
"friendly-errors-webpack-plugin": "^1.1.3",
"html-webpack-plugin": "^2.28.0",// webpack 里载入和处理html的插件
"http-proxy-middleware": "^0.17.3",// node server 的中间件工具
"webpack-bundle-analyzer": "^2.2.1",
{{#unit}}
"cross-env": "^4.0.0",// 设定环境变量的工具，NODE_ENV变量跟它有关
// karma相关的都是单元测试工具
"karma": "^1.4.1",
"karma-coverage": "^1.1.1",
"karma-mocha": "^1.3.0",
"karma-phantomjs-launcher": "^1.0.2",
"karma-phantomjs-shim": "^1.4.0",
"karma-sinon-chai": "^1.3.1",
"karma-sourcemap-loader": "^0.3.7",
"karma-spec-reporter": "0.0.30",
"karma-webpack": "^2.0.2",
"lolex": "^1.5.2",
"mocha": "^3.2.0",
"chai": "^3.5.0",
"sinon": "^2.1.0",
"sinon-chai": "^2.8.0",
"inject-loader": "^3.0.0",
"babel-plugin-istanbul": "^4.1.1",
"phantomjs-prebuilt": "^2.1.14",
{{/unit}}
{{#e2e}}
"chromedriver": "^2.27.2",
"cross-spawn": "^5.0.1",
"nightwatch": "^0.9.12",
"selenium-server": "^3.0.1",
{{/e2e}}

"semver": "^5.3.0",// 一个版本检查工具
"shelljs": "^0.7.6",// selljs是在node里跑shell命令的工具，比如‘rm -rf’
"opn": "^4.0.2",// 跨平台的开启文件或者网页的工具
"optimize-css-assets-webpack-plugin": "^1.3.0",
"ora": "^1.2.0",// 命令行里自动运行的信息提示
"rimraf": "^2.6.0",// 跑shell命令 rm-rf 的工具
"url-loader": "^0.5.8", // 配合webpack的加载器
"vue-loader": "^11.3.4", // 配合webpack的加载器
"vue-style-loader": "^2.0.5", // 配合webpack的加载器
"vue-template-compiler": "^2.2.6", // vue-template-compiler，可能是配合离线版vue
// webpack相关的用于，把图片，*.vue, *.js, 这些组合成最终的项目，webpack-dev用于跑测试服务器
"webpack": "^2.3.3",
"webpack-dev-middleware": "^1.10.0",
"webpack-hot-middleware": "^2.18.0",
"webpack-merge": "^4.1.0"
},
// 项目依赖的引擎版本
"engines": {
"node": ">= 4.0.0",
"npm": ">= 3.0.0"
},
"browserslist": [
"> 1%",
"last 2 versions",
"not ie <= 8"
]
}
```
