with(MO){
   //==========================================================
   // <T>资源模板。</T>
   //
   // @author maocy
   // @history 150108
   //==========================================================
   MO.FE3sTemplate = function FE3sTemplate(o){
      o = RClass.inherits(this, o, FE3sSpace);
      //..........................................................
      // @attribute
      o._typeName     = 'Template';
      o._dataCompress = true;
      return o;
   }
}