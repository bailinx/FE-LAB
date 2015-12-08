// require.config({
//     paths:{
//         jquery: 'jquery-1.7.2',
//         airpoint: 'jquery.airpointselector'
//     }
// });
// require(['jquery'], function($) {
//     alert($().jquery);
// });
require.config({
    shim: {
        'jquery.airpointselector': {
            deps: ['jquery'],
            exports: 'airpoint'
        }
    },
    paths:{
        jquery: 'jquery-1.7.2',
        airpoint: 'jquery.airpointselector'
    }

});
require(['jquery','airpoint'], function($) {
    //alert($().jquery);
    $("#tt").airPointselector({
        data: [{
            airpoint: "Beijing(PEK),北京"
        }, {
            airpoint: "ChengDu(CTU),成都"
        }, {
            airpoint: "ChongQing(CKG),重庆"
        }, {
            airpoint: "Fuzhou(FOC),福州"
        }, {
            airpoint: "Guilin(KWL),桂林"
        }]
    });
});