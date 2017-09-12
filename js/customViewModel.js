
import * as ko from 'knockout';

export class TestModel {
    constructor() {
        const k = ko.observable('kappa');
        console.log(k);
    }
}
export class ClickCounterViewModel {
    constructor() {
        this.numberOfClicks = ko.observable(0);
        this.registerClick = () => {
            this.numberOfClicks(this.numberOfClicks() + 1);
        };
        this.resetClicks = () => {
            this.numberOfClicks(0);
        };
        this.hasClickedTooManyTimes = ko.computed(() => this.numberOfClicks() >= 3, this);
    }
}