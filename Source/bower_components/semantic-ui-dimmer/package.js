
Package.describe({
  name    : 'semantic:ui-dimmer',
  summary : 'Semantic UI - Dimmer: Single component release',
  version : '2.2.2',
  git     : 'git://github.com/Semantic-Org/UI-Dimmer.git',
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles([
    'dimmer.css',
    'dimmer.js'
  ], 'client');
});
