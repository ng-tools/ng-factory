<%= logo %>

<%= header %>

## Dependencies

Package | Version
--- | ---<% for (key in dependencies) { %>
<%= key %> | **<%= dependencies[key] %>**
<% }; %>

## Status
<% badges.forEach(function(badge) { %>
![](<%= badge %>)
<% }); %>

## Examples
<% examples.forEach(function(example) { %>
<%= example %>
<% }); %>

## API
<%= ngdocs %>

## Contributing

Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!

## License
<%= license %>
