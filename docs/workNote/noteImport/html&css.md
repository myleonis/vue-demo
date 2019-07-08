# HTML

## 常用技巧

### 1.slot-scope

~~~html
<el-table-column label="推送内容" align="left"
    prop="content"
    min-width="300"
    :show-overflow-tooltip="true">
        <template slot-scope="scope">
        	<div v-html="getFormatContent(scope.row.content)"></div>
        </template>
</el-table-column>
~~~



~~~js
getFormatContent(html) {
	return html.replace(/\n/g, '<br/>');
}
~~~

### 2.href 设置无法点击

```HTML
<a href="javascirpt:;" v-if="item.disable" class="link-title-disable">{{ $t('route.' + item.name)}}</a>
```



```CSS
overflow: hidden;
 box-sizing: border-box;
 background-size: cover;
 position: relative;
 box-shadow
 display: table;
         font-size: 30px;
        text-align: center;
        vertical-align: middle;
```



```JS
url(' + require('../../assets/dashboard/tit-bg-pink.png') + ')
```



## 无序UL-Li样式设置

### html

~~~html
<div class="top-list">
            <ul class="list">
              <li>
                <div class="lr-box">
                  <span class="lr-left lr-font">序号</span>
                  <span class="lr-center lr-font">{{
                    options.factoryKey == "ALL" ? "工厂" : "物料"
                    }}</span>
                  <span class="lr-right lr-font">差异和</span>
                </div>
              </li>
              <li v-for="(item, index) in data.top10.slice(0,10)"
                  :key="index">
                <div class="lr-box">
                  <span class="lr-left">{{index + 1}}</span>
                  <span class="lr-center">{{
                    options.factoryKey == "ALL" ? item.factoryName : item.maktx
                    }}</span>
                  <span class="lr-right">{{ item.deliverNumDiff }}</span>
                </div>
              </li>
              <li v-if="data.top10.length == 0">暂无数据</li>
            </ul>
          </div>
~~~



### css

~~~css
.top-list {
  position: relative;
  height: 100%;
  .list {
    margin: 0;
    padding: 0;
    list-style: none;
    color: rgba(0, 0, 0, 0.75);
    font-size: .16rem;
    li:nth-child(odd){ // 斑马样式
      background-color:white;
    }
    li:nth-child(even){ // 斑马样式
      background-color:rgba(0,0,0,0.02);;
    }
    li {
      padding: .16rem .12rem;
      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }
      .lr-box {
        display: flex;
        text-align: left;
        height: .22rem;
        .lr-left {
          width: 0.52rem;
          text-align: left;
          white-space: nowrap;
        }
        .lr-center {
          flex: 1;
          text-align: left;
          white-space: nowrap;
        }
        .lr-right {
          width: 1rem;
          text-align: right;
          white-space: nowrap;
        }
      }
      .lr-font {
        font-weight: bold;
        color: rgba(0,0,0,0.45);
      }
    }
  }
}
~~~



# CSS

## 选择器

[选择器链接](http://www.w3school.com.cn/css/css_syntax_attribute_selector.asp)

1. id选择器：#idName

2. 类选择器：.clsssName

3. 属性选择器：

   ~~~
   1. html: <h2 title="Hello world">Hello world</h2>
      css:
        1. [title]{color:red;}
        2. [title="Hello world"]{color:red}
   2. html: <p lang="en">Hello!</p>
   		<p lang="en-us">Hi!</p>
      css: [lang|=en]{color:red;}
   3. 设置表单的样式
       input[type="text"]{
         width:150px;
         display:block;
         margin-bottom:10px;
         background-color:yellow;
         font-family: Verdana, Arial;
       }
   ~~~

   

## 常用样式

## SASS

[快速入门](https://www.sass.hk/guide/)

### 1.变量声明$

~~~css
$highlight-color: #F90;
nav {
  $width: 100px;
  width: $width;
  color: $highlight-color;
}
~~~

### 2.父选择器的标识符&;

~~~
article a {
  color: blue;
  &:hover { color: red }
}
~~~

### 3.子组合选择器和同层组合选择器：>、+和~;

~~~

~~~



## Flex 布局（重点）

[flex布局](https://www.runoob.com/w3cnote/flex-grammar.html)

~~~css
  .function-button {
    font-size: 0;
    display: flex; 
    justify-content: flex-end;
  }
~~~

~~~html
<div class="function-button">
   <div>
     <el-button
     @click="getSearchList"
     icon="el-icon-search"
     plain
     size="small"
     type="primary"
     >查询
     </el-button>
     <span class="split"></span>
            <el-button @click="showAddProfitDialog" size="small" type="primary">新 增</el-button>
            <el-button @click="leadingIn" size="small" type="primary">Excel导入</el-button>
            <el-button @click="leadingout" size="small" plain>导出Excel</el-button>
   </div>
</div>
~~~

