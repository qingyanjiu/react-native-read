'use strict';

const Realm = require('realm');

module.exports = {
  //用realm获取存在本地的sessionid
  getSessionId: function (callback) {
    //获取本地保存的sessionid
    var realm = new Realm({
      schema: [{name: 'Session', properties: {id: 'string'}}]
    });
    //获取本地保存的sessionid
    var sess = realm.objects('Session');

    var sessid;
    if(sess[0]){
      sessid = sess[0].id
    }
    callback(sessid);
  },
};