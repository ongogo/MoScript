with(MO){
   //==========================================================
   // <T>渲染程序属性。</T>
   //
   // @author maocy
   // @history 141230
   //==========================================================
   MO.FG3dProgramAttribute = function FG3dProgramAttribute(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute 名称
      o._name       = RClass.register(o, new AGetter('_name'));
      // @attribute 关联名称
      o._linker     = RClass.register(o, new AGetter('_linker'));
      // @attribute 使用标志
      o._statusUsed = false;
      // @attribute 插槽
      o._slot       = null;
      // @attribute 索引
      o._index      = -1;
      // @attribute 格式
      o._formatCd   = EG3dAttributeFormat.Unknown;
      //..........................................................
      // @method
      o.loadConfig  = FG3dProgramAttribute_loadConfig;
      // @method
      o.dispose     = FG3dProgramAttribute_dispose;
      return o;
   }

   //==========================================================
   // <T>从配置节点钟加载信息。</T>
   //
   // @method
   // @param xconfig:TNode 配置节点
   //==========================================================
   MO.FG3dProgramAttribute_loadConfig = function FG3dProgramAttribute_loadConfig(xconfig){
      var o = this;
      o._name = xconfig.get('name');
      o._linker = xconfig.get('linker');
      o._formatCd = REnum.encode(EG3dAttributeFormat, xconfig.get('format'));
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dProgramAttribute_dispose = function FG3dProgramAttribute_dispose(){
      var o = this;
      o._slot = null;
      // 父处理
      o.__base.FObject.dispose.call(o);
   }
}
