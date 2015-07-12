﻿//==========================================================
// <T>页面窗口的管理类。</T>
//
// @reference
// @author maocy
// @version 1.0.1
//==========================================================
MO.RWindow = function RWindow(){
   var o = this;
   //..........................................................
   // @attribute
   o._optionSelect     = true;
   // @attribute
   o._statusEnable     = true;
   o._disableDeep      = 0;
   // @attribute
   o._localStorage     = null;
   o._sessionStorage   = null;
   // @attribute
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   // @attribute
   o._eventMouse       = new MO.SMouseEvent();
   o._eventKey         = new MO.SKeyboardEvent();
   o._eventResize      = new MO.SResizeEvent();
   o._eventOrientation = new MO.SEvent();
   o._eventUnload      = new MO.SEvent();
   //..........................................................
   // @html
   o._hWindow          = null;
   o._hDocument        = null;
   o._hContainer       = null;
   o._hDisablePanel    = null;
   o._hDisableImage    = null;
   //..........................................................
   // @listeners
   o.lsnsLoad          = new MO.TListeners();
   o.lsnsUnload        = new MO.TListeners();
   o.lsnsMouseDown     = new MO.TListeners();
   o.lsnsMouseUp       = new MO.TListeners();
   o.lsnsMouseOver     = new MO.TListeners();
   o.lsnsMouseMove     = new MO.TListeners();
   o.lsnsMouseWheel    = new MO.TListeners();
   o.lsnsKeyDown       = new MO.TListeners();
   o.lsnsKeyUp         = new MO.TListeners();
   o.lsnsKeyPress      = new MO.TListeners();
   o.lsnsResize        = new MO.TListeners();
   o.lsnsOrientation   = new MO.TListeners();
   return o;
}

//==========================================================
// <T>鼠标按下处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohMouseDown = function RWindow_ohMouseDown(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseDown;
   event.attachEvent(hEvent);
   o.lsnsMouseDown.process(event);
}

//==========================================================
// <T>鼠标移动处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohMouseMove = function RWindow_ohMouseMove(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseMove;
   event.attachEvent(hEvent);
   o.lsnsMouseMove.process(event);
}

//==========================================================
// <T>鼠标抬起处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohMouseUp = function RWindow_ohMouseUp(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseUp;
   event.attachEvent(hEvent);
   o.lsnsMouseUp.process(event);
}

//==========================================================
// <T>鼠标滚动处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohMouseWheel = function RWindow_ohMouseWheel(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventMouse;
   event.code = MO.EEvent.MouseWheel;
   event.attachEvent(hEvent);
   o.lsnsMouseWheel.process(event);
}

//==========================================================
// <T>键盘按下处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohKeyDown = function RWindow_ohKeyDown(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyDown.process(event);
//   MO.Logger.debug(o, 'Window key down. (key_code={1})', e.keyCode);
//   var s = e.srcElement ? e.srcElement : e.target;
//   var t = s.tagName;
//   if(EKeyCode.BackSpace == e.keyCode){
//      // 禁止在非输入框内输入退格键
//      if('INPUT' == t){
//         if(s.readOnly || 'checkbox' == s.type){
//            return RKey.eventClear(e);
//         }
//      }else if('TEXTAREA' == t){
//         if(s.readOnly){
//            return RKey.eventClear(e);
//         }
//      }else{
//         return RKey.eventClear(e);
//      }
//   }
//   // 纷发按键消息
//   o.__keyDownEvent.attach(e);
//   o.lsnsKeyDown.process(o.__keyDownEvent);
//   // 处理回车键
//   if(EKeyCode.Enter == e.keyCode){
//      if('INPUT' == t){
//         if(REvent.process(s, e)){
//            RKey.eventClear(e);
//         }
//      }
//   }
}

//==========================================================
// <T>键盘抬起处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohKeyUp = function RWindow_ohKeyUp(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyUp.process(event);
}

//==========================================================
// <T>键盘点击处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohKeyPress = function RWindow_ohKeyPress(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   var event = o._eventKey;
   event.attachEvent(hEvent);
   o.lsnsKeyPress.process(event);
}

