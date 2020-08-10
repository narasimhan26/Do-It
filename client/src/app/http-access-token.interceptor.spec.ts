import { TestBed } from '@angular/core/testing';

import { HttpAccessTokenInterceptor } from './http-access-token.interceptor';

describe('HttpAccessTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpAccessTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpAccessTokenInterceptor = TestBed.inject(HttpAccessTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
