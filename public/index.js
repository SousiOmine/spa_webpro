"use strict";

const goods_zone = document.querySelector("#goods_list_zone");
const target_goods_zone = document.querySelector("#target_goods_zone");

let target_goods_id = "";

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

				const params = {
					// URL Encode
					method: "POST",
					body: "",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
				};

				const url = "/api/v1/auction/get/" + goods_id;
				fetch(url, params)
					.then((response) => {
						if (!response.ok) throw new Error("check all error");
						return response.json();
					})
					.then((response) => {
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
function road_detail(id)
{
	target_goods_id = id;

	const params = {
		// URL Encode
		method: "POST",
		body: "",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};
	const url = "/api/v1/auction/get/" + id;
	fetch(url, params)
		.then((response) => {
			if (!response.ok) throw new Error("check all error");
			return response.json();
		})
		.then((response) => {
			console.log(response);

			//メイン商品ゾーンを初期化
			target_goods_zone.innerHTML = "";

			const template = `
				<div>
					<p>${response.good.title}</p>
					
					<div class="price_area">
						<p>現在の価格</p>
						<p>${response.good.history[response.good.history.length - 1].price}</p>
					</div>

					<div class="bid_area">
						<p>入札する</p>
						<label>入札価格</label>
						<input type="number" min="${Number(response.good.history[response.good.history.length - 1].price) + 1}">
						<button type="button">入札</button>
					</div>
				</div>
			`;
			target_goods_zone.innerHTML = template;

		});
}

road_all();