//==========================================================
// <T>改变大小处理。</T>
//
// @method
// @param event:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohResize = function RWindow_ohResize(hEvent){
   var o = MO.RWindow;
   if(!hEvent){
      hEvent = o._hWindow.event;
   }
   // 接收事件
   var event = o._eventResize;
   event.code = MO.EEvent.Resize;
   event.attachEvent(hEvent);
   o.lsnsResize.process(event);
//   var o = this;
//   var h = o._hDisablePanel;
//   if(h){
//      if('block' == h.style.display){
//         var s = h.style;
//         var hd = o.hDocument;
//         s.pixelLeft = 0;
//         s.pixelTop = 0
//         s.pixelWidth = hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth;
//         s.pixelHeight = hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight;
//      }
//   }
//   // 根据窗口大小，不发送重复事件
//   if(o.oldBodyWidth == o._hContainer.offsetWidth && o.oldBodyHeight == o._hContainer.offsetHeight){
//      return;
//   }
//   o.oldBodyWidth = o._hContainer.offsetWidth;
//   o.oldBodyHeight = o._hContainer.offsetHeight;
//   // 通知所有控件，窗口改变大小
//   o.onResize();
//   o.lsnsResize.process(e);
}

//==========================================================
// <T>选取处理。</T>
//
// @method
// @param event:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohSelect = function RWindow_ohSelect(event){
   return MO.RWindow._optionSelect;
}

//==========================================================
// <T>选取处理。</T>
//
// @method
// @param hEvent:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohOrientation = function RWindow_ohOrientation(hEvent){
   var o = MO.RWindow;
   // 刷新方向
   MO.Browser.refreshOrientation();
   // 分发消息
   var event = o._eventOrientation;
   event.code = MO.EEvent.Orientation;
   event.orientationCd = MO.Browser.orientationCd();
   o.lsnsOrientation.process(event);
}

//==========================================================
// <T>卸载处理处理。</T>
//
// @method
// @param event:htmlEvent 事件
//==========================================================
MO.RWindow.prototype.ohUnload = function RWindow_ohUnload(event){
   var o = MO.RWindow;
   // 释放处理
   var event = o._eventUnload;
   o.lsnsUnload.process(event);
   // 释放窗口
   MO.RWindow.dispose();
}

//==========================================================
// <T>关联当前窗口。</T>
// <P>接管当前窗口对象的各种加载，鼠标，键盘的处理事件。</P>
//
// @method
// @param hHtml:<Window> 窗口对象
//==========================================================
MO.RWindow.prototype.connect = function RWindow_connect(hHtml){
   var o = this;
   // 设置属性
   var hWindow = o._hWindow = hHtml;
   var hDocument = o._hDocument = hWindow.document;
   var hContainer = o._hContainer = hDocument.body;
   // 关联鼠标事件
   if(MO.Browser.supportHtml5()){
      hContainer.addEventListener('mousedown', o.ohMouseDown, true);
      hContainer.addEventListener('mousemove', o.ohMouseMove, true);
      hContainer.addEventListener('mouseup', o.ohMouseUp, true);
      hContainer.addEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.addEventListener('keydown', o.ohKeyDown, true);
      hContainer.addEventListener('keyup', o.ohKeyUp, true);
      hContainer.addEventListener('keypress', o.ohKeyPress, true);
      hWindow.addEventListener('orientationchange', o.ohOrientation);
   }else{
      hContainer.onmousedown = o.ohMouseDown;
      hContainer.onmousemove = o.ohMouseMove;
      hContainer.onmouseup = o.ohMouseUp;
      hContainer.onmousewheel = o.ohMouseWheel;
      hContainer.onkeydown = o.ohKeyDown;
      hContainer.onkeyup = o.ohKeyUp;
      hContainer.onkeypress = o.ohKeyPress;
      hWindow.onorientationchange = o.ohOrientation;
   }
   hContainer.onresize = o.ohResize;
   hContainer.onselectstart = o.ohSelect;
   hContainer.onunload = o.ohUnload;
}

