/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "4bfgqoqi",
    "name": "is_official_document",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  // remove
  collection.schema.removeField("4bfgqoqi")

  return dao.saveCollection(collection)
})
