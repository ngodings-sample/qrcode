/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubMenuBackendComponent } from './submenubackend.component';

describe('SubMenuBackendComponent', () => {
  let component: SubMenuBackendComponent;
  let fixture: ComponentFixture<SubMenuBackendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubMenuBackendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuBackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
