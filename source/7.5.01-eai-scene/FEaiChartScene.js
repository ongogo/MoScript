//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartScene = function FEaiChartScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiScene);
   //..........................................................
   // @attribute
   o._countryData          = null;
   // @attribute
   o._provinceEntities     = MO.Class.register(o, new MO.AGetter('_provinceEntities'));
   o._cityEntities         = MO.Class.register(o, new MO.AGetter('_cityEntities'));
   o._countryBorderDisplay = null;
   o._countryDisplay       = null;
   o._citysRenderables     = null;
   // @attribute
   o._logoBar              = null;
   o._titleBar             = null;
   //..........................................................
   // @event
   o.onLoadData            = MO.FEaiChartScene_onLoadData;
   //..........................................................
   // @method
   o.construct             = MO.FEaiChartScene_construct;
   // @method
   o.fixMatrix             = MO.FEaiChartScene_fixMatrix;
   o.setup                 = MO.FEaiChartScene_setup;
   // @method
   o.active                = MO.FEaiChartScene_active;
   o.process               = MO.FEaiChartScene_process;
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
MO.FEaiChartScene_onLoadData = function FEaiChartScene_onLoadData(event){
   var o = this;
   var countryData = event.sender;
   var context = o.graphicContext();
   var stage = o._activeStage;
   var countryDisplay = o._countryDisplay;
   var countryBorderDisplay = o._countryBorderDisplay;
   //..........................................................
   // 创建省份实体
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var provincesData = countryData.provinces();
   var count = provincesData.count();
   for(var i = 0; i < count; i++){
      provinceData = provincesData.at(i);
      var provinceName = provinceData.name();
      var province = provinceConsole.findByName(provinceName);
      // 创建实体
      var provinceEntity = MO.Class.create(MO.FEaiProvinceEntity);
      provinceEntity.setData(provinceData);
      provinceEntity.build(context);
      o._provinceEntities.set(province.code(), provinceEntity);
      // 放入显示层
      countryDisplay.pushRenderable(provinceEntity.faceRenderable());
      countryBorderDisplay.pushRenderable(provinceEntity.borderRenderable());
   }
   //..........................................................
   // 创建城市实体
   //var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   //var citys = cityConsole.citys();
   //var count = citys.count();
   //var citysRenderables = o._citysRenderables;
   //var citysRangeRenderable = o._citysRangeRenderable;
   //for(var i = 0; i < count; i++){
   //   var city = citys.at(i);
   //   var level = city.level();
   //   var cityLocation = city.location();
   //   // 创建实体
   //   var cityEntity = MO.Class.create(MO.FEaiCityEntity);
   //   cityEntity.setData(city);
   //   cityEntity.build(context);
   //   o._cityEntities.set(city.code(), cityEntity);
   //   // 放入渲染对象
   //   var citysRenderable = citysRenderables.get(level);
   //   citysRenderable.citys().push(cityEntity);
   //   citysRangeRenderable.citys().push(cityEntity);
   //}
   // 上传数据
   //var count = citysRenderables.count()
   //for(var i = 0; i < count; i++){
   //   var citysRenderable = citysRenderables.at(i);
   //   citysRenderable.upload();
   //}
   //citysRangeRenderable.upload();
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
   o._provinceEntities = new MO.TDictionary();
   o._cityEntities = new MO.TDictionary();
   o._citysRenderables = new MO.TDictionary();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_fixMatrix = function FEaiChartScene_fixMatrix(matrix){
   var o = this;
   matrix.tx = -37;
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
   var context = o.graphicContext();
   var contextSize = context.size();
   // 创建舞台
   var stage = o._activeStage = MO.Class.create(MO.FEaiChartStage);
   stage.linkGraphicContext(o);
   stage.region().linkGraphicContext(o);
   stage.region().backgroundColor().set(0, 0, 0, 0);
   // 创建地图容器
   var display = o._countryDisplay = MO.Class.create(MO.FE3dDisplay);
   o.fixMatrix(display.matrix());
   stage.mapLayer().pushDisplay(display);
   var display = o._countryBorderDisplay = MO.Class.create(MO.FE3dDisplay);
   o.fixMatrix(display.matrix());
   stage.borderLayer().pushDisplay(display);
   // 创建背景
   var control = o._background = MO.Class.create(MO.FGuiPicture);
   control.linkGraphicContext(o);
   control.size().assign(MO.Eai.Canvas.screenSize());
   control.setBackResource('url:/script/ars/eai/background.png');
   control.psInitialize();
   control.build();
   o._desktop.register(control);
   stage.groundLayer().push(control);
   //..........................................................
   // 创建城市范围渲染对象
   var citysRangeRenderable = o._citysRangeRenderable = MO.Class.create(MO.FEaiCitysRangeRenderable);
   citysRangeRenderable.linkGraphicContext(o);
   o.fixMatrix(citysRangeRenderable.matrix());
   stage.cityRangeLayer().push(citysRangeRenderable);
   // 创建城市渲染对象
   var citysRenderables = o._citysRenderables;
   for(var i = 4; i >= 1; i--){
      var renderable = MO.Class.create(MO.FEaiCitysRenderable);
      renderable.setLevel(i);
      renderable.linkGraphicContext(o);
      o.fixMatrix(renderable.matrix());
      stage.cityLayer().push(renderable);
      citysRenderables.set(i, renderable);
   }
   // 创建城市实体
   var cityConsole = MO.Console.find(MO.FEaiResourceConsole).cityConsole();
   var citys = cityConsole.citys();
   var cityCount = citys.count();
   for(var i = 0; i < cityCount; i++){
      var city = citys.at(i);
      var level = city.level();
      var cityLocation = city.location();
      // 创建实体
      var cityEntity = MO.Class.create(MO.FEaiCityEntity);
      cityEntity.setData(city);
      cityEntity.build(context);
      o._cityEntities.set(city.code(), cityEntity);
      // 放入渲染对象
      var citysRenderable = citysRenderables.get(level);
      citysRenderable.citys().push(cityEntity);
      citysRangeRenderable.citys().push(cityEntity);
   }
   // 上传数据
   var count = citysRenderables.count()
   for(var i = 0; i < count; i++){
      var citysRenderable = citysRenderables.at(i);
      citysRenderable.setup();
      citysRenderable.upload();
   }
   citysRangeRenderable.setup();
   citysRangeRenderable.upload();
   //..........................................................
   // 显示左上
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.LogoBar');
   frame.setLocation(10, 10);
   stage.faceLayer().push(frame);
   o._desktop.register(frame);
   var currentDate = new MO.TDate();
   var dateControl = frame.findComponent('date');
   dateControl.setLabel(currentDate.format('YYYY/MM/DD'));
   var timeControl = frame.findComponent('time');
   timeControl.setLabel(currentDate.format('HH24:MI'));
   // 显示左上
   //var frame = o._titleBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.TitleBar');
   //frame.setLocation(460, 20);
   //stage.faceLayer().push(frame);
   //o._desktop.register(frame);
   // 显示总计
   var frame = o._totalBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.chart.TotalBar');
   frame.setLocation(590, 10);
   stage.faceLayer().push(frame);
   o._desktop.register(frame);
   // 加载数据
   var country = o._countryData = MO.Class.create(MO.FEaiCountryData);
   country.addLoadListener(o, o.onLoadData);
   country.load();
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
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_active = function FEaiChartScene_active(){
   var o = this;
   o.__base.FEaiScene.active.call(o);
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_process = function FEaiChartScene_process(){
   var o = this;
   o.__base.FEaiScene.process.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiChartScene_dispose = function FEaiChartScene_dispose(){
   var o = this;
   o._provinceEntities = RObject.dispose(o._provinceEntities);
   o._cityEntities = RObject.dispose(o._cityEntities);
   // 父处理
   o.__base.FEaiScene.dispose.call(o);
}
