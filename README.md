# angular-flipsnap

A [flipsnap.js](http://pxgrid.github.io/js-flipsnap/) directive for AngularJS.

## Usage

### Dependencies

* [AngularJS 1.2.x](http://angularjs.org/)
* [Flipsnap 1.6.x](http://pxgrid.github.io/js-flipsnap/)

### Getting Started

Install the library (and dependencies) using bower, then include them in the HTML.

```
bower install angular-flipsnap --save
```

```html
<script type="text/javascript" src="bower_components/angular/angular.min.js></script>
<script type="text/javascript" src="bower_components/flipsnap/flipsnap.min.js></script>
<script type="text/javascript" src="bower_components/angular-flipsnap/angular-flipsnap.min.js></script>
```

Declare the `flipsnap` module as a dependency of your app.

```javascript
angular.module('MyApp', ['flipsnap']);
```

Now you can use the `flipsnap` directive in your templates. You **must** specify a unique `flipsnap-id`, which will be
as an `id` attribute on the scrolling element.

```html
<div flipsnap flipsnap-id="flipsnap" style="width:320px;margin:0 auto;">
    <div flipsnap-pane style="width: 320px;">
        <h1>1</h1>
    </div>
    <div flipsnap-pane style="width: 320px;">
        <h1>2</h1>
    </div>
    <div flipsnap-pane style="width: 320px;">
        <h1>3</h1>
    </div>
</div>
```

## Development

Contributions are welcome as issues or pull requests.

### Prerequisites

* [NodeJS](https://github.com/joyent/node)
* [Bower](https://github.com/bower/bower)

### Getting Started

```
npm install
grunt setup // performs the bower install - only necessary for using the demo html file
grunt test // lints the file
grunt build // builds the minified file
```