async function main() {
  const resp = await fetch('https://main--builder-prospect--sapudex.aem.page/germany/articles-index.json');

  if (resp.ok) {
    const json = await resp.json();
    const types = new Set();
    const tags = new Set();
    const topics = new Set();

    json.data.forEach((element) => {
      types.add(element.template);
      if (element.tags) {
        element.tags
          .substring(1, element.tags.length - 1)
          .split(',')
          .forEach((tag) => tags.add(tag.substring(1, tag.length - 1)));
      }
      if (element.topics) {
        element.topics
          .split(',')
          .forEach((topic) => topics.add(topic.trim()));
      }
    });
    // eslint-disable-next-line no-console
    console.log(`{
      "metadata": {
        "version": "0.0.0.1",
        "description": "news processing by adobe franklin integration workshop on 2024.01.17"
      },
      "terms": [${Array.from(types).map((type) => `
        {
          "path": "type/${type.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}",
          "name": "${type}"
        }`).concat(Array.from(tags).filter((tag) => tag.trim().length > 0).map((tag) => `
        {
          "path": "tag/${tag.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}",
          "name": "${tag}"
        }`)).concat(Array.from(topics).filter((topic) => topic.trim().length > 0).filter((topic) => topic.trim() !== '[]').map((topic) => `
        {
          "path": "topic/${topic.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}",
          "name": "${topic}"
        }`))}
      ]
    }`);
  } else {
    // eslint-disable-next-line no-console
    console.error(`${resp.status} - ${resp.statusText}`);
  }
}
main();
