{% block title -%}
# {{ pkg.name }}
{%- endblock %}
{% for badge in badges -%}
[![{{ badge.title }}]({{ badge.image }})]({{ badge.url }}) {% endfor %}
{% block logo -%}
{%- endblock %}

{% block header -%}
> {{ pkg.description }}
{% block description -%}
{%- endblock %}
{%- endblock %}

## Install

``` sh
$ bower install {{ pkg.name }} --save
```

## Examples
{% block examples -%}
{% for module in modules -%}
{% for example in examples[module] %}
- **{{ module }}** - [{{ example.basename }}]({{ src.cwd }}/{{ module }}/docs/examples/{{ example.basename }})

``` {{ example.extname }}
{% include example.filename %}
```
{%- endfor %}
{%- endfor %}
{%- endblock %}

## Usage

{% block usage -%}
Param | Type | Details
----- | ---- | -------
{% for ngdoc in ngdocs -%}
{% for prop in ngdoc.properties -%}
{{ prop.name.name }} _(optional)_ |  `{{ prop.type.typeExpression }}` | {{ prop.description }}
{% endfor %}
{%- endfor %}
{%- endblock %}

## Dependencies

Package | Version
------- | -------
{% for dependency, version in dependencies -%}
{{ dependency }} | **{{ version }}**
{%- endfor %}

## Browser Support

[![Browser Support](https://ci.testling.com/{{ url }}.png)](http://ci.testling.com/{{ url }})

## Contributing
{% block contributing -%}
Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!
{%- endblock %}

## License

{{ license }}
