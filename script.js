$(document).ready(function(){

	$('#form-search').on('submit', function(e){
		e.preventDefault();
		
		var search_term = $('#input-search').val().trim();

		// HTTP request using Axios
		axios.get('https://en.wikipedia.org/w/api.php', {
		    params: {
		    	action: 'opensearch',
				search: search_term,
				limit : 10,
				namespace: 0,
		      	format : 'json',
				origin : '*',
		    }
		  })
		.then(function (response) {
		
			var titles = response.data[1],
				excerpts = response.data[2],
				links = response.data[3],
				count = response.data[1].length;
				html = '';

			$("ul#wiki-entries").html('');	

			console.log(count);
			for (var i = 0; i < count; i++) {
				html = `<a href="${links[i]}" target="_blank" id="entry" class="animated fadeInUp"><h3>${titles[i]}</h3><p>${excerpts[i]}</p></a>`;	
				$("ul#wiki-entries").append(html);
			}

		})
		.catch(function (error) {
			console.log(error);
		});
	})
})