//==========================================================
// <T>图表实时场景。</T>
//
// @class
// @author sunpeng
// @history 150928
//==========================================================
MO.FEaiChartShow1022Scene = function FEaiChartShow1022Scene(o){
   o = MO.Class.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._optionBackground        = false;
   o._code                    = MO.EEaiScene.ChartWorld;
   o._optionMapCity3d         = true;
   // @attribute
   o._mapReady                = false;
   o._playing                 = false;
   // @attribute
   o._statusStart             = false;
   o._statusLayerCount        = 100;
   o._statusLayerLevel        = 100;
   // @attribute
   o._operationPoint          = null;
   o._operationRotationX      = 0;
   o._operationRotationY      = 0;
   o._rotationX               = 0;
   o._rotationY               = 0;
   o._rotationZ               = 0;
   o._startRotateX            = 0;
   o._startRotateY            = 0;
   o._startRotateZ            = 0;
   o._targetRotateX           = 0;
   o._targetRotateY           = 0;
   o._targetRotateZ           = 0;
   o._translateY              = 0;
   o._startTranslateY         = 0;
   o._targetTranslateY        = 0;
   o._startTick               = 0;
   o._earthMoving             = false;
   o.__moveEarthDuration      = 500;
   o._opMouseDown             = false;
   o._opMouseMoved            = false;
   o.__opMouseMoveThreshold   = 4;
   o._autoRotate              = true;
   o._showChina               = false;
   // hack
   o._showingMktInfo          = false;
   // @attribute
   o._countryTable            = null;
   o._provinceTable           = null;
   o._selectedProvinceCode    = 0;
   o._provinceUnits           = null;
   o._countryUnits            = null;
   // @attribute
   o._worldScale              = 300;
   o._startWorldScale         = 300;
   o._targetWorldScale        = 300;
   o._cameraFrom              = null;
   o._cameraTo                = null;
   o._cameraDirection         = null;
   o._ccDirection             = null;
   o._facePosition            = null;
   // @attribute
   o._organizationDataTicker  = null;
   o._organizationInfo        = null;
   // @attribute
   o._socket                  = null;
   o._focusParamManager       = null;
   o._remoteRotate            = null;
   // @attribute
   o._displayPhase            = 0;
   o._videoDataList           = null;
   o._videoRenderables        = null;
   o._currentVideoData        = null;
   o._currentVideoRenderable  = null;
   o._videoCount              = 4;
   o._videoAnimeDuration      = 500;
   o._videoAnimeStartTick     = 0;
   // @attribute
   o._lineManager             = null;
   o._locations               = null;
   o._floatingImageManager    = null;
   o._rotateVector            = null;
   o._rotateRadian            = 0;
   // @attribute
   o._processor               = null;
   // @attribute
   o._logoBar                 = null;
   o._timeline                = null;
   o._liveTable               = null;
   o._boardProcessor          = null;
   // @attribute
   o._titlePic                = null;
   o._copyrightPic            = null;
   // @attribute
   o._showVideoSE             = null;
   //..........................................................
   // @event
   o.onSocketReceived         = MO.FEaiChartShow1022Scene_onSocketReceived;
   o.onOrganizationFetch      = MO.FEaiChartShow1022Scene_onOrganizationFetch;
   // @event
   o.onOperationKeyDown       = MO.FEaiChartShow1022Scene_onOperationKeyDown;
   o.onOperationDown          = MO.FEaiChartShow1022Scene_onOperationDown;
   o.onOperationMove          = MO.FEaiChartShow1022Scene_onOperationMove;
   o.onOperationUp            = MO.FEaiChartShow1022Scene_onOperationUp;
   o.onOperationWheel         = MO.FEaiChartShow1022Scene_onOperationWheel;
   // @event
   o.onInvestmentDataChanged  = MO.FEaiChartShow1022Scene_onInvestmentDataChanged;
   o.on24HDataChanged         = MO.FEaiChartShow1022Scene_on24HDataChanged;
   o.onOperationVisibility    = MO.FEaiChartShow1022Scene_onOperationVisibility;
   o.onProcessReady           = MO.FEaiChartShow1022Scene_onProcessReady;
   o.onProcess                = MO.FEaiChartShow1022Scene_onProcess;
   o.onSwitchProcess          = MO.FEaiChartShow1022Scene_onSwitchProcess;
   o.onSwitchComplete         = MO.FEaiChartShow1022Scene_onSwitchComplete;
   //..........................................................
   // @method
   o.construct                = MO.FEaiChartShow1022Scene_construct;
   o.setup                    = MO.FEaiChartShow1022Scene_setup;
   o.showFace                 = MO.FEaiChartShow1022Scene_showFace;
   o.fixMatrix                = MO.FEaiChartShow1022Scene_fixMatrix;
   // @method
   o.processResize            = MO.FEaiChartShow1022Scene_processResize;
   // @method
   o.switchDisplayPhase       = MO.FEaiChartShow1022Scene_switchDisplayPhase;
   o.resetDisplayPhase        = MO.FEaiChartShow1022Scene_resetDisplayPhase;
   o.videoFullScreenAnime     = MO.FEaiChartShow1022Scene_videoFullScreenAnime;
   o.onVideoEnded             = MO.FEaiChartShow1022Scene_onVideoEnded;
   return o;
}

