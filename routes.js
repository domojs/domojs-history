route.on('history', function(url, params, unchanged){
    $.ajax(loadHtml('history'));
});
 route.on('history/*', function(url, params, unchanged){
    $.ajax(loadHtml('history/'+params.wildcard, function(){
        new TimeChart({
        container:$('#timeChart')[0],
        assetsUrlBase:'assets/history/css/',
        data:{
            units:['s'],
            url:'/api/history/'+params.wildcard
        },
        valueAxisDefault:{ title:"Value" },
                series:[
                    {
                        name:"Measured tempareture",
                        id:"series1",
                        type:"line",
                        data:{
                            index: 1,
                            aggregation:"avg",
                        },
                        style:{
                            lineColor: "orange",
                            lineWidth: 2,
                            marker:{
                                shape:"circle"
                            }
                        }
                    }
                ]
        });
    }));
});
 