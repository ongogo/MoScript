//==========================================================
// <T>舞台对象。</T>
//
// @class
// @author maocy
// @history 150106
//==========================================================
MO.FScene = function FScene(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener, MO.MGraphicObject, MO.MEventDispatcher, MO.MFrameProcessor);
   //..........................................................
   // @attribute
   o._visible             = MO.Class.register(o, new MO.AGetSet('_visible'), true);
   o._code                = MO.Class.register(o, new MO.AGetSet('_code'));
   o._application         = MO.Class.register(o, new MO.AGetSet('_application'));
   o._chapter             = MO.Class.register(o, new MO.AGetSet('_chapter'));
   o._activeStage         = MO.Class.register(o, new MO.AGetSet('_activeStage'));
   // @attribute
   o._statusSetup         = false;
   o._statusActive        = false;
   //..........................................................
   // @event
   o.onProcessBefore      = MO.Method.empty;
   o.onProcess            = MO.FScene_onProcess;
   o.onProcessAfter       = MO.Method.empty;
   //..........................................................
   // @method
   o.construct            = MO.FScene_construct;
   o.setup                = MO.Method.empty;
   // @method
   o.active               = MO.FScene_active;
   o.deactive             = MO.FScene_deactive;
   // @method
   o.processEvent         = MO.FScene_processEvent;
   o.process              = MO.FScene_process;
   // @method
   o.dispose              = MO.FScene_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FScene_onProcess = function FScene_onProcess(){
   var o = this;
   // 前处理
   o.processEnterFrameListener(o._eventEnterFrame);
   // 场景处理
   if(o._activeStage){
      o._activeStage.process();
   }
   // 后处理
   o.processLeaveFrameListener(o._eventLeaveFrame);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FScene_construct = function FScene_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__base.MFrameProcessor.construct.call(o);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FScene_active = function FScene_active(){
   var o = this;
   // 配置处理
   if(!o._statusSetup){
      o.setup();
      o._statusSetup = true;
   }
   // 设置状态
   o._statusActive = true;
   // 大小处理
   o.processResize();
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
MO.FScene_deactive = function FScene_deactive(){
   var o = this;
   // 设置状态
   o._statusActive = false;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FScene_process = function FScene_process(){
   var o = this;
   // 测试状态
   var loader = o._readyLoader;
   if(!loader.testReady()){
      return;
   }
   //..........................................................
   // 检查激活状态
   if(o._statusActive){
      // 前处理
      o.processEnterFrameListener(o._eventEnterFrame);
      // 前逻辑处理
      o.onProcessBefore();
      // 场景处理
      o.onProcess();
      // 场景绘制
      if(o._activeStage){
         o._activeStage.process();
      }
      // 后逻辑处理
      o.onProcessAfter();
      // 后处理
      o.processLeaveFrameListener(o._eventLeaveFrame);
   }
}

//==========================================================
// <T>事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FScene_processEvent = function FScene_processEvent(event){
   var o = this;
   // 处理事件
   o.dispatcherEvent(event);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FScene_dispose = function FScene_dispose(){
   var o = this;
   // 父处理
   o.__base.MFrameProcessor.dispose.call(o);
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
