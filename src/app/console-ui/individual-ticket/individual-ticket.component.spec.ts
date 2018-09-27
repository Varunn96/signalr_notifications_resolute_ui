import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTicketComponent } from './individual-ticket.component';

describe('IndividualTicketComponent', () => {
  let component: IndividualTicketComponent;
  let fixture: ComponentFixture<IndividualTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
