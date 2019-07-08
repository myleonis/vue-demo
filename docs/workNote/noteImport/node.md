# Node.js

什么是node.js

Node.js是建立在谷歌Chrome的JavaScript引擎(V8引擎)的Web应用程序框架。 

Node.js =运行环境+ JavaScript库 

## 常见警告

~~~
警告如下：

npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.0.17: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN vue-loader-demo@1.0.0 No description
npm WARN vue-loader-demo@1.0.0 No repository field.

原因是因为： fsevent是mac osx系统的，在win或者Linux下使用了 所以会有警告，忽略即可。意思就是你已经安装成功了。
~~~



## 工作遇到的npm

~~~
npm cache clean --force  清理缓存
npm install -g npm 更新npm
npm install -g vue-cli  安装vue-cli脚手架
npm uninstall <模块>  卸载模块
npm update	更新模块
npm search express 使用npm搜索包名
~~~

### npm安装细节错误

#### 1.未安装chromedriver解决方案 

![·](E:\myInformation\workNote\noteImport\assets\1557970692656.png)

~~~markdown
npm install chromedriver --chromedriver_cdnurl=http://cdn.npm.taobao.org/dist/chromedriver
~~~

#### 2.windows平台缺少编译环境 

![1557970903830](E:\myInformation\workNote\noteImport\assets\1557970903830.png)

主要是windows平台缺少编译环境，在cmd中以管理员的身份运行

1.  npm install -g node-gyp
2.  npm install -global -production windows-build-tools 自动安装跨平台的编译器：gym
3.  若已安装完成gym依旧找不到node-sass/vender则执行 npm rebuild node-sass 
4.  **cnpm install node-sass@latest** 

#### 3.其他错误：npm不完整 

运行npm install -g npm

再运行npm install -g vue-cli

 

清理更新

```
npm cache clear --force && npm install --no-shrinkwrap --update-binary
```

错误：主要是windows平台缺少编译环境

Module build failed: Error: ENOENT: no such file or directory, scandir 'C:\Users\e-zhoujianlai\IdeaProjects\mt-kit\mt-app\node_modules\node-sass\vendor'

1. 先运行： npm install -g node-gyp  
2. 然后运行：运行 npm install -g -production windows-build-tools 可以自动安装跨平台的编译器：gym

npm install 报错：npm ERR! code EINTEGRITY 

```
运行npm install -g npm后

再运行npm install -g vue-cli
```



## 例子：

~~~
var http = require('http');

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
~~~

## Node.js的特性

