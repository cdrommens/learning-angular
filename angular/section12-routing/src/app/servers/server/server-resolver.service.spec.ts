import { TestBed } from '@angular/core/testing';

import { ServerResolver } from './server-resolver.service';

describe('ServerResolverService', () => {
  let service: ServerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
