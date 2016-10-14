$(window).load(function(){
  $('body').transition({opacity: 1}, 3000, 'in-out');

  var articles = {};

  $.ajax({
    url: "json/article.json",
    dataType: "json",
    async: false,
    success: function(json) {
      articles = json;
    }
  });

  var id = 0;
  for (var article of articles) {
    id++;
    $('#leftContent').append('<section class="works"><h1 class="title"><span id="'+ id +'">'+ article["work_title"] +'</span></h1><p>0'+ id +'</p></section>');
  }

  var image_flag = false;
  var detail_flag = false;

  titleHover('.title span');
  titleClick('.title span');
  closeDetail('#close span');

  function titleHover(title){
    $(title).hover(
      function(){
        var id = $(this).attr('id');
        var id_str = 'img/0' + id + '.jpg';
        if(!image_flag && !detail_flag){
          image_flag = true;
          $('#message').transition({
            opacity: 0
          }, 100, function(){
            $('#rightContent').prepend('<div id="test"></div>');
            $('#test').css("background-image", "url('" + id_str +"')");
            $('#test').transition({
              opacity: 1,
              scale: [1, 1]
            }, 300, 'cubic-bezier(1,0.5,0.38,1)', function(){
            });
          });
        }
      },
      function(){
        if(!detail_flag){
          $('#test').transition({
            opacity: 0,
            scale: [1, 0]
          }, 400, 'cubic-bezier(1,0,0.38,1)', function(){
            $.when($('#test').remove())
            .then($('#message').transition({
              opacity: 1
            }, 200, function(){
              image_flag = false;
            }));
          });
        }
      }
    );
  }

  function titleClick(title){
    $(title).click(function(){
      var id = $(this).attr('id');
      detail_flag = true;
      $('#test').transition({
        opacity: 0,
        scale: [1, 0]
      }, 400, 'cubic-bezier(1,0,0.38,1)', function(){
        $.when($('#test').remove())
        .then(function(){
          image_flag = false;
          $('header').transition({
            opacity: 0,
          }, 200);
          $('#container').transition({
            opacity: 0,
          }, 500, function(){
            detail_indicate(id);
            $('#detail_container').transition({
              scale: [1, 1],
              opacity: 1,
            }, 500);
          });
        });
      });
    });
  }

  function closeDetail(close){
    $(document).on('click', close, function(){
      $('#detail_container').transition({
        scale: [1, 0],
        opacity: 0
      }, 500, function(){
        $(this).remove();
        $('header').transition({
          opacity: 1,
        }, 200);
        $('#container').transition({
          opacity: 1,
        }, 500);
        $('#message').transition({
          opacity: 1
        }, 500);
        image_flag = false;
        detail_flag= false;
      });
    });
  }

  function detail_indicate(num){
    var detail = articles[num-1];
    $('body').prepend('<div id="detail_container"><div id="det_header"><div id="det_logo"><span>PicaVinci</span></div><div id="close"><span>close</span><div></div></div>');
    $('#detail_container').append('<div id="det_main"><div id="movie"><iframe width="853" height="480" src="' + detail["movie"] + '" frameborder="0" allowfullscreen></iframe></div></div>');
    $('#det_main').append('<div id="work"><div id="work_title"><h2>' + detail["work_title"] + '</h2></div><div id="description"></div></div>');
    for(var i=0; i<detail["str"].length; i++){
      $('#description').append('<p>'+ detail["str"][i] +'</p>');
    }
  }

});