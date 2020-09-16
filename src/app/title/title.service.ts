import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

    constructor() { }

    public getTitle(): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => resolve('Hello!!!'), 3000);
        });
    }

    public getAnotherTitle(title: string): string {
        return title;
    }
}
