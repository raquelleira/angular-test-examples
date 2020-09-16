import { Component, OnInit } from '@angular/core';
import { TitleService } from './title.service';

@Component({
    selector: 'app-title',
    templateUrl: './title.component.html',
    styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {

    public title: string = 'Loading...';

    constructor(
        private titleService: TitleService
    ) { }

    public ngOnInit(): void {
        this.titleService.getTitle()
            .then(title => {
                console.log(title);
                this.title = title;
            });
    }

    public changeTheTitle(): void {
        if (this.title.includes('Hello')) {
            this.title = this.titleService.getAnotherTitle('Bye!!!');
        } else {
            this.title = this.titleService.getAnotherTitle('Hello!!!');
        }
    }

}
