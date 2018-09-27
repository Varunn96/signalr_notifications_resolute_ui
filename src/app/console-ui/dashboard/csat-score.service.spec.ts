import { TestBed, inject } from '@angular/core/testing';

import { CsatScoreService } from './csat-score.service';

describe('CsatScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsatScoreService]
    });
  });

  it('should be created', inject([CsatScoreService], (service: CsatScoreService) => {
    expect(service).toBeTruthy();
  }));
});
