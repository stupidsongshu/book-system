<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Book;

class BookSearch extends Book {
  public function scenarios() {
    return Model::scenarios();
  }

  public function Search($params) {
    $query = Book::find();

    $dataProvider = new ActiveDataProvider([
      'query' => $query,
    ]);

    $this-> load($params);

    if (!$this->validate()) {
      return $dataProvider;
    }

    $query->andFilterWhere([
      'id' => $this->id,
      'price' => $this->price,
    ]);

    $query->andFilterWhere(['like', 'name', $this->name])
          ->andFilterWhere(['like', 'author', $this->author])
          ->andFilterWhere(['like', 'isbn', $this->isbn]);

    return $dataProvider;
  }
}