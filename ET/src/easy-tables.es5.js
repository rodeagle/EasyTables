'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcInjectCssJs = require("../src/inject-css.js");

var _srcInjectCssJs2 = _interopRequireDefault(_srcInjectCssJs);

var handlebars = require('handlebars');
var $ = require('jquery');

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
var dynamicTemplate = '\n    <div class="dynamic-table-desktop">\n        <div class="tb {{#if bordered}}  {{else}}  {{/if}}">\n            <div class="row no-gutters">\n                {{#each headers}}\n                    <div class="col col-{{col}} p-1 header-cell {{class}} {{desktopClass}} {{headerClass}} {{#if headerInvisible}} hidden-handlebars-item {{/if}} {{#if hiddenInput}}hidden-handlebars-item{{/if}}" {{#if filter}} filter="{{filter}}"{{/if}}>{{name}}</div>\n                {{/each}}\n            </div>\n            {{#each rows}}\n                <div class="row no-gutters {{NthOpt ../this @index}} dt-row">\n                    {{#each ../headers}}\n                        <input type="hidden" name="{{getValueName ../this @index}}" value="{{getValue ../this @index}}">\n                        <div class="col col-{{col}} {{#if rowClass}}{{rowClass}}{{else}}p-1{{/if}} {{class}} {{desktopClass}}" title="{{{title}}}" {{#if data}} data-{{data}}="{{GetItemByName ../this data}}" {{/if}}>{{#if isHTML}}{{{getValue ../this @index}}}{{else if isArray}}{{{buildArray (getValue ../this @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue ../this @index}}{{/if}}</div>\n                    {{/each}}\n                </div>\n            {{/each}}\n        </div>\n    </div>\n    <div class="dynamic-table-mobile structure" {{#if maxheight}} style="max-height:{{maxheight}}" {{else}} style="max-height:300px" {{/if}}>\n        <div class="tb  {{#if bordered}}  {{else}}  {{/if}}">\n                {{#if (eq MobileRenderMode \'OneHeader\')}}\n                {{#each headers}}\n                <div class="row no-gutters dt-row">\n                    <div class="col-12 {{class}} {{headerClass}} header-cell grey {{NthOpt ../this @index}} {{#if headerInvisible}} hidden-handlebars-item{{/if}}">{{name}}</div>\n                    {{#each ../rows}}\n                        {{#if hiddenInput}}\n                            <input type="hidden" name="{{getValueName this @../index}}" value="{{getValue� this @../index}}"/>\n                        {{else}}\n                            <div class="col-12 {{../class}} {{../rowClass}} {{../mobileClass}} {{NthOpt ../../this @index}}" title="{{../title}}" {{#if ../data}} data-{{ ../data}}="{{GetItemByName this ../data}}" {{/if}}>{{#if ../isHTML}}{{{getValue this @../index}}}{{else if isArray}}{{{buildArray (getValue ../this @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue this @../index}}{{/if}}</div>\n                        {{/if}}\n                    {{/each}}\n                </div>\n                {{/each}}\n                {{/if}}\n                {{#if (eq MobileRenderMode \'PairRender\')}}\n                {{#each rows}}\n                {{#each ../headers}}\n                {{#if (returnIfEvenNumber true @../index)}}\n                {{#if (getValue ../this @index)}}\n                <div {{#unless NoNthOptInMobile}} class="{{NthOpt ../../this @index}}" {{/unless}}>\n                    {{#if hiddenInput}}\n                        <input type="hidden" name="{{getValueName this @../index}}" value="{{getValue this @../index}}"/>\n                    {{else}}\n                        <div class="col-12 {{class}} {{rowClass}} {{mobileClass}} {{../../OnEvenClass}}" title="{{title}}" {{#if data}} data-{{data}}="{{GetItemByName this data}}" {{/if}}>{{#if isHTML}}{{{getValue this @../index}}}{{else if isArray}}{{{buildArray (getValue ../this @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue ../this @index}}{{/if}}</div>\n                    {{/if}}\n                </div>\n                {{/if}}\n                {{#if (getValue (GetItemByName ../../rows (_add1 @../index)) @index)}}\n                <div {{#unless NoNthOptInMobile}} class="{{NthOpt ../../this (_add1 @index)}}" {{/unless}}>\n                    {{#if hiddenInput}}\n                        <input type="hidden" name="{{getValueName ../../rows (_add1 @../index)}}" value="{{getValue ../../rows (_add1 @../index)}}""/>\n                    {{else}}\n                        <div class="col-12 {{class}}" title="{{title}}" {{#if data}} data-{{data}}="{{GetItemByName this data}}" {{/if}}><div class="{{rowClass}} {{mobileClass}} {{../../OnUnEvenClass}}">{{#if isHTML}}{{{getValue (GetItemByName ../../rows (_add1 @../index)) @index}}}{{else if isArray}}{{{buildArray (getValue (GetItemByName ../../rows (_add1 @../index)) @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue (GetItemByName ../../rows (_add1 @../index)) @index}}{{/if}}</div></div>\n                    {{/if}}\n                </div>\n                {{/if}}\n                {{/if}}\n                {{/each}}\n                {{/each}}\n                {{/if}}\n                {{#if (eq MobileRenderMode \'Normal\')}}\n                {{#each rows}}\n                <div class=\'dt-row\'>\n                {{#each ../headers}}\n                <div class="row no-gutters {{returnIfUnEvenNumber \'grey\' @../index}} {{NthOpt ../this @../index}}">\n                    <input type="hidden" name="{{getValueName ../this @index}}" value="{{getValue ../this @index}}"/>\n                    <div class="col col-6 header-cell {{class}} {{headerClass}} {{#if headerInvisible}} hidden-handlebars-item{{/if}} {{#if hiddenInput}}hidden-handlebars-item{{/if}}" {{#if filter}}filter="{{filter}}"{{/if}}>{{name}}</div>\n                    <div class="col {{#if headerInvisible}}col-12{{else}}col-6{{/if}}{{class}}{{rowClass}}{{mobileClass}}" title="{{title}}" {{#if data}} data-{{data}}="{{GetItemByName ../this data}}" {{/if}}>{{#if isHTML}}{{{getValue ../this @index}}}{{else if isArray}}{{{buildArray (getValue ../this @index)}}}{{else if template}}{{{template}}}{{else}}{{getValue ../this @index}}{{/if}}</div>\n                </div>\n                {{/each}}\n                </div>\n                {{/each}}\n                {{/if}}\n        </div>\n    </div>\n';

