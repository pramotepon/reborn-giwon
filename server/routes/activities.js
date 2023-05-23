import express from "express";
import multer from "multer";

import ActivityController from "../controllers/ActivityController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/* 
    GET
*/
// Fetch One Activities detail (R)
// http://127.0.0.1:8080/activities/1231
router.get("/:id", ActivityController.getActivity);
// Fetch Activities detail (R) //!Boom
router.get("/user/:id", ActivityController.getActivities);

/* 
    POST
*/
// Add activity (C) :user_id
router.post("/add/", upload.single("image"), ActivityController.createActivity);

/* 
    PUT
*/
// Edit Activity Detail
router.put("/:id", ActivityController.updateActivity);

/* 
    DELETE
*/
// Delete Activity Detail
router.delete("/:id", ActivityController.delete);

export default router;
