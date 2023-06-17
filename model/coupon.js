const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  category:{
    type:String,
    required:true
  },
  couponName: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date
  },
  creationDate: {
    type: Date
  },
  place:{
    type:String,
    required:true
  },
  redeemable: {
    type: Boolean,
    default: true,
  },
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
