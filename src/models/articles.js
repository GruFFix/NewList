import { BaseModel, API } from 'mobx-model';
import BPromise from 'bluebird';

const NEW_API_URL = '/top-headlines';

class Articles extends BaseModel {
  static attributes = {
    title: '',
    description: '',
    urlToImage: '',
    url: '',
  };
}

Articles.addClassAction('fetch', function({ country, category }) {
  const params = {
    country,
  };

  if (category !== 'all') params.category = category;

  return new BPromise((resolve, reject) => {
    API.request({
      endpoint: NEW_API_URL,
      data: params,
    }).then(response => {
      const { articles, status } = response.body;

      if (status !== 'ok') return reject(response);

      const updateNewList = articles.map((article, index) => ({
        id: index + 1,
        ...article,
      }));

      const json = { ...response.body, articles: updateNewList };

      updateNewList.forEach(item =>
        this.set({
          modelJson: item,
        }),
      );

      return resolve(json);
    });
  });
});

export default Articles;

window.Articles = Articles;
