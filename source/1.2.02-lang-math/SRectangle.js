﻿with(MO){
   //==========================================================
   // <T>矩形结构。</T>
   //
   // @struct
   // @author maocy
   // @version 150130
   //==========================================================
   MO.SRectangle = function SRectangle(left, top, width, height){
      var o = this;
      //..........................................................
      // @attribute
      o.left   = RInteger.nvl(left);
      o.top    = RInteger.nvl(top);
      o.width  = RInteger.nvl(width);
      o.height = RInteger.nvl(height);
      //..........................................................
      // @method
      o.right       = SRectangle_right;
      o.bottom      = SRectangle_bottom;
      // @method
      o.assign      = SRectangle_assign;
      o.setLocation = SRectangle_setLocation;
      o.setSize     = SRectangle_setSize;
      o.set         = SRectangle_set;
      o.toString    = SRectangle_toString;
      // @method
      o.dispose     = SRectangle_dispose;
      return o;
   }

   //============================================================
   // <T>获得左位置。</T>
   //
   // @method
   // @return Number 左位置
   //============================================================
   MO.SRectangle_left = function SRectangle_left(){
      return this.position.x;
   }

   //============================================================
   // <T>获得上位置。</T>
   //
   // @method
   // @return Number 上位置
   //============================================================
   MO.SRectangle_top = function SRectangle_top(){
      return this.position.y;
   }

   //============================================================
   // <T>获得右位置。</T>
   //
   // @method
   // @return Number 右位置
   //============================================================
   MO.SRectangle_right = function SRectangle_right(){
      return this.position.x + this.size.width;
   }

   //============================================================
   // <T>获得下位置。</T>
   //
   // @method
   // @return Number 下位置
   //============================================================
   MO.SRectangle_bottom = function SRectangle_bottom(){
      return this.position.y + this.size.height;
   }

   //============================================================
   // <T>获得宽度。</T>
   //
   // @method
   // @return Number 宽度
   //============================================================
   MO.SRectangle_width = function SRectangle_width(){
      return this.size.width;
   }

   //============================================================
   // <T>获得高度。</T>
   //
   // @method
   // @return Number 高度
   //============================================================
   MO.SRectangle_height = function SRectangle_height(){
      return this.size.height;
   }

   //============================================================
   // <T>接收一个矩形数据。</T>
   //
   // @method
   // @param value:SRectangle 矩形
   //============================================================
   MO.SRectangle_assign = function SRectangle_assign(value){
      var o = this;
      o.left = value.left;
      o.top = value.top;
      o.width = value.width;
      o.height = value.height;
   }

   //============================================================
   // <T>设置位置。</T>
   //
   // @method
   // @param left:Number 左位置
   // @param top:Number 上位置
   //============================================================
   MO.SRectangle_setLocation = function SRectangle_setLocation(left, top){
      var o = this;
      o.left = left;
      o.top = top;
   }

   //============================================================
   // <T>设置大小。</T>
   //
   // @method
   // @param width:Number 宽度
   // @param height:Number 高度
   //============================================================
   MO.SRectangle_setSize = function SRectangle_setSize(width, height){
      var o = this;
      o.width = width;
      o.height = height;
   }

   //============================================================
   // <T>设置位置和大小。</T>
   //
   // @method
   // @param left:Number 左位置
   // @param top:Number 上位置
   // @param width:Number 宽度
   // @param height:Number 高度
   //============================================================
   MO.SRectangle_set = function SRectangle_set(left, top, width, height){
      var o = this;
      o.left = left;
      o.top = top;
      o.width = width;
      o.height = height;
   }

   //============================================================
   // <T>获得字符串。</T>
   //
   // @return String 字符串
   //============================================================
   MO.SRectangle_toString = function SRectangle_toString(){
      var o = this;
      return o.position.x + ',' + o.position.y + ',' + o.size.width + ',' + o.size.height;
   }

   //============================================================
   // <T>释放处理。</T>
   //
   // @method
   //============================================================
   MO.SRectangle_dispose = function SRectangle_dispose(){
      var o = this;
      o.left = null;
      o.top = null;
      o.width = null;
      o.height = null;
   }
}
