queue()
    .defer(d3.csv, "data/Car_sales.csv")
    .await(makeGraphs);
    
function makeGraphs(error, popData) {
    var ndx = crossfilter(popData);
    console.log(ndx);
    
    
    show_discipline_selector(ndx);
    bar(ndx);
    pie(ndx);
    
    dc.renderAll();
}


function show_discipline_selector(ndx) {
    let dim = ndx.dimension(dc.pluck('Manufacturer'));
    let group = dim.group();
    
    dc.selectMenu("#selector")
        .dimension(dim)
        .group(group);
}

function bar(ndx) {
    let dim = ndx.dimension(dc.pluck('Manufacturer'));
    let group = dim.group();


    dc.rowChart('#bar')
        .data(function (d) {
            return d.top(6)
        })
        .dimension(dim)
        .group(group)
        .height(600)    
}

function pie(ndx) {
    let dim = ndx.dimension(dc.pluck('Manufacturer'));
    let group = dim.group();


    dc.pieChart('#pie')
        .data(function (d) {
            return d.top(6)
        })
        .radius(120)
        .dimension(dim)
        .group(group)
        .height(300)  
}


