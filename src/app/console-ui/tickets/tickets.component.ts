import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../tickets.service';
import { FormBuilder } from '@angular/forms';
import { queryParams } from '../../queryparams';
import { PaginationTicketModel, PageRange, PageRangeArray } from './ticketModelForPagination';
import { MatTabChangeEvent } from '@angular/material';

export interface Sources {
  source: string
}

export interface PriorityLevel {
  priority: string
}

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})

export class TicketsComponent implements OnInit {

  displayedColumns = ['subject', 'source', 'status', 'priority'];
  navLinks = []; numberOfTickets = {};
  PaginationTicket: PaginationTicketModel;
  TotalPages = 10; isPreviousDisabled; isNextDisabled;
  pageRange = new PageRange(); pageRangeArray = new PageRangeArray();
  currentPageNo;
  index; indexMap; indexValue;
  tickets;

  queryParams: queryParams = {
    status: "",
    source: "",
    priority: "",
    page: 1,
    sortBy: "subject",
    sortOrder: false
  }

  //Form entries
  filterForm = this.formbuilder.group({
    sources: [''],
    priorityLevel: [''],
  });

  //Menu options
  sources: Sources[] = [
    { source: 'twitter' },
    { source: 'chat' },
  ]

  priorityLevel: PriorityLevel[] = [
    { priority: 'high' },
    { priority: 'medium' },
    { priority: 'low' }
  ]

  constructor(private router: Router, private service: TicketsService, private formbuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.indexMap = {
      "all": 0,
      "open": 1,
      "close": 2,
      "due": 3
    }
  }

  ngOnInit() {
    this.service.getTicketCount().subscribe(data => { this.numberOfTickets = data; });

    this.index = (this.activatedRoute.snapshot.paramMap.get('index')).toString();
    this.indexValue = this.indexMap[this.index];
    if (this.index != 'all')
      this.queryParams.status = this.index;
    else
      this.queryParams.status = "";
    this.service.updateQueryParamsModel(this.queryParams);

    this.service.getQueryParamsModel().subscribe((data) => {
      // this.queryParams = data;
      // data.status = this.index;
      // console.log(this.index);
      this.service.getTicketsByFilter(data).subscribe(tickets => {
        this.tickets = tickets;
        console.log(this.tickets);
      });
    });
    // this.service.getByFilter(this.queryParams).subscribe(data => {
    //   this.PaginationTicket = data;
    //   this.Pages = this.PaginationTicket.Pages;
    // })
    this.pageRangeArray = this.getPageRange(1);
    this.isPreviousDisabled = true;
    if (this.TotalPages == 1)
      this.isNextDisabled = true;
    else
      this.isNextDisabled = false;
  }

  onTabChange(event : MatTabChangeEvent) {
    console.log("status change triggered");
    let status;
    status = Object.keys(this.indexMap).find(key => this.indexMap[key] == event.index);
    if (status == 'all') this.queryParams.status = '';
    else this.queryParams.status = status;
    console.log(this.queryParams);
    this.service.updateQueryParamsModel(this.queryParams);
    this.router.navigate(['/console/tickets/', this.queryParams.status])
  }

  onClick(element) {
    console.log(element.ticketId);
    this.router.navigate(['/console/tickets/view', element.ticketId]);
  }

  changeSortBy(sortby) {
    console.log("Hi");
    this.queryParams.sortBy = sortby;
    this.queryParams.sortOrder = !this.queryParams.sortOrder;
    console.log(this.queryParams);
    this.service.updateQueryParamsModel(this.queryParams);
  }

  applyFilters() {
    this.queryParams.source = this.filterForm.value['sources'];
    this.queryParams.priority = this.filterForm.value['priorityLevel'];
    this.service.updateQueryParamsModel(this.queryParams);
  }

  //===============================PAGINATION=========================================================

  previousPage() {
    this.service.getQueryParamsModel().subscribe(data => this.queryParams = data);
    if (this.queryParams.page > 1) {
      this.isNextDisabled = false;
      this.queryParams.page -= 1;
      this.service.updateQueryParamsModel(this.queryParams);
      this.getPageRange(this.queryParams.page);
      if (this.queryParams.page == 1) this.isPreviousDisabled = true;
    }
    console.log(this.queryParams);
  }

  nextPage() {
    this.service.getQueryParamsModel().subscribe(data => this.queryParams = data);
    if (this.queryParams.page < this.TotalPages) {
      this.isPreviousDisabled = false;
      this.queryParams.page += 1;
      this.service.updateQueryParamsModel(this.queryParams);
      this.getPageRange(this.queryParams.page);
      if (this.queryParams.page == this.TotalPages) this.isNextDisabled = true;
    }
    console.log(this.queryParams);
  }

  getPageRange(currentPage) {
    // this.currentPageNo = currentPage;
    this.currentPageNo = currentPage;
    this.queryParams.page = currentPage;
    if (this.queryParams.page == 1) this.isPreviousDisabled = true; else this.isPreviousDisabled = false;
    if (this.queryParams.page == this.TotalPages) this.isNextDisabled = true; else this.isNextDisabled = false;
    this.service.updateQueryParamsModel(this.queryParams);
    console.log(this.queryParams);
    let Pages = this.TotalPages;

    if (Pages < 6) {
      this.pageRange.startPage = 1;
      this.pageRange.endPage = Pages;
    } else {
      if (currentPage <= 3) {
        this.pageRange.startPage = 1;
        this.pageRange.endPage = 5;
      } else
        if (currentPage + 1 >= Pages) {
          this.pageRange.startPage = Pages - 4;
          this.pageRange.endPage = Pages;
        } else {
          this.pageRange.startPage = currentPage - 2;
          this.pageRange.endPage = currentPage + 2;
        }
    }

    console.log(this.pageRange.startPage);
    console.log(this.pageRange.endPage);

    if (this.TotalPages > 5) {
      for (let index = 0; index < 5; index++) {
        this.pageRangeArray.pageNo[index] = this.pageRange.startPage++;
      }
    } else {
      for (let index = 0; index < this.TotalPages; index++) {
        this.pageRangeArray.pageNo[index] = this.pageRange.startPage++;
      }
    }
    console.log(this.pageRangeArray);
    return this.pageRangeArray;
  }

  //=================================================================================================
}