//==========================================================
// <T>获得配置选取。</T>
//
// @method
// @return Boolean 配置选取
//==========================================================
MO.RWindow.prototype.optionSelect = function RWindow_optionSelect(){
   return this._optionSelect;
}

//==========================================================
// <T>设置配置选取。</T>
//
// @method
// @param select:Boolean 配置选取
//==========================================================
MO.RWindow.prototype.setOptionSelect = function RWindow_setOptionSelect(select){
   var o = this;
   o._optionSelect = select;
   if(MO.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._hContainer.style.MozUserSelect = select ? '' : 'none';
   }
}

//==========================================================
// <T>设置标题。</T>
//
// @method
// @param value:String 标题
//==========================================================
MO.RWindow.prototype.setCaption = function RWindow_setCaption(value){
   top.document.title = MO.Lang.String.nvl(value);
}

//==========================================================
// <T>设置状态。</T>
//
// @method
// @param value:String 状态
//==========================================================
MO.RWindow.prototype.setStatus = function RWindow_setStatus(value){
   window.status = MO.Lang.String.nvl(value);
}

//==========================================================
// <T>获得存储对象。</T>
//
// @method
// @param scopeCd:EScope 范围
//==========================================================
MO.RWindow.prototype.storage = function RWindow_storage(scopeCd){
   var o = this;
   switch(scopeCd){
      case MO.EScope.Local:
         var storage = o._localStorage;
         if(!storage){
            storage = o._localStorage = RClass.create(FWindowStorage);
            storage.link(window.localStorage);
         }
         return storage;
      case MO.EScope.Session:
         var storage = o._sessionStorage;
         if(!storage){
            storage = o._sessionStorage = RClass.create(FWindowStorage);
            storage.link(window.sessionStorage);
         }
         return storage;
   }
   throw new TError(o, 'Unknown scope. (scope_cd={1})', scopeCd);
}

//==========================================================
// <T>获得系统禁止时的页面层。</T>
//
// @method
// @param f:flag:Boolean 是否显示图片层 true : 不显示图片
// @return <DIV> 页面层
//==========================================================
MO.RWindow.prototype.makeDisablePanel = function RWindow_makeDisablePanel(f){
   var o = this;
   // 创建面板
   var h = o._hDisablePanel;
   if(!h){
      h = o._hDisablePanel = RBuilder.createDiv(o._hDocument, 'RWindow_Disable');
      h.style.zIndex = 5000;
   }
   // 创建图片
   var hi = o._hDisableImage;
   if(!hi){
      hi = o._hDisableImage = MO.RBuilder.appendIcon(h);
      hi.src = MO.RResource.iconPath('control.RWindow_Loading');
      hi.style.margin = o._hContainer.offsetHeight / 2;
      hi.style.display = 'none';
   }
   RHtml.visibleSet(hi, f);
   return h;
}

//==========================================================
// <T>使窗口的变为可用状态。</T>
//
// @method
//==========================================================
MO.RWindow.prototype.windowDisable = function RWindow_windowDisable(){
   this._hContainer.disabled = true;
}

//==========================================================
// <T>使窗口的变为可用状态。</T>
//
// @method
//==========================================================
MO.RWindow.prototype.windowEnable = function RWindow_windowEnable(){
   this._hContainer.disabled = false;
}

//==========================================================
// <T>获得是否允许处理。</T>
//
// @method
// @return 是否允许
//==========================================================
MO.RWindow.prototype.isEnable = function RWindow_isEnable(){
   return this._statusEnable;
}

//==========================================================
// <T>允许窗口操作。</T>
//
// @method
//==========================================================
MO.RWindow.prototype.enable = function RWindow_enable(){
   var o = this;
   o._disableDeep--;
   if(o._disableDeep == 0){
      o.setEnable(true);
   }
}

//==========================================================
// <T>禁止窗口操作。</T>
//
// @method
//==========================================================
MO.RWindow.prototype.disable = function RWindow_disable(){
   var o = this;
   if(o._disableDeep == 0){
      o.setEnable(false);
   }
   o._disableDeep++;
}

