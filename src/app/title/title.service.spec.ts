import { TestBed, waitForAsync, fakeAsync, flush, tick } from '@angular/core/testing';

import { TitleService } from './title.service';

describe('TitleService', () => {
    let service: TitleService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TitleService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getting a title', () => {
        /*it('should return a string promise', () => {
            service.getTitle().then(result => expect(result).toBe('Hello!!!'));
        });*/

        it('should return a string promise', waitForAsync(() => {
            service.getTitle().then(result => expect(result).toBe('Hello!!!'));
        }));

        it('should return a string promise', fakeAsync(() => {
            let title = null;
            service.getTitle().then((result) => title = result);
            flush();
            expect(title).toBe('Hello!!!');
        }));

        it('should return a string promise', fakeAsync(() => {
            let title = null;
            service.getTitle().then((result) => title = result);
            //tick(1000);
            tick(3000);
            expect(title).toBe('Hello!!!');
        }));
    });
});
