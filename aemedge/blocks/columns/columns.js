import { buildBlock, decorateBlock, loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  const loadBlocks = [];
  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const text = col.querySelector('p:first-child')?.textContent;
      if (text === 'Don\'t' || text === 'Do') {
        const whenToBlock = buildBlock('when-to-use', [[col.innerHTML]]);
        col.replaceWith(whenToBlock);
        decorateBlock(whenToBlock);
        loadBlocks.push(loadBlock(whenToBlock));
      }
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  await Promise.all(loadBlocks);
}
