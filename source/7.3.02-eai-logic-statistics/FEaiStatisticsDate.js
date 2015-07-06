//==========================================================
// <T>界面时间控件。</T>
//
// @class
// @author maocy
// @version 150706
//==========================================================
MO.FEaiStatisticsDate = function FEaiStatisticsDate(o){
   o = MO.Class.inherits(this, o, MO.FGuiLabel);
   //..........................................................
   // @attribute
   o._value       = MO.Class.register(o, new MO.AGetter('_value'));
   //..........................................................
   // @method
   o.onPaintLabel = MO.FEaiStatisticsDate_onPaintLabel;
   //..........................................................
   // @method
   o.construct    = MO.FEaiStatisticsDate_construct;
   // @method
   o.setValue     = MO.FEaiStatisticsDate_setValue;
   // @method
   o.dispose      = MO.FEaiStatisticsDate_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsDate_onPaintLabel = function FEaiStatisticsDate_onPaintLabel(event){
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   // 设置字体
   if(o._foreFont){
      graphic.setFont(o._foreFont);
   }
   // 计算位置
   var year = o._value.format('YYYY');
   var month = o._value.format('MM');
   var day = o._value.format('DD');
   var label = o._label;
   var labelLength = label.length;
   var yearValue = year + '年';
   var monthValue = month + '月';
   var dayValue = day + '日';
   var text = yearValue + monthValue + dayValue;
   var width = graphic.textWidth(text);
   var widthYear = graphic.textWidth(yearValue);
   var widthMonth = graphic.textWidth(monthValue);
   var x = rectangle.left;
   var y = rectangle.top + rectangle.height;
   // 绘制文字
   var textWidth = graphic.textWidth(year);
   graphic.drawText(year, x, y, '#FFD926');
   graphic.drawText('年', x + textWidth, y - 1, '#00B5F6');
   var textWidth = graphic.textWidth(month);
   graphic.drawText(month, x + widthYear, y, '#FF7200');
   graphic.drawText('月', x + widthYear + textWidth, y - 1, '#00B5F6');
   var textWidth = graphic.textWidth(day);
   graphic.drawText(day, x + widthYear + widthMonth, y, '#FD0000');
   graphic.drawText('日', x + widthYear + widthMonth + textWidth, y - 1, '#00B5F6');
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsDate_construct = function FEaiStatisticsDate_construct(){
   var o = this;
   o.__base.FGuiLabel.construct.call(o);
   // 计时器
   o._value = new MO.TDate();
}

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param value:TDate 
//==========================================================
MO.FEaiStatisticsDate_setValue = function FEaiStatisticsDate_setValue(value){
   var o = this;
   o._value.parse(value, 'YYYYMMDD');
   o.dirty()
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiStatisticsDate_dispose = function FEaiStatisticsDate_dispose(){
   var o = this;
   // 计时器
   o._value = MO.Lang.Object.dispose(o._value);
   // 父处理
   o.__base.FGuiLabel.dispose.call(o);
}
