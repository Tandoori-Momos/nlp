
var headlines = [];

$('#bt').click( function() {
  var str = $('#search').val();

  check(str);
  console.log('ok');
});
function check(req) {
  var parse_req = req.split(" ").join("+");
  console.log(parse_req);


   $.ajax({
          url: 'https://api.rss2json.com/v1/api.json',
          method: 'GET',
          dataType: 'json',
          data: {
              rss_url: 'https://news.google.com/news/section?cf=all&output=rss&ned=us&q'+'='+ parse_req,
              api_key: 'vadnjhlhlu6if4dxymwvhaw6sdftthlza3pyzgza', // put your api key here
              count: 25
          }
  }).done(function (response) {
      if(response.status != 'ok'){ throw response.message; }

      console.log('====== ' + response.feed.title + ' ======');

      for(var i in response.items){
          var item = response.items[i];
          console.log(item.title);

          var rep_pre = item.title.substring(item.title.indexOf('-') + 1, item.title.length);
          var rep = rep_pre.trim();
          headlines.push(rep);

        }


    });

    for(var i = 0; i < headlines.length; i++)
    {
      console.log(headlines[i]);
    }
}
