import { Ticket } from "../../ticket";

export interface PaginationTicketModel {
  Pages: number;
  HasNext: boolean;
  HasPrevious: boolean;
  Tickets: Ticket[];
}

export class PageRange {
  startPage: number;
  endPage: number;

  constructor() {
    this.startPage = 0;
    this.endPage = 0;
  }
}

export class PageRangeArray {
  pageNo: number[];

  constructor() {
    this.pageNo = [];
  }
}
