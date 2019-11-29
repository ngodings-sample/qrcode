/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuBackendUpdateComponent } from './menubackendupdate.component';

describe('MenuBackendUpdateComponent', () => {
  let component: MenuBackendUpdateComponent;
  let fixture: ComponentFixture<MenuBackendUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBackendUpdateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBackendUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
