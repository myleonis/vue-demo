# JSON

## 1. json对象的增删改

~~~js
<script type="text/javascript">
        //json对象
        var json={ "firstName":"Bill" , "lastName":"Gates"};
        //给json对象添加新的属性并赋值
        json.sex="man";
        //也可以如下添加新的属性并赋值
        json["sex"]="man";


        //删除json对象的firstName属性
        delete json.firstName;
        //也可以如下删除firstName属性的值
        delete json["firstName"];


        //修改json对象的firstName属性的值
        json.firstName="Thomas";
        //也可以如下修改firstName属性的值
        json["firstName"]="Thomas";
    </script>
~~~

# 常用

## 1. math&toFixed

```js
 (Math.round(list.dailyPlanRate * 10000) / 100).toFixed(2) + '%',
```



## 2. map&filter

```js
const topData = topDatas.map((v) => {
  return {
    problemDescribe: v.problemDescribe,
    number: v.number
  }
})
```



~~~js
 response.data.defectsList.filter(v => v.sumType === 'D')
~~~



## 3.find&filter的区别

find 和 filter 都是不改变原数组的方法

但是**find只查出第一个符合条件的结果，是直接返回了一个对象而不是数组**，而***filter返回全部结果仍然是数组***。

~~~js
const list = [{'name':'1',index:1},{'name':'2'},{'name':'1'}]
let list2 = list.find(i=>i.name==='1') 
let list3 = list.filter(i=>i.name==='1')

console.log(list); [ { name: '1', index: 1 }, { name: '2' }, { name: '1' } ]
console.log(list2); { name: '1', index: 1 }

console.log(list3);[ { name: '1', index: 1 }, { name: '1' } ]
~~~



# 开发者工具

## 开发者工具反uri路径转码

~~~
decodeURIComponent(unescape('路径'))
~~~

## 路由设置

需要加深理解

~~~js
      {
        path:
          'report/frame/' +
          encodeURIComponent( // 转码
            escape( // 二次转码
              'http://10.68.214.92/WebReport/ReportServer?formlet=ZZ/ZZ_ACTUEL_OUTPUT.frm'
            )
          ),
        type: 'zzcj',
        component: _import('vehicle/report-frame/index'),
        name: 'zzfgdsscl',
        hidden: true,
        meta: {
          noCache: true,
          permission: ['zzfgdsscl']
        }
      }
~~~









```
// 直通率
const rate = allParam.fpysMap
const col = []
for (const v in rate) {
  if (rate.hasOwnProperty(v)) {
    col.push({ label: v, prop: v })
  }
}
// 直通率表头获取
this.cols = this.cols.slice(0, 1)
this.cols = this.cols.concat(col)

const throughRateDataAll = []
for (let i = 0; i < 3; i++) {
  if (i === 0) {
    const result = { interval: '当日' }
    for (const n in rate) {
      result[n] = rate[n][i] * 100 + '%'
    }

    throughRateDataAll.push(result)
  }
  if (i === 1) {
    const result = { interval: '上周' }
    for (const n in rate) {
      result[n] = rate[n][i] * 100 + '%'
    }

    throughRateDataAll.push(result)
  }
  if (i === 2) {
    const result = { interval: '当月' }
    for (const n in rate) {
      result[n] = rate[n][i] * 100 + '%'
    }

    throughRateDataAll.push(result)
  }
}
this.throughRateData = throughRateDataAll
```


```
 v-for="item in colorBlock" :style="{'background-color': item}"
```

```
unique(arr) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  const newResult = []
  for (let i = 0; i < result.length; i++) {
    newResult.push({
      text: result[i], value: result[i]
    })
  }
  return newResult
},
```
~~~
const date = [].concat(fttChart.fttDates);
const data = [].concat(fttChart.fttData);
const myDate = new Date();
myDate.setDate(myDate.getDate() - 9);
const dateArray = [];
let dateTemp;
for (let i = 0; i < 10; i++) {
  let month = myDate.getMonth() + 1;
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  let day = myDate.getDate();
  if (day >= 1 && day <= 9) {
    day = "0" + day;
  }
  dateTemp = month + "-" + day;
  dateArray.push(dateTemp);
  myDate.setDate(myDate.getDate() + 1);
}
const len = dateArray.length;
for (let i = 0; i < date.length; i++) {
  for (let j = 0; j < len; j++) {
    if (date.indexOf(dateArray[j]) === -1) {
      date.splice(j, 0, dateArray[j]);
      data.splice(j, 0, "");
    }
  }
}
~~~

~~~
<span class="numberFont" v-text="zzzzsl" :style="{color: (zzzzsl <zzDown?'red':(zzzzsl>zzUp ?'#EEEE00':'#666666'))}"></span>
~~~

~~~
:class="setColor(index)"
  setColor(type) {
    if (this.opsition[type] === "PBS") {
      const pbsZz = this.tableData.zzp[type];
      const classResult = {
        red: pbsZz < this.pbsDown,
        yellow: pbsZz > this.pbsUp,
        grey: this.pbsUp > pbsZz
      }
      return classResult;
    }
  },
~~~

~~~
      const dailyArr = [].concat(reworkData.daily);
      dailyArr.sort(function(a, b) { return (a.worklineText + "").localeCompare(b.worklineText + ""); });
~~~

~~~
          arr.forEach(val => {
            const v = {
              legendData: val.carColor,
              dayColorData: { value: val.dailyYield, name: val.carColor },
              weekColorData: { value: val.weeklyYield, name: val.carColor },
              monthColorData: { value: val.monthlyYield, name: val.carColor }
            };
            this.dayColorPieData.legendData.push(v.legendData);
            this.dayColorPieData.colorData.push(v.dayColorData);
            this.weekColorPieData.legendData.push(v.legendData);
            this.weekColorPieData.colorData.push(v.weekColorData);
            this.monthColorPieData.legendData.push(v.legendData);
            this.monthColorPieData.colorData.push(v.monthColorData);
          });
