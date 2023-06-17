const express = require('express')
const router = express.Router();

const { getAllCoupons,createCoupon,redeemCoupon} = require("../controller/coupon");


router.route("/coupon").post(createCoupon).get(getAllCoupons);
router.route("/coupon/:id").patch(redeemCoupon);

module.exports = router