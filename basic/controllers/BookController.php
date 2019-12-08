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

    // return $this->render('index', [
    //   'searchModel' => $searchModel,
    //   'dataProvider' => $dataProvider,
    // ]);

    // 页面渲染改为输出JSON数据接口
    // $response = Yii::$app->response;
    // $response->format = \yii\web\Response::FORMAT_JSON;
    // $response->data = ['data' => $dataProvider->getModels()];

    // https://stackoverflow.com/questions/38483794/yii2-how-to-return-json-using-dataprovider
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    return $dataProvider->getModels();
    // return $dataProvider->getKeys();
    // return $dataProvider->getCount();
    // return $dataProvider->getTotalCount();
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