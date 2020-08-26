
const Handlebars = require('handlebars');

export default {
    Append: function (newcss, settings) {
        settings = settings || {};
        let template = Handlebars.compile(newcss);
        let _newCSS = template(settings);
        let head = document.head || document.getElementsByTagName('head')[0];
        let style = document.createElement('style');


        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = _newCSS;
        } else {
            style.appendChild(document.createTextNode(_newCSS));
        }


        head.appendChild(style);
    }
};


