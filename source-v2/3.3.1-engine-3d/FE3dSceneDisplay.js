 //==========================================================
// <T>场景显示对象。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FE3dSceneDisplay(o){
   o = RClass.inherits(this, o, FE3dTemplate);
   //..........................................................
   // @attribute
   o._dataReady        = false;
   o._movieMatrix      = null;
   o._resourceScene    = null;
   o._materials        = null;
   o._movies           = null;
   //..........................................................
   // @method
   o.construct         = FE3dSceneDisplay_construct;
   // @method
   o.resourceScene     = FE3dSceneDisplay_resourceScene;
   o.loadSceneResource = FE3dSceneDisplay_loadSceneResource;
   o.loadResource      = FE3dSceneDisplay_loadResource;
   o.process           = FE3dSceneDisplay_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSceneDisplay_construct(){
   var o = this;
   o.__base.FE3dTemplate.construct.call(o);
   o._movieMatrix = new SMatrix3d();
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FRs3SceneDisplay 资源
//==========================================================
function FE3dSceneDisplay_resourceScene(){
   return this._resourceScene;
}

//==========================================================
// <T>加载空间资源。</T>
//
// @method
// @param p:resource:FRs3SceneSpace 空间资源
//==========================================================
function FE3dSceneDisplay_loadSceneResource(p){
   var o = this;
   o._resourceScene = p;
   // 设置矩阵
   o._matrix.assign(p.matrix());
   // 设置材质集合
   var rms = p.materials();
   if(rms){
      var c = rms.count();
      var ms = o._materials = new TDictionary();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FE3dSceneMaterial);
         m.loadSceneResource(rm);
         ms.set(rm.groupGuid(), m);
      }
   }
   // 加载动画集合
   var rms = p.movies();
   if(rms){
      var c = rms.count();
      var ms = o._movies = new TObjects();
      for(var i = 0; i < c; i++){
         var rm = rms.get(i);
         var m = RClass.create(FE3dSceneDisplayMovie);
         m.loadResource(rm);
         ms.push(m);
      }
   }
}

//==========================================================
// <T>加载资源。</T>
//
// @param p:resource:FRs3Template 资源
//==========================================================
function FE3dSceneDisplay_loadResource(p){
   var o = this;
   // 加载渲染集合
   var ms = o._materials;
   var rds = p.displays();
   var c = rds.count();
   if(c > 0){
      //var rs = o._templateRenderables = new TObjects();
      for(var i = 0; i < c; i++){
         var rd = rds.get(i);
         // 创建显示对象
         var r = RClass.create(FE3dSceneDisplayRenderable);
         r._display = o;
         r._context = o._context;
         r.loadResource(rd);
         o.pushRenderable(r);
         // 加载材质
         var rdm = rd.materials().first();
         var m = ms.get(rdm.groupGuid());
         if(m){
            r.loadMaterial(m);
         }
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dSceneDisplay_process(p){
   var o = this;
   o.__base.FE3dTemplate.process.call(o, p);
   // 加载动画集合
   var m = o._currentMatrix.identity();
   var ms = o._movies;
   if(ms){
      var c = ms.count();
      for(var i = 0; i < c; i++){
         ms.get(i).process(o._movieMatrix);
      }
      m.append(o._movieMatrix);
   }
   m.append(o._matrix);
}