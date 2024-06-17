export default function decorate(block) {
  [...block.children].forEach((row) => {
    const firstLine = row.querySelector('p:first-child');
    switch (firstLine?.innerText) {
      case 'Don\'t':
        firstLine.classList.add('dont');
        break;
      case 'Do':
        firstLine.classList.add('do');
        break;
      default:
        /* eslint-disable no-console */
        console.warn('When to use block should start with "Do" or "Don\'t"');
    }
  });
}
