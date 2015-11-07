"use strict";

import Rx from "../../../node_modules/rx/dist/rx.lite";
import _ from "../../../node_modules/lodash/collection";

class Frame {

    /**
     *  Provides functionality to process a frame. (Processes child elements)
     *  @constructor
     */
    constructor ($frame, document) {
        this.$ = $frame;
        this.document = document;

        // Make frame element fill the viewport vertically
        this.setFullHeight = () => {
            let viewportHeight = this.document.documentElement.clientHeight;
            this.$.style.height = viewportHeight + "px";
        };

        this.createItems = function () {
            let $items = this.$.querySelectorAll("[data-order]");
            this.items = _
                .sortBy($items, x => x.getAttribute("data-order"))
                .map(x => ({ position: parseInt(x.getAttribute("data-order")), $: x }));
        };
    }

    init() {
        this.setFullHeight();
        this.createItems();
    }

    getItem (position) {
        return _.find(this.items, x => x.position === position);
    }

    hasElementFor (position) {
        return typeof this.getItem(position) !== "undefined";
    }
}

export default Frame;
