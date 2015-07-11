//==========================================================
// <T>图表历史场景。</T>
//
// @class
// @author maocy
// @history 150618
//==========================================================
MO.FEaiChartHistoryScene = function FEaiChartHistoryScene(o){
   o = MO.RClass.inherits(this, o, MO.FEaiChartScene);
   //..........................................................
   // @attribute
   o._code                     = MO.EEaiScene.ChartHistory;
   // @attribute
   o._ready                    = false;
   o._mapReady                 = false;
   o._playing                  = false;
   o._lastTick                 = 0;
   o._interval                 = 10;
   o._lastDateTick             = 0;
   //o._dateInterval           = 120;
   o._dateInterval             = 0;
   o._startDate                = null;
   o._endDate                  = null;
   o._currentDate              = null;
   // @attribute
   o._logoBar                  = null;
   o._buttonTransform          = null;
   o._timeline                 = null;
   o._milestoneFrame           = null;
   // @attribute
   o._buttonAudio              = null;
   o._statusStart              = false;
   o._statusLayerCount         = 100;
   o._statusLayerLevel         = 100;
   // @attribute
   o._milestoneShowed          = 0;
   o._milestoneBarShowDuration = 1000;
   o._milestoneBarShowTick     = 0;
   o._milestoneBarShowing      = false;
   //..........................................................
   // @event
   o.onLoadData                = MO.FEaiChartHistoryScene_onLoadData;
   o.onDateSelect              = MO.FEaiChartHistoryScene_onDateSelect;
   o.onMilestoneDone           = MO.FEaiChartHistoryScene_onMilestoneDone;
   o.onOperationPlay           = MO.FEaiChartHistoryScene_onOperationPlay;
   o.onOperationPause          = MO.FEaiChartHistoryScene_onOperationPause;
   o.onProcess                 = MO.FEaiChartHistoryScene_onProcess;
   o.onSwitchLiveComplete      = MO.FEaiChartHistoryScene_onSwitchLiveComplete;
   //..........................................................
   // @method
   o.testReady                 = MO.FEaiChartHistoryScene_testReady;
   // @method
   o.setup                     = MO.FEaiChartHistoryScene_setup;
   o.resetDate                 = MO.FEaiChartHistoryScene_resetDate;
   o.selectDate                = MO.FEaiChartHistoryScene_selectDate;
   o.switchPlay                = MO.FEaiChartHistoryScene_switchPlay;
   o.switchLive                = MO.FEaiChartHistoryScene_switchLive;
   // @method
   o.active                    = MO.FEaiChartHistoryScene_active;
   o.deactive                  = MO.FEaiChartHistoryScene_deactive;
   return o;
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onLoadData = function FEaiChartHistoryScene_onLoadData(event) {
   var o = this;
   // 设置历史数据
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var startDate = historyConsole.dates().first();
   var endDate = historyConsole.dates().last();
   //o._currentDate.parseAuto(startDate.code());
   o._currentDate.parseAuto('20150510');
   o._startDate.parseAuto(startDate.code());
   o._endDate.parseAuto(endDate.code());
   //..........................................................
   // 创建里程碑
   var milestones = historyConsole.milestones();
   var milestoneBars = o._milestoneBars = new MO.TObjects();
   var count = milestones.count();
   for(var i = count - 1; i >= 0; i--){
      var milestone = milestones.at(count - i - 1);
      var frame = MO.Console.find(MO.FGuiFrameConsole).create(o, 'eai.chart.MilestoneBar');
      frame.setVisible(false);
      frame.setDockCd(MO.EGuiDock.Right)
      frame.setTop(90 + 100 * i);
      frame.setRight(-360);
      var date = new MO.TDate();
      date.parse(milestone.code());
      frame.findComponent('date').setLabel(date.format('YYYY/MM/DD'));
      var label = null;
      var milestoneInvestmentTotal = milestone.investmentTotal();
      if(milestoneInvestmentTotal >= 10000){
         label = parseInt(milestoneInvestmentTotal / 10000) + '亿';
      }else{
         label = parseInt(milestoneInvestmentTotal) + '万';
      }
      frame.findComponent('total').setLabel(label);
      o._guiManager.register(frame);
      milestoneBars.push(frame);
   }
}

//==========================================================
// <T>时间轴日期选择事件处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_onDateSelect = function FEaiChartHistoryScene_onDateSelect(event) {
   var o = this;
   o._currentDate.date.setTime(event.date.date.getTime());
   o._currentDate.refresh();
   o.selectDate(o._currentDate.format('YYYYMMDD'));
}

