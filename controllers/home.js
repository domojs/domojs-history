module.exports={
    get:function(id){
        console.log('in get');
        var self=this;
        $('fs').exists('./modules/history/views/home/'+id+'.html', function(exists)
        {
            if(exists)
                self.view(id+'.html');
            else
                self.view('values');
        })
    }
};