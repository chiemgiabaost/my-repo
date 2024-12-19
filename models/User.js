import mongoose, {model, Schema, models} from "mongoose";

const UserSchema = new Schema({
  username: {type:String, required:true},
  password: {type:String, required:true},
  billingAddress: {type:String},
  shippingAddress: {type:String},
  postalCode: {type:String},
  creditCard: {type:String},
  cvc: {type:String},
  orderHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order', // Assuming you have an Order model to store order details
    },
  ],
  createdAt: { type: Date, default: Date.now },

}, {
  timestamps: true,
});

export const User = models.User || model('User', UserSchema);