- Node.js的库的异步和事件驱动的API全部都是异步就是非阻塞。它主要是指基于Node.js的的服务器不会等待API返回的数据。服务器移动到下一个API调用，Node.js的发生的事件通知机制后有助于服务器获得从之前的API调用的响应。
- 非常快的内置谷歌Chrome的V8 JavaScript引擎，Node.js库代码执行是非常快的。
- 单线程但高度可扩展 - Node.js使用具有循环事件单线程模型。事件机制有助于服务器在一个非阻塞的方式响应并使得服务器高度可扩展，而不是创建线程限制来处理请求的传统服务器。 Node.js使用单线程的程序，但可以提供比传统的服务器（比如Apache HTTP服务器）的请求服务数量要大得多。
- 没有缓冲 - Node.js的应用从来不使用缓冲任何数据。这些应用只是输出数据在块中。
- 许可证协议 - Node.js在  [MIT协议](https://raw.githubusercontent.com/joyent/node/v0.12.0/LICENSE)  下发布

[node入门详解](https://www.yiibai.com/nodejs/nodejs-quick-start.html)

## Package.json 属性

- **name** - 包的名称
- **version** - 包的版本
- **description** - 包的描述
- **homepage** - 包的网站主页
- **author** - 包的作者
- **contributors** - 包的贡献者的名称列表
- **dependencies** - 依赖性列表。npm自动安装所有在node_module文件夹中的包提到的依赖关系。
- **repository** - 包的存储库类型和URL
- **main** - 包的入口点
- **keywords** - 关键字

# Node.js - REPL

REPL代表读取评估和演示打印循环，它就像 Window 下的控制台的计算机环境，或 Unix/Linux 系统的 Shell命令输入响应输出。 Node.js或Node 捆绑了一个REPL环境。可执行以下任务。

- **读取**- 读取用户的输入，解析输入的JavaScript数据结构并存储在内存
- **计算**- 采取并评估计算数据结构
- **打印**- 打印结果
- **循环** - 循环上面的命令，直到用户按Ctrl-C两次终止

Node 的REPL 与 Node.js 的实验代码非常有用，用于调试JavaScript代码。

## 特点

REPL可以通过简单地在shell/控制台运行node不带任何参数来启动。

```
D:\yiibai_worksp\nodejs> node
```

可以看到REPL 命令提示符：

```
D:\yiibai_worksp\nodejs> node
>
```

# Node.js - 回调概念

## 什么是回调?

回调是一种异步相当于一个函数。回调函数被调用在完成既定任务。Node大量使用了回调。**Node所有的API写的都是支持回调的这样一种方式。**例如，一个函数读取一个文件可能开始读取文件，并立即返回控制到执行环境 使得下一个指令可以马上被执行。一旦文件 I/O 完成，它会调用回调函数，同时传递回调函数，该文件作为参数的内容。因此不会有堵塞或等待文件I/O。这使得Node.js高度可扩展，因此可以处理大量的请求，而无需等待任何函数来返回结果。

## 阻塞代码示例

创建一个 txt 文件：test.txt 在 **D:\>yiibai_worksp\nodejs** 目录

```
Yiibai.Com 
```

创建一个名为test.js 的js文件在 D:\>yiibai_worksp\nodejs

```
var fs = require("fs");
var data = fs.readFileSync('test.txt');
console.log(data.toString());
console.log("Program Ended");
```

现在运行 test.js 看到的结果：

```
D:\yiibai_worksp\nodejs>node test.js
```

验证输出结果：

```
Yiibai.com
Program Ended
```

## 非阻塞代码示例

创建一个 txt 文件：test.txt 在 **D:\>yiibai_worksp\nodejs** 目录

```
Yiibai.Com 
```

更新 test.js 的内容在目录D:\>yiibai_worksp\nodejs

```
var fs = require("fs");

fs.readFile('test.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});
console.log("Program Ended");
```

现在运行 test.js 看到的结果：

```
D:\yiibai_worksp\nodejs> node test.js
```

验证输出

```
Program Ended
Yiibai.Com
```

# Node.js - 事件发射器

EventEmitter类在于事件的模块。它通过通俗易懂的语法如下：

```
//import events module
var events = require('events');
//create an eventEmitter object
var eventEmitter = new events.EventEmitter();
```

# Node.js - 缓冲模块

缓冲器模块可以被用来创建缓冲区和SlowBuffer类。缓冲模块可以使用以下语法导入。

```
var buffer = require("buffer")
```

# Node.js - 数据流

## 什么是数据流？

数据流是从源数据读取或写入数据到目标对象以。在节点中，有四种类型的流：

- **Readable** - 数据流，其是用于读操作
- **Writable** - 数据流，用在写操作
- **Duplex** - 数据流，其可以用于读取和写入操作
- **Transform** - 双相类型流，输出基于输入进行计算

每种类型的流是EventEmitter，并且一次引发几个事件。例如，一些常用的事件是：

- **data** - 当有数据可读取时触发此事件
- **end** - 当没有更多的数据读取时触发此事件
- **error** - 当有错误或接收数据写入时触发此事件
- **finish** - 当所有数据已刷新到底层系统时触发此事件

# Node.js - 文件系统

fs模块用于文件I/O。 fs模块可以使用以下语法导入。

```
var fs = require("fs")
```

## 同步 vs 异步

每一个fs模块的方法都有同步和异步形式。异步方法接受一个最后的参数为完成回调函数，而回调函数的第一个参数是错误。它优选使用异步方法来代替同步方法，前者从未阻塞程序执行，而后者则会阻塞。

# Node.js - 工具模块

在这篇文章中，我们将讨论一些Node.js库提供的工具模块，这是非常常见的，经常使用在整个应用程序中。

| Sr.No. | 模块的名称和说明                                             |
| ------ | ------------------------------------------------------------ |
| 1      | **Console** 用于打印输出和错误信息                           |
| 2      | **Process** 用于获取当前进程的信息，提供处理相关活动的多个事件 |
| 3      | **OS Module** 提供基本的操作系统相关的实用功能               |
| 4      | **Path Module** 实用工具提供用于处理和转化文件路径           |
| 5      | **Net Module** 提供服务器和客户端的数据流。作为一个网络应用包 |
| 6      | **DNS Module** 提供的功能做实际的DNS查找，以及使用底层操作系统的名称解析功能 |
| 7      | **Domain Module** 提供一种方式来处理多个不同的I/O操作为一个组 |

# Node.js - 控制台

 

Console是一个全局对象，用于打印输出和错误。目标是文件是用在同步方式，或当目标是管道终端为异步方式。

# Node.js - 进程

**process** 是一个全局性对象，并用于表示Node进程。

# Node.js - OS 模块

**os**模块用于一些基本的操作系统相关的实用功能。os模块可以使用以下语法导入。

```
var os = require("os")
```

# Node.js - Path 模块

**path** 模块用于处理和转换文件路径。path模块可以使用以下语法导入。

```
var path = require("path")
```

# Node.js - Net模块

**net** 模块是用来创建服务器和客户端。它提供了一个异步网络包装。 net模块可以使用以下语法导入。

```
var net = require("net")
```

# Node.js - DNS 模块

**dns** 模块是用来做实际的DNS查找，以及使用底层操作系统的名称解析功能..它提供了一个异步网络包装。dns模块可以使用以下语法导入。

```
var dns = require("dns")
```

# Node.js - Domain模块

**domain** 模块是用于拦截未处理的错误。这些未处理的错误可以使用内部绑定或外部绑定来拦截。如果错误都那么不处理，那么Node应用会崩溃。

- **内部绑定** - 错误发生执行代码是在一个域的run方法。
- **外部绑定** - 使用它的add方法将错误发生明确地加入到域。

domain（域）模块可以使用以下语法导入。

```
var domain = require("domain")
```

域模块的Domain类是用来提供路由错误以及未捕获异常活动域对象的功能。 这是一个EventEmitter的子类。为了处理它捕获错误，监听它的错误事件。它使用如下的语法创建：

```
var domain = require("domain");
var domain1 = domain.create();
```

# Node.js - Web模块

## Web服务器简介

Web服务器是用于处理使用HTTP协议请求并返回网页作为响应到客户端的软件应用程序。 Web服务器通常提供HTML文档并伴随着图片，样式表和脚本。大多数Web服务器还支持使用脚本语言作为服务器端脚本，或重定向到从数据库中获取数据的执行特定任务的应用程序服务器，执行复杂的逻辑等，Web服务器然后返回应用服务器到客户端输出。

Apache web服务器是最常见的一个网络服务器。它是一个开源项目。

### 路径定位过程

Web服务器映射使用URL，统一资源定位符的文件的路径。它可以是一个本地文件系统或一个外部/内部程序。例如：

客户端使用的浏览器发起一个URL请求：http://www.test-example-site.com/website/index.htm.

浏览器发起的一个请求是：

GET /website/index.htm HTTP /1.1

HOST www.test-example-site.com

Web服务器将追加路径到根目录。举个例子：根目录是home/www，那么实际路径将被转换为 home/www/website/index.htm.

## Web网络架构介绍

Web应用程序的使用分为四层：

- **Client** - 此层是由Web浏览器，移动浏览器或应用程序，它可以发起HTTP请求到服务器。
- **Server** - 这一层包括可拦截发出的客户端请求，并将其传递到由Web服务器响应。
- **Business** - 这一层由应用程序服务器组成，它通过利用Web服务器执行动态任务。这一层交互通过数据库或某些外部程序数据层。
- **Data** - 此层由数据库或任何来源的数据。

## App实例目录

- **package.json** 是应用程序描述符文件包含在依赖项列表中，应用程序使用 Node 的其他属性
- app.js 包含了服务器的初始化代码
- bin是用于存储在生产模式下的应用程序
- public用于存储图像，样式表和JavaScript文件
- routes 包含路由处理程序
- views 包含HTML模板来生成Web应用各种视图