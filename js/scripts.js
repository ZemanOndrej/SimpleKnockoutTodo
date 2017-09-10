/*jshint esversion: 6 */
import * as ko from "knockout";
class ClickCounterViewModel {
    constructor(options) {
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

ko.applyBindings(new ClickCounterViewModel());
