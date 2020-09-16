import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    public showTotals = false;
    public form: FormGroup;

    public items = [];

    constructor(
        private formBuilder: FormBuilder
    ) { }

    public ngOnInit(): void {
        this.form = this.buildForm();
    }

    public save(): void {
        this.items.push(this.form.getRawValue());
        this.cancel();
    }

    public cancel(): void {
        this.form.reset();
    }

    public clear(): void {
        this.items = [];
        this.cancel();
    }

    private buildForm(): FormGroup {
        return this.formBuilder.group({
            item: [null, Validators.required],
            description: null
        });
    }

}
