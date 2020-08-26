import css_service from "../src/inject-css.js";
const handlebars = require('handlebars');
const $ = require('jquery');

// snippet from https://css-tricks.com/snippets/jquery/serialize-form-to-json/
// author Chris Coyier
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//// here we will move the dynamic tables to make it responsive
let dynamicTemplate = `
    <div class="dynamic-table-desktop">
        <div class="tb {{#if bordered}}  {{else}}  {{/if}}">
            <div class="row no-gutters">
                {{#each headers}}
                    <div class="col col-{{col}} p-1 header-cell {{class}} {{desktopClass}} {{headerClass}} {{#if headerInvisible}} hidden-handlebars-item {{/if}} {{#if hiddenInput}}hidden-handlebars-item{{/if}}" {{#if filter}} filter="{{filter}}"{{/if}}>{{name}}</div>
                {{/each}}
            </div>
            {{#each rows}}
                <div class="row no-gutters {{NthOpt ../this @index}} dt-row">
                    {{#each ../headers}}
                        <input type="hidden" name="{{getValueName ../this @index}}" value="{{getValue ../this @index}}">
                        <div class="col col-{{col}} p-1 {{class}} {{desktopClass}} {{rowClass}}" title="{{{title}}}" {{#if data}} data-{{data}}="{{GetItemByName ../this data}}" {{/if}}>{{#if isHTML}}{{{getValue ../this @index}}}{{else if isarray}}{{{buildArray (getValue ../this @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue ../this @index}}{{/if}}</div>
                    {{/each}}
                </div>
            {{/each}}
        </div>
    </div>
    <div class="dynamic-table-mobile structure" {{#if maxheight}} style="max-height:{{maxheight}}" {{else}} style="max-height:300px" {{/if}}>
        <div class="tb  {{#if bordered}}  {{else}}  {{/if}}">
                {{#if (eq MobileRenderMode 'OneHeader')}}
                {{#each headers}}
                <div class="row no-gutters dt-row">
                    <div class="col-12 {{class}} {{headerClass}} header-cell grey {{NthOpt ../this @index}} {{#if headerInvisible}} hidden-handlebars-item{{/if}}">{{name}}</div>
                    {{#each ../rows}}
                        {{#if hiddenInput}}
                            <input type="hidden" name="{{getValueName this @../index}}" value="{{getValue  this @../index}}"/>
                        {{else}}
                            <div class="col-12 {{../class}} {{../rowClass}} {{../mobileClass}} {{NthOpt ../../this @index}}" title="{{../title}}" {{#if ../data}} data-{{ ../data}}="{{GetItemByName this ../data}}" {{/if}}>{{#if ../isHTML}}{{{getValue this @../index}}}{{else if isarray}}{{{buildArray (getValue ../this @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue this @../index}}{{/if}}</div>
                        {{/if}}
                    {{/each}}
                </div>
                {{/each}}
                {{/if}}
                {{#if (eq MobileRenderMode 'PairRender')}}
                {{#each rows}}
                {{#each ../headers}}
                {{#if (returnIfEvenNumber true @../index)}}
                {{#if (getValue ../this @index)}}
                <div {{#unless NoNthOptInMobile}} class="{{NthOpt ../../this @index}}" {{/unless}}>
                    {{#if hiddenInput}}
                        <input type="hidden" name="{{getValueName this @../index}}" value="{{getValue this @../index}}"/>
                    {{else}}
                        <div class="col-12 {{class}} {{rowClass}} {{mobileClass}} {{../../OnEvenClass}}" title="{{title}}" {{#if data}} data-{{data}}="{{GetItemByName this data}}" {{/if}}>{{#if isHTML}}{{{getValue this @../index}}}{{else if isarray}}{{{buildArray (getValue ../this @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue ../this @index}}{{/if}}</div>
                    {{/if}}
                </div>
                {{/if}}
                {{#if (getValue (GetItemByName ../../rows (_add1 @../index)) @index)}}
                <div {{#unless NoNthOptInMobile}} class="{{NthOpt ../../this (_add1 @index)}}" {{/unless}}>
                    {{#if hiddenInput}}
                        <input type="hidden" name="{{getValueName ../../rows (_add1 @../index)}}" value="{{getValue ../../rows (_add1 @../index)}}""/>
                    {{else}}
                        <div class="col-12 {{class}}" title="{{title}}" {{#if data}} data-{{data}}="{{GetItemByName this data}}" {{/if}}><div class="{{rowClass}} {{mobileClass}} {{../../OnUnEvenClass}}">{{#if isHTML}}{{{getValue (GetItemByName ../../rows (_add1 @../index)) @index}}}{{else if isarray}}{{{buildArray (getValue (GetItemByName ../../rows (_add1 @../index)) @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue (GetItemByName ../../rows (_add1 @../index)) @index}}{{/if}}</div></div>
                    {{/if}}
                </div>
                {{/if}}
                {{/if}}
                {{/each}}
                {{/each}}
                {{/if}}
                {{#if (eq MobileRenderMode 'Normal')}}
                {{#each rows}}
                <div class='dt-row'>
                {{#each ../headers}}
                <div class="row no-gutters {{returnIfUnEvenNumber 'grey' @../index}} {{NthOpt ../this @../index}}">
                    <input type="hidden" name="{{getValueName ../this @index}}" value="{{getValue ../this @index}}"/>
                    <div class="col col-6 header-cell {{class}} {{headerClass}} {{#if headerInvisible}} hidden-handlebars-item{{/if}} {{#if hiddenInput}}hidden-handlebars-item{{/if}}" {{#if filter}}filter="{{filter}}"{{/if}}>{{name}}</div>
                    <div class="col {{#if headerInvisible}}col-12{{else}}col-6{{/if}}{{class}}{{rowClass}}{{mobileClass}}" title="{{title}}" {{#if data}} data-{{data}}="{{GetItemByName ../this data}}" {{/if}}>{{#if isHTML}}{{{getValue ../this @index}}}{{else if isarray}}{{{buildArray (getValue ../this @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue ../this @index}}{{/if}}</div>
                </div>
                {{/each}}
                </div>
                {{/each}}
                {{/if}}
        </div>
    </div>
`;


