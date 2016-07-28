import mongoose, { Schema } from 'mongoose';

let VoteSchema = Schema({
  voterIp: {
    type: String,
    required: true
  }
});

let TitleSchema = Schema({
  title: {
    type: String,
    required: true
  },
  votes: [VoteSchema]
});

let ArticleSchema = Schema({
  title: {
    type: String,
    required: true
  },
  suggestedTitles: [TitleSchema],
  link: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export const Article = mongoose.model('Article', ArticleSchema);
export const Title = mongoose.model('Title', TitleSchema);
