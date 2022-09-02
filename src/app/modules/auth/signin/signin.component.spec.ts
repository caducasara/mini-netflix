import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SiginComponent } from './signin.component';

describe('SiginComponent', () => {
  let component: SiginComponent;
  let fixture: ComponentFixture<SiginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiginComponent ],
      providers: [FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