let dynamicStyleTemplate = `
    .margin-30 {
    margin-left: 30px;
    margin-right: 30px; }


    .grey {
    background-color: #efefef; }


    .hidden-handlebars-item {
    display: none !important;
    visibility: hidden; }


    @media only screen {
    .dynamic-table-mobile.structure {
    overflow-x: hidden;
    overflow-y: scroll; }
    .dynamic-table-mobile .row th, .dynamic-table-mobile .row td {
    padding-left: 10px;
    overflow-wrap: break-word; }
    .dynamic-table-mobile .row th, .dynamic-table-mobile .row td {
    padding-left: 20px;
    overflow-wrap: break-word; } }


        .dynamic-table-desktop {
        display: none;
        visibility: hidden; }


    @media (min-width: 720px) {
    .dynamic-table-mobile {
    display: none; }
    .dynamic-table-desktop {
    display: block;
    visibility: visible; } }


    [filter]{
        cursor: pointer;
    }


    .asc[filter]:after {
        padding-left:3px;
        content: "\u21E9";
    }


    .desc[filter]:after {
        padding-left: 3px;
        content: "\u21E7";
    }

    .tb  .row .col {
        border-left:1px solid #DEE2E6;
    }
    .tb  .row .col:last-child {
        border-right:1px solid #DEE2E6;
    }

    .tb .row {
        border-top:1px solid #DEE2E6;
    }

    .tb .row:last-child {
        border-bottom:1px solid #DEE2E6;
    }

    .tb .header-cell{
        font-weight:bold;
    }
`;


    function Init() {

        css_service.Append(dynamicStyleTemplate, {});
        var DesktopCount = 0;


        handlebars.registerHelper('getValue', function (prop, i) {
            var x = 0;
            for (var p in prop) {
                if (x == i) {
                    return prop[p];

                }
                x++;
            } 
        });


        handlebars.registerHelper('getValueName', function (prop, i) {
            return Object.keys(prop)[i];

        });


        handlebars.registerHelper('PrintValues', function (x1) {
            if (x1) { console.log(x1); }
        });


        handlebars.registerHelper('_add1', function (param) {
            return param + 1;
        });


        handlebars.registerHelper('eq', function (v1, v2) {
            return v1 == v2;
        });


        handlebars.registerHelper('neq', function (v1, v2) {
            return v1 != v2;
        });


        handlebars.registerHelper('returnIfEvenNumber', function (value, i) {
            return i % 2 == 0 ? value : null;
        });


        handlebars.registerHelper('returnIfUnEvenNumber', function (value, i) {
            return i % 2 != 0 ? value : null;
        });


        handlebars.registerHelper('GetItemByName', function (array, value) {
            return array[value];
        });


        //handlebars.registerHelper('GetItemByName', function (fullarray, index, name) {
        //    DesktopCount++;
        //    return fullarray.rows[DesktopCount][name];
        //});


        handlebars.registerHelper('IfNot', function (value) {
            if (value == undefined || value == null)
                return true;
            if (typeof value == 'boolean')
                return !value;
         return false;
        });


        handlebars.registerHelper('NthOpt', function (array, index) {
            let ind = '' + index;
            let nthopt = array.NthOpt;
            if (nthopt == undefined) return '';
            let res = nthopt[ind] || '';
            return res;
        });


        handlebars.registerHelper('buildArray', function (array) {
            let html = "";
            /// this method build an array col into a html col for proper styling
            array.forEach(function (element) {
                let row = element.row;
                let _alignment = element.alignment || 'center';
                let _class = element.class || 'col';
                let string = "<div class='row margin-0'>";
                let textalign = "text-" + _alignment;
                row.forEach(function (item) {
                    var hasblank = item == '';
                    if (hasblank) {
                        item = "";
                    }
                    string += "<div class='" + textalign + " " + _class + "'>" + item + "</div>";
                });
                string += "</div>";
                html += string;
            });
            return html;
        });
 
    }


    Init();


    var _properties = {
        headers: [
          {
            //name: '',
            //maxheight: '',
            //class: '',
            //title: '',
            //col: 0,
            //anchorclass: '',
            //headerClass: '',
            //rowClass: '',
            //isHTML: false,
            //headerInvisible: true,
            //isarray: false,
            //desktopClass: ''; // add a class only to the desktop view,
            //mobileClass: '',
            //hiddenInput : false,
            // template : false;
     
        }
        ],
        rows: [],
        bordered: true,
        //NthOpt: { 1: 'classes', 2: 'classes', 10: 'classes' }
        MobileRenderMode: 'Normal', //Normal, OneHeader, PairRender // required to be set on the json obj,
        //OnEvenClass: '', //add a class to the even row
        //OnUnEvenClass: '', //adds a class to the uneven row
        NoNthOptInMobile: false,
        boostrapVersion: 4,
 
    };


    function RecompileNestedTemplates(container) {
        let rows = $(container).find('.dt-row');
        rows.each(function () {
            let newProperties = $(this).serializeObject();
            console.log($(this));
            console.log(newProperties);
            let source = $(this).html();
            console.log(source);
            let template = handlebars.compile(source);
            let html = template(newProperties);
            $(this).html(html);
        }); 
    }



