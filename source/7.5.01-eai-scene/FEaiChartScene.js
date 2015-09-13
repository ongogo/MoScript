//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.Class.inherits(this, o, MO.FEaiScene);
   //..........................................................
   // @attribute
   o._optionMapCountry     = true;
   o._optionMapCity3d      = false;
   o._readyProvince        = false;
   o._countryReady         = false;
   // @attribute
   o._nowDate              = null;
   o._nowTicker            = null;
   // @attribute
   o._mapEntity            = null;
   o._citysRangeRenderable = null;
   o._citysRenderable      = null;
   // @attribute
   o._flagSprite           = null;
   o._southSea             = null;
   o._groundAutio          = null;
   //..........................................................
   // @event
   o.onLoadTemplate        = MO.FEaiChartScene_onLoadTemplate;
   o.onProcess             = MO.FEaiChartScene_onProcess;
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartScene_construct;
   // @method
   o.fixMatrix             = MO.FEaiChartScene_fixMatrix;
   o.setup                 = MO.FEaiChartScene_setup;
   // @method
   o.active                = MO.FEaiChartScene_active;
   o.resetDate             = MO.FEaiChartScene_resetDate;
   o.processResize         = MO.FEaiChartScene_processResize;
   o.deactive              = MO.FEaiChartScene_deactive;
   // @method
   o.dispose               = MO.FEaiChartScene_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartScene_onLoadTemplate = function FEaiChartScene_onLoadTemplate(event){
   var o = this;
   var template = event.template;
   //var sprite = o._flagSprite = template.sprite();
   //var matrix = sprite.matrix();
   //matrix.tx = -20;
   //matrix.ty = 0;
   //matrix.setScaleAll(0.06);
   //matrix.updateForce();
   //o._activeStage.dataLayer().push(sprite);
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_onProcess = function FEaiChartScene_onProcess(){
   var o = this;
   o.__base.FEaiScene.onProcess.call(o);
   // 检查国家准备好
   if(!o._countryReady){
      var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
      if(entityConsole.testCountryReady()){
         o._countryReady = true;
         // 重置画面大小
         o.processResize();
      }
   }
   // 更新精灵
   //if(o._flagSprite){
   //   var matrix = o._flagSprite.matrix();
   //   matrix.ry += 0.005;
   //   matrix.updateForce();
   //}
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_construct = function FEaiChartScene_construct(){
   var o = this;
   o.__base.FEaiScene.construct.call(o);
   // 创建属性
   o._nowDate = new MO.TDate();
   o._nowTicker = new MO.TTicker(10000);
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_fixMatrix = function FEaiChartScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -35;
   matrix.ty = -12.3;
   matrix.tz = 0;
   matrix.setScale(0.32, 0.36, 0.32);
   matrix.update();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_setup = function FEaiChartScene_setup(){
   var o = this;
   o.__base.FEaiScene.setup.call(o);
   // 获得实体控制台
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   entityConsole.linkGraphicContext(o);
   entityConsole._option3d = o._optionMapCity3d;
   entityConsole.setup();
   var mapEntity = o._mapEntity = entityConsole.mapEntity();
   // 创建舞台
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
   // 创建地图容器
   var display = mapEntity.countryFaceDisplay();
   o.fixMatrix(display.matrix());
   stage.mapLayer().pushDisplay(display);
   var display = mapEntity.countryBorderDisplay();
   o.fixMatrix(display.matrix());
   stage.borderLayer().pushDisplay(display);
   //..........................................................
   // 创建城市范围渲染对象
   var cityRangeRenderable = mapEntity.cityRangeRenderable();
   o.fixMatrix(cityRangeRenderable.matrix());
   stage.cityRangeLayer().push(cityRangeRenderable);
   // 创建城市中心渲染对象
   var cityCenterRenderable = mapEntity.cityCenterRenderable();
   o.fixMatrix(cityCenterRenderable.matrix());
   stage.cityLayer().push(cityCenterRenderable);
   //..........................................................
   // 刷新系统信息
   var systemConsole = MO.Console.find(MO.FEaiLogicConsole).system();
   systemConsole.refresh();
   //..........................................................
   // 加载背景音乐
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   var audio = o._groundAutio = audioConsole.load('{eai.resource}-{device.type}/chart/ground.mp3');
   audio.setLoop(true);
   audio.setVolume(0.2);
//   audio.play();
   //..........................................................
   // 创建南海
   if(o._optionMapCountry){
      var control = o._southSea = MO.Class.create(MO.FGuiPicture);
      control.setDisplayOrder(-10);
      control.size().set(134, 203);
      control.setBackResource('url:{eai.resource}/south-sea.png');
      control.psInitialize();
      control.build();
      o._guiManager.register(control);
   }
   //..........................................................
   // 创建背景
   //var control = o._background = MO.Class.create(MO.FGuiPicture);
   //control.linkGraphicContext(o);
   //control.size().assign(MO.Eai.Canvas.screenSize());
   //control.size().set(1920, 1080);
   //control.setBackResource('url:/script/ars/eai/background.png');
   //control.psInitialize();
   //control.build();
   //control.renderable().setOptionFull(true);
   //o._guiManager.register(control);
   //stage.groundLayer().push(control);
   //..........................................................
   // 加载标志
   //var templateConsole = MO.Console.find(MO.FE3dTemplateConsole);
   //template = templateConsole.allocByCode(o, 'eai.flag.ezubao');
   //template.addLoadListener(o, o.onLoadTemplate);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}

//==========================================================
// <T>重置时间。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_resetDate = function FEaiChartScene_resetDate(){
   var o = this;
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartScene_processResize = function FEaiChartScene_processResize(){
   var o = this;
   o.__base.FEaiScene.processResize.call(o);
   // 重新设置矩阵
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   var mapEntity = entityConsole.mapEntity();
   o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
   o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
   o.fixMatrix(mapEntity.cityRangeRenderable().matrix());
   o.fixMatrix(mapEntity.cityCenterRenderable().matrix());
}

//==========================================================
// <T>取消激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_deactive = function FEaiChartScene_deactive(){
   var o = this;
   o.__base.FEaiScene.deactive.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._nowDate = RObject.dispose(o._nowDate);
   o._nowTicker = RObject.dispose(o._nowTicker);
   o._mapEntity = null;
   // 父处理
   o.__base.FEaiScene.dispose.call(o);
}
