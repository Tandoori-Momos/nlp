function check() {
  var parse_req = req.split(" ").join("+");
  console.log(parse_req);

  $.ajax({
          url: 'https://api.rss2json.com/v1/api.json',
          method: 'GET',
          dataType: 'json',
          data: {
              rss_url: 'https://news.google.com/news/section?cf=all&output=rss&ned=us&q'+'='+ parse_req_local,
              api_key: 'vadnjhlhlu6if4dxymwvhaw6sdftthlza3pyzgza', // put your api key here
              count: 25
          }
  })
}
