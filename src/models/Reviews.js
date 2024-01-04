const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define(
    "Reviews",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { max: 5, min: 1 },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "accepted", "rejected"),
        defaultValue: "pending",
      },
    },
    {
      timestamps: false,
    }
  );
  Review.afterUpdate(async (review) => {
    if (review.status === "accepted") {
      console.log(review);
      const product = await review.getProduct();
      const reviews = await product.getReviews();

      const totalScore = reviews.reduce((sum, r) => sum + r.score, 0);
      const averageScore = totalScore / reviews.length;

      product.averageScore = averageScore;
      product.countReviews = reviews.length;
      await product.save();
    }
  });
};
