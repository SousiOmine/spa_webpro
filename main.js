"use strict";

// Webページ公開に使用するポート番号の設定
const PORT = 8080;

const express = require("express");
const app = express();



app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// API(v1)をまとめるルーター
const api_v1_router = express.Router();
app.use("/api/v1", api_v1_router);


const start_date = new Date();
console.log(start_date);

// 商品リスト
let goods = []
goods.push({ id: "afsdioufsahg", title: "スーパーカー 1円スタート", owner: "藤木", deadline_time: new Date().setMinutes(new Date().getMinutes() + 3),history: [] })
goods[0].history.push({ from: "藤木", price: 1 })

goods.push({ id: "fasdfasdfsdagf", title: "大学うさぎの兜焼き", owner: "王泥喜", deadline_time: new Date().setMinutes(new Date().getMinutes() + 5),history: [] })
goods[1].history.push({ from: "王泥喜", price: 100 })


app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/detail/:id", (req, res) => {
    res.redirect("/public/index.html");
})

//全商品id取得
api_v1_router.post("/auction/get", (req, res) =>
{
    let goods_ids = [];
    for (const good of goods)
    {
        goods_ids.push(good.id);
    }
    console.log(goods_ids);
    res.json({ all_goods_ids: goods_ids });
});

//idから1つの商品取得
api_v1_router.post("/auction/get/:id", (req, res) => {
    const id = req.params.id;
    const good = goods.find(good => good.id === id);
    console.log(good)
    res.json({ good });
});

api_v1_router.post("/auction/bid", (req, res) => {

    console.log(req.body);
    let result = false;

    const target_goods_id = req.body.target_goods_id;
    const from = req.body.from;
    const price = Number(req.body.price);

    const good = goods.find(good => good.id === target_goods_id);
    good.history.push({ from, price });

    result = true;
    res.json({ result: result });
});

app.listen(PORT, () => console.log("Example app listening on port 8080!"));