//==========================================================
// <T>时间轴日期选择事件处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_onMilestoneDone = function FEaiChartHistoryScene_onMilestoneDone(event) {
   var o = this;
   o.switchPlay(true);
   o._milestoneShowed++;
   o._milestoneBarShowTick = MO.Timer.current();
   o._milestoneBarShowing = true;
}

//==========================================================
// <T>点击播放处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onOperationPlay = function FEaiChartHistoryScene_onOperationPlay(event){
   var o = this;
   // 设置时间
   var code = o._currentDate.format('YYYYMMDD')
   var endCode = o._endDate.format('YYYYMMDD')
   if (code == endCode) {
      var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
      var startDate = historyConsole.dates().first();
      MO.Lang.Date.autoParse(o._currentDate, startDate.code());
   }
   // 开始播放
   o.switchPlay(true);
}

//==========================================================
// <T>点击暂停处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onOperationPause = function FEaiChartHistoryScene_onOperationPause(event){
   var o = this;
   // 停止播放
   o.switchPlay(false);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_onProcess = function FEaiChartHistoryScene_onProcess() {
   var o = this;
   o.__base.FEaiChartScene.onProcess.call(o);
   var mapEntity = o._mapEntity;
   var countryDisplay = mapEntity.countryDisplay();
   var countryBorderDisplay = mapEntity.countryBorderDisplay();
   // 检测首次播放
   if (!o._statusStart) {
      if (o.testReady()) {
         var hLoading = document.getElementById('id_loading');
         if (hLoading) {
            hLoading.style.opacity = o._statusLayerLevel / o._statusLayerCount;
            o._statusLayerLevel--;
         }
         o._statusLayerLevel--;
         if (o._statusLayerLevel == 0) {
            if (hLoading) {
               document.body.removeChild(hLoading);
            }
            o.switchPlay(true);
            o._statusStart = true;
         }
      }
   }
   var currentTick = MO.Timer.current();
   // 重复播放
   if (o._playing) {
      // 播放地图
      var countryEntity = mapEntity.countryEntity();
      if(!countryEntity.introAnimeDone()){
         countryEntity.process();
         return;
      }
      // 显示界面
      if (!o._mapReady) {
         // 设置显示
         mapEntity.citysRangeRenderable().setVisible(true);
         mapEntity.citysRenderable().setVisible(true);
         o._guiManager.show();
         o._milestoneFrame.setVisible(false);
         // 淡出隐藏界面
         var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
         alphaAction.setAlphaBegin(0);
         alphaAction.setAlphaEnd(1);
         alphaAction.setAlphaInterval(0.005);
         alphaAction.push(o._guiManager);
         o._guiManager.mainTimeline().pushAction(alphaAction);
         o._mapReady = true;
      }
      //..........................................................
      // 计时切换日期
      if (currentTick - o._lastTick > o._interval) {
         if (currentTick - o._lastDateTick > o._dateInterval) {
            o._currentDate.addDay(1);
            var code = o._currentDate.format('YYYYMMDD')
            var endCode = o._endDate.format('YYYYMMDD')
            o.selectDate(code);
            if(code == endCode){
               // 播放完成
               o.switchPlay(false);
               // 切换场景
               o.switchLive();
            }
            o._lastDateTick = currentTick;
            // 上传数据
            o._mapEntity.upload();
         }
         // 调用重绘
         o._timeline.setProgress((currentTick - o._lastDateTick) / o._dateInterval);
         o._timeline.dirty();
         // 记录lastTick
         o._lastTick = currentTick;
      }
   }
   // 出现右侧里程碑条
   if (o._milestoneBarShowing) {
      var mbPassedTick = currentTick - o._milestoneBarShowTick;
      var p = mbPassedTick / o._milestoneBarShowDuration;
      if (p > 1) {
         p = 1;
         o._milestoneBarShowing = false;;
      }
      p = (1 - p) * (1 - p);
      var mBar = o._milestoneBars.at(o._milestoneShowed - 1);
      mBar.setRight(20 + (-380 * p));
      mBar.dirty();
   }
   if (o._milestoneFrame.visible()) {
      o._milestoneFrame.dirty();
   }
}

