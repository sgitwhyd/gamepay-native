console.log("connected");

const item = document.querySelectorAll(".choice__item");
const paymentMerchant = document.querySelectorAll(".payment-item");
const paymentBoxContainer = document.getElementById("box__content_payment");
const buttonIncrement = document.querySelector(".btn-increment");
const buttonDecrement = document.querySelector(".btn-decrement");
const paymentPrice = document.querySelectorAll(".payment-price");
const btnCheckcout = document.querySelector(".btn-checkout");
// input
const inputQty = document.getElementById("inputQuantity");
const playerId = document.getElementById("playerId");
const playerServer = document.getElementById("playerServer");
const promoCode = document.getElementById("promoCode");
const playerWhatsapp = document.getElementById("playerWhatsapp");

// modal
const modalPlayerId = document.getElementById("modal-player-id");
const modalPlayerServer = document.getElementById("modal-player-server");
const modalPlayerItem = document.getElementById("modal-player-item");
const modalPlayerPayment = document.getElementById("modal-player-payment");
const modalPlayerService = document.getElementById("modal-player-service");

btnCheckcout.addEventListener("click", () => {
	if (playerId.value === "") {
		alert("Player ID tidak boleh kosong");
		return;
	}

	if (playerServer.value === "") {
		alert("Player Server tidak boleh kosong");
		return;
	}

	if (itemTitle === "") {
		alert("Pilih item terlebih dahulu");
		return;
	}

	if (paymentMerchantName === "") {
		alert("Pilih metode pembayaran terlebih dahulu");
		return;
	}

	modalPlayerId.innerHTML = `: ${playerId.value}`;
	modalPlayerServer.innerHTML = `: ${playerServer.value}`;
	modalPlayerItem.innerHTML = `: ${itemTitle}`;
	modalPlayerPayment.innerHTML = `: ${paymentMerchantName}`;
	modalPlayerService.innerHTML = `: Mobile Legends`;
});

let qty = inputQty.value;
let itemTitle = "";
let itemPrize = 0;
let paymentMerchantName = "";
let basePrize = 0;

paymentMerchant.forEach((merchant) => {
	merchant.addEventListener("click", () => {
		paymentMerchant.forEach((merchant) => {
			merchant.classList.remove("active");
		});
		merchant.classList.add("active");

		btnCheckcout.setAttribute("data-bs-toggle", "modal");
		btnCheckcout.setAttribute("data-bs-target", "#cart-modal");

		paymentMerchantName = merchant.querySelector("h5").textContent;
		paymentBoxContainer.innerHTML = boxPayment(
			itemTitle,
			itemPrize,
			paymentMerchantName
		);
	});
});

inputQty.addEventListener("change", () => {
	const prizeResult = basePrize * inputQty.value;
	itemPrize = prizeResult;
	const formatedPrize = prizeResult.toLocaleString("id-ID");
	itemPrize = formatedPrize;

	paymentPrice.forEach((price) => {
		price.textContent = `Rp ${itemPrize * qty}`;
	});

	paymentBoxContainer.innerHTML = boxPayment(
		itemTitle,
		itemPrize,
		paymentMerchantName
	);
});

buttonIncrement.addEventListener("click", () => {
	inputQty.value = inputQty.value > 0 ? parseInt(inputQty.value) + 1 : 1;
	const prizeResult = basePrize * inputQty.value;
	itemPrize = itemPrize + prizeResult;
	const formatedPrize = prizeResult.toLocaleString("id-ID");

	itemPrize = formatedPrize;

	qty = inputQty.value;

	paymentPrice.forEach((price) => {
		price.textContent = `Rp ${itemPrize}`;
	});
	paymentBoxContainer.innerHTML = boxPayment(
		itemTitle,
		itemPrize,
		paymentMerchantName
	);
});

buttonDecrement.addEventListener("click", () => {
	inputQty.value = inputQty.value > 1 ? parseInt(inputQty.value) - 1 : 1;
	const prizeResult = basePrize * inputQty.value;
	itemPrize = itemPrize - prizeResult;
	const formatedPrize = prizeResult.toLocaleString("id-ID");
	itemPrize = formatedPrize;

	qty = inputQty.value;

	paymentPrice.forEach((price) => {
		price.textContent = `Rp ${itemPrize}`;
	});

	paymentBoxContainer.innerHTML = boxPayment(
		itemTitle,
		itemPrize,
		paymentMerchantName
	);
});

item.forEach((product) => {
	product.addEventListener("click", () => {
		item.forEach((choice) => {
			choice.classList.remove("active");
		});

		product.classList.add("active");

		const title = product.querySelector("h5").textContent;
		const prize = product.querySelector(".item-prize").textContent;
		const prizeNum = parseInt(prize.split(" ")[1].split(".").join(""));
		const formatedPrize = prizeNum.toLocaleString("id-ID");

		const result = prizeNum * qty;
		const formatResult = result.toLocaleString("id-ID");

		itemTitle = title;
		itemPrize = qty > 0 ? formatResult : formatedPrize;
		basePrize = prizeNum;

		paymentPrice.forEach((price) => {
			price.textContent = `Rp ${itemPrize}`;
		});

		paymentBoxContainer.innerHTML = boxPayment(
			itemTitle,
			itemPrize,
			paymentMerchantName
		);
	});
});

const boxPayment = (
	title,
	prizeNum,
	merchant
) => `<img src="./assets/images/ml.png" alt="" />
								<div class="choosed-item-info">
									<div class="title">${title}</div>
									<div class="price">Rp ${prizeNum}</div>
									<div class="payment"> ${` ${merchant ? `via ${merchant}` : ""}`}</div>
								</div>`;
