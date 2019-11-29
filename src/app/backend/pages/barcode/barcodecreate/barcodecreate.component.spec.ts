/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubMenuBackendCreateComponent } from './submenubackendcreate.component';

describe('SubMenuBackendCreateComponent', () => {
  let component: SubMenuBackendCreateComponent;
  let fixture: ComponentFixture<SubMenuBackendCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubMenuBackendCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuBackendCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
