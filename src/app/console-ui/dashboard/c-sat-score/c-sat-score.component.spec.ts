import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CSatScoreComponent } from './c-sat-score.component';

describe('CSatScoreComponent', () => {
  let component: CSatScoreComponent;
  let fixture: ComponentFixture<CSatScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CSatScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CSatScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
