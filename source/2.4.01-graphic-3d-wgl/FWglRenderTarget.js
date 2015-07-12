//==========================================================
// <T>WebGL渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
MO.FWglRenderTarget = function FWglRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dRenderTarget);
   //..........................................................
   o._optionDepth = true;
   o._handle      = null;
   o._handleDepth = null;
   //..........................................................
   // @method
   o.setup        = MO.FWglRenderTarget_setup;
   // @method
   o.build        = MO.FWglRenderTarget_build;
   // @method
   o.dispose      = MO.FWglRenderTarget_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FWglRenderTarget_setup = function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var c = o._graphicContext;
   var g = c._handle;
   //............................................................
   // 创建帧缓冲
   o._handle = g.createFramebuffer();
   return c.checkError('createFramebuffer', 'Create frame buffer failure.');
}

//==========================================================
// <T>构建处理。</T>
//
// @method
//==========================================================
MO.FWglRenderTarget_build = function FWglRenderTarget_build(){
   var o = this;
   var s = o._size;
   var c = o._graphicContext;
   var g = c._handle;
   //............................................................
   // 绑定帧缓冲
   g.bindFramebuffer(g.FRAMEBUFFER, o._handle);
   var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!r){
      return r;
   }
   //............................................................
   // 创建深度缓冲区
   if(o._optionDepth){
      // 绑定深度缓冲区
      var nd = o._handleDepth = g.createRenderbuffer();
      var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!r){
         return r;
      }
      g.bindRenderbuffer(g.RENDERBUFFER, nd);
      var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!r){
         return r;
      }
      g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, s.width, s.height);
      var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!r){
         return r;
      }
      // 绑定深度缓冲区
      g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
      var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._handle, nd);
      if(!r){
         return r;
      }
   }
   //............................................................
   // 绑定纹理缓冲集合
   var ts = o._textures;
   var tc = ts.count();
   for(var i = 0; i < tc; i++){
      var t = ts.get(i);
      // 设置信息
      g.bindTexture(g.TEXTURE_2D, t._handle);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      // 设置存储
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, s.width, s.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._handle, o._size.width, o._size.height);
      if(!r){
         return r;
      }
      // 绑定数据
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0 + i, g.TEXTURE_2D, t._handle, 0);
      var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._handle, t._handle);
      if(!r){
         return r;
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FWglRenderTarget_dispose = function FWglRenderTarget_dispose(){
   var o = this;
   var c = o._graphicContext;
   // 释放深度对象
   var n = o._handleDepth;
   if(n){
      c._handle.deleteRenderbuffer(n);
      o._handleDepth = null;
   }
   // 释放对象
   var n = o._handle;
   if(n){
      c._handle.deleteFramebuffer(n);
      o._handle = null;
   }
   // 父处理
   o.__base.FG3dRenderTarget.dispose.call(o);
}
