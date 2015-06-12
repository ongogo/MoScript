with(MO){
   //==========================================================
   // <T>控件对象。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiControl = function FGuiControl(o){
      o = RClass.inherits(this, o, FGuiComponent, MGraphicObject, MGuiSize, MGuiMargin, MGuiPadding, MGuiBorder);
      //..........................................................
      // @property
      o._styleBackcolor       = MO.RClass.register(o, [new MO.APtyString('_styleBackcolor'), new MO.AGetSet('_styleBackcolor')]);
      o._styleForecolor       = MO.RClass.register(o, [new MO.APtyString('_styleForecolor'), new MO.AGetSet('_styleForecolor')]);
      //..........................................................
      // @attribute
      o._renderable      = MO.RClass.register(o, new AGetter('_renderable'));
      o._clientRectangle = null;
      //..........................................................
      // @event
      o.onUpdate         = FGuiControl_onUpdate;
      // @event
      o.onPaintBegin     = FGuiControl_onPaintBegin;
      o.onPaintEnd       = FGuiControl_onPaintEnd;
      o.onPaint          = FGuiControl_onPaint;
      //..........................................................
      // @method
      o.construct        = FGuiControl_construct;
      // @method
      o.paint            = FGuiControl_paint;
      o.update           = FGuiControl_update;
      o.build            = FGuiControl_build;
      o.process          = FGuiControl_process;
      // @method
      o.dispose          = FGuiControl_dispose;
      return o;
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onUpdate = function FGuiControl_onUpdate(event){
      var o = this;
      var location = o._location;
      var size = o._size;
      var rectangle = event.rectangle;
      //..........................................................
      // 开始绘制处理
      o._clientRectangle.set(rectangle.left + location.x, rectangle.top + location.y, size.width, size.height);
      //..........................................................
      // 子控件处理
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FGuiControl)){
               component.onUpdate(event);
            }
         }
      }
   }

   //==========================================================
   // <T>前绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onPaintBegin = function FGuiControl_onPaintBegin(event){
      var o = this;
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      // 绘制处理
      if(o._styleBackcolor){
         graphic.fillRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, o._styleBackcolor, 1);
      }
      //graphic.drawBorder(o._clientRectangle, o._borderOuter);
      graphic.drawBorder(o._clientRectangle, o._borderInner);
      graphic.setFont('microsoft yahei,Arial,sans-serif');
      graphic.drawText('这是一个测试', 10, 40, '#FF0000');
   }

   //==========================================================
   // <T>后绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onPaintEnd = function FGuiControl_onPaintEnd(event){
      var o = this;
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onPaint = function FGuiControl_onPaint(event){
      var o = this;
      //..........................................................
      // 开始绘制处理
      o.onPaintBegin(event);
      //..........................................................
      // 子控件处理
      var components = o._components;
      if(components){
         var count = components.count();
         for(var i = 0; i < count; i++){
            var component = components.at(i);
            if(RClass.isClass(component, FGuiControl)){
               component.onPaint(event);
            }
         }
      }
      //..........................................................
      // 绘制结束处理
      o.onPaintEnd(event);
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_construct = function FGuiControl_construct(){
      var o = this;
      o.__base.FGuiComponent.construct.call(o);
      o.__base.MGuiSize.construct.call(o);
      o.__base.MGuiMargin.construct.call(o);
      o.__base.MGuiPadding.construct.call(o);
      o.__base.MGuiBorder.construct.call(o);
      // 创建属性
      o._clientRectangle = new SRectangle();
      o._backColor = '#CCCCCC';
      o._borderInner.left.color = '#FFFFFF';
      //o._borderInner.top.color = '#00FF00';
      //o._borderInner.right.color = '#0000FF';
      //o._borderInner.bottom.color = '#FF00FF';
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_update = function FGuiControl_update(){
      var o = this;
      var size = o._size;
      // 更新处理
      var event = new SGuiPaintEvent();
      event.rectangle.set(0, 0, size.width, size.height)
      o.onUpdate(event);
      event.dispose();
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_paint = function FGuiControl_paint(graphic){
      var o = this;
      var location = o._location;
      var size = o._size;
      //..........................................................
      // 绘制处理
      var event = new SGuiPaintEvent();
      event.graphic = graphic;
      event.rectangle.assign(o._clientRectangle);
      o.onPaint(event);
      event.dispose();
   }

   //==========================================================
   // <T>建立处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_build = function FGuiControl_build(){
      var o = this;
      var location = o._location;
      var size = o._size;
      //..........................................................
      // 获得渲染对象
      var renderable = o._renderable;
      if(!renderable){
         renderable = o._renderable = o._graphicContext.createObject(FGuiControlData);
      }
      renderable.setSize(size.width, size.height);
      //..........................................................
      // 更新处理
      o.update();
      //..........................................................
      // 绘制处理
      var graphic = renderable.beginDraw();
      graphic._handle.imageSmoothingEnabled = false;
      o.paint(graphic);
      renderable.endDraw();
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   // @param region 区域
   //==========================================================
   MO.FGuiControl_process = function FGuiControl_process(region){
      var o = this;
   }

   //==========================================================
   // <T>析构处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_dispose = function FGuiControl_dispose(){
      var o = this;
      // 释放属性
      o._clientRectangle = RObject.dispose(o._clientRectangle);
      // 父处理
      o.__base.MGuiBorder.dispose.call(o);
      o.__base.MGuiPadding.dispose.call(o);
      o.__base.MGuiMargin.dispose.call(o);
      o.__base.MGuiSize.dispose.call(o);
      o.__base.FGuiComponent.dispose.call(o);
   }
}
