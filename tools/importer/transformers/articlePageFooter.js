const transformArticleContentFooter = (main, document) => {
  const contentFooter = main.querySelector('div.entry-footer');
  if (contentFooter) {
    const area = document.articleType === 'blog' ? 'blog' : 'news';

    const fragmentLink = document.createElement('a');
    fragmentLink.href = `https://main--builder-prospect-prod--sapudex.hlx.page/fragments/${area}/article-details`;
    fragmentLink.textContent = fragmentLink.href;

    contentFooter.innerHTML = '';
    contentFooter.append(fragmentLink);
  }
};
export default transformArticleContentFooter;
