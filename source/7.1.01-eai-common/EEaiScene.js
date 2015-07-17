//==========================================================
// <T>场景类型。</T>
//
// @enum
// @author maocy
// @version 160612
//==========================================================
MO.EEaiScene = new function EEaiScene(){
   var o = this;
   // 图表
   o.Group           = 'group';
   o.GroupReport     = 'group.report';
   o.Company         = 'company';
   o.Country         = 'country';
   // 图表
   o.ChartTotal      = 'chart.total';
   o.ChartHistory    = 'chart.history';
   o.ChartLive       = 'chart.live';
   o.ChartWorld      = 'chart.world';
   // 图表
   o.ChartIndustry   = 'chart.industry';
   o.ChartInvestment = 'chart.investment';
   o.ChartCustomer   = 'chart.customer';
   return o;
}
