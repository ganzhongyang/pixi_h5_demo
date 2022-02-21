document.body.parentNode.style.overflow = 'hidden'//隐藏且禁用滚动条
const htmlDom = document.documentElement

function resetView(screenRatio, isShowTips) {
  document.addEventListener('DOMContentLoaded', resetViewSize.bind(this, screenRatio, isShowTips), false)
  window.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', resetViewSize.bind(this, screenRatio, isShowTips), false)
}

/**
 * 动态修改HTML根字体大小,配合rem,实现自适应
 * @param screenRatio {boolean} 屏幕比例: '4:3' : '16:9'
 * @param isShowTips  {boolean}  是否显示横竖屏提示
 */
function resetViewSize(screenRatio = false, isShowTips = true) {
  const maxWidth = 1920
  const maxHeight = screenRatio ? 1440 : 1080
  const _w = htmlDom.clientWidth
  const _h = htmlDom.clientHeight
  const aspectRatio = _w / _h //屏幕大小比率
  if (aspectRatio > maxWidth / maxHeight) {
    htmlDom.style.fontSize = (_h / maxHeight) * 10 + 'px'
  } else {
    htmlDom.style.fontSize = (_w / maxWidth) * 10 + 'px'
  }
  isShowTips && isMobile() && checkDirect()
}

/**
 * 判断是否为移动设备
 * @returns {boolean}
 */
function isMobile() {
  const userAgentInfo = navigator.userAgent
  const mobileAgents = ['Android', 'Mobile', 'ios', 'iPhone', 'iPad', 'iPod', 'SymbianOS', 'Symbian', 'Windows Phone', 'MQQBrowser', 'IEMobile', 'BlackBerry']
  const _isMobile = mobileAgents.some(item => {
    const reg = new RegExp(item, 'i')
    return userAgentInfo.match(reg) || userAgentInfo.indexOf(item) !== -1
  })
  return _isMobile
}

// function isMobile1(param) {
//   var nav = {
//     userAgent: '',
//     platform: '',
//     maxTouchPoints: 0
//   };
//   if (!param && typeof navigator !== 'undefined') {
//     nav = {
//       userAgent: navigator.userAgent,
//       platform: navigator.platform,
//       maxTouchPoints: navigator.maxTouchPoints || 0
//     };
//   }
//   else if (typeof param === 'string') {
//     nav.userAgent = param;
//   }
//   else if (param && param.userAgent) {
//     nav = {
//       userAgent: param.userAgent,
//       platform: param.platform,
//       maxTouchPoints: param.maxTouchPoints || 0
//     };
//   }
//   var userAgent = nav.userAgent;
//   var tmp = userAgent.split('[FBAN');
//   if (typeof tmp[1] !== 'undefined') {
//     userAgent = tmp[0];
//   }
//   tmp = userAgent.split('Twitter');
//   if (typeof tmp[1] !== 'undefined') {
//     userAgent = tmp[0];
//   }
//   var match = createMatch(userAgent);
//   var result = {
//     apple: {
//       phone: match(appleIphone) && !match(windowsPhone),
//       ipod: match(appleIpod),
//       tablet: !match(appleIphone) &&
//         (match(appleTablet) || isAppleTabletOnIos13(nav)) &&
//         !match(windowsPhone),
//       universal: match(appleUniversal),
//       device: (match(appleIphone) ||
//           match(appleIpod) ||
//           match(appleTablet) ||
//           match(appleUniversal) ||
//           isAppleTabletOnIos13(nav)) &&
//         !match(windowsPhone)
//     },
//     amazon: {
//       phone: match(amazonPhone),
//       tablet: !match(amazonPhone) && match(amazonTablet),
//       device: match(amazonPhone) || match(amazonTablet)
//     },
//     android: {
//       phone: (!match(windowsPhone) && match(amazonPhone)) ||
//         (!match(windowsPhone) && match(androidPhone)),
//       tablet: !match(windowsPhone) &&
//         !match(amazonPhone) &&
//         !match(androidPhone) &&
//         (match(amazonTablet) || match(androidTablet)),
//       device: (!match(windowsPhone) &&
//           (match(amazonPhone) ||
//             match(amazonTablet) ||
//             match(androidPhone) ||
//             match(androidTablet))) ||
//         match(/\bokhttp\b/i)
//     },
//     windows: {
//       phone: match(windowsPhone),
//       tablet: match(windowsTablet),
//       device: match(windowsPhone) || match(windowsTablet)
//     },
//     other: {
//       blackberry: match(otherBlackBerry),
//       blackberry10: match(otherBlackBerry10),
//       opera: match(otherOpera),
//       firefox: match(otherFirefox),
//       chrome: match(otherChrome),
//       device: match(otherBlackBerry) ||
//         match(otherBlackBerry10) ||
//         match(otherOpera) ||
//         match(otherFirefox) ||
//         match(otherChrome)
//     },
//     any: false,
//     phone: false,
//     tablet: false
//   };
//   result.any =
//     result.apple.device ||
//     result.android.device ||
//     result.windows.device ||
//     result.other.device;
//   result.phone =
//     result.apple.phone || result.android.phone || result.windows.phone;
//   result.tablet =
//     result.apple.tablet || result.android.tablet || result.windows.tablet;
//   return result;
// }
// isMobile1(window.navigator);

/**
 *
 * 检查是否为横屏,横屏关闭遮罩,竖屏显示遮罩
 * @returns {string} landscape:横屏 portrait :竖屏
 */
function checkDirect() {
  let tipsDom = document.getElementsByClassName('media-tip')[0]
  if (htmlDom.clientWidth >= htmlDom.clientHeight) {
    //横屏:遮罩关闭
    tipsDom.style.display = 'none'
    return 'landscape'
  } else {
    //竖屏:遮罩显示
    tipsDom.style.display = 'flex'
    return 'portrait'
  }
}


export {
  resetView,
  resetViewSize,
  isMobile
}
