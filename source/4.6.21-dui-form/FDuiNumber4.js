//==========================================================
// <T>文本编辑框。</T>
//
// @class
// @author maocy
// @version 150102
//==========================================================
MO.FDuiNumber4 = function FDuiNumber4(o){
   //o = MO.Class.inherits(this, o, FDuiEditControl, MUiPropertyEdit);
   o = MO.Class.inherits(this, o, MO.FDuiEditControl);
   //..........................................................
   // @property
   o._inputSize       = MO.Class.register(o, new MO.APtySize2('_inputSize'));
   //..........................................................
   // @style
   o._styleInputPanel = MO.Class.register(o, new MO.AStyle('_styleInputPanel'));
   o._styleInput      = MO.Class.register(o, new MO.AStyle('_styleInput'));
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @html
   o._hInput          = null;
   //..........................................................
   // @event
   o.onBuildEditValue = MO.FDuiNumber4_onBuildEditValue;
   //..........................................................
   // @process
   //o.oeDataLoad       = FDuiNumber4_oeDataLoad;
   //o.oeDataSave       = FDuiNumber4_oeDataSave;
   //..........................................................
   // @method
   o.construct        = MO.FDuiNumber4_construct;
   // @method
   o.get              = MO.FDuiNumber4_get;
   o.set              = MO.FDuiNumber4_set;








   //o.onKeyDown    = MO.Class.register(o, new MO.AEventKeyDown('onKeyDown'));
   //o.onKeyPress   = MO.Class.register(o, new MO.AEventKeyPress('onKeyPress'));
   //o.onKeyUp      = MO.Class.register(o, new MO.AEventKeyUp('onKeyUp'));
   //o.stUnit        = MO.Class.register(o, new MO.AStyle('Unit'));
   //..........................................................
   // @attribute
   //o.borderStyle   = EUiBorder.Round;
   //..........................................................
   // @html
   //o.hUnit         = null;
   //..........................................................
   // @event
   //o.onDataKeyDown = FDuiNumber4_onDataKeyDown;
   //..........................................................
   // @method
   //o.formatValue   = FDuiNumber4_formatValue;
   //o.setText       = FDuiNumber4_setText;
   //o.validText     = FDuiNumber4_validText;
   //o.findEditor    = FDuiNumber4_findEditor;
   //o.drop          = FDuiNumber4_drop;
   //o.link          = FDuiNumber4_link;
   //o.clone         = FDuiNumber4_clone;
   return o;
}

