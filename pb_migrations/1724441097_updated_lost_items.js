/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  collection.listRule = "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"agent\")"
  collection.viewRule = "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"agent\")"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4y6i5agkn1pwnfp")

  collection.listRule = ""
  collection.viewRule = ""

  return dao.saveCollection(collection)
})
