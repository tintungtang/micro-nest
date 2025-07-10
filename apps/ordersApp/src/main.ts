if (window.location === window.parent.location) {
    import('./bootstrap').then(({ bootstrap }) => bootstrap());
  }