//==========================================================
// <T>视频播放结束返回前一段循环播放。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onVideoEnded = function FEaiChartShow1022Scene_onVideoEnded() {
   var video = this;
   video.currentTime = 20;
   video.play();
}

//==========================================================
// <T>24小时曲线数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_on24HDataChanged = function FEaiChartShow1022Scene_on24HDataChanged(event) {
   var o = this;
   // 设置表格数据
   var timeline = o._timeline;
   timeline.startTime().assign(event.beginDate);
   timeline.endTime().assign(event.endDate);
   timeline.trendInfo().unserializeSignBuffer(event.sign, event.content, true);
   timeline.dirty();
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onInvestmentDataChanged = function FEaiChartShow1022Scene_onInvestmentDataChanged(event) {
   var o = this;
   var unit = event.unit;
   // 设置表格数据
   var table = o._liveTable;
   table.setRankUnits(event.rankUnits);
   table.pushUnit(unit);
   table.dirty();
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onSocketReceived = function FEaiChartShow1022Scene_onSocketReceived(event) {
   var o = this;
   var message = event.message;

   if (o._displayPhase == 0 || o._displayPhase == 3) {

      var tagIndex = message.indexOf('tag');
      if (tagIndex != -1) {
         var tag = message.substr(tagIndex + 4);
         o._startTranslateY = o._translateY;
         o._startRotateY = o._rotationY;
         o._startWorldScale = o._worldScale;
         var focusParam = o._focusParamManager.getFocusParameter(tag);
         o._targetWorldScale = focusParam.scale;
         o._targetRotateY = focusParam.rotateY;
         o._targetTranslateY = focusParam.translateY;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = false;
      }

      var rotateIndex = message.indexOf('rotation');
      if (rotateIndex != -1) {
         var rotate = o._remoteRotate;
         rotate.parse(message.substr(rotateIndex + 9));
         o._rotationX = rotate.x;
         o._rotationY = rotate.y;
         o._rotationZ = rotate.z;
      }

      var areaIndex = message.indexOf('area');
      if (areaIndex != -1) {
         var areaId = message.substr(areaIndex + 5);
         //o._floatingImageManager.setAutoShow(false);
         //o._floatingImageManager.showLocation(areaId);
         //o._boardProcessor.setAutoPlay(false);
         o._boardProcessor.showArea(areaId);
      }

      var autoRotateIndex = message.indexOf('autoRotate');
      if (autoRotateIndex != -1) {
         o._autoRotate = new Boolean(parseInt(message.substr(autoRotateIndex + 11)));
         o._boardProcessor.setAutoRotation(o._autoRotate);
      }

   }
   
   var nextIndex = message.indexOf('next');
   if (nextIndex != -1) {
      o.switchDisplayPhase(++o._displayPhase);
   }

   var restIndex = message.indexOf('reset');
   if (restIndex != -1) {
      o.resetDisplayPhase();
   }

}

//==========================================================
// <T>切换过程处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_videoFullScreenAnime = function FEaiChartShow1022Scene_videoFullScreenAnime() {
   var o = this;
   var revert = false;
   switch (o._displayPhase) {
      case 0: // 待机画面
         break;
      case 1: // 播放视频1
         break;
      case 2: // 收起视频1
         revert = true;
         break;
      case 3: // 手控转动地球
         break;
      case 4: // 显示实时投资
         break;
      case 5: // 播放视频2
         break;
      case 6: // 收起视频2
         revert = true;
         break;
      case 7: // 播放视频3
         break;
      case 8: // 收起视频3
         revert = true;
         break;
      case 9: // 播放视频4
         break;
      case 10:// 收起视频4
         revert = true;
         break;
      default:
         break;
   }
   var currentTick = MO.Timer.current();
   var passedTick = currentTick - o._videoAnimeStartTick;
   var t = passedTick / o._videoAnimeDuration;
   if (revert) {
      t = 1 - t;
   }
   if (t < 0) {
      o._currentVideoData.hVideo().pause();
      o._currentVideoData.hVideo().currentTime = 0;
      o.switchDisplayPhase(++o._displayPhase);
      return;
   }
   if (t > 1) {
      t = 1;
   }

   var videoRenderable = o._currentVideoRenderable;
   var matrix = videoRenderable.matrix();
   matrix.sx = 1024 * t;
   matrix.sy = 768 * t;
   matrix.sz = 1;
   matrix.tx = (1024 - 1024 * t) * 0.5;
   matrix.ty = (768 - 768 * t) * 0.5;;
   matrix.tz = 0;
   matrix.updateForce();
}

//==========================================================
// <T>表格数据变更处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onOrganizationFetch = function FEaiChartShow1022Scene_onOrganizationFetch(event) {
   var o = this;
   //var mapEntity = o._mapEntity;
   //// 读取数据
   //var info = o._organizationInfo;
   //info.unserializeSignBuffer(event.sign, event.content, true);
   //o._countryTable.setUnits(info._department2s);
   //// 设置前20数据
   //var countryUnits = o._countryUnits;
   //var department4s = info._department4s;
   //countryUnits.clear();
   //for (var i = 0; i < 20; i++) {
   //   countryUnits.push(department4s.at(i));
   //}
   //// 设置城市数据
   //var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   //var cityModule = entityConsole.cityModule();
   //var citys = info.citys();
   //var cityCount = citys.count();
   //for(var i = 0; i < cityCount; i++){
   //   var city = citys.at(i);
   //   var card = city.card();
   //   var cityEntity = cityModule.findByCard(card);
   //   if(cityEntity){
   //      cityEntity.update(city);
   //   }
   //}
   //mapEntity.upload();
}

