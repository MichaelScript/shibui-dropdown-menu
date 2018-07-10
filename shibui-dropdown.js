/**
`shibui-dropdown` is a simple and modern dropdown inspired by the dropdown on [Heroku](https://heroku.com).

Example:

    <shibui-dropdown>
      <a>Account Settings</a>
      <a>Notifications</a>
      <a>Sign out</a>
    </shibui-dropdown>

### Styling

The following custom properties and mixins are also available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--shibui-dropdown-color` | A property that controls the color of the dropdown items | `black`
`--shibui-dropdown-content` | A mixin that is applied to the dropdown | `{}`

<<<<<<< HEAD:shibui-dropdown.js
@demo demo/shibui-dropdown.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../@polymer/polymer/polymer-legacy.js';

import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="shibui-dropdown">
  <template strip-whitespace="">
=======
@demo demo/shibui-dropdown.html Demo
-->

<dom-module id="shibui-dropdown">
  <template strip-whitespace>
>>>>>>> 2ce55b71532b3e392f228a2b765526248532babd:shibui-dropdown.html
    <style>
      :host {
        background: var(--shibui-dropdown-background, white);
        z-index: var(--shibui-dropdown-zindex, 9999);

        display: inline-block;
        font-size: 14px;
        position: fixed;
        width: auto;
        border-radius: 3px;
        box-shadow: 0 3px 20px rgba(89, 105, 129, 0.3), 0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(89, 105, 129, .1);
        white-space: nowrap;
        overflow: hidden;

        opacity: 0;
        pointer-events: none;
        transition: ease 0.1s;
        transition-property: transform, opacity;
        transform: translateY(-10px);

        @apply --layout-vertical;
        @apply --layout-center-center;
        @apply --shibui-dropdown-content;
      }

      :host([opened]) {
        opacity: 1;
        transform: translateY(0);
        pointer-events: all;

        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }

      :host([alignment="left"]) {
        right: 0;
      }

      :host ::slotted(*) {
        color: var(--shibui-dropdown-color, black);

        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        text-decoration: none;
        cursor: pointer;
        border-bottom: 1px solid #EEF1F6;
      }

      :host ::slotted(*:hover) {
        background-color: #F7F8FB;
      }
    </style>
    <slot id="content"></slot>
  </template>

<<<<<<< HEAD:shibui-dropdown.js
  
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
  is: 'shibui-dropdown',

  properties: {
    /**
     * Determines whether the dropdown is opened or closed
     */
    opened: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true,
      observer: '_openedChanged'
    },

    /**
     * Whether to align the dropdown to the 'right' or 'left' of its relative parent
     */
    alignment: {
      type: String,
      value: 'right',
      reflectToAttribute: true
    }
  },

  attached: function() {
    this.toggle = this.toggle.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  },

  detached: function() {
    document.removeEventListener('click', this.close);
  },

  /**
   * Toggles the opened state of the dropdown
   */
  toggle: function() {
    this.set('opened', !this.opened);
  },

  /**
   * Opens the dropdown
   */
  open: function() {
    this.set('opened', true);
  },

  /**
   * Closes the dropdown
   */
  close: function() {
    this.set('opened', false);
  },

  _openedChanged: function(opened) {
    if (opened) {
      Polymer.RenderStatus.afterNextRender(this, function() {
        document.addEventListener('click', this.close);
      });
    } else {
      document.removeEventListener('click', this.close);
    }
  }
});
=======
  <script>
    Polymer({
      is: 'shibui-dropdown',

      properties: {
        /**
         * Determines whether the dropdown is opened or closed
         */
        opened: {
          type: Boolean,
          value: false,
          notify: true,
          reflectToAttribute: true,
          observer: '_openedChanged'
        },

        /**
         * Whether to align the dropdown to the 'right', 'center', or 'left' of its 'target'
         */
        alignment: {
          type: String,
          value: 'right',
          observer: 'resize'
        },

        /**
         * The target to attach the dropdown to.
         */
        target: Element,

        /**
         * The buffer from the edge of the page
         */
        buffer: {
          type: Number,
          value: 10,
          observer: '_bufferUpdated'
        }
      },

      attached: function() {
        this.toggle = this.toggle.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.resize = this.resize.bind(this);
      },

      detached: function() {
        document.removeEventListener('click', this.close);
      },

      /**
       * Toggles the opened state of the dropdown
       */
      toggle: function() {
        this.set('opened', !this.opened);
      },

      /**
       * Opens the dropdown
       */
      open: function() {
        this.set('opened', true);
      },

      /**
       * Closes the dropdown
       */
      close: function() {
        this.set('opened', false);
      },

      /**
       * Forces the dropdown to resize
       */
      resize: function() {
        var target = this.target || this.parentElement;

        if (!this.opened || !target) return;

        var rect = target.getBoundingClientRect();
        var left = rect.x;
        if (this.alignment === 'right') {
          left += rect.width - this.clientWidth;
        } else if (this.alignment === 'center') {
          left += (rect.width / 2) - (this.clientWidth / 2);
        }

        left = Math.min(window.innerWidth - this.clientWidth - this.buffer, left);
        left = Math.max(this.buffer, left);

        this.style.left = left + 'px';
        this.style.top = rect.y + rect.height + this.buffer + 'px';
      },

      _openedChanged: function(opened) {
        if (opened) {
          this.resize();
          Polymer.RenderStatus.afterNextRender(this, function() {
            document.addEventListener('click', this.close);
            window.addEventListener('resize', this.resize, {
              passive: true
            });
            window.addEventListener('scroll', this.resize, {
              passive: true
            });
          });
        } else {
          document.removeEventListener('click', this.close);
        }
      },

      _bufferUpdated: function(buffer) {
        this.style.maxWidth = 'calc(100% - ' + (buffer * 2) + 'px)';
        this.resize();
      }
    });
  </script>
</dom-module>
>>>>>>> 2ce55b71532b3e392f228a2b765526248532babd:shibui-dropdown.html
