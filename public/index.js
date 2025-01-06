"use strict";

const goods_zone = document.querySelector("#goods_list_zone");
const target_goods_zone = document.querySelector("#target_goods_zone");

let target_goods_id = "";

window.addEventListener("DOMContentLoaded", function () {
	//5秒に1回、入札履歴を取得し更新
	setInterval(() => {
		road_bid_history(target_goods_id);
	}, 5000);
});

function fetchGoodsFromId(id) {
	const params = {
		// URL Encode
		method: "POST",
		body: "",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};
	const url = "/api/v1/auction/get/" + id;

	return fetch(url, params).then((response) => {
		if (!response.ok) throw new Error("check all error");
		return response.json();
	});
}

// 全商品の選択ボタンを出す
function road_all() {
	const params = {
		// URL Encode
		method: "POST",
		body: "",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	const url = "/api/v1/auction/get";
	fetch(url, params)
		.then((response) => {
			if (!response.ok) throw new Error("check all error");
			return response.json();
		})
		.then((response) => {
			// 商品の取得に成功
			console.log(response.all_goods_ids);

			for (const goods_id of response.all_goods_ids) {
				fetchGoodsFromId(goods_id).then((response) => {
					// 商品の取得に成功
					console.log(response);

					let cover = document.createElement("div");
					cover.id = "cover_" + response.good.id;

					cover.addEventListener("click", () => {
						road_detail(response.good.id);
					});

					let goods_title_area = document.createElement("button");
					goods_title_area.className = "title";
					goods_title_area.innerText = response.good.title;

					cover.appendChild(goods_title_area);
					goods_zone.appendChild(cover);
				});
			}
		});
}

// 単一商品をメイン画面に出す
function road_detail(id) {
	target_goods_id = id;

	fetchGoodsFromId(id).then((response) => {
		console.log(response);

		//メイン商品ゾーンを初期化
		target_goods_zone.innerHTML = "";

		const template = `
				<div>
					<p>${response.good.title}</p>
					
					<div class="price_area">
						<p>現在の価格</p>
						<p id="now_price">${response.good.history[response.good.history.length - 1].price}</p>
						<p>入札履歴<p>
						<div id="bid_history_zone">

						</div>
					</div>

					<div class="bid_area">
						<p>入札する</p>
						<label>入札価格</label>
						<input id="bid_input_price" type="number" min="${
							Number(
								response.good.history[response.good.history.length - 1].price
							) + 1
						}">
						<button id="bid_button" type="button">入札</button>
					</div>
				</div>
			`;
		target_goods_zone.innerHTML = template;

		//入札ボタンを押したときの入札イベントを定義
		const bid_button = document.getElementById("bid_button");
		bid_button.addEventListener("click", () => {
			bid(
				response.good.id,
				Number(document.getElementById("bid_input_price").value)
			);
		});

		road_bid_history(response.good.id);
		
	});
}

// 入札履歴をDOMに追加する
function road_bid_history(id) {
	fetchGoodsFromId(id).then((response) => {
		console.log(response);

		const bid_history_zone = document.getElementById("bid_history_zone");
		bid_history_zone.innerHTML = "";
		for (const history of response.good.history) {
			const his = document.createElement("p");
			his.innerText = history.from + "さん " + history.price + "円";
			bid_history_zone.appendChild(his);
		}

		const now_price = document.getElementById("now_price");
		now_price.innerText = response.good.history[response.good.history.length - 1].price;

		const bit_input = document.getElementById("bid_input_price");
		bit_input.value = Number(response.good.history[response.good.history.length - 1].price + 1);
	});
}

function bid(target_goods_id, price) {
	console.log(target_goods_id, price);
	const params = {
		method: "POST",
		body:
			"target_goods_id=" +
			target_goods_id +
			"&from=" +
			"webuser" +
			"&price=" +
			price,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	const url = "/api/v1/auction/bid";
	fetch(url, params)
		.then((response) => {
			if (!response.ok) throw new Error("check all error");
			return response.json();
		})
		.then((response) => {
			console.log(response);
		});
}

road_all();
