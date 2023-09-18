const Joi = require("joi");
const mongoose = require("mongoose");

const TabSchema = new mongoose.Schema(
  {
    tabUrlName: {
      type: String,
      required: true,
      unique: true,
    },
    localizedName: [
      {
        name: String,
        lang: String,
      },
    ],
    order: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// populate pages that belongs to this Node
TabSchema.virtual("pages", {
  ref: "ArticlePage",
  foreignField: "tabId",
  localField: "_id",
});
const Tab = mongoose.model("Tab", TabSchema);

function validateCreateTab(object) {
  const schema = Joi.object({
    tabUrlName: Joi.string().required(),
    localizedName: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          lang: Joi.string().required(),
        })
      )
      .required(),
  });
  return schema.validate(object);
}

module.exports = {
  Tab,
  validateCreateTab,
};
