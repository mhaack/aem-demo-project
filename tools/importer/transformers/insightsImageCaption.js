// sample https://www.sap.com/insights/business-model-innovation-xaas.html

const transformImageCaption = (main, document) => {
  main.querySelectorAll('div[data-component-name="InteractiveVisual"] div[class^="InteractiveVisual__lightboxImage"] + p').forEach((caption) => {
    const captionTextElem = document.createElement('em');
    captionTextElem.textContent = caption.textContent;
    caption.replaceWith(captionTextElem);
  });
};

export default transformImageCaption;
