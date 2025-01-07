# spa_webpro


# 習っていない要素メモ


[express Router](https://expressjs.com/ja/guide/routing.html)

```mermaid
    flowchart TD;

    LoadPage(/public/index.htmlにアクセス)
    RequestGoodsIds(全商品のidを取得)
    RequestGood(idから商品情報を取得)
    InsertDOM(商品選択ボタンを配置)
    ShowPage(ページを表示)


    LoadPage --> RequestGoodsIds
    RequestGoodsIds --> RequestGood
    RequestGood --> InsertDOM
    InsertDOM --> |idの数だけ繰り返す|RequestGood
    InsertDOM --> ShowPage
```

```mermaid
    flowchart TD;

    SelectGoodsEvent(商品選択ボタンが押される)
    RequestGood(ボタンのイベントに格納されたidから商品情報を取得)
    InsertDOM(商品名や入札メニューといった各種要素を配置)
    AssignTargetID(target_goods_id変数にidを格納)

    SelectGoodsEvent --> RequestGood
    RequestGood --> InsertDOM
    InsertDOM --> AssignTargetID
```

```mermaid
    flowchart TD;

    BidEvent(入札ボタンが押される)
    CollectParams(target_goods_id変数から商品idを,入札メニューのテキストボックスから入札価格を取得)
    RequestBid(入札リクエストを送信)


    BidEvent --> CollectParams
    CollectParams --> RequestBid

```

```mermaid
    flowchart TD;

    IntervalEvent(5秒に1回呼ばれる)
    RequestGood(target_goods_idのidから商品情報を取得)
    RebuildDOM(入札履歴や現在価格,入札メニューの最低入札価格を更新)

    IntervalEvent --> RequestGood
    RequestGood --> RebuildDOM

```


```mermaid
    sequenceDiagram
    
    index.js ->> main.js: /auction/getにより全商品のidを要求
    main.js ->> index.js: 全商品のidを返す
    index.js ->> main.js: /auction/get/:idにより、idから商品データを要求
    main.js ->> index.js: idの一致する商品のデータを返す
```