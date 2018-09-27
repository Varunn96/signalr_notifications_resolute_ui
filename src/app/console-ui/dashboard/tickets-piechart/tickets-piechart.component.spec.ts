import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPiechartComponent } from './tickets-piechart.component';

describe('TicketsPiechartComponent', () => {
  let component: TicketsPiechartComponent;
  let fixture: ComponentFixture<TicketsPiechartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsPiechartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
