async function initBombora(resolve) {
    await initStandard();
    initRtvi(resolve);
}

async function initStandard() {
    var varName = '_ccmdt_last_refresh';
    try {
        var lastRefresh = localStorage.getItem(varName) || false;
        var loaded = true;
        /* force api call periodically to enforce changes on Bombora's end*/
        var cacheExpire = 60 * 60 * 24 * 1000 * 1; /* 1 day*/
        var currentTime = (new Date()).getTime();
        if (!lastRefresh || ((currentTime - +lastRefresh) >= cacheExpire)) {
            loaded = false;
        }
        /* no data or expired data - execute Bombora script to make api call, set local storage */
        if (!loaded) {
            (function (w,d,t) {
                _ml = w._ml || {};
                _ml.eid = '54221';
                var s, cd, tag; s = d.getElementsByTagName(t)[0]; cd = new Date();
                tag = d.createElement(t); tag.async = 1;
                tag.src = 'https://ml314.com/tag.aspx?' + cd.getDate() + cd.getMonth();
                s.parentNode.insertBefore(tag, s);
            })(window,document,'script');
            localStorage.setItem(varName, (new Date()).getTime().toString());
        }
    } catch (e) {
        /* no op */
    }
}

function initRtvi(resolve) {
    var varName = '_bmbCompanyDetails';
    var loadBomboraTag = function() {!function(e,t,c,n,o,a,m){e._bmb||(o=e._bmb=function(){o.x?o.x.apply(o,arguments):o.q.push(arguments)},o.q=[],a=t.createElement(c),a.async=true,a.src="https://vi.ml314.com/get?eid=54221&tk=G21tbtDX8CcaaoXhHUYaFiSjJx5sKqXdEOk3QyW2bHLc3d&fp="+(e.localStorage&&e.localStorage.getItem(n)||""),m=t.getElementsByTagName(c)[0],m.parentNode.insertBefore(a,m))}(window,document,"script","_ccmaid");};
    var createBomboraMock = function() {
        return function(str, callback) {
            var data = JSON.parse(localStorage.getItem(varName));
            callback((data && data.details && Object.keys(data.details).length > 0) ? data.details : null);
        };
    };
    try{
        var data = JSON.parse(localStorage.getItem(varName)) || false;
        /* force api call periodically to enforce changes on Bmb end */
        var cacheExpire = 60 * 60 * 24 * 1000; /* 1 day */
        var currentTime = (new Date()).getTime();
        if (data) {
            if (data._sap && data._sap._lastAPIRefresh) {
                if ((currentTime - +data._sap._lastAPIRefresh) >= cacheExpire) {
                    data = false;
                }
            } else {
                data = false;
            }
        }
        if (!data) {
            loadBomboraTag();
            _bmb('vi', function(respObj) {
                var data = {
                    details: respObj ? respObj : {},
                    _sap: {
                        _lastAPIRefresh: (new Date()).getTime()
                    }
                };
                localStorage.setItem(varName, JSON.stringify(data));
                resolve();
            });
        } else {
            window._bmb = createBomboraMock();
            resolve();
        }
    }
    catch(e) {
        data = false;
    }
}


function loadBombora() {
	if (window.isConsentEnabled('omtrdc.net', 1) && window.isConsentEnabled('ml314.com', 1)) {
	// promise to inform that Bombora is ready
	window.SAP = window.SAP || {};
	window.SAP.vendors = window.SAP.vendors || {};
	window.SAP.vendors.bombora = {
	  ready: new Promise(function(resolve) {
		initBombora(resolve);
	  })
	};
	}
}

loadBombora();