/* eslint-disable import/prefer-default-export */
function getAEMJson(videoJsonPath) {
  const videoJsonUrl = new URL(videoJsonPath, 'http://localhost:3001'); // load video metadata via proxy
  videoJsonUrl.searchParams.append('host', 'https://www.sap.com');

  const videoJsonRequest = new XMLHttpRequest();
  videoJsonRequest.open('GET', videoJsonUrl, false);
  videoJsonRequest.send();

  if (videoJsonRequest.status === 200) {
    return JSON.parse(videoJsonRequest.responseText);
  }
  return {};
}

const createBlock = (document, { name, variants = [], cells: data }) => {
  const headerRow = variants.length ? [`${name} (${variants.join(', ')})`] : [name];
  let blockRows = data;
  if (!Array.isArray(data)) {
    blockRows = Object.entries(data).map(([key, value]) => {
      let colItems = [];
      if (Array.isArray(value)) {
        colItems = value.map((v) => {
          const p = document.createElement('p');
          p.innerHTML = v;
          return p;
        });
      } else {
        colItems = [value];
      }
      return [key, colItems];
    });
  }
  return WebImporter.DOMUtils.createTable([headerRow, ...blockRows], document);
};


export { getAEMJson, createBlock };
