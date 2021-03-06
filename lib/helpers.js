var helpers = module.exports = {
	findArticle: findArticle,
	findCategory: findCategory,
	findTagArticles: findTagArticles
}

/**
 * looks for either category or series
 * @param uri
 * @param categories
 * @returns {*}
 */
function findCategory (uri, categories) {
	'use strict'
	let category = null
	let subcategory = null
	let index = 0

	if (uri.slice(-1) === '/') uri = uri.slice(0, -1)
	while (index < categories.length) {
		category = categories[index]
		if (category.uri === uri) {
			index = categories.length
			return category
		}
		if (category.hasCategories) {
			subcategory = findCategory(uri, category.categories)
			if (subcategory != null) return subcategory
		}
		if (category.hasSeries) {
			subcategory = findCategory(uri, category.series)
			if (subcategory != null) return subcategory
		}
		index ++
	}
	return null
}

function findArticle (uri, articles) {
	"use strict"
	let index = 0
	while(index < articles.length) {
		let article = articles[index]
		if (article.uri === uri) {
			return article
		}
		index ++
	}
}

function findTagArticles (tagSlug, tags) {
	"use strict"
	let index = 0
	while(index < tags.length) {
		let tag = tags[index]
		if (tag.slug === tagSlug) {
			return tag.articles
		}
		index ++
	}
}