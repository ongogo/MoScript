﻿//==========================================================
// <T>对象类的基础对象。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TClassBase(o){
   if(!o){o = this;}
   // @attribute
   o.__disposed = true;
   return o;
}