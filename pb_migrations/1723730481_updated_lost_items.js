/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""
  collection.updateRule = ""
  collection.deleteRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.role = \"agent\""
  collection.viewRule = "@request.auth.id != \"\" && @request.auth.role = \"agent\""
  collection.createRule = "@request.auth.id != \"\" && @request.auth.role = \"agent\""
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.role = \"agent\""
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.role = \"agent\""

  return dao.saveCollection(collection)
})