var dynamicStyleTemplate = '\n    .margin-30 {\n    margin-left: 30px;\n    margin-right: 30px; }\n\n\n    .grey {\n    background-color: #efefef; }\n\n\n    .hidden-handlebars-item {\n    display: none !important;\n    visibility: hidden; }\n\n\n    @media only screen {\n    .dynamic-table-mobile.structure {\n    overflow-x: hidden;\n    overflow-y: scroll; }\n    .dynamic-table-mobile .row th, .dynamic-table-mobile .row td {\n    padding-left: 10px;\n    overflow-wrap: break-word; }\n    .dynamic-table-mobile .row th, .dynamic-table-mobile .row td {\n    padding-left: 20px;\n    overflow-wrap: break-word; } }\n\n\n        .dynamic-table-desktop {\n        display: none;\n        visibility: hidden; }\n\n\n    @media (min-width: 720px) {\n    .dynamic-table-mobile {\n    display: none; }\n    .dynamic-table-desktop {\n    display: block;\n    visibility: visible; } }\n\n\n    [filter]{\n        cursor: pointer;\n    }\n\n\n    .asc[filter]:after {\n        padding-left:3px;\n        content: "⇩";\n    }\n\n\n    .desc[filter]:after {\n        padding-left: 3px;\n        content: "⇧";\n    }\n\n    .tb .row:not(.isarray) > .col {\n        border-left:1px solid #DEE2E6;\n    }\n    .tb .row:not(.isarray) > .col:last-child {\n        border-right:1px solid #DEE2E6;\n    }\n\n    .tb .row:not(.isarray) {\n        border-top:1px solid #DEE2E6;\n    }\n\n    .tb .row:last-child:not(.isarray) {\n        border-bottom:1px solid #DEE2E6;\n    }\n\n    .tb .header-cell{\n        font-weight:bold;\n    }\n';

