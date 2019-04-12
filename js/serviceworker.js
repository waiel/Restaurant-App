//set a cach  name
let cachBucket = 'resturantCach';

// cach urls
let cachItems = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/css/styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
];

//To install event listener
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cachBucket).then(function (cache) {
            return cache.addAll(cachItems);
        })
    );
});

//on change remove old chace 
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cachBucket.startsWith('cache-') &&
                        cacheName != cachBucket;
                })
                .map(function (cachBucket) {
                    return caches.delete(cachBucket);
                })
            );
        })
    );
});

//the 
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});