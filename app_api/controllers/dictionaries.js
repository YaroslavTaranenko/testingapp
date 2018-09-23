// var mongoose = require('mongoose');
// var dic = mongoose.model('Dictionary');

var sendResp = function(res, status, content){
    res.status(status);
    res.json(content);
    res.end();
};


module.exports.dictionaryCreate = function(req, res){
    dic.create({
        word: req.body.word,
        translation: req.body.translation,
        lang: req.body.lang
        
    }, function(err, entry){
        if(err){
            sendResp(res, 500, err);
        }else{
            sendResp(res, 200, entry);
        }
    });
};
module.exports.dictionaryList = function(req, res){
    sendResp(res, 200, {message: 'all is ok'});
    // dic.find().sort({'lastView': -1}).exec(function(err, result){
    //     if(err){
    //         sendResp(res, 500, err);
    //         return;
    //     }else{
    //         if(!result){
    //             sendResp(res, 404, "Dictionaries not found");
    //             return;
    //         }else{
    //             sendResp(res, 200, result);
    //         }
    //     }
    // });
};
module.exports.dictionaryReadOne = function(req, res){
    if(req.params && req.params.dictionaryId){
        dic.findById(req.params.dictionaryId).exec(function(err, entry){
            //console.log(location);
            if(!entry){
                console.log("No dictionary entry (404)");
                sendResp(res, 404, {"message": "Dictionary entry not found"});
                return;
            }else if(err){
                console.log("Dictionary error (400)");
                sendResp(res, 400, err);
                return
            }else{
                console.log("Dictionary is ok (200)");
                sendResp(res, 200, entry);
            }
            
        });
    }else{
        sendResp(res, 404, {"message": "dictionaryId not defined"});
    };


};
module.exports.dictionaryUpdateOne = function(req, res){
    if(!req.params.dictionaryId){
        sendResp(res, 404, {"message": 'Not found, dictionaryId is required.'});
        return;
    }
    dic.findById(req.params.dictionaryId).exec(function(err, result){
        if(!result){
            sendResp(res, 404, "Dictionary entry not found.");
            return;
        }else if(err){
            sendResp(res, 400, err);
            return;
        }
        result.word = req.body.word;
        result.translation = req.body.translation;
        result.lang = req.body.lang;
        
        result.save(function(err, entry){
            if(err){
                sendResp(res, 400, err);
            }else{
                sendResp(res, 200, entry);
            }
        });
    });
};
module.exports.dictionaryDeleteOne = function(req, res){
    var dictionaryId = req.params.dictionaryId;
    if(dictionaryId){
        loc.findByIdAndRemove(dictionaryId).exec(function(err, entry){
            if(err){
                sendResp(res, 400, err);
            }else{
                sendResp(res, 204, null);
            }
        });
    }else{
        sendResp(res, 404, {"message": "No entry id"});
    }
};
