//==========================================================
// <T>纹理控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3rBitmapConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = EScope.Local;
   o._bitmaps  = null;
   o._dataUrl  = '/cloud.content.texture.bitmap.wv'
   //..........................................................
   // @method
   o.construct = FE3rBitmapConsole_construct;
   // @method
   o.bitmaps   = FE3rBitmapConsole_bitmaps;
   o.load      = FE3rBitmapConsole_load;
   o.loadUrl   = FE3rBitmapConsole_loadUrl;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new TDictionary();
}

//==========================================================
// <T>获得渲染纹理集合。</T>
//
// @method
// @return TDictionary 渲染纹理集合
//==========================================================
function FE3rBitmapConsole_bitmaps(){
   return this._bitmaps;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pt:textureCode:String 纹理代码
// @param pb:bitmapCode:String 位图代码
// @return FE3rTexture 渲染模型
//==========================================================
function FE3rBitmapConsole_load(pc, pg, pt){
   var o = this;
   // 查找模型
   var t = o._bitmaps.get(pg);
   if(t){
      return t;
   }
   // 生成地址
   var u = RBrowser.hostPath(o._dataUrl + '?code=' + pg);
   RLogger.info(o, 'Load texture from bitmap. (url={1})', u);
   // 加载模型
   if(RString.toLower(pt) == 'environment'){
      t = RClass.create(FE3rTextureCube);
   }else{
      t = RClass.create(FE3rTexture);
   }
   t._name = pg;
   t.linkGraphicContext(pc);
   t.load(u);
   o._bitmaps.set(pg, t);
   return t;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param context:FRenderContext 渲染上下文
// @param url:String 网络地址
// @return FE3rBitmap 渲染位图
//==========================================================
function FE3rBitmapConsole_loadUrl(context, url){
   var o = this;
   // 查找图片
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   // 生成地址
   var loadUrl = RBrowser.contentPath(url);
   RLogger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   // 创建渲染位图
   var bitmap = RClass.create(FE3rBitmap);
   bitmap.loadUrl(context, url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