//==========================================================
// <T>操作可见处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onOperationVisibility = function FEaiChartShow1022Scene_onOperationVisibility(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationVisibility.call(o, event);
   if (event.visibility) {
      //o._groundAutio.play();
      //o._countryEntity._audioMapEnter._hAudio.muted = false;
   } else {
      o._groundAutio.pause();
      o._countryEntity._audioMapEnter._hAudio.muted = true;
   }
}

//==========================================================
// <T>准备好处理。</T>
//
// @method
//==========================================================
MO.FEaiChartShow1022Scene_onProcessReady = function FEaiChartShow1022Scene_onProcessReady() {
   var o = this;
   o.__base.FEaiChartScene.onProcessReady.call(o);
   // 显示地图
   o._mapEntity.showWorld();
   // 显示国家
   var countryEntity = o._countryEntity;
   countryEntity.start();
   o._mapEntity.showCountry(countryEntity);
   // 显示城市
   o._mapEntity.showCity();
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartShow1022Scene_onProcess = function FEaiChartShow1022Scene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   // 检测首次播放
   if (!o._statusStart) {
      if (MO.Window.Browser.capability().soundConfirm) {
         var iosPlay = document.getElementById('id_ios_play');
         if (iosPlay) {
            MO.Window.Html.visibleSet(iosPlay, true);
         }
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
      } else {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
      }
      if (o._statusLayerLevel <= 0) {
         if (hLoading) {
            document.body.removeChild(hLoading);
         }
         // 加载完成
         o.processLoaded();
         o._playing = true;
         o._statusStart = true;
      }
   }
   // 重复播放
   if (o._playing) {
      // 显示界面
      if (!o._mapReady) {
         o._guiManager.show();
         o._southSea.setVisible(false);
         // 淡出显示界面
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.01);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      //..........................................................
      // 网络处理
      o._socket.process();
      //..........................................................
      // 更新国家
      o._countryEntity.process();
      //..........................................................
      // 刷新组织数据
      //if (o._organizationDataTicker.process()) {
      //   MO.Console.find(MO.FEaiLogicConsole).statistics().department().doOrganization(o, o.onOrganizationFetch, 2);
      //}
      //..........................................................
      // 计算形状
      var mapEntity = o._mapEntity;
      o.fixMatrix(mapEntity.cityRangeRenderable().matrix());
      o.fixMatrix(mapEntity.cityCenterRenderable().matrix());
      o.fixMatrix(mapEntity.countryFaceDisplay().matrix());
      o.fixMatrix(mapEntity.countryBorderDisplay().matrix());
      mapEntity.process();

      // 更新视频画面
      var currentVideoData = o._currentVideoData;
      if (currentVideoData != null) {
         o.videoFullScreenAnime();
         currentVideoData.process();
      }

      // 实时投资数据
      o._processor.process();
      //..........................................................
      // 设置数据
      var logoBar = o._logoBar;
      // 获取所有信息
      var processor = o._processor;
      if (processor.invementDayCurrent() > 0) {
         // 投资总金额
         var investmentTotal = logoBar.findComponent('investmentTotal');
         investmentTotal.setValue(parseInt(processor.invementTotalCurrent()).toString());
         // 日投资金额
         var investmentDay = logoBar.findComponent('investmentDay');
         investmentDay.setValue(parseInt(processor.invementDayCurrent()).toString());
      }
      //..........................................................
      // 更新时间
      if (o._nowTicker.process()) {
         var bar = o._logoBar;
         var date = o._nowDate;
         date.setNow();
         var dateControl = bar.findComponent('date');
         dateControl.setLabel(date.format('YYYY/MM/DD'));
         var timeControl = bar.findComponent('time');
         timeControl.setLabel(date.format('HH24:MI'));
      }

      //o._lineManager.upload();
      //o._floatingImageManager.process(o._rotateRadian);
      //o._boardProcessor.process(o._rotateRadian);
   }
}

//==========================================================
// <T>键盘消息处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onOperationKeyDown = function FEaiChartShow1022Scene_onOperationKeyDown(event) {
   var o = this;
   o.__base.FEaiChartScene.onOperationKeyDown.call(o, event);

   if (event.keyCode == MO.EKeyCode.Space) {
      o._displayPhase++;
      o.switchDisplayPhase(o._displayPhase);
   }
   else if (event.keyCode == MO.EKeyCode.R) {
      o.resetDisplayPhase();
   }
   else if (event.keyCode == MO.EKeyCode.F) {
      var videoData = o._currentVideoData;
      videoData.hVideo().currentTime = 5;
      videoData.hVideo().play();
   }
}

