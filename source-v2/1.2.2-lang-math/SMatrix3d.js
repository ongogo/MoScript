﻿//==========================================================
// <T>三维矩阵。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SMatrix3d(o){
   if(!o){o = this;}
   SMatrix4x4(o);
   //..........................................................
   // @attribute
   o._dirty         = false;
   // @attribute
   o.tx             = 0;
   o.ty             = 0;
   o.tz             = 0;
   o.rx             = 0;
   o.ry             = 0;
   o.rz             = 0;
   o.sx             = 1;
   o.sy             = 1;
   o.sz             = 1;
   //..........................................................
   // @method
   o.identity       = SMatrix3d_identity;
   o.setTranslate   = SMatrix3d_setTranslate;
   o.setRotation    = SMatrix3d_setRotation;
   o.setScale       = SMatrix3d_setScale;
   o.set            = SMatrix3d_set;
   o.setAll         = SMatrix3d_setAll;
   o.equals         = SMatrix3d_equals;
   o.assign         = SMatrix3d_assign;
   o.append         = SMatrix3d_append;
   o.updateForce    = SMatrix3d_updateForce;
   o.update         = SMatrix3d_update;
   o.serialize      = SMatrix3d_serialize;
   o.unserialize    = SMatrix3d_unserialize;
   //..........................................................
   // @construct
   o.identity();
   return o;
}

//============================================================
// <T>单位化处理。</T>
//
// @method
//============================================================
function SMatrix3d_identity(){
   var o = this;
   o.tx = o.ty = o.tz = 0;
   o.rx = o.ry = o.rz = 0;
   o.sx = o.sy = o.sz = 1;
   var d = o._data;
   d[ 0] = 1; d[ 1] = 0; d[ 2] = 0; d[ 3] = 0;
   d[ 4] = 0; d[ 5] = 1; d[ 6] = 0; d[ 7] = 0;
   d[ 8] = 0; d[ 9] = 0; d[10] = 1; d[11] = 0;
   d[12] = 0; d[13] = 0; d[14] = 0; d[15] = 1;
   return o;
}

//============================================================
// <T>设置平移内容。</T>
//
// @method
// @param x:Float X坐标
// @param y:Float Y坐标
// @param z:Float Z坐标
//============================================================
function SMatrix3d_setTranslate(x, y, z){
   var o = this;
   o.tx = x;
   o.ty = y;
   o.tz = z;
   o._dirty = true;
}

//============================================================
// <T>设置旋转内容。</T>
//
// @method
// @param x:Float X旋转
// @param y:Float Y旋转
// @param z:Float Z旋转
//============================================================
function SMatrix3d_setRotation(x, y, z){
   var o = this;
   o.rx = x;
   o.ry = y;
   o.rz = z;
   o._dirty = true;
}

//============================================================
// <T>设置缩放内容。</T>
//
// @method
// @param x:Float X缩放
// @param y:Float Y缩放
// @param z:Float Z缩放
//============================================================
function SMatrix3d_setScale(x, y, z){
   var o = this;
   o.sx = x;
   o.sy = y;
   o.sz = z;
   o._dirty = true;
}

//============================================================
// <T>设置内容。</T>
//
// @method
// @param pt:SPoint3 坐标
// @param pr:SVector3 旋转
// @param ps:SVector3 缩放
//============================================================
function SMatrix3d_set(pt, pr, ps){
   var o = this;
   o.tx = pt.x;
   o.ty = pt.y;
   o.tz = pt.z;
   o.rx = pr.x;
   o.ry = pr.y;
   o.rz = pr.z;
   o.sx = ps.x;
   o.sy = ps.y;
   o.sz = ps.z;
   o._dirty = true;
}

//============================================================
// <T>设置内容。</T>
//
// @method
// @param ptx:Float X坐标
// @param pty:Float Y坐标
// @param ptz:Float Z坐标
// @param prx:Float X旋转
// @param pry:Float Y旋转
// @param prz:Float Z旋转
// @param psx:Float X缩放
// @param psy:Float Y缩放
// @param psz:Float Z缩放
//============================================================
function SMatrix3d_setAll(ptx, pty, ptz, prx, pry, prz, psx, psy, psz){
   var o = this;
   o.tx = ptx;
   o.ty = pty;
   o.tz = ptz;
   o.rx = prx;
   o.ry = pry;
   o.rz = prz;
   o.sx = psx;
   o.sy = psy;
   o.sz = psz;
   o._dirty = true;
}

//============================================================
// <T>判断是否相等。</T>
//
// @method
// @param p:matrix:SMatrix3d 矩阵
// @return Boolean 是否相等
//============================================================
function SMatrix3d_equals(p){
   return this.equalsData(p._data);
}

//============================================================
// <T>接收一个矩阵。</T>
//
// @method
// @param p:matrix:SMatrix3d 矩阵
//============================================================
function SMatrix3d_assign(p){
   this.assignData(p._data);
}

//============================================================
// <T>追加一个矩阵。</T>
//
// @method
// @param p:value:SMatrix3d 矩阵
//============================================================
function SMatrix3d_append(p){
   this.appendData(p._data);
}

//============================================================
// <T>强制更新数据。</T>
//
// @method
//============================================================
function SMatrix3d_updateForce(){
   var o = this;
   var d = o._data;
   var rsx = Math.sin(o.rx);
   var rcx = Math.cos(o.rx);
   var rsy = Math.sin(o.ry);
   var rcy = Math.cos(o.ry);
   var rsz = Math.sin(o.rz);
   var rcz = Math.cos(o.rz);
   d[ 0] = rcy * rcz * o.sx;
   d[ 1] = rcy * rsz * o.sx;
   d[ 2] = -rsy * o.sx;
   d[ 3] = 0;
   d[ 4] = (rsx * rsy * rcz - rcx * rsz) * o.sy;
   d[ 5] = (rsx * rsy * rsz + rcx * rcz) * o.sy;
   d[ 6] = rsx * rcy * o.sy;
   d[ 7] = 0;
   d[ 8] = (rcx * rsy * rcz + rsx * rsz) * o.sz;
   d[ 9] = (rcx * rsy * rsz - rsx * rcz) * o.sz;
   d[10] = rcx * rcy * o.sz;
   d[11] = 0;
   d[12] = o.tx;
   d[13] = o.ty;
   d[14] = o.tz;
   d[15] = 1;
}

//============================================================
// <T>更新数据。</T>
//
// @method
//============================================================
function SMatrix3d_update(){
   var o = this;
   if(o._dirty){
      o.updateForce();
      o._dirty = false;
   }
}

//==========================================================
// <T>序列化数据到输出流里。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SMatrix3d_serialize(p){
   var o = this;
   p.writeFloat(o.tx);
   p.writeFloat(o.ty);
   p.writeFloat(o.tz);
   p.writeFloat(o.rx);
   p.writeFloat(o.ry);
   p.writeFloat(o.rz);
   p.writeFloat(o.sx);
   p.writeFloat(o.sy);
   p.writeFloat(o.sz);
}

//==========================================================
// <T>从输入流里反序列化数据。</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function SMatrix3d_unserialize(p){
   var o = this;
   o.tx = p.readFloat();
   o.ty = p.readFloat();
   o.tz = p.readFloat();
   o.rx = p.readFloat();
   o.ry = p.readFloat();
   o.rz = p.readFloat();
   o.sx = p.readFloat();
   o.sy = p.readFloat();
   o.sz = p.readFloat();
   o.updateForce();
}
