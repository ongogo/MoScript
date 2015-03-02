//==========================================================
// <T>渲染几何体。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rTextureBitmapFlatPack(o){
   o = RClass.inherits(this, o, FE3rTextureBitmapPack);
   //..........................................................
   // @attribute
   o._ready       = false;
   o._resource    = null;
   o._image       = null;
   //..........................................................
   o.onLoad       = FE3rTextureBitmapFlatPack_onLoad;
   //..........................................................
   // @method
   o.construct    = FE3rTextureBitmapFlatPack_construct;
   // @method
   o.loadResource = FE3rTextureBitmapFlatPack_loadResource;
   // @method
   o.dispose      = FE3rTextureBitmapFlatPack_dispose;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @param p:region:FRegion 区域
// @return Boolean 是否可见
//==========================================================
function FE3rTextureBitmapFlatPack_onLoad(p){
   var o = this;
   var c = o._graphicContext;
   // 创建纹理
   var t = o._texture = c.createFlatTexture();
   t.upload(o._image);
   t.makeMipmap();
   // 释放位图
   o._image = RObject.dispose(o._image);
   // 加载完成
   o._ready  = true;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rTextureBitmapFlatPack_construct(){
   var o = this;
   o.__base.FE3rTextureBitmapPack.construct.call(o);
}

//==========================================================
// <T>加载模型资源。</T>
//
// @method
// @param p:resource:FE3sTextureBitmapPack 模型资源
//==========================================================
function FE3rTextureBitmapFlatPack_loadResource(p){
   var o = this;
   o._resource = p;
   // 加载二进制数据
   var d = p.data();
   var t = p._formatName;
   var b = new Blob([d], {type: 'image/' + t});
   var u = window.URL.createObjectURL(b);
   var g = o._image = RClass.create(FImage);
   g.loadUrl(u);
   g.addLoadListener(o, o.onLoad);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3rTextureBitmapFlatPack_dispose(){
   var o = this;
   o._image = RObject.dispose(o._image);
   o.__base.FE3rTextureBitmapPack.dispose.call(o);
}
