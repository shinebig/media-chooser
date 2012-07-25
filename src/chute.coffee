class window.Chute
	@setApp: (@app) ->
	@setIdentifier: (@identifier) ->
	
	@choose: (params, callback) ->
		if 'function' is typeof params
			callback = params
			params = {}
		
		params.app = @app
		params.identifier = @identifier
		params.mode = 'collector' if not params.mode?
		params.popup = no if not params.popup?
		params.onSelectionComplete = (element, data)->
			callback data if callback
		
		id = parseInt(Math.random() * 1000)
		widget = $ "<div id=\"chute-#{ id }\"></div>"
		widget.appendTo 'body'
		chute("#chute-#{ id }", params);
		browseButton = widget.find 'a.chute-browseButton'
		browseButton.hide() if params.popup is no and params.mode is 'collector'
		setTimeout ->
			browseButton.click()
		, 500