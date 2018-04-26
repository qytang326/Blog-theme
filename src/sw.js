/* ===========================================================
 * sw.js
 * ===========================================================
 * Copyright 2017 @Quanyin
 * Licensed under Apache 2.0
 * service worker scripting
 * ========================================================== */
/* CACHE_NAMESPACE */
/* CacheStorage is shared between all sites under same domain. */
/* A namespace can prevent potential name conflicts and mis-deletion. */
var CACHE_NAMESPACE = 'main-';
var CACHE = CACHE_NAMESPACE + 'precache-then-runtime';
var PRECACHE_LIST = ["./", "./js/jquery.nav.min.js", "./js/jquery.tagcloud.min.js", "./js/gitment.min.js", "./js/Quanyin-global.min.js", "./css/Quanyin-global.min.css", "./css/gitment.min.css", "./img/avatar.jpg", "./img/bg-home.jpg", "./img/bg-offline.jpg", "./img/bg-404.jpg", "./img/bg-about.jpg", "./img/bg-tags.jpg", "./img/bg-categories.jpg", "./img/post-bg-default.jpg", "//cdn.bootcss.com/jquery/3.3.1/jquery.min.js", "//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css", "//cdn.bootcss.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0", "//cdn.bootcss.com/fastclick/1.0.6/fastclick.min.js", "//cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css", "//cdn.bootcss.com/bootstrap/3.3.7/js/bootstrap.min.js", "//cdn.bootcss.com/mathjax/2.7.4/MathJax.js?config=TeX-AMS-MML_HTMLorMML"];
var HOSTNAME_WHITELIST = [self.location.hostname, "qytang326.github.io", "cdn.bootcss.com", "cdnjs.cloudflare.com", "maxcdn.bootstrapcdn.com"];
var DEPRECATED_CACHES = ['precache-v1', 'runtime', 'main-precache-v1', 'main-runtime'];

/* The Util Function to hack URLs of intercepted requests */
var getCacheBustingUrl = function getCacheBustingUrl(req) {
  var now = Date.now();
  url = new URL(req.url);

  /* 1. fixed http URL */
  /* Just keep syncing with location.protocol */
  /* fetch(httpURL) belongs to active mixed content. */
  /* And fetch(httpRequest) is not supported yet. */
  url.protocol = self.location.protocol;

  /* 2. add query for caching-busting. */
  /* Github Pages served with Cache-Control: max-age=600 */
  /* max-age on mutable content is error-prone, with SW life of bugs can even extend. */
  /* Until cache mode of Fetch API landed, we have to workaround cache-busting with query string. */
  /* Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190 */
  url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
  return url.href;
};

/* The Util Function to detect and polyfill req.mode="navigate" */
/* request.mode of 'navigate' is unfortunately not supported in Chrome */
/* versions older than 49, so we need to include a less precise fallback, */
/* which checks for a GET request with an Accept: text/html header. */
var isNavigationReq = function isNavigationReq(req) {
  return req.mode === 'navigate' || req.method === 'GET' && req.headers.get('accept').includes('text/html');
};

/* The Util Function to detect if a req is end with extension */
/* Accordin to Fetch API spec <https://fetch.spec.whatwg.org/#concept-request-destination> */
/* Any HTML's navigation has consistently mode="navigate" type="" and destination="document" */
/* including requesting an img (or any static resources) from URL Bar directly. */
/* So It ends up with that regExp is still the king of URL routing ;) */
/* P.S. An url.pathname has no '.' can not indicate it ends with extension (e.g. /api/version/1.2/) */
var endWithExtension = function endWithExtension(req) {
  return Boolean(new URL(req.url).pathname.match(/\.\w+$/));
};

/* Redirect in SW manually fixed github pages arbitray 404s on things?blah */
/* what we want: */
/*    repo?blah -> !(gh 404) -> sw 302 -> repo/?blah */
/*    .ext?blah -> !(sw 302 -> .ext/?blah -> gh 404) -> .ext?blah */
/* If It's a navigation req and it's url.pathname isn't end with '/' or '.ext' */
/* it should be a dir/repo request and need to be fixed (a.k.a be redirected) */
/* Tracking https://twitter.com/Huxpro/status/798816417097224193 */
var shouldRedirect = function shouldRedirect(req) {
  return isNavigationReq(req) && new URL(req.url).pathname.substr(-1) !== "/" && !endWithExtension(req);
};

/* The Util Function to get redirect URL */
/* `${url}/` would mis-add "/" in the end of query, so we use URL object. */
/* P.P.S. Always trust url.pathname instead of the whole url string. */
var getRedirectUrl = function getRedirectUrl(req) {
  url = new URL(req.url);
  url.pathname += "/";
  return url.href;
};

/**
 *  @Lifecycle Install
 *  Precache anything static to this version of your app.
 *  e.g. App Shell, 404, JS/CSS dependencies...
 *
 *  waitUntil() : installing ====> installed
 *  skipWaiting() : waiting(installed) ====> activating
 */
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (cache) {
    return cache.addAll(PRECACHE_LIST).then(self.skipWaiting()).catch(function (err) {
      return console.log(err);
    });
  }));
});

/**
 *  @Lifecycle Activate
 *  New one activated when old isnt being used.
 *
 *  waitUntil(): activating ====> activated
 */
