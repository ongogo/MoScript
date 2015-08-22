//==========================================================
// <T>资源框架。</T>
//
// @author maocy
// @history 150121
//==========================================================
MO.FEditorDsFrameFrameSet = function FEditorDsFrameFrameSet(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsFrameSet);
   //..........................................................
   // @property
   o._frameName    = 'editor.design.frame.FrameSet';
   //..........................................................
   // @process
   o.onBuilded     = MO.FEditorDsFrameFrameSet_onBuilded;
   //..........................................................
   // @method
   o.construct     = MO.FEditorDsFrameFrameSet_construct;
   // @method
   o.setFrameTitle = MO.FEditorDsFrameFrameSet_setFrameTitle;
   o.selectObject  = MO.FEditorDsFrameFrameSet_selectObject
   // @method
   o.dispose       = MO.FEditorDsFrameFrameSet_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsFrameFrameSet_onBuilded = function FEditorDsFrameFrameSet_onBuilded(event){
   var o = this;
   o.__base.FEditorDsFrameSet.onBuilded.call(o, event);
   // 设置样式
   o._frameCatalogTitle._hPanel.className = o.styleName('Title_Ground');
   o._frameCatalogToolBar._hPanel.className = o.styleName('Toolbar_Ground');
   o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
   o._frameSpaceTitle._hPanel.className = o.styleName('Title_Ground');
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
   var control = o._catalogToolbar = MO.Class.create(MO.FEditorDsFrameCatalogToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameCatalogToolBar.push(control);
   // 设置目录内容
   var control = o._catalogContent = MO.Class.create(MO.FEditorDsFrameCatalogContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(event);
   //control.addSelectedListener(o, o.selectObject);
   o._frameCatalogContent.push(control);
   //..........................................................
   // 设置空间工具栏
   var control = o._spaceToolBar = MO.Class.create(MO.FEditorDsFrameSpaceToolBar);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.buildDefine(event);
   o._frameSpaceToolBar.push(control);
   // 设置空间内容
   var control = o._spaceContent = MO.Class.create(MO.FEditorDsFrameSpaceContent);
   control._workspace = o._workspace;
   control._frameSet = o;
   control.build(o._frameSpaceContent._hPanel);
   o._frameSpaceContent.push(control);
   //..........................................................
   // 设置属性工具栏
   //var control = o._propertyToolbar = MO.Class.create(MO.FEditorDsFramePropertyToolBar);
   //control._workspace = o._workspace;
   //control._frameSet = o;
   //control.buildDefine(event);
   //o._framePropertyToolBar.push(control);
   //..........................................................
   // 设置标题
   MO.Window.Html.textSet(o._frameCatalogTitle._hPanel, '表单目录');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameFrameSet_construct = function FEditorDsFrameFrameSet_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorDsFrameSet.construct.call(o);
}

//==========================================================
// <T>设置页面标题。</T>
//
// @method
// @param title:String 标题
//==========================================================
MO.FEditorDsFrameFrameSet_setFrameTitle = function FEditorDsFrameFrameSet_setFrameTitle(title){
   var o = this;
   var hTitlePanel = o._frameSpaceTitle._hPanel;
   MO.Window.Html.textSet(hTitlePanel, title);
}

//==========================================================
// <T>选择对象处理。</T>
//
// @method
// @param typeGroup:EDuiTreeNodeGroup 类型分组枚举
// @param propertyFrame:String 属性名称
// @param containerName:String 容器名称
// @param controlName:String 控件名称
//==========================================================
MO.FEditorDsFrameFrameSet_selectObject = function FEditorDsFrameFrameSet_selectObject(typeGroup, propertyFrame, containerName, controlName){
   var o = this;
   var frame = o.__base.FEditorDsFrameSet.selectObject.call(o, typeGroup, propertyFrame, containerName, controlName);
   // 显示控件信息
   if(typeGroup == MO.EDuiTreeNodeGroup.Container){
      //frame.loadObject(activeFrame, activeFrame);
   }else{
      //var activeControl = activeFrame.findComponent(controlName);
      //frame.loadObject(activeFrame, activeControl);
      //o._spaceContent.selectControl(activeControl);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameFrameSet_dispose = function FEditorDsFrameFrameSet_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsFrameSet.dispose.call(o);
}
