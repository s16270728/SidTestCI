import { TestBed } from '@angular/core/testing';

import { HttpValueService } from './http-value.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { defer } from 'rxjs';

describe('HttpValueService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let valueService: HttpValueService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [
        HttpValueService,
        { provide: HttpClient, useValue: spy }
      ]
    });
    // Inject both the service-to-test and its (spy) dependency
    valueService = TestBed.get(HttpValueService);
    httpClientSpy = TestBed.get(HttpClient);
  });


  it('should be created', () => {
    const service: HttpValueService = TestBed.get(HttpValueService);
    expect(service).toBeTruthy();
  });

  it('should return expected values (HttpClient called once)', () => {
    const expectedValues: string[] = ["A","B","C"];

    httpClientSpy.get.and.returnValue(defer(() => Promise.resolve(expectedValues)));

    valueService.getHttpValue().subscribe(
      values => expect(values).toEqual(expectedValues, 'expected values'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });
   
    httpClientSpy.get.and.returnValue(defer(() => Promise.reject(errorResponse)));
   
    valueService.getHttpValue().subscribe(
      values => fail('expected an error, not values'),
      error  => expect(error.message).toContain('test 404 error')
    );
  });
});