export default {
    CreateTable: function (container, properties) {
        var newProperties = $.extend({}, _properties, properties);
        let source = dynamicTemplate;
        let template = handlebars.compile(source);
        let html = template(newProperties);
        $(container).html(html);
        RecompileNestedTemplates(container);
        return $(container);
    },
    SerializeTableContainer: function (container) {
        return $(container).find("input[type='hidden'], :input:not(:hidden)").serializeObject();
    }
};







/* HOW TO USE DYNAMIC VIEW TABLES


This is a simple dynamic table generator works for both desktop and mobile views


feed the handle table with a json with rows as the data and add the headers with the header data, name and col per column


--ex
//response.rows -- row data defined from the service provider
response.headers = [
    { name: '@Resources.Common.OrderN', col: 1 },
    { name: '@Resources.Common.Date', col: 2 },
    { name: '@Resources.Common.Customer', col: 3 },
    { name: '@Resources.Common.Sponsor', col: 3 },
    { name: '@Resources.Common.OfficeCode', col: 1 },
    { name: '@Resources.Common.Status', col: 2 },
];


Accepted properties for Dynamic Table


headers : [{
    name: ''
    modal: ''
    maxheight: ''
    class : ''
    title: ''
    col: 0
    data: '<data name>'
    headerClass: ''
    rowClass: ''
    isHTML: false,
    headerInvisible : true,
    isarray : false,
    desktopClass : ''  // add a class only to the desktop view,
    mobileClass: ''
    }, ... ]
rows  : [...]
bordered : true
NthOpt: { 1 : 'classes', 2 : 'classes', 10 : 'classes' }
MobileRenderMode: Normal, OneHeader, PairRender // required to be set on the json obj,
OnEvenClass: '' add a class to the even row
OnUnEvenClass: '' - adds a class to the uneven row
NoNthOptInMobile: false




ex Of the main current structure, rows is not name dependent they are placed by how the come in order.No more worries if names match or not:)


var obj = {
    headers: [
        { name: '', modal: '', maxheight: '', class: '', title: '', headerClass: '', rowClass: '', col: 0 },
        { name: '', modal: '', maxheight: '', class: '', title: '', headerClass: '', rowClass: '', col: 0 },
        { name: '', modal: '', maxheight: '', class: '', title: '', headerClass: '', rowClass: '', col: 0 }
    ],
    rows: [
        { dynamic.name : '', dynamic.name : '', dynamic.name : ''},
        { dynamic.name : '', dynamic.name : '', dynamic.name : ''},
        { dynamic.name : '', dynamic.name : '', dynamic.name : ''}
    ],
    bordered: false
}


In dynamic tables the data defines the structure of the table then you just stylize it a bit


IsArray rendering


For example you need multiple data to be shown in one column only box,
    Maybe a 3x2 table structure or a 4x4 or even 6x3, doesnt matter
having to make a unique table for each case can be time consuming
by defining the isarray in the header column the row will be handle as an
array of arrays


var obj = {
    headers: [
        { name: 'Col1', col: 6, isarray: true },
        { name: 'Col2', col: 6 }
    ],
    rows: [
        col1 : [row : [[1, 2, 3, 5, 6], [7, 8, 9, 10, 11]], alignment : 'center', class : 'col'],
        col2 : 'example'
    ]
}


For IsArray configuration make sure that the isarray is active and that you respect the child arrays naming convetions
row / alignment / class so it can work properly different from your generic dynamic tables configuration where naming convetion
are not required other than to respect the naming convetion for the header rows, row rows data name is not important other than the data




In this case it will render a 5x2 table in the column data structured each value will take the alignment defined default center and the class default being col
Rendering a table


-----------------------------
    | header Col1 | header Col2 |
    -----------------------------
    | 1 2 3 5 6   | Example     |
    | 7 8 9 10 11 |             |
    -----------------------------


        The supplied data will define the data structure, so you will not have to worry about giving it structures
nor styling a default style is generated and you can feed each row a certain class to style it even more and assign alignment





*/