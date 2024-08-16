/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vhp5q4vf",
    "name": "document_type",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3uprxhtd",
    "name": "document_number",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dwjlbmuq",
    "name": "issuing_authority",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ot2vz5hh",
    "name": "issue_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iknoxphh",
    "name": "expiry_date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e7yj4pxe",
    "name": "document_status",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "reported",
        "found",
        "returned",
        "expired"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  // remove
  collection.schema.removeField("vhp5q4vf")

  // remove
  collection.schema.removeField("3uprxhtd")

  // remove
  collection.schema.removeField("dwjlbmuq")

  // remove
  collection.schema.removeField("ot2vz5hh")

  // remove
  collection.schema.removeField("iknoxphh")

  // remove
  collection.schema.removeField("e7yj4pxe")

  return dao.saveCollection(collection)
})
