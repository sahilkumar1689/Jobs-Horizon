const express = require("express");
const updatesRouter = express.Router();
const upload = require("../../Middleware/MulterMiddlewares/multerUpload");

const studentUpdateController = require("../../Controllers/UpdatesControllers/studentUpdate.controller");
const companyUpdateController = require("../../Controllers/UpdatesControllers/companyUpdate.controller");
const candidateSelectionController = require("../../Controllers/UpdatesControllers/candidateSelection.controller");



updatesRouter.post("/studentUpdates",upload.fields([
    {name:"bioImg",maxCount:1},
    {name:"resume",maxCount:1}
]),studentUpdateController);

updatesRouter.post("/companyUpdates",upload.single("companyLogo"),companyUpdateController);

updatesRouter.post("/candidateSelection",candidateSelectionController);



module.exports = updatesRouter;
