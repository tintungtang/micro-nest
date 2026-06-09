import('./app/remote-config')
    .then(({ configureRemotes }) => configureRemotes())
    .then(() => import('./bootstrap'))
    .catch((err) => console.error(err));
