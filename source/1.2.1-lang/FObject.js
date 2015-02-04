﻿//==========================================================
// <T>所有可继承对象的基类。</T>
// <P>支持类的判断、获取内部运行信息的功能。</P>
//
// @class
// @author maocy
// @version 141230
//==========================================================
function FObject(o){
   if(!o){o = this;}
   //..........................................................
   // @attribute TClass 类对象
   o.__class   = null;
   o.__dispose = false;
   //..........................................................
   // @method
   o.construct = FObject_construct;
   // @method
   o.toString  = FObject_toString;
   // @method
   o.dispose   = FObject_dispose;
   // @method
   o.innerDump = FObject_innerDump;
   o.dump      = FObject_dump;
   return o;
}

//==========================================================
// <T>构建当前对象的实例。</T>
//
// @method
//==========================================================
function FObject_construct(){
   var o = this;
   o.__dispose = false;
}

//==========================================================
// <T>获取当前实例的信息。</T>
//
// @method
// @return String 信息字符串
//==========================================================
function FObject_toString(){
   return RClass.dump(this);
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
function FObject_dispose(){
   var o = this;
   RObject.free(o);
   o.__dispose = true;
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @param s:dump:TString 字符串
// @param l:level:Integer 递归层次
//==========================================================
function FObject_innerDump(s, l){
   s.append(RClass.dump(this));
}

//==========================================================
// <T>获取运行信息。</T>
//
// @method
// @return String 字符串
//==========================================================
function FObject_dump(){
   var r = new TString();
   this.innerDump(r, 0);
   return r.flush();
}