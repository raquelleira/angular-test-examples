import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalsComponent } from './totals.component';

describe('TotalsComponent', () => {
    let component: TotalsComponent;
    let fixture: ComponentFixture<TotalsComponent>;
    let element: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ TotalsComponent ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TotalsComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('zero items', () => {
        beforeEach(() => {
            component.totals = 0;
            fixture.detectChanges();
        });

        it('should display label correctly', () => {
            expect(element.querySelector('#totalsDescription').textContent).toContain('You have 0 items');
        });
    });

    describe('one item', () => {
        beforeEach(() => {
            component.totals = 1;
            fixture.detectChanges();
        });

        it('should display label correctly', () => {
            expect(element.querySelector('#totalsDescription').textContent).toContain('You have 1 item');
        });
    });

    describe('more than one item', () => {
        beforeEach(() => {
            component.totals = 4;
            fixture.detectChanges();
        });

        it('should display label correctly', () => {
            expect(element.querySelector('#totalsDescription').textContent).toContain('You have 4 items');
        });
    });
});
