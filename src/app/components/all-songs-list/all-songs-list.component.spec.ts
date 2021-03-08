import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSongsListComponent } from './all-songs-list.component';

describe('AllSongsListComponent', () => {
  let component: AllSongsListComponent;
  let fixture: ComponentFixture<AllSongsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSongsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
