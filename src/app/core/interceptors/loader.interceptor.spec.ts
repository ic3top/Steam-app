import { TestBed } from '@angular/core/testing';

import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from '../services/loader.service';

describe('LoadInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LoaderInterceptor, LoaderService],
  }));

  it('should be created', () => {
    const interceptor: LoaderInterceptor = TestBed.inject(LoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
