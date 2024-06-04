import { decorateIcons } from '../../scripts/aem.js';
import { div, p, span } from '../../scripts/dom-builder.js';

const blockToColorIconMap = {
  warning: {
    icon: 'message-warning',
    displayText: 'Warning',
  },
  hint: {
    icon: 'hint',
    displayText: 'Developer Hint',
  },
  changes: {
    icon: 'bell',
    displayText: 'Upcoming Changes',
  },
  information: {
    icon: 'source-code',
    displayText: 'Information',
  },
  guideline: {
    icon: 'completed',
    displayText: 'Guidelines',
  },
};

function findProperties(block) {
  let icon = '';
  let displayText = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const className of block.classList) {
    if (blockToColorIconMap[className]) {
      ({ icon, displayText } = blockToColorIconMap[className]);
      break;
    }
  }

  return { icon, displayText };
}

export default async function decorate(block) {
  const { icon, displayText } = findProperties(block);
  const description = block.querySelector('div');

  const iconDiv = span({ class: `icon icon-${icon}` });
  block.append(iconDiv);

  const heading = p(displayText);
  const headingDiv = div({ class: 'heading' }, heading);
  block.append(headingDiv);

  const descriptionDiv = div({ class: 'description' }, description.querySelector('div'));
  block.removeChild(description);
  block.append(descriptionDiv);
  decorateIcons(block);
}
