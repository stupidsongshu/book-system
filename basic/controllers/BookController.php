<?php

namespace app\controllers;

use Yii;
use app\models\Book;
use app\models\BookSearch;

use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

class BookController extends Controller {
  public function behaviors() {
    return [
      'verbs' => [
        'class' => VerbFilter::className(),
        'actions' => [
          'delete' => ['POST'],
        ],
      ],
    ];
  }

  public function actionIndex() {
    $searchModel = new BookSearch();
    $dataProvider = $searchModel->search(Yii::$app->request->$queryParams);

    return $this->render('index', [
      'searchModel' => $searchModel,
      'dataProvider' => $dataProvider,
    ]);
  }

  public function actionView($id) {
    return $this->render('view', [
      'model' => $this->findModel($id),
    ]);
  }

  public function actionCreate() {
    $model = new Book();
    if ($model->load(Yii::$app->request->post()) && $model->save()) {
      return $this->redirect(['view', 'id' => $model->id]);
    }
    return $this->render('create', [
      'model' => $model,
    ]);
  }

  public function actionUpdate($id) {
    $model = $this->findModel($id);

    if ($model->load(Yii::$app->request->post()) && $model->save()) {
      return $this->redirect(['view', 'id' => $model->id]);
    }

    return $this->render('update', [
      'model' => $model,
    ]);
  }

  public function actionDelete($id) {
    $model = $this->findModel($id)->delete();
    return $this->redirect(['index']);
  }

  public function findModel($id) {
    if (($model = Book::findOne($id)) !== null) {
      return $model;
    }
    throw new NotFoundHttpException('The requested page does not exist.');
  }
}