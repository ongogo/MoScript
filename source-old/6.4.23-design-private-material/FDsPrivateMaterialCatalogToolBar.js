//==========================================================
// <T>私有材质目录工具栏。</T>
//
// @class
// @author maocy
// @history 150424
//==========================================================
function FDsPrivateMaterialCatalogToolBar(o){
   o = RClass.inherits(this, o, FDsMaterialCatalogToolBar);
   //..........................................................
   // @property
   o._frameName = 'resource.private.material.CatalogToolBar';
   return o;
}