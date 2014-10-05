# ng-factory

## File slitting

For the sake of clarity and coherence

- Main ng-factoty tasks are in the **tasks folder**
- Template files are in the **templates folder**
- Utility transforms are in the **transforms folder**

## Tasks


Task name example : `ng-factory:src/jshint`.
- `ng-factory` is the namespace
- `src/jshint` the targeted task

### ng-factory:src

#### ng-factory:src/jshint

Jshint the sources


### ng-factory:test

#### ng-factory:test/jshint

Jshint the tests



## Transforms

Bypass gulp plugins directly using the official node lib to to the work.

### clean-css

### concat-scripts

### debug

### jade

### js-beautify

### less

### ng-annotate

### template

### uglify-js


## Pages customization

The pages are highly customizable. The pages templating is provided by (Nunjucks)[mozilla.github.io/nunjucks/].

We integrate a default page with the factory but you can change everything if you please.

The basic pages generation workflow is **copy every thing to the `.tmp/docs` folder and generate what you need to output in the `pages` folder**.

### Default template

`ng-factory/templates/pages/index.nunjucks.html` is the default template file.

> [...] More documentation here [...]


### Views Blocks

By extending the `{% extends "views/base.nunjucks.html" %}` default template you can customize different blocks.
**Note: you can use `{{ super() }}` to render parent blocks**

- **ng-factory/templates/pages/views/base.nunjucks.html**
  - **head** for the `<head>` content
  - **body** for the `<body>` content
  - **foot** fot the "`<foot>`" content (what comes after the content into the body)
  
### Includes Blocks 

- **ng-factory/templates/pages/views/includes/head.nunjucks.html**
  - **headLinks** for the css scripts at the end of the `<head>` tag

- **ng-factory/templates/pages/views/includes/foot.nunjucks.html**
  - **footScripts** for the js scripts at the end of the `<body>` tag
  
> [...] More documentation here [...]
