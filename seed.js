const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  price: Number,
  isActive: { type: Boolean, default: true },
});
const Plan = mongoose.models.Plan || mongoose.model("Plan", PlanSchema);

async function seed() {
  console.log("Connecting to", process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI);
  await Plan.updateOne(
    { slug: "fssai-food-license" },
    {
      $set: {
        title: "FSSAI Food License Registration",
        description: "Complete FSSAI License processing for 1 Year",
        price: 999,
        isActive: true,
      }
    },
    { upsert: true }
  );
  console.log("Seeded FSSAI plan successfully");
  process.exit(0);
}
seed();
