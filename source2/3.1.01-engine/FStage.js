with(MO){
   //==========================================================
   // <T>舞台对象。</T>
   //
   // @class
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FStage = function FStage(o){
      o = RClass.inherits(this, o, FComponent, MListenerEnterFrame, MListenerLeaveFrame);
      //..........................................................
      // @attribute
      o._statusActive   = false;
      o._layers         = null;
      o._timer          = null;
      //..........................................................
      // @event
      o.onProcess       = FStage_onProcess;
      //..........................................................
      // @method
      o.construct       = FStage_construct;
      // @method
      o.timer           = FStage_timer;
      o.registerLayer   = FStage_registerLayer;
      o.unregisterLayer = FStage_unregisterLayer;
      o.layers          = FStage_layers;
      o.active          = FStage_active;
      o.deactive        = FStage_deactive;
      o.process         = FStage_process;
      // @method
      o.dispose         = FStage_dispose;
      return o;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_onProcess = function FStage_onProcess(){
      var o = this;
      // 舞台处理
      var s = o._layers;
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.valueAt(i).process();
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_construct = function FStage_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      // 设置变量
      o._timer = RClass.create(FTimer);
      o._layers = new TDictionary();
   }

   //==========================================================
   // <T>获得计时器。</T>
   //
   // @method
   // @return FTimer 计时器
   //==========================================================
   MO.FStage_timer = function FStage_timer(){
      return this._timer;
   }

   //==========================================================
   // <T>注册一个显示层。</T>
   //
   // @method
   // @param n:name:String 名称
   // @param l:layer:FDisplayLayer 显示层
   //==========================================================
   MO.FStage_registerLayer = function FStage_registerLayer(n, l){
      l.setCode(n);
      this._layers.set(n, l);
   }

   //==========================================================
   // <T>注销一个显示层。</T>
   //
   // @method
   // @param n:name:String 名称
   //==========================================================
   MO.FStage_unregisterLayer = function FStage_unregisterLayer(n){
      this._layers.set(n, null);
   }

   //==========================================================
   // <T>获得层次集合。</T>
   //
   // @method
   // @return TDictionary 层次集合
   //==========================================================
   MO.FStage_layers = function FStage_layers(){
      return this._layers;
   }

   //==========================================================
   // <T>激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_active = function FStage_active(){
      var o = this;
      // 设置状态
      o._statusActive = true;
      // 层集合处理
      var ls = o._layers;
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).active();
      }
   }

   //==========================================================
   // <T>取消激活处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_deactive = function FStage_deactive(){
      var o = this;
      // 层集合处理
      var ls = o._layers;
      var c = ls.count();
      for(var i = 0; i < c; i++){
         ls.value(i).deactive();
      }
      // 设置状态
      o._statusActive = false;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_process = function FStage_process(){
      var o = this;
      // 设置计时器
      var t = o._timer;
      if(!t){
         t = RClass.create(FTimer);
         t.setup();
      }
      //..........................................................
      // 前处理
      o.processEnterFrameListener(o);
      // 逻辑处理
      o.onProcess();
      // 后处理
      o.processLeaveFrameListener(o);
      //..........................................................
      // 计时器更新
      t.update();
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FStage_dispose = function FStage_dispose(){
      var o = this;
      o._timer = RObject.dispose(o._timer);
      o._layers = RObject.dispose(o._layers);
      // 父处理
      o.__base.MListenerEnterFrame.dispose.call(o);
      o.__base.MListenerLeaveFrame.dispose.call(o);
      o.__base.FComponent.dispose.call(o);
   }
}