$(document).ready(function () {
  getLinks();
  searchLinks();

  $('#read').on('click', function() {
    $('.read-unread').hide();
    $('.read-read').show();
  });

  $('#unread').on('click', function() {
    $('.read-unread').show();
    $('.read-read').hide();
  });
});

function sortAlphabetical() {
 $('#sort-alphabetical').on('click', function() {
    var $link  = $('.link');

    $link.sort(function (a, b) {
      var first = $(a).find('.card-title').text().toLowerCase();
      var second = $(b).find('.card-title').text().toLowerCase();
      return (first < second) ? 1 : 0;
    });

    $.each($link, function(index, element) {
      $('#links-list').prepend(element);
    });
  });
};

function getLinks(){
  $.getJSON('/api/v1/links', function(data) {
    $.each(data, function(index, link){
      renderLinks(link)
    })
  });
};

function renderLinks(link) {
  $('#links-list').prepend(
    "<div class='card link read-" + link.read_status
    +"' data-id='" + link.id
    + "' data-status='" + link.read_status
    + "'><div class='card-content'>"
    + "<span class='card-title'><p contentEditable='true' class='link-title'>"
    + link.title
    + "</p></span>"
    + "<p contentEditable='true' class='link-url'>"
    + link.url
    + "</p><p class='status'>Mark as "
    + link.read_status
    + "</p>"
    + "<div class='btn' id='change-status'>Change Read Status</div></div>"
  )
  editTitle();
  editUrl();
  changeStatus();
  sortAlphabetical();
};

function searchLinks() {
  $('#search').keyup(function() {
    var input = $('#search').val().toLowerCase();

    $('.link').each(function (index, link) {
      var title = $(link).find('p').text().toLowerCase();
      var body = $(link).find('p').text().toLowerCase();

      var isMatching = (title + body).indexOf(input) !== -1;
      $(link).toggle(isMatching);
    });
  });
}

function editTitle() {
  $('.link-title').keydown(function (event) {
    if(event.keyCode == 13) {
      event.preventDefault();
      var $input = event.currentTarget.textContent;
      var $link = $(this).closest('.link');
      var linkParams  = {
        link: {
          title: $input
        }
      }

      $.ajax({
        type: 'PUT',
        url:  '/api/v1/links/'
        + $link.attr('data-id')
        + '.json',
        data: linkParams,
        success: function(link){
          $(event.target).blur();
          updateTitle($link, link.title);
        },
        error: function(){
          console.log('You title cannot be blank.');
        }
      });
    }
  });
}

function updateTitle(link, title){
  $(link).find('.link-title').html(title);
}

function editUrl() {
  $('.link-url').keydown(function (event) {
    if(event.keyCode == 13) {
      event.preventDefault();
      var $input = event.currentTarget.textContent;
      var $link = $(this).closest('.link');
      var linkParams  = {
        link: {
          url: $input
        }
      }

      $.ajax({
        type: 'PUT',
        url:  '/api/v1/links/'
        + $link.attr('data-id')
        + '.json',
        data: linkParams,
        success: function(link){
          $(event.target).blur();
          updateUrl($link, link.url);
        },
        error: function(){
          console.log('There was an error with your input. Try again.')
        }
      })
    }
  })
}

function updateUrl(link, url){
  $(link).find('.link-body').html(url);
}

function changeStatus() {
  $('#change-status').on('click', function(event){
    var $link = $(this).closest('.link');
    var $read_status = $($link).attr('data-status');
    var changeMap = {
      unread: "read",
      read: "unread",
    }

    var linkParams = {
      link: {
        read_status: changeMap[$read_status]
      }
    }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/links/'
      + $link.attr('data-id')
      + '.json',
      data: linkParams,
      success: function(link){
        updateStatus($link, link.read_status);
      }
    });
  });
}

function updateStatus(link, status){
  $(link).find('.read_status').html('Status: ' + status);
  $(link).attr('data-status', status);
}