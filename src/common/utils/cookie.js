(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.cookie = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  /**
   * @memberof module:browser
   * @description
   * ##### 写入、获取、删除Cookie
   *
   * 1、获取指定cookie
   *
   * `cookie('name')`   返回`wangzai`
   *
   * 2、写入cookie
   *
   * `cookie('name', {value : 'wangzai'})`
   *
   * 设置路径，domain(如果domain不同域，cookie设置不会成功),设置过期时间1天;
   * ```
   *  cookie('name', {
   *       value:'wangzai',
   *       path:'/',
   *       domain:'baidu.com',
   *      expires:1
   *  });
   * ```
   *
   * 3、删除cookie, 将过期时间指定为负值即可
   *
   * `cookie('name', {expires: -1})`
   */

  var cookie = function () {
    var _date = new Date(); // milliseconds of one day

    var // current time milliseconds
    _crut = +_date;

    var _days = 86400000;
    var _getcookie = function _getcookie(_name) {
      var _cookie = document.cookie;
      var _search = '\\b' + _name + '=';
      var _index1 = _cookie.search(_search);
      if (_index1 < 0) {
        return '';
      }
      _index1 += _search.length - 2;
      var _index2 = _cookie.indexOf(';', _index1);
      if (_index2 < 0) {
        _index2 = _cookie.length;
      }
      return _cookie.substring(_index1, _index2) || '';
    };
    var object2string = function object2string(_object, _split, _encode) {
      if (!_object) {
        return '';
      }

      var _arr = [];
      for (var x in _object) {
        // eslint-disable-line
        if (_object.hasOwnProperty(x)) {
          _arr.push(encodeURIComponent(x) + '=' + (_encode ? encodeURIComponent(_object[x]) : _object[x]));
        }
      }
      return _arr.join(_split || ',');
    };
    return function (_name, _data) {
      if (_data === undefined) {
        return _getcookie(_name);
      }

      if (typeof _data === 'string' || _data instanceof String) {
        if (_data) {
          document.cookie = _name + '=' + _data + ';';
          return _data;
        }
        _data = {
          expires: -100
        };
      }
      _data = _data || {};
      var _cookie = _name + '=' + (_data.value || '') + ';';
      delete _data.value;
      if (_data.expires !== undefined) {
        _date.setTime(_crut + _data.expires * _days);
        _data.expires = _date.toGMTString();
      }
      _cookie += object2string(_data, ';');
      document.cookie = _cookie;
    };
  }();

  exports['default'] = cookie;
  module.exports = exports['default'];
});