//==========================================================
// <T>键盘消息处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_resetDisplayPhase = function FEaiChartShow1022Scene_resetDisplayPhase(phase) {
   var o = this;
   // 隐藏全部视频
   o._videoRenderables.at(0).setVisible(false);
   o._videoRenderables.at(1).setVisible(false);
   o._videoRenderables.at(2).setVisible(false);
   o._videoRenderables.at(3).setVisible(false);
   // 重置视频播放进度
   if (o._currentVideoData) {
      o._currentVideoData.hVideo().pause();
      o._currentVideoData.hVideo().currentTime = 0;
      o._currentVideoData = null;
      o._currentVideoRenderable = null;
   }
   // 收起实时投资
   o._logoBar.setVisible(false);
   o._timeline.setVisible(false);
   o._liveTable.setVisible(false);
   o._countryEntity._borderShape.setVisible(false);
   o._countryEntity._faceShape.setVisible(false);
   o._startTranslateY = o._translateY;
   o._startRotateX = o._rotationX;
   o._startRotateY = o._rotationY;
   o._startRotateZ = o._rotationZ;
   o._startWorldScale = o._worldScale;
   o._targetTranslateY = 0;
   o._targetRotateX = o._rotationX;
   o._targetRotateY = o._rotationY;
   o._targetRotateZ = o._rotationZ;
   o._targetWorldScale = 300;
   o._startTick = MO.Timer.current();
   o._earthMoving = true;
   o._autoRotate = false;
   o._showChina = false;
   // 重置
   o._displayPhase = 0;
   o.switchDisplayPhase(o._displayPhase);
}

//==========================================================
// <T>键盘消息处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_switchDisplayPhase = function FEaiChartShow1022Scene_switchDisplayPhase(phase) {
   var o = this;
   if (phase == 0 || phase == 3) {
      o._titlePic.setVisible(true);
      o._copyrightPic.setVisible(true);
   }
   else {
      o._titlePic.setVisible(false);
      o._copyrightPic.setVisible(false);
   }
   
   // 隐藏全部视频
   o._videoRenderables.at(0).setVisible(false);
   o._videoRenderables.at(1).setVisible(false);
   o._videoRenderables.at(2).setVisible(false);
   o._videoRenderables.at(3).setVisible(false);

   o._videoAnimeStartTick = MO.Timer.current();
   //o._floatingImageManager.setAutoShow(false);
   if (window.stop !== undefined) {
      window.stop();
   }
   else if (document.execCommand !== undefined) {
      document.execCommand("Stop", false);
   }
   o._boardProcessor.setAutoPlay(false);
  
   switch (phase) {
      case 0: // 待机画面
         //o._floatingImageManager.setAutoShow(true);
         o._boardProcessor.reload();
         o._boardProcessor.setAutoPlay(true);
         o._socket.send('phase=0');
         break;
      case 1: // 播放视频1
         o._socket.send('phase=1');
         o._currentVideoRenderable = o._videoRenderables.at(0);
         o._currentVideoRenderable.setVisible(true);
         o._currentVideoData = o._videoDataList.at(0);
         o._currentVideoData.hVideo().load();
         o._currentVideoData.hVideo().play();
         o._showVideoSE.play();
         break;
      case 2: // 收起视频1
         o._videoRenderables.at(0).setVisible(true);
         break;
      case 3: // 手控转动地球
         // 重置视频1参数
         o._videoDataList.at(0).hVideo().pause();
         o._videoDataList.at(0).hVideo().currentTime = 0;
         // 直接跳到phase 4
         o.switchDisplayPhase(++o._displayPhase);
         break;
      case 4: // 显示实时投资
         o._logoBar.setVisible(true);
         o._timeline.setVisible(true);
         o._liveTable.setVisible(true);
         o._guiManager.hide();
         o._mapReady = false;
         o._startTranslateY = o._translateY;
         o._startRotateX = o._rotationX;
         o._startRotateY = o._rotationY;
         o._startRotateZ = o._rotationZ;
         o._startWorldScale = o._worldScale;
         var focusParam = o._focusParamManager.getFocusParameter('china1024');
         o._targetWorldScale = focusParam.scale;
         o._targetRotateX = 0;
         o._targetRotateY = focusParam.rotateY;
         o._targetRotateZ = 0;
         o._targetTranslateY = focusParam.translateY;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = false;
         o._showChina = true;
         break;
      case 5: // 播放视频2
         o._showVideoSE.play();
         // 收起实时投资
         o._logoBar.setVisible(false);
         o._timeline.setVisible(false);
         o._liveTable.setVisible(false);
         o._countryEntity._borderShape.setVisible(false);
         o._countryEntity._faceShape.setVisible(false);
         o._startTranslateY = o._translateY;
         o._startRotateX = o._rotationX;
         o._startRotateY = o._rotationY;
         o._startRotateZ = o._rotationZ;
         o._startWorldScale = o._worldScale;
         o._targetTranslateY = 0;
         o._targetRotateX = o._rotationX;
         o._targetRotateY = o._rotationY;
         o._targetRotateZ = o._rotationZ;
         o._targetWorldScale = 300;
         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = false;
         o._showChina = false;
         // 播放视频2
         o._currentVideoRenderable = o._videoRenderables.at(1);
         o._currentVideoRenderable.setVisible(true);
         o._currentVideoData = o._videoDataList.at(1);
         o._currentVideoData.hVideo().load();
         o._currentVideoData.hVideo().play();
         break;
      case 6: // 收起视频2
         o._videoRenderables.at(1).setVisible(true);
         break;
      case 7: // 播放视频3
         o._showVideoSE.play();
         // 重置视频2参数
         o._videoDataList.at(1).hVideo().pause();
         o._videoDataList.at(1).hVideo().currentTime = 0;
         // 播放视频3
         o._currentVideoRenderable = o._videoRenderables.at(2);
         o._currentVideoRenderable.setVisible(true);
         o._currentVideoData = o._videoDataList.at(2);
         o._currentVideoData.hVideo().load();
         o._currentVideoData.hVideo().play();
         break;
      case 8: // 收起视频3
         o._videoRenderables.at(2).setVisible(true);
         break;
      case 9: // 播放视频4
         o._showVideoSE.play();
         // 重置视频3参数
         o._videoDataList.at(2).hVideo().pause();
         o._videoDataList.at(2).hVideo().currentTime = 0;
         // 播放视频4
         o._currentVideoRenderable = o._videoRenderables.at(3);
         o._currentVideoRenderable.setVisible(true);
         o._currentVideoData = o._videoDataList.at(3);
         o._currentVideoData.hVideo().load();
         o._currentVideoData.hVideo().play();
         break;
      case 10:// 收起视频4
         o._videoRenderables.at(3).setVisible(true);
         break;
      default:// 回到Phase 0
         o._displayPhase = 0;
         o.switchDisplayPhase(o._displayPhase);
         break;
   }
}

