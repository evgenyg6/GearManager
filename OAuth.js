$(document).ready(function() {


    if (window.location.href.indexOf("code") > -1) {
      var url = window.location.href
      var OAuth= url.split('?code=')[1]
      var data = {
        grant_type: 'authorization_code',
        code: OAuth
      }
      var headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      return $http({
			method: 'POST',
			url: 'https://www.bungie.net/Platform/App/OAuth/Token/',
			headers: headers,
			data: data
			//transformRequest: false

		}).then(function(response) {
			var info = response.data;
			console.log('GetOAuthAccessToken', info);
    }
  }
});
