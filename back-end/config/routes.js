const express = require("express")
const router = express.Router()
const userController = require("../app/controller/userController")
const userAuthenticate = require("../app/middleware/userAuthenticate")


router.post("/api/app2/register",userController.register)
router.post("/api/app2/login",userController.login)
router.get("/api/app2/user",userAuthenticate,userController.show)
router.put("/api/app2/add-user-info",userAuthenticate,userController.update)
router.get("/api/app2/get-user-info",userAuthenticate,userController.display)
router.get("/api/app2/search-email/:email",userController.search)

router.get("/api/app2/email-search/:email",userController.searchUser)

module.exports = router