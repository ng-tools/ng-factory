{% block title -%}
# {{ pkg.name }}
{% for badge in badges -%}
[![{{ badge.title }}]({{ badge.image }})]({{ badge.url }}) {% endfor %}
{%- endblock %}

{% block header -%}
> {{ pkg.description }}

{% block description -%}
{%- endblock %}
{%- endblock %}

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
{{ ngdocs }}
{%- endblock %}

## Dependencies

Package | Version
------- | -------
{% for dependency, version in dependencies -%}
{{ dependency }} | **{{ version }}**
{% endfor %}

## Status

## Contributing

Please submit all pull requests the against master branch. If your unit test contains JavaScript patches or features, you should include relevant unit tests. Thanks!

## License

{{ license }}
