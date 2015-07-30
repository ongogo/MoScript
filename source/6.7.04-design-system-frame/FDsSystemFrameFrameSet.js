//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FDsSystemFrameFrameSet = function FDsSystemFrameFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemDesignFrameSet);
   //..........................................................
   // @property
   o._frameName   = 'system.design.frame.FrameSet';
   //..........................................................
   // @process
   o.onBuilded    = MO.FDsSystemFrameFrameSet_onBuilded;
   //..........................................................
   // @method
   o.construct    = MO.FDsSystemFrameFrameSet_construct;
   // @method
   o.selectObject = MO.FDsSystemFrameFrameSet_selectObject;
   o.load         = MO.FDsSystemFrameFrameSet_load;
   // @method
   o.dispose      = MO.FDsSystemFrameFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FDsSystemFrameFrameSet_onBuilded = function FDsSystemFrameFrameSet_onBuilded(event){
   var o = this;
   o.__base.FDsSystemDesignFrameSet.onBuilded.call(o, event);
   // 设置样式
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameSpaceContent._hPanel.className = o.styleName('Space_Content');
   o._framePropertyToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
   //..........................................................
   // 设置分割
   var spliter = o._catalogSplitter = o.searchControl('catalogSpliter');
   spliter.setAlignCd(MO.EUiAlign.Left);
   spliter.setSizeHtml(o._frameCatalog._hPanel);
   var spliter = o._propertySpliter = o.searchControl('propertySpliter');
   spliter.setAlignCd(MO.EUiAlign.Right);
   spliter.setSizeHtml(o._frameProperty._hPanel);
   //..........................................................
   // 设置目录工具栏
   var control = o._catalogToolbar = MO.Class.create(MO.FDsSystemFrameCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   // 设置目录内容
   var control = o._catalogContent = MO.Class.create(MO.FDsSystemFrameCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   //control.addSelectedListener(o, o.selectObject);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置空间工具栏
   var control = o._spaceToolBar = MO.Class.create(MO.FDsSystemFrameSpaceToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSpaceToolBar.push(control);
   // 设置空间内容
   var control = o._spaceContent = MO.Class.create(MO.FDsSystemFrameSpaceContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(o._frameSpaceContent._hPanel);
   o._frameSpaceContent.push(control);
   //..........................................................
   // 设置属性工具栏
   var control = o._propertyToolbar = MO.Class.create(MO.FDsSystemFramePropertyToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._framePropertyToolBar.push(control);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDsSystemFrameFrameSet_construct = function FDsSystemFrameFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FDsSystemDesignFrameSet.construct.call(o);
}

//==========================================================
// <T>目录对象选择处理。</T>
//
// @method
// @param typeGroup:EDuiTreeNodeGroup 类型分组枚举
// @param propertyFrame:String 属性名称
// @param controlName:String 控件名称
//==========================================================
MO.FDsSystemFrameFrameSet_selectObject = function FDsSystemFrameFrameSet_selectObject(typeGroup, propertyFrame, controlName){
   var o = this;
   var activeFrame = o._spaceContent._activeFrame;
   // 隐藏所有属性面板
   var frames = o._propertyFrames;
   var count = frames.count();
   for(var i = 0; i < count; i++){
      var frame = frames.at(i);
      frame.hide();
   }
   // 显示控件信息
   var frame = o.findPropertyFrame(propertyFrame);
   frame.show();
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      frame.loadObject(activeFrame, activeFrame);
   }else{
      var activeControl = activeFrame.findComponent(controlName);
      frame.loadObject(activeFrame, activeControl);
      o._spaceContent.selectControl(activeControl);
   }
}

//==========================================================
// <T>加载处理。</T>
//
// @method
//==========================================================
MO.FDsSystemFrameFrameSet_load = function FDsSystemFrameFrameSet_load(name){
   var o = this;
   if(name){
      o._spaceContent.loadFrame(name);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDsSystemFrameFrameSet_dispose = function FDsSystemFrameFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FDsSystemDesignFrameSet.dispose.call(o);
}
