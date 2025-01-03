"use strict";

const goods_zone = document.querySelector("#goods_list_zone");

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
						cover.className = "cover";
						let goods_title_area = document.createElement("p");
						goods_title_area.className = "title";
						goods_title_area.innerText = response.good.title;

						goods_zone.appendChild(goods_title_area);
					});
			}
		});
}

road_all();
