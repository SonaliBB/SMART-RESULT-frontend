import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfDownloadComponent } from './pdf-download.component';

describe('PdfDownloadComponent', () => {
  let component: PdfDownloadComponent;
  let fixture: ComponentFixture<PdfDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfDownloadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
