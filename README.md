Templates
=========

A simple JavaScript template library. Requires jQuery to be added to page.

## Usage

To create a template, simply create a new script element on your page with an id of {0}-template, and fill it with HTML. Any value within {...} will be replaced with the corresponding property's value.

  <script type="text/html" id="demo-template">
    <p>Hello {name}.</p>
  </script>

The template can then be compiled by calling `var myTemplate = $.templates("demo");`. This returns a function that can then be called to produce a jQuery object containing the merged HTML.

  var myTemplate = $.templates("demo");
  myTemplate({name: "Joe Bloggs"});
  // <p>Hello Joe Bloggs</p>
