var historize=require('./controllers/api/home.js').post;

$.on('device.new', function(device){
    if(device.statusMethod=='push')
    {
        device.on('status', function(status){
            if(!$.isPlainObject(status))
                status={value:status};
            historize($.db.another(), device.name, status);
        });
    }
    else if(!isNaN(device.statusMethod))
    {
        setInterval(function(){
            device.status(function(status){
                if(!$.isPlainObject(status))
                    status={value:status};
                historize($.db.another(), device.name, status);
            });
        }, device.statusMethod);
    }
});

exports.init=function()
{
    $.post('/lc/v1', function(req,res){
        res.send({"status":2,"bannerImage":"","bannerTarget":"","consoleMessages":[],"protocol":1});
    })
}