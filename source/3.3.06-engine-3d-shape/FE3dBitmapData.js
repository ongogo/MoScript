with(MO){
   //==========================================================
   // <T>引擎位图数据。</T>
   //
   // @class
   // @author maocy
   // @history 150610
   //==========================================================
   MO.FE3dBitmapData = function FE3dBitmapData(o){
      o = RClass.inherits(this, o, FE3dFaceData);
      //..........................................................
      // @attribute
      o._image      = null;
      //..........................................................
      // @event
      o.onImageLoad = FE3dBitmapData_onImageLoad;
      //..........................................................
      // @method
      o.construct   = FE3dBitmapData_construct;
      // @method
      o.loadUrl     = FE3dBitmapData_loadUrl;
      // @method
      o.dispose     = FE3dBitmapData_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapData_onImageLoad = function FE3dBitmapData_onImageLoad(event){
      var o = this;
      var context = o._graphicContext;
      var image = event.sender;
      // 设置大小
      var size = image.size();
      var width = size.width;
      var height = size.height;
      o._size.set(width, height);
      var adjustWidth = RInteger.pow2(width);
      var adjustHeight = RInteger.pow2(height);
      o._adjustSize.set(adjustWidth, adjustHeight);
      // 绘制画板
      var canvasConsole = RConsole.find(FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.context();
      context2d.drawImage(image, 0, 0);
      // 创建纹理
      o._texture.upload(canvas);
      // 释放画板
      canvasConsole.free(canvas);
      // 释放位图
      image.dispose();
      // 设置属性
      o._ready = true;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapData_construct = function FE3dBitmapData_construct(){
      var o = this;
      o.__base.FE3dFaceData.construct.call(o);
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapData_loadUrl = function FE3dBitmapData_loadUrl(url){
      var o = this;
      // 加载图片
      var image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl(url);
      // 设置属性
      o._ready = false;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dBitmapData_dispose = function FE3dBitmapData_dispose(){
      var o = this;
      // 父处理
      o.__base.FE3dFaceData.dispose.call(o);
   }
}