//==========================================================
// <T>切换完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_onSwitchLiveComplete = function FEaiChartHistoryScene_onSwitchLiveComplete(event){
   var o = this;
   // 设置应用
   var scene = o._chapter.selectSceneByCode(MO.EEaiScene.ChartLive);
   scene.showFace();
}

//==========================================================
// <T>点击暂停处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_testReady = function FEaiChartHistoryScene_testReady(){
   var o = this;
   if(!o._ready){
      if(!o._countryReady){
         return false;
      }
      o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_setup = function FEaiChartHistoryScene_setup() {
   var o = this;
   o.__base.FEaiChartScene.setup.call(o);
   o._currentDate = new MO.TDate();
   o._startDate = new MO.TDate();
   o._endDate = new MO.TDate();
   //..........................................................
   var mapEntity = o._mapEntity;
   mapEntity.citysRangeRenderable().setVisible(false);
   mapEntity.citysRenderable().setVisible(false);
   //..........................................................
   // 显示LOGO页面
   var frame = o._logoBar = MO.RConsole.find(MO.FGuiFrameConsole).get(o, 'eai.history.LogoBar');
   frame.setLocation(0, 5);
   o._guiManager.register(frame);
   //..........................................................
   // 创建城市图示
   //var control = o._playButton = MO.Class.create(MO.FGuiPicture);
   //control.linkGraphicContext(o);
   //control.setLocation(30, 300);
   //control.setSize(120, 120);
   //control.setBackResource('url:/script/ars/eai/city-level.png');
   //control.psInitialize();
   //control.build();
   //control.setVisible(true);
   //o._guiManager.register(control);
   // 创建播放按键
   //var control = o._playButton = MO.Class.create(MO.FGuiPicture);
   //control.linkGraphicContext(o);
   //control.setLocation(40, 730);
   //control.setSize(196, 196);
   //control.setBackResource('url:/script/ars/eai/player.png');
   //control.psInitialize();
   //control.build();
   //control.setVisible(true);
   //control.addOperationDownListener(o, o.onOperationPlay);
   //o._guiManager.register(control);
   // 创建播放按键
   //var control = o._pauseButton = MO.Class.create(MO.FGuiPicture);
   //control.linkGraphicContext(o);
   //control.setLocation(40, 730);
   //control.setSize(196, 196);
   //control.setBackResource('url:/script/ars/eai/pause.png');
   //control.psInitialize();
   //control.build();
   //control.setVisible(false);
   //control.addOperationDownListener(o, o.onOperationPause);
   //o._guiManager.register(control);
   // 创建按键声音
   var audio = o._buttonAudio = MO.Class.create(MO.FAudio);
   audio.loadUrl('/script/ars/eai/button.mp3');
   // 创建交换器
   var transform = o._buttonTransform = MO.Class.create(MO.FGuiChangeTransform);
   transform.setInterval(10);
   transform.setScale(0.1);
   //..........................................................
   // 创建时间轴
   var stage = o.activeStage();
   var timeline = o._timeline = MO.Class.create(MO.FGuiHistoryTimeline);
   timeline.linkGraphicContext(o);
   timeline.setName('Timeline');
   timeline.setDockCd(MO.EGuiDock.Bottom);
   timeline.setAnchorCd(MO.EGuiAnchor.Left | MO.EGuiAnchor.Right);
   timeline.setLeft(50);
   timeline.setRight(450);
   timeline.setBottom(5);
   timeline.setHeight(600);
   timeline.setTimeUnit(MO.EGuiTimeUnit.Month);
   timeline.setStartTime(o._startDate);
   timeline.setEndTime(o._endDate);
   timeline.setDegreeTime(o._currentDate);
   timeline.addDataChangedListener(o, o.onDateSelect);
   timeline.build();
   o._guiManager.register(timeline);
   // 创建里程碑界面
   var milestoneFrame = o._milestoneFrame = MO.RClass.create(MO.FGuiHistoryMilestoneFrame);
   milestoneFrame.linkGraphicContext(o);
   milestoneFrame.setName('MilestoneFrame');
   milestoneFrame.addDataChangedListener(o, o.onMilestoneDone);
   milestoneFrame.setup();
   milestoneFrame.build();
   o._guiManager.register(milestoneFrame);
   //..........................................................
   // 隐藏全部界面
   o._guiManager.hide();
   //..........................................................
   // 加载历史数据
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   historyConsole.addLoadListener(o, o.onLoadData);
   historyConsole.load();
}

//==========================================================
// <T>重置时间。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_resetDate = function FEaiChartHistoryScene_resetDate(){
   var o = this;
   // 设置城市数据
   var cityEntities = o._mapEntity.cityEntities();
   var count = cityEntities.count();
   for(var i = 0; i < count; i++){
      var cityEntity = cityEntities.at(i);
      cityEntity.reset();
   }
}

