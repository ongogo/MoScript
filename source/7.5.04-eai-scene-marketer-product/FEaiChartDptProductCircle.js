//==========================================================
// <T>产品甜甜圈。</T>
//
// @class
// @author sunpeng
// @version 150630
//==========================================================
MO.FEaiChartMktProductCircle = function FEaiChartMktProductCircle(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   // o._startTime        = MO.Class.register(o, new MO.AGetSet('_startTime'));
   // o._endTime          = MO.Class.register(o, new MO.AGetSet('_endTime'));
    o._ready            = false;
   // o._investmentTotal  = 0;
   // o._intervalMiniute  = 10;
   // @attribute
   // o._baseHeight = 5;
   // o._degreeLineHeight = MO.Class.register(o, new MO.AGetSet('_degreeLineHeight'), 10);
   // o._triangleWidth    = MO.Class.register(o, new MO.AGetSet('_triangleWidth'), 10);
   // o._triangleHeight   = MO.Class.register(o, new MO.AGetSet('_triangleHeight'), 12);
   // o._decoLineGap      = MO.Class.register(o, new MO.AGetSet('_decoLineGap'), 10);
   // o._decoLineWidth    = MO.Class.register(o, new MO.AGetSet('_decoLineWidth'), 30);
   o._circleRadius     = MO.Class.register(o, new MO.AGetSet('_circleRadius'), 10);
   o._circleAngle      = MO.Class.register(o, new MO.AGetSet('_circleAngle'), 0);
   o._trendInfo        = MO.Class.register(o, new MO.AGetSet('_trendInfo'));
   o._TenderBef        = MO.Class.register(o, new MO.AGetSet('_TenderBef'));
   //..........................................................
   // @event
   o.oeUpdate          = MO.FEaiChartMktProductCircle_oeUpdate;
   //..........................................................
   // @method
   o.construct         = MO.FEaiChartMktProductCircle_construct;
  // o.sync              = MO.FEaiChartMktProductCircle_sync;
   // o.drawTrend         = MO.FEaiChartMktProductCircle_drawTrend;
   o.onPaintBegin      = MO.FEaiChartMktProductCircle_onPaintBegin;
   o.on24HDataFetch    = MO.FEaiChartMktProductCircle_on24HDataFetch;  
   return o;
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
MO.FEaiChartMktProductCircle_construct = function FEaiChartMktProductCircle_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   o._TenderBef = new Array(6);
   o._TenderBef = [0,0,0,0,0,0];
   o._trendInfo = MO.Class.create(MO.FEaiLogicInfoTender);
}

//==========================================================
// <T>更新时间。</T>
//
// @method
//==========================================================
// MO.FEaiChartMktProductCircle_sync = function FEaiChartMktProductCircle_sync() {
//    var o = this;
//    if (!o._ready) {
//       return;
//    }
//    var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
//    if(!systemLogic.testReady()){
//       return;
//    }
//    var currentDate = systemLogic.currentDate();
//    currentDate.truncMinute(o._intervalMiniute);
//    // 设置开始时间
//    var startTime = o._startTime;
//    startTime.assign(currentDate);
//    startTime.addDay(-1);
//    // 设置结束时间
//    var endTime = o._endTime;
//    endTime.assign(currentDate);
//    // 发送数据
//    var statisticsLogic = MO.Console.find(MO.FEaiLogicConsole).statistics();
//    statisticsLogic.department().doMarketerTrend(o, o.on24HDataFetch, startTime.format(), endTime.format());
// }

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
// MO.FEaiChartMktProductCircle_on24HDataFetch = function FEaiChartMktProductCircle_on24HDataFetch(event) {
//    var o = this;
//    // 读取数据
//    o._trendInfo.unserializeSignBuffer(event.sign, event.content, true);
//    // 脏处理
//   // o.dirty();
// }

