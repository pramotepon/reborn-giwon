import express from "express";

import activityDeleteController from "../controllers/arlif/activityDeleteController.js";
import activityShowOneController from "../controllers/arlif/activityShowOneController.js";
import activityAddController from "../controllers/boom/activityAddController.js";
import activityAllController from "../controllers/boom/activityAllController.js";
import activityEditController from "../controllers/toey/activityEditController.js";

const router = express.Router();
/* 
    GET
*/
// Fetch One Activities detail (R)
// http://127.0.0.1:8080/activities/1231
router.get("/:id", activityShowOneController.activityShowOne);
// Fetch Activities detail (R) //!Boom
router.get("/user/:id", activityAllController.activityShow);

/* 
    POST
*/
// Add activity (C) :user_id
router.post("/add/", activityAddController.addActivity);

/* 
    PUT
*/
// Edit Activity Detail
router.put("/:id", activityEditController.activityUpdate);

/* 
    DELETE
*/
// Delete Activity Detail
router.delete("/:id", activityDeleteController.activityDelete);

export default router;
