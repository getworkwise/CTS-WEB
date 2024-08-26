/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("es9wi1h40mprtan")

  collection.createRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("es9wi1h40mprtan")

  collection.createRule = "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"agent\")"

  return dao.saveCollection(collection)
})
