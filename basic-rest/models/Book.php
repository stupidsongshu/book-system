<?php

namespace app\models;

use Yii;

class Book extends \yii\db\ActiveRecord {
  public static function tableName() {
    return 't_books';
  }

  public function rules() {
    return [
      [['name', 'author'], 'required'],
      [['price'], 'integer'],
      [['name'], 'string', 'max' => 100],
      [['author'], 'string', 'max' => 50],
      [['isbn'], 'string'],
      [['id'], 'unique'],
    ];
  }

  public function attributeLabels() {
    return [
      'id' => 'ID',
      'name' => '书名',
      'author' => '作者',
      'isbn' => 'ISBN',
      'price' => '价格',
    ];
  }
}