//==========================================================
// <T>操作落下处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onOperationDown = function FEaiChartShow1022Scene_onOperationDown(event) {
   var o = this;
   o._opMouseDown = true;

   // hack
   //if (o._showingMktInfo) {
   //   return;
   //}

   o._operationRotationX = o._rotationX;
   o._operationRotationY = o._rotationY;
   o._operationPoint.set(event.x, event.y);
}

//==========================================================
// <T>操作移动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onOperationMove = function FEaiChartShow1022Scene_onOperationMove(event) {
   var o = this;
   if (o._opMouseDown) {
      var cx = event.x - o._operationPoint.x;
      if (Math.abs(cx) > o.__opMouseMoveThreshold) {
         o._autoRotate = false;
         o._operationMoved = true;
         var cx = event.x - o._operationPoint.x;
         //var cy = event.y - o._operationPoint.y;
         //o._rotationX = o._operationRotationX - cy * 0.001;
         o._rotationY = o._operationRotationY - cx * 0.002;
      }
   }
}

//==========================================================
// <T>操作抬起处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onOperationUp = function FEaiChartShow1022Scene_onOperationUp(event) {
   var o = this;
   o._opMouseDown = false;
   // hack
   //if (o._showingMktInfo) {
   //   o._showingMktInfo = false;
   //   var mktInfoDiv = document.getElementById('id_marketer_info');
   //   mktInfoDiv.style.display = 'none';
   //   return;
   //}

   if (!o._operationMoved) {
      var canvas3d = o.application().desktop().canvas3d();
      var region = o.activeStage().region();
      var camera = region.camera();
      //得到当前鼠标指向的对象
      var selectTechnique = MO.Console.find(MO.FG3dTechniqueConsole).find(canvas3d, MO.FG3dSelectTechnique);
      var renderable = selectTechnique.test(region, event.offsetX, event.offsetY);
      if (renderable) {
         var eaiSelectTechnique = MO.Console.find(MO.FG3dTechniqueConsole).find(canvas3d, MO.FEaiSelectTechnique);
         var countryRenderable = eaiSelectTechnique.test(region, renderable, event.offsetX, event.offsetY);
         if (countryRenderable) {
            o._startTranslateY = o._translateY;
            o._startRotateY = o._rotationY;
            o._startWorldScale = o._worldScale;
            var entity = countryRenderable._shape._entity;
            if(MO.Class.isClass(entity, MO.FEaiCountry3dEntity)){
               var countryEntity = entity;
               o._targetWorldScale = 1400;
               if (countryEntity.code() == 'China') {
                  o._showChina = true;
               }
               else {
                  o._countryEntity._borderShape.setVisible(false);
                  o._countryEntity._faceShape.setVisible(false);

                  //var provinceTable = o._provinceTable;
                  //provinceTable.setTitle('大陆地区公司列表');
                  //provinceTable.setUnits(o._countryUnits);
                  //provinceTable.dirty();
                  //provinceTable.setVisible(false);
                  //o._countryTable.setVisible(true);
               }
            }
            //else if (MO.Class.isClass(entity, MO.FEaiProvince3dEntity)) {
            //   var provinceEntity = entity;
            //   o._targetWorldScale = 3000;
            //   var res = provinceEntity.resource();
            //   var pCode = res.code();
            //   // hack
            //   if (pCode == o._selectedProvinceCode) {
            //      var mktInfoDiv = document.getElementById('id_marketer_info');
            //      mktInfoDiv.style.display = '';
            //      o._showingMktInfo = true;
            //   }
            //   else {
            //      o._selectedProvinceCode = pCode;
            //   }
            //   var provinceTable = o._provinceTable;
            //   provinceTable.setTitle(res.label() + '地区分公司列表');
            //   var department4s =  o._organizationInfo._department4s;
            //   var count = department4s.count();
            //   var provinceUnits = o._provinceUnits;
            //   provinceUnits.clear();
            //   for (var i = 0; i < count ; i++) {
            //      var unit = department4s.at(i);
            //      if (unit.provinceCode() == pCode) {
            //         provinceUnits.push(unit);
            //         if (provinceUnits.count() > 26) {
            //            break;
            //         }
            //      }
            //   }
            //   provinceTable.setUnits(provinceUnits);
            //   provinceTable.dirty();
            //}
            else {
            }
            var outline2d = entity.outline2();
            o._targetRotateY = Math.PI - outline2d.center.x / 180 * Math.PI;
            o._targetTranslateY = -o._targetWorldScale * 1.5 * (outline2d.center.y / 90);

            o._startTick = MO.Timer.current();
            o._earthMoving = true;
            o._autoRotate = false;

         }
      }
      else {
         o._startTranslateY = o._translateY;
         o._startRotateY = o._rotationY;
         o._startWorldScale = o._worldScale;
         o._targetTranslateY = 0
         o._targetRotateY = o._rotationY;
         o._targetWorldScale = 300;

         o._startTick = MO.Timer.current();
         o._earthMoving = true;
         o._autoRotate = true;

         o._countryEntity._borderShape.setVisible(false);
         o._countryEntity._faceShape.setVisible(false);

         //var provinceTable = o._provinceTable;
         //provinceTable.setTitle('大陆地区公司列表');
         //provinceTable.setUnits(o._countryUnits);
         //provinceTable.dirty();
         //provinceTable.setVisible(false);
         //o._countryTable.setVisible(true);
      }
   }
   o._operationMoved = false;
}

