import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterHelperService {

    constructor(private router: Router) {}

    goTo(route: string, param?: number, param2?: number): void {
        const navigation = param && param2
                         ? [ route, param, param2 ]
                         : param
                            ? [ route, param ]
                            : [ route ];
                            
        this.router.navigate(navigation);
    }
}
