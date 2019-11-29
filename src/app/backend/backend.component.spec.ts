/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BackendComponent } from './backend.component';

describe('BackendComponent', () => {
  let component: BackendComponent;
  let fixture: ComponentFixture<BackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
