with(MO){
   MO.FGuiEngineInfo = function FGuiEngineInfo(o){
      o = RClass.inherits(this, o, FGuiControl);
      o._lastTick    = 0;
      o._stage       = RClass.register(o, new AGetSet('_stage'));
      o._context     = RClass.register(o, new AGetSet('_context'));
      o.onPaintBegin = FGuiEngineInfo_onPaintBegin;
      o.oeUpdate     = FGuiEngineInfo_oeUpdate;
      o.construct    = FGuiEngineInfo_construct;
      return o;
   }
   MO.FGuiEngineInfo_onPaintBegin = function FGuiEngineInfo_onPaintBegin(event){
      var o = this;
      o.__base.FGuiControl.onPaintBegin.call(o, event);
      if(o._stage == null){
         return;
      }
      if(o._context == null){
         return;
      }
      var graphic = event.graphic;
      var rectangle = o._clientRectangle;
      var stageStatistics = o._stage.statistics();
      var statistics = o._context.statistics();
      var line = 16;
      var locationX = 10;
      var locationY = rectangle.top + line;
      graphic.setFont('microsoft yahei,Arial,sans-serif');
      graphic.drawText('Frame         : ' + stageStatistics._frame.toString(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Frame Process : ' + stageStatistics._frameProcess.toString(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Frame Draw    : ' + stageStatistics._frameDraw.toString() + ' | ' + stageStatistics._frameDrawSort.toString(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Draw          : ' + statistics.frameDrawCount(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Draw Const    : ' + statistics.frameConstCount() + ' Length=' + statistics.frameConstLength(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Draw Buffer   : ' + statistics.frameBufferCount(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Draw Texture  : ' + statistics.frameTextureCount(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Draw Triangle : ' + statistics.frameTriangleCount(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Total Program : ' + statistics.programTotal(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Total Layout  : ' + statistics.layoutTotal(), locationX, locationY, '#FFFFFF');
      locationY += line;
      graphic.drawText('Total Buffer  : Vertex=' + statistics.vertexBufferTotal() + ' Index=' + statistics.indexBufferTotal(), locationX, locationY, '#FFFFFF');
      locationY += line;
   }
   MO.FGuiEngineInfo_oeUpdate = function FGuiEngineInfo_oeUpdate(event){
      var o = this;
      var tick = RTimer.current();
      if(tick - o._lastTick > 1000){
         o.repaint();
         o._lastTick = tick;
      }
      return EEventStatus.Stop;
   }
   MO.FGuiEngineInfo_construct = function FGuiEngineInfo_construct(){
      var o = this;
      o.__base.FGuiControl.construct.call(o);
      o._size.set(512, 256);
   }
}