self.addEventListener('activate', function (event) {
  /* delete old deprecated caches. */
  caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.filter(function (cacheName) {
      return DEPRECATED_CACHES.includes(cacheName);
    }).map(function (cacheName) {
      return caches.delete(cacheName);
    }));
  });
  console.log('service worker activated.');
  event.waitUntil(self.clients.claim());
});

var fetchHelper = {

  fetchThenCache: function fetchThenCache(request) {
    /* Requests with mode "no-cors" can result in Opaque Response, */
    /* Requests to Allow-Control-Cross-Origin: * can't include credentials. */
    var init = { mode: "cors", credentials: "omit" };

    var fetched = fetch(request, init);
    var fetchedCopy = fetched.then(function (resp) {
      return resp.clone();
    });

    /* NOTE: Opaque Responses have no hedaders so [[ok]] make no sense to them */
    /*       so Opaque Resp will not be cached in this case. */
    Promise.all([fetchedCopy, caches.open(CACHE)]).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          response = _ref2[0],
          cache = _ref2[1];

      return response.ok && cache.put(request, response);
    }).catch(function (_) {/* eat any errors */});

    return fetched;
  },

  cacheFirst: function cacheFirst(url) {
    var _this = this;

    return caches.match(url).then(function (resp) {
      return resp || _this.fetchThenCache(url);
    }).catch(function (_) {/* eat any errors */});
  }
};

/**
 *  @Functional Fetch
 *  All network requests are being intercepted here.
 *
 *  void respondWith(Promise<Response> r);
 */
self.addEventListener('fetch', function (event) {
  /* logs for debugging */
  /*console.log(`fetch ${event.request.url}`) */
  /*console.log(` - type: ${event.request.type}; destination: ${event.request.destination}`) */
  /*console.log(` - mode: ${event.request.mode}, accept: ${event.request.headers.get('accept')}`) */

  /* Skip some of cross-origin requests, like those for Google Analytics. */
  if (HOSTNAME_WHITELIST.indexOf(new URL(event.request.url).hostname) > -1) {

    /* Redirect in SW manually fixed github pages 404s on repo?blah */
    if (shouldRedirect(event.request)) {
      event.respondWith(Response.redirect(getRedirectUrl(event.request)));
      return;
    }

    /* Cache-only Startgies for ys.static resources */
    if (event.request.url.indexOf('ys.static') > -1) {
      event.respondWith(fetchHelper.cacheFirst(event.request.url));
      return;
    }

    /* Stale-while-revalidate for possiblily dynamic content */
    /* similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale */
    /* Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1 */
    var cached = caches.match(event.request);
    var fetched = fetch(getCacheBustingUrl(event.request), { cache: "no-store" });
    var fetchedCopy = fetched.then(function (resp) {
      return resp.clone();
    });

    /* Call respondWith() with whatever we get first. */
    /* Promise.race() resolves with first one settled (even rejected) */
    /* If the fetch fails (e.g disconnected), wait for the cache. */
    /* If there’s nothing in cache, wait for the fetch. */
    /* If neither yields a response, return offline pages. */
    event.respondWith(Promise.race([fetched.catch(function (_) {
      return cached;
    }), cached]).then(function (resp) {
      return resp || fetched;
    }).catch(function (_) {
      return caches.match('offline.html');
    }));

    /* Update the cache with the version we fetched (only for ok status) */
    event.waitUntil(Promise.all([fetchedCopy, caches.open(CACHE)]).then(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          response = _ref4[0],
          cache = _ref4[1];

      return response.ok && cache.put(event.request, response);
    }).catch(function (_) {/* eat any errors */}));

    /* If one request is a HTML naviagtion, checking update! */
    if (isNavigationReq(event.request)) {
      /* you need "preserve logs" to see this log */
      /* cuz it happened before navigating */
      console.log('fetch ' + event.request.url);
      event.waitUntil(revalidateContent(cached, fetchedCopy));
    }
  }
});

/**
 * Broadcasting all clients with MessageChannel API
 */
function sendMessageToAllClients(msg) {
  self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      console.log(client);
      client.postMessage(msg);
    });
  });
}

/**
 * Broadcasting all clients async
 */
function sendMessageToClientsAsync(msg) {
  /* waiting for new client alive with "async" setTimeout hacking */
  /* https://twitter.com/Huxpro/status/799265578443751424 */
  /* https://jakearchibald.com/2016/service-worker-meeting-notes/#fetch-event-clients */
  setTimeout(function () {
    sendMessageToAllClients(msg);
  }, 1000);
}

/**
 * if content modified, we can notify clients to refresh
 * TODO: Gh-pages rebuild everything in each release. should find a workaround (e.g. ETag with cloudflare)
 *
 * @param  {Promise<response>} cachedResp  [description]
 * @param  {Promise<response>} fetchedResp [description]
 * @return {Promise}
 */
function revalidateContent(cachedResp, fetchedResp) {
  /* revalidate when both promise resolved */
  return Promise.all([cachedResp, fetchedResp]).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        cached = _ref6[0],
        fetched = _ref6[1];

    var cachedVer = cached.headers.get('last-modified');
    var fetchedVer = fetched.headers.get('last-modified');
    console.log('"' + cachedVer + '" vs. "' + fetchedVer + '"');
    if (cachedVer !== fetchedVer) {
      sendMessageToClientsAsync({
        'command': 'UPDATE_FOUND',
        'url': fetched.url
      });
    }
  }).catch(function (err) {
    return console.log(err);
  });
}