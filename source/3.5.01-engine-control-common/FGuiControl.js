with(MO){
   //==========================================================
   // <T>控件对象。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiControl = function FGuiControl(o){
      o = RClass.inherits(this, o, FGuiComponent, MGraphicObject, MRenderableLinker, MListener, MGuiSize, MGuiMargin, MGuiPadding, MGuiBorder);
      //..........................................................
      // @property
      o._visible                = MO.RClass.register(o, [new MO.APtyString('_visible'), new MO.AGetter('_visible')], true);
      o._foreColor              = MO.RClass.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')], '#FFFFFF');
      o._foreFont               = MO.RClass.register(o, [new MO.APtyString('_foreFont'), new MO.AGetSet('_foreFont')]);
      o._backColor              = MO.RClass.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
      o._backResource           = MO.RClass.register(o, [new MO.APtyString('_backResource'), new MO.AGetSet('_backResource')]);
      o._backGrid               = MO.RClass.register(o, [new MO.APtyPadding('_backGrid'), new MO.AGetter('_backGrid')]);
      o._backHoverColor         = MO.RClass.register(o, [new MO.APtyString('_backHoverColor'), new MO.AGetSet('_backHoverColor')]);
      o._backHoverResource      = MO.RClass.register(o, [new MO.APtyString('_backHoverResource'), new MO.AGetSet('_backHoverResource')]);
      o._backHoverGrid          = MO.RClass.register(o, [new MO.APtyPadding('_backHoverGrid'), new MO.AGetter('_backHoverGrid')]);
      //..........................................................
      // @event
      o._operationDownListeners = MO.RClass.register(o, new AListener('_operationDownListeners', EEvent.OperationDown));
      o._operationMoveListeners = MO.RClass.register(o, new AListener('_operationMoveListeners', EEvent.OperationMove));
      o._operationUpListeners   = MO.RClass.register(o, new AListener('_operationUpListeners', EEvent.OperationUp));
      //..........................................................
      // @attribute
      o._statusHover            = false;
      o._statusPaint            = false;
      o._backImage              = null;
      o._backHoverResource      = null;
      o._clientRectangle        = null;
      //..........................................................
      // @event
      o.onUpdate                = FGuiControl_onUpdate;
      // @event
      o.onPaintBegin            = FGuiControl_onPaintBegin;
      o.onPaintEnd              = FGuiControl_onPaintEnd;
      o.onPaint                 = FGuiControl_onPaint;
      // @event
      o.onOperationDown         = FGuiControl_onOperationDown;
      o.onOperationMove         = FGuiControl_onOperationMove;
      o.onOperationUp           = FGuiControl_onOperationUp;
      o.onEvent                 = FGuiControl_onEvent;
      //..........................................................
      // @process
      o.oeInitialize            = FGuiControl_oeInitialize;
      o.oeUpdate                = FGuiControl_oeUpdate;
      //..........................................................
      // @method
      o.construct               = FGuiControl_construct;
      // @method
      o.setVisible              = FGuiControl_setVisible;
      o.setLocation             = FGuiControl_setLocation;
      o.setSize                 = FGuiControl_setSize;
      // @method
      o.testReady               = FGuiControl_testReady;
      o.testInRange             = FGuiControl_testInRange;
      o.paint                   = FGuiControl_paint;
      o.repaint                 = FGuiControl_repaint;
      o.update                  = FGuiControl_update;
      o.build                   = FGuiControl_build;
      o.processEvent            = FGuiControl_processEvent;
      // @method
      o.psEnable                = FGuiControl_psEnable;
      o.psVisible               = FGuiControl_psVisible;
      o.psResize                = FGuiControl_psResize;
      o.psRefresh               = FGuiControl_psRefresh;
      o.psUpdate                = FGuiControl_psUpdate;
      // @method
      o.dispose                 = FGuiControl_dispose;
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
      if(o._renderable){
         o._clientRectangle.set(0, 0, size.width, size.height);
      }else{
         o._clientRectangle.set(rectangle.left + location.x, rectangle.top + location.y, size.width, size.height);
      }
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
      // 绘制底色
      if(o._backColor){
         graphic.fillRectangle(rectangle.left, rectangle.top, rectangle.width, rectangle.height, o._styleBackcolor, 1);
      }
      // 绘制背景图
      var image = null;
      var imageGrid = null;
      if(o._statusHover){
         image = o._backHoverImage;
         imageGrid = o._backHoverGrid;
      }else{
         image = o._backImage;
         imageGrid = o._backGrid;
      }
      if(image){
         if(imageGrid && !imageGrid.isEmpty()){
            graphic.drawGridImage(image.bitmap, rectangle.left, rectangle.top, rectangle.width, rectangle.height, imageGrid);
         }else{
            graphic.drawImage(image.bitmap, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
         }
      }
      // 绘制外边框
      if(o._borderOuter.valid){
         graphic.drawBorder(o._clientRectangle, o._borderOuter);
      }
      // 绘制内边框
      if(o._borderInner.valid){
         graphic.drawBorder(o._clientRectangle, o._borderInner);
      }
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
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onOperationDown = function FGuiControl_onOperationDown(event){
      var o = this;
      if(event.flag){
         o.processOperationDownListener(event);
      }
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onOperationMove = function FGuiControl_onOperationMove(event){
      var o = this;
      if(event.flag){
         o.processOperationMoveListener(event);
      }
      //if(o._backHoverResource){
         //o._statusPaint = false;
         //o._statusHover = true;
         //console.log(o._name, event.code + '-' + event.flag, '(' + event.clientX + ',' + event.clientY + ')', '(' + event.locationX + ',' + event.locationY + ')');
         //o.topComponent().build();
      //}
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onOperationUp = function FGuiControl_onOperationUp(event){
      var o = this;
      if(event.flag){
         o.processOperationUpListener(event);
      }
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_onEvent = function FGuiControl_onEvent(event, flag){
      var o = this;
      event.flag = flag;
      //..........................................................
      var code = event.code;
      switch(code){
         case EEvent.MouseDown:
            o.onOperationDown(event);
            break;
         case EEvent.MouseMove:
            o.onOperationMove(event);
            break;
         case EEvent.MouseUp:
            o.onOperationUp(event);
            break;
         default:
            throw new TError('Unknown event type.');
      }
   }

   //==========================================================
   // <T>处理初始化事件。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   // @return EEventStatus 处理状态
   //==========================================================
   MO.FGuiControl_oeInitialize = function FGuiControl_oeInitialize(event){
      var o = this;
      var resultCd = o.__base.FGuiComponent.oeInitialize.call(o, event)
      if(event.isBefore()){
         // 加载背景资源
         if(o._backResource){
            var image = o._backImage = new SGuiImage();
            image.resource = o._backResource;
            image.load();
         }
         // 加载背景活动资源
         if(o._backHoverResource){
            var image = o._backHoverImage = new SGuiImage();
            image.resource = o._backHoverResource;
            image.load();
         }
      }
      return resultCd;
   }

   //==========================================================
   // <T>表单图片控件。</T>
   //
   // @class
   // @author maocy
   // @version 150610
   //==========================================================
   MO.FGuiControl_oeUpdate = function FGuiControl_oeUpdate(event){
      var o = this;
      if(!o._statusPaint){
         if(o.testReady()){
            o.repaint();
         }
      }
      return EEventStatus.Stop;
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
      //o._backColor = '#CCCCCC';
      //o._borderInner.left.color = '#FFFFFF';
      //o._borderInner.top.color = '#00FF00';
      //o._borderInner.right.color = '#0000FF';
      //o._borderInner.bottom.color = '#FF00FF';
   }

   //==========================================================
   // <T>设置可见性。</T>
   //
   // @method
   // @param flag:Boolean 标志
   //==========================================================
   MO.FGuiControl_setVisible = function FGuiControl_setVisible(flag){
      var o = this;
      o._visible = flag;
      // 设置渲染对象可见性
      var renderable = o._renderable;
      if(renderable){
         renderable.setVisible(flag);
      }
   }

   //==========================================================
   // <T>设置坐标。</T>
   //
   // @method
   // @param x:Number 左距离
   // @param y:Number 上距离
   //==========================================================
   MO.FGuiControl_setLocation = function FGuiControl_setLocation(x, y){
      var o = this;
      o.__base.MGuiSize.setLocation.call(o, x, y);
      // 设置渲染对象坐标
      var renderable = o._renderable;
      if(renderable){
         renderable.setLocation(x, y);
      }
   }

   //==========================================================
   // <T>设置大小。</T>
   //
   // @method
   // @param width:Number 宽度
   // @param height:Number 高度
   //==========================================================
   MO.FGuiControl_setSize = function FGuiControl_setSize(width, height){
      var o = this;
      o.__base.MGuiSize.setSize.call(o, width, height);
      // 设置渲染对象坐标
      var renderable = o._renderable;
      if(renderable){
         renderable.setSize(width, height);
      }
   }

   //==========================================================
   // <T>测试是否准备好。</T>
   //
   // @method
   // @return Boolean 是否准备好
   //==========================================================
   MO.FGuiControl_testReady = function FGuiControl_testReady(){
      var o = this;
      // 检查位图是否加载完成
      var image = o._backImage;
      if(image){
         if(!image.testReady()){
            return false;
         }
      }
      // 检查位图是否加载完成
      var image = o._backHoverImage;
      if(image){
         if(!image.testReady()){
            return false;
         }
      }
      return true;
   }

   //==========================================================
   // <T>测试是否在范围内。</T>
   //
   // @method
   // @param x:Number 横坐标
   // @param y:Number 纵坐标
   // @return Boolean 是否在范围内
   //==========================================================
   MO.FGuiControl_testInRange = function FGuiControl_testInRange(x, y){
      var o = this;
      var range = o._clientRectangle.testRange(x, y);
      return range;
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_paint = function FGuiControl_paint(graphic){
      var o = this;
      // 绘制处理
      var event = MO.Memory.alloc(SGuiPaintEvent)
      event.graphic = graphic;
      event.rectangle.assign(o._clientRectangle);
      o.onPaint(event);
      MO.Memory.free(event);
      o._statusPaint = true;
   }

   //==========================================================
   // <T>重新绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_repaint = function FGuiControl_repaint(){
      var o = this;
      // 绘制开始处理
      var renderable = o._renderable;
      if(!renderable){
         throw new TError('Invalid renderable.');
      }
      var graphic = renderable.beginDraw();
      //graphic._handle.imageSmoothingEnabled = false;
      //..........................................................
      // 绘制处理
      var event = MO.Memory.alloc(SGuiPaintEvent)
      event.graphic = graphic;
      event.rectangle.assign(o._clientRectangle);
      o.onPaint(event);
      MO.Memory.free(event);
      //..........................................................
      // 绘制结束处理
      renderable.endDraw();
      o._statusPaint = true;
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
      var event = MO.Memory.alloc(SGuiUpdateEvent)
      event.rectangle.set(0, 0, size.width, size.height)
      o.onUpdate(event);
      MO.Memory.free(event);
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
         renderable = o._renderable = o._graphicContext.createObject(FGuiControlRenderable);
         renderable.setControl(o);
      }
      renderable.setLocation(location.x, location.y);
      renderable.setSize(size.width, size.height);
      //..........................................................
      // 更新处理
      o.update();
      //..........................................................
      // 绘制处理
      if(o.testReady()){
         o.repaint();
      }
   }

   //==========================================================
   // <T>分发改变控件可操作和禁止的事件。</T>
   //
   // @method
   // @param enable:Boolean 是否可操作
   //==========================================================
   MO.FGuiControl_processEvent = function FGuiControl_processEvent(event){
      var o = this;
      var range = o.testInRange(event.locationX, event.locationY)
      if(range){
         o.onEvent(event, true);
         var components = o._components;
         if(components){
            var count = components.count();
            for(var i = 0; i < count; i++){
               var component = components.at(i);
               var result = component.processEvent(event);
               if(result){
                  break;
               }
            }
         }
         o.onEvent(event, false);
         return true;
      }
      return false;
   }

   //==========================================================
   // <T>分发改变控件可操作和禁止的事件。</T>
   //
   // @method
   // @param enable:Boolean 是否可操作
   //==========================================================
   MO.FGuiControl_psEnable = function FGuiControl_psEnable(enable){
      var o = this;
      // 创建事件
      var event = new SGuiDispatchEvent(o, 'oeEnable', FGuiControl)
      event.enable = enable;
      // 处理消息
      o.process(event);
      event.dispose();
   }

   //==========================================================
   // <T>分发改变控件隐藏和显示的事件。</T>
   //
   // @method
   // @param visible:Boolean 是否可见
   //==========================================================
   MO.FGuiControl_psVisible = function FGuiControl_psVisible(visible){
      var o = this;
      // 创建事件
      var event = new SGuiDispatchEvent(o, 'oeVisible', FGuiControl);
      event.visible = visible;
      // 处理消息
      o.process(event);
      event.dispose();
   }

   //==========================================================
   // <T>分发改变控件大小的事件。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_psResize = function FGuiControl_psResize(){
      var o = this;
      // 创建事件
      var event = new SGuiDispatchEvent(o, 'oeResize', FGuiControl);
      // 处理消息
      o.process(event);
      event.dispose();
   }

   //==========================================================
   // <T>分发控件刷新的事件。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_psRefresh = function FGuiControl_psRefresh(){
      var o = this;
      // 创建事件
      var event = new SGuiDispatchEvent(o, 'oeRefresh', FGuiControl);
      // 处理消息
      o.process(event);
      event.dispose();
   }

   //==========================================================
   // <T>分发控件更新的事件。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_psUpdate = function FGuiControl_psUpdate(){
      var o = this;
      // 创建事件
      var event = new SGuiDispatchEvent(o, 'oeUpdate', FGuiControl);
      // 处理消息
      o.process(event);
      event.dispose();
   }

   //==========================================================
   // <T>析构处理。</T>
   //
   // @method
   //==========================================================
   MO.FGuiControl_dispose = function FGuiControl_dispose(){
      var o = this;
      // 释放属性
      // 检查位图是否加载完成
      o._backImage = RObject.dispose(o._backImage);
      o._backHoverImage = RObject.dispose(o._backHoverImage);
      o._clientRectangle = RObject.dispose(o._clientRectangle);
      // 父处理
      o.__base.MGuiBorder.dispose.call(o);
      o.__base.MGuiPadding.dispose.call(o);
      o.__base.MGuiMargin.dispose.call(o);
      o.__base.MGuiSize.dispose.call(o);
      o.__base.MRenderableLinker.dispose.call(o);
      o.__base.MGraphicObject.dispose.call(o);
      o.__base.FGuiComponent.dispose.call(o);
   }
}
