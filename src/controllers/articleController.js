import { Article } from '../models';

function setMostVotedTitle(article) {
  let suggestedTitles = article.suggestedTitles;
  if (suggestedTitles.length > 0) {
    let numMostVotes = 0;
    let mostVotedTitle = '';
    for (var i = 0; i < suggestedTitles.length; i++) {
      let votes = suggestedTitles[i].votes;
      if (votes.length > numMostVotes) {
        numMostVotes = votes.length;
        mostVotedTitle = suggestedTitles[i].title;
      }
    }
    return mostVotedTitle;
  }
  return null;
}

function getArticles(req, res, next) {
  Article.find((err, articles) => {
    if (err) {
      res.json({ error: "Oops. Something went wrong"});
      return
    }
    articles = articles.map(article => {
      var title = setMostVotedTitle(article);
      if (title) {
        article.title = title;
      }
      return article;
    });
    res.json(articles);
  });
}

function findById(req, res, next, id, titleId) {
  Article.findOne({_id: id}).exec()
    .then(article => {
      req.article = article;
      var title = setMostVotedTitle(article);
      if (title) {
        req.article.title = title;
      }
      next();
    });
}

function getArticle(req, res, next) {
  res.json(req.article);
}

function giveTitle(req, res, next) {
  req.article.suggestedTitles.push(req.body);
  req.article.save((err, data) => {
    if (!err) {
      res.status(201).json(data);
    }
  })
}

function voteTitle(req, res, next) {
  res.json(req.article);
}

export default ({ getArticles, getArticle, giveTitle, voteTitle, findById });
