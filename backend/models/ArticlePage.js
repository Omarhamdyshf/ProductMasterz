const mongoose = require("mongoose");
const Joi = require("joi");

const ArticlePageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lang: {
    type: String,
    required: true,
    trim: true,
  },
  navbar: [
    {
      text: String,
      link: String,
    },
  ],
  header: {
    title: String,
    description: String,
    imageUrl: String,
  },
  content: {
    type: String,
    required: true,
  },
});

ArticlePageSchema.index({ name: 1, lang: 1 }, { unique: true });

function validateCreatePage(object) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    lang: Joi.string().trim().required(),
    navbar: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
        link: Joi.string().required(),
      })
    ),
    header: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      imageUrl: Joi.string(),
    }).required(),
    content: Joi.string().required(),
  });
  return schema.validate(object);
}

function validateUpdatePage(object) {
  const schema = Joi.object({
    name: Joi.string().trim(),
    lang: Joi.string().trim(),
    navbar: Joi.array().items(
      Joi.object({
        text: Joi.string().required(),
        link: Joi.string().required(),
      })
    ),
    header: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      imageUrl: Joi.string(),
    }),
    content: Joi.string(),
  });
  return schema.validate(object);
}

function validateGetPage(object) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
    lang: Joi.string().trim().required(),
  });
  return schema.validate(object);
}

const ArticlePage = mongoose.model("ArticlePage", ArticlePageSchema);

module.exports = {
  ArticlePage,
  validateCreatePage,
  validateUpdatePage,
  validateGetPage,
};
