$(document).ready(function () {
  getLinks();
  // deleteIdea();
  searchLinks();
});

function getLinks(){
  $.getJSON('/api/v1/links', function(data) {
    $.each(data, function(index, link){
      renderLinks(link)
    })
  });
};

function renderLinks(link) {
  $('#links-list').prepend(
    "<div class='card link' data-id='" + link.id
    + "' data-status='" + link.read_status
    + "'><div class='card-content'>"
    + "<span class='card-title'><p contentEditable='true' class='link-title'>"
    + link.title
    + "</p></span>"
    + "<p contentEditable='true' class='link-url'>"
    + link.url
    + "</p><p class='status'>Has this been read? "
    + link.read_status
    + "</p>"
    + "</div></div>"
  )
  editTitle();
  editUrl();
  // markRead();
  // decreaseQuality();
};

// function deleteIdea() {
//   $('#ideas-list').delegate('#delete-idea', 'click', function(){
//     var $idea = $(this).closest('.idea')

//     $.ajax({
//       type: 'DELETE',
//       url:  '/api/v1/ideas/'
//       + $idea.attr('data-id')
//       + '.json',
//       success: function(){
//         $idea.remove()
//       },
//       error: function(){
//         $idea.remove()
//         console.log('This Idea has already deleted')
//       }
//     })
//   })
// }

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

function markRead() {
  $('#mark-read').on('click', function(event){
    var $link = $(this).closest('.link');
    var $read_status = $($link).attr('data-status');

    var linkParams = {
      link: {
        read_status: true
      }
    }

    $.ajax({
      type: 'PUT',
      url: '/api/v1/ideas/'
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

// function decreaseQuality() {
//   $('#decrease-quality').on('click', function(event){
//     var $idea = $(this).closest('.idea');
//     var $quality = $($idea).attr('data-quality');
//     var thumbsDownMap = {
//       Genius: "Plausible",
//       Plausible: "Swill",
//       Swill: "Swill"
//     }

//     var ideaParams = {
//       idea: {
//         quality: thumbsDownMap[$quality]
//       }
//     }

//     $.ajax({
//       type: 'PUT',
//       url: '/api/v1/ideas/'
//       + $idea.attr('data-id')
//       + '.json',
//       data: ideaParams,
//       success: function(idea){
//         updateQuality($idea, idea.quality);
//       }
//     });
//   });
// }