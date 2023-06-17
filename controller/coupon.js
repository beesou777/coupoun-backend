const Coupon = require('../model/coupon');

// Controller for getting all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// create coupon
const createCoupon = async (req, res) => {
  try {
    const { code, couponName, category, discount, expirationDate, place } = req.body;

    if (!code || !category || !couponName || !discount || !place) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const newCoupon = new Coupon({
      code,
      couponName,
      category,
      discount,
      expirationDate,
      creationDate: new Date(),
      place,
    });

    await newCoupon.save();
    res.status(201).json({ success: true, coupon: newCoupon });
  } catch (error) {
    console.error(error, "error");
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Controller for redeeming a coupon
const redeemCoupon = async (req, res) => {
  try {
    const couponId = req.params.id;

    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    if (!coupon.redeemable) {
      return res.status(400).json({ error: 'Coupon already redeemed' });
    }

    coupon.redeemable = false;
    await coupon.save();

    res.status(200).json({ success: true, message: 'Coupon redeemed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = {
  getAllCoupons,
  createCoupon,
  redeemCoupon,
};
