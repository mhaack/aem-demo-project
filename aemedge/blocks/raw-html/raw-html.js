function sanitizeHTML(html) {
  // TODO: Can be taken from placeholders so that this is configurable
  const disallowedTags = ['iframe', 'head', 'script', 'style', 'html', 'body'];

  // Disallow attributes that start with 'on'
  const onAttributePattern = /\s+on\w+="[^"]*"/gi;

  // Remove disallowed tags
  let sanitizedHtml = html;
  disallowedTags.forEach((tag) => {
    const tagRegex = new RegExp(`<${tag}[^>]*>.*?</${tag}>`, 'gi');
    sanitizedHtml = sanitizedHtml?.replace(tagRegex, '');
  });

  // Remove attributes starting with 'on'
  sanitizedHtml = sanitizedHtml?.replace(onAttributePattern, '');
  return sanitizedHtml;
}

export default async function decorate(block) {
  const htmlString = block.textContent;
  block.innerHTML = '';
  block.innerHTML = sanitizeHTML(htmlString);
}
