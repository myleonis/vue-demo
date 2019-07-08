## 命令：

~~~
vue init webpack my-first-vue-project 创建第一个vue项目

~~~

babel	es6转换



new Vue({})

1. data 存放所有的数据 
2. methods 方法，逻辑函数 
3. watch 监听

~~~
new Vue({
    data:{
        a:1,
        b:[]
    },
    methods:{
        doSomething:function(){
        	console.log(this.a)
        }
    }，
    watch:{
        'a':function(val,oldVal){
            console.log(val,oldVal)
        }
    }
})
~~~



## 数据渲染：模板指令

v-text、v-html、{{}}

控制模块的隐藏：v-if	v-show

~~~
<p>{{a}}</p>
<p v-text="a"></p>
<p v-html="a"></p>

~~~

控制模块的隐藏：v-if	v-show

~~~
<p v-if="isShow"></p>
<p v-show="isShow></>
new Vue({
    data:{
        isShow:true
    }
})
~~~





渲染循环列表：v-for

~~~
<ul>
	<li v-for='v-for='item in items'>
		<p v-text='item.label'></p>
	</li>
<ul>

data:{
    items:[
        {
            label:'apple'
        },
        {
            label:'banana'
        }
    ]
}
~~~

事件绑定：v-on   @

~~~
<button v-on:click="doThis"></button>
<button @click="doThis></button>

methods:{
    doThis:function(someThing){
        
    }
}
~~~

属性绑定：v-bind   ：

~~~
<img v-bind:src="imageSrc">
<div :class="{red: isRed}"></div>
<div :class="[classA,classB]"></div>
<div :class="[classA,{classB: isB, classC: isC}]"></div>
~~~

双向绑定：v-model	

## main.js

import Vue from 'vue'	等价于	var Vue = require('vue')

## 路径别名@

~~~
@这是webpack设置的路径别名。
在vue标准模板里面的build/webpack.base.conf这个文件里面。
resolve: { // 路径别名
	alias: { '@': resolve('src'), 'vue$': 'vue/dist/vue.esm.js'
	}
},
@这东西代表着到src这个文件夹的路径
~~~



### store理解

用不用store的原则实际是否要在组件之间共享数据

不共享，不复用   完全不用 vuex  

如果你想共享和复用这些数据，那么最好用 vuex 进行管理

## vuex状态管理 

vuex管理的是状态，状态就是一个全局的对象，是一个树状结构。用来统一管理。vue只是通过computed引用了这些被管理的状态

在单个组件中，状态的更新

## vueApi

~~~
this.$forceUpdate();  // 解决数据更新后页面未重新渲染
~~~



## router路由

### 1.路由跳转

~~~html
<router-link :to="{ path: '/users/dictionary/maintain', query: { msg: scope.row }}">
	<el-button type="text">字典维护</el-button>
</router-link>
~~~

### 2路由获取

~~~js
this.row = this.$route.query.msg;
~~~



