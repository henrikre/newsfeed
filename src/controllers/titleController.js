import { Article, Title } from '../models';

function findById(req, res, next, id) {
  Article.findOne({ 'suggestedTitles': { $elemMatch: { '_id': id } } }).exec()
    .then(article => {
      req.titleId = id;
      req.article = article;
      next();
    });
}

function getTitle(req, res, next) {
  let titles = req.article.suggestedTitles;
  let title = titles.filter(title => (title.id === req.titleId))[0];
  res.json(title);
}

function voterIpIsFound(votes, ip) {
  for (var i = 0; i < votes.length; i++) {
    if (votes[i].voterIp === ip) {
      return true;
      break;
    }
  }
  return false;
}

function voteTitle(req, res, next) {
  let titles = req.article.suggestedTitles;
  let title = titles.filter(title => (title.id === req.titleId))[0];

  let ip = req.clientIp;
  let userHasVoted = false;

  if (title.votes.length > 0) {
    userHasVoted = voterIpIsFound(title.votes, ip);
  }

  if (!userHasVoted) {
    title.votes.push({voterIp: ip});
    req.article.save((err, data) => {
      if (!err) {
        res.status(201).json(data);
      }
    });
  } else {
    res.status(403).json({"message": "User has already voted this title"});
  }
}

export default ({ getTitle, voteTitle, findById });