//==========================================================
// <T>操作卷动处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onOperationWheel = function FEaiChartShow1022Scene_onOperationWheel(event) {
   var o = this;
   var delta = event.deltaY
   if (delta > 0) {
      o._worldScale /= 1.05;
   } else if (delta < 0) {
      o._worldScale *= 1.05;
   }
}

//==========================================================
// <T>切换过程处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onSwitchProcess = function FEaiChartShow1022Scene_onSwitchProcess(event) {
   var o = this;
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_onSwitchComplete = function FEaiChartShow1022Scene_onSwitchComplete(event) {
   var o = this;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiChartShow1022Scene_construct = function FEaiChartShow1022Scene_construct() {
   var o = this;
   o.__base.FEaiChartScene.construct.call(o);
   // 设置属性
   o._operationPoint = new MO.SPoint2();
   // 定时获取数据
   o._organizationDataTicker = new MO.TTicker(1000 * 60);
   o._organizationInfo = MO.Class.create(MO.FEaiChartMktManageInfo);

   o._cameraFrom = new MO.SPoint3();
   o._cameraTo = new MO.SPoint3();
   o._ccDirection = new MO.SVector3();
   o._facePosition = new MO.SPoint3();

   o._provinceUnits = new MO.TObjects();
   o._countryUnits = new MO.TObjects();

   o._remoteRotate = new MO.SValue3();

   o._videoDataList = new MO.TObjects();
   o._videoRenderables = new MO.TObjects();

   o._rotateVector = new MO.SPoint3();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartShow1022Scene_setup = function FEaiChartShow1022Scene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   var stage = o._activeStage;
   var dataLayer = stage.dataLayer();
   //..........................................................
   // 设置底图效果
   var backgroundImage = o._application._groundBitmap;
   var rectangle = MO.Class.create(MO.FE3dRectangleArea);
   rectangle.linkGraphicContext(o);
   rectangle.setOptionSelect(false);
   rectangle.setup();
   rectangle.material().info().effectCode = 'eai.earth.sky';
   rectangle._textures = backgroundImage._renderable._textures;
   stage.groundLayer().push(rectangle);
   //..........................................................
   //// 全国各省分公司数、理财师数表
   //var countryTable = o._countryTable = MO.Class.create(MO.FEaiChartMktManageCountryTable);
   //countryTable.setName('countryTable');
   //countryTable.linkGraphicContext(o);
   //countryTable.setup();
   //countryTable.build();
   //o._guiManager.register(countryTable);
   //// 省内各分公司、理财师数表
   //var provinceTable = o._provinceTable = MO.Class.create(MO.FEaiChartMktManageProvinceTable);
   //provinceTable.setName('provinceTable');
   //provinceTable.linkGraphicContext(o);
   //provinceTable.setup();
   //provinceTable.build();
   //provinceTable.setVisible(false);
   //o._guiManager.register(provinceTable);
   //..........................................................
   // 创建面板处理
   var processor = o._boardProcessor = MO.Class.create(MO.FEaiShow1022BoardProcessor);
   processor.linkGraphicContext(o);
   processor.setup();
   o._activeStage.mapLayer().push(processor);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   // 创建相机
   var camera = MO.Class.create(MO.FE3dOrthoCamera);
   camera.position().set(0, 0, -5000);
   camera.lookAt(0, 0, 0);
   camera.update();
   var projection = camera.projection();
   projection.setZnear(1);
   projection.setZfar(10000);
   projection.update();
   // 设置相机
   var region = o._activeStage.region();
   region.selectCamera(camera);
   //..........................................................
   var entityConsole = MO.Console.find(MO.FEaiEntityConsole);
   // 加载世界数据
   var worldEntity = o._worldEntity = entityConsole.mapModule().loadWorld(o);
   o._readyLoader.push(worldEntity);
   // 建立城市实体
   entityConsole.cityModule().build(o, MO.FEaiCity3dEntity);
   // 加载国家数据
   var countryEntity = o._countryEntity = entityConsole.mapModule().loadCountry(o, MO.EEaiConstant.DefaultCountry, MO.FEaiCountry3dEntity);
   countryEntity._borderShape.setVisible(false);
   countryEntity._faceShape.setVisible(false);
   o._readyLoader.push(countryEntity);
   // 注册socket监听
   var socket = o._socket = MO.Class.create(MO.FSocket);
   socket.connect('{service.earth}/earth');
   socket.addReceiveListener(o, o.onSocketReceived);

   var focusParamManager = o._focusParamManager = MO.Class.create(MO.FEaiShowFocusParameterManager);
   focusParamManager.setup();
   // 视频
   var context3d = o.application().desktop().canvas3d().graphicContext();
   var stage = o.activeStage();
   var layer = stage.spriteLayer();

   var videoDataList = o._videoDataList;
   var videoRenderables = o._videoRenderables;
   var videoCount = o._videoCount;
   for (var i = 0; i < videoCount; i++) {
      var videoData = context3d.createObject(MO.FE3dVideoData);
      videoData.loadUrl('../ars/eai/show1022/video' + i + '.mp4');
      if (i != 3) {
         videoData.hVideo().addEventListener("ended", o.onVideoEnded);
      }
      else {
         videoData.hVideo().loop = true;
      }
      videoDataList.push(videoData);

      var videoRenderable = context3d.createObject(MO.FE3dVideo);
      videoRenderable.setOptionSelect(false);
      videoRenderable.setData(videoData);
      videoRenderable.material().info().effectCode = 'flat';
      videoRenderable.setVisible(false);
      o._videoRenderables.push(videoRenderable);
      layer.pushRenderable(videoRenderable);
      var matrix = videoRenderable.matrix();
      matrix.sx = 1024;
      matrix.sy = 768;
      matrix.sz = 1;
      matrix.tx = 0;
      matrix.ty = 0;
      matrix.tz = 0;
      matrix.updateForce();
   }

   //var lineManager = o._lineManager = MO.Class.create(MO.FE3dLines);
   //lineManager.linkGraphicContext(o);
   //lineManager.setup();
   //lineManager.setCount(1);
   //var float32Array = lineManager.positionsData();
   //float32Array[0] = 0;
   //float32Array[1] = 0;
   //float32Array[2] = 0;
   //float32Array[3] = 1000;
   //float32Array[4] = 1000;
   //float32Array[5] = 0;
   //lineManager.upload();
   //var uint8Array = lineManager.colorsData();
   //uint8Array[0] = 255;
   //uint8Array[1] = 0;
   //uint8Array[2] = 0;
   //uint8Array[3] = 255;
   //uint8Array[4] = 255;
   //uint8Array[5] = 0;
   //uint8Array[6] = 0;
   //uint8Array[7] = 255;

   //..........................................................
   // 图片
   //var bitmap = context3d.createObject(MO.FE3dBitmap);
   //bitmap.loadUrl('../ars/picture/star3.png');
   ////bitmap.material().info().effectCode = 'flat';
   //bitmap.setOptionSelect(false);
   ////bitmaps.push(bitmap);
   //layer.pushRenderable(bitmap);

   //var matrix = bitmap.matrix();
   //matrix.sx = 5000;
   //matrix.sy = 5000;
   //matrix.sz = 5000;
   //matrix.tx = 0;
   //matrix.ty = 0;
   //matrix.tz = -2000;
   //matrix.ry = 0;
   //matrix.updateForce();

   //entityConsole._mapEntity._countryFaceDisplay.push(bitmap);
   //..........................................................

   var dataLayer = o._activeStage.dataLayer();
   //..........................................................
   // 显示标识页面
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.show1022.LogoBar');
   o._guiManager.register(frame);
   //..........................................................
   // 创建投资数据
   var invement = o._processor = MO.Class.create(MO.FEaiChartShow1022Processor);
   invement.linkGraphicContext(o);
   //invement.setMapEntity(o._mapEntity);
   invement.setup();
   invement._countryEntity = countryEntity;
   invement.addDataChangedListener(o, o.onInvestmentDataChanged);
   invement.add24HDataChangedListener(o, o.on24HDataChanged);
   var display = invement.display();
   o.fixMatrix(display.matrix());
   dataLayer.push(display);
   frame.setVisible(false);
   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FEaiChartShow1022CustomerTimeline);
   timeline.setName('Timeline');
   timeline.setTextColor('#173870');
   timeline.linkGraphicContext(o);
   timeline.build();
   o._guiManager.register(timeline);
   timeline.setVisible(false);
   //..........................................................
   // 创建表格
   var liveTable = o._liveTable = MO.Class.create(MO.FEaiChartShow1022CustomerTable);
   liveTable.setName('LiveTable');
   liveTable.linkGraphicContext(o);
   liveTable.setup();
   liveTable.build();
   o._guiManager.register(liveTable);
   liveTable.setVisible(false);
   //..........................................................
   // 创建悬浮图片
   //var floatingImageManager = o._floatingImageManager = MO.Class.create(MO.FEaiShowFloatingImageManager);
   //floatingImageManager.setup();
   //var fiImages = floatingImageManager.floatingImages();
   //var count = fiImages.count();
   //for (var i = 0; i < count; i++) {
   //   o._guiManager.register(fiImages.at(i));
   //}
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //o._mapReady = true;

   // 不播放背景音乐
   o._groundAutio.muted = true;

   // 标题图片和版权图片
   var titlePic = o._titlePic = MO.Class.create(MO.FGuiPicture);
   titlePic.setBackResource('url:{eai.resource}/show1022/title.png');
   titlePic.setSize(663, 95);
   titlePic.setLocation((1920 - 663) / 2, 10);
   titlePic.linkGraphicContext(o);
   titlePic.build();
   titlePic.psInitialize();
   o._guiManager.register(titlePic);

   var crPic = o._copyrightPic = MO.Class.create(MO.FGuiPicture);
   crPic.setBackResource('url:{eai.resource}/show1022/copyright.png');
   crPic.setSize(245, 37);
   crPic.setLocation(1920 - 255, 1400);
   crPic.linkGraphicContext(o);
   crPic.build();
   crPic.psInitialize();
   o._guiManager.register(crPic);

   // 音效
   var audioConsole = MO.Console.find(MO.FAudioConsole);
   o._showVideoSE = audioConsole.load('{eai.resource}/show1022/show_video.wav');
}

