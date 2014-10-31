'use strict';

  // <title>{{ pkg.name }} - {{ pkg.description }}</title>
angular.module('{{ module }}.docs', [])

  .constant('version', 'v2.1.2')

  .config(function($plunkrProvider, version) {

    console.warn('in');
    // angular.extend($plunkrProvider.defaults, {
    //   plunkrTitle: 'AngularStrap Example Plunkr',
    //   plunkrTags: ['angular', 'angular-strap'],
    //   plunkrPrivate: false,
    //   contentHtmlUrlPrefix: 'https://rawgit.com/mgcrea/angular-strap/' + version + '/src/',
    //   contentJsUrlPrefix: 'https://rawgit.com/mgcrea/angular-strap/' + version + '/src/'
    // });

  });
