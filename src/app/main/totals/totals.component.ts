import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-totals',
    templateUrl: './totals.component.html',
    styleUrls: ['./totals.component.scss']
})
export class TotalsComponent implements OnInit {

    @Input() totals;

    constructor() { }

    public ngOnInit(): void {
    }

}
