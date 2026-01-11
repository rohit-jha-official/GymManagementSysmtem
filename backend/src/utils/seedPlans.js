import MembershipPlan from "../models/membershipPlan.js";

export const seedPlans = async () => {
  const count = await MembershipPlan.countDocuments();
  if (count > 0) return;

  await MembershipPlan.insertMany([
    {
      name: "Monthly",
      durationMonths: 1,
      price: 999,
      features: ["Full Gym Access", "Locker Room", "Basic Equipment"],
    },
    {
      name: "Quarterly",
      durationMonths: 3,
      price: 2499,
      features: ["All Equipment", "Diet Plan"],
      isPopular: true,
    },
    {
      name: "Half Yearly",
      durationMonths: 6,
      price: 4499,
      features: ["Diet Plan", "Sauna Access"],
    },
    {
      name: "Yearly",
      durationMonths: 12,
      price: 7999,
      features: ["Guest Passes"],
      isPremium: true,
    },
  ]);
};
