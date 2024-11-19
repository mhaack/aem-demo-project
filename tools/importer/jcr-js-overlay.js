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
    const blocks = [...doc.querySelectorAll('*')].filter((el) => el.getAttribute('sling:resourceType')?.startsWith('core/franklin/components/block/v1/block'));
    blocks.forEach((block) => {
      for (let attr of block.attributes) {
        if (attr.value === '&nbsp;') {
          block.removeAttribute(attr.name);
        }
      }
  
      if (block.getAttribute('sling:resourceType') === 'core/franklin/components/block/v1/block' && block.getAttribute('model')?.startsWith('table-col-')) {
        block.setAttribute('name', 'Table');
        block.setAttribute('model', 'table');
        block.getAttributeNames().forEach(a => {if (a.startsWith('column')) block.removeAttribute(a)});
        [...block.children].forEach(c => c.setAttribute('name', 'Row'))
      }
    });
  
    // fix text blocks with &lt; and &gt; characters
    const textBlocks = [...doc.querySelectorAll('*')].filter((el) => el.getAttribute('sling:resourceType') === 'core/franklin/components/text/v1/text');
    textBlocks.forEach((textBlock) => {
      const text = textBlock.getAttribute('text');
      if (text.includes('#x3C')) {
        textBlock.setAttribute('text', text.replace(/&#x3C;/g, '<'));
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
  
    // fix image blocks 
    const imageBlocks = [...doc.querySelectorAll('*')].filter((el) => el.getAttribute('sling:resourceType') === 'core/franklin/components/image/v1/image');
    imageBlocks.forEach((imageBlock) => {
      const image = imageBlock.getAttribute('fileReference');
      if (image) {
        imageBlock.setAttribute('image', image);
        imageBlock.removeAttribute('fileReference');
      }
      const alt = imageBlock.getAttribute('alt');
      if (alt) {
        imageBlock.setAttribute('imageAlt', alt);
        imageBlock.removeAttribute('alt');
      }
    });
  
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
