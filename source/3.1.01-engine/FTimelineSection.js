//==========================================================
// <T>时间线段落。</T>
//
// @class
// @author maocy
// @history 151112
//==========================================================
MO.FTimelineSection = function FTimelineSection(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MTimelineActions);
   //..........................................................
   // @method
   o.construct = MO.FTimelineSection_construct;
   // @method
   o.stop      = MO.FTimelineSection_stop;
   o.clear     = MO.FTimelineSection_clear;
   // @method
   o.dispose   = MO.FTimelineSection_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FTimelineSection_construct = function FTimelineSection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MTimelineActions.construct.call(o);
}

//==========================================================
// <T>停止处理。</T>
//
// @method
//==========================================================
MO.FTimelineSection_stop = function FTimelineSection_stop(){
   var o = this;
   o.__base.MTimelineActions.stop.call(o);
}

//==========================================================
// <T>清空处理。</T>
//
// @method
//==========================================================
MO.FTimelineSection_clear = function FTimelineSection_clear(){
   var o = this;
   o.__base.MTimelineActions.clear.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FTimelineSection_dispose = function FTimelineSection_dispose(){
   var o = this;
   // 父处理
   o.__base.MTimelineActions.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}