//==========================================================
// <T>显示表面处理。</T>
//
// @method
//==========================================================
MO.FEaiChartShow1022Scene_showFace = function FEaiChartShow1022Scene_showFace() {
   var o = this;
   // 设置状态
   o._statusStart = true;
   o._playing = true;
   o._mapReady = false;
   // 重置数据
   o._mapEntity.reset();
   // 改变大小
   o.processResize();
}

//==========================================================
// <T>修正矩阵。</T>
//
// @method
//==========================================================
MO.FEaiChartShow1022Scene_fixMatrix = function FEaiChartShow1022Scene_fixMatrix(matrix) {
   var o = this;
   var isVertical = MO.Window.Browser.isOrientationVertical();
   if (o._earthMoving) {
      var tickPassed = MO.Timer.current() - o._startTick;
      var rate = tickPassed / o.__moveEarthDuration;
      if (rate > 1) {
         rate = 1;
         o._earthMoving = false;
         if (o._showChina) {
            o._countryEntity._borderShape.setVisible(true);
            o._countryEntity._faceShape.setVisible(true);
            //o._provinceTable.setVisible(true);
            //o._countryTable.setVisible(false);
            //o._provinceTable.dirty();
            o._showChina = false;
         }
      }
      o._translateY = o._startTranslateY + (o._targetTranslateY - o._startTranslateY) * rate;
      o._rotationX = o._startRotateX + (o._targetRotateX - o._startRotateX) * rate;
      o._rotationY = o._startRotateY + (o._targetRotateY - o._startRotateY) * rate;
      o._rotationZ = o._startRotateZ + (o._targetRotateZ - o._startRotateZ) * rate;
      o._worldScale = o._startWorldScale + (o._targetWorldScale - o._startWorldScale) * rate;
   }
   if (isVertical) {
   } else {
      matrix.tx = 0;
      matrix.ty = o._translateY;
      matrix.tz = 0;
      matrix.rx = o._rotationX;
      matrix.ry = o._rotationY;
      matrix.rz = o._rotationZ;
      matrix.setScale(o._worldScale, o._worldScale, o._worldScale);

      var rotateVector = o._rotateVector;
      matrix.transformPoint3(MO.RMath.vectorBackward, rotateVector);
      rotateVector.normalize();
      o._rotateRadian = Math.atan2(rotateVector.x, rotateVector.z);


      //matrix.setScale(2, 2, 2);
   }
   matrix.update();
   //..........................................................
   //if (o._autoRotate) {
   //   o._rotationY -= 0.001;
   //   if (o._rotationY <  0) {
   //      o._rotationY = 2 * Math.PI;
   //   }
   //}
}

