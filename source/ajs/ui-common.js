MO.AEvent = function AEvent(n, l, h){
   var o = this;
   MO.AAnnotation.call(o, n);
   o._annotationCd = MO.EAnnotation.Event;
   o._inherit      = true;
   o._logger       = true;
   o._linker       = l;
   o._handle       = h;
   o._process      = null;
   o.linker        = MO.AEvent_linker;
   o.handle        = MO.AEvent_handle;
   o.value         = MO.AEvent_value;
   o.create        = MO.AEvent_create;
   o.attach        = MO.Method.empty;
   o.bind          = MO.AEvent_bind;
   o.toString      = MO.AEvent_toString;
   return o;
}
MO.AEvent_linker = function AEvent_linker(){
   return this._linker;
}
MO.AEvent_handle = function AEvent_handle(){
   return this._handle;
}
MO.AEvent_value = function AEvent_value(){
   return this._process;
}
MO.AEvent_create = function AEvent_create(){
   return new MO.SEvent();
}
MO.AEvent_bind = function AEvent_bind(h, u){
   var o = this;
   if(u){
      h.addEventListener(o._linker, MO.RUiEvent.ohEvent, true);
   }else{
      h[o._handle] = MO.RUiEvent.ohEvent;
   }
}
MO.AEvent_toString = function AEvent_toString(){
   var o = this;
   return 'linker=' + o._linker + ',handle=' + o._handle;
}
MO.AEventBlur = function AEventBlur(n, m){
   var o = this;
   MO.AEvent.call(o, n, 'blur', 'onblur');
   o.attach = MO.AEventBlur_attach;
   return o;
}
MO.AEventBlur_attach = function AEventBlur_attach(e, h){
}
MO.AEventChange = function AEventChange(n){
   var o = this;
   MO.AEvent.call(o, n, 'change', 'onchange');
   o.attach = MO.AEventChange_attach;
   return o;
}
MO.AEventChange_attach = function AEventChange_attach(e, h){
}
MO.AEventClick = function AEventClick(n){
   var o = this;
   MO.AEvent.call(o, n, 'click', 'onclick');
   o.attach = MO.AEventClick_attach;
   return o;
}
MO.AEventClick_attach = function AEventClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
MO.AEventDoubleClick = function AEventDoubleClick(n){
   var o = this;
   MO.AEvent.call(o, n, 'dblclick', 'ondblclick');
   o.attach = MO.AEventDoubleClick_attach;
   return o;
}
MO.AEventDoubleClick_attach = function AEventDoubleClick_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.shiftKey = h.shiftKey;
}
MO.AEventFocus = function AEventFocus(n){
   var o = this;
   MO.AEvent.call(o, n, 'focus', 'onfocus');
   o.attach = MO.AEventFocus_attach;
   return o;
}
MO.AEventFocus_attach = function AEventFocus_attach(e, h){
}
MO.AEventInputChanged = function AEventInputChanged(n){
   var o = this;
   MO.AEvent.call(o, n, 'input', 'oninput');
   o.attach = MO.AEventInputChanged_attach;
   o.bind   = MO.AEventInputChanged_bind;
   return o;
}
MO.AEventInputChanged_attach = function AEventInputChanged_attach(e, h){
}
MO.AEventInputChanged_bind = function AEventInputChanged_bind(h, u){
   var o = this;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.Explorer)){
      h.onpropertychange = MO.RUiEvent.ohEvent;
   }else{
      h.addEventListener('input', MO.RUiEvent.ohEvent);
   }
}
MO.AEventKeyDown = function AEventKeyDown(n){
   var o = this;
   MO.AEvent.call(o, n, 'keydown', 'onkeydown');
   o.attach = MO.AEventKeyDown_attach;
   return o;
}
MO.AEventKeyDown_attach = function AEventKeyDown_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
MO.AEventKeyPress = function AEventKeyPress(n){
   var o = this;
   MO.AEvent.call(o, n, 'keypress', 'onkeypress');
   o.create = MO.AEventKeyPress_create;
   o.attach = MO.AEventKeyPress_attach;
   return o;
}
MO.AEventKeyPress_create = function AEventKeyPress_create(){
   return new MO.SKeyboardEvent();
}
MO.AEventKeyPress_attach = function AEventKeyPress_attach(e, h){
   e.hEvent = h;
   e.attachEvent(h);
}
MO.AEventKeyUp = function AEventKeyUp(n){
   var o = this;
   MO.AEvent.call(o, n, 'keyup', 'onkeyup');
   o.attach = MO.AEventKeyUp_attach;
   return o;
}
MO.AEventKeyUp_attach = function AEventKeyUp_attach(e, h){
   e.altKey = h.altKey;
   e.shiftKey = h.shiftKey;
   e.ctrlKey = h.ctrlKey;
   e.keyCode = h.keyCode;
}
MO.AEventLoad = function AEventLoad(n){
   var o = this;
   MO.AEvent.call(o, n, 'load', 'onload');
   o.attach = MO.AEventLoad_attach;
   return o;
}
MO.AEventLoad_attach = function AEventLoad_attach(e, h){
}
MO.AEventMouse = function AEventMouse(n, l, h){
   var o = this;
   MO.AEvent.call(o, n, l, h);
   o.attach = MO.AEventMouse_attach;
   return o;
}
MO.AEventMouse_attach = function AEventMouse_attach(e, h){
   e.button = h.button;
   e.mouseLeft = (h.button == MO.EMouseButton.Left);
   e.mouseMiddle = (h.button == MO.EMouseButton.Middle);
   e.mouseRight = (h.button == MO.EMouseButton.Right);
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
      e.offsetX = h.layerX;
      e.offsetY = h.layerY;
   }else{
      e.x = h.x;
      e.y = h.y;
      e.offsetX = h.offsetX;
      e.offsetY = h.offsetY;
   }
   e.clientX = h.clientX;
   e.clientY = h.clientY;
}
MO.AEventMouseDown = function AEventMouseDown(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mousedown', 'onmousedown');
   return o;
}
MO.AEventMouseEnter = function AEventMouseEnter(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseenter', 'onmouseenter');
   o._logger = false;
   o.attach  = MO.AEventMouseEnter_attach;
   return o;
}
MO.AEventMouseEnter_attach = function AEventMouseEnter_attach(e, h){
}
MO.AEventMouseLeave = function AEventMouseLeave(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseleave', 'onmouseleave');
   o._logger = false;
   o.attach  = MO.AEventMouseLeave_attach;
   return o;
}
MO.AEventMouseLeave_attach = function AEventMouseLeave_attach(e, h){
}
MO.AEventMouseMove = function AEventMouseMove(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mousemove', 'onmousemove');
   o._logger = false;
   return o;
}
MO.AEventMouseOut = function AEventMouseOut(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseout', 'onmouseout');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = MO.AEventMouseOut_attach;
   return o;
}
MO.AEventMouseOut_attach = function AEventMouseOut_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
MO.AEventMouseOver = function AEventMouseOver(n){
   var o = this;
   MO.AEvent.call(o, n, 'mouseover', 'onmouseover');
   o._hSource = null;
   o._altKey  = null;
   o._ctrlKey = null;
   o._x       = null;
   o._y       = null;
   o.attach   = MO.AEventMouseOver_attach;
   return o;
}
MO.AEventMouseOver_attach = function AEventMouseOver_attach(p){
   var o = this;
   o._hSource = p.srcElement;
   o._altKey = p.altKey;
   o._ctrlKey = p.ctrlKey;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      o._x = p.pageX;
      o._y = p.pageY;
   }else{
      o._x = p.x;
      o._y = p.y;
   }
}
MO.AEventMouseUp = function AEventMouseUp(n){
   var o = this;
   MO.AEventMouse.call(o, n, 'mouseup', 'onmouseup');
   return o;
}
MO.AEventMouseWheel = function AEventMouseWheel(n){
   var o = this;
   MO.AEvent.call(o, n, 'mousewheel', 'onmousewheel');
   o.attach = MO.AEventMouseWheel_attach;
   return o;
}
MO.AEventMouseWheel_attach = function AEventMouseWheel_attach(e, h){
   e.altKey = h.altKey;
   e.ctrlKey = h.ctrlKey;
   e.delta = h.wheelDelta;
   if(MO.Window.Browser.isBrowser(MO.EBrowser.FireFox)){
      e.x = h.pageX;
      e.y = h.pageY;
   }else{
      e.x = h.x;
      e.y = h.y;
   }
}
MO.AEventReadyStateChange = function AEventReadyStateChange(n){
   var o = this;
   MO.AEvent.call(o, n, 'readystatechange', 'onreadystatechange');
   o.attach = MO.AEventReadyStateChange_attach;
   return o;
}
MO.AEventReadyStateChange_attach = function AEventReadyStateChange_attach(e, h){
}
MO.AEventResize = function AEventResize(n){
   var o = this;
   MO.AEvent.call(o, n, 'resize', 'onresize');
   o.attach = MO.AEventResize_attach;
   return o;
}
MO.AEventResize_attach = function AEventResize_attach(e, h){
   e.x = h.x;
   e.y = h.y;
}
MO.AEventScroll = function AEventScroll(n){
   var o = this;
   MO.AEvent.call(o, n, 'scroll', 'onscroll');
   o.attach = MO.AEventScroll_attach;
   return o;
}
MO.AEventScroll_attach = function AEventScroll_attach(e, h){
}
MO.AEventTouchEnd = function AEventTouchEnd(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchEnd_attach;
   return o;
}
MO.AEventTouchEnd_attach = function AEventTouchEnd_attach(e, h){
}
MO.AEventTouchMove = function AEventTouchMove(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchMove_attach;
   return o;
}
MO.AEventTouchMove_attach = function AEventTouchMove_attach(e, h){
}
MO.AEventTouchStart = function AEventTouchStart(n){
   var o = this;
   MO.AEvent.call(o, n, 'touchstart', 'ontouchstart');
   o.attach = MO.AEventTouchStart_attach;
   return o;
}
MO.AEventTouchStart_attach = function AEventTouchStart_attach(e, h){
}
MO.APtyAttributes = function APtyAttributes(n, l, vl, vt, vr, vb){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._left    = MO.Lang.Integer.nvl(vl);
   o._top     = MO.Lang.Integer.nvl(vt);
   o._right   = MO.Lang.Integer.nvl(vr);
   o._bottom  = MO.Lang.Integer.nvl(vb);
   o.load     = MO.APtyAttributes_load;
   o.save     = MO.APtyAttributes_save;
   o.toString = MO.APtyAttributes_toString;
   return o;
}
MO.APtyAttributes_load = function APtyAttributes_load(v, x){
   var o = this;
   var s = v[o._name];
   if(!s){
      s = v[o._name] = new MO.TAttributes();
   }
   s.split(x.get(o._linker), '=', '\n');
}
MO.APtyAttributes_save = function APtyAttributes_save(v, x){
   var o = this;
   var s = v[o._name];
   if(s){
      if(!s.isEmpty()){
         x.set(o._linker, s.join('=', '\n'));
      }
   }
}
MO.APtyAttributes_toString = function APtyAttributes_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
MO.APtyBoolean = function APtyBoolean(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value    = v ? v : false;
   o.build    = MO.APtyBoolean_build;
   o.load     = MO.APtyBoolean_load;
   o.save     = MO.APtyBoolean_save;
   o.toString = MO.APtyBoolean_toString;
   return o;
}
MO.APtyBoolean_build = function APtyBoolean_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyBoolean_load = function APtyBoolean_load(v, x){
   var o = this;
   v[o._name] = MO.Lang.Boolean.parse(x.get(o._linker));
}
MO.APtyBoolean_save = function APtyBoolean_save(v, x){
   var o = this;
   var d = v[o._name];
   if(d){
      x.set(o._linker, MO.Lang.Boolean.toString(d));
   }
}
MO.APtyBoolean_toString = function APtyBoolean_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.APtyBorder = function APtyBorder(name, linker){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o.load     = MO.APtyBorder_load;
   o.save     = MO.APtyBorder_save;
   o.toString = MO.APtyBorder_toString;
   return o;
}
MO.APtyBorder_load = function APtyBorder_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtyBorder_save = function APtyBorder_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
}
MO.APtyBorder_toString = function APtyBorder_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
MO.APtyConfig = function APtyConfig(n, l){
   var o = this;
   MO.AProperty.call(o, n, l);
   o.force = true;
   o.load  = MO.APtyConfig_load;
   o.save  = MO.Method.empty;
   return o;
}
MO.APtyConfig_load = function APtyConfig_load(v, x){
   v[this.name] = x;
}
MO.APtyEnum = function APtyEnum(n, l, e, d){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._enum    = e;
   o._default = d;
   o.build    = MO.APtyEnum_build;
   o.load     = MO.APtyEnum_load;
   o.save     = MO.APtyEnum_save;
   o.toString = MO.APtyEnum_toString;
   return o;
}
MO.APtyEnum_build = function APtyEnum_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._default;
   }
}
MO.APtyEnum_load = function APtyEnum_load(v, x){
   var o = this;
   v[o._name] = x.get(o._linker);
}
MO.APtyEnum_save = function APtyEnum_save(v, x){
   var o = this;
   x.set(o._linker, v[o._name]);
}
MO.APtyEnum_toString = function APtyEnum_toString(){
   var o = this;
   return 'linker=' + o._linker + ',enum=' + o._enum + ',default=' + o._default;
}
MO.APtyInteger = function APtyInteger(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value   = MO.Lang.Integer.nvl(v);
   o.build    = MO.APtyInteger_build;
   o.load     = MO.APtyInteger_load;
   o.save     = MO.APtyInteger_save;
   o.toString = MO.APtyInteger_toString;
   return o;
}
MO.APtyInteger_build = function APtyInteger_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyInteger_load = function APtyInteger_load(v, x){
   var o = this;
   v[o._name] = MO.Lang.Integer.parse(x.get(o._linker));
}
MO.APtyInteger_save = function APtyInteger_save(v, x){
   var o = this;
   x.set(o._linker, MO.Lang.Integer.toString(v[o._name]));
}
MO.APtyInteger_toString = function APtyInteger_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.APtyNumber = function APtyNumber(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value   = MO.Lang.Integer.nvl(v);
   o.build    = MO.APtyNumber_build;
   o.toString = MO.APtyNumber_toString;
   return o;
}
MO.APtyNumber_build = function APtyNumber_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyNumber_toString = function APtyNumber_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.APtyPadding = function APtyPadding(name, linker, left, top, right, bottom){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._left    = MO.Lang.Integer.nvl(left);
   o._top     = MO.Lang.Integer.nvl(top);
   o._right   = MO.Lang.Integer.nvl(right);
   o._bottom  = MO.Lang.Integer.nvl(bottom);
   o.load     = MO.APtyPadding_load;
   o.save     = MO.APtyPadding_save;
   o.toString = MO.APtyPadding_toString;
   return o;
}
MO.APtyPadding_load = function APtyPadding_load(instance, xconfig){
   var o = this;
   var name = o._name;
   var value = xconfig.get(o._linker);
   var padding = instance[name];
   if(!padding){
      padding = instance[name] = new MO.SPadding();
   }
   padding.parse(value);
}
MO.APtyPadding_save = function APtyPadding_save(instance, xconfig){
   var o = this;
   var name = o._name;
   var padding = instance[name];
   if(padding){
      if(!padding.isEmpty()){
         var value = padding.toString()
         xconfig.set(o._linker, value);
      }
   }
}
MO.APtyPadding_toString = function APtyPadding_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._left + ',' + o._top + ',' + o._right + ',' + o._bottom;
}
MO.APtyPoint2 = function APtyPoint2(name, linker, x, y){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._x       = MO.Lang.Integer.nvl(x);
   o._y       = MO.Lang.Integer.nvl(y);
   o.load     = MO.APtyPoint2_load;
   o.save     = MO.APtyPoint2_save;
   o.toString = MO.APtyPoint2_toString;
   return o;
}
MO.APtyPoint2_load = function APtyPoint2_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtyPoint2_save = function APtyPoint2_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   if(!value.isEmpty()){
      xconfig.set(o._linker, value.toString());
   }
}
MO.APtyPoint2_toString = function APtyPoint2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._x + ',' + o._y;
}
MO.APtySet = function APtySet(n, l, s, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._search = s;
   o._value  = v;
   o.build    = MO.APtySet_build;
   o.load     = MO.APtySet_load;
   o.save     = MO.APtySet_save;
   o.toString = MO.APtySet_toString;
   return o;
}
MO.APtySet_build = function APtySet_build(v){
   var o = this;
   if(v[o.name] == null){
      v[o.name] = o._value;
   }
}
MO.APtySet_load = function APtySet_load(v, x){
   var o = this;
   v[o.name] = MO.Lang.Set.containsString(x.get(o.linker), o.search);
}
MO.APtySet_save = function APtySet_save(v, x){
   var o = this;
   var n = o.name;
   var vs = v[n];
   var xs = x.get(o.linker);
   var e = MO.Lang.Set.containsString(xs, o._search);
   if(vs && !e){
      x.set(n, vs + o._search);
   }else if(!v && e){
      x.set(n, MO.Lang.String.remove(vs, o._search));
   }
}
MO.APtySet_toString = function APtySet_toString(){
   var o = this;
   return 'linker=' + o.linker + ',value=' + o._value + ',search=' + o._search;
}
MO.APtySize2 = function APtySize2(name, linker, width, height){
   var o = this;
   MO.AProperty.call(o, name, linker);
   o._width   = MO.Lang.Integer.nvl(width);
   o._height  = MO.Lang.Integer.nvl(height);
   o.load     = MO.APtySize2_load;
   o.save     = MO.APtySize2_save;
   o.toString = MO.APtySize2_toString;
   return o;
}
MO.APtySize2_load = function APtySize2_load(instance, xconfig){
   var o = this;
   var value = xconfig.get(o._linker);
   instance[o._name].parse(value);
}
MO.APtySize2_save = function APtySize2_save(instance, xconfig){
   var o = this;
   var value = instance[o._name];
   if(!value.isEmpty()){
      xconfig.set(o._linker, value.toString());
   }
}
MO.APtySize2_toString = function APtySize2_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._width + ',' + o._height;
}
MO.APtyString = function APtyString(n, l, v){
   var o = this;
   MO.AProperty.call(o, n, l);
   o._value    = v ? v : null;
   o.build    = MO.APtyString_build;
   o.toString = MO.APtyString_toString;
   return o;
}
MO.APtyString_build = function APtyString_build(v){
   var o = this;
   if(v[o._name] == null){
      v[o._name] = o._value;
   }
}
MO.APtyString_toString = function APtyString_toString(){
   var o = this;
   return 'linker=' + o._linker + ',value=' + o._value;
}
MO.EUiDock = new function EUiDock(){
   var o = this;
   o.None        = 'None';
   o.LeftTop     = 'LeftTop';
   o.Left        = 'Left';
   o.LeftBottom  = 'LeftBottom';
   o.Top         = 'Top';
   o.RightTop    = 'RightTop';
   o.Right       = 'Right';
   o.RightBottom = 'RightBottom';
   o.Bottom      = 'Bottom';
   o.Center      = 'Center';
   o.Fill        = 'Fill';
   return o;
}
MO.EUiLayer = new function EUiLayer(){
   var o = this;
   o.Default = 20000;
   o.Shadow  =  6000;
   o.Disable =  5000;
   o.Drap    = 10000;
   o.Window  = 20000;
   o.Drop    = 40000;
   o.Editor  = 10000;
   o.Border  = 20000;
   o.Move    = 25000;
   o.Search  = 45000;
   o.Message = 45000;
   return o;
}
MO.EUiLayout = new function EUiLayout(){
   var o = this;
   o.Display = 'P';
   o.Search  = 'S';
   o.Design  = 'G';
   o.Insert  = 'I';
   o.Update  = 'U';
   o.Delete  = 'D';
   o.Zoom    = 'Z';
   return o;
}
MO.EUiMerge = new function EUiMerge(){
   var o = this;
   o.Append   = 'append';
   o.Override = 'override';
   o.Disable  = 'disable';
   return o;
}
