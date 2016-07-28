import blindparser from 'blindparser';
import { Article } from './models';
import moment from 'moment';

function parseFeed(url) {
  return new Promise(function(resolve, reject) {
    blindparser.parseURL(url, function(err, data){
      if (!err) {
        var articles = data ? data.items : [];
        return resolve(reformat(articles));
      }
      return reject(err);
    });
  });
}

function reformat(articles) {
  return articles.map(item => {
    var published = moment(item.date).toISOString();
    return {
      title: item.title[0].split(' ').slice(1).join(' '),
      suggestedTitles: [],
      link: item.link[0],
      category: item.category[0],
      published: published
    };
  });
}

function filterNew(articles, newestPublished) {
  return articles.filter(item => {
    if (item.published > newestPublished){
      return item;
    };
  });
}

function saveArticles(articles) {
  Article.insertMany(articles)
    .then(function(articles) {
      return articles;
    })
    .catch(function(err) {
      throw new Error(err);
    });
}

function getLatestArticles(url) {
  console.log('Fetching feed...');
  parseFeed(url)
    .then(data => {
      Article.find()
        .sort({published: -1})
        .exec()
        .then(articles => {
          if (articles.length > 0) {
            var latestPublished = articles[0].published;
            var newFeedData = filterNew(data, latestPublished);
            console.log('Number of new items:', newFeedData.length);
            if (newFeedData.length > 0) {
              saveArticles(newFeedData);
            }
          } else {
            console.log('No articles in database, adding all', data.length);
            saveArticles(data);
          }
      });
    })
    .catch(err => {
      console.log(err);
    });
}

export default { getLatestArticles };
