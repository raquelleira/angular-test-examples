import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { TitleComponent } from './title.component';
import { TitleService } from './title.service';

@NgModule({
    declarations: [TitleComponent],
    imports: [
        CommonModule,
        MatButtonModule
    ],
    exports: [
        TitleComponent
    ],
    providers: [
        TitleService
    ]
})
export class TitleModule { }
