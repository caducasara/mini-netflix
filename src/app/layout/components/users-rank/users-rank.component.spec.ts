import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRankComponent } from './users-rank.component';

describe('UsersRankComponent', () => {
  let component: UsersRankComponent;
  let fixture: ComponentFixture<UsersRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
