/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MenuBackendCreateComponent } from './menubackendcreate.component';

describe('MenuBackendCreateComponent', () => {
  let component: MenuBackendCreateComponent;
  let fixture: ComponentFixture<MenuBackendCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuBackendCreateComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBackendCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
