# vue-svg-icon 详细介绍

> vue-svg-icon 是轻量的 Vue 2.0 多色动态 svg 图标方案。

## 特点:

``` bash
可即时在illustrator中编辑svg图片

可通过css的color属性动态地调整svg中某一部分的颜色
```

# 用法：
1.安装
```
npm install vue-svg-icon --save-dev
```
2.将svg图片放入src/svg
```
src/svg路径暂时不可配置

src文件夹应和node_modules在同一个文件夹下
```
3. 在项目的main.js入口引入vue-svg-icon和需要使用的svg文件名（不需扩展名）
```
import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);  
```
4.  在网页中使用icon标签就可以啦！
```
<icon name="chameleon" scale="20"></icon>
```
## 注意：
```
若想指定位置颜色更改，fill不指定
```
## github
```
https://github.com/cenkai88/vue-svg-icon#chineseversion
```
