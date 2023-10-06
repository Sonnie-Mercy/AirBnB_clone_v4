$(function() {
  $('input[type="checkbox"]').on("change", () => {
    const amenityNames = [];
    $('input[type="checkbox"]:checked').each((index, element) => {
      amenityNames[index] = $(element).attr('data-name');
    });
    $('.amenities h4').text(amenityNames.join(", "));
  });
});   
