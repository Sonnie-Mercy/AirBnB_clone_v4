$(function() {
  $('input[type="checkbox"]').on("change", () => {
    const amenityNames = [];
    $('input[type="checkbox"]:checked').each((index, element) => {
      amenityNames[index] = $(element).attr('data-name');
    });
    $('.amenities h4').text(amenityNames.join(", "));
  });
});

$(function() {
  function updateApiStatus() {
    $('DIV#api_status').removeClass('available');
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      }
    });
  }

  updateApiStatus();

  setInterval(updateApiStatus, 10000);
});
