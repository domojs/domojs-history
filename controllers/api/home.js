module.exports={
    post:function(db, id, body, callback){
        var measureId=id+':'+new Date().getTime();
        db.select(2, function(){
            db.multi()
                .sadd(id, measureId)
                .sadd('measures', id)
                .hmset(measureId, $.extend({on:new Date().getTime()}, body))
                .exec(function(err){
                    if(err)
                        console.log(err);
                    db.quit();
                    if(callback)
                        callback(err);
                });
        });
    },
    get:function(db, unit, id, routeValues, callback){
        if(id)
        {
            var property=id=='meteo.temperature' && 'celsius' || 'value';
            db.select(2, function(){
                db.osort(id, ['on', property], function(err, values){
                    console.log(values && values.length);
                    if(err)
                    {
                        callback(500, err);
                        return;
                    }
                    var result={unit:unit, values:[],dataLimitFrom:null,dataLimitTo:null};
                    var min=Number.MAX_VALUE;
                    var max=0;
                    $.each(values, function(index, value){
                        min=Math.min(value.on, min);
                        max=Math.max(value.on, max);
                        result.values.push([value.on, value[property]]);
                    });
                    result.dataLimitFrom=min;
                    result.dataLimitTo=max;
                    
                    callback(result);
                });
            }); 
        }
        else
        {
            db.select(2, function(){
                db.osort('measures', ['id'], function(err, values){
                    console.log(values && values.length);
                    if(err)
                        callback(500, err);
                    else
                        callback(values);
                });
            });
        }
    }
};
