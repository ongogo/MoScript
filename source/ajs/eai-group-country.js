with(MO){
   MO.FEaiCountryEntity = function FEaiCountryEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      o._startDelay          = RClass.register(o, new AGetSet('_startDelay'), 0);
      o._riseDuration        = RClass.register(o, new AGetSet('_riseDuration'), 1200);
      o._riseDistance        = RClass.register(o, new AGetSet('_riseDistance'), 2050);
      o._fallDuration        = RClass.register(o, new AGetSet('_fallDuration'), 400);
      o._fallDistance        = RClass.register(o, new AGetSet('_fallDistance'), 50);
      o._blockInterval       = RClass.register(o, new AGetSet('_blockInterval'), 60);
      o._mouseOverRiseHeight = RClass.register(o, new AGetSet('_mouseOverRiseHeight'), 10);
      o._mouseMoveCheckInterval = RClass.register(o, new AGetSet('_mouseMoveCheckInterval'), 100);
      o._template                = RClass.register(o, new AGetSet('_template'));
      o._introAnimeDone          = RClass.register(o, new AGetSet('_introAnimeDone'), false);
      o._startTime               = RClass.register(o, new AGetSet('_startTime'));
      o._mouseOverRiseRenderable = RClass.register(o, new AGetSet('_mouseOverRiseRenderable'));
      o._mouseOverFallArray      = RClass.register(o, new AGetSet('_mouseOverFallArray'));
      o._mouseMoveLastCheck      = RClass.register(o, new AGetSet('_mouseMoveLastCheck'));
      o.initialize = FEaiCountryEntity_initialize;
      o.introAnime = FEaiCountryEntity_introAnime;
      o.onMouseMove = FEaiCountryEntity_onMouseMove;
      o.mouseOverFallAnime = FEaiCountryEntity_mouseOverFallAnime;
      o.onOrganizationFetch = FEaiCountryEntity_onOrganizationFetch;
      return o;
   }
   MO.FEaiCountryEntity_initialize = function FEaiCountryEntity_initialize(template){
      var o = this;
      o.setMouseOverFallArray(new TObjects());
      o.setTemplate(template);
      o.setMouseMoveLastCheck(new Date());
      o.template().addEnterFrameListener(o, FEaiCountryEntity_onEnterFrame);
      var region = o.template().region();
      region.backgroundColor().set(0.2, 0.2, 0.2, 1);
      var camera = region.camera();
      camera.setPosition(3, 24, -0.5);
      camera.setDirection(0.02, -0.9, 0.5);
      o.setStartTime(new Date());
   }
   MO.FEaiCountryEntity_onEnterFrame = function FEaiCountryEntity_onEnterFrame(){
      var o = this;
      if (!o.introAnimeDone()) {
         o.introAnime();
      }
      else{
         o.mouseOverFallAnime();
      }
   }
   MO.FEaiCountryEntity_introAnime = function FEaiCountryEntity_introAnime(){
      var o = this;
      var sprite = o.template().sprite();
      var now = new Date();
      var timePassed = now.getTime() - o.startTime().getTime();
      if (timePassed < o.startDelay()) {
         return;
      }
      else{
         timePassed -= o.startDelay();
         if (timePassed > o.riseDuration() + o.fallDuration() + o.blockInterval() * sprite.renderables().count()) {
            o.setIntroAnimeDone(true);
            var listener = new TListener();
            listener._owner = this;
            listener._callback = o.onMouseMove;
            RWindow.lsnsMouseMove.push(listener);
            RConsole.find(FEnvironmentConsole).registerValue(EEaiConstant.ServiceHost, '115.28.82.149');
            var logicConsole = MO.RConsole.find(FEaiLogicConsole);
            logicConsole.organization().doFetch(o, o.onOrganizationFetch);
         }
      }
      var idxCap = timePassed / o.blockInterval();
      for (var i = 0; i < sprite.renderables().count() && i < idxCap; i++){
         var renderable = sprite.renderables().at(i);
         var tt = renderable._resource._code;
         var matrix = renderable.matrix();
         var risePercentage = (timePassed - o.blockInterval() * i) / o.riseDuration();
         var fallPercentage = 0;
         if (risePercentage > 1) {
			risePercentage = 1;
			fallPercentage = (timePassed - o.blockInterval() * i - o.riseDuration()) / o.fallDuration();
			if (fallPercentage > 1) {
				fallPercentage = 1;
			}
         }
         matrix.ty = o.riseDistance() * risePercentage - o.fallDistance() * fallPercentage;
         matrix.updateForce();
      }
   }
   MO.FEaiCountryEntity_onMouseMove = function FEaiCountryEntity_onMouseMove(event){
      var o = this;
      var now = new Date();
      if (now.getDate() - o.mouseMoveLastCheck() < o.mouseMoveCheckInterval) {
         return;
      }
      var selectTechnique = RConsole.find(FG3dTechniqueConsole).find(canvas._graphicContext, FG3dSelectTechnique);
      var renderable = selectTechnique.test(o.template().region(), event.offsetX, event.offsetY);
      if (o.mouseOverRiseRenderable() != renderable) {
         if (o.mouseOverRiseRenderable()) {
            o.mouseOverFallArray().push(o.mouseOverRiseRenderable());
         }
         o.setMouseOverRiseRenderable(renderable);
         if (o.mouseOverFallArray().contains(o.mouseOverRiseRenderable())) {
         	o.mouseOverFallArray().remove(o.mouseOverRiseRenderable());
         }
      }
   }
   MO.FEaiCountryEntity_mouseOverFallAnime = function FEaiCountryEntity_mouseOverFallAnime() {
      var o = this;
      for (var i = o.mouseOverFallArray().count() - 1; i >= 0; i--) {
         var renderable = o.mouseOverFallArray().at(i);
         var matrix = renderable.matrix();
         if (matrix.ty > o.riseDistance() - o.fallDistance()) {
         	matrix.ty -= 1;
         }
         else {
         	matrix.ty = o.riseDistance() - o.fallDistance();
         	o.mouseOverFallArray().erase(i);
         }
         matrix.updateForce();
      }
      if (o.mouseOverRiseRenderable()) {
         var riseMatrix = o.mouseOverRiseRenderable().matrix();
         if (riseMatrix.ty < o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight()) {
         	riseMatrix.ty = o.riseDistance() - o.fallDistance() + o.mouseOverRiseHeight();
         	riseMatrix.updateForce();
         }
      }
   }
   MO.FEaiCountryEntity_onOrganizationFetch = function FEaiCountryEntity_onOrganizationFetch(event) {
      var o = this;
      var content = event.content;
      var branchCount = new Object();
      for (var i = 0; i < content.collection.length; i++) {
         if(!branchCount[content.collection[i].province_id]){
            if(content.collection[i].province_id == null)
            {
            }
            branchCount[content.collection[i].province_id] = 1;
         }
         else{
            branchCount[content.collection[i].province_id]++;
            if (content.collection[i].province_id == null) {
               content.collection[i].label;
            }
         }
      }
      var logicConsole = MO.RConsole.find(FEaiLogicConsole);
      var dict = logicConsole.organization().dict();
      var colors = logicConsole.organization().provinceColors();
      for(var i = 0; i < dict.count(); i++){
         var bc = branchCount[dict.name(i)];
         if (!bc) {
            bc = 0;
         }
         var meshIdx = dict.valueAt(i);
         if (meshIdx < 0) {
            continue;
         }
         var renderable = o.template().sprite().renderables().at(meshIdx);
         var ambientColor = renderable.material().info().ambientColor;
         var diffuseColor = renderable.material().info().diffuseColor;
         var colorLv = bc == 0 ? 0 : Math.floor(bc / 5 + 1) > 4 ? 4 : Math.floor(bc / 5 + 1);
		 ambientColor.assign(colors.at(colorLv));
         renderable.material().update();
      }
   }
}
