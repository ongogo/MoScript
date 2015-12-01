﻿//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectModuleManager = function FEaiCockpitProjectModuleManager(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitModuleManager);
   //..........................................................
   // @attribute
   o._catalogModule   = MO.Class.register(o, new MO.AGetter('_catalogModule'));
   o._scoreModule     = MO.Class.register(o, new MO.AGetter('_scoreModule'));
   // @attribute
   o._statusCd        = 0;
   o._autoPlay        = false;
   //..........................................................
   // @method
   o.construct        = MO.FEaiCockpitProjectModuleManager_construct;
   // @method
   o.setup            = MO.FEaiCockpitProjectModuleManager_setup;
   // @method
   o.dispose          = MO.FEaiCockpitProjectModuleManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectModuleManager_construct = function FEaiCockpitProjectModuleManager_construct(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.construct.call(o);
   // 设置属性
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectModuleManager_setup = function FEaiCockpitProjectModuleManager_setup(){
   var o = this;
   o.__base.FEaiCockpitModuleManager.setup.call(o);
   var display = o._display;
   var snapshotDisplay = o._snapshotDisplay;
   var viewDisplay = o._viewDisplay;
   //..........................................................
   // 创建模块
   o._logic001Module = o.createModule(MO.FEaiCockpitProjectLogic001);
   o._logic002Module = o.createModule(MO.FEaiCockpitProjectLogic002);
   o._logic003Module = o.createModule(MO.FEaiCockpitProjectLogic003);
   o._logic004Module = o.createModule(MO.FEaiCockpitProjectLogic004);
   //..........................................................
   var application = o._scene.application();
   var desktop = application.desktop();
   var logicSize = desktop.logicSize();
   var cellWidth = logicSize.width / 16;
   var cellHeight = logicSize.height / 9;
   // 显示模块
   var modules = o._modules;
   var count = modules.count();
   for(var i = 0; i < count; i++){
      var module = modules.at(i);
      var typeCd = module.typeCd();
      // 设置缩略图大小
      var snapshot = module.controlSnapshot();
      var snapshotCellSize = snapshot.cellSize();
      snapshot.size().set(cellWidth * snapshotCellSize.width, cellHeight * snapshotCellSize.height);
      // 设置视图大小
      var view = module.controlView();
      view.size().assign(logicSize);
      // 显示缩略图
      snapshot.cellLocation().z = 10;
      var renderable = snapshot.makeRenderable();
      renderable.material().info().sortLevel = 7;
      snapshot.updateRenderable();
      snapshot.placeInCell();
      snapshotDisplay.pushRenderable(renderable);
      // 显示缩略图
      view.cellLocation().z = 15;
      var renderable = view.makeRenderable();
      renderable.material().info().sortLevel = 6;
      view.updateRenderable();
      view.placeInCell();
      viewDisplay.pushRenderable(renderable);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectModuleManager_dispose = function FEaiCockpitProjectModuleManager_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitModuleManager.dispose.call(o);
}
