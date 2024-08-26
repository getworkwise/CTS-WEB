/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  collection.listRule = "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"agent\")"
  collection.viewRule = "@request.auth.id != \"\""
  collection.createRule = "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"agent\")"
  collection.updateRule = "@request.auth.id != \"\" && \n(\n  @request.auth.role = \"admin\" || \n  (@request.auth.role = \"agent\" && @request.auth.id = user.id)\n)"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.role = \"admin\""

  return dao.saveCollection(collection)
})
