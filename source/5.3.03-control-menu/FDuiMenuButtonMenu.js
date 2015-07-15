with(MO){
   //==========================================================
   // <T>菜单展开按键。</T>
   //
   // @face
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FUiMenuButtonMenu = function FUiMenuButtonMenu(o){
      o = RClass.inherits(this, o, FDuiControl);
      // Property
      o._action       = RClass.register(o, new APtyString('action', null));
      o._target       = RClass.register(o, new APtyString('target', null));
      o._page         = RClass.register(o, new APtyString('page'));
      o._hotkey       = RClass.register(o, new APtyString('hotkey'));
      o._method       = RClass.register(o, new APtyString('method'));
      o._icon         = RClass.register(o, new APtyString('icon', null));
      o._iconDisable  = RClass.register(o, new APtyString('iconDisable', null));
      o._attributes   = RClass.register(o, new APtyString('attributes'));
      // Attribute
      o._disabled     = false;
      // Html
      o.hButton      = null;
      o.hButtonLine  = null;
      o.hButtonPanel = null;
      o.hIcon        = null;
      o.hText        = null;
      // Process Event
      o.oeBuild      = FUiMenuButtonMenu_oeBuild;
      o.oeEnable     = FUiMenuButtonMenu_oeEnable;
      o.oeDisable    = FUiMenuButtonMenu_oeDisable;
      // Event
      o.onBuildPanel = FUiMenuButtonMenu_onBuildPanel;
      o.onEnter      = FUiMenuButtonMenu_onEnter;
      o.onLeave      = FUiMenuButtonMenu_onLeave;
      o.onMouseDown  = FUiMenuButtonMenu_onMouseDown;
      o.onMouseUp    = FUiMenuButtonMenu_onMouseUp;
      o.onClick      = FUiMenuButtonMenu_onClick;
      // Method
      o.construct    = FUiMenuButtonMenu_construct;
      o.dispose      = FUiMenuButtonMenu_dispose;
      return o;
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_oeBuild = function FUiMenuButtonMenu_oeBuild(event){
      var o = this;
      o.base.FDuiControl.oeBuild.call(o, event);
      var h = o.hPanel;
      o.hButton = RBuilder.appendTable(o.hPanel, o.style('Button'));
      o.linkClickEvent(o.hButton);
      var hLine = o.hButtonLine = o.hButton.insertRow();
      var hCel = hLine.insertCell();
      if(o._icon){
         o.hIcon = RBuilder.appendIcon(hCel, o._icon);
      }
      if(o.label){
         o.hLabel = RBuilder.appendText(hCel, (o.hIcon ? '&nbsp;' : '') + o.label);
         o.hLabel.className = o.style('Label');
      }
      return EEventStatus.Stop;
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_onBuildPanel = function FUiMenuButtonMenu_onBuildPanel(){
      this.hPanel = RBuilder.create(null, 'DIV');
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_oeEnable = function FUiMenuButtonMenu_oeEnable(event){
      var o = this;
      o.base.FDuiControl.oeEnable.call(o, event);
      o.hPanel.className = o.style('Button');
      if(o._iconDisable && o._icon){
         o.hIcon.src = RRes._iconPath(o._icon);
      }
      return EEventStatus.Stop;
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_oeDisable = function FUiMenuButtonMenu_oeDisable(event){
      var o = this;
      o.base.FDuiControl.oeDisable.call(o, event);
      o.hPanel.className = o.style('Disable');
      if(o._iconDisable){
         o.hIcon.src = RRes._iconPath(o._iconDisable);
      }
      return EEventStatus.Stop;
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_onEnter = function FUiMenuButtonMenu_onEnter(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Hover');
      }
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_onLeave = function FUiMenuButtonMenu_onLeave(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Panel');
      }
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_onMouseDown = function FUiMenuButtonMenu_onMouseDown(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Press');
      }
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_onMouseUp = function FUiMenuButtonMenu_onMouseUp(){
      var o = this;
      if(!o._disabled){
         o.hPanel.className = o.style('Hover');
      }
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_onClick = function FUiMenuButtonMenu_onClick(){
      var o = this;
      if(!o._disabled){
         RConsole.find(FFocusConsole).focus(o);
         if(o._action){
            eval(o._action);
         }
         if(o._page || o._method){
            var form = RHtml.form(o.hButton);
            var p = RPage.parse(o._page);
            if(o._method){
               p._action = o._method;
            }
            p.split(o._attributes);
            p.post(form, o._target);
         }
         o.processClick();
      }
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_construct = function FUiMenuButtonMenu_construct(){
      var o = this;
      o.base.FDuiControl.construct.call(o);
   }
   // ------------------------------------------------------------
   MO.FUiMenuButtonMenu_dispose = function FUiMenuButtonMenu_dispose(){
      var o = this;
      o.base.FDuiControl.dispose.call(o);
      RMemory.freeHtml(o.hPanel);
      RMemory.freeHtml(o.hButton);
      o.hPanel = null;
      o.hIcon = null;
      o.hButton = null;
      o.hButtonLine = null;
      o.hLabel = null;
   }
}
