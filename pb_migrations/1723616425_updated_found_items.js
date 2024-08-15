/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fa7rub5qws4c1pz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lyoghpd9",
    "name": "finder_contact",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7niconwx",
    "name": "finder_name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fa7rub5qws4c1pz")

  // remove
  collection.schema.removeField("lyoghpd9")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7niconwx",
    "name": "finder",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