//==========================================================
// <T>更新处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartMktProductCircle_oeUpdate = function FEaiChartMktProductCircle_oeUpdate(event) {
   var o = this;
   o.__base.FGuiControl.oeUpdate.call(o, event);
   // 更新内容
   if (o._ready) {
      return;
   } 
   var systemLogic = MO.Console.find(MO.FEaiLogicConsole).system();
   if (systemLogic.testReady()) {
      o._ready = true;
     // o.sync();
   }
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
// MO.FEaiChartMktProductCircle_drawTrend = function FEaiChartMktProductCircle_drawTrend(graphic, propertyName, dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, bottomColor, topColor){
//    var o = this;
//    var startTime = o._startTime;
//    var units = o._trendInfo.units();
//    var count = units.count();
//    var unitFirst = units.first();
//    var handle = graphic._handle;
//    handle.lineCap = 'round';
//    // 找到最大
//    var pixPer10k = dataHeight * 10000 / maxAmount;
//    var amount = unitFirst[propertyName];
//    var lastX = dataLeft;
//    var lastY = dataBottom - amount / 10000 * pixPer10k;
//    // 绘制曲线
//    handle.beginPath();
//    handle.moveTo(lastX, lastY);
//    var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Investment);
//    for(var i = 1; i < count; i++){
//       var unit = units.get(i);
//       var value = unit[propertyName];
//       startTime.parseAuto(unit.recordDate());
//       startTime.refresh();
//       var degreeSpan = startTime.date.getTime() - bakTime;
//       var x = dataLeft + (dataRight - dataLeft) * (degreeSpan / timeSpan);
//       var y = dataBottom - value / 10000 * pixPer10k;
//       y -= o._baseHeight;
//       handle.lineTo(x, y);
//    }
//    var hexColor = MO.Lang.Hex.format(rateResource.findRate(0));
//    //var bottomColor = '#' + hexColor.substring(2);
//    var opBottomColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
//    var hexColor = MO.Lang.Hex.format(rateResource.findRate(1));
//    //var topColor = '#' + hexColor.substring(2);
//    var opTopColor = 'rgba(' + MO.Lang.Hex.parse(hexColor.substring(2, 4)) + ',' + MO.Lang.Hex.parse(hexColor.substring(4, 6)) + ',' + MO.Lang.Hex.parse(hexColor.substring(6, 8)) + ',' + '0.5)';
//    var gradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
//    gradient.addColorStop('0', bottomColor);
//    gradient.addColorStop('1', topColor);
//    var opGradient = graphic.createLinearGradient(0, dataBottom, 0, dataTop);
//    opGradient.addColorStop('0', opBottomColor);
//    opGradient.addColorStop('1', opTopColor);
//    handle.strokeStyle = gradient;
//    handle.lineWidth = 4;
//    handle.stroke();
//    //handle.fillStyle = opGradient;
//    //handle.lineTo(x, dataBottom);
//    //handle.lineTo(dataLeft, dataBottom);
//    //handle.lineTo(dataLeft, lastY);
//    //handle.fill();
// }

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiChartMktProductCircle_onPaintBegin = function FEaiChartMktProductCircle_onPaintBegin(event) {
   var o = this;
   if(!o._ready){
      return;
   }
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var top = rectangle.top;
   var bottom = rectangle.top + rectangle.height;

   var decoLeft = rectangle.left + 5;
   var decoRight = rectangle.left + rectangle.width - 5;
    var ss = o.circleAngle();
    o.setCircleAngle(ss+10000);
    var ss = o.circleAngle();
    var units =  o._trendInfo.units();
    // for (var i =0;i<5;i++ ){
    //   var s = o._TenderBef[i]=i;
    // }
    var productRadius = rectangle.height/units.count()*5/12;
    var airRadius     = rectangle.height/units.count()* 11/36;
    var productInterval = rectangle.height/units.count()*1/9;
    var tendRate =0;
    var unitsCount = units.count();
    var BefCount =0;
    var tenderInvesment=0;
    var tenderTotal=0;
    var persentRate=0;
    var lable='' ;
    var productText ='';
    var yearRate = '';
    var dayLable ='';
    var tatolLable = '';
    if(units){
    for(var i=0;i<unitsCount;i++){
        var unit = units.get(i);
         BefCount = o._TenderBef[i];
         tenderInvesment = unit.tenderInvesment();
         tenderTotal = unit.tenderTotal();
         if(BefCount>= tenderInvesment){
             BefCount = tenderInvesment;
             o._TenderBef[i] =BefCount;
         }else{
             BefCount += 1000000;
             o._TenderBef[i] =BefCount;
         }
         tendRate = BefCount/tenderTotal;
         persentRate = (tenderInvesment/tenderTotal).toFixed(2)*100;;
         graphic._handle.beginPath();
         graphic._handle.arc(decoLeft+200,top+productRadius+productInterval+i*(2*productRadius+productInterval), productRadius,0*Math.PI,2*Math.PI);
         graphic._handle.closePath();
         graphic._handle.strokeStyle = '#54F0FF';
         graphic._handle.stroke();
         graphic._handle.beginPath();
         graphic._handle.arc(decoLeft+200,top+productRadius+productInterval+i*(2*productRadius+productInterval), airRadius,0*Math.PI,2*Math.PI,false);
         graphic._handle.closePath();
         graphic._handle.strokeStyle = '#FFF0FF';
         graphic._handle.stroke();
         graphic._handle.beginPath();
         graphic._handle.arc(decoLeft+200,top+productRadius+productInterval+i*(2*productRadius+productInterval), productRadius,0*Math.PI-Math.PI/2,2*Math.PI*tendRate-Math.PI/2,false);
         graphic._handle.arc(decoLeft+200,top+productRadius+productInterval+i*(2*productRadius+productInterval), airRadius,2*Math.PI*tendRate-Math.PI/2,0*Math.PI-Math.PI/2,true);
         graphic._handle.closePath();
         graphic._handle.fillStyle = '#54F0FF';
         graphic._handle.fill();
         graphic.setFont('20px Microsoft YaHei');
         lable = persentRate+'%';
         graphic.drawText(lable, decoLeft+200, top+productRadius+productInterval+i*(2*productRadius+productInterval), '#54F0FF');
         yearRate = (unit.rate()).toFixed(2);;
         productText = unit.label();
         graphic.setFont('blod 48px Microsoft YaHei');
         graphic.drawText(productText, decoLeft+300, top+productRadius+productInterval+i*(2*productRadius+productInterval)-60, '#ffF0FF');
         yearRate =  '年化利率 :' + yearRate +'%';
         graphic.setFont('20px Microsoft YaHei');
         graphic.drawText(yearRate, decoLeft+300, top+productRadius+productInterval+i*(2*productRadius+productInterval), '#54F0FF');
         tatolLable = (unit.invesmentTotal()/100000000).toFixed(2);
         lable = '总计:'+"   "+tatolLable+'亿';
         graphic.drawText(lable, decoLeft+300, top+productRadius+productInterval+i*(2*productRadius+productInterval)-30, '#54F0FF');
         dayLable  = unit.invesmentDay()/100000000;
         lable = '当日'+"    "+dayLable+'亿';
         graphic.drawText(lable, decoLeft+300, top+productRadius+productInterval+i*(2*productRadius+productInterval)+60, '#54F0FF');


        //if( unit.code()= "newnianxiang")


     }
   }

   //  graphic._handle.beginPath();
   //  for(var i=0;i<4;i++){
   // graphic._handle.beginPath();
   // graphic._handle.arc(decoLeft+100,top+100+i*rectangle.height/4, 100,0*Math.PI,2*Math.PI);
   // graphic._handle.closePath();
   // graphic._handle.strokeStyle = '#54F0FF';
   // graphic._handle.stroke();
   // graphic._handle.beginPath();
   // graphic._handle.arc(decoLeft+100,top+100+i*rectangle.height/4, 70,0*Math.PI,2*Math.PI,false);
   // graphic._handle.closePath();
   // graphic._handle.strokeStyle = '#FFF0FF';
   // graphic._handle.stroke();
   // graphic._handle.beginPath();
   // graphic._handle.arc(decoLeft+100,top+100+i*rectangle.height/4, 100,0*Math.PI,2*Math.PI*o.circleAngle()/500,false);
   // graphic._handle.arc(decoLeft+100,top+100+i*rectangle.height/4, 70,2*Math.PI*o.circleAngle()/500,0*Math.PI,true);
   // graphic._handle.closePath();
   // graphic._handle.fillStyle = '#54F0FF';
   // graphic._handle.fill();
   //  }
    if(o.circleAngle()/500==1){
      o.setCircleAngle(0);
    }

}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
//MO.FEaiChartMktProductCircle_onPaintBegin = function FEaiChartMktProductCircle_onPaintBegin(event) {
//    var o = this;
//    if (!o._ready) {
//       return;
//    }
//    o.__base.FGuiControl.onPaintBegin.call(o, event);
//    var graphic = event.graphic;
//    var rectangle = event.rectangle;