//==========================================================
// <T>数据加载处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiChartHistoryScene_selectDate = function FEaiChartHistoryScene_selectDate(code) {
   var o = this;
   // 构建画面
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var provinceConsole = MO.Console.find(MO.FEaiResourceConsole).provinceConsole();
   var dateData = historyConsole.dates().get(code);
   var milestone = historyConsole.milestones().get(code);
   if (milestone) {
      return;
      o._milestoneFrame.setData(milestone);
      o._milestoneFrame.show();
      o._milestoneFrame.dirty();
      o.switchPlay(false);
   }
   if(dateData){
      // 更新时间轴
      o._timeline.setDegreeTime(o._currentDate);
      o._timeline.dirty();
      // 设置城市数据
      var cityDatas = dateData.citys();
      var cityEntities = o._mapEntity.cityEntities();
      var count = cityEntities.count();
      for (var i = 0; i < count; i++) {
         var cityEntity = cityEntities.at(i);
         var cityCode = cityEntity.data().code();
         var data = cityDatas.get(cityCode);
         cityEntity.update(data);
      }
      // 设置数据
      var controlDate = o._logoBar.findComponent('date');
      controlDate.setValue(code);
      var controlInvestment = o._logoBar.findComponent('investment');
      controlInvestment.setLabel(parseInt(dateData.investmentTotal()).toString());
   }
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_switchPlay = function FEaiChartHistoryScene_switchPlay(flag){
   var o = this;
   //var transform = o._buttonTransform;
   o._playing = flag;
   //o._buttonAudio.play(0);
   //if(flag){
      //transform.setSourceControl(o._playButton);
      //transform.setTargetControl(o._pauseButton);
      //o._playButton.setVisible(false);
      //o._pauseButton.setVisible(true);
   //}else{
      //transform.setSourceControl(o._pauseButton);
      //transform.setTargetControl(o._playButton);
      //o._playButton.setVisible(true);
      //o._pauseButton.setVisible(false);
   //}
   //o._desktop.transformStart(transform);
}

//==========================================================
// <T>切换场景。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_switchLive = function FEaiChartHistoryScene_switchLive(){
   var o = this;
   // 淡出隐藏界面
   var alphaAction = MO.Class.create(MO.FGuiActionAlpha);
   alphaAction.setAlphaBegin(1);
   alphaAction.setAlphaEnd(0);
   alphaAction.setAlphaInterval(-0.005);
   alphaAction.addCompleteListener(o, o.onSwitchLiveComplete);
   alphaAction.push(o._guiManager);
   o._guiManager.mainTimeline().pushAction(alphaAction);
}

//==========================================================
// <T>激活处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_active = function FEaiChartHistoryScene_active() {
   var o = this;
   o.__base.FEaiChartScene.active.call(o);
}

//==========================================================
// <T>注销处理。</T>
//
// @method
//==========================================================
MO.FEaiChartHistoryScene_deactive = function FEaiChartHistoryScene_deactive() {
   var o = this;
   o.__base.FEaiChartScene.deactive.call(o);
}
