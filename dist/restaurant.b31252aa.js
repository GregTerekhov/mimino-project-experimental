!function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.NiceSelect = t() : e.NiceSelect = t();
}(self, function() {
    return (()=>{
        "use strict";
        var e1 = {
            d: (t, i)=>{
                for(var s in i)e1.o(i, s) && !e1.o(t, s) && Object.defineProperty(t, s, {
                    enumerable: !0,
                    get: i[s]
                });
            },
            o: (e, t)=>Object.prototype.hasOwnProperty.call(e, t),
            r: (e)=>{
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                    value: "Module"
                }), Object.defineProperty(e, "__esModule", {
                    value: !0
                });
            }
        }, t1 = {};
        function i1(e) {
            var t = document.createEvent("MouseEvents");
            t.initEvent("click", !0, !1), e.dispatchEvent(t);
        }
        function s1(e) {
            var t = document.createEvent("HTMLEvents");
            t.initEvent("change", !0, !1), e.dispatchEvent(t);
        }
        function o1(e) {
            var t = document.createEvent("FocusEvent");
            t.initEvent("focusin", !0, !1), e.dispatchEvent(t);
        }
        function n1(e) {
            var t = document.createEvent("FocusEvent");
            t.initEvent("focusout", !0, !1), e.dispatchEvent(t);
        }
        function d(e, t) {
            return e.getAttribute(t);
        }
        function r(e, t) {
            return !!e && e.classList.contains(t);
        }
        function l(e, t) {
            if (e) return e.classList.add(t);
        }
        function a(e, t) {
            if (e) return e.classList.remove(t);
        }
        e1.r(t1), e1.d(t1, {
            default: ()=>p,
            bind: ()=>u
        });
        var c = {
            data: null,
            searchable: !1
        };
        function p(e, t) {
            this.el = e, this.config = Object.assign({}, c, t || {}), this.data = this.config.data, this.selectedOptions = [], this.placeholder = d(this.el, "placeholder") || this.config.placeholder || "Select an option", this.dropdown = null, this.multiple = d(this.el, "multiple"), this.disabled = d(this.el, "disabled"), this.create();
        }
        function u(e, t) {
            return new p(e, t);
        }
        return p.prototype.create = function() {
            this.el.style.display = "none", this.data ? this.processData(this.data) : this.extractData(), this.renderDropdown(), this.bindEvent();
        }, p.prototype.processData = function(e2) {
            var t = [];
            e2.forEach((e)=>{
                t.push({
                    data: e,
                    attributes: {
                        selected: !1,
                        disabled: !1,
                        optgroup: "optgroup" == e.value
                    }
                });
            }), this.options = t;
        }, p.prototype.extractData = function() {
            var e3 = this.el.querySelectorAll("option,optgroup"), t = [], i = [], s2 = [];
            e3.forEach((e)=>{
                if ("OPTGROUP" == e.tagName) var s = {
                    text: e.label,
                    value: "optgroup"
                };
                else s = {
                    text: e.innerText,
                    value: e.value
                };
                var o = {
                    selected: null != e.getAttribute("selected"),
                    disabled: null != e.getAttribute("disabled"),
                    optgroup: "OPTGROUP" == e.tagName
                };
                t.push(s), i.push({
                    data: s,
                    attributes: o
                });
            }), this.data = t, this.options = i, this.options.forEach(function(e) {
                e.attributes.selected && s2.push(e);
            }), this.selectedOptions = s2;
        }, p.prototype.renderDropdown = function() {
            var e = `<div class="${[
                "nice-select",
                d(this.el, "class") || "",
                this.disabled ? "disabled" : "",
                this.multiple ? "has-multiple" : ""
            ].join(" ")}" tabindex="${this.disabled ? null : 0}">\n  <span class="${this.multiple ? "multiple-options" : "current"}"></span>\n  <div class="nice-select-dropdown">\n  ${this.config.searchable ? '<div class="nice-select-search-box">\n<input type="text" class="nice-select-search" placeholder="Search..."/>\n</div>' : ""}\n  <ul class="list"></ul>\n  </div></div>\n`;
            this.el.insertAdjacentHTML("afterend", e), this.dropdown = this.el.nextElementSibling, this._renderSelectedItems(), this._renderItems();
        }, p.prototype._renderSelectedItems = function() {
            if (this.multiple) {
                var e = "";
                "auto" == window.getComputedStyle(this.dropdown).width || this.selectedOptions.length < 2 ? (this.selectedOptions.forEach(function(t) {
                    e += `<span class="current">${t.data.text}</span>`;
                }), e = "" == e ? this.placeholder : e) : e = this.selectedOptions.length + " selected", this.dropdown.querySelector(".multiple-options").innerHTML = e;
            } else {
                var t2 = this.selectedOptions.length > 0 ? this.selectedOptions[0].data.text : this.placeholder;
                this.dropdown.querySelector(".current").innerHTML = t2;
            }
        }, p.prototype._renderItems = function() {
            var e = this.dropdown.querySelector("ul");
            this.options.forEach((t)=>{
                e.appendChild(this._renderItem(t));
            });
        }, p.prototype._renderItem = function(e) {
            var t = document.createElement("li");
            if (t.innerHTML = e.data.text, e.attributes.optgroup) t.classList.add("optgroup");
            else {
                t.setAttribute("data-value", e.data.value);
                var i = [
                    "option",
                    e.attributes.selected ? "selected" : null,
                    e.attributes.disabled ? "disabled" : null
                ];
                t.addEventListener("click", this._onItemClicked.bind(this, e)), t.classList.add(...i);
            }
            return e.element = t, t;
        }, p.prototype.update = function() {
            if (this.extractData(), this.dropdown) {
                var e = r(this.dropdown, "open");
                this.dropdown.parentNode.removeChild(this.dropdown), this.create(), e && i1(this.dropdown);
            }
        }, p.prototype.disable = function() {
            this.disabled || (this.disabled = !0, l(this.dropdown, "disabled"));
        }, p.prototype.enable = function() {
            this.disabled && (this.disabled = !1, a(this.dropdown, "disabled"));
        }, p.prototype.clear = function() {
            this.selectedOptions = [], this._renderSelectedItems(), this.updateSelectValue(), s1(this.el);
        }, p.prototype.destroy = function() {
            this.dropdown && (this.dropdown.parentNode.removeChild(this.dropdown), this.el.style.display = "");
        }, p.prototype.bindEvent = function() {
            this.dropdown.addEventListener("click", this._onClicked.bind(this)), this.dropdown.addEventListener("keydown", this._onKeyPressed.bind(this)), this.dropdown.addEventListener("focusin", o1.bind(this, this.el)), this.dropdown.addEventListener("focusout", n1.bind(this, this.el)), window.addEventListener("click", this._onClickedOutside.bind(this)), this.config.searchable && this._bindSearchEvent();
        }, p.prototype._bindSearchEvent = function() {
            var e4 = this.dropdown.querySelector(".nice-select-search");
            e4 && e4.addEventListener("click", function(e) {
                return e.stopPropagation(), !1;
            }), e4.addEventListener("input", this._onSearchChanged.bind(this));
        }, p.prototype._onClicked = function(e5) {
            if (this.multiple ? this.dropdown.classList.add("open") : this.dropdown.classList.toggle("open"), this.dropdown.classList.contains("open")) {
                var t = this.dropdown.querySelector(".nice-select-search");
                t && (t.value = "", t.focus());
                var i = this.dropdown.querySelector(".focus");
                a(i, "focus"), l(i = this.dropdown.querySelector(".selected"), "focus"), this.dropdown.querySelectorAll("ul li").forEach(function(e) {
                    e.style.display = "";
                });
            } else this.dropdown.focus();
        }, p.prototype._onItemClicked = function(e6, t) {
            var i = t.target;
            r(i, "disabled") || (this.multiple ? r(i, "selected") ? (a(i, "selected"), this.selectedOptions.splice(this.selectedOptions.indexOf(e6), 1), this.el.querySelector('option[value="' + i.dataset.value + '"]').selected = !1) : (l(i, "selected"), this.selectedOptions.push(e6)) : (this.selectedOptions.forEach(function(e) {
                a(e.element, "selected");
            }), l(i, "selected"), this.selectedOptions = [
                e6
            ]), this._renderSelectedItems(), this.updateSelectValue());
        }, p.prototype.updateSelectValue = function() {
            if (this.multiple) {
                var e = this.el;
                this.selectedOptions.forEach(function(t) {
                    var i = e.querySelector('option[value="' + t.data.value + '"]');
                    i && i.setAttribute("selected", !0);
                });
            } else this.selectedOptions.length > 0 && (this.el.value = this.selectedOptions[0].data.value);
            s1(this.el);
        }, p.prototype._onClickedOutside = function(e) {
            this.dropdown.contains(e.target) || this.dropdown.classList.remove("open");
        }, p.prototype._onKeyPressed = function(e) {
            var t = this.dropdown.querySelector(".focus"), s = this.dropdown.classList.contains("open");
            if (32 == e.keyCode || 13 == e.keyCode) i1(s ? t : this.dropdown);
            else if (40 == e.keyCode) {
                if (s) {
                    var o = this._findNext(t);
                    o && (a(this.dropdown.querySelector(".focus"), "focus"), l(o, "focus"));
                } else i1(this.dropdown);
                e.preventDefault();
            } else if (38 == e.keyCode) {
                if (s) {
                    var n = this._findPrev(t);
                    n && (a(this.dropdown.querySelector(".focus"), "focus"), l(n, "focus"));
                } else i1(this.dropdown);
                e.preventDefault();
            } else 27 == e.keyCode && s && i1(this.dropdown);
            return !1;
        }, p.prototype._findNext = function(e) {
            for(e = e ? e.nextElementSibling : this.dropdown.querySelector(".list .option"); e;){
                if (!r(e, "disabled") && "none" != e.style.display) return e;
                e = e.nextElementSibling;
            }
            return null;
        }, p.prototype._findPrev = function(e) {
            for(e = e ? e.previousElementSibling : this.dropdown.querySelector(".list .option:last-child"); e;){
                if (!r(e, "disabled") && "none" != e.style.display) return e;
                e = e.previousElementSibling;
            }
            return null;
        }, p.prototype._onSearchChanged = function(e7) {
            var t3 = this.dropdown.classList.contains("open"), i2 = e7.target.value;
            if ("" == (i2 = i2.toLowerCase())) this.options.forEach(function(e) {
                e.element.style.display = "";
            });
            else if (t3) {
                var s = new RegExp(i2);
                this.options.forEach(function(e) {
                    var t = e.data.text.toLowerCase(), i = s.test(t);
                    e.element.style.display = i ? "" : "none";
                });
            }
            this.dropdown.querySelectorAll(".focus").forEach(function(e) {
                a(e, "focus");
            }), l(this._findNext(null), "focus");
        }, t1;
    })();
});

//# sourceMappingURL=restaurant.b31252aa.js.map
