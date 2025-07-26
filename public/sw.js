// Service Worker for Legal Property Advisor PWA
const CACHE_NAME = 'legal-advisor-v1.0.0'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/offline.html'
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...')
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log('Service Worker installed')
        return self.skipWaiting()
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...')
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('Service Worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Handle static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request))
    return
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(handleNavigation(request))
    return
  }

  // Default: try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE)
            .then((cache) => {
              cache.put(request, responseClone)
            })
        }
        return response
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request)
      })
  )
})

// Handle API requests
async function handleApiRequest(request) {
  try {
    // Try network first for API requests
    const response = await fetch(request)
    
    // Cache successful GET API responses
    if (response.status === 200 && request.method === 'GET') {
      const responseClone = response.clone()
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, responseClone)
    }
    
    return response
  } catch (error) {
    // For API requests, try to serve from cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // If no cached response, return offline response
    return new Response(
      JSON.stringify({ error: 'Network unavailable' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

// Handle static assets
async function handleStaticAsset(request) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }

  try {
    const response = await fetch(request)
    if (response.status === 200) {
      const responseClone = response.clone()
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, responseClone)
    }
    return response
  } catch (error) {
    // Return a default asset or offline page
    return caches.match('/offline.html')
  }
}

// Handle navigation requests
async function handleNavigation(request) {
  try {
    // Try network first
    const response = await fetch(request)
    
    // Cache successful navigation responses
    if (response.status === 200) {
      const responseClone = response.clone()
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, responseClone)
    }
    
    return response
  } catch (error) {
    // Return offline page for navigation requests
    const offlineResponse = await caches.match('/offline.html')
    if (offlineResponse) {
      return offlineResponse
    }
    
    // Fallback offline page
    return new Response(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Legal Property Advisor</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              text-align: center; 
              padding: 50px; 
              background: #f8fafc;
            }
            .container { 
              max-width: 400px; 
              margin: 0 auto; 
              background: white; 
              padding: 40px; 
              border-radius: 12px; 
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            h1 { color: #2563eb; }
            .btn { 
              background: #2563eb; 
              color: white; 
              padding: 12px 24px; 
              border: none; 
              border-radius: 6px; 
              cursor: pointer; 
              text-decoration: none; 
              display: inline-block; 
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>📱 You're Offline</h1>
            <p>Please check your internet connection and try again.</p>
            <button class="btn" onclick="window.location.reload()">Retry</button>
          </div>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      }
    )
  }
}

// Check if URL is a static asset
function isStaticAsset(pathname) {
  return pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

// Handle background sync
async function doBackgroundSync() {
  try {
    // Sync any pending actions when back online
    console.log('Performing background sync...')
    
    // You can implement specific sync logic here
    // For example, sync offline messages, uploads, etc.
    
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'You have a new notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-72x72.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Legal Property Advisor', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
}) 