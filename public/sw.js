
//for push notification

// self.addEventListener('push', function (event) {
//   const data = event.data?.json() || {};

//   const title = data.title || 'Notification';
//   const options = {
//     body: data.body || 'You have a new message.',
//     icon: '/icon.png', // Optional: put an icon in public/icon.png
//     badge: '/icon.png', // Optional: small badge icon
//   };

//   event.waitUntil(
//     self.registration.showNotification(title, options)
//   );
// });
