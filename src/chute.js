// Generated by CoffeeScript 1.3.3

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

  MediaChooser.setChuteIdentifier = function(identifier) {
    this.identifier = identifier;
  };

  MediaChooser.setup = function(params, callback) {
    var browseButton, id, widget;
    if (typeof params === 'string') {
      params = {
        selector: params
      };
    }
    params.app = Chute.app;
    params.chute_id = params.identifier || this.identifier;
    params.identifier = "chute-identifier-" + params.chute_id;
    if (!(params.mode != null)) {
      params.mode = 'collector';
    }
    if (!(params.popup != null)) {
      params.popup = false;
    }
    params.file_types = (function() {
      switch (params.allow) {
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
    })();
    params.file_limit = params.limit || 0;
    params.picker_version = "v2";
    params.onSelectionComplete = function(element, data) {
      var asset, urls, _i, _len, _ref;
      urls = [];
      _ref = data.assets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        asset = _ref[_i];
        urls.push(asset.url);
      }
      if (callback) {
        return callback(urls, data);
      }
    };
    if (!params.selector) {
      id = parseInt(Math.random() * 1000);
      widget = jQuery("<div id=\"chute-" + id + "\"></div>");
      widget.appendTo('body');
      params.widget_id = id;
      chute("#chute-" + id, params);
      browseButton = widget.find("a.chute-browseButton");
      if (params.popup === false && params.mode === 'collector') {
        browseButton.hide();
      }
      return browseButton;
    }
    return chute(params.selector, params);
  };

  MediaChooser.choose = function(params, callback) {
    var browseButton;
    if ('function' === typeof params) {
      callback = params;
      params = {};
    }
    browseButton = this.setup(params, callback);
    return setTimeout(function() {
      return browseButton.click();
    }, 500);
  };

  return MediaChooser;

})();
