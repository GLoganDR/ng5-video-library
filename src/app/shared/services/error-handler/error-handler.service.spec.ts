import { HttpErrorResponse } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
    let mock: HttpTestingController;
    let http: HttpClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ErrorHandlerService]
        });

        mock = TestBed.get(HttpTestingController);
        http = TestBed.get(HttpClient);
    });

    afterEach(() => {
        mock.verify();
    });

    it('should be created', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        expect(service).toBeTruthy();
    }));

    it('should handleError', inject([ErrorHandlerService], (service: ErrorHandlerService) => {
        const urlString = '/data';
        const eMsg = 'deliberate 404 error';

        spyOn(service, 'handleError');

        http.get(urlString).subscribe(() => fail('should have failed with the 404 error'), (error: HttpErrorResponse) => {

            service.handleError(error);

            expect(service.handleError).toHaveBeenCalled();
            expect(error.status).toEqual(404, 'status');
            expect(error.error).toEqual(eMsg, 'message');
        });

        const req = mock.expectOne(urlString);

        req.flush(eMsg, {status: 404, statusText: 'Not Found'});
    }));
});
