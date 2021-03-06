import tables from '../src/easy-tables';

// header properties

//{
//    name: ''
//    modal: ''
//    maxheight: '' // depreciated need to be moved 
//    class : ''
//    title: ''
//    col: 0
//    data: '<data name>'
//    headerClass: ''
//    rowClass: ''
//    isHTML: false,
//        headerInvisible : true,
//            isarray : false,
//                desktopClass : ''� // add a class only to the desktop view,
//    mobileClass: ''

tables.CreateTable("#header-properties", {
    headers: [
        { col : 3, name : 'Name' }, 
        { col : 3, name : 'Type' }, 
        { col: 4, name: 'Description' }, 
        { col: 2, name: 'Required', rowClass : 'text-center' }, 

    ],
    rows: [
        { name: 'name', type: 'String', description: 'The header title that will be displayed', required : 'X' },
        //{ name: 'maxheight', type: 'int', description: 'For Mobile view ' },
        { name: 'class', type: 'String', description: 'a class that is added to every cell in the table' },
        { name: 'title', type: 'String', description: 'the title attribute when ever you need the cell to have hover ups' },
        { name: 'col', type: 'String', description: 'The header title that will be displayed', required: 'X' },
        { name: 'headerClass', type: 'String', description: 'a class that is only added to header cells' },
        { name: 'rowClass', type: 'String', description: 'a class that is only added to the cells of the columns element which it belongs' },
        { name: 'isHTML', type: 'String', description: 'if the content you want to display in HTML' },
        { name: 'isArray', type: 'String', description: 'If the item is an array it can be build as array per cell' },
        { name: 'desktopClass', type: 'String', description: 'A class to the cells for the column that only is applied on desktop view' },
        { name: 'mobileClass', type: 'String', description: 'A class to the cells for the column that only is applied on mobile view' },
        { name: 'template', type: 'String', description: 'Add a custom template to build the cell at your liking' },
    ]
});

// global settings 

tables.CreateTable("#global-properties", {
    headers: [
        { col: 3, name: 'Name' },
        { col: 3, name: 'Type' },
        { col: 4, name: 'Description' },
        { col: 2, name: 'Required', rowClass: 'text-center' },

    ],
    rows: [
        { name: 'rows', type: 'Array', description: 'This field is required and must contain the objects for the cell values to be displayed', required: 'X' },
        { name: 'bordered', type: 'Boolean', description: 'Will the table cells have a borders' },
        { name: 'NthOpt', type: 'Array', description: 'If you have a fixed table or want to apply certain class by row number' },
        { name: 'MobileRenderMode', type: 'String', description: 'The mobile render view type available : Normal, PairRender, OneHeader | Default is Normal ', },
        { name: 'OnEvenClass', type: 'String', description: 'Add a custom class on even row' },
        { name: 'OnUnEvenClass', type: 'String', description: 'Add a custom class on uneven row' },
        { name: 'NoNthOptInMobile', type: 'String', description: 'Prevent that the classes added on the NthOpt option to be applied on the mobile view' },
        { name: 'MobileMaxHeight', type: 'String', description: 'Set the mobile view table container default 300px of height' },

    ]
});

// example 1 
tables.CreateTable('#table-1', {
    headers: [
        { col: 4, name: "ID" },
        { col: 4, name: "Name" },
        { col: 4, name: "Age" }
    ],
    rows: [
        { id: 1, name: 'Test 1', age: 20 },
        { id: 2, name: 'Test 2', age: 22 },
        { id: 3, name: 'Test 3', age: 25 }
    ]
});

// example class 

tables.CreateTable('#table-2', {
    headers: [
        { col: 4, name: "ID", class: 'custom-class' },
        { col: 4, name: "Name" },
        { col: 4, name: "Age", class: 'custom-class' }
    ],
    rows: [
        { id: 1, name: 'Test 1', age: 20 },
        { id: 2, name: 'Test 2', age: 22 },
        { id: 3, name: 'Test 3', age: 25 }
    ]
});

// example title

tables.CreateTable('#table-3', {
    headers: [
        { col: 4, name: "ID", title: 'This is ID field' },
        { col: 4, name: "Name", title: 'This is the Name field' },
        { col: 4, name: "Age", title: "Current Age :  {{GetItemByName this 'age'}}"}
    ],
    rows: [
        { id: 1, name: 'Test 1', age: 20 },
        { id: 2, name: 'Test 2', age: 22 },
        { id: 3, name: 'Test 3', age: 25 }
    ]
});


// example isarray

tables.CreateTable('#table-4', {
    headers: [
        { col: 4, name: "ID" },
        { col: 4, name: "Groups" },
        { col: 4, name: "Names", isArray: true, rowClass: 'p-0' }
    ],
    rows: [
        { id: 1, name: 'Test 1', names: [{ row: ['John', 'John', 'John'], alignment : 'left' }, { row: ['John', 'John', 'John'] }, { row: ['John', 'John', 'John'] }] },
        { id: 2, name: 'Test 2', names: [{ row: ['John', 'John', 'John'], class: 'col text-danger' }, { row: ['John', 'John', 'John'] }] },
        { id: 3, name: 'Test 3', names: [{ row: ['John', 'John', 'John'], class: 'col border-0' }] }
    ]
});


// NthOpt

tables.CreateTable('#table-5', {
    headers: [
        { col: 4, name: "ID" },
        { col: 8, name: "Groups" },
    ],
    rows: [
        { id: 1, name: 'Test 1', },
        { id: 2, name: 'Test 2', },
        { id: 3, name: 'Test 3', },
        { id: 3, name: 'Test 4', },
        { id: 3, name: 'Test 5', },
        { id: 3, name: 'Test 6', },
    ],
    NthOpt:  {1 : 'text-primary', 3 : 'text-danger', 4 : 'bg-success' }
});