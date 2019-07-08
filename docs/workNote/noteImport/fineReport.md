### js周控制

~~~
var start = this.options.form.getWidgetByName("start").getValue();
var date = new Date(start);
//一天的毫秒数   
var millisecond = 1000 * 60 * 60 * 24; 
//相对于当前日期AddWeekCount个周的日期
var currentDate = new Date(date.getTime() + (millisecond * 7*0));
//返回date是一周中的某一天
var week = currentDate.getDay(); 
//返回date是一个月中的某一天   
var month = currentDate.getDate();
//减去的天数   
var minusDay = week != 0 ? week - 1 : 6; 
//获得当前周的第一天   
var currentWeekFirstDay = new Date(currentDate.getTime() - (millisecond * minusDay)); 
//获得当前周的最后一天
var currentWeekLastDay = new Date(currentWeekFirstDay.getTime() + (millisecond * 6));
var fy = currentWeekFirstDay.getFullYear();
var fm = currentWeekFirstDay.getMonth() + 1;
var fstrDate = currentWeekFirstDay.getDate();
var fhours = currentWeekFirstDay.getHours(); //获取时
var fminutes = currentWeekFirstDay.getMinutes(); //分
var fseconds = currentWeekFirstDay.getSeconds(); //秒
if (fm >= 1 && fm <= 9) {
	fm = "0" + fm;
}
if (fstrDate >= 0 && fstrDate <= 9) {
	fstrDate = "0" + fstrDate;
}
if (fhours >= 0 && fhours <= 9){
	fhours = "0" + fhours;
}
if (fminutes >= 0 && fminutes <= 9){
	fminutes = "0" + fminutes;
}
if (fseconds >= 0 && fseconds <= 9){
	fseconds = "0" + fseconds;
}
futurestart = fy + '-' + fm + '-' + fstrDate +" "+fhours+':'+fminutes+':'+fseconds;
this.options.form.getWidgetByName("start").setValue(futurestart)

var ly = currentWeekLastDay.getFullYear();
var lm = currentWeekLastDay.getMonth() + 1;
var lstrDate = currentWeekLastDay.getDate();
var lhours = currentWeekLastDay.getHours(); //获取时
var lminutes = currentWeekLastDay.getMinutes(); //分
var lseconds = currentWeekLastDay.getSeconds(); //秒
if (lm >= 1 && lm <= 9) {
	lm = "0" + lm;
}
if (lstrDate >= 0 && lstrDate <= 9) {
	lstrDate = "0" + lstrDate;
}
if (lhours >= 0 && lhours <= 9){
	lhours = "0" + lhours;
}
if (lminutes >= 0 && lminutes <= 9){
	lminutes = "0" + lminutes;
}
if (lseconds >= 0 && lseconds <= 9){
	lseconds = "0" + lseconds;
}
futureEnd = ly + '-' + lm + '-' + lstrDate +" "+lhours+':'+lminutes+':'+lseconds;



this.options.form.getWidgetByName('end').setValue(futureEnd); // 获取end控件 // 设置end值
~~~

