export const getProcessedJcr = async (xml, pageUrl, siteName) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  // if parsing fails, log the error
  if (doc.getElementsByTagName('parsererror').length > 0) {
    // eslint-disable-next-line no-console
    console.error('Error parsing the XML document for the page ', pageUrl);
    return xml;
  }

  // remove all &amp;nbsp; references we use for placeholder text
  const blocks = [...doc.querySelectorAll('*')].filter((el) => el.getAttribute('sling:resourceType') === 'core/franklin/components/block/v1/block');
  blocks.forEach((block) => {
    for (let attr of block.attributes) {
      if (attr.value === '&nbsp;') {
        block.removeAttribute(attr.name);
      }
    }
  });
 
  const images = collectImageReferences(doc);
  for (let i = 0; i < images.length; i += 1) {
    const {image, attribute} = images[i];
    const fileReference = image.getAttribute(attribute);
    const processedFileRef = getProcessedFileRef(fileReference, pageUrl, siteName);
    if (fileReference.startsWith('http')) {
      // External fileReference: add the asset mime type to the page XML
      const asset = getAsset(fileReference, pageUrl, siteName);
      if (!asset.add) {
        // eslint-disable-next-line no-await-in-loop
        await fetchAssetData(asset);
        if (asset.mimeType && asset.mimeType !== '') {
          image.setAttribute(`${attribute}MimeType`, asset.mimeType);
        }
      }
    }
    image.setAttribute(attribute, processedFileRef);
  }
  const serializer = new XMLSerializer();
  return serializer.serializeToString(doc);
};





const collectImageReferences = (doc) => {
  // get all images with a fileReference attribute
  const images = [...doc.querySelectorAll('[fileReference]')].map((image) => { return { image, attribute: 'fileReference' }});
 
  // get all other images inside blocks
  const blocks = [...doc.querySelectorAll('*')].filter((el) => el.getAttribute('sling:resourceType')?.startsWith('core/franklin/components/block/v1/block'));
  blocks.forEach((block) => {
    for (let attr of block.attributes) {
      if (attr.name === 'image' || attr.name.endsWith('_image') || IMAGE_URL_REGEX.test(attr.value)) {
        images.push({ image: block, attribute: attr.name });
        break;
      }
    }
  });

  return images;
}
