jQuery(document).ready(function($) {

  // Live search
  $("[name='filter_name']").on("input", function() { 
    var searchTerm = $(this).val().toLowerCase().trim();
    var type = $("[name='type']").val(); // event or information
    var filterType = $("[name='filter_type']").val();

    // Select all grid items under the .unicamp-grid container
    var $items = $(".unicamp-grid .grid-item");

    // Loop and filter
    $items.each(function() {
      var $item = $(this);
      var title = $item.find(".event-title").text().toLowerCase();

      // Match both type and search text
      if (
        title.includes(searchTerm) || searchTerm === "" // if matches or empty
      ) {
        $item.show();
      } else {
        $item.hide();
      }
    });
  });

});
