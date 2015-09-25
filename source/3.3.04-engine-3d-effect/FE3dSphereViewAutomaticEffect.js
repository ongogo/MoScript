﻿//==========================================================
// <T>阴影颜色自动渲染器。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dSphereViewAutomaticEffect = function FE3dSphereViewAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   //..........................................................
   // @attribute
   o._code          = 'sphere.view.automatic';
   o._rotation      = 0;
   //..........................................................
   // @method
   o.drawRenderable = MO.FE3dSphereViewAutomaticEffect_drawRenderable;
   return o;
}

//==========================================================
// <T>绘制渲染对象。</T>
//
// @method
// @param region:FG3dRegion 渲染区域
// @param renderable:FG3dRenderable 渲染对象
//==========================================================
MO.FE3dSphereViewAutomaticEffect_drawRenderable = function FE3dSphereViewAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   // 计算比率
   var size = context.size();
   var rateX = 1;
   var rateY = 1;
   if(size.width > size.height){
      rateX = size.width / size.height;
   }else if(size.width < size.height){
      rateY = size.height / size.width;
   }
   var rotation = o._rotation + 0.0001;
   program.setParameter4('vc_const', rateX, rateY, 1, rotation);
   program.setParameter4('fc_const', rateX, rateY, 1, rotation);
   o._rotation = rotation;
   // 绑定材质
   var material = renderable.material();
   o.bindMaterial(material);
   // 绑定所有属性流
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   // 绘制处理
   context.drawTriangles(renderable.indexBuffer());
}