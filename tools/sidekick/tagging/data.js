/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */

import AppModel from './model.js';

/**
 * Loads the provided libraries
 * @param {AppModel} appModel The app model
 * @param {Object} config The config data
 */
export async function loadTags() {
  const { context } = AppModel.appStore;
  const { base: href } = context;

  try {
    const respCategories = await fetch(`${href}?sheet=tag-picker-categories`);
    const categories = await respCategories.json();
    context.categories = categories.data.sort((a, b) => a.label.localeCompare(b.label));

    const respTags = await fetch(`${href}?sheet=tag-picker`);
    const tags = await respTags.json();
    context.tags = tags.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Unable to load tagging data', error);
  }
}
