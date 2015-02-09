//==========================================================
// <T>资源场景技术。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneTechnique(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._passes     = null;
   //..........................................................
   // @method
   o.passes      = FRs3SceneTechnique_passes;
   o.unserialize = FRs3SceneTechnique_unserialize;
   return o;
}

//==========================================================
// <T>获得过程集合。</T>
//
// @method
// @return 过程集合
//==========================================================
function FRs3SceneTechnique_passes(){
   return this._passes;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneTechnique_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取过程集合
   var c = p.readInt16();
   if(c > 0){
      var ss = o._passes = new TObjects();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRs3SceneTechniquePass);
         s.unserialize(p);
         ss.push(s);
      }
   }
}
