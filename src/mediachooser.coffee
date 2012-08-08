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
	@validateNumber: (value, rule) ->
		min = -Infinity
		minEqual = no
		max = Infinity
		maxEqual = no
		
		result = />=\s?([0-9.]+)/.exec rule
		if result
			min = parseFloat result[1]
			minEqual = yes
		
		result = />\s?([0-9.]+)/.exec rule
		if result
			min = parseFloat result[1]
			minEqual = no
		
		result = /<=\s?([0-9.]+)/.exec rule
		if result
			max = parseFloat result[1]
			maxEqual = yes
		
		result = /<\s?([0-9.]+)/.exec rule
		if result
			max = parseFloat result[1]
			maxEqual = no
		
		result = /^\=\s?([0-9.]+)$/.exec rule
		if result
			min = max = parseFloat result[1]
			minEqual = maxEqual = yes
		
		if min != -Infinity
			if minEqual
				return no if not (value >= min)
			else return no if not (value > min)
		
		if max != Infinity
			if maxEqual
				return no if not (value <= max)
			else return no if not (value < max)
		
		yes
	
	@defaults: {}
	@setDefaults: (@defaults = {}) ->
	
	@choose: (params, callback) ->
		if 'function' is typeof params
			callback = params
			params = {}

		params.app = Chute.app or params.app or @defaults.app
		params.chute_id = params.album or @defaults.album
		if not params.app
			throw new Error 'Chute.MediaChooser requires app parameter'
		
		params.identifier = "chute-identifier-#{ params.chute_id }" if params.chute_id
		params.mode = ('collector' or @defaults.mode) if not params.mode?
		params.popup = (no or @defaults.popup) if not params.popup?
		params.file_types = switch (params.mediaTypes or @defaults.mediaTypes)
			when 'images', 'image', 'picture', 'pictures' then 1
			when 'video', 'videos' then 2
			else 0

		params.file_limit = params.limit or @defaults.limit or 0
		params.picker_version = "v2"
		constraintsLength = 0
		if @defaults.constraints and not params.constraints
			params.constraints = @defaults.constraints
		
		if params.constraints
			for key of params.constraints
				constraintsLength++ if params.constraints.hasOwnProperty key
		
		params.onSelectionComplete = (element, data) =>
			urls = []
			filteredData = {}
			for key of data
				filteredData[key] = data[key] if data.hasOwnProperty key
			
			filteredData.assets = []
			
			for asset in data.assets
				if constraintsLength > 0
					valid = yes
					for key of params.constraints
						valid = no if params.constraints.hasOwnProperty(key) and not @validateNumber(asset[key], params.constraints[key])
					
					if valid
						filteredData.assets.push asset
						urls.push asset.url
				else
					filteredData.assets.push asset
					urls.push asset.url
			
			callback urls, filteredData if callback
		
		id = parseInt Math.random() * 1000
		widget = jQuery "<div id=\"chute-#{ id }\"></div>"
		widget.appendTo 'body'
		params.widget_id = id
		params.onComplete = ->
			browseButton = widget.find 'a.chute-browseButton'
			browseButton.hide() if not params.popup and params.mode is 'collector'
			browseButton.click()
		
		chute "#chute-#{ id }", params