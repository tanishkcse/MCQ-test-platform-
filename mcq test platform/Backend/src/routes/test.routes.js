import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()
import {
  createAttemptedTest,
  getAllAttemptedTests,
  getAttemptedTestsByUser,
  updateAttemptedTest,
  deleteAttemptedTest,
} from "../controllers/test.controller.js";


// Attempted Tests routes
router.route("/create").post(verifyJWT,createAttemptedTest)
router.route("/show").get(verifyJWT,getAllAttemptedTests)
router.route("/show/user/:userId").get(verifyJWT,getAttemptedTestsByUser)
router.route("/update/:id").put(verifyJWT,getAllAttemptedTests)
router.route("/delete/:id").delete(verifyJWT,deleteAttemptedTest)


// router.post("/create", createAttemptedTest);
// router.get("/show", getAllAttemptedTests);
// router.get("/show/user/:userId", getAttemptedTestsByUser);
// router.put("/update/:id", updateAttemptedTest);
// router.delete("/delete/:id", deleteAttemptedTest);

export default router;