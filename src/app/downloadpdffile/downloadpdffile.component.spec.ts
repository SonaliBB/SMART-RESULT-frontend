import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadpdffileComponent } from './downloadpdffile.component';

describe('DownloadpdffileComponent', () => {
  let component: DownloadpdffileComponent;
  let fixture: ComponentFixture<DownloadpdffileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadpdffileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadpdffileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
