# 快捷键

1. alt+7查看文件内所有已经声明的方法 
2. ctrl+o实时查看文件内所有已经声明的方法
3. ctrl+shift+alt+n / ctrl+shift +n  全局搜索

# Webstrom断点无效 

1. 安装jetbranis IDE support （需要翻墙，可以使用谷歌访问助手）
2. 修改：build\webpack.dev.conf.js 中的`devtool` 为 `source-map`
3. 新建一个 debug
4. Run-> Edit Configurations
5. 选择 Javscript Debug
6. 填上 URL 之后，下面的目录映射就会显示出来

![webStrom](E:\myInformation\workNote\noteImport\assets/webStrom.jpg)

7. Npm run dev后运行 debug
8. 设置断点，点击右上角的小虫子