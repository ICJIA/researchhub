export {
  searchFields,
  appBaseFields,
  appViewFields,
  articleCardFields,
  articleViewFields,
  datasetBaseFields,
  datasetViewFields
}

// all content types
const baseFields = [
  '_id',
  'title',
  'slug',
  'external',
  'date',
  'categories',
  'tags'
]
const searchFields = baseFields.slice(1)

// apps content type
const appBaseFields = [...baseFields, 'image', 'contributors']
const appViewFields = [
  ...appBaseFields,
  'description',
  'url',
  'citation',
  'funding',
  'articles (sort: "date:desc", where: { status: "published" }) { title slug }',
  'datasets (sort: "date:desc", where: { status: "published" }) { title slug }'
]

// articles content type
const articleBaseFields = [...baseFields, 'abstract', 'authors']
const articleCardFields = [...articleBaseFields, 'thumbnail']
const articleViewFields = [
  ...articleBaseFields,
  'splash',
  'images',
  'markdown',
  'citation',
  'doi',
  'funding',
  'mainfiletype',
  'mainfile { hash ext }',
  'extrafile { hash ext }',
  'apps (sort: "date:desc", where: { status: "published" }) { title slug }',
  'datasets (sort: "date:desc", where: { status: "published" }) { title slug }'
]

// datasets content type
const datasetBaseFields = [...baseFields, 'sources', 'project']
const datasetViewFields = [
  ...datasetBaseFields,
  'timeperiod',
  'unit',
  'variables',
  'description',
  'notes',
  'citation',
  'funding',
  'datafile { hash ext }',
  'apps (sort: "date:desc", where: { status: "published" }) { title slug }',
  'articles (sort: "date:desc", where: { status: "published" }) { title slug }'
]
