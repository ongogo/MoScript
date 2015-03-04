//==========================================================
// <T>WebGL渲染顶点流。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dVertexBuffer);
   //..........................................................
   // @attribute
   o._native = null;
   //..........................................................
   // @method
   o.setup   = FWglVertexBuffer_setup;
   // @method
   o.upload  = FWglVertexBuffer_upload;
   // @method
   o.dispose = FWglVertexBuffer_dispose;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var g = o._graphicContext._native;
   o._native = g.createBuffer();
}

//==========================================================
// <T>上传数据</T>
//
// @method
// @param v:data:Array 数据
// @param s:stride:Integer 宽度
// @param c:count:Integer 总数
//==========================================================
function FWglVertexBuffer_upload(v, s, c){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   // 设置数据
   o.stride = s;
   o.count  = c;
   // 获得数据
   var d = null;
   if((v.constructor == Array) || (v.constructor == ArrayBuffer)){
      d = new Float32Array(v);
   }else if(v.constructor == Uint8Array){
      d = v;
   }else if(v.constructor == Float32Array){
      d = v;
   }else{
      throw new TError(o, 'Upload vertex data type is invalid. (value={1})', v);
   }
   // 上传数据
   g.bindBuffer(g.ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bindbuffer');
   g.bufferData(g.ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'bufferData');
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FWglVertexBuffer_dispose(){
   var o = this;
   var c = o._graphicContext;
   // 释放对象
   var n = o._native;
   if(n){
      c._native.deleteBuffer(n);
      o._native = null;
   }
   // 父处理
   o.__base.FG3dVertexBuffer.dispose.call(o);
}
