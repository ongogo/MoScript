with(MO){
   //==========================================================
   // <T>渲染对象关联接口。</T>
   //
   // @class
   // @author maocy
   // @version 150622
   //==========================================================
   MO.MRenderableLinker = function MRenderableLinker(o){
      o = RClass.inherits(this, o);
      //..........................................................
      // @attribute
      o._renderable = MO.RClass.register(o, new AGetter('_renderable'));
      //..........................................................
      // @method
      o.dispose     = MRenderableLinker_dispose;
      return o;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.MRenderableLinker_dispose = function MRenderableLinker_dispose(){
      var o = this;
      o._renderable = null;
   }
}
