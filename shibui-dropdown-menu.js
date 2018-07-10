/**
`shibui-dropdown-menu` is a simple and modern dropdown menu inspired by the dropdown on [Heroku](https://heroku.com).

Example:

    <shibui-dropdown-menu>
      <button slot="trigger">Trigger</button>
      <a>Account Settings</a>
      <a>Notifications</a>
      <a>Sign out</a>
    </shibui-dropdown-menu>

@demo demo/shibui-dropdown-menu.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '../../@polymer/polymer/polymer-legacy.js';

import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import './shibui-dropdown.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="shibui-dropdown-menu">
  <template strip-whitespace="">
    <style>
      :host {
        display: inline-block;
        position: relative;
      }

      .trigger ::slotted(*) {
        cursor: pointer;
      }
    </style>
    <div class="trigger">
      <slot id="trigger" name="trigger"></slot>
    </div>
    <shibui-dropdown id="dropdown" opened="{{opened}}" alignment="[[alignment]]">
      <slot></slot>
    </shibui-dropdown>
  </template>

  
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
  is: 'shibui-dropdown-menu',

  properties: {
    /**
     * Determines whether the dropdown is opened or closed
     */
    opened: {
      type: Boolean,
      value: false,
      notify: true,
      reflectToAttribute: true
    },

    /**
     * Whether to align the dropdown to the 'right' or 'left' of the trigger
     */
    alignment: {
      type: String,
      value: 'right',
      reflectToAttribute: true
    }
  },

  attached: function() {
    this._toggle = this._toggle.bind(this);
    this._triggerElement.addEventListener('click', this._toggle);
  },

  detached: function() {
    this._triggerElement.removeEventListener('click', this._toggle);
  },

  /**
   * The trigger element provided
   */
  get _triggerElement() {
    return Polymer.dom(this.$.trigger).getDistributedNodes()[0];
  },

  _toggle: function() {
    this.$.dropdown.toggle();
  }
});
