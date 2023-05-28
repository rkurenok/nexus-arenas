"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
['click', 'touchend'].forEach(function (evnt) {
  document.querySelector('input#fight').addEventListener(evnt, function (e) {
    e.preventDefault();
    var characters = [];
    document.querySelectorAll('input').forEach(function (el) {
      if (el.getAttribute('type') != 'submit') {
        characters.push(el.value);
      }
    });
    var halfwayThrough = Math.floor(characters.length / 2);
    var arrayFirstHalf = characters.slice(0, halfwayThrough);
    var arraySecondHalf = characters.slice(halfwayThrough, characters.length);
    document.querySelector(".battle-log").querySelectorAll('ol').forEach(function (el) {
      el && el.remove();
    });
    document.querySelector('div.result') && document.querySelector('div.result').remove();
    var gladiator1 = _construct(Gladiator, _toConsumableArray(arrayFirstHalf));
    var gladiator2 = _construct(Gladiator, _toConsumableArray(arraySecondHalf));
    battle(gladiator1, gladiator2);
  });
  document.querySelectorAll('input#savePreset').forEach(function (elem) {
    elem.addEventListener(evnt, function (e) {
      e.preventDefault();
      var characters = [];
      elem.parentElement.querySelectorAll('input:not(input[type="submit"])').forEach(function (el) {
        characters.push(el.value);
      });
      localStorage[characters[0]] = JSON.stringify(characters);
      console.log(localStorage.getItem(characters[0]));
    });
  });
});
var Gladiator = /*#__PURE__*/function () {
  function Gladiator(name, hp, damage, crit, prot, regen, speed) {
    _classCallCheck(this, Gladiator);
    _defineProperty(this, "textLog", "");
    this.name = name;
    this.id = name.replace(/\s/g, '');
    this.maxHP = this.hp = +hp;
    this.damage = +damage;
    this.crit = +crit;
    this.prot = +prot;
    this.regen = +regen;
    this.speed = +speed;
    this.armPercentMT = Number(((1 - 1 / (prot / 500 + 1)) * 100).toFixed(2));
    this.regenHPperSec = Number((hp / 10 / 60 * this.regen / 100).toFixed(2));
    var tag = document.createElement('ol');
    tag.setAttribute('id', "_".concat(this.id));
    document.querySelector(".battle-log").append(tag);
  }
  _createClass(Gladiator, [{
    key: "hit",
    value: function hit(armor) {
      var critText = this.textLog = "";
      this.hp = this.hp + this.regenHPperSec > this.maxHP ? this.maxHP : this.hp + this.regenHPperSec;
      var dmgDone = ((Number(Math.random().toFixed(2)) + 0.01) * this.damage * (1 - armor / 100)).toFixed(2);
      if ((Math.random() * 100).toFixed(1) <= this.crit) {
        dmgDone *= 2;
        critText = " кританул и";
      }
      var result = this.textLog = "".concat(this.name).concat(critText, " \u043D\u0430\u043D\u0435\u0441 ").concat(dmgDone, " \u0443\u0440\u043E\u043D\u0430");
      var logBattle = document.querySelector(".battle-log > ol#_".concat(this.id));
      this.log(result, logBattle, critText ? ['attack', 'crit'] : ['attack']);
      return dmgDone;
    }
  }, {
    key: "log",
    value: function log(text, tag, classNames) {
      var _li$classList;
      var li = document.createElement('li');
      (_li$classList = li.classList).add.apply(_li$classList, _toConsumableArray(classNames));
      li.innerHTML = text;
      if (tag.querySelectorAll('li').length == (tag.nextSibling && tag.nextSibling.querySelectorAll('li').length - 1 || tag.previousSibling && tag.previousSibling.querySelectorAll('li').length - 1)) {
        var logHeight = tag.nextSibling ? tag.nextSibling.querySelector('li:last-child').offsetHeight : tag.previousSibling.querySelector('li:last-child').offsetHeight;
        li.style.cssText = "min-height: ".concat(logHeight, "px");
      }
      tag.append(li);
      scrollPage();
    }
  }, {
    key: "getCurrentHP",
    value: function getCurrentHP() {
      this.textLog = "";
      var hpColor = this.hp < 33.3 ? 'red' : this.hp < 66.6 ? 'yellow' : 'green';
      var result = this.textLog = "".concat(this.name, " <span class=\"").concat(hpColor, "\">").concat(this.maxHP, "/").concat(this.hp, "</span>");
      var logBattle = document.querySelector(".battle-log > ol#_".concat(this.id));
      this.log(result, logBattle, ['current-hp']);
    }
  }], [{
    key: "getWinner",
    value: function getWinner(name) {
      var div = document.createElement('div');
      div.classList.add('result');
      div.innerText = name ? "\u041F\u043E\u0431\u0435\u0434\u0438\u043B ".concat(name) : "Ничья";
      document.querySelector("main").append(div);
      scrollPage();
    }
  }]);
  return Gladiator;
}();
function battle(gladiator1, gladiator2) {
  var b = setInterval(function () {
    gladiator2.hp = +(gladiator2.hp - gladiator1.hit(gladiator2.armPercentMT)).toFixed(2);
    gladiator2.getCurrentHP();
    if (gladiator1.hp < 0 || gladiator2.hp < 0) {
      Gladiator.getWinner(gladiator1.hp < 0 && gladiator2.hp < 0 ? "" : gladiator1.hp < 0 ? gladiator2.name : gladiator1.name);
      clearInterval(a);
      clearInterval(b);
    }
  }, gladiator1.speed * 10);
  var a = setInterval(function () {
    gladiator1.hp = +(gladiator1.hp - gladiator2.hit(gladiator1.armPercentMT)).toFixed(2);
    gladiator1.getCurrentHP();
    if (gladiator1.hp < 0 || gladiator2.hp < 0) {
      Gladiator.getWinner(gladiator1.hp < 0 && gladiator2.hp < 0 ? "" : gladiator1.hp < 0 ? gladiator2.name : gladiator1.name);
      clearInterval(a);
      clearInterval(b);
    }
  }, gladiator2.speed * 10);
}
function scrollPage() {
  window.scrollTo(0, document.body.scrollHeight);
}

// Проверка поддержки webp, добавление класса webp или no-webp для HTML
function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    var webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // Добавление класса _webp или _no-webp для HTML
  testWebP(function (support) {
    var className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
  });
}
isWebp();
var device = navigator.userAgent.toLowerCase();
var mob = device.match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/);
if (mob) {
  $(".bg-cover").removeClass("bg-fixed");
}
window.onload = function () {
  var selectHTML = '';
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    console.log("".concat(key, ": ").concat(localStorage.getItem(key)));
    selectHTML += "<option value=\"".concat(key, "\">").concat(key, "</option>");
  }
  document.querySelectorAll('.my-select').forEach(function (select) {
    select.innerHTML += selectHTML;
  });
};
document.querySelectorAll('.my-select').forEach(function (select) {
  select.addEventListener('click', function (e) {
    var selectedOption = e.target.options[e.target.selectedIndex];
    console.log(selectedOption.value);
    console.log(JSON.parse(localStorage.getItem(selectedOption.value)));
    var characters = JSON.parse(localStorage.getItem(selectedOption.value));
    select.parentElement.querySelectorAll('input:not(input[type="submit"])').forEach(function (el, index) {
      el.value = characters[index];
    });
  });
});