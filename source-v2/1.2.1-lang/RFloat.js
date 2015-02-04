﻿//==========================================================
// <T>浮点数管理类。</T>
//
// @reference
// @author maocy
// @version 150131
//==========================================================
var RFloat = new function RFloat(){
   var o = this;
   //..........................................................
   // @define
   o.Chars     = '0123456789-.%';
   o.NUMBER    = '0123456789-.%';
   o.LEFT_CHAR = '0';
   //..........................................................
   // @method
   o.isFloat   = RFloat_isFloat;
   o.parse     = RFloat_parse;
   o.format    = RFloat_format;
   // @method
   o.nvl       = RFloat_nvl;
   o.toRange   = RFloat_toRange;
   o.sum       = RFloat_sum;
   o.calculate = RFloat_calculate;
   return o;
}

//===========================================================
// <T>判断内容是否为浮点数。</T>
//
// @method
// @param p:value:String 内容
// @return 是否为浮点数
//===========================================================
function RFloat_isFloat(p){
   return RString.isPattern(p, 'n');
}

//===========================================================
// <T>解析字符串为浮点数。</T>
//
// @method
// @param p:value:String 内容
// @return Number 浮点数
//===========================================================
function RFloat_parse(p){
   // 检查参数
   if(p == null){
      return 0;
   }
   // 去掉开始0字符
   var v = RString.trim(p.toString());
   while(true){
      if(v.charAt(0) != "0"){
         break;
      }
      v = v.substr(1);
   }
   // 获得内容
   var r = (v.length > 0) ? parseFloat(v) : 0;
   // 百分比处理
   if(RString.findChars(v, '%') != -1){
      r = r / 100;
   }
   // 返回内容
   return isNaN(r) ? 0 : r;
}

//===========================================================
// <T>格式化浮点数为指定格式。</T>
//
// @method
// @param v:value:Number 浮点数
// @param l:leftLength:Number 小数点左侧位数
// @param lp:leftPad:String 小数点左侧补足字符
// @param r:rightLength:Number 小数点右侧位数
// @param rp:rightPad:String 小数点右侧补足字符
// @return String 浮点数
//===========================================================
function RFloat_format(v, l, lp, r, rp){
   var o = this;
   // 校正参数
   if(!lp){
      lp = o.LEFT_CHAR;
   }
   if(!rp){
      rp = o.LEFT_CHAR;
   }
   // 分割内容
   var s = v.toString();
   var f = s.indexOf('.');
   if(f == -1){
      var sl = s;
      var sr = '';
   }else{
      var sl = s.substring(0, f);
      var sr = s.substring(f + 1, f + r + 1);
   }
   var fl = RString.lpad(sl, l, lp);
   var fr = RString.lpad(sr, r, rp);
   return fl + '.' + fr;
}

//===========================================================
// <T>获得非空内容。</T>
//
// @method
// @param v:value:Number 浮点数
// @param d:default:Number 缺省浮点数
// @return Number 浮点数
//===========================================================
function RFloat_nvl(v, d){
   return v ? v : (d ? d : 0);
}

//===========================================================
// <T>获得范围内浮点数。</T>
//
// @method
// @param v:value:Number 浮点数
// @param i:min:Number 最小浮点数
// @param a:max:Number 最大浮点数
// @return Number 浮点数
//===========================================================
function RFloat_toRange(v, i, a){
   if(v == null){
      v = 0;
   }
   return Math.min(Math.max(v, i), a);
}

//===========================================================
// <T>计算所有参数的浮点数之和。</T>
//
// @method
// @param p:values:Number 浮点数集合
// @return Number 浮点数
//===========================================================
function RFloat_sum(){
   var a = arguments;
   var r = 0;
   for(var i = a.length -1 ; i >= 0; i--){
      var v = a[n];
      if(v != null){
         r += parseFloat(v);
      }
   }
   return r;
}

//===========================================================
// <T>把两个字符串 进行算术运算。</T>
//
// @method
// @param v:value:Number 浮点数
// @param d:default:Number 缺省浮点数
// @return Number 浮点数
//===========================================================
function RFloat_calculate(f,a,b){
  var a = RFloat.nvl(a);
  var b = RFloat.nvl(b);
  a = parseFloat(a);
  b = parseFloat(b);
  if(f){
     return (a + b).toString();
  }else{
     return (a - b).toString();
  }
}
