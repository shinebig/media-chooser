if not window.Chute
	class window.Chute
		@setApp: (@app) ->
		
		@fill: (width, height, url) ->
			"#{ url }/#{ width }x#{ height }"
		
		@fit: (width, height, url) ->
			"#{ url }/fit/#{ width }x#{ height }"
		
		@width: (width, url) ->
			"#{ url }/w/#{ width }"
		
		@height: (height, url) ->
			"#{ url }/h/#{ height }"

class window.Chute.MediaChooser
	@choose: (params, callback) ->
		if 'function' is typeof params
			callback = params
			params = {}

		params.app = Chute.app
		params.chute_id = params.identifier
		params.identifier = "chute-identifier-#{ params.chute_id }"
		params.mode = 'collector' if not params.mode?
		params.popup = no if not params.popup?
		params.file_types = switch params.mediaTypes
			when 'images', 'image', 'picture', 'pictures' then 1
			when 'video', 'videos' then 2
			else 0

		params.file_limit = params.limit or 0
		params.picker_version = "v2"
		params.onSelectionComplete = (element, data) ->
			urls = []
			urls.push(asset.url) for asset in data.assets
			callback urls, data if callback
	
		id = parseInt Math.random() * 1000
		widget = jQuery "<div id=\"chute-#{ id }\"></div>"
		widget.appendTo 'body'
		params.widget_id = id
		chute "#chute-#{ id }", params
		browseButton = widget.find "a.chute-browseButton"
		browseButton.hide() if params.popup is no and params.mode is 'collector'
		
		setTimeout ->
			browseButton.click()
		, 500