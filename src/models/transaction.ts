import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  invoice: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: { 
    type: Date,
    required: true,
  },
  for: {
      type: String,
      required: true,
  },
  paid: {
      type: Number,
      required: true,
  },
  amount : {
      type: Number,
      required: true,
  }
},
{ timestamps: true}
);

const Transaction = mongoose.model("Transaction",transactionSchema)

export default Transaction