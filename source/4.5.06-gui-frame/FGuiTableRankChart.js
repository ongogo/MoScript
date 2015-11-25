//==========================================================
// <T>线图显示类。</T>
//
// @class
// @author adu
// @history 150715
//==========================================================
MO.FGuiTableRankChart = function FGuiTableRankChart(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._data                    = null;
   //..........................................................
   // @method
   o.construct                = MO.FGuiTableRankChart_construct;
   o.setup                    = MO.FGuiTableRankChart_setup;
   o.onImageLoad              = MO.FGuiTableRankChart_onImageLoad;
   o.onPaintBegin             = MO.FGuiTableRankChart_onPaintBegin;
   o.dispose                  = MO.FGuiTableRankChart_dispose;
   o._background              = null;
   o.setData                  = MO.FGuiTableRankChart_setData;
   o.drawLine                 = MO.FGuiTableRankChart_drawLine;
   //..........................................................
   return o;
}
MO.FGuiTableRankChart_drawLine = function FGuiTableRankChart_drawLine(graphic, rectangle, dataheigt, minValue,maxValue, code, color, lineWidth){
   var o = this;
   var handle = graphic._handle;
   handle.beginPath();
   var units = o._data.days();
   var count = units.count();
   // 计算步宽
   var left = rectangle.left + 140;
   var top = rectangle.top;
   var width = rectangle.width - 180;
   var height = dataheigt ;
   var stepWidth = width / count;
   var stepHeight = dataheigt / maxValue;
   for(var n = 0; n < count; n++){
      var unit = units.at(n);
      var x = left + stepWidth * n;
      var y = top + height - stepHeight * unit[code]+35;
      if(n == 0){
         handle.moveTo(x, y);
      }else{
         // if(unit[code]!=0)
         handle.lineTo(x, y);
      }
   }
   handle.lineWidth = lineWidth;
   handle.strokeStyle = color;
   handle.stroke();

}
//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiTableRankChart_construct = function FGuiTableRankChart_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);

   //o._data = MO.Class.create(MO.FGuiTableRankChartData);
}

MO.FGuiTableRankChart_setup = function FGuiTableRankChart_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   //上部图表
   var image = o._background = imageConsole.load('{eai.resource}/cockpit/achievement/NextLogo.png');
   image.addLoadListener(o, o.onImageLoad);
}

MO.FGuiTableRankChart_onImageLoad = function FGuiTableRankChart_onImageLoad() {
   this.dirty();
}

MO.FGuiTableRankChart_onPaintBegin = function FGuiTableRankChart_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);

   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var data = o._data ;
   var dataheigt = height/2;
   graphic.drawRectangle(left, top, width, height, '#ffffff', 3);
   if(!data){
      return;
   }
   var units = data.days();
   var count = units._count;
   var maxValue =0;
   var minValue =0;
   var maxValueInvest =0;
   var minValueInvest =0;
   for(var i=0;i<count;i++){
      var day = units.at(i);
      maxValueInvest = Math.max(day.priorInvestmentAmount(), maxValueInvest);
      maxValueInvest = Math.max(day.priorRedemptionAmount(), maxValueInvest);
      minValueInvest = Math.min(day.priorNetinvestmentAmount(), minValueInvest);
      maxValueInvest = Math.max(day.investmentAmount(), maxValueInvest);
      maxValueInvest = Math.max(day.redemptionAmount(), maxValueInvest);
      minValueInvest = Math.min(day.netinvestmentAmount(), minValueInvest);
   }
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorInvestmentAmount', '#4b5e6f', 2);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorRedemptionAmount', '#80a861', 2);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_priorNetinvestmentAmount', '#947b91', 2);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_investmentAmount', '#51c0db', 3);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_redemptionAmount', '#68f34e', 3);
   o.drawLine(graphic, rectangle, dataheigt, minValue, maxValueInvest, '_netinvestmentAmount', '#9b1933', 3);
}

MO.FGuiTableRankChart_setData = function FGuiTableRankChart_setData(data) {
   var o = this;
   var data = o._data = data;
}

MO.FGuiTableRankChart_dispose = function FGuiTableRankChart_dispose() {
   var o = this;
   o.__base.FGuiControl.dispose.call(o);
}