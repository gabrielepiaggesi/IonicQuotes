import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {

    private altBackground = false;
    constructor() { }

    setBackground(alt: boolean){
        this.altBackground = alt;
    }

    isAlt(){
        return this.altBackground;
    }
}