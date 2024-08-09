/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';
import { SplitView as SPSplitView } from 'https://jspm.dev/@spectrum-web-components/split-view';

export class SplitView extends SPSplitView {
  static get styles() {
    return [
      ...super.styles,
      css`
        #gripper {
          display: none;
          border-width: 1px;
        }

        #splitter {
          width: 1px;
        }

        :host([vertical]) #splitter {
          height: 1px;
        }
      `,
    ];
  }
}

customElements.define('sp-split-view', SplitView);