//==========================================================
// <T>大小事件处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartShow1022Scene_processResize = function FEaiChartShow1022Scene_processResize() {
   var o = this;
   o.__base.FEaiChartScene.processResize.call(o);
   var isVertical = MO.Window.Browser.isOrientationVertical()
   //..........................................................
   // 设置大小
   var logoBar = o._logoBar;
   if (isVertical) {
      logoBar.setLocation(8, 8);
      logoBar.setScale(0.85, 0.85);
   } else {
      logoBar.setLocation(5, 5);
      logoBar.setScale(0.9, 0.9);
   }
   //..........................................................
   // 设置南海
   var control = o._southSea;
   if (isVertical) {
      control.setDockCd(MO.EUiDock.RightTop);
      control.setTop(570);
      control.setRight(80);
   } else {
      control.setDockCd(MO.EUiDock.RightBottom);
      control.setRight(780);
      control.setBottom(280);
   }
   //..........................................................
   // 设置时间轴
   var timeline = o._timeline;
   if (isVertical) {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(10);
      timeline.setRight(10);
      timeline.setBottom(920);
      timeline.setHeight(250);
   } else {
      timeline.setDockCd(MO.EUiDock.Bottom);
      timeline.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
      timeline.setLeft(20);
      timeline.setBottom(10);
      timeline.setRight(780);
      timeline.setHeight(300);
   }
   //..........................................................
   // 设置表格
   var liveTable = o._liveTable;
   if (isVertical) {
      liveTable.setDockCd(MO.EUiDock.Bottom);
      liveTable.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Top | MO.EUiAnchor.Right);
      liveTable.setLeft(10);
      liveTable.setRight(10);
      liveTable.setBottom(10);
      liveTable.setHeight(900);
   } else {
      liveTable.setDockCd(MO.EUiDock.Right);
      liveTable.setAnchorCd(MO.EUiAnchor.All);
      liveTable.setTop(10);
      liveTable.setRight(0);
      liveTable.setBottom(10);
      liveTable.setWidth(760);
   }

}