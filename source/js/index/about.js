import Vue from "vue";
import * as core from "../core";
import helpers from "./helpers";
import templates from "./templates";


/**
 *
 * @public
 * @namespace about
 * @description A nice description of what this module does...
 *
 */
const about = {
    /**
     *
     * @public
     * @member dataType
     * @memberof about
     * @description The content type.
     *
     */
    dataType: "page",


    /**
     *
     * @public
     * @member template
     * @memberof about
     * @description The template context.
     *
     */
    template: "about",


    /**
     *
     * @public
     * @method init
     * @param {object} data The loaded app data
     * @memberof about
     * @description Method runs once when window loads.
     *
     */
    init ( data ) {
        this.data = data;

        core.emitter.on( "app--view-about", this.load.bind( this ) );
        core.emitter.on( "app--view-teardown", this.teardown.bind( this ) );

        core.log( "about initialized" );
    },


    /**
     *
     * @public
     * @method load
     * @memberof about
     * @description Method performs onloading actions for this module.
     *
     */
    load () {
        this.viewData = {
            page: helpers.getLinkedDocumentBySlug( this.dataType, this.template, this.data )
        };
        this.view = new Vue({
            el: core.dom.page[ 0 ],
            data: this.viewData,
            ready: () => {
                this.imageController = core.images.handleImages();
            },
            replace: false,
            template: templates.get( this.template )
        });

        core.dom.html.addClass( "is-about-page" );
    },


    /**
     *
     * @public
     * @method teardown
     * @memberof about
     * @description Method performs cleanup after this module. Remmoves events, null vars etc...
     *
     */
    teardown () {
        if ( this.view ) {
            this.view.$destroy();
            this.view = null;
            this.viewData = null;
        }

        if ( this.imageController ) {
            this.imageController.destroy();
            this.imageController = null;
        }

        core.dom.html.removeClass( "is-about-page" );
    }
};


/******************************************************************************
 * Export
*******************************************************************************/
export default about;