//    var top = rectangle.top;
//    var bottom = rectangle.top + rectangle.height;
//    var middle = bottom - 30;

//    var decoLeft = rectangle.left + 5;
//    var decoRight = rectangle.left + rectangle.width - 5;
//    var decoLineMargin = o.triangleWidth() + o.decoLineGap();
//    // 绘制左右三角及轴延长部分
//    graphic.drawTriangle(decoLeft, middle, decoLeft + o.triangleWidth(), middle + o.triangleHeight() / 2, decoLeft + o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
//    graphic.drawTriangle(decoRight, middle, decoRight - o.triangleWidth(), middle + o.triangleHeight() / 2, decoRight - o.triangleWidth(), middle - o.triangleHeight() / 2, 1, '#F8CB3D', '#F8CB3D');
//    graphic.drawLine(decoLeft + decoLineMargin, middle, decoLeft + decoLineMargin + o.decoLineWidth(), middle, '#F8CB3D', 3);
//    graphic.drawLine(decoRight - decoLineMargin, middle, decoRight - decoLineMargin - o.decoLineWidth(), middle, '#F8CB3D', 3);
//    var dataLeft = decoLeft + decoLineMargin + o.decoLineWidth();
//    var dataRight = decoRight - decoLineMargin - o.decoLineWidth();
//    var dataTop = top + 60;
//    var dataBottom = bottom - 30;
//    var dataHeight = dataBottom - dataTop;
//    // 主轴
//    graphic.drawLine(dataLeft, middle, dataRight, middle, '#F8CB3D', 3);
//    // 刻度
//    var startTime = o.startTime();
//    var endTime = o.endTime();
//    var timeSpan = endTime.date.getTime() - startTime.date.getTime();
//    var bakTime = startTime.date.getTime();
//    var text;
//    var drawText = false;
//    var textWidth = 0;
//    while (!startTime.isAfter(endTime)) {
//       var span = startTime.date.getTime() - bakTime;
//       var x = dataLeft + (dataRight - dataLeft) * (span / timeSpan);
//       graphic.drawLine(x, middle - o.degreeLineHeight(), x, middle, '#FFFFFF', 1);
//       text = startTime.format('HH24:00');
//       startTime.addHour(1);
//       drawText = !drawText;
//       if (drawText) {
//          graphic.setFont('bold 20px Microsoft YaHei');
//          textWidth = graphic.textWidth(text);
//          graphic.drawText(text, x - textWidth / 2, middle + 20, '#59FDE9');
//       }