//==========================================================
// <T>数据源从加载数据处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
MO.FDuiNumber4_oeDataLoad = function FDuiNumber4_oeDataLoad(p){
   var o = this;
   alert(p);
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>存储数据到数据源处理。</T>
//
// @method
// @param p:dataSource:FDataSource 数据源
//==========================================================
MO.FDuiNumber4_oeDataSave = function FDuiNumber4_oeDataSave(p){
   var o = this;
   return MO.EEventStatus.Stop;
}

//==========================================================
// <T>建立编辑器内容。</T>
//
// @method
// @param p:argements:SArgements 参数集合
//==========================================================
MO.FDuiNumber4_onBuildEditValue = function FDuiNumber4_onBuildEditValue(p){
   var o = this;
   var h = o._hValuePanel;
   h.className = o.styleName('InputPanel');

   var hf = o._hInputForm = MO.Window.Builder.appendTable(h);
   var hr = MO.Window.Builder.appendTableRow(hf);

   var hc1 = MO.Window.Builder.appendTableCell(hr);
   hc1.style.borderRight = '1px solid #666666';
   var he1 = o._hInput1 = MO.Window.Builder.appendEdit(hc1, o.styleName('Input'));
   
   var hc2 = MO.Window.Builder.appendTableCell(hr);
   hc2.style.borderRight = '1px solid #666666';
   hc2.style.borderLeft = '1px solid #999999';
   var he2 = o._hInput2 = MO.Window.Builder.appendEdit(hc2, o.styleName('Input'));

   var hc3 = MO.Window.Builder.appendTableCell(hr);
   hc3.style.borderLeft = '1px solid #999999';
   hc3.style.borderRight = '1px solid #666666';
   var he3 = o._hInput3 = MO.Window.Builder.appendEdit(hc3, o.styleName('Input'));

   var hc4 = MO.Window.Builder.appendTableCell(hr);
   hc4.style.borderLeft = '1px solid #999999';
   var he4 = o._hInput4 = MO.Window.Builder.appendEdit(hc4, o.styleName('Input'));
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber4_construct = function FDuiNumber4_construct(){
   var o = this;
   o.__base.FDuiEditControl.construct.call(o);
   o._inputSize = new MO.SSize2(120, 0);
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return String 数据
//==========================================================
MO.FDuiNumber4_get = function FDuiNumber4_get(p){
   var o = this;
   var r = o.__base.FDuiEditControl.get.call(o, p);
   // 获得显示
   var h = o._hInput;
   if(h){
      r = h.value;
   }
   return r;
}

//==========================================================
// <T>设置数据。</T>
//
// @method
// @param p:value:String 数据
//==========================================================
MO.FDuiNumber4_set = function FDuiNumber4_set(p){
   var o = this;
   o.__base.FDuiEditControl.set.call(o, p);
   // 设置显示
   var h = o._hInput;
   if(h){
      h.value = MO.Lang.String.nvl(p);
   }
   //o.finded = v;
   //if(o.hChangeIcon){
   //   o.hChangeIcon.style.display = 'none';
   //}
}













//==========================================================
// <T>数据区按键按下事件。</T>
//
// @method
// @param s:sender:FControl 控件对象
// @param e:event:TEvent 事件对象
//==========================================================
MO.FDuiNumber4_onDataKeyDown = function FDuiNumber4_onDataKeyDown(s, e){
   var o = this;
   o.__base.FDuiEditControl.onDataKeyDown.call(o, s, e);
   // 大小写限制
   if(o.editCase){
      RKey.fixCase(e, o.editCase);
   }
   // 自动提示
   //if(o._editable){
   //   if(o.editComplete){
   //      if( 16 != e.keyCode && 17 != e.keyCode && 18 != e.keyCode && 20 != e.keyCode ){
   //         var ed = o.findEditor();
   //         if(ed){
   //            ed.onEditKeyDown(s, e);
   //         }
   //      }
   //   }
   //}
}


//==========================================================
// <T>格式化数据。</T>
//
// @method
// @param v:value:String 显示内容
//==========================================================
MO.FDuiNumber4_formatValue = function FDuiNumber4_formatValue(v){
   var o = this;
   var r = MO.Lang.String.nvl(v);
   if(ECase.Upper == o.editCase){
      r = MO.Lang.String.toUpper(r);
   }else if(ECase.Lower == o.editCase){
      r = MO.Lang.String.toLower(r);
   }
   return r;
}

//==========================================================
// <T>设置内容。</T>
//
// @method
// @param t:text:String 内容
//==========================================================
MO.FDuiNumber4_setText = function FDuiNumber4_setText(t){
   var o = this;
   if(!o.hEdit){
      return;
   }
   if('U'== o.editCase){
      o.hEdit.value = MO.Lang.String.toUpper(t);
   }else if('L'== o.editCase){
         o.hEdit.value = MO.Lang.String.toLower(t);
   }else{
      o.hEdit.value = t;
   }
   if('right' == o.editAlign ){
      o.hEdit.style.textAlign = 'right';
   }else if('left' == o.editAlign ){
      o.hEdit.style.textAlign = 'left';
   }else{
      o.hEdit.style.textAlign = 'center';
   }
}

//==========================================================
// <T>校验内容。</T>
//
// @method
// @param t:text:String 内容
// @return 校验结果
//==========================================================
MO.FDuiNumber4_validText = function FDuiNumber4_validText(t){
   var o = this;
   var r = o.__base.FDuiEditControl.validText.call(o, t);
   if(!r){
      // 最小长度的校验
      if(o.validLenmin){
         if(o.validLenmin > t.length){
            return RContext.get('MDescEdit:ValidMinLength', o.validLenmin);
         }
      }
      // 最大长度的校验
      if(o.validLenmax){
         if(o.validLenmax < t.length){
            return RContext.get('MDescEdit:ValidMaxLength', o.validLenmax);
         }
      }
   }
   return r;
}

//==========================================================
// <T>查找编辑器。</T>
//
// @method
// @return 编辑器
//==========================================================
MO.FDuiNumber4_findEditor = function FDuiNumber4_findEditor(){
   var o = this;
   if(o.editComplete){
      var de = o.editor;
      if(!de){
         o.dsControl = o.topControl(MDataset);
         if(o.dsControl){
            de = o.editor = RConsole.find(FDuiNumber4Console).focus(o, FDuiNumber4Editor);
         }
      }
      if(de){
         de.linkControl(o);
      }
      return o.editor;
   }
}

//==========================================================
// <T>下拉处理。</T>
//
// @method
//==========================================================
MO.FDuiNumber4_drop = function FDuiNumber4_drop(){
   var o = this;
   var de = o.findEditor();
   if(de){
      var t = o.reget();
      if(t.length > 0){
         if(o.finded != t){
            if(de.source != o){
               de.linkControl(o);
            }
            de.search(t);
         }
         o.finded = t;
      }
   }
}

//==========================================================
//<T>下拉处理。</T>
//
//@method
//==========================================================
MO.FDuiNumber4_clone = function FDuiNumber4_clone(){
   var o = this;
   var r = o._class.newInstance();
   GHtml_clone(r, o.hPanel);
   return r;
}

//==========================================================
//<T>下拉处理。</T>
//
//@method
//==========================================================
MO.FDuiNumber4_link = function FDuiNumber4_link(){
   var o = this;
   
}
