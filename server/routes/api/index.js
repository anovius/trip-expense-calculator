let router = require("express").Router();

router.use("/payouts", require("./payouts"));

module.exports = router;
