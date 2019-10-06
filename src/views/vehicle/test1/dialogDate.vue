<!--// https://blog.csdn.net/JavaeeGad/article/details/84135420-->
<template>
  <section>
    <div style="width: 100%;height: 800px">
      <div style="width: 100%;height: 60px;text-align:left">
        <el-col :span="24" class="toolbar">
          <el-form :inline="true" :model="filters">
            <el-form-item label="时间">
              <el-date-picker
                v-model="filters.date"
                align="right"
                type="date"
                size="mini"
                placeholder="选择日期"
                :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
            //这里是因为我这个业务场景需要一个下拉框展示一个树形菜单,所以做了一个改变,大家可以根据情况改变
            <el-form-item label="部门">
              <div id="selectdiv1" style="width: 160px">
                <el-input style="width: 162px" @focus="selectDepartment()"
                          size="mini"
                          placeholder="请输入内容"
                          v-model="filters.department"
                          readOnly="true">
                </el-input>
                <div id="treediv" class="treediv" style="display:none;">
                  <el-tree
                    :data="departmentTree"
                    :props="props"
                    node-key="id"
                    @node-click="handleNodeClick">
                  </el-tree>
                </div>
              </div>
            </el-form-item>
            //人员的获取是通过点击左边的树形菜单节点动态获取的,如果不需要可以查看element文档根据格式填值
            <el-form-item label="人员">
              <el-select  clearable v-model="filters.personnel" style="width: 160px" size="mini">
                <el-option
                  v-for="item in personnelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" v-on:click="query" size="mini">查询</el-button>
            </el-form-item>
            <!--<el-form-item>-->
            <!--<el-button type="primary" icon="el-icon-search" v-on:click="changedate">修改时间</el-button>-->
            <!--</el-form-item>-->
            <!--<el-form-item>-->
            <!--<el-button type="primary" icon="el-icon-search" v-on:click="empty">清空时间</el-button>-->
            <!--</el-form-item>-->
          </el-form>
        </el-col>
      </div>
      //这是一个日历展示界面,根据当前系统日期计算的,从而得出一个表格,有点丑,可根据需要进行改变
      <div  style="width: 100%;height: 90%;position: absolute">
        <div style=" height: 50px;position: relative;width: 100%;text-align: center;">
          <div class="year">{{year+"年"}}</div>
          <div class="month">{{month+"月"}}</div>
        </div>

        <div style="height:95%;width:100%">
          <ul class="week">
            <li class="item">星期一</li>
            <li class="item">星期二</li>
            <li class="item">星期三</li>
            <li class="item">星期四</li>
            <li class="item">星期五</li>
            <li class="item">星期六</li>
            <li class="item">星期日</li>
          </ul>
          <ul class="dayList" v-for="(line,lineIndex) in showData" >
            <li class="item2" :id="showID(day,showDay)" v-for="(showDay,dayIndex) in line"  :class="{active:day==showDay}" @click="changeCalendar(showDay)">{{showDay}}<br><span class = 'name'></span></li>
          </ul>
        </div>
      </div>
    </div>

    <!--详情界面-->
    <el-dialog
      title="日程详情"
      :visible.sync="addFormVisible"
      top="5vh"
      width="70%"
      :close-on-click-modal="false">
      <div style="height: 500px">
        <template>
          <el-table :data="tableData2" style="width: 100%;height: 100%;">
            <el-table-column
              prop="departmentname"
              label="部门"
              width="180">
            </el-table-column>
            <el-table-column
              prop="personnelname"
              label="人员"
              width="180">
            </el-table-column>
            <el-table-column
              prop="calendartitle"
              label="日程标题"
              width="180">
            </el-table-column>
            <el-table-column
              prop="begintime"
              label="开始时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="endtime"
              label="结束时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="content"
              label="日程内容">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    name: "LeaderSchedule",
    mounted : function () {

      var date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth()+1;
      this.day = date.getDate();
      this.monthDay = this.getMonthDay(this.year);
      this.week = this.getWeek(this.year);
      //初始化数据
      this.changeDay();

      this.selectDepartment();
      // var navlist = document.getElementById('selectdiv1');
      // var navlist1 = document.getElementById('treediv');
      //
      // navlist.onmouseleave = function () {
      //     navlist1.style.display = 'none';
      // };


    },

    data() {
      return {
        //日程详情是否隐藏参数
        addFormVisible:false,
        //部门id
        departmentId:'',
        //部门树形菜单
        departmentTree:[{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],

        tableData: [],
        departmentList:'',
        personnelList:[],
        filters: {
          date:'',
          department: '请选择部门',
          personnel: '请选择人员',
        },
        //日程详情
        tableData2: [],

        //日期选择控制
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },

        props: {
          children: 'children',
          id: 'id',
          label: 'label'
        },
        count :1,


        //记录年月日
        year:"",
        month:"",
        day:"",
        //要展示和绑定的数据
        showData:[[],[],[],[],[],[]],
        prevDay:-1,//第1行占多少天
        weekDay:7,//星期天数
        allDay:42,//6行一共的天数
        monthDay:[],//保存当前年每月的天数
      };

    },
    watch:{
      department:'handleNodeClick',
    },
    methods: {
      //清空表格
      empty(){
        this.$set(this,"showData",[[],[],[],[],[],[]]);
      },
      //修改时间
      changedate(){
        var date = this.filters.date;//2018-09-30
        this.year = date.getFullYear();
        this.month = date.getMonth()+1;
        this.day = date.getDate();
        this.monthDay = this.getMonthDay(this.year);
        this.week = this.getWeek(this.year);
        this.changeDay();
      },
      //判断是不是闰年
      isLearYear:function(year){
        var condition1 = year % 4 == 0;
        var condition2 = year % 100 !=0;
        var condition3 = year % 400 ==0;
        return condition1 && condition2 || condition3;
      },
      //获得当前年的每月的天数
      getMonthDay:function(year){
        var _arr=[31,31,30,31,30,31,31,30,31,30,31];
        if(this.isLearYear(year)){
          //闰年
          _arr.splice(1,0,29);
          return _arr;
        }else{
          //平年
          _arr.splice(1,0,28);
          return _arr;
        }
      },
      //当前年的一月一日是星期几
      getWeek:function(year){
        var _arr=["Mon","Web","Sat","Thu","Fri","Sat","Sun"];
        var week = new Date(year+","+1+","+1).toString().split(" ")[0];
        return _arr.indexOf(week);
      }
      ,
      //修改天数数据
      changeDay:function(newday,text){
        var _arr=[[],[],[],[],[],[]];
        var index = Number(this.month-1);
        var day =1;
        //初始化
        if(index == 0 ){
          //1月
          this.prevDay == this.week;
          this.$set(this,"prevDay",this.week);
        }else{
          var allPrevDay=0;
          for(var i=0;i<index;i++){
            allPrevDay+=this.monthDay[i];
          }
          this.prevDay = (allPrevDay+this.week) % this.weekDay;
        }
        //第一行
        for(var i=0;i<7;i++){
          if(i<this.prevDay){
            _arr[0].push("");
          }else{
            //var newday = this.addMemorandum(day,newday,text);
            _arr[0].push(day);
            day++;
          }
        }
        //第二到第四行
        for(var j=0;j<3;j++){
          for(var k=0;k<7;k++){
            //var newday = this.addMemorandum(day,newday,text);
            _arr[j+1].push(day);
            day++;
          }
        }
        //第五行
        for(var q=0;q<7;q++){
          if(day > this.monthDay[index]){
            _arr[4].push("");
          }else{
            //var newday = this.addMemorandum(day,newday,text);
            _arr[4].push(day);
            day++;
          }
        }
        //第六行
        for(var s=0;s<7;s++){
          if(day>this.monthDay[index]){
            _arr[5].push("");
          }else{
            //var newday = this.addMemorandum(day,newday,text);
            _arr[5].push(day);
            day++
          }
        }
        //第五和第六可以合并成2层嵌套循环
        //console.log(_arr);


        this.$set(this,"showData",_arr);
      },

      //为li标签增加id属性
      showID(day,newday){
        if(day == newday){
          return 'li00'+newday;
        }else{
          return 'li'+newday;
        }

      },

      //当天日程查询详情
      changeCalendar(day){
        if(day == '' || day == undefined){
          return ;
        }else if(day == 'li00'){

        }else{
          var id = "#li"+day;
          for(var i = 1;i<32;i++){
            $("#li"+i).css({'background-color':'#F8F8FF'});
          }
          $(id).css({'background-color':'#00BFFF'});
          this.showCalender(day);
        }
      },

      //弹窗详情
      showCalender(day){
        var self=this;
        var dbUrl = self.$API.ajaxPath;
        var param = [];
        var sj = self.filters.date;
        var yue = this.month;
        if(yue < 10 ){
          yue = '0'+yue;
        }
        //组装数据源请求后台获得当天日程详情,根据情况自行修改
        var nian = this.year;
        var youWant=nian + '-' + yue + '-' +day;
        param.push(self.filters.personnel);
        $.ajax({
          type: "POST",
          url: dbUrl,
          async: false,
          data:{args:param},
          success: function(data){
            self.tableData2 = data.result;
            self.addFormVisible = true;
          },
          error: function(e) {
            self.$alert(e.message, '异常提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
          }
        });
      },

      //查询按钮
      query(){
        $(".name").html('');

        this.changedate();

        var param = [];
        var sj = this.filters.date;
        var yue = sj.getMonth() + 1;
        if(yue < 10 ){
          yue = '0'+yue;
        }
        var nian = sj.getFullYear();
        var youWant=nian + '-' + yue;
        var self=this;
        param.push(this.filters.personnel);
        param.push(youWant);
        $.ajax({
          type: "POST",
          url: dbUrl,
          async: true,
          data:{args:param},
          success: function(data){
            var CalendarList = data.result;
            if(CalendarList == null || CalendarList == undefined){
              return ;
            }
            for(var i = 0;i<CalendarList.length;i++){
              var date = CalendarList[i].begintime;
              var newday = date.slice(8,10);
              var title = CalendarList[i].calendartitle;
              if(title==null){
                title = '无';
              }
              var a = $("#li"+newday).children("span").html();
              // var a = $("#li"+newday).html();
              a += date +' \n ' +title + '<br> ';
              $("#li"+newday).children("span").html(a);
              //$("#li"+newday).html(a);
              //$("#li"+newday).css({'color':'red'});
            }

          },
          error: function(e) {
            self.$alert(e.message, '异常提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
          }
        });
      },


      //点击菜单栏;
      handleNodeClick(node){
        var self=this;
        self.departmentId = node.id;
        this.filters.department = node.label;
        var param = [];
        $.ajax({
          type: "POST",
          url: dbUrl,
          async: false,
          data:{args:param},
          success: function(data){
            self.personnelList= JSON.parse(data.result);
          },
          error: function(e) {
            self.$alert(e.message, '异常提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
          }
        });
      },
      //根据部门查询人员
      selectDepartment(){
        this.departmentQuery();
      },
      //部门查询
      departmentQuery(){
        var self=this;
        //组装查询参数
        param.push(userId);
        //param.push("A6CDFE1F-A85A-4285-AC09-6A573A523B8C");//此处参数是用户ID：userid
        $.ajax({
          type: "POST",
          url: dbUrl,
          async: false,
          data:{args:param},
          success: function(data){
            self.departmentTree= JSON.parse(data.result);
          },
          error: function(e) {
            self.$alert(e.message, '异常提示', {
              confirmButtonText: '确定',
              type: 'error'
            });
          }
        });
        $("#treediv").show();
        var navlist = document.getElementById('selectdiv1');
        var navlist1 = document.getElementById('treediv');
        navlist.onmouseover = function (){
          navlist1.style.display = 'block';
        };
      },
    }
  }

</script>

<style scoped>

  .treediv{
    overflow-y:auto; overflow-x:auto;width: 300px;height: 200px;background-color: #FFFFFF;
    z-index:99999999;border:1px solid #DCDFE6;border-radius:4px;position: absolute
  }
  /*滚动条样式*/
  .treediv::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .treediv::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .treediv::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
  .calendar{
    position: relative;
    width: 350px;
    height: 50px;
  }
  .header{
    height: 50px;position: relative;width: 100%;text-align: center;
  }
  .year{
    display: inline-block;
    font-size: 25px;
    color: red;
  }
  .month{
    display: inline-block;
    font-size: 25px;
    color: red;
  }
  .week{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 5%;
    border-radius:5px;

  }
  .item{
    float: left;
    list-style: none;
    width: 14%;
    height: 100%;
    text-align: center;
    padding: 0;
    margin: 0;
    border:1px solid #DCDFE6 ;
    border-radius:5px;
    padding:15px 0 0 0;
    background-color: #D3D3D3;
  }
  .item2{
    float: left;
    list-style: none;
    width: 14%;
    height: 100px;
    text-align: center;
    padding: 0;
    margin: 0;
    border:1px solid #DCDFE6 ;
    border-radius:5px;
    background-color: #F8F8FF;
  }
  .item:last-child{
    border-right: 1px solid #DCDFE6;
  }
  ul{
    margin: 0;
    padding: 0;
    height: 21px;
  }
  .active{
    font-size: 20px;
    color: #FFC0CB;
    /*background-color: #FFC0CB;*/
  }
  .last,.prev{
    background-color: #999999;
  }



</style>
