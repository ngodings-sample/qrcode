/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SubMenuBackendUpdateComponent } from './submenubackendupdate.component';

describe('SubMenuBackendUpdateComponent', () => {
  let component: SubMenuBackendUpdateComponent;
  let fixture: ComponentFixture<SubMenuBackendUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubMenuBackendUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubMenuBackendUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
