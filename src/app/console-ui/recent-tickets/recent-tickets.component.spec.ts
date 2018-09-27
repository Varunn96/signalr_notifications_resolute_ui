import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTicketsComponent } from './recent-tickets.component';

describe('RecentTicketsComponent', () => {
  let component: RecentTicketsComponent;
  let fixture: ComponentFixture<RecentTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
