//==========================================================
// <T>号令表格。</T>
//
// @class
// @author sunpeng
// @history 151104
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot = function FEaiCockpitModuleNoticeSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._noticeData           = null;
   o._dataTicker           = null;
   o._noticeListBox        = null;
   o._bgImage              = null;
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitModuleNoticeSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleNoticeSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleNoticeSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitModuleNoticeSnapshot_processLogic;
   o.onNoticeFetch         = MO.FEaiCockpitModuleNoticeSnapshot_onNoticeFetch;
   // @method
   o.dispose               = MO.FEaiCockpitModuleNoticeSnapshot_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_onPaintBegin = function FEaiCockpitModuleNoticeSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   // 绘制背景
   graphic.drawImage(o._bgImage, left, top, width, height);
   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_construct = function FEaiCockpitModuleNoticeSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(3, 5, 0);
   o._cellSize.set(8, 2);
   o._noticeData = MO.Class.create(MO.FEaiCockpitDataNotice);
   o._dataTicker = new MO.TTicker(1000 * 60);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_setup = function FEaiCockpitModuleNoticeSnapshot_setup(){
   var o = this;
   // 加载背景图
   o._bgImage = o.loadResourceImage('{eai.resource}/cockpit/notice/ground.png');
   // 创建控件
   var listBox = o._noticeListBox = MO.Class.create(MO.FGuiListBox);
   listBox.setDisplayCount(4);
   listBox.setGap(5);
   listBox.setPadding(12, 12, 12, 12);
   listBox.setLocation(50, 0);
   listBox.setSize(900, 120 * 4);
   o.push(listBox);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_processLogic = function FEaiCockpitModuleNoticeSnapshot_processLogic() {
   var o = this;
   if (o._dataTicker.process()) {
      var notice = MO.Console.find(MO.FEaiLogicConsole).cockpit().notice();
      notice.doFetch(o, o.onNoticeFetch);
   }
   if (o._noticeListBox.animationPlaying()) {
      o.dirty();
   }
}

//==========================================================
// <T>获取业绩数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_onNoticeFetch = function FEaiCockpitModuleNoticeSnapshot_onNoticeFetch(event) {
   var o = this;
   var content = event.content;
   // 读取数据
   var listBox = o._noticeListBox;
   var data = o._noticeData;
   if(data.unserializeSignBuffer(event.sign, event.content, true)){
      var notices = o._noticeData.notices();
      var count = notices.count();
      listBox.clear();
      for (var i = 0; i < count; i++) {
         var noticeItem = MO.Class.create(MO.FEaiCockpitNoticeListBoxItem);
         noticeItem.setup(notices.at(i));
         noticeItem.setSize(880, 80);
         listBox.push(noticeItem);
      }
      listBox.setStartTick(MO.Timer.current());
      listBox.setAnimationPlaying(true);
      o.dirty();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleNoticeSnapshot_dispose = function FEaiCockpitModuleNoticeSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}