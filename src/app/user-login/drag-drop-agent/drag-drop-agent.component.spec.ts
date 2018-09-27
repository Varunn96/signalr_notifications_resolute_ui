import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropAgentComponent } from './drag-drop-agent.component';

describe('DragDropAgentComponent', () => {
  let component: DragDropAgentComponent;
  let fixture: ComponentFixture<DragDropAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragDropAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
