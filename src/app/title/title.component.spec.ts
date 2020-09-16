import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick, flush } from '@angular/core/testing';

import { TitleComponent } from './title.component';
import { TitleService } from './title.service';

describe('TitleComponent', () => {
    let component: TitleComponent;
    let fixture: ComponentFixture<TitleComponent>;
    let element: HTMLElement;

    let titleServiceStub: {
        getTitle: jasmine.Spy,
        getAnotherTitle: jasmine.Spy
    };

    beforeEach(() => {
        titleServiceStub = jasmine.createSpyObj('TitleService', ['getTitle', 'getAnotherTitle']);
        titleServiceStub.getTitle.and.returnValue(Promise.resolve('Title!'));
    });

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [ TitleComponent ],
            providers: [
                { provide: TitleService, useValue: titleServiceStub },
            ]
        })
        .compileComponents();
    });

    beforeEach(waitForAsync(() => {
        fixture = TestBed.createComponent(TitleComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display a title', () => {
        expect(element.querySelector('.title').textContent).toBe('Loading...');
    });

    it('should display a title', waitForAsync(() => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(element.querySelector('.title').textContent).toBe('Title!');
        });
    }));

    describe('getting the title', () => {
        beforeEach(waitForAsync(() => {
            fixture.detectChanges();
        }));
        it('should display a title', () => {
            expect(element.querySelector('.title').textContent).toBe('Title!');
        });
    });

    it('should display a title', fakeAsync(() => {
        tick(3000);
        fixture.detectChanges();
        expect(element.querySelector('.title').textContent).toBe('Title!');
    }));

    it('should display a title', fakeAsync(() => {
        flush();
        fixture.detectChanges();
        expect(element.querySelector('.title').textContent).toBe('Title!');
    }));

    it('should change the title when clicking the button', () => {
        component.title = 'Hello!!!';
        component.changeTheTitle();
        expect(titleServiceStub.getAnotherTitle).toHaveBeenCalledWith('Bye!!!');
    });

    /*it('should change the title when clicking the button', () => {
        component.title = 'Hello!!!';
        component.changeTheTitle();
        expect(titleServiceStub.getAnotherTitle).toHaveBeenCalledWith('Bye!!!');
        fixture.detectChanges();
        expect(component.title).toEqual('Bye!!!');
    });*/
});
