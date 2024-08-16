/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("4svtxiqixhydhxa");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "4svtxiqixhydhxa",
    "created": "2024-08-15 04:03:21.685Z",
    "updated": "2024-08-16 04:59:31.432Z",
    "name": "cts_documents",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3ygw0zab",
        "name": "document_type",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "c76way48t4k229d",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "wun7ircz",
        "name": "document_number",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jqfah3sc",
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
      },
      {
        "system": false,
        "id": "bzeaxi9k",
        "name": "issue_date",
        "type": "date",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "scxsox92",
        "name": "expiry_date",
        "type": "date",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "wzy4we4h",
        "name": "status",
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
      },
      {
        "system": false,
        "id": "r7k8waw3",
        "name": "related_lost_item",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "4y6i5agkn1pwnfp",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": "@request.auth.id != \"\" && (@request.auth.role = \"admin\" || @request.auth.role = \"agent\")",
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
