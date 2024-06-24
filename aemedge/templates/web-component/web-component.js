import { div } from '../../scripts/dom-builder.js';
import { buildBlock } from '../../scripts/aem.js';

export default function decorate(main) {
  main.append(div(buildBlock('design-system-toc', '')));
  main.append(div(buildBlock('deep-link', '')));
}
