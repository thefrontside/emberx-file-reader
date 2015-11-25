# Emberx-file-reader
The project is still a work in progress and is not intended for public use yet. It will be available on npm and ready for debut in early 2016.

An Ember CLI Addon designed to ease your image upload preview woes. 
The x-file-reader component takes a file object as an argument and yields an object containing a url representation of the file (`reader.result`). We've also included a helpful style property that correctly formats the url for use as a background-image with an inline style attribute (`reader.style`).

``` handlebars
{{#x-file-reader file=file as |reader|}}
  <div class="photo-preview" style={{reader.style}}></div>
{{/x-file-reader}}
```

For an all-handlebars-based image uploader, pair this addon with emberx-image-uploader (coming soon and built with emberx-file-input) and emberx-xml-http-request.

``` handlebars
{{#x-image-uploader as |file|}}
  {{x-xml-http-request method="PUT" url=http://fileupload.com data=file as |xhr|}}
    name: {{file.name}}<br/>
    bytes uploaded: {{xhr.upload.loaded}} <br/>
    bytes total: {{xhr.upload.total}} <br/>
    percentage complete: {{xhr.upload.percentage}}
  {{/x-xml-http-request}}
  {{#x-file-reader file=file as |reader|}}
    {{#if reader.style}}
      <div alt="pending-avatar" class="organization-thumbnail" style={{reader.style}}></div>
    {{else}}
      <div  alt="default-avatar" class="organization-thumbnail"></div>
      <div class="file-name">CLICK TO SELECT A FILE</div>
    {{/if}}
  {{/x-file-reader}}
{{/x-image-uploader}}
```



## Installation
`ember install emberx-file-reader`

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