//    }
//    startTime.date.setTime(bakTime);
//    startTime.refresh();
//    // 曲线
//    var trendInfo = o._trendInfo;
//    var units = trendInfo.units();
//    if(!units){
//       return;
//    }
//    if(units.isEmpty()){
//       return;
//    }
//    var unitFirst = units.first();
//    // 找到最大数值
//    var maxAmount = 0;
//    var count = units.count();
//    for (var i = 0; i < count; i++) {
//       var unit = units.get(i);
//       var investment = unit.investment();
//       if (investment > maxAmount) {
//          maxAmount = investment;
//       }
//       var redemption = unit.redemption();
//       if (redemption > maxAmount) {
//          maxAmount = redemption;
//       }
//    }
//    o.drawTrend(graphic, '_investment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FF8800', '#FF0000');
//    o.drawTrend(graphic, '_redemption', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#0088FF', '#0000FF');
//    //o.drawTrend(graphic, '_netinvestment', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#00FF00');
//    //o.drawTrend(graphic, '_interest', dataLeft, dataTop, dataRight, dataBottom, dataHeight, bakTime, timeSpan, maxAmount, '#FFFFFF');
//    // 完成
//    startTime.date.setTime(bakTime);
//    startTime.refresh();
//    // 统计
//    var lastHour = -1;
//    var hourInves = 0;
//    var maxHourInves = 0;
//    startTime.parseAuto(unitFirst.recordDate());
//    startTime.refresh();
//    lastHour = startTime.date.getHours();
//    for (var i = 0; i < count; i++) {
//       var unit = units.get(i);
//       startTime.parseAuto(unit.recordDate());
//       startTime.refresh();
//       var hour = startTime.date.getHours();
//       if (lastHour == hour) {
//          hourInves += unit.redemption();
//       }else{
//          if(hourInves > maxHourInves){
//             maxHourInves = hourInves;
//             hourInves = 0;
//          }
//          lastHour = hour;
//       }
//    }
//    // 输出数据文本
//    graphic.setFont('24px Microsoft YaHei');
//    graphic.drawText("24H数据曲线", decoLeft, top, '#54F0FF');
//    // 输出数据文本
//    graphic.setFont('22px Microsoft YaHei');
//    var rowStart = top + 30;
//    var rowHeight = 22;
//    // 计算宽度
//    var textWidth = graphic.textWidth('投资总计：');
//    var investmentTotalText = MO.Lang.Float.unitFormat(trendInfo.investmentTotal(), 0, 0, 2, 0, 10000, '万');
//    var investmentTotalWidth = graphic.textWidth(investmentTotalText);
//    var redemptionTotalText = MO.Lang.Float.unitFormat(trendInfo.redemptionTotal(), 0, 0, 2, 0, 10000, '万');
//    var redemptionTotalWidth = graphic.textWidth(redemptionTotalText);
//    var netinvestmentTotalText = MO.Lang.Float.unitFormat(trendInfo.netinvestmentTotal(), 0, 0, 2, 0, 10000, '万');
//    var netinvestmentTotalWidth = graphic.textWidth(netinvestmentTotalText);
//    var interestTotalText = MO.Lang.Float.unitFormat(trendInfo.interestTotal(), 0, 0, 2, 0, 10000, '万');
//    var interestTotalWidth = graphic.textWidth(interestTotalText);
//    var maxWidth = Math.max(Math.max(Math.max(investmentTotalWidth, redemptionTotalWidth), netinvestmentTotalWidth), interestTotalWidth);
//    // 绘制文字
//    graphic.drawText('投资总额：', decoLeft, rowStart + rowHeight * 0, '#00CFFF');
//    graphic.drawText(investmentTotalText, decoLeft + textWidth + maxWidth - investmentTotalWidth, rowStart + rowHeight * 0, '#00B5F6');
//    graphic.drawText('赎回总额：', decoLeft, rowStart + rowHeight * 1 + 5, '#00CFFF');
//    graphic.drawText(redemptionTotalText, decoLeft + textWidth + maxWidth - redemptionTotalWidth, rowStart + rowHeight * 1 + 5, '#00B5F6');
//    graphic.drawText('净投总额：', decoLeft, rowStart + rowHeight * 2 + 10, '#00CFFF');
//    graphic.drawText(netinvestmentTotalText, decoLeft + textWidth + maxWidth - netinvestmentTotalWidth, rowStart + rowHeight * 2 + 10, '#00B5F6');
//    graphic.drawText('利息总额：', decoLeft, rowStart + rowHeight * 3 + 15, '#00CFFF');
//    graphic.drawText(interestTotalText, decoLeft + textWidth + maxWidth - interestTotalWidth, rowStart + rowHeight * 3 + 15, '#00B5F6');
//    // 设置时间
//    startTime.date.setTime(bakTime);
//    startTime.refresh();
// }
