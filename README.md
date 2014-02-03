# angular-flipsnap

A [flipsnap.js](http://pxgrid.github.io/js-flipsnap/) directive for [AngularJS](http://angularjs.org/).

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
<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="bower_components/flipsnap/flipsnap.min.js"></script>
<script type="text/javascript" src="bower_components/angular-flipsnap/angular-flipsnap.min.js"></script>
```

Declare the `flipsnap` module as a dependency of your app.

```javascript
angular.module('MyApp', ['flipsnap']);
```

Now you can use the `flipsnap` directive in your templates. You **must** specify a unique `flipsnap-id`, which will be as an `id` attribute on the scrolling element.

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

### Demo

You can view a demo [here](http://ninjatronic.com/flipsnap/demo/).

### API

#### Flipsnap Directive

| Attribute | Description | Type |
| --------- | ----------- | ---- |
| `flipsnap` | Declares that this element is a flipsnap container. The value of this attribute will be the name of the flipsnap object on the containing scope. | `String` |
| `flipsnap-id` | The unique ID of the flipsnap scrolling pane. | `String` |
| `flipsnap-options` | An [AngularJS Expression](http://docs.angularjs.org/guide/expression) which evaluates to a map of options. See the options API. | [`Expression`](http://docs.angularjs.org/guide/expression) |

#### Flipsnap Options Map

| Key | Description | Type |
| --- | ----------- | ---- |
| `distance` | The distance to move on each scroll. If not specified this value is automatically calculated. | `Number` |
| `maxPoint` | The number of stop points. If not specified this value is automatically calculated. | `Number` |
| `transitionDuration` | The duration of each scroll transition, in milliseconds. If not specified this defaults to 350. | `Number` |
| `disableTouch` | If set to true the flipsnap will not respond to touch. If not specified this defaults to `false`. | `Boolean` |
| `disable3d` | If set to true the flipsnap will not use 3D transform. If not specified this defaults to `false`. | `Boolean` |

#### Flipsnap Object

The flipsnap object is given to the containing scope as a named property (see the Directive API).

##### Properties

**`canMoveNext` (`Boolean`) (readonly)** True if the flipsnap can move to the next point.
**`canMovePrev` (`Boolean`) (readonly)** True if the flipsnap can move to the previous point.
**`currentPoint` (`Number`) (readonly)** The current point.

##### Methods

###### `toNext`

Scrolls the flipsnap to the next point, if available.

*Arguments*

**`transitionDuration` (`Number`) (optional):** Specifies the duration of the transition. If not specified this defaults to the value given in the directive options.

###### `toPrev`

Scrolls the flipsnap to the previous point, if available.

*Arguments*

**`transitionDuration` (`Number`) (optional):** Specifies the duration of the transition. If not specified this defaults to the value given in the directive options.

###### `moveToPoint`

Scrolls the flipsnap to the specified point, if available.

*Arguments*

**`point` (`Number`) (required):** Specifies the point to move to.

**`transitionDuration` (`Number`) (optional):** Specifies the duration of the transition. If not specified this defaults to the value given in the directive options.

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
