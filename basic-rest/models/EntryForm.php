<?php

namespace app\models;

use yii;
use yii\base\Model;

/**
 * yii\base\Model 被用于普通模型类的父类并与数据表无关
 * yii\db\ActiveRecord 通常是普通模型类的父类但与数据表有关联
 * yii\db\ActiveRecord 类其实也是继承自 yii\base\Model，增加了数据库处理
 */

class EntryForm extends Model
{
  public $name;
  public $email;

  public function rules() {
    // 返回数据验证规则的集合
    // name 和 email 值都是必须的
    // email 的值必须满足email规则验证
    return [
      [['name', 'email'], 'required'],
      ['email', 'email'],
    ];
  }
}