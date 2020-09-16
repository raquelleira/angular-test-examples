import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { FormBuilder } from '@angular/forms';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let element: HTMLElement;

    const selectors = {
        showTotalsButton: '#showTotalsButton',
        itemInput: '#itemInput',
        descriptionInput: '#descriptionInput',
        saveButton: '#saveButton',
        cancelButton: '#cancelButton',
        itemsContainer: '#itemsContainer',
        itemDisplay: '.itemDisplay',
        clearAllButton: '#clearAllButton',
        totals: '#totals'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ MainComponent ],
            providers: [FormBuilder]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the show totals button', () => {
        expect(element.querySelector(selectors.showTotalsButton)).toBeTruthy();
    });

    it('should build a form with empty values', () => {
        expect(component.form).toBeTruthy();
        expect(component.form.get('item').value).toBe(null);
        expect(component.form.get('description').value).toBe(null);
    });

    it('should display the form fields', () => {
        expect(element.querySelector(selectors.itemInput)).toBeTruthy();
        expect(element.querySelector(selectors.descriptionInput)).toBeTruthy();
    });

    it('should display form action buttons', () => {
        expect(element.querySelector(selectors.saveButton)).toBeTruthy();
        expect(element.querySelector(selectors.cancelButton)).toBeTruthy();
    });

    it('should disable save button', () => {
        const saveButton: HTMLButtonElement = element.querySelector(selectors.saveButton) as HTMLButtonElement;
        expect(saveButton).toBeTruthy();
        expect(saveButton.disabled).toBe(true);
    });

    it('should not display items', () => {
        expect(component.items.length).toBe(0);
        expect(element.querySelector(selectors.itemsContainer)).toBeFalsy();
    });

    it('should not display clear all button', () => {
        expect(element.querySelector(selectors.clearAllButton)).toBeFalsy();
    });

    it('should not display totals', () => {
        expect(component.showTotals).toBe(false);
        expect(element.querySelector(selectors.totals)).toBeFalsy();
    });

    it('should display a show totals button', () => {
        expect(element.querySelector(selectors.showTotalsButton)).toBeTruthy();
        expect(element.querySelector(selectors.showTotalsButton).textContent).toContain('Show Totals');
    });

    describe('clicking show totals button', () => {
        beforeEach(() => {
            const showTotalsButton: HTMLButtonElement = element.querySelector(selectors.showTotalsButton) as HTMLButtonElement;
            showTotalsButton.click();
            fixture.detectChanges();
        });

        it('should display totals', () => {
            expect(component.showTotals).toBe(true);
            expect(element.querySelector(selectors.totals)).toBeTruthy();
        });

        it('should update show totals button caption', () => {
            expect(element.querySelector(selectors.showTotalsButton).textContent).toContain('Hide Totals');
        });

        describe('then clicking to hide totals', () => {
            beforeEach(() => {
                const showTotalsButton: HTMLButtonElement = element.querySelector(selectors.showTotalsButton) as HTMLButtonElement;
                showTotalsButton.click();
                fixture.detectChanges();
            });

            it('should hide totals', () => {
                expect(component.showTotals).toBe(false);
                expect(element.querySelector(selectors.totals)).toBeFalsy();
            });

            it('should update show totals button caption', () => {
                expect(element.querySelector(selectors.showTotalsButton).textContent).toContain('Show Totals');
            });
        });
    });

    describe('entering items in the form', () => {
        beforeEach(() => {
            component.form.get('item').setValue('Item Name');
            component.form.get('description').setValue('Item Description');
            fixture.detectChanges();
        });

        it('should enable save button', () => {
            const saveButton: HTMLButtonElement = element.querySelector(selectors.saveButton) as HTMLButtonElement;
            expect(saveButton).toBeTruthy();
            expect(saveButton.disabled).toBe(false);
        });

        describe('canceling form', () => {
            beforeEach(() => {
                //component.cancel();
                const cancelButton: HTMLButtonElement = element.querySelector(selectors.cancelButton) as HTMLButtonElement;
                cancelButton.click();
                fixture.detectChanges();
            });

            it('should disable save button', () => {
                const saveButton: HTMLButtonElement = element.querySelector(selectors.saveButton) as HTMLButtonElement;
                expect(saveButton).toBeTruthy();
                expect(saveButton.disabled).toBe(true);
            });

            it('should reset form with empty values', () => {
                expect(component.form.get('item').value).toBe(null);
                expect(component.form.get('description').value).toBe(null);
            });

            describe('then entering information again', () => {
                beforeEach(() => {
                    component.form.get('item').setValue('Item Name');
                    component.form.get('description').setValue('Item Description');
                    fixture.detectChanges();
                });

                it('should enable save button', () => {
                    const saveButton: HTMLButtonElement = element.querySelector(selectors.saveButton) as HTMLButtonElement;
                    expect(saveButton).toBeTruthy();
                    expect(saveButton.disabled).toBe(false);
                });

                describe('then saving', () => {
                    beforeEach(() => {
                        //component.save();
                        const saveButton: HTMLButtonElement = element.querySelector(selectors.saveButton) as HTMLButtonElement;
                        saveButton.click();
                        fixture.detectChanges();
                    });

                    it('should add item to the items array', () => {
                        expect(component.items.length).toBe(1);
                        expect(component.items[0].item).toContain('Item Name');
                        expect(component.items[0].description).toContain('Item Description');
                    });

                    it('should reset form with empty values', () => {
                        expect(component.form.get('item').value).toBe(null);
                        expect(component.form.get('description').value).toBe(null);
                    });

                    it('should display items', () => {
                        expect(element.querySelector(selectors.itemsContainer)).toBeTruthy();
                        expect(element.querySelectorAll(selectors.itemDisplay)[0].textContent).toContain('Item Name - Item Description');
                    });

                    it('should display clear all button', () => {
                        expect(element.querySelector(selectors.clearAllButton)).toBeTruthy();
                    });

                    describe('adding more items', () => {
                        beforeEach(() => {
                            component.form.get('item').setValue('Item Name 2');
                            component.form.get('description').setValue('Item Description 2');
                            component.save();
                            component.form.get('item').setValue('Item Name 3');
                            component.form.get('description').setValue('Item Description 3');
                            component.save();
                            fixture.detectChanges();
                        });

                        it('should add the items to the array', () => {
                            expect(component.items.length).toBe(3);
                        });

                        it('should display items', () => {
                            expect(element.querySelector(selectors.itemsContainer)).toBeTruthy();
                            expect(element.querySelectorAll(selectors.itemDisplay).length).toBe(3);
                        });
                    });

                    describe('clearing all', () => {
                        beforeEach(() => {
                            component.clear();
                            fixture.detectChanges();
                        });

                        it('should clear the items array', () => {
                            expect(component.items.length).toBe(0);
                        });

                        it('should not display items', () => {
                            expect(component.items.length).toBe(0);
                            expect(element.querySelector(selectors.itemsContainer)).toBeFalsy();
                        });

                        it('should not display clear all button', () => {
                            expect(element.querySelector(selectors.clearAllButton)).toBeFalsy();
                        });
                    });
                });
            });
        });
    });
});
