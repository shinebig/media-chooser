String::fill = (width, height) ->
	if /media\.getchute\.com/.test(@) then "#{ @ }/#{ width }x#{ height }" else @

String::fit = (width, height) ->
	if /media\.getchute\.com/.test(@) then "#{ @ }/fit/#{ width }x#{ height }" else @

String::width = (width) ->
	if /media\.getchute\.com/.test(@) then "#{ @ }/w/#{ width }" else @

String::height = (height) ->
	if /media\.getchute\.com/.test(@) then "#{ @ }/h/#{ height }" else @

if not window.Chute
	class window.Chute
		@setApp: (@app) ->

class window.Chute.MediaChooser
	@setChuteIdentifier: (@identifier) ->
	
	@setup: (params, callback) ->
		if typeof params is 'string'
			params = selector: params
		
		params.app = Chute.app
		params.chute_id = params.identifier or @identifier
		params.identifier = "chute-identifier-#{ params.chute_id }"
		params.mode = 'collector' if not params.mode?
		params.popup = no if not params.popup?
		params.file_types = switch params.allow
			when 'images', 'image', 'picture', 'pictures' then 1
			when 'video', 'videos' then 2
			else 0
		
		params.file_limit = params.limit or 0
		params.picker_version = "v2"
		params.onSelectionComplete = (element, data) ->
			urls = []
			urls.push(asset.url) for asset in data.assets
			callback urls, data if callback
		
		if not params.selector
			id = parseInt Math.random() * 1000
			widget = jQuery "<div id=\"chute-#{ id }\"></div>"
			widget.appendTo 'body'
			params.widget_id = id
			chute "#chute-#{ id }", params
			browseButton = widget.find "a.chute-browseButton"
			browseButton.hide() if params.popup is no and params.mode is 'collector'
			return browseButton
		
		chute params.selector, params
			
	
	@choose: (params, callback) ->
		if 'function' is typeof params
			callback = params
			params = {}
		
		browseButton = @setup params, callback
		setTimeout ->
			browseButton.click()
		, 500