
if (!window.Chute) {
  window.Chute = (function() {

    function Chute() {}

    Chute.setApp = function(app) {
      this.app = app;
    };

    Chute.fill = function(width, height, url) {
      return "" + url + "/" + width + "x" + height;
    };

    Chute.fit = function(width, height, url) {
      return "" + url + "/fit/" + width + "x" + height;
    };

    Chute.width = function(width, url) {
      return "" + url + "/w/" + width;
    };

    Chute.height = function(height, url) {
      return "" + url + "/h/" + height;
    };

    return Chute;

  })();
}

window.Chute.MediaChooser = (function() {

  function MediaChooser() {}

  MediaChooser.validateNumber = function(value, rule) {
    var max, maxEqual, min, minEqual, result;
    min = -Infinity;
    minEqual = false;
    max = Infinity;
    maxEqual = false;
    result = />=\s?([0-9.]+)/.exec(rule);
    if (result) {
      min = parseFloat(result[1]);
      minEqual = true;
    }
    result = />\s?([0-9.]+)/.exec(rule);
    if (result) {
      min = parseFloat(result[1]);
      minEqual = false;
    }
    result = /<=\s?([0-9.]+)/.exec(rule);
    if (result) {
      max = parseFloat(result[1]);
      maxEqual = true;
    }
    result = /<\s?([0-9.]+)/.exec(rule);
    if (result) {
      max = parseFloat(result[1]);
      maxEqual = false;
    }
    result = /^\=\s?([0-9.]+)$/.exec(rule);
    if (result) {
      min = max = parseFloat(result[1]);
      minEqual = maxEqual = true;
    }
    if (min !== -Infinity) {
      if (minEqual) {
        if (!(value >= min)) {
          return false;
        }
      } else {
        if (!(value > min)) {
          return false;
        }
      }
    }
    if (max !== Infinity) {
      if (maxEqual) {
        if (!(value <= max)) {
          return false;
        }
      } else {
        if (!(value < max)) {
          return false;
        }
      }
    }
    return true;
  };

  MediaChooser.defaults = {};

  MediaChooser.setDefaults = function(defaults) {
    this.defaults = defaults != null ? defaults : {};
  };

  MediaChooser.choose = function(params, callback) {
    var constraintsLength, id, key, widget,
      _this = this;
    if ('function' === typeof params) {
      callback = params;
      params = {};
    }
    params.app = Chute.app || params.app || this.defaults.app;
    params.chute_id = params.album || this.defaults.album;
    if (!params.app) {
      throw new Error('Chute.MediaChooser requires app parameter');
    }
    if (params.chute_id) {
      params.identifier = "chute-identifier-" + params.chute_id;
    }
    if (!(params.mode != null)) {
      params.mode = 'collector' || this.defaults.mode;
    }
    if (!(params.popup != null)) {
      params.popup = false || this.defaults.popup;
    }
    params.file_types = (function() {
      switch (params.mediaTypes || this.defaults.mediaTypes) {
        case 'images':
        case 'image':
        case 'picture':
        case 'pictures':
          return 1;
        case 'video':
        case 'videos':
          return 2;
        default:
          return 0;
      }
    }).call(this);
    params.inclusions = (params.services || this.defaults.services || ['upload', 'facebook', 'picasa', 'instagram', 'flickr']).join(',');
    params.file_limit = params.limit || this.defaults.limit || 0;
    if (params.version || this.defaults.version) {
      params.picker_version = "v" + (params.version || this.defaults.version);
    } else {
      params.picker_version = jQuery.browser.msie && jQuery.browser.version.slice(0, 2) === '7.' ? 'v1' : 'v2';
    }
    constraintsLength = 0;
    if (this.defaults.constraints && !params.constraints) {
      params.constraints = this.defaults.constraints;
    }
    if (params.constraints) {
      for (key in params.constraints) {
        if (params.constraints.hasOwnProperty(key)) {
          constraintsLength++;
        }
      }
    }
    params.onSelectionComplete = function(element, data) {
      var asset, filteredData, urls, valid, _i, _len, _ref;
      urls = [];
      filteredData = {};
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          filteredData[key] = data[key];
        }
      }
      filteredData.assets = [];
      _ref = data.assets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        asset = _ref[_i];
        if (constraintsLength > 0) {
          valid = true;
          for (key in params.constraints) {
            if (params.constraints.hasOwnProperty(key) && !_this.validateNumber(asset[key], params.constraints[key])) {
              valid = false;
            }
          }
          if (valid) {
            filteredData.assets.push(asset);
            urls.push(asset.url);
          }
        } else {
          filteredData.assets.push(asset);
          urls.push(asset.url);
        }
      }
      if (callback) {
        return callback(urls, filteredData);
      }
    };
    id = parseInt(Math.random() * 1000);
    widget = jQuery("<div id=\"chute-" + id + "\"></div>");
    widget.appendTo('body');
    params.widget_id = id;
    params.onComplete = function() {
      var browseButton;
      browseButton = widget.find('a.chute-browseButton');
      if (!params.popup && params.mode === 'collector') {
        browseButton.hide();
      }
      return browseButton.click();
    };
    return __chute("#chute-" + id, params);
  };

  return MediaChooser;

})();
