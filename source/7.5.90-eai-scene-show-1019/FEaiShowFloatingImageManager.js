//==========================================================
// <T>预设聚焦参数管理器。</T>
//
// @class
// @author sunpeng
// @version 150929
//==========================================================
MO.FEaiShowFloatingImageManager = function FEaiShowFloatingImageManager(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._floatingImages = MO.Class.register(o, new MO.AGetSet('_floatingImages'));
   o._deltaX = 0;
   o._imgWidth = 240;
   o._imgHeight = 160;
   o._startTick = 0;
   o._slideDuration = 500;
   o._showDuration = 2000;
   //..........................................................
   // @method
   o.showLocation = MO.FEaiShowFloatingImageManager_showLocation;
   o.setVisibleAll = MO.FEaiShowFloatingImageManager_setVisibleAll;
   o.process = MO.FEaiShowFloatingImageManager_process;
   //..........................................................
   // @method
   o.construct = MO.FEaiShowFloatingImageManager_construct;
   o.setup = MO.FEaiShowFloatingImageManager_setup;
   o.dispose = MO.FEaiShowFloatingImageManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowFloatingImageManager_construct = function FEaiShowFloatingImageManager_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._floatingImages = new MO.TObjects();
}

//==========================================================
// <T>初始化。</T>
//
// @method
//==========================================================
MO.FEaiShowFloatingImageManager_setup = function FEaiShowFloatingImageManager_setup() {
   var o = this;

   var floatingImages = o._floatingImages;
   // 蚌埠
   var fiData = new MO.SShowFloatingImageData();
   fiData.name = 'bengbu';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/bengbu.jpg';
   fiData.longitude = 32.54;
   fiData.latitude = 117.23;
   fiData.startX = 0;
   fiData.startY = 100;
   fiData.endX = 1980;
   fiData.endY = 100;

   var frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   //frame.setVisible(false);
   floatingImages.push(frame);
   // 北京
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/beijing.jpg';
   fiData.longitude = 39.54;
   fiData.latitude = 116.24;
   fiData.startX = 0;
   fiData.startY = 200;
   fiData.endX = 1980;
   fiData.endY = 200;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   //frame.setVisible(false);
   floatingImages.push(frame);
   // 东南亚
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'seasian';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/seasian.jpg';
   fiData.longitude = 21.31;
   fiData.latitude = 96.6;
   fiData.startX = 0;
   fiData.startY = 300;
   fiData.endX = 1980;
   fiData.endY = 300;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   //frame.setVisible(false);
   floatingImages.push(frame);
   // 合肥
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'hefei';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/hefei.jpg';
   fiData.longitude = 31.49;
   fiData.latitude = 117.13;
   fiData.startX = 0;
   fiData.startY = 400;
   fiData.endX = 1980;
   fiData.endY = 400;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   //frame.setVisible(false);
   floatingImages.push(frame);
   // 兰州
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'lanzhou';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/lanzhou.jpg';
   fiData.longitude = 36.3;
   fiData.latitude = 103.50;
   fiData.startX = 0;
   fiData.startY = 500;
   fiData.endX = 1980;
   fiData.endY = 500;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   //frame.setVisible(false);
   floatingImages.push(frame);
   // 纽约
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'newyork';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/newyork.jpg';
   fiData.longitude = 40.42;
   fiData.latitude = -74.0;
   fiData.startX = 0;
   fiData.startY = 600;
   fiData.endX = 1980;
   fiData.endY = 600;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   //frame.setVisible(false);
   floatingImages.push(frame);
   // 上海
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'shanghai';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/shanghai.jpg';
   fiData.longitude = 31.13;
   fiData.latitude = 121.28;
   fiData.startX = 0;
   fiData.startY = 700;
   fiData.endX = 1980;
   fiData.endY = 700;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   //frame.setVisible(false);
   floatingImages.push(frame);
   // 香港
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'hongkong';
   fiData.displayImageUrl = '{eai.resource}/show1019/locations/hongkong.jpg';
   fiData.longitude = 22.23;
   fiData.latitude = 114.6;
   fiData.startX = 0;
   fiData.startY = 800;
   fiData.endX = 1980;
   fiData.endY = 800;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(o._imgWidth);
   frame.setHeight(o._imgHeight);
   frame.setup(fiData);
   frame.build();
   //frame.setVisible(false);
   floatingImages.push(frame);

   var gap = o._imgWidth + 30;
   var count = floatingImages.count();
   for (var i = 0; i < count; i++) {
      var fi = floatingImages.at(i);
      var x = -gap * 8 + gap * i;
      fi.setLocation(x, 910);
   }
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FEaiShowFloatingImageManager_process = function FEaiShowFloatingImageManager_process(radianY) {
   var o = this;

   //var passedTick = MO.Timer.current() - o._startTick;
   //if (passedTick < o._slideDuration) {

   //}


   var gap = o._imgWidth + 30;
   var floatingImages = o._floatingImages;
   var count = floatingImages.count();
   for (var i = 0; i < count; i++) {
      var fi = floatingImages.at(i);
      fi.floatingAnime(radianY);
      fi.location().x++;
      if (fi.location().x > gap * 8) {
         fi.location().x = -gap;
      }
      fi.dirty();
   }
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FEaiShowFloatingImageManager_setVisibleAll = function FEaiShowFloatingImageManager_setVisibleAll(visible) {
   var o = this;
   var floatingImages = o._floatingImages;
   var count = floatingImages.count();
   for (var i = 0; i < count; i++) {
      var fi = floatingImages.at(i);
      fi.setVisible(visible);
   }
}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FEaiShowFloatingImageManager_showLocation = function FEaiShowFloatingImageManager_showLocation(locationId) {
   var o = this;



   var passedTick = MO.Timer.current() - o._startTick;
   if (passedTick < o._slideDuration) {

   }


   //var gap = o._imgWidth + 30;
   //var floatingImages = o._floatingImages;
   //var count = floatingImages.count();
   //for (var i = 0; i < count; i++) {
   //   var fi = floatingImages.at(i);
   //   fi.floatingAnime(radianY);
   //   fi.location().x++;
   //   if (fi.location().x > gap * 8) {
   //      fi.location().x = -gap;
   //   }
   //   fi.dirty();
   //}
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.FEaiShowFloatingImageManager_dispose = function FEaiShowFloatingImageManager_dispose() {
   var o = this;
   o._floatingImages = MO.Lang.Object.dispose(o._floatingImages);
}