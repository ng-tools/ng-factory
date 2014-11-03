'use strict';

  // <title>{{ pkg.name }} - {{ pkg.description }}</title>
angular.module('{{ module }}.docs', ['{{ module }}', 'ngFactory', 'ngFactoryDocs', 'mgcrea.ngStrap.tab'])

  .constant('version', 'v2.1.2')

  .config(function(version) {

    console.warn('in');
    // angular.extend($plunkrProvider.defaults, {
    //   plunkrTitle: 'AngularStrap Example Plunkr',
    //   plunkrTags: ['angular', 'angular-strap'],
    //   plunkrPrivate: false,
    //   contentHtmlUrlPrefix: 'https://rawgit.com/mgcrea/angular-strap/' + version + '/src/',
    //   contentJsUrlPrefix: 'https://rawgit.com/mgcrea/angular-strap/' + version + '/src/'
    // });

  });
