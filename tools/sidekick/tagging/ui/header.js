/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-unresolved
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

export class Header extends LitElement {
  static styles = css`
    .header {
      padding: 10px 5px;
      display: grid;
      grid-template-columns: 238px 1fr 238px;
      gap: 10px;
    }

    @media (max-width: 768px) {
      .header {
        grid-template-columns: 40px 1fr 40px;
      }

      .logo-container span {
        display: none;
      }
    }

    .header > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .logo-container {
      width: 100%;
      padding-left: 10px;
      height: 32px;
      display: flex;
      justify-content: left;
      align-items: center;
      gap: 10px;
    }
  `;

  render() {
    return html` <div class="header">
      <div>
        <div class="logo-container">
          <sp-icon
            label="logo"
            size="xxl"
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJFYmVuZV8yIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDEyLjM4IDIwNCI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOnVybCgjbGluZWFyLWdyYWRpZW50KTt9LmNscy0xLC5jbHMtMntmaWxsLXJ1bGU6ZXZlbm9kZDt9LmNscy0ye2ZpbGw6I2ZmZjt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9ImxpbmVhci1ncmFkaWVudCIgeDE9IjIwNi4xOSIgeTE9IjAiIHgyPSIyMDYuMTkiIHkyPSIyMDQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMGIxZWIiLz48c3RvcCBvZmZzZXQ9Ii4yMTIiIHN0b3AtY29sb3I9IiMwMDlhZDkiLz48c3RvcCBvZmZzZXQ9Ii41MTkiIHN0b3AtY29sb3I9IiMwMDdmYzQiLz48c3RvcCBvZmZzZXQ9Ii43OTIiIHN0b3AtY29sb3I9IiMwMDZlYjgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDY5YjQiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyBpZD0iTGF5ZXJfMSI+PHBvbHlsaW5lIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIwIDIwNCAyMDguNDEzIDIwNCA0MTIuMzggMCAwIDAgMCAyMDQiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Im0yNDQuNzI3LDM4LjM1OWwtNDAuNTkzLS4wMjV2OTYuNTE4bC0zNS40Ni05Ni41MThoLTM1LjE2bC0zMC4yNzcsODAuNzE2Yy0zLjIyNC0yMC4zNTItMjQuMjc3LTI3LjM4LTQwLjg0LTMyLjY0OS0xMC45MzctMy41MTItMjIuNTQxLTguNjc4LTIyLjQzNC0xNC4zODcuMDkxLTQuNjg3LDYuMjI1LTkuMDQsMTguMzc3LTguMzg1LDguMTcuNDMzLDE1LjM3MywxLjA5MiwyOS43MSw4LjAwNmwxNC4xMDItMjQuNTU3Yy0xMy4wODgtNi42NTgtMzEuMTY5LTEwLjg2Ny00NS45ODUtMTAuODgzaC0uMDg2Yy0xNy4yNzcsMC0zMS42NzcsNS41OTgtNDAuNjAyLDE0LjgyNC02LjIyMSw2LjQ0My05LjU3MiwxNC42MjYtOS43MTIsMjMuNjc5LS4yMjcsMTIuNDU0LDQuMzQxLDIxLjI5MiwxMy45MzgsMjguMzM4LDguMTA0LDUuOTQ0LDE4LjQ2OCw5Ljc5NCwyNy42MDMsMTIuNjI2LDExLjI3LDMuNDkyLDIwLjQ2Nyw2LjUyNiwyMC4zNiwxMy4wMDItLjA4MywyLjM1NS0uOTc3LDQuNTUyLTIuNjcxLDYuMzM3LTIuODA3LDIuODk3LTcuMTI0LDMuOTg2LTEzLjA4NCw0LjA5OC0xMS40OTcuMjQzLTIwLjAyNi0xLjU1OS0zMy42MS05LjU4NWwtMTIuNTM2LDI0LjkwM2MxMy41NDYsNy43MDUsMjkuNTg2LDEyLjIyMyw0NS45NTIsMTIuMjIzbDIuMTA2LS4wMjRjMTQuMjQ3LS4yNTYsMjUuNzQ1LTQuMzE2LDM0LjkyOS0xMS43MTIuNTI3LS40MTYsMS4wMDEtLjg0NSwxLjQ4OC0xLjI3N2wtNC4wNzMsMTAuODc0aDM2Ljg3NWw2LjE4OS0xOC44MjJjNi40NzcsMi4yMTQsMTMuODQ3LDMuNDM3LDIxLjY3NiwzLjQzNyw3LjYxOCwwLDE0Ljc5NS0xLjE3LDIxLjE1Ni0zLjI1Mmw1Ljk2NSwxOC42MzdoNjAuMTM3di0zOC45NjloMTMuMTEzYzMxLjcwNiwwLDUwLjQ1Ni0xNi4xNDcsNTAuNDU2LTQzLjIwMiwwLTMwLjEzOS0xOC4yMTktNDMuOTY5LTU3LjAxMS00My45NjlabS05My44MTYsODIuNTg3Yy00LjczNywwLTkuMTc3LS44MjgtMTMuMDA2LTIuMjc1bDEyLjg2Ni00MC41OTNoLjI0NGwxMi42NDMsNDAuNzA4Yy0zLjgwMSwxLjM0OS04LjEzOCwyLjE2LTEyLjc0NiwyLjE2Wm05Ni4xOTktMjMuMzI0aC04Ljk0MXYtMzIuNzExaDguOTQxYzExLjkyNywwLDIxLjQzNywzLjk2MSwyMS40MzcsMTYuMTM5LDAsMTIuNjAyLTkuNTEsMTYuNTcyLTIxLjQzNywxNi41NzIiLz48L2c+PC9zdmc+Cg=="
          >
          </sp-icon>
          <span>Tag Picker</span>
        </div>
      </div>
    </div>`;
  }
}

customElements.define('tagger-header', Header);
