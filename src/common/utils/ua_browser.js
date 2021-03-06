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
    global.ua_browser = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @memberof module:browser
   * @name uaBrowser
   * @example
   * import UA from 'zan-utils/browser/ua_browser';
   * @description
   * ##### 通过浏览器获取设备类型及设备的版本信息
   * **使用方法：全局引用、直接使用**
   *
   * 1、判断设备是否为iOS
   * `UA.isIOS()`
   *
   * 2、获取iOS的版本号
   * `UA.getIOSVersion()`
   *
   * 3、判断设备是否为Android
   * `UA.isAndroid()`
   *
   * 4、判断设备是否为老版本Android(2.2/2.3)
   *  `UA.isAndroidOld()`
   *
   * 5、判断是否在微信内
   *  `UA.isWeixin()`
   *
   * 6、判断设备是否为iPad
   * `UA.isIPad()`
   *
   * 7、判断设备是否为移动设备
   * `UA.isMobile()`
   *
   * 8、判断浏览器是否为Safari
   * `UA.isSafari()`
   *
   * 9、判断App是否为微小店
   * `UA.isWxd()`
   *
   * 10、获取App的版本号(特指微商城App和微小店App)
   * `UA.getPlatformVersion()`
   *
   * 11、判断App是否为微商城
   * `UA.isWsc()`
   *
   * 12、判断App是否为有赞批发
   * `UA.isPf()`
   */
  var platform = '';
  if (typeof window !== 'undefined') {
    platform = navigator.userAgent.toLowerCase();
  }

  var ua = {
    isIOS: function isIOS() {
      return (/iPhone|iPad|iPod/gi.test(platform) && !window.MSStream
      );
    },
    getIOSVersion: function getIOSVersion() {
      return parseFloat(('' + (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent) || [0, ''])[1]).replace('undefined', '3_2').replace('_', '.').replace('_', '')) || false;
    },
    isAndroid: function isAndroid() {
      return (/android/gi.test(platform)
      );
    },
    isAndroidOld: function isAndroidOld() {
      return (/android 2.3/gi.test(platform) || /android 2.2/gi.test(platform)
      );
    },
    isWeixin: function isWeixin() {
      return (/micromessenger/gi.test(platform)
      );
    },
    isIPad: function isIPad() {
      return (/ipad/gi.test(platform)
      );
    },
    isMobile: function isMobile() {
      return (/(android|bb\d+|meego).+mobile|kdtunion|weibo|m2oapp|micromessenger|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(platform) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(platform.substr(0, 4))
      );
    },
    isSafari: function isSafari() {
      return (/safari/gi.test(platform) && !/chrome/gi.test(platform)
      );
    }
  };

  exports['default'] = ua;
  module.exports = exports['default'];
});