~~~

~~~
          if (monthlyOutput.length < 1) return;
          const model = monthlyOutput.map(v => {
            return v.carModel;
          });
          const dateList = monthlyOutput.map(v => {
            return v.dateCode.slice(5, 10);
          });
          const carDateList = cleanRepeatArr(dateList);
          const carModel = cleanRepeatArr(model);
          const VehicleTypeAndDistBarData = {
            legendData: [...carModel, "总体"],
            dataByAxis: carDateList
          };
          const carList = {};
          carModel.forEach((v, i) => {
            VehicleTypeAndDistBarData["car" + i ] = monthlyOutput.filter(item => item.carModel === v).map(v => v.dailyYield);
            carList["car" + i ] = monthlyOutput.filter(item => item.carModel === v).map(v => v.dailyYield);
          });
          const totalList = {};
          const carLen = carList["car0"].length; // 日期个数;
          const modelLen = carModel.length; // 车型个数；
          for (let i = 0; i < carLen; i++) {
            for (let j = 0; j < modelLen; j++) {
              if (!totalList["" + i]) { totalList["" + i] = 0; }
              totalList["" + i] += carList["car" + j][i];
            }
          }
          const total = Object.keys(totalList).map(i => totalList[i]);
          VehicleTypeAndDistBarData["total"] = total;
~~~

# 闭包

js闭包的理解：

~~~
function a(){
    var i=0;
    function b(){
    	alert(++i);
	}
	return b;
}
var c=a();
c();
~~~

简而言之，闭包的作用就是在a执行完并返回后，闭包使得Javascript的垃圾回收机制不会收回a所占用的资源，因为a的内部函数b的执行需要依赖a中的变量。

在上面的例子中，由于闭包的存在使得函数a返回后，a中的i始终存在，这样每次执行c()，i都是自加1后alert出i的值。

那 么我们来想象另一种情况，如果a返回的不是函数b，情况就完全不同了。因为a执行完后，b没有被返回给a的外界，只是被a所引用，而此时a也只会被b引 用，因此函数a和b互相引用但又不被外界打扰（被外界引用），函数a和b就会被回收。

# 日期数组排序

~~~
// 对数组根据日期进行排序
sortDataArray(dataArray) {
    const data = [].concat(dataArray);
    return data.sort(function(a, b) {
         return Date.parse(a.dateCode.replace(/-/g, "/")) - 					Date.parse(b.dateCode.replace(/-/g, "/"));
    });
},
~~~

# 排序相同项合并处理

~~~
        const newChartData = [],
          map = {},
          xlabel = [], // x轴值
          data = []; // y轴数据
        // 相同项合并处理
        for (let i = 0; i < chartData.length; i++) {
          const ai = chartData[i];
          if (!map[ai.conveyorName]) {
            newChartData.push({
              conveyorName: ai.conveyorName,
              sumCount: ai.sumCount
            });
            map[ai.conveyorName] = ai;
          } else {
            for (let j = 0; j < newChartData.length; j++) {
              const dj = newChartData[j];
              if (dj.conveyorName === ai.conveyorName) {
                dj.sumCount = (parseFloat(dj.sumCount) + parseFloat(ai.sumCount)).toString();
                break;
              }
            }
          }
        }
        newChartData.sort(function(a, b) { return b.sumCount - a.sumCount; });
~~~

# for循环注意

for循环里嵌套判断和for循环，只能一个return。该return的范围为最外层的for

# js实现对象的复制，不影响原对象

## 1.Object.assign(target,…sources) 

因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。 

[Object.assign详解](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

~~~
var obj1 = { a: 0 , b: { c: 0}};
var obj2 = Object.assign({}, obj1);//将obj的可枚举的属性值复制到{}中
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

obj1.a = 1;
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
console.log(JSON.stringify(obj2)); // { a: 0, b: { c: 0}}

obj2.a = 2;
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 0}}
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 0}}

obj2.b.c = 3;//会影响到源对象，因为此属性值是一个指向对象的引用
console.log(JSON.stringify(obj1)); // { a: 1, b: { c: 3}}
console.log(JSON.stringify(obj2)); // { a: 2, b: { c: 3}}

~~~



## 2.JSON.parse(JSON.stringify(obj1));

注意：该方法有缺陷，具体谷歌

~~~
// Deep Clone
  var obj1 = { a: 0 , b: { c: 0}};
  var obj3 = JSON.parse(JSON.stringify(obj1));//先将obj转换为JSON字符串，然后再转回对象
  obj1.a = 4;
  obj1.b.c = 4;
  console.log(JSON.stringify(obj3)); // { a: 0, b: { c: 0}}

~~~

## 3.深浅拷贝

[深浅拷贝](https://www.cnblogs.com/136asdxxl/p/8645750.html)

# js数组的拷贝

## 1. concat 

es5：

~~~~js
var ary1=[1,2];
var ary2 = ary1.concat();
const arr3 = [].concat(arr1)
~~~~

## 2.JSON.parse(JSON.stringify(arr1));

es5:

~~~
var ary2 = JSON.parse(JSON.stringify(ary1));
~~~

//此方法适用于Oject的深度拷贝，因为Array属于Oject类型，所以也适用于此处；

//需要注意的是：作为Oject的深度拷贝时，要复制的function会直接消失，所以这个方法只能用在单纯只有数据的对象。

## 3. [...ary1];

es6:

~~~
// 方法1
var ary2 = [...ary1];
 
// 方法2
var [...ary2] = ary1;
~~~