//==========================================================
// <T>设置窗口操作模式。</T>
//
// @method
// @param v:value:Boolean 是否允许操作
//==========================================================
MO.RWindow.prototype.setEnable = function RWindow_setEnable(v, f){
   var o = this;
   var h = o.makeDisablePanel(f);
   var st = h.style;
   if(!v){
      var hd = o._hDocument;
      var s = o._hDisablePanel.style;
      s.left = '0px';
      s.top = '0px';
      s.width = (hd.all ? o._hContainer.scrollWidth : hd.documentElement.scrollWidth) + 'px';
      s.height = (hd.all ? o._hContainer.scrollHeight : hd.documentElement.scrollHeight) + 'px';
      if(!h._linked){
         o._hContainer.appendChild(h);
         h._linked = true;
      }
   }else{
      o.windowEnable();
      if(h._linked){
         o._hContainer.removeChild(h);
         h._linked = false;
      }
   }
   o._statusEnable = v;
}

//==========================================================
// <T>追加页面元素。</T>
//
// @method
// @param hPanel:HtmlTag 页面元素
//==========================================================
MO.RWindow.prototype.appendElement = function RWindow_appendElement(hPanel){
   MO.Assert.debugNotNull(control);
   this._hContainer.appendChild(hPanel);
}

//==========================================================
// <T>跳转到指定地址。</T>
//
// @method
// @param url:String 网络地址
//==========================================================
MO.RWindow.prototype.redirect = function RWindow_redirect(){
}

//==========================================================
// <T>历史前进一级。</T>
//
// @method
//==========================================================
MO.RWindow.prototype.historyForward = function RWindow_historyForward(){
}

//==========================================================
// <T>历史后退一级。</T>
//
// @method
//==========================================================
MO.RWindow.prototype.historyBack = function RWindow_historyBack(){
}

//==========================================================
// <T>释放窗口所有对象。</T>
//==========================================================
MO.RWindow.prototype.dispose = function RWindow_dispose(){
   var o = this;
   // 设置属性
   var hWindow = o._hWindow;
   var hDocument = o._hDocument;
   var hContainer = o._hContainer;
   // 关联鼠标事件
   if(MO.Browser.supportHtml5()){
      hContainer.removeEventListener('mousedown', o.ohMouseDown, true);
      hContainer.removeEventListener('mousemove', o.ohMouseMove, true);
      hContainer.removeEventListener('mouseup', o.ohMouseUp, true);
      hContainer.removeEventListener('mousewheel', o.ohMouseWheel, true);
      hContainer.removeEventListener('keydown', o.ohKeyDown, true);
      hContainer.removeEventListener('keyup', o.ohKeyUp, true);
      hContainer.removeEventListener('keypress', o.ohKeyPress, true);
      hWindow.removeEventListener('orientationchange', o.ohOrientation);
   }else{
      hContainer.onmousedown = null;
      hContainer.onmousemove = null;
      hContainer.onmouseup = null;
      hContainer.onmousewheel = null;
      hContainer.onkeydown = null;
      hContainer.onkeyup = null;
      hContainer.onkeypress = null;
      hWindow.onorientationchange = null;
   }
   hContainer.onresize = null;
   hContainer.onselectstart = null;
   hContainer.onunload = null;
   // @attribute
   o._localStorage = MO.RObject.dispose(o._localStorage);
   o._sessionStorage = MO.RObject.dispose(o._sessionStorage);
   // @attribute
   o._hWindow = null;
   o._hDocument = null;
   o._hContainer = null;
   // @attribute
   o._eventMouse = MO.Lang.Object.dispose(o._eventMouse);
   o._eventKey = MO.Lang.Object.dispose(o._eventKey);
   o._eventResize = MO.Lang.Object.dispose(o._eventResize);
   o._eventOrientation = MO.Lang.Object.dispose(o._eventOrientation);
   o._eventUnload = MO.Lang.Object.dispose(o._eventUnload);
}
//..........................................................
// 实例化内容
MO.RWindow = new MO.RWindow();
MO.Window = MO.RWindow;
