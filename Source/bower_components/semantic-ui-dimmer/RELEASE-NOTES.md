### Version 2.2.2 - July 07, 2016

- **Dimmer/Modal** - Fixed a bug which could cause a modal's dimmer to not obey `inverted: true` or `blurring: true` when initializing modals with *then afterwards* without either setting.

### Version 2.2.0 - June 26, 2016

- **Modal** - RGB values set for dimmer `background-color` were not being correctly interpreted [#3665](https://github.com/Semantic-Org/Semantic-UI/issues/3665) **Thanks @larsbo**
- **Modal/Dimmer** - Fixed issue with `destroy` not properly removing events from dimmer [#3200](https://github.com/Semantic-Org/Semantic-UI/issues/3200)

### Version 2.1.5 - Nov 1, 2015

- **Dimmer** - Dimmer can now works correctly with `opacity: 0` [#3167](https://github.com/Semantic-Org/Semantic-UI/issues/3167) **Thanks @mdehoog**

### Version 2.0.1 - July 6, 2015

- **Dimmer** - Dimmer now removes variations like `blurring` and `inverted` when `destroy` is called.

### Version 2.0.0 - June 30, 2015

- **Dimmer** - Dimmers now have a `blurring` variation which apply a glass-like effect when dimmed
- **Modal** - Added new settings `blurring` and `inverted` which automatically set a modal's dimmer to either inverted or blurring.
- **Image** - `rounded image` and `circular image` now apply border radius to all child elements, fixing dimmers, and other content rounding

### Version 1.11.5 - March 23, 2015

- **Card** - Fixes dimmer background shorthand property causes transparent dimmer in minified version
- **Dimmer** - Fixed `variation` setting not working correctly

### Version 1.11.2 - March 6, 2015

- **Card/Dimmer** - Fix dimmer z-index being too high when inside a `ui card`. Added variable for specifying default dimmer color inside card.

### Version 1.11.0 - March 3, 2015

- **Modal** - Modal no longer hides and reshows dimmer when opening a modal with another modal open with `exclusive: true`
- **Dimmer** - Add `opacity` setting to override css value. Add to docs several undocumented settings, like `useCSS`, and `variation`.

### Version 1.8.0 - January 23, 2015

- **Popup** - Popups will now by default appear over all UI content, even dimmers.

### Version 1.4.0 - December 22, 2014

- **Modal** - Modal now accepts custom dimmer settings with setting `dimmerSettings``

### Version 1.3.2 - December 17, 2014

- **Modal** - Fixed issue with modal dimmer appearing cut off in some browsers, and not hiding

### Version 1.3.0 - December 17, 2014

- **Modal/Dimmer** - Fixed issues with modal hiding during showing and showing during hiding, fixed issues with "hiding other" modals while a modal is mid-animation.

### Version 1.2.0 - December 08, 2014

- **Modal** - Fixes issues with multiple modals sometimes not closing dimmers
- **Modal** - "Hammer" clicking multiple times on a hiding dimmer no longer causes animation issues
- **Sidebar** - Fixes issue with multiple sidebars sometimes causing dimmer to close prematurely
- **Sidebar** - Dimmer can now be clicked even before sidebar has finished showing to immediately close sidebar

### Version 1.0.0 - November 24, 2014

- **Dimmer** - Dimmer will now automatically determine whether click-to-close is enabled by ``settings.on``
- **Dimmer** - Multiple dimmers can now be used on the same context with ``dimmerName``
- **Dimmer** - Dimmer variations can be specified when creating a dimmer from javascript using ``variation`` setting.

### Version 0.13.0 - Feb 20, 2014

- **Dimmer** - Dimmers are less buggy when used with ``on: 'hover``

### Version 0.10.3 - Dec 22, 2013

- **Modal** - Fixes element detaching sometimes in case where it is already inside a dimmer

### Version 0.7.0 - Oct 22, 2013

- **Dimmer** - Adds more dimmer examples, fixes settings
- **Dimmer** - Dimmer now obeys border radius of parent
- **Modal** - Optimizes dimmer init on modal to occur on modal init and not modal show

### Version 0.6.1 - Oct 15, 2013

- Fixes tests not passing for modal/dimmer

### Version 0.5.0 - Oct 10, 2013

- Fixes modal hide/show dependency issue where dimmer would not always hide modal and vice-versa

### Version 0.3.7 - Oct 8, 2013

- Dimmer can now take different durations for its show and hide

### Version 0.3.3 - Oct 2, 2013

- Fixes modal not working due to destroy teardown in dimmer Issue #153

### Version 0.2.1 - Sep 28, 2013

- Preserve 3D animations are now on by default for dimmers
- Refactored modal and dimmer components
- Fixes issues with dimmer settings sticking between separate modals with the same dimmer.

### Version 0.1.0 - Sep 25, 2013