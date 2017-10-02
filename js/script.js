'use strict';

$(document).ready(() => {
	let $els = {
		close: $('.close'),
		input: $('main > input'),
		result: $('.result'),
		popup1: $('#popup1').hide(),
		content: $('.b-popup-content')
	};

	$els.close.click(() => {
		$els.popup1.hide();
	});

	$els.input.keyup($.debounce(300,
		() => {
			let target = $els.input.val();
			let xhr = $.get(
				'http://api.giphy.com/v1/gifs/search?q=' + target + '&api_key=nUWXxRtLEyuUU0nH8ZtTilLHna2Aj0tf&lang=ru'
			);

			xhr.done((data) => {
				let frag = document.createDocumentFragment();
				for (let item of data.data) {
					let img = document.createElement('img');
					img.src = item.images.fixed_width.url;
					img.onclick = () => {
						$els.popup1.show();
						$els.content.html(
							'URL=' + item.url + ', <br> Rating=' + item.rating
							+ ', <br> Import_datetime=' + item.import_datetime
						);
					};
					frag.appendChild(img);
				}
				$els.result.html('').append(frag);
			});
		}
	));
});