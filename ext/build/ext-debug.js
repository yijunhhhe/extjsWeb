
var Ext = Ext || {};
(function(manifest){
    if(!Ext.manifest) {
        Ext.manifest = manifest;
    } else {
        for(var name in manifest) {
            Ext.manifest[name] = manifest[name];
        }
    }
})