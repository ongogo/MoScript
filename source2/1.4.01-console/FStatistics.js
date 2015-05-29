with(MO){
   //==========================================================
   // <T>统计基类。</T>
   //
   // @class
   // @author maocy
   // @version 150303
   //==========================================================
   MO.FStatistics = function FStatistics(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._code      = null;
      //..........................................................
      // @method
      o.reset      = FStatistics_reset;
      o.resetFrame = FStatistics_resetFrame;
      return o;
   }

   //==========================================================
   // <T>重置所有数据。</T>
   //
   // @method
   //==========================================================
   MO.FStatistics_reset = function FStatistics_reset(){
   }

   //==========================================================
   // <T>重置所有帧数据。</T>
   //
   // @method
   //==========================================================
   MO.FStatistics_resetFrame = function FStatistics_resetFrame(){
   }
}
