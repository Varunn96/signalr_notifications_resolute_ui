import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleUIComponent } from './console-ui.component';

describe('ConsoleUIComponent', () => {
  let component: ConsoleUIComponent;
  let fixture: ComponentFixture<ConsoleUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
