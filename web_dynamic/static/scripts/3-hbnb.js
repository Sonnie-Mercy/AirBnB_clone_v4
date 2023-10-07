$(function() {
  $('input[type="checkbox"]').on("change", () => {
    const amenityNames = [];
    $('input[type="checkbox"]:checked').each((index, element) => {
      amenityNames[index] = $(element).attr('data-name');
    });
    $('.amenities h4').text(amenityNames.join(", "));
  });
});
/*
$(function() {
  function updateApiStatus() {
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
  }

  updateApiStatus();

  setInterval(updateApiStatus, 5000);
});
*/
$(function() {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    dataType: 'json',
    data: JSON.stringify({}),
    headers: {
	'Content-Type': 'application/json'
    },
    success: (data) => {
      $.each(data, (index, place) => {
	const html_article = `
	  <article>
          <div class="title_box">
            <h2>${ place.name }</h2>
            <div class="price_by_night">$${ place.price_by_night }</div>
          </div>
          <div class="information">
            <div class="max_guest">${ place.max_guest } Guest${ place.max_guest === 1 ? '' : 's'}</div>
            <div class="number_rooms">${ place.number_rooms } Bedroom${ place.number_rooms === 1 ? '' : 's'}</div>
            <div class="number_bathrooms">${ place.number_bathrooms } Bathroom${ place.number_bathrooms === 1 ? '' : 's' }</div>
          </div>
          <div class="description">
           ${ place.description }
          </div>
        </article>`;
        $('section.places').append(html_article);
      });
    }
  });
});
