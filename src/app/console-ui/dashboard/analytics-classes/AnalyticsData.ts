export class AnalyticsData {
  analyticscsat : Csat[];
  analyticscount : Count[];
  avgresolutiontime : string;
}

export class Csat {
  date : Date;
  csatscore : number;
}

export class Count {
  tickettype : string;
  count : number;
}
