//==========================================================
// <T>预测指数视图页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitWarningLogic001View = function FEaiCockpitWarningLogic001View(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @event
   o.onPaintBegin = MO.FEaiCockpitWarningLogic001View_onPaintBegin;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitWarningLogic001View_construct;
   // @method
   o.setup        = MO.FEaiCockpitWarningLogic001View_setup;
   o.processLogic = MO.FEaiCockpitWarningLogic001View_processLogic;
   // @method
   o.dispose      = MO.FEaiCockpitWarningLogic001View_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic001View_onPaintBegin = function FEaiCockpitWarningLogic001View_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic001View_construct = function FEaiCockpitWarningLogic001View_construct() {
   var o = this;
   o.__base.FEaiCockpitControlView.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic001View_setup = function FEaiCockpitWarningLogic001View_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic001View_processLogic = function FEaiCockpitWarningLogic001View_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControlView.processLogic.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningLogic001View_dispose = function FEaiCockpitWarningLogic001View_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