function Init() {

    _srcInjectCssJs2['default'].Append(dynamicStyleTemplate, {});
    //var DesktopCount = 0;

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
        if (x1) {
            console.log(x1);
        }
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

    handlebars.registerHelper('IfNot', function (value) {
        if (value == undefined || value == null) return true;
        if (typeof value == 'boolean') return !value;
        return false;
    });

    handlebars.registerHelper('NthOpt', function (array, index) {
        var ind = '' + index;
        var nthopt = array.NthOpt;
        if (nthopt === undefined) return '';
        var res = nthopt[ind] || '';
        return res;
    });

    handlebars.registerHelper('buildArray', function (array) {
        var html = "";
        /// this method build an array col into a html col for proper styling
        array.forEach(function (element) {
            var row = element.row;
            var _alignment = element.alignment || 'center';
            var _class = element['class'] || 'col';
            var string = "<div class='row margin-0 no-gutters isarray'>";
            var textalign = "text-" + _alignment;
            row.forEach(function (item) {
                var hasblank = item === '';
                if (hasblank) {
                    item = "";
                }
                string += '<div class=\'' + textalign + ' ' + _class + '\'>' + item + '</div>';
            });
            string += "</div>";
            html += string;
        });
        return html;
    });
}

Init();

var _properties = {
    headers: [{
        //name: '',
        //maxheight: '',
        //class: '',
        //title: '',
        //col: 0,
        //headerClass: '',
        //rowClass: '',
        //isHTML: false,
        //headerInvisible: true,
        //isArray: false,
        //desktopClass: ''; // add a class only to the desktop view,
        //mobileClass: '',
        //hiddenInput : false,
        // template : false;

    }],
    rows: [],
    bordered: true,
    //NthOpt: { 1: 'classes', 2: 'classes', 10: 'classes' }
    MobileRenderMode: 'Normal', //Normal, OneHeader, PairRender // required to be set on the json obj,
    //OnEvenClass: '', //add a class to the even row
    //OnUnEvenClass: '', //adds a class to the uneven row
    NoNthOptInMobile: false
};

//boostrapVersion: 4,

function MapHtmlToJson($row) {
    // serialize into a json object all elements children to the row
    return $row.find('input:hidden').serializeArray().map(function (x) {
        var json = [];
        json[x.name] = x.value;
        return json;
    }).reduce(function (x, y) {
        return $.extend({}, x, y);
    }, {});
}

function RecompileNestedTemplates(container) {
    var rows = $(container).find('.dt-row');
    rows.each(function () {
        var newProperties = MapHtmlToJson($(this));
        var source = $(this).html();
        var template = handlebars.compile(source);
        var html = template(newProperties);
        $(this).html(html);
    });
}

exports['default'] = {
    CreateTable: function CreateTable(container, properties) {
        var newProperties = $.extend({}, _properties, properties);
        var source = dynamicTemplate;
        var template = handlebars.compile(source);
        var html = template(newProperties);
        $(container).html(html);
        RecompileNestedTemplates(container);
        return $(container);
    },
    SerializeTableContainer: function SerializeTableContainer(container) {
        return $(container).find("input[type='hidden'], :input:not(:hidden)").serializeObject();
    }
};
module.exports = exports['default'];

