const express = require("express");
const router = express.Router();

const {
  getData,
  getSelectedData,
  getSelectedSum,
} = require("../controllers/dataController");

router.get("/", getData);

router.get("/all/:startDate/:endDate", getSelectedData);
router.get("/type/:type/:startDate/:endDate", getSelectedSum);

module.exports = router;
