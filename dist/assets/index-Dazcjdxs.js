function Lp(e, t) {
	for (var n = 0; n < t.length; n++) {
		const r = t[n];
		if (typeof r != "string" && !Array.isArray(r)) {
			for (const a in r)
				if (a !== "default" && !(a in e)) {
					const l = Object.getOwnPropertyDescriptor(r, a);
					l &&
						Object.defineProperty(
							e,
							a,
							l.get ? l : { enumerable: !0, get: () => r[a] }
						);
				}
		}
	}
	return Object.freeze(
		Object.defineProperty(e, Symbol.toStringTag, {
			value: "Module",
		})
	);
}
(function () {
	const e = document.createElement("link").relList;
	if (e && e.supports && e.supports("modulepreload")) return;
	for (const r of document.querySelectorAll(
		'link[rel="modulepreload"]'
	))
		n(r);
	new MutationObserver((r) => {
		for (const a of r)
			if (a.type === "childList")
				for (const l of a.addedNodes)
					l.tagName === "LINK" &&
						l.rel === "modulepreload" &&
						n(l);
	}).observe(document, { childList: !0, subtree: !0 });
	function t(r) {
		const a = {};
		return (
			r.integrity && (a.integrity = r.integrity),
			r.referrerPolicy &&
				(a.referrerPolicy = r.referrerPolicy),
			r.crossOrigin === "use-credentials"
				? (a.credentials = "include")
				: r.crossOrigin === "anonymous"
				? (a.credentials = "omit")
				: (a.credentials = "same-origin"),
			a
		);
	}
	function n(r) {
		if (r.ep) return;
		r.ep = !0;
		const a = t(r);
		fetch(r.href, a);
	}
})();
function Os(e) {
	return e &&
		e.__esModule &&
		Object.prototype.hasOwnProperty.call(e, "default")
		? e.default
		: e;
}
var Ls = { exports: {} },
	Qr = {},
	zs = { exports: {} },
	A = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qn = Symbol.for("react.element"),
	zp = Symbol.for("react.portal"),
	Mp = Symbol.for("react.fragment"),
	Np = Symbol.for("react.strict_mode"),
	Ip = Symbol.for("react.profiler"),
	jp = Symbol.for("react.provider"),
	Rp = Symbol.for("react.context"),
	Ap = Symbol.for("react.forward_ref"),
	Dp = Symbol.for("react.suspense"),
	Fp = Symbol.for("react.memo"),
	$p = Symbol.for("react.lazy"),
	Ms = Symbol.iterator;
function Bp(e) {
	return e === null || typeof e != "object"
		? null
		: ((e = (Ms && e[Ms]) || e["@@iterator"]),
		  typeof e == "function" ? e : null);
}
var Ns = {
		isMounted: function () {
			return !1;
		},
		enqueueForceUpdate: function () {},
		enqueueReplaceState: function () {},
		enqueueSetState: function () {},
	},
	Is = Object.assign,
	js = {};
function pn(e, t, n) {
	(this.props = e),
		(this.context = t),
		(this.refs = js),
		(this.updater = n || Ns);
}
(pn.prototype.isReactComponent = {}),
	(pn.prototype.setState = function (e, t) {
		if (
			typeof e != "object" &&
			typeof e != "function" &&
			e != null
		)
			throw Error(
				"setState(...): takes an object of state variables to update or a function which returns an object of state variables."
			);
		this.updater.enqueueSetState(this, e, t, "setState");
	}),
	(pn.prototype.forceUpdate = function (e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	});
function Rs() {}
Rs.prototype = pn.prototype;
function Il(e, t, n) {
	(this.props = e),
		(this.context = t),
		(this.refs = js),
		(this.updater = n || Ns);
}
var jl = (Il.prototype = new Rs());
(jl.constructor = Il),
	Is(jl, pn.prototype),
	(jl.isPureReactComponent = !0);
var As = Array.isArray,
	Ds = Object.prototype.hasOwnProperty,
	Rl = { current: null },
	Fs = { key: !0, ref: !0, __self: !0, __source: !0 };
function $s(e, t, n) {
	var r,
		a = {},
		l = null,
		i = null;
	if (t != null)
		for (r in (t.ref !== void 0 && (i = t.ref),
		t.key !== void 0 && (l = "" + t.key),
		t))
			Ds.call(t, r) && !Fs.hasOwnProperty(r) && (a[r] = t[r]);
	var o = arguments.length - 2;
	if (o === 1) a.children = n;
	else if (1 < o) {
		for (var s = Array(o), c = 0; c < o; c++)
			s[c] = arguments[c + 2];
		a.children = s;
	}
	if (e && e.defaultProps)
		for (r in ((o = e.defaultProps), o))
			a[r] === void 0 && (a[r] = o[r]);
	return {
		$$typeof: Qn,
		type: e,
		key: l,
		ref: i,
		props: a,
		_owner: Rl.current,
	};
}
function Vp(e, t) {
	return {
		$$typeof: Qn,
		type: e.type,
		key: t,
		ref: e.ref,
		props: e.props,
		_owner: e._owner,
	};
}
function Al(e) {
	return (
		typeof e == "object" && e !== null && e.$$typeof === Qn
	);
}
function Hp(e) {
	var t = { "=": "=0", ":": "=2" };
	return (
		"$" +
		e.replace(/[=:]/g, function (n) {
			return t[n];
		})
	);
}
var Bs = /\/+/g;
function Dl(e, t) {
	return typeof e == "object" && e !== null && e.key != null
		? Hp("" + e.key)
		: t.toString(36);
}
function Xr(e, t, n, r, a) {
	var l = typeof e;
	(l === "undefined" || l === "boolean") && (e = null);
	var i = !1;
	if (e === null) i = !0;
	else
		switch (l) {
			case "string":
			case "number":
				i = !0;
				break;
			case "object":
				switch (e.$$typeof) {
					case Qn:
					case zp:
						i = !0;
				}
		}
	if (i)
		return (
			(i = e),
			(a = a(i)),
			(e = r === "" ? "." + Dl(i, 0) : r),
			As(a)
				? ((n = ""),
				  e != null && (n = e.replace(Bs, "$&/") + "/"),
				  Xr(a, t, n, "", function (c) {
						return c;
				  }))
				: a != null &&
				  (Al(a) &&
						(a = Vp(
							a,
							n +
								(!a.key || (i && i.key === a.key)
									? ""
									: ("" + a.key).replace(Bs, "$&/") + "/") +
								e
						)),
				  t.push(a)),
			1
		);
	if (((i = 0), (r = r === "" ? "." : r + ":"), As(e)))
		for (var o = 0; o < e.length; o++) {
			l = e[o];
			var s = r + Dl(l, o);
			i += Xr(l, t, n, s, a);
		}
	else if (((s = Bp(e)), typeof s == "function"))
		for (e = s.call(e), o = 0; !(l = e.next()).done; )
			(l = l.value),
				(s = r + Dl(l, o++)),
				(i += Xr(l, t, n, s, a));
	else if (l === "object")
		throw (
			((t = String(e)),
			Error(
				"Objects are not valid as a React child (found: " +
					(t === "[object Object]"
						? "object with keys {" +
						  Object.keys(e).join(", ") +
						  "}"
						: t) +
					"). If you meant to render a collection of children, use an array instead."
			))
		);
	return i;
}
function Yr(e, t, n) {
	if (e == null) return e;
	var r = [],
		a = 0;
	return (
		Xr(e, r, "", "", function (l) {
			return t.call(n, l, a++);
		}),
		r
	);
}
function Up(e) {
	if (e._status === -1) {
		var t = e._result;
		(t = t()),
			t.then(
				function (n) {
					(e._status === 0 || e._status === -1) &&
						((e._status = 1), (e._result = n));
				},
				function (n) {
					(e._status === 0 || e._status === -1) &&
						((e._status = 2), (e._result = n));
				}
			),
			e._status === -1 && ((e._status = 0), (e._result = t));
	}
	if (e._status === 1) return e._result.default;
	throw e._result;
}
var ge = { current: null },
	Kr = { transition: null },
	Wp = {
		ReactCurrentDispatcher: ge,
		ReactCurrentBatchConfig: Kr,
		ReactCurrentOwner: Rl,
	};
function Vs() {
	throw Error(
		"act(...) is not supported in production builds of React."
	);
}
(A.Children = {
	map: Yr,
	forEach: function (e, t, n) {
		Yr(
			e,
			function () {
				t.apply(this, arguments);
			},
			n
		);
	},
	count: function (e) {
		var t = 0;
		return (
			Yr(e, function () {
				t++;
			}),
			t
		);
	},
	toArray: function (e) {
		return (
			Yr(e, function (t) {
				return t;
			}) || []
		);
	},
	only: function (e) {
		if (!Al(e))
			throw Error(
				"React.Children.only expected to receive a single React element child."
			);
		return e;
	},
}),
	(A.Component = pn),
	(A.Fragment = Mp),
	(A.Profiler = Ip),
	(A.PureComponent = Il),
	(A.StrictMode = Np),
	(A.Suspense = Dp),
	(A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
		Wp),
	(A.act = Vs),
	(A.cloneElement = function (e, t, n) {
		if (e == null)
			throw Error(
				"React.cloneElement(...): The argument must be a React element, but you passed " +
					e +
					"."
			);
		var r = Is({}, e.props),
			a = e.key,
			l = e.ref,
			i = e._owner;
		if (t != null) {
			if (
				(t.ref !== void 0 && ((l = t.ref), (i = Rl.current)),
				t.key !== void 0 && (a = "" + t.key),
				e.type && e.type.defaultProps)
			)
				var o = e.type.defaultProps;
			for (s in t)
				Ds.call(t, s) &&
					!Fs.hasOwnProperty(s) &&
					(r[s] = t[s] === void 0 && o !== void 0 ? o[s] : t[s]);
		}
		var s = arguments.length - 2;
		if (s === 1) r.children = n;
		else if (1 < s) {
			o = Array(s);
			for (var c = 0; c < s; c++) o[c] = arguments[c + 2];
			r.children = o;
		}
		return {
			$$typeof: Qn,
			type: e.type,
			key: a,
			ref: l,
			props: r,
			_owner: i,
		};
	}),
	(A.createContext = function (e) {
		return (
			(e = {
				$$typeof: Rp,
				_currentValue: e,
				_currentValue2: e,
				_threadCount: 0,
				Provider: null,
				Consumer: null,
				_defaultValue: null,
				_globalName: null,
			}),
			(e.Provider = { $$typeof: jp, _context: e }),
			(e.Consumer = e)
		);
	}),
	(A.createElement = $s),
	(A.createFactory = function (e) {
		var t = $s.bind(null, e);
		return (t.type = e), t;
	}),
	(A.createRef = function () {
		return { current: null };
	}),
	(A.forwardRef = function (e) {
		return { $$typeof: Ap, render: e };
	}),
	(A.isValidElement = Al),
	(A.lazy = function (e) {
		return {
			$$typeof: $p,
			_payload: { _status: -1, _result: e },
			_init: Up,
		};
	}),
	(A.memo = function (e, t) {
		return {
			$$typeof: Fp,
			type: e,
			compare: t === void 0 ? null : t,
		};
	}),
	(A.startTransition = function (e) {
		var t = Kr.transition;
		Kr.transition = {};
		try {
			e();
		} finally {
			Kr.transition = t;
		}
	}),
	(A.unstable_act = Vs),
	(A.useCallback = function (e, t) {
		return ge.current.useCallback(e, t);
	}),
	(A.useContext = function (e) {
		return ge.current.useContext(e);
	}),
	(A.useDebugValue = function () {}),
	(A.useDeferredValue = function (e) {
		return ge.current.useDeferredValue(e);
	}),
	(A.useEffect = function (e, t) {
		return ge.current.useEffect(e, t);
	}),
	(A.useId = function () {
		return ge.current.useId();
	}),
	(A.useImperativeHandle = function (e, t, n) {
		return ge.current.useImperativeHandle(e, t, n);
	}),
	(A.useInsertionEffect = function (e, t) {
		return ge.current.useInsertionEffect(e, t);
	}),
	(A.useLayoutEffect = function (e, t) {
		return ge.current.useLayoutEffect(e, t);
	}),
	(A.useMemo = function (e, t) {
		return ge.current.useMemo(e, t);
	}),
	(A.useReducer = function (e, t, n) {
		return ge.current.useReducer(e, t, n);
	}),
	(A.useRef = function (e) {
		return ge.current.useRef(e);
	}),
	(A.useState = function (e) {
		return ge.current.useState(e);
	}),
	(A.useSyncExternalStore = function (e, t, n) {
		return ge.current.useSyncExternalStore(e, t, n);
	}),
	(A.useTransition = function () {
		return ge.current.useTransition();
	}),
	(A.version = "18.3.1"),
	(zs.exports = A);
var O = zs.exports;
const H = Os(O),
	Fl = Lp({ __proto__: null, default: H }, [O]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Gp = O,
	qp = Symbol.for("react.element"),
	Qp = Symbol.for("react.fragment"),
	Xp = Object.prototype.hasOwnProperty,
	Yp =
		Gp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
			.ReactCurrentOwner,
	Kp = { key: !0, ref: !0, __self: !0, __source: !0 };
function Hs(e, t, n) {
	var r,
		a = {},
		l = null,
		i = null;
	n !== void 0 && (l = "" + n),
		t.key !== void 0 && (l = "" + t.key),
		t.ref !== void 0 && (i = t.ref);
	for (r in t)
		Xp.call(t, r) && !Kp.hasOwnProperty(r) && (a[r] = t[r]);
	if (e && e.defaultProps)
		for (r in ((t = e.defaultProps), t))
			a[r] === void 0 && (a[r] = t[r]);
	return {
		$$typeof: qp,
		type: e,
		key: l,
		ref: i,
		props: a,
		_owner: Yp.current,
	};
}
(Qr.Fragment = Qp),
	(Qr.jsx = Hs),
	(Qr.jsxs = Hs),
	(Ls.exports = Qr);
var C = Ls.exports,
	$l = {},
	Us = { exports: {} },
	_e = {},
	Ws = { exports: {} },
	Gs = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
	function t(M, j) {
		var R = M.length;
		M.push(j);
		e: for (; 0 < R; ) {
			var Q = (R - 1) >>> 1,
				ee = M[Q];
			if (0 < a(ee, j)) (M[Q] = j), (M[R] = ee), (R = Q);
			else break e;
		}
	}
	function n(M) {
		return M.length === 0 ? null : M[0];
	}
	function r(M) {
		if (M.length === 0) return null;
		var j = M[0],
			R = M.pop();
		if (R !== j) {
			M[0] = R;
			e: for (
				var Q = 0, ee = M.length, Gr = ee >>> 1;
				Q < Gr;

			) {
				var Vt = 2 * (Q + 1) - 1,
					Nl = M[Vt],
					Ht = Vt + 1,
					qr = M[Ht];
				if (0 > a(Nl, R))
					Ht < ee && 0 > a(qr, Nl)
						? ((M[Q] = qr), (M[Ht] = R), (Q = Ht))
						: ((M[Q] = Nl), (M[Vt] = R), (Q = Vt));
				else if (Ht < ee && 0 > a(qr, R))
					(M[Q] = qr), (M[Ht] = R), (Q = Ht);
				else break e;
			}
		}
		return j;
	}
	function a(M, j) {
		var R = M.sortIndex - j.sortIndex;
		return R !== 0 ? R : M.id - j.id;
	}
	if (
		typeof performance == "object" &&
		typeof performance.now == "function"
	) {
		var l = performance;
		e.unstable_now = function () {
			return l.now();
		};
	} else {
		var i = Date,
			o = i.now();
		e.unstable_now = function () {
			return i.now() - o;
		};
	}
	var s = [],
		c = [],
		d = 1,
		f = null,
		m = 3,
		v = !1,
		g = !1,
		b = !1,
		w = typeof setTimeout == "function" ? setTimeout : null,
		h =
			typeof clearTimeout == "function" ? clearTimeout : null,
		u = typeof setImmediate < "u" ? setImmediate : null;
	typeof navigator < "u" &&
		navigator.scheduling !== void 0 &&
		navigator.scheduling.isInputPending !== void 0 &&
		navigator.scheduling.isInputPending.bind(
			navigator.scheduling
		);
	function p(M) {
		for (var j = n(c); j !== null; ) {
			if (j.callback === null) r(c);
			else if (j.startTime <= M)
				r(c), (j.sortIndex = j.expirationTime), t(s, j);
			else break;
			j = n(c);
		}
	}
	function y(M) {
		if (((b = !1), p(M), !g))
			if (n(s) !== null) (g = !0), we(S);
			else {
				var j = n(c);
				j !== null && Bt(y, j.startTime - M);
			}
	}
	function S(M, j) {
		(g = !1), b && ((b = !1), h(T), (T = -1)), (v = !0);
		var R = m;
		try {
			for (
				p(j), f = n(s);
				f !== null && (!(f.expirationTime > j) || (M && !z()));

			) {
				var Q = f.callback;
				if (typeof Q == "function") {
					(f.callback = null), (m = f.priorityLevel);
					var ee = Q(f.expirationTime <= j);
					(j = e.unstable_now()),
						typeof ee == "function"
							? (f.callback = ee)
							: f === n(s) && r(s),
						p(j);
				} else r(s);
				f = n(s);
			}
			if (f !== null) var Gr = !0;
			else {
				var Vt = n(c);
				Vt !== null && Bt(y, Vt.startTime - j), (Gr = !1);
			}
			return Gr;
		} finally {
			(f = null), (m = R), (v = !1);
		}
	}
	var x = !1,
		E = null,
		T = -1,
		P = 5,
		k = -1;
	function z() {
		return !(e.unstable_now() - k < P);
	}
	function L() {
		if (E !== null) {
			var M = e.unstable_now();
			k = M;
			var j = !0;
			try {
				j = E(!0, M);
			} finally {
				j ? I() : ((x = !1), (E = null));
			}
		} else x = !1;
	}
	var I;
	if (typeof u == "function")
		I = function () {
			u(L);
		};
	else if (typeof MessageChannel < "u") {
		var D = new MessageChannel(),
			B = D.port2;
		(D.port1.onmessage = L),
			(I = function () {
				B.postMessage(null);
			});
	} else
		I = function () {
			w(L, 0);
		};
	function we(M) {
		(E = M), x || ((x = !0), I());
	}
	function Bt(M, j) {
		T = w(function () {
			M(e.unstable_now());
		}, j);
	}
	(e.unstable_IdlePriority = 5),
		(e.unstable_ImmediatePriority = 1),
		(e.unstable_LowPriority = 4),
		(e.unstable_NormalPriority = 3),
		(e.unstable_Profiling = null),
		(e.unstable_UserBlockingPriority = 2),
		(e.unstable_cancelCallback = function (M) {
			M.callback = null;
		}),
		(e.unstable_continueExecution = function () {
			g || v || ((g = !0), we(S));
		}),
		(e.unstable_forceFrameRate = function (M) {
			0 > M || 125 < M
				? console.error(
						"forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
				  )
				: (P = 0 < M ? Math.floor(1e3 / M) : 5);
		}),
		(e.unstable_getCurrentPriorityLevel = function () {
			return m;
		}),
		(e.unstable_getFirstCallbackNode = function () {
			return n(s);
		}),
		(e.unstable_next = function (M) {
			switch (m) {
				case 1:
				case 2:
				case 3:
					var j = 3;
					break;
				default:
					j = m;
			}
			var R = m;
			m = j;
			try {
				return M();
			} finally {
				m = R;
			}
		}),
		(e.unstable_pauseExecution = function () {}),
		(e.unstable_requestPaint = function () {}),
		(e.unstable_runWithPriority = function (M, j) {
			switch (M) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					break;
				default:
					M = 3;
			}
			var R = m;
			m = M;
			try {
				return j();
			} finally {
				m = R;
			}
		}),
		(e.unstable_scheduleCallback = function (M, j, R) {
			var Q = e.unstable_now();
			switch (
				(typeof R == "object" && R !== null
					? ((R = R.delay),
					  (R = typeof R == "number" && 0 < R ? Q + R : Q))
					: (R = Q),
				M)
			) {
				case 1:
					var ee = -1;
					break;
				case 2:
					ee = 250;
					break;
				case 5:
					ee = 1073741823;
					break;
				case 4:
					ee = 1e4;
					break;
				default:
					ee = 5e3;
			}
			return (
				(ee = R + ee),
				(M = {
					id: d++,
					callback: j,
					priorityLevel: M,
					startTime: R,
					expirationTime: ee,
					sortIndex: -1,
				}),
				R > Q
					? ((M.sortIndex = R),
					  t(c, M),
					  n(s) === null &&
							M === n(c) &&
							(b ? (h(T), (T = -1)) : (b = !0), Bt(y, R - Q)))
					: ((M.sortIndex = ee),
					  t(s, M),
					  g || v || ((g = !0), we(S))),
				M
			);
		}),
		(e.unstable_shouldYield = z),
		(e.unstable_wrapCallback = function (M) {
			var j = m;
			return function () {
				var R = m;
				m = j;
				try {
					return M.apply(this, arguments);
				} finally {
					m = R;
				}
			};
		});
})(Gs),
	(Ws.exports = Gs);
var Zp = Ws.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Jp = O,
	Pe = Zp;
function _(e) {
	for (
		var t =
				"https://reactjs.org/docs/error-decoder.html?invariant=" +
				e,
			n = 1;
		n < arguments.length;
		n++
	)
		t += "&args[]=" + encodeURIComponent(arguments[n]);
	return (
		"Minified React error #" +
		e +
		"; visit " +
		t +
		" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
	);
}
var qs = new Set(),
	Xn = {};
function Ut(e, t) {
	hn(e, t), hn(e + "Capture", t);
}
function hn(e, t) {
	for (Xn[e] = t, e = 0; e < t.length; e++) qs.add(t[e]);
}
var it = !(
		typeof window > "u" ||
		typeof window.document > "u" ||
		typeof window.document.createElement > "u"
	),
	Bl = Object.prototype.hasOwnProperty,
	eh =
		/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
	Qs = {},
	Xs = {};
function th(e) {
	return Bl.call(Xs, e)
		? !0
		: Bl.call(Qs, e)
		? !1
		: eh.test(e)
		? (Xs[e] = !0)
		: ((Qs[e] = !0), !1);
}
function nh(e, t, n, r) {
	if (n !== null && n.type === 0) return !1;
	switch (typeof t) {
		case "function":
		case "symbol":
			return !0;
		case "boolean":
			return r
				? !1
				: n !== null
				? !n.acceptsBooleans
				: ((e = e.toLowerCase().slice(0, 5)),
				  e !== "data-" && e !== "aria-");
		default:
			return !1;
	}
}
function rh(e, t, n, r) {
	if (t === null || typeof t > "u" || nh(e, t, n, r))
		return !0;
	if (r) return !1;
	if (n !== null)
		switch (n.type) {
			case 3:
				return !t;
			case 4:
				return t === !1;
			case 5:
				return isNaN(t);
			case 6:
				return isNaN(t) || 1 > t;
		}
	return !1;
}
function ve(e, t, n, r, a, l, i) {
	(this.acceptsBooleans = t === 2 || t === 3 || t === 4),
		(this.attributeName = r),
		(this.attributeNamespace = a),
		(this.mustUseProperty = n),
		(this.propertyName = e),
		(this.type = t),
		(this.sanitizeURL = l),
		(this.removeEmptyString = i);
}
var se = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
	.split(" ")
	.forEach(function (e) {
		se[e] = new ve(e, 0, !1, e, null, !1, !1);
	}),
	[
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
	].forEach(function (e) {
		var t = e[0];
		se[t] = new ve(t, 1, !1, e[1], null, !1, !1);
	}),
	[
		"contentEditable",
		"draggable",
		"spellCheck",
		"value",
	].forEach(function (e) {
		se[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
	}),
	[
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha",
	].forEach(function (e) {
		se[e] = new ve(e, 2, !1, e, null, !1, !1);
	}),
	"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
		.split(" ")
		.forEach(function (e) {
			se[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
		}),
	["checked", "multiple", "muted", "selected"].forEach(
		function (e) {
			se[e] = new ve(e, 3, !0, e, null, !1, !1);
		}
	),
	["capture", "download"].forEach(function (e) {
		se[e] = new ve(e, 4, !1, e, null, !1, !1);
	}),
	["cols", "rows", "size", "span"].forEach(function (e) {
		se[e] = new ve(e, 6, !1, e, null, !1, !1);
	}),
	["rowSpan", "start"].forEach(function (e) {
		se[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
	});
var Vl = /[\-:]([a-z])/g;
function Hl(e) {
	return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
	.split(" ")
	.forEach(function (e) {
		var t = e.replace(Vl, Hl);
		se[t] = new ve(t, 1, !1, e, null, !1, !1);
	}),
	"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
		.split(" ")
		.forEach(function (e) {
			var t = e.replace(Vl, Hl);
			se[t] = new ve(
				t,
				1,
				!1,
				e,
				"http://www.w3.org/1999/xlink",
				!1,
				!1
			);
		}),
	["xml:base", "xml:lang", "xml:space"].forEach(function (
		e
	) {
		var t = e.replace(Vl, Hl);
		se[t] = new ve(
			t,
			1,
			!1,
			e,
			"http://www.w3.org/XML/1998/namespace",
			!1,
			!1
		);
	}),
	["tabIndex", "crossOrigin"].forEach(function (e) {
		se[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
	}),
	(se.xlinkHref = new ve(
		"xlinkHref",
		1,
		!1,
		"xlink:href",
		"http://www.w3.org/1999/xlink",
		!0,
		!1
	)),
	["src", "href", "action", "formAction"].forEach(function (
		e
	) {
		se[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
	});
function Ul(e, t, n, r) {
	var a = se.hasOwnProperty(t) ? se[t] : null;
	(a !== null
		? a.type !== 0
		: r ||
		  !(2 < t.length) ||
		  (t[0] !== "o" && t[0] !== "O") ||
		  (t[1] !== "n" && t[1] !== "N")) &&
		(rh(t, n, a, r) && (n = null),
		r || a === null
			? th(t) &&
			  (n === null
					? e.removeAttribute(t)
					: e.setAttribute(t, "" + n))
			: a.mustUseProperty
			? (e[a.propertyName] =
					n === null ? (a.type === 3 ? !1 : "") : n)
			: ((t = a.attributeName),
			  (r = a.attributeNamespace),
			  n === null
					? e.removeAttribute(t)
					: ((a = a.type),
					  (n = a === 3 || (a === 4 && n === !0) ? "" : "" + n),
					  r
							? e.setAttributeNS(r, t, n)
							: e.setAttribute(t, n))));
}
var ot =
		Jp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
	Zr = Symbol.for("react.element"),
	mn = Symbol.for("react.portal"),
	gn = Symbol.for("react.fragment"),
	Wl = Symbol.for("react.strict_mode"),
	Gl = Symbol.for("react.profiler"),
	Ys = Symbol.for("react.provider"),
	Ks = Symbol.for("react.context"),
	ql = Symbol.for("react.forward_ref"),
	Ql = Symbol.for("react.suspense"),
	Xl = Symbol.for("react.suspense_list"),
	Yl = Symbol.for("react.memo"),
	yt = Symbol.for("react.lazy"),
	Zs = Symbol.for("react.offscreen"),
	Js = Symbol.iterator;
function Yn(e) {
	return e === null || typeof e != "object"
		? null
		: ((e = (Js && e[Js]) || e["@@iterator"]),
		  typeof e == "function" ? e : null);
}
var X = Object.assign,
	Kl;
function Kn(e) {
	if (Kl === void 0)
		try {
			throw Error();
		} catch (n) {
			var t = n.stack.trim().match(/\n( *(at )?)/);
			Kl = (t && t[1]) || "";
		}
	return (
		`
` +
		Kl +
		e
	);
}
var Zl = !1;
function Jl(e, t) {
	if (!e || Zl) return "";
	Zl = !0;
	var n = Error.prepareStackTrace;
	Error.prepareStackTrace = void 0;
	try {
		if (t)
			if (
				((t = function () {
					throw Error();
				}),
				Object.defineProperty(t.prototype, "props", {
					set: function () {
						throw Error();
					},
				}),
				typeof Reflect == "object" && Reflect.construct)
			) {
				try {
					Reflect.construct(t, []);
				} catch (c) {
					var r = c;
				}
				Reflect.construct(e, [], t);
			} else {
				try {
					t.call();
				} catch (c) {
					r = c;
				}
				e.call(t.prototype);
			}
		else {
			try {
				throw Error();
			} catch (c) {
				r = c;
			}
			e();
		}
	} catch (c) {
		if (c && r && typeof c.stack == "string") {
			for (
				var a = c.stack.split(`
`),
					l = r.stack.split(`
`),
					i = a.length - 1,
					o = l.length - 1;
				1 <= i && 0 <= o && a[i] !== l[o];

			)
				o--;
			for (; 1 <= i && 0 <= o; i--, o--)
				if (a[i] !== l[o]) {
					if (i !== 1 || o !== 1)
						do
							if ((i--, o--, 0 > o || a[i] !== l[o])) {
								var s =
									`
` + a[i].replace(" at new ", " at ");
								return (
									e.displayName &&
										s.includes("<anonymous>") &&
										(s = s.replace("<anonymous>", e.displayName)),
									s
								);
							}
						while (1 <= i && 0 <= o);
					break;
				}
		}
	} finally {
		(Zl = !1), (Error.prepareStackTrace = n);
	}
	return (e = e ? e.displayName || e.name : "") ? Kn(e) : "";
}
function ah(e) {
	switch (e.tag) {
		case 5:
			return Kn(e.type);
		case 16:
			return Kn("Lazy");
		case 13:
			return Kn("Suspense");
		case 19:
			return Kn("SuspenseList");
		case 0:
		case 2:
		case 15:
			return (e = Jl(e.type, !1)), e;
		case 11:
			return (e = Jl(e.type.render, !1)), e;
		case 1:
			return (e = Jl(e.type, !0)), e;
		default:
			return "";
	}
}
function ei(e) {
	if (e == null) return null;
	if (typeof e == "function")
		return e.displayName || e.name || null;
	if (typeof e == "string") return e;
	switch (e) {
		case gn:
			return "Fragment";
		case mn:
			return "Portal";
		case Gl:
			return "Profiler";
		case Wl:
			return "StrictMode";
		case Ql:
			return "Suspense";
		case Xl:
			return "SuspenseList";
	}
	if (typeof e == "object")
		switch (e.$$typeof) {
			case Ks:
				return (e.displayName || "Context") + ".Consumer";
			case Ys:
				return (
					(e._context.displayName || "Context") + ".Provider"
				);
			case ql:
				var t = e.render;
				return (
					(e = e.displayName),
					e ||
						((e = t.displayName || t.name || ""),
						(e =
							e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
					e
				);
			case Yl:
				return (
					(t = e.displayName || null),
					t !== null ? t : ei(e.type) || "Memo"
				);
			case yt:
				(t = e._payload), (e = e._init);
				try {
					return ei(e(t));
				} catch {}
		}
	return null;
}
function lh(e) {
	var t = e.type;
	switch (e.tag) {
		case 24:
			return "Cache";
		case 9:
			return (t.displayName || "Context") + ".Consumer";
		case 10:
			return (
				(t._context.displayName || "Context") + ".Provider"
			);
		case 18:
			return "DehydratedFragment";
		case 11:
			return (
				(e = t.render),
				(e = e.displayName || e.name || ""),
				t.displayName ||
					(e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
			);
		case 7:
			return "Fragment";
		case 5:
			return t;
		case 4:
			return "Portal";
		case 3:
			return "Root";
		case 6:
			return "Text";
		case 16:
			return ei(t);
		case 8:
			return t === Wl ? "StrictMode" : "Mode";
		case 22:
			return "Offscreen";
		case 12:
			return "Profiler";
		case 21:
			return "Scope";
		case 13:
			return "Suspense";
		case 19:
			return "SuspenseList";
		case 25:
			return "TracingMarker";
		case 1:
		case 0:
		case 17:
		case 2:
		case 14:
		case 15:
			if (typeof t == "function")
				return t.displayName || t.name || null;
			if (typeof t == "string") return t;
	}
	return null;
}
function bt(e) {
	switch (typeof e) {
		case "boolean":
		case "number":
		case "string":
		case "undefined":
			return e;
		case "object":
			return e;
		default:
			return "";
	}
}
function eu(e) {
	var t = e.type;
	return (
		(e = e.nodeName) &&
		e.toLowerCase() === "input" &&
		(t === "checkbox" || t === "radio")
	);
}
function ih(e) {
	var t = eu(e) ? "checked" : "value",
		n = Object.getOwnPropertyDescriptor(
			e.constructor.prototype,
			t
		),
		r = "" + e[t];
	if (
		!e.hasOwnProperty(t) &&
		typeof n < "u" &&
		typeof n.get == "function" &&
		typeof n.set == "function"
	) {
		var a = n.get,
			l = n.set;
		return (
			Object.defineProperty(e, t, {
				configurable: !0,
				get: function () {
					return a.call(this);
				},
				set: function (i) {
					(r = "" + i), l.call(this, i);
				},
			}),
			Object.defineProperty(e, t, {
				enumerable: n.enumerable,
			}),
			{
				getValue: function () {
					return r;
				},
				setValue: function (i) {
					r = "" + i;
				},
				stopTracking: function () {
					(e._valueTracker = null), delete e[t];
				},
			}
		);
	}
}
function Jr(e) {
	e._valueTracker || (e._valueTracker = ih(e));
}
function tu(e) {
	if (!e) return !1;
	var t = e._valueTracker;
	if (!t) return !0;
	var n = t.getValue(),
		r = "";
	return (
		e &&
			(r = eu(e) ? (e.checked ? "true" : "false") : e.value),
		(e = r),
		e !== n ? (t.setValue(e), !0) : !1
	);
}
function ea(e) {
	if (
		((e = e || (typeof document < "u" ? document : void 0)),
		typeof e > "u")
	)
		return null;
	try {
		return e.activeElement || e.body;
	} catch {
		return e.body;
	}
}
function ti(e, t) {
	var n = t.checked;
	return X({}, t, {
		defaultChecked: void 0,
		defaultValue: void 0,
		value: void 0,
		checked: n ?? e._wrapperState.initialChecked,
	});
}
function nu(e, t) {
	var n = t.defaultValue == null ? "" : t.defaultValue,
		r = t.checked != null ? t.checked : t.defaultChecked;
	(n = bt(t.value != null ? t.value : n)),
		(e._wrapperState = {
			initialChecked: r,
			initialValue: n,
			controlled:
				t.type === "checkbox" || t.type === "radio"
					? t.checked != null
					: t.value != null,
		});
}
function ru(e, t) {
	(t = t.checked), t != null && Ul(e, "checked", t, !1);
}
function ni(e, t) {
	ru(e, t);
	var n = bt(t.value),
		r = t.type;
	if (n != null)
		r === "number"
			? ((n === 0 && e.value === "") || e.value != n) &&
			  (e.value = "" + n)
			: e.value !== "" + n && (e.value = "" + n);
	else if (r === "submit" || r === "reset") {
		e.removeAttribute("value");
		return;
	}
	t.hasOwnProperty("value")
		? ri(e, t.type, n)
		: t.hasOwnProperty("defaultValue") &&
		  ri(e, t.type, bt(t.defaultValue)),
		t.checked == null &&
			t.defaultChecked != null &&
			(e.defaultChecked = !!t.defaultChecked);
}
function au(e, t, n) {
	if (
		t.hasOwnProperty("value") ||
		t.hasOwnProperty("defaultValue")
	) {
		var r = t.type;
		if (
			!(
				(r !== "submit" && r !== "reset") ||
				(t.value !== void 0 && t.value !== null)
			)
		)
			return;
		(t = "" + e._wrapperState.initialValue),
			n || t === e.value || (e.value = t),
			(e.defaultValue = t);
	}
	(n = e.name),
		n !== "" && (e.name = ""),
		(e.defaultChecked = !!e._wrapperState.initialChecked),
		n !== "" && (e.name = n);
}
function ri(e, t, n) {
	(t !== "number" || ea(e.ownerDocument) !== e) &&
		(n == null
			? (e.defaultValue = "" + e._wrapperState.initialValue)
			: e.defaultValue !== "" + n &&
			  (e.defaultValue = "" + n));
}
var Zn = Array.isArray;
function vn(e, t, n, r) {
	if (((e = e.options), t)) {
		t = {};
		for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
		for (n = 0; n < e.length; n++)
			(a = t.hasOwnProperty("$" + e[n].value)),
				e[n].selected !== a && (e[n].selected = a),
				a && r && (e[n].defaultSelected = !0);
	} else {
		for (n = "" + bt(n), t = null, a = 0; a < e.length; a++) {
			if (e[a].value === n) {
				(e[a].selected = !0), r && (e[a].defaultSelected = !0);
				return;
			}
			t !== null || e[a].disabled || (t = e[a]);
		}
		t !== null && (t.selected = !0);
	}
}
function ai(e, t) {
	if (t.dangerouslySetInnerHTML != null) throw Error(_(91));
	return X({}, t, {
		value: void 0,
		defaultValue: void 0,
		children: "" + e._wrapperState.initialValue,
	});
}
function lu(e, t) {
	var n = t.value;
	if (n == null) {
		if (((n = t.children), (t = t.defaultValue), n != null)) {
			if (t != null) throw Error(_(92));
			if (Zn(n)) {
				if (1 < n.length) throw Error(_(93));
				n = n[0];
			}
			t = n;
		}
		t == null && (t = ""), (n = t);
	}
	e._wrapperState = { initialValue: bt(n) };
}
function iu(e, t) {
	var n = bt(t.value),
		r = bt(t.defaultValue);
	n != null &&
		((n = "" + n),
		n !== e.value && (e.value = n),
		t.defaultValue == null &&
			e.defaultValue !== n &&
			(e.defaultValue = n)),
		r != null && (e.defaultValue = "" + r);
}
function ou(e) {
	var t = e.textContent;
	t === e._wrapperState.initialValue &&
		t !== "" &&
		t !== null &&
		(e.value = t);
}
function su(e) {
	switch (e) {
		case "svg":
			return "http://www.w3.org/2000/svg";
		case "math":
			return "http://www.w3.org/1998/Math/MathML";
		default:
			return "http://www.w3.org/1999/xhtml";
	}
}
function li(e, t) {
	return e == null || e === "http://www.w3.org/1999/xhtml"
		? su(t)
		: e === "http://www.w3.org/2000/svg" &&
		  t === "foreignObject"
		? "http://www.w3.org/1999/xhtml"
		: e;
}
var ta,
	uu = (function (e) {
		return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
			? function (t, n, r, a) {
					MSApp.execUnsafeLocalFunction(function () {
						return e(t, n, r, a);
					});
			  }
			: e;
	})(function (e, t) {
		if (
			e.namespaceURI !== "http://www.w3.org/2000/svg" ||
			"innerHTML" in e
		)
			e.innerHTML = t;
		else {
			for (
				ta = ta || document.createElement("div"),
					ta.innerHTML =
						"<svg>" + t.valueOf().toString() + "</svg>",
					t = ta.firstChild;
				e.firstChild;

			)
				e.removeChild(e.firstChild);
			for (; t.firstChild; ) e.appendChild(t.firstChild);
		}
	});
function Jn(e, t) {
	if (t) {
		var n = e.firstChild;
		if (n && n === e.lastChild && n.nodeType === 3) {
			n.nodeValue = t;
			return;
		}
	}
	e.textContent = t;
}
var er = {
		animationIterationCount: !0,
		aspectRatio: !0,
		borderImageOutset: !0,
		borderImageSlice: !0,
		borderImageWidth: !0,
		boxFlex: !0,
		boxFlexGroup: !0,
		boxOrdinalGroup: !0,
		columnCount: !0,
		columns: !0,
		flex: !0,
		flexGrow: !0,
		flexPositive: !0,
		flexShrink: !0,
		flexNegative: !0,
		flexOrder: !0,
		gridArea: !0,
		gridRow: !0,
		gridRowEnd: !0,
		gridRowSpan: !0,
		gridRowStart: !0,
		gridColumn: !0,
		gridColumnEnd: !0,
		gridColumnSpan: !0,
		gridColumnStart: !0,
		fontWeight: !0,
		lineClamp: !0,
		lineHeight: !0,
		opacity: !0,
		order: !0,
		orphans: !0,
		tabSize: !0,
		widows: !0,
		zIndex: !0,
		zoom: !0,
		fillOpacity: !0,
		floodOpacity: !0,
		stopOpacity: !0,
		strokeDasharray: !0,
		strokeDashoffset: !0,
		strokeMiterlimit: !0,
		strokeOpacity: !0,
		strokeWidth: !0,
	},
	oh = ["Webkit", "ms", "Moz", "O"];
Object.keys(er).forEach(function (e) {
	oh.forEach(function (t) {
		(t = t + e.charAt(0).toUpperCase() + e.substring(1)),
			(er[t] = er[e]);
	});
});
function cu(e, t, n) {
	return t == null || typeof t == "boolean" || t === ""
		? ""
		: n ||
		  typeof t != "number" ||
		  t === 0 ||
		  (er.hasOwnProperty(e) && er[e])
		? ("" + t).trim()
		: t + "px";
}
function du(e, t) {
	e = e.style;
	for (var n in t)
		if (t.hasOwnProperty(n)) {
			var r = n.indexOf("--") === 0,
				a = cu(n, t[n], r);
			n === "float" && (n = "cssFloat"),
				r ? e.setProperty(n, a) : (e[n] = a);
		}
}
var sh = X(
	{ menuitem: !0 },
	{
		area: !0,
		base: !0,
		br: !0,
		col: !0,
		embed: !0,
		hr: !0,
		img: !0,
		input: !0,
		keygen: !0,
		link: !0,
		meta: !0,
		param: !0,
		source: !0,
		track: !0,
		wbr: !0,
	}
);
function ii(e, t) {
	if (t) {
		if (
			sh[e] &&
			(t.children != null || t.dangerouslySetInnerHTML != null)
		)
			throw Error(_(137, e));
		if (t.dangerouslySetInnerHTML != null) {
			if (t.children != null) throw Error(_(60));
			if (
				typeof t.dangerouslySetInnerHTML != "object" ||
				!("__html" in t.dangerouslySetInnerHTML)
			)
				throw Error(_(61));
		}
		if (t.style != null && typeof t.style != "object")
			throw Error(_(62));
	}
}
function oi(e, t) {
	if (e.indexOf("-") === -1) return typeof t.is == "string";
	switch (e) {
		case "annotation-xml":
		case "color-profile":
		case "font-face":
		case "font-face-src":
		case "font-face-uri":
		case "font-face-format":
		case "font-face-name":
		case "missing-glyph":
			return !1;
		default:
			return !0;
	}
}
var si = null;
function ui(e) {
	return (
		(e = e.target || e.srcElement || window),
		e.correspondingUseElement &&
			(e = e.correspondingUseElement),
		e.nodeType === 3 ? e.parentNode : e
	);
}
var ci = null,
	yn = null,
	bn = null;
function fu(e) {
	if ((e = xr(e))) {
		if (typeof ci != "function") throw Error(_(280));
		var t = e.stateNode;
		t && ((t = Ea(t)), ci(e.stateNode, e.type, t));
	}
}
function pu(e) {
	yn ? (bn ? bn.push(e) : (bn = [e])) : (yn = e);
}
function hu() {
	if (yn) {
		var e = yn,
			t = bn;
		if (((bn = yn = null), fu(e), t))
			for (e = 0; e < t.length; e++) fu(t[e]);
	}
}
function mu(e, t) {
	return e(t);
}
function gu() {}
var di = !1;
function vu(e, t, n) {
	if (di) return e(t, n);
	di = !0;
	try {
		return mu(e, t, n);
	} finally {
		(di = !1), (yn !== null || bn !== null) && (gu(), hu());
	}
}
function tr(e, t) {
	var n = e.stateNode;
	if (n === null) return null;
	var r = Ea(n);
	if (r === null) return null;
	n = r[t];
	e: switch (t) {
		case "onClick":
		case "onClickCapture":
		case "onDoubleClick":
		case "onDoubleClickCapture":
		case "onMouseDown":
		case "onMouseDownCapture":
		case "onMouseMove":
		case "onMouseMoveCapture":
		case "onMouseUp":
		case "onMouseUpCapture":
		case "onMouseEnter":
			(r = !r.disabled) ||
				((e = e.type),
				(r = !(
					e === "button" ||
					e === "input" ||
					e === "select" ||
					e === "textarea"
				))),
				(e = !r);
			break e;
		default:
			e = !1;
	}
	if (e) return null;
	if (n && typeof n != "function")
		throw Error(_(231, t, typeof n));
	return n;
}
var fi = !1;
if (it)
	try {
		var nr = {};
		Object.defineProperty(nr, "passive", {
			get: function () {
				fi = !0;
			},
		}),
			window.addEventListener("test", nr, nr),
			window.removeEventListener("test", nr, nr);
	} catch {
		fi = !1;
	}
function uh(e, t, n, r, a, l, i, o, s) {
	var c = Array.prototype.slice.call(arguments, 3);
	try {
		t.apply(n, c);
	} catch (d) {
		this.onError(d);
	}
}
var rr = !1,
	na = null,
	ra = !1,
	pi = null,
	ch = {
		onError: function (e) {
			(rr = !0), (na = e);
		},
	};
function dh(e, t, n, r, a, l, i, o, s) {
	(rr = !1), (na = null), uh.apply(ch, arguments);
}
function fh(e, t, n, r, a, l, i, o, s) {
	if ((dh.apply(this, arguments), rr)) {
		if (rr) {
			var c = na;
			(rr = !1), (na = null);
		} else throw Error(_(198));
		ra || ((ra = !0), (pi = c));
	}
}
function Wt(e) {
	var t = e,
		n = e;
	if (e.alternate) for (; t.return; ) t = t.return;
	else {
		e = t;
		do
			(t = e),
				t.flags & 4098 && (n = t.return),
				(e = t.return);
		while (e);
	}
	return t.tag === 3 ? n : null;
}
function yu(e) {
	if (e.tag === 13) {
		var t = e.memoizedState;
		if (
			(t === null &&
				((e = e.alternate),
				e !== null && (t = e.memoizedState)),
			t !== null)
		)
			return t.dehydrated;
	}
	return null;
}
function bu(e) {
	if (Wt(e) !== e) throw Error(_(188));
}
function ph(e) {
	var t = e.alternate;
	if (!t) {
		if (((t = Wt(e)), t === null)) throw Error(_(188));
		return t !== e ? null : e;
	}
	for (var n = e, r = t; ; ) {
		var a = n.return;
		if (a === null) break;
		var l = a.alternate;
		if (l === null) {
			if (((r = a.return), r !== null)) {
				n = r;
				continue;
			}
			break;
		}
		if (a.child === l.child) {
			for (l = a.child; l; ) {
				if (l === n) return bu(a), e;
				if (l === r) return bu(a), t;
				l = l.sibling;
			}
			throw Error(_(188));
		}
		if (n.return !== r.return) (n = a), (r = l);
		else {
			for (var i = !1, o = a.child; o; ) {
				if (o === n) {
					(i = !0), (n = a), (r = l);
					break;
				}
				if (o === r) {
					(i = !0), (r = a), (n = l);
					break;
				}
				o = o.sibling;
			}
			if (!i) {
				for (o = l.child; o; ) {
					if (o === n) {
						(i = !0), (n = l), (r = a);
						break;
					}
					if (o === r) {
						(i = !0), (r = l), (n = a);
						break;
					}
					o = o.sibling;
				}
				if (!i) throw Error(_(189));
			}
		}
		if (n.alternate !== r) throw Error(_(190));
	}
	if (n.tag !== 3) throw Error(_(188));
	return n.stateNode.current === n ? e : t;
}
function wu(e) {
	return (e = ph(e)), e !== null ? Su(e) : null;
}
function Su(e) {
	if (e.tag === 5 || e.tag === 6) return e;
	for (e = e.child; e !== null; ) {
		var t = Su(e);
		if (t !== null) return t;
		e = e.sibling;
	}
	return null;
}
var xu = Pe.unstable_scheduleCallback,
	ku = Pe.unstable_cancelCallback,
	hh = Pe.unstable_shouldYield,
	mh = Pe.unstable_requestPaint,
	J = Pe.unstable_now,
	gh = Pe.unstable_getCurrentPriorityLevel,
	hi = Pe.unstable_ImmediatePriority,
	Eu = Pe.unstable_UserBlockingPriority,
	aa = Pe.unstable_NormalPriority,
	vh = Pe.unstable_LowPriority,
	Cu = Pe.unstable_IdlePriority,
	la = null,
	Ze = null;
function yh(e) {
	if (Ze && typeof Ze.onCommitFiberRoot == "function")
		try {
			Ze.onCommitFiberRoot(
				la,
				e,
				void 0,
				(e.current.flags & 128) === 128
			);
		} catch {}
}
var Ue = Math.clz32 ? Math.clz32 : Sh,
	bh = Math.log,
	wh = Math.LN2;
function Sh(e) {
	return (
		(e >>>= 0), e === 0 ? 32 : (31 - ((bh(e) / wh) | 0)) | 0
	);
}
var ia = 64,
	oa = 4194304;
function ar(e) {
	switch (e & -e) {
		case 1:
			return 1;
		case 2:
			return 2;
		case 4:
			return 4;
		case 8:
			return 8;
		case 16:
			return 16;
		case 32:
			return 32;
		case 64:
		case 128:
		case 256:
		case 512:
		case 1024:
		case 2048:
		case 4096:
		case 8192:
		case 16384:
		case 32768:
		case 65536:
		case 131072:
		case 262144:
		case 524288:
		case 1048576:
		case 2097152:
			return e & 4194240;
		case 4194304:
		case 8388608:
		case 16777216:
		case 33554432:
		case 67108864:
			return e & 130023424;
		case 134217728:
			return 134217728;
		case 268435456:
			return 268435456;
		case 536870912:
			return 536870912;
		case 1073741824:
			return 1073741824;
		default:
			return e;
	}
}
function sa(e, t) {
	var n = e.pendingLanes;
	if (n === 0) return 0;
	var r = 0,
		a = e.suspendedLanes,
		l = e.pingedLanes,
		i = n & 268435455;
	if (i !== 0) {
		var o = i & ~a;
		o !== 0
			? (r = ar(o))
			: ((l &= i), l !== 0 && (r = ar(l)));
	} else
		(i = n & ~a),
			i !== 0 ? (r = ar(i)) : l !== 0 && (r = ar(l));
	if (r === 0) return 0;
	if (
		t !== 0 &&
		t !== r &&
		!(t & a) &&
		((a = r & -r),
		(l = t & -t),
		a >= l || (a === 16 && (l & 4194240) !== 0))
	)
		return t;
	if (
		(r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0)
	)
		for (e = e.entanglements, t &= r; 0 < t; )
			(n = 31 - Ue(t)), (a = 1 << n), (r |= e[n]), (t &= ~a);
	return r;
}
function xh(e, t) {
	switch (e) {
		case 1:
		case 2:
		case 4:
			return t + 250;
		case 8:
		case 16:
		case 32:
		case 64:
		case 128:
		case 256:
		case 512:
		case 1024:
		case 2048:
		case 4096:
		case 8192:
		case 16384:
		case 32768:
		case 65536:
		case 131072:
		case 262144:
		case 524288:
		case 1048576:
		case 2097152:
			return t + 5e3;
		case 4194304:
		case 8388608:
		case 16777216:
		case 33554432:
		case 67108864:
			return -1;
		case 134217728:
		case 268435456:
		case 536870912:
		case 1073741824:
			return -1;
		default:
			return -1;
	}
}
function kh(e, t) {
	for (
		var n = e.suspendedLanes,
			r = e.pingedLanes,
			a = e.expirationTimes,
			l = e.pendingLanes;
		0 < l;

	) {
		var i = 31 - Ue(l),
			o = 1 << i,
			s = a[i];
		s === -1
			? (!(o & n) || o & r) && (a[i] = xh(o, t))
			: s <= t && (e.expiredLanes |= o),
			(l &= ~o);
	}
}
function mi(e) {
	return (
		(e = e.pendingLanes & -1073741825),
		e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
	);
}
function Tu() {
	var e = ia;
	return (ia <<= 1), !(ia & 4194240) && (ia = 64), e;
}
function gi(e) {
	for (var t = [], n = 0; 31 > n; n++) t.push(e);
	return t;
}
function lr(e, t, n) {
	(e.pendingLanes |= t),
		t !== 536870912 &&
			((e.suspendedLanes = 0), (e.pingedLanes = 0)),
		(e = e.eventTimes),
		(t = 31 - Ue(t)),
		(e[t] = n);
}
function Eh(e, t) {
	var n = e.pendingLanes & ~t;
	(e.pendingLanes = t),
		(e.suspendedLanes = 0),
		(e.pingedLanes = 0),
		(e.expiredLanes &= t),
		(e.mutableReadLanes &= t),
		(e.entangledLanes &= t),
		(t = e.entanglements);
	var r = e.eventTimes;
	for (e = e.expirationTimes; 0 < n; ) {
		var a = 31 - Ue(n),
			l = 1 << a;
		(t[a] = 0), (r[a] = -1), (e[a] = -1), (n &= ~l);
	}
}
function vi(e, t) {
	var n = (e.entangledLanes |= t);
	for (e = e.entanglements; n; ) {
		var r = 31 - Ue(n),
			a = 1 << r;
		(a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a);
	}
}
var V = 0;
function _u(e) {
	return (
		(e &= -e),
		1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1
	);
}
var Pu,
	yi,
	Ou,
	Lu,
	zu,
	bi = !1,
	ua = [],
	wt = null,
	St = null,
	xt = null,
	ir = new Map(),
	or = new Map(),
	kt = [],
	Ch =
		"mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
			" "
		);
function Mu(e, t) {
	switch (e) {
		case "focusin":
		case "focusout":
			wt = null;
			break;
		case "dragenter":
		case "dragleave":
			St = null;
			break;
		case "mouseover":
		case "mouseout":
			xt = null;
			break;
		case "pointerover":
		case "pointerout":
			ir.delete(t.pointerId);
			break;
		case "gotpointercapture":
		case "lostpointercapture":
			or.delete(t.pointerId);
	}
}
function sr(e, t, n, r, a, l) {
	return e === null || e.nativeEvent !== l
		? ((e = {
				blockedOn: t,
				domEventName: n,
				eventSystemFlags: r,
				nativeEvent: l,
				targetContainers: [a],
		  }),
		  t !== null && ((t = xr(t)), t !== null && yi(t)),
		  e)
		: ((e.eventSystemFlags |= r),
		  (t = e.targetContainers),
		  a !== null && t.indexOf(a) === -1 && t.push(a),
		  e);
}
function Th(e, t, n, r, a) {
	switch (t) {
		case "focusin":
			return (wt = sr(wt, e, t, n, r, a)), !0;
		case "dragenter":
			return (St = sr(St, e, t, n, r, a)), !0;
		case "mouseover":
			return (xt = sr(xt, e, t, n, r, a)), !0;
		case "pointerover":
			var l = a.pointerId;
			return (
				ir.set(l, sr(ir.get(l) || null, e, t, n, r, a)), !0
			);
		case "gotpointercapture":
			return (
				(l = a.pointerId),
				or.set(l, sr(or.get(l) || null, e, t, n, r, a)),
				!0
			);
	}
	return !1;
}
function Nu(e) {
	var t = Gt(e.target);
	if (t !== null) {
		var n = Wt(t);
		if (n !== null) {
			if (((t = n.tag), t === 13)) {
				if (((t = yu(n)), t !== null)) {
					(e.blockedOn = t),
						zu(e.priority, function () {
							Ou(n);
						});
					return;
				}
			} else if (
				t === 3 &&
				n.stateNode.current.memoizedState.isDehydrated
			) {
				e.blockedOn =
					n.tag === 3 ? n.stateNode.containerInfo : null;
				return;
			}
		}
	}
	e.blockedOn = null;
}
function ca(e) {
	if (e.blockedOn !== null) return !1;
	for (var t = e.targetContainers; 0 < t.length; ) {
		var n = Si(
			e.domEventName,
			e.eventSystemFlags,
			t[0],
			e.nativeEvent
		);
		if (n === null) {
			n = e.nativeEvent;
			var r = new n.constructor(n.type, n);
			(si = r), n.target.dispatchEvent(r), (si = null);
		} else
			return (
				(t = xr(n)), t !== null && yi(t), (e.blockedOn = n), !1
			);
		t.shift();
	}
	return !0;
}
function Iu(e, t, n) {
	ca(e) && n.delete(t);
}
function _h() {
	(bi = !1),
		wt !== null && ca(wt) && (wt = null),
		St !== null && ca(St) && (St = null),
		xt !== null && ca(xt) && (xt = null),
		ir.forEach(Iu),
		or.forEach(Iu);
}
function ur(e, t) {
	e.blockedOn === t &&
		((e.blockedOn = null),
		bi ||
			((bi = !0),
			Pe.unstable_scheduleCallback(
				Pe.unstable_NormalPriority,
				_h
			)));
}
function cr(e) {
	function t(a) {
		return ur(a, e);
	}
	if (0 < ua.length) {
		ur(ua[0], e);
		for (var n = 1; n < ua.length; n++) {
			var r = ua[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
	}
	for (
		wt !== null && ur(wt, e),
			St !== null && ur(St, e),
			xt !== null && ur(xt, e),
			ir.forEach(t),
			or.forEach(t),
			n = 0;
		n < kt.length;
		n++
	)
		(r = kt[n]), r.blockedOn === e && (r.blockedOn = null);
	for (
		;
		0 < kt.length && ((n = kt[0]), n.blockedOn === null);

	)
		Nu(n), n.blockedOn === null && kt.shift();
}
var wn = ot.ReactCurrentBatchConfig,
	da = !0;
function Ph(e, t, n, r) {
	var a = V,
		l = wn.transition;
	wn.transition = null;
	try {
		(V = 1), wi(e, t, n, r);
	} finally {
		(V = a), (wn.transition = l);
	}
}
function Oh(e, t, n, r) {
	var a = V,
		l = wn.transition;
	wn.transition = null;
	try {
		(V = 4), wi(e, t, n, r);
	} finally {
		(V = a), (wn.transition = l);
	}
}
function wi(e, t, n, r) {
	if (da) {
		var a = Si(e, t, n, r);
		if (a === null) Di(e, t, r, fa, n), Mu(e, r);
		else if (Th(a, e, t, n, r)) r.stopPropagation();
		else if ((Mu(e, r), t & 4 && -1 < Ch.indexOf(e))) {
			for (; a !== null; ) {
				var l = xr(a);
				if (
					(l !== null && Pu(l),
					(l = Si(e, t, n, r)),
					l === null && Di(e, t, r, fa, n),
					l === a)
				)
					break;
				a = l;
			}
			a !== null && r.stopPropagation();
		} else Di(e, t, r, null, n);
	}
}
var fa = null;
function Si(e, t, n, r) {
	if (((fa = null), (e = ui(r)), (e = Gt(e)), e !== null))
		if (((t = Wt(e)), t === null)) e = null;
		else if (((n = t.tag), n === 13)) {
			if (((e = yu(t)), e !== null)) return e;
			e = null;
		} else if (n === 3) {
			if (t.stateNode.current.memoizedState.isDehydrated)
				return t.tag === 3 ? t.stateNode.containerInfo : null;
			e = null;
		} else t !== e && (e = null);
	return (fa = e), null;
}
function ju(e) {
	switch (e) {
		case "cancel":
		case "click":
		case "close":
		case "contextmenu":
		case "copy":
		case "cut":
		case "auxclick":
		case "dblclick":
		case "dragend":
		case "dragstart":
		case "drop":
		case "focusin":
		case "focusout":
		case "input":
		case "invalid":
		case "keydown":
		case "keypress":
		case "keyup":
		case "mousedown":
		case "mouseup":
		case "paste":
		case "pause":
		case "play":
		case "pointercancel":
		case "pointerdown":
		case "pointerup":
		case "ratechange":
		case "reset":
		case "resize":
		case "seeked":
		case "submit":
		case "touchcancel":
		case "touchend":
		case "touchstart":
		case "volumechange":
		case "change":
		case "selectionchange":
		case "textInput":
		case "compositionstart":
		case "compositionend":
		case "compositionupdate":
		case "beforeblur":
		case "afterblur":
		case "beforeinput":
		case "blur":
		case "fullscreenchange":
		case "focus":
		case "hashchange":
		case "popstate":
		case "select":
		case "selectstart":
			return 1;
		case "drag":
		case "dragenter":
		case "dragexit":
		case "dragleave":
		case "dragover":
		case "mousemove":
		case "mouseout":
		case "mouseover":
		case "pointermove":
		case "pointerout":
		case "pointerover":
		case "scroll":
		case "toggle":
		case "touchmove":
		case "wheel":
		case "mouseenter":
		case "mouseleave":
		case "pointerenter":
		case "pointerleave":
			return 4;
		case "message":
			switch (gh()) {
				case hi:
					return 1;
				case Eu:
					return 4;
				case aa:
				case vh:
					return 16;
				case Cu:
					return 536870912;
				default:
					return 16;
			}
		default:
			return 16;
	}
}
var Et = null,
	xi = null,
	pa = null;
function Ru() {
	if (pa) return pa;
	var e,
		t = xi,
		n = t.length,
		r,
		a = "value" in Et ? Et.value : Et.textContent,
		l = a.length;
	for (e = 0; e < n && t[e] === a[e]; e++);
	var i = n - e;
	for (r = 1; r <= i && t[n - r] === a[l - r]; r++);
	return (pa = a.slice(e, 1 < r ? 1 - r : void 0));
}
function ha(e) {
	var t = e.keyCode;
	return (
		"charCode" in e
			? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
			: (e = t),
		e === 10 && (e = 13),
		32 <= e || e === 13 ? e : 0
	);
}
function ma() {
	return !0;
}
function Au() {
	return !1;
}
function Oe(e) {
	function t(n, r, a, l, i) {
		(this._reactName = n),
			(this._targetInst = a),
			(this.type = r),
			(this.nativeEvent = l),
			(this.target = i),
			(this.currentTarget = null);
		for (var o in e)
			e.hasOwnProperty(o) &&
				((n = e[o]), (this[o] = n ? n(l) : l[o]));
		return (
			(this.isDefaultPrevented = (
				l.defaultPrevented != null
					? l.defaultPrevented
					: l.returnValue === !1
			)
				? ma
				: Au),
			(this.isPropagationStopped = Au),
			this
		);
	}
	return (
		X(t.prototype, {
			preventDefault: function () {
				this.defaultPrevented = !0;
				var n = this.nativeEvent;
				n &&
					(n.preventDefault
						? n.preventDefault()
						: typeof n.returnValue != "unknown" &&
						  (n.returnValue = !1),
					(this.isDefaultPrevented = ma));
			},
			stopPropagation: function () {
				var n = this.nativeEvent;
				n &&
					(n.stopPropagation
						? n.stopPropagation()
						: typeof n.cancelBubble != "unknown" &&
						  (n.cancelBubble = !0),
					(this.isPropagationStopped = ma));
			},
			persist: function () {},
			isPersistent: ma,
		}),
		t
	);
}
var Sn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function (e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0,
	},
	ki = Oe(Sn),
	dr = X({}, Sn, { view: 0, detail: 0 }),
	Lh = Oe(dr),
	Ei,
	Ci,
	fr,
	ga = X({}, dr, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: _i,
		button: 0,
		buttons: 0,
		relatedTarget: function (e) {
			return e.relatedTarget === void 0
				? e.fromElement === e.srcElement
					? e.toElement
					: e.fromElement
				: e.relatedTarget;
		},
		movementX: function (e) {
			return "movementX" in e
				? e.movementX
				: (e !== fr &&
						(fr && e.type === "mousemove"
							? ((Ei = e.screenX - fr.screenX),
							  (Ci = e.screenY - fr.screenY))
							: (Ci = Ei = 0),
						(fr = e)),
				  Ei);
		},
		movementY: function (e) {
			return "movementY" in e ? e.movementY : Ci;
		},
	}),
	Du = Oe(ga),
	zh = X({}, ga, { dataTransfer: 0 }),
	Mh = Oe(zh),
	Nh = X({}, dr, { relatedTarget: 0 }),
	Ti = Oe(Nh),
	Ih = X({}, Sn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0,
	}),
	jh = Oe(Ih),
	Rh = X({}, Sn, {
		clipboardData: function (e) {
			return "clipboardData" in e
				? e.clipboardData
				: window.clipboardData;
		},
	}),
	Ah = Oe(Rh),
	Dh = X({}, Sn, { data: 0 }),
	Fu = Oe(Dh),
	Fh = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified",
	},
	$h = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta",
	},
	Bh = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey",
	};
function Vh(e) {
	var t = this.nativeEvent;
	return t.getModifierState
		? t.getModifierState(e)
		: (e = Bh[e])
		? !!t[e]
		: !1;
}
function _i() {
	return Vh;
}
var Hh = X({}, dr, {
		key: function (e) {
			if (e.key) {
				var t = Fh[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress"
				? ((e = ha(e)),
				  e === 13 ? "Enter" : String.fromCharCode(e))
				: e.type === "keydown" || e.type === "keyup"
				? $h[e.keyCode] || "Unidentified"
				: "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: _i,
		charCode: function (e) {
			return e.type === "keypress" ? ha(e) : 0;
		},
		keyCode: function (e) {
			return e.type === "keydown" || e.type === "keyup"
				? e.keyCode
				: 0;
		},
		which: function (e) {
			return e.type === "keypress"
				? ha(e)
				: e.type === "keydown" || e.type === "keyup"
				? e.keyCode
				: 0;
		},
	}),
	Uh = Oe(Hh),
	Wh = X({}, ga, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0,
	}),
	$u = Oe(Wh),
	Gh = X({}, dr, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: _i,
	}),
	qh = Oe(Gh),
	Qh = X({}, Sn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0,
	}),
	Xh = Oe(Qh),
	Yh = X({}, ga, {
		deltaX: function (e) {
			return "deltaX" in e
				? e.deltaX
				: "wheelDeltaX" in e
				? -e.wheelDeltaX
				: 0;
		},
		deltaY: function (e) {
			return "deltaY" in e
				? e.deltaY
				: "wheelDeltaY" in e
				? -e.wheelDeltaY
				: "wheelDelta" in e
				? -e.wheelDelta
				: 0;
		},
		deltaZ: 0,
		deltaMode: 0,
	}),
	Kh = Oe(Yh),
	Zh = [9, 13, 27, 32],
	Pi = it && "CompositionEvent" in window,
	pr = null;
it &&
	"documentMode" in document &&
	(pr = document.documentMode);
var Jh = it && "TextEvent" in window && !pr,
	Bu = it && (!Pi || (pr && 8 < pr && 11 >= pr)),
	Vu = " ",
	Hu = !1;
function Uu(e, t) {
	switch (e) {
		case "keyup":
			return Zh.indexOf(t.keyCode) !== -1;
		case "keydown":
			return t.keyCode !== 229;
		case "keypress":
		case "mousedown":
		case "focusout":
			return !0;
		default:
			return !1;
	}
}
function Wu(e) {
	return (
		(e = e.detail),
		typeof e == "object" && "data" in e ? e.data : null
	);
}
var xn = !1;
function em(e, t) {
	switch (e) {
		case "compositionend":
			return Wu(t);
		case "keypress":
			return t.which !== 32 ? null : ((Hu = !0), Vu);
		case "textInput":
			return (e = t.data), e === Vu && Hu ? null : e;
		default:
			return null;
	}
}
function tm(e, t) {
	if (xn)
		return e === "compositionend" || (!Pi && Uu(e, t))
			? ((e = Ru()), (pa = xi = Et = null), (xn = !1), e)
			: null;
	switch (e) {
		case "paste":
			return null;
		case "keypress":
			if (
				!(t.ctrlKey || t.altKey || t.metaKey) ||
				(t.ctrlKey && t.altKey)
			) {
				if (t.char && 1 < t.char.length) return t.char;
				if (t.which) return String.fromCharCode(t.which);
			}
			return null;
		case "compositionend":
			return Bu && t.locale !== "ko" ? null : t.data;
		default:
			return null;
	}
}
var nm = {
	color: !0,
	date: !0,
	datetime: !0,
	"datetime-local": !0,
	email: !0,
	month: !0,
	number: !0,
	password: !0,
	range: !0,
	search: !0,
	tel: !0,
	text: !0,
	time: !0,
	url: !0,
	week: !0,
};
function Gu(e) {
	var t = e && e.nodeName && e.nodeName.toLowerCase();
	return t === "input" ? !!nm[e.type] : t === "textarea";
}
function qu(e, t, n, r) {
	pu(r),
		(t = Sa(t, "onChange")),
		0 < t.length &&
			((n = new ki("onChange", "change", null, n, r)),
			e.push({ event: n, listeners: t }));
}
var hr = null,
	mr = null;
function rm(e) {
	dc(e, 0);
}
function va(e) {
	var t = _n(e);
	if (tu(t)) return e;
}
function am(e, t) {
	if (e === "change") return t;
}
var Qu = !1;
if (it) {
	var Oi;
	if (it) {
		var Li = "oninput" in document;
		if (!Li) {
			var Xu = document.createElement("div");
			Xu.setAttribute("oninput", "return;"),
				(Li = typeof Xu.oninput == "function");
		}
		Oi = Li;
	} else Oi = !1;
	Qu =
		Oi &&
		(!document.documentMode || 9 < document.documentMode);
}
function Yu() {
	hr &&
		(hr.detachEvent("onpropertychange", Ku),
		(mr = hr = null));
}
function Ku(e) {
	if (e.propertyName === "value" && va(mr)) {
		var t = [];
		qu(t, mr, e, ui(e)), vu(rm, t);
	}
}
function lm(e, t, n) {
	e === "focusin"
		? (Yu(),
		  (hr = t),
		  (mr = n),
		  hr.attachEvent("onpropertychange", Ku))
		: e === "focusout" && Yu();
}
function im(e) {
	if (
		e === "selectionchange" ||
		e === "keyup" ||
		e === "keydown"
	)
		return va(mr);
}
function om(e, t) {
	if (e === "click") return va(t);
}
function sm(e, t) {
	if (e === "input" || e === "change") return va(t);
}
function um(e, t) {
	return (
		(e === t && (e !== 0 || 1 / e === 1 / t)) ||
		(e !== e && t !== t)
	);
}
var We = typeof Object.is == "function" ? Object.is : um;
function gr(e, t) {
	if (We(e, t)) return !0;
	if (
		typeof e != "object" ||
		e === null ||
		typeof t != "object" ||
		t === null
	)
		return !1;
	var n = Object.keys(e),
		r = Object.keys(t);
	if (n.length !== r.length) return !1;
	for (r = 0; r < n.length; r++) {
		var a = n[r];
		if (!Bl.call(t, a) || !We(e[a], t[a])) return !1;
	}
	return !0;
}
function Zu(e) {
	for (; e && e.firstChild; ) e = e.firstChild;
	return e;
}
function Ju(e, t) {
	var n = Zu(e);
	e = 0;
	for (var r; n; ) {
		if (n.nodeType === 3) {
			if (((r = e + n.textContent.length), e <= t && r >= t))
				return { node: n, offset: t - e };
			e = r;
		}
		e: {
			for (; n; ) {
				if (n.nextSibling) {
					n = n.nextSibling;
					break e;
				}
				n = n.parentNode;
			}
			n = void 0;
		}
		n = Zu(n);
	}
}
function ec(e, t) {
	return e && t
		? e === t
			? !0
			: e && e.nodeType === 3
			? !1
			: t && t.nodeType === 3
			? ec(e, t.parentNode)
			: "contains" in e
			? e.contains(t)
			: e.compareDocumentPosition
			? !!(e.compareDocumentPosition(t) & 16)
			: !1
		: !1;
}
function tc() {
	for (
		var e = window, t = ea();
		t instanceof e.HTMLIFrameElement;

	) {
		try {
			var n = typeof t.contentWindow.location.href == "string";
		} catch {
			n = !1;
		}
		if (n) e = t.contentWindow;
		else break;
		t = ea(e.document);
	}
	return t;
}
function zi(e) {
	var t = e && e.nodeName && e.nodeName.toLowerCase();
	return (
		t &&
		((t === "input" &&
			(e.type === "text" ||
				e.type === "search" ||
				e.type === "tel" ||
				e.type === "url" ||
				e.type === "password")) ||
			t === "textarea" ||
			e.contentEditable === "true")
	);
}
function cm(e) {
	var t = tc(),
		n = e.focusedElem,
		r = e.selectionRange;
	if (
		t !== n &&
		n &&
		n.ownerDocument &&
		ec(n.ownerDocument.documentElement, n)
	) {
		if (r !== null && zi(n)) {
			if (
				((t = r.start),
				(e = r.end),
				e === void 0 && (e = t),
				"selectionStart" in n)
			)
				(n.selectionStart = t),
					(n.selectionEnd = Math.min(e, n.value.length));
			else if (
				((e =
					((t = n.ownerDocument || document) && t.defaultView) ||
					window),
				e.getSelection)
			) {
				e = e.getSelection();
				var a = n.textContent.length,
					l = Math.min(r.start, a);
				(r = r.end === void 0 ? l : Math.min(r.end, a)),
					!e.extend && l > r && ((a = r), (r = l), (l = a)),
					(a = Ju(n, l));
				var i = Ju(n, r);
				a &&
					i &&
					(e.rangeCount !== 1 ||
						e.anchorNode !== a.node ||
						e.anchorOffset !== a.offset ||
						e.focusNode !== i.node ||
						e.focusOffset !== i.offset) &&
					((t = t.createRange()),
					t.setStart(a.node, a.offset),
					e.removeAllRanges(),
					l > r
						? (e.addRange(t), e.extend(i.node, i.offset))
						: (t.setEnd(i.node, i.offset), e.addRange(t)));
			}
		}
		for (t = [], e = n; (e = e.parentNode); )
			e.nodeType === 1 &&
				t.push({
					element: e,
					left: e.scrollLeft,
					top: e.scrollTop,
				});
		for (
			typeof n.focus == "function" && n.focus(), n = 0;
			n < t.length;
			n++
		)
			(e = t[n]),
				(e.element.scrollLeft = e.left),
				(e.element.scrollTop = e.top);
	}
}
var dm =
		it &&
		"documentMode" in document &&
		11 >= document.documentMode,
	kn = null,
	Mi = null,
	vr = null,
	Ni = !1;
function nc(e, t, n) {
	var r =
		n.window === n
			? n.document
			: n.nodeType === 9
			? n
			: n.ownerDocument;
	Ni ||
		kn == null ||
		kn !== ea(r) ||
		((r = kn),
		"selectionStart" in r && zi(r)
			? (r = { start: r.selectionStart, end: r.selectionEnd })
			: ((r = (
					(r.ownerDocument && r.ownerDocument.defaultView) ||
					window
			  ).getSelection()),
			  (r = {
					anchorNode: r.anchorNode,
					anchorOffset: r.anchorOffset,
					focusNode: r.focusNode,
					focusOffset: r.focusOffset,
			  })),
		(vr && gr(vr, r)) ||
			((vr = r),
			(r = Sa(Mi, "onSelect")),
			0 < r.length &&
				((t = new ki("onSelect", "select", null, t, n)),
				e.push({ event: t, listeners: r }),
				(t.target = kn))));
}
function ya(e, t) {
	var n = {};
	return (
		(n[e.toLowerCase()] = t.toLowerCase()),
		(n["Webkit" + e] = "webkit" + t),
		(n["Moz" + e] = "moz" + t),
		n
	);
}
var En = {
		animationend: ya("Animation", "AnimationEnd"),
		animationiteration: ya("Animation", "AnimationIteration"),
		animationstart: ya("Animation", "AnimationStart"),
		transitionend: ya("Transition", "TransitionEnd"),
	},
	Ii = {},
	rc = {};
it &&
	((rc = document.createElement("div").style),
	"AnimationEvent" in window ||
		(delete En.animationend.animation,
		delete En.animationiteration.animation,
		delete En.animationstart.animation),
	"TransitionEvent" in window ||
		delete En.transitionend.transition);
function ba(e) {
	if (Ii[e]) return Ii[e];
	if (!En[e]) return e;
	var t = En[e],
		n;
	for (n in t)
		if (t.hasOwnProperty(n) && n in rc) return (Ii[e] = t[n]);
	return e;
}
var ac = ba("animationend"),
	lc = ba("animationiteration"),
	ic = ba("animationstart"),
	oc = ba("transitionend"),
	sc = new Map(),
	uc =
		"abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
			" "
		);
function Ct(e, t) {
	sc.set(e, t), Ut(t, [e]);
}
for (var ji = 0; ji < uc.length; ji++) {
	var Ri = uc[ji],
		fm = Ri.toLowerCase(),
		pm = Ri[0].toUpperCase() + Ri.slice(1);
	Ct(fm, "on" + pm);
}
Ct(ac, "onAnimationEnd"),
	Ct(lc, "onAnimationIteration"),
	Ct(ic, "onAnimationStart"),
	Ct("dblclick", "onDoubleClick"),
	Ct("focusin", "onFocus"),
	Ct("focusout", "onBlur"),
	Ct(oc, "onTransitionEnd"),
	hn("onMouseEnter", ["mouseout", "mouseover"]),
	hn("onMouseLeave", ["mouseout", "mouseover"]),
	hn("onPointerEnter", ["pointerout", "pointerover"]),
	hn("onPointerLeave", ["pointerout", "pointerover"]),
	Ut(
		"onChange",
		"change click focusin focusout input keydown keyup selectionchange".split(
			" "
		)
	),
	Ut(
		"onSelect",
		"focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
			" "
		)
	),
	Ut("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste",
	]),
	Ut(
		"onCompositionEnd",
		"compositionend focusout keydown keypress keyup mousedown".split(
			" "
		)
	),
	Ut(
		"onCompositionStart",
		"compositionstart focusout keydown keypress keyup mousedown".split(
			" "
		)
	),
	Ut(
		"onCompositionUpdate",
		"compositionupdate focusout keydown keypress keyup mousedown".split(
			" "
		)
	);
var yr =
		"abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
			" "
		),
	hm = new Set(
		"cancel close invalid load scroll toggle"
			.split(" ")
			.concat(yr)
	);
function cc(e, t, n) {
	var r = e.type || "unknown-event";
	(e.currentTarget = n),
		fh(r, t, void 0, e),
		(e.currentTarget = null);
}
function dc(e, t) {
	t = (t & 4) !== 0;
	for (var n = 0; n < e.length; n++) {
		var r = e[n],
			a = r.event;
		r = r.listeners;
		e: {
			var l = void 0;
			if (t)
				for (var i = r.length - 1; 0 <= i; i--) {
					var o = r[i],
						s = o.instance,
						c = o.currentTarget;
					if (
						((o = o.listener),
						s !== l && a.isPropagationStopped())
					)
						break e;
					cc(a, o, c), (l = s);
				}
			else
				for (i = 0; i < r.length; i++) {
					if (
						((o = r[i]),
						(s = o.instance),
						(c = o.currentTarget),
						(o = o.listener),
						s !== l && a.isPropagationStopped())
					)
						break e;
					cc(a, o, c), (l = s);
				}
		}
	}
	if (ra) throw ((e = pi), (ra = !1), (pi = null), e);
}
function W(e, t) {
	var n = t[Ui];
	n === void 0 && (n = t[Ui] = new Set());
	var r = e + "__bubble";
	n.has(r) || (fc(t, e, 2, !1), n.add(r));
}
function Ai(e, t, n) {
	var r = 0;
	t && (r |= 4), fc(n, e, r, t);
}
var wa =
	"_reactListening" + Math.random().toString(36).slice(2);
function br(e) {
	if (!e[wa]) {
		(e[wa] = !0),
			qs.forEach(function (n) {
				n !== "selectionchange" &&
					(hm.has(n) || Ai(n, !1, e), Ai(n, !0, e));
			});
		var t = e.nodeType === 9 ? e : e.ownerDocument;
		t === null ||
			t[wa] ||
			((t[wa] = !0), Ai("selectionchange", !1, t));
	}
}
function fc(e, t, n, r) {
	switch (ju(t)) {
		case 1:
			var a = Ph;
			break;
		case 4:
			a = Oh;
			break;
		default:
			a = wi;
	}
	(n = a.bind(null, t, n, e)),
		(a = void 0),
		!fi ||
			(t !== "touchstart" &&
				t !== "touchmove" &&
				t !== "wheel") ||
			(a = !0),
		r
			? a !== void 0
				? e.addEventListener(t, n, { capture: !0, passive: a })
				: e.addEventListener(t, n, !0)
			: a !== void 0
			? e.addEventListener(t, n, { passive: a })
			: e.addEventListener(t, n, !1);
}
function Di(e, t, n, r, a) {
	var l = r;
	if (!(t & 1) && !(t & 2) && r !== null)
		e: for (;;) {
			if (r === null) return;
			var i = r.tag;
			if (i === 3 || i === 4) {
				var o = r.stateNode.containerInfo;
				if (o === a || (o.nodeType === 8 && o.parentNode === a))
					break;
				if (i === 4)
					for (i = r.return; i !== null; ) {
						var s = i.tag;
						if (
							(s === 3 || s === 4) &&
							((s = i.stateNode.containerInfo),
							s === a || (s.nodeType === 8 && s.parentNode === a))
						)
							return;
						i = i.return;
					}
				for (; o !== null; ) {
					if (((i = Gt(o)), i === null)) return;
					if (((s = i.tag), s === 5 || s === 6)) {
						r = l = i;
						continue e;
					}
					o = o.parentNode;
				}
			}
			r = r.return;
		}
	vu(function () {
		var c = l,
			d = ui(n),
			f = [];
		e: {
			var m = sc.get(e);
			if (m !== void 0) {
				var v = ki,
					g = e;
				switch (e) {
					case "keypress":
						if (ha(n) === 0) break e;
					case "keydown":
					case "keyup":
						v = Uh;
						break;
					case "focusin":
						(g = "focus"), (v = Ti);
						break;
					case "focusout":
						(g = "blur"), (v = Ti);
						break;
					case "beforeblur":
					case "afterblur":
						v = Ti;
						break;
					case "click":
						if (n.button === 2) break e;
					case "auxclick":
					case "dblclick":
					case "mousedown":
					case "mousemove":
					case "mouseup":
					case "mouseout":
					case "mouseover":
					case "contextmenu":
						v = Du;
						break;
					case "drag":
					case "dragend":
					case "dragenter":
					case "dragexit":
					case "dragleave":
					case "dragover":
					case "dragstart":
					case "drop":
						v = Mh;
						break;
					case "touchcancel":
					case "touchend":
					case "touchmove":
					case "touchstart":
						v = qh;
						break;
					case ac:
					case lc:
					case ic:
						v = jh;
						break;
					case oc:
						v = Xh;
						break;
					case "scroll":
						v = Lh;
						break;
					case "wheel":
						v = Kh;
						break;
					case "copy":
					case "cut":
					case "paste":
						v = Ah;
						break;
					case "gotpointercapture":
					case "lostpointercapture":
					case "pointercancel":
					case "pointerdown":
					case "pointermove":
					case "pointerout":
					case "pointerover":
					case "pointerup":
						v = $u;
				}
				var b = (t & 4) !== 0,
					w = !b && e === "scroll",
					h = b ? (m !== null ? m + "Capture" : null) : m;
				b = [];
				for (var u = c, p; u !== null; ) {
					p = u;
					var y = p.stateNode;
					if (
						(p.tag === 5 &&
							y !== null &&
							((p = y),
							h !== null &&
								((y = tr(u, h)), y != null && b.push(wr(u, y, p)))),
						w)
					)
						break;
					u = u.return;
				}
				0 < b.length &&
					((m = new v(m, g, null, n, d)),
					f.push({ event: m, listeners: b }));
			}
		}
		if (!(t & 7)) {
			e: {
				if (
					((m = e === "mouseover" || e === "pointerover"),
					(v = e === "mouseout" || e === "pointerout"),
					m &&
						n !== si &&
						(g = n.relatedTarget || n.fromElement) &&
						(Gt(g) || g[st]))
				)
					break e;
				if (
					(v || m) &&
					((m =
						d.window === d
							? d
							: (m = d.ownerDocument)
							? m.defaultView || m.parentWindow
							: window),
					v
						? ((g = n.relatedTarget || n.toElement),
						  (v = c),
						  (g = g ? Gt(g) : null),
						  g !== null &&
								((w = Wt(g)),
								g !== w || (g.tag !== 5 && g.tag !== 6)) &&
								(g = null))
						: ((v = null), (g = c)),
					v !== g)
				) {
					if (
						((b = Du),
						(y = "onMouseLeave"),
						(h = "onMouseEnter"),
						(u = "mouse"),
						(e === "pointerout" || e === "pointerover") &&
							((b = $u),
							(y = "onPointerLeave"),
							(h = "onPointerEnter"),
							(u = "pointer")),
						(w = v == null ? m : _n(v)),
						(p = g == null ? m : _n(g)),
						(m = new b(y, u + "leave", v, n, d)),
						(m.target = w),
						(m.relatedTarget = p),
						(y = null),
						Gt(d) === c &&
							((b = new b(h, u + "enter", g, n, d)),
							(b.target = p),
							(b.relatedTarget = w),
							(y = b)),
						(w = y),
						v && g)
					)
						t: {
							for (b = v, h = g, u = 0, p = b; p; p = Cn(p)) u++;
							for (p = 0, y = h; y; y = Cn(y)) p++;
							for (; 0 < u - p; ) (b = Cn(b)), u--;
							for (; 0 < p - u; ) (h = Cn(h)), p--;
							for (; u--; ) {
								if (b === h || (h !== null && b === h.alternate))
									break t;
								(b = Cn(b)), (h = Cn(h));
							}
							b = null;
						}
					else b = null;
					v !== null && pc(f, m, v, b, !1),
						g !== null && w !== null && pc(f, w, g, b, !0);
				}
			}
			e: {
				if (
					((m = c ? _n(c) : window),
					(v = m.nodeName && m.nodeName.toLowerCase()),
					v === "select" || (v === "input" && m.type === "file"))
				)
					var S = am;
				else if (Gu(m))
					if (Qu) S = sm;
					else {
						S = im;
						var x = lm;
					}
				else
					(v = m.nodeName) &&
						v.toLowerCase() === "input" &&
						(m.type === "checkbox" || m.type === "radio") &&
						(S = om);
				if (S && (S = S(e, c))) {
					qu(f, S, n, d);
					break e;
				}
				x && x(e, m, c),
					e === "focusout" &&
						(x = m._wrapperState) &&
						x.controlled &&
						m.type === "number" &&
						ri(m, "number", m.value);
			}
			switch (((x = c ? _n(c) : window), e)) {
				case "focusin":
					(Gu(x) || x.contentEditable === "true") &&
						((kn = x), (Mi = c), (vr = null));
					break;
				case "focusout":
					vr = Mi = kn = null;
					break;
				case "mousedown":
					Ni = !0;
					break;
				case "contextmenu":
				case "mouseup":
				case "dragend":
					(Ni = !1), nc(f, n, d);
					break;
				case "selectionchange":
					if (dm) break;
				case "keydown":
				case "keyup":
					nc(f, n, d);
			}
			var E;
			if (Pi)
				e: {
					switch (e) {
						case "compositionstart":
							var T = "onCompositionStart";
							break e;
						case "compositionend":
							T = "onCompositionEnd";
							break e;
						case "compositionupdate":
							T = "onCompositionUpdate";
							break e;
					}
					T = void 0;
				}
			else
				xn
					? Uu(e, n) && (T = "onCompositionEnd")
					: e === "keydown" &&
					  n.keyCode === 229 &&
					  (T = "onCompositionStart");
			T &&
				(Bu &&
					n.locale !== "ko" &&
					(xn || T !== "onCompositionStart"
						? T === "onCompositionEnd" && xn && (E = Ru())
						: ((Et = d),
						  (xi = "value" in Et ? Et.value : Et.textContent),
						  (xn = !0))),
				(x = Sa(c, T)),
				0 < x.length &&
					((T = new Fu(T, e, null, n, d)),
					f.push({ event: T, listeners: x }),
					E
						? (T.data = E)
						: ((E = Wu(n)), E !== null && (T.data = E)))),
				(E = Jh ? em(e, n) : tm(e, n)) &&
					((c = Sa(c, "onBeforeInput")),
					0 < c.length &&
						((d = new Fu(
							"onBeforeInput",
							"beforeinput",
							null,
							n,
							d
						)),
						f.push({ event: d, listeners: c }),
						(d.data = E)));
		}
		dc(f, t);
	});
}
function wr(e, t, n) {
	return { instance: e, listener: t, currentTarget: n };
}
function Sa(e, t) {
	for (var n = t + "Capture", r = []; e !== null; ) {
		var a = e,
			l = a.stateNode;
		a.tag === 5 &&
			l !== null &&
			((a = l),
			(l = tr(e, n)),
			l != null && r.unshift(wr(e, l, a)),
			(l = tr(e, t)),
			l != null && r.push(wr(e, l, a))),
			(e = e.return);
	}
	return r;
}
function Cn(e) {
	if (e === null) return null;
	do e = e.return;
	while (e && e.tag !== 5);
	return e || null;
}
function pc(e, t, n, r, a) {
	for (
		var l = t._reactName, i = [];
		n !== null && n !== r;

	) {
		var o = n,
			s = o.alternate,
			c = o.stateNode;
		if (s !== null && s === r) break;
		o.tag === 5 &&
			c !== null &&
			((o = c),
			a
				? ((s = tr(n, l)), s != null && i.unshift(wr(n, s, o)))
				: a ||
				  ((s = tr(n, l)), s != null && i.push(wr(n, s, o)))),
			(n = n.return);
	}
	i.length !== 0 && e.push({ event: t, listeners: i });
}
var mm = /\r\n?/g,
	gm = /\u0000|\uFFFD/g;
function hc(e) {
	return (typeof e == "string" ? e : "" + e)
		.replace(
			mm,
			`
`
		)
		.replace(gm, "");
}
function xa(e, t, n) {
	if (((t = hc(t)), hc(e) !== t && n)) throw Error(_(425));
}
function ka() {}
var Fi = null,
	$i = null;
function Bi(e, t) {
	return (
		e === "textarea" ||
		e === "noscript" ||
		typeof t.children == "string" ||
		typeof t.children == "number" ||
		(typeof t.dangerouslySetInnerHTML == "object" &&
			t.dangerouslySetInnerHTML !== null &&
			t.dangerouslySetInnerHTML.__html != null)
	);
}
var Vi =
		typeof setTimeout == "function" ? setTimeout : void 0,
	vm =
		typeof clearTimeout == "function" ? clearTimeout : void 0,
	mc = typeof Promise == "function" ? Promise : void 0,
	ym =
		typeof queueMicrotask == "function"
			? queueMicrotask
			: typeof mc < "u"
			? function (e) {
					return mc.resolve(null).then(e).catch(bm);
			  }
			: Vi;
function bm(e) {
	setTimeout(function () {
		throw e;
	});
}
function Hi(e, t) {
	var n = t,
		r = 0;
	do {
		var a = n.nextSibling;
		if ((e.removeChild(n), a && a.nodeType === 8))
			if (((n = a.data), n === "/$")) {
				if (r === 0) {
					e.removeChild(a), cr(t);
					return;
				}
				r--;
			} else (n !== "$" && n !== "$?" && n !== "$!") || r++;
		n = a;
	} while (n);
	cr(t);
}
function Tt(e) {
	for (; e != null; e = e.nextSibling) {
		var t = e.nodeType;
		if (t === 1 || t === 3) break;
		if (t === 8) {
			if (
				((t = e.data), t === "$" || t === "$!" || t === "$?")
			)
				break;
			if (t === "/$") return null;
		}
	}
	return e;
}
function gc(e) {
	e = e.previousSibling;
	for (var t = 0; e; ) {
		if (e.nodeType === 8) {
			var n = e.data;
			if (n === "$" || n === "$!" || n === "$?") {
				if (t === 0) return e;
				t--;
			} else n === "/$" && t++;
		}
		e = e.previousSibling;
	}
	return null;
}
var Tn = Math.random().toString(36).slice(2),
	Je = "__reactFiber$" + Tn,
	Sr = "__reactProps$" + Tn,
	st = "__reactContainer$" + Tn,
	Ui = "__reactEvents$" + Tn,
	wm = "__reactListeners$" + Tn,
	Sm = "__reactHandles$" + Tn;
function Gt(e) {
	var t = e[Je];
	if (t) return t;
	for (var n = e.parentNode; n; ) {
		if ((t = n[st] || n[Je])) {
			if (
				((n = t.alternate),
				t.child !== null || (n !== null && n.child !== null))
			)
				for (e = gc(e); e !== null; ) {
					if ((n = e[Je])) return n;
					e = gc(e);
				}
			return t;
		}
		(e = n), (n = e.parentNode);
	}
	return null;
}
function xr(e) {
	return (
		(e = e[Je] || e[st]),
		!e ||
		(e.tag !== 5 &&
			e.tag !== 6 &&
			e.tag !== 13 &&
			e.tag !== 3)
			? null
			: e
	);
}
function _n(e) {
	if (e.tag === 5 || e.tag === 6) return e.stateNode;
	throw Error(_(33));
}
function Ea(e) {
	return e[Sr] || null;
}
var Wi = [],
	Pn = -1;
function _t(e) {
	return { current: e };
}
function G(e) {
	0 > Pn || ((e.current = Wi[Pn]), (Wi[Pn] = null), Pn--);
}
function U(e, t) {
	Pn++, (Wi[Pn] = e.current), (e.current = t);
}
var Pt = {},
	fe = _t(Pt),
	Se = _t(!1),
	qt = Pt;
function On(e, t) {
	var n = e.type.contextTypes;
	if (!n) return Pt;
	var r = e.stateNode;
	if (
		r &&
		r.__reactInternalMemoizedUnmaskedChildContext === t
	)
		return r.__reactInternalMemoizedMaskedChildContext;
	var a = {},
		l;
	for (l in n) a[l] = t[l];
	return (
		r &&
			((e = e.stateNode),
			(e.__reactInternalMemoizedUnmaskedChildContext = t),
			(e.__reactInternalMemoizedMaskedChildContext = a)),
		a
	);
}
function xe(e) {
	return (e = e.childContextTypes), e != null;
}
function Ca() {
	G(Se), G(fe);
}
function vc(e, t, n) {
	if (fe.current !== Pt) throw Error(_(168));
	U(fe, t), U(Se, n);
}
function yc(e, t, n) {
	var r = e.stateNode;
	if (
		((t = t.childContextTypes),
		typeof r.getChildContext != "function")
	)
		return n;
	r = r.getChildContext();
	for (var a in r)
		if (!(a in t)) throw Error(_(108, lh(e) || "Unknown", a));
	return X({}, n, r);
}
function Ta(e) {
	return (
		(e =
			((e = e.stateNode) &&
				e.__reactInternalMemoizedMergedChildContext) ||
			Pt),
		(qt = fe.current),
		U(fe, e),
		U(Se, Se.current),
		!0
	);
}
function bc(e, t, n) {
	var r = e.stateNode;
	if (!r) throw Error(_(169));
	n
		? ((e = yc(e, t, qt)),
		  (r.__reactInternalMemoizedMergedChildContext = e),
		  G(Se),
		  G(fe),
		  U(fe, e))
		: G(Se),
		U(Se, n);
}
var ut = null,
	_a = !1,
	Gi = !1;
function wc(e) {
	ut === null ? (ut = [e]) : ut.push(e);
}
function xm(e) {
	(_a = !0), wc(e);
}
function Ot() {
	if (!Gi && ut !== null) {
		Gi = !0;
		var e = 0,
			t = V;
		try {
			var n = ut;
			for (V = 1; e < n.length; e++) {
				var r = n[e];
				do r = r(!0);
				while (r !== null);
			}
			(ut = null), (_a = !1);
		} catch (a) {
			throw (
				(ut !== null && (ut = ut.slice(e + 1)), xu(hi, Ot), a)
			);
		} finally {
			(V = t), (Gi = !1);
		}
	}
	return null;
}
var Ln = [],
	zn = 0,
	Pa = null,
	Oa = 0,
	De = [],
	Fe = 0,
	Qt = null,
	ct = 1,
	dt = "";
function Xt(e, t) {
	(Ln[zn++] = Oa), (Ln[zn++] = Pa), (Pa = e), (Oa = t);
}
function Sc(e, t, n) {
	(De[Fe++] = ct),
		(De[Fe++] = dt),
		(De[Fe++] = Qt),
		(Qt = e);
	var r = ct;
	e = dt;
	var a = 32 - Ue(r) - 1;
	(r &= ~(1 << a)), (n += 1);
	var l = 32 - Ue(t) + a;
	if (30 < l) {
		var i = a - (a % 5);
		(l = (r & ((1 << i) - 1)).toString(32)),
			(r >>= i),
			(a -= i),
			(ct = (1 << (32 - Ue(t) + a)) | (n << a) | r),
			(dt = l + e);
	} else (ct = (1 << l) | (n << a) | r), (dt = e);
}
function qi(e) {
	e.return !== null && (Xt(e, 1), Sc(e, 1, 0));
}
function Qi(e) {
	for (; e === Pa; )
		(Pa = Ln[--zn]),
			(Ln[zn] = null),
			(Oa = Ln[--zn]),
			(Ln[zn] = null);
	for (; e === Qt; )
		(Qt = De[--Fe]),
			(De[Fe] = null),
			(dt = De[--Fe]),
			(De[Fe] = null),
			(ct = De[--Fe]),
			(De[Fe] = null);
}
var Le = null,
	ze = null,
	q = !1,
	Ge = null;
function xc(e, t) {
	var n = He(5, null, null, 0);
	(n.elementType = "DELETED"),
		(n.stateNode = t),
		(n.return = e),
		(t = e.deletions),
		t === null
			? ((e.deletions = [n]), (e.flags |= 16))
			: t.push(n);
}
function kc(e, t) {
	switch (e.tag) {
		case 5:
			var n = e.type;
			return (
				(t =
					t.nodeType !== 1 ||
					n.toLowerCase() !== t.nodeName.toLowerCase()
						? null
						: t),
				t !== null
					? ((e.stateNode = t),
					  (Le = e),
					  (ze = Tt(t.firstChild)),
					  !0)
					: !1
			);
		case 6:
			return (
				(t =
					e.pendingProps === "" || t.nodeType !== 3 ? null : t),
				t !== null
					? ((e.stateNode = t), (Le = e), (ze = null), !0)
					: !1
			);
		case 13:
			return (
				(t = t.nodeType !== 8 ? null : t),
				t !== null
					? ((n = Qt !== null ? { id: ct, overflow: dt } : null),
					  (e.memoizedState = {
							dehydrated: t,
							treeContext: n,
							retryLane: 1073741824,
					  }),
					  (n = He(18, null, null, 0)),
					  (n.stateNode = t),
					  (n.return = e),
					  (e.child = n),
					  (Le = e),
					  (ze = null),
					  !0)
					: !1
			);
		default:
			return !1;
	}
}
function Xi(e) {
	return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Yi(e) {
	if (q) {
		var t = ze;
		if (t) {
			var n = t;
			if (!kc(e, t)) {
				if (Xi(e)) throw Error(_(418));
				t = Tt(n.nextSibling);
				var r = Le;
				t && kc(e, t)
					? xc(r, n)
					: ((e.flags = (e.flags & -4097) | 2),
					  (q = !1),
					  (Le = e));
			}
		} else {
			if (Xi(e)) throw Error(_(418));
			(e.flags = (e.flags & -4097) | 2), (q = !1), (Le = e);
		}
	}
}
function Ec(e) {
	for (
		e = e.return;
		e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;

	)
		e = e.return;
	Le = e;
}
function La(e) {
	if (e !== Le) return !1;
	if (!q) return Ec(e), (q = !0), !1;
	var t;
	if (
		((t = e.tag !== 3) &&
			!(t = e.tag !== 5) &&
			((t = e.type),
			(t =
				t !== "head" &&
				t !== "body" &&
				!Bi(e.type, e.memoizedProps))),
		t && (t = ze))
	) {
		if (Xi(e)) throw (Cc(), Error(_(418)));
		for (; t; ) xc(e, t), (t = Tt(t.nextSibling));
	}
	if ((Ec(e), e.tag === 13)) {
		if (
			((e = e.memoizedState),
			(e = e !== null ? e.dehydrated : null),
			!e)
		)
			throw Error(_(317));
		e: {
			for (e = e.nextSibling, t = 0; e; ) {
				if (e.nodeType === 8) {
					var n = e.data;
					if (n === "/$") {
						if (t === 0) {
							ze = Tt(e.nextSibling);
							break e;
						}
						t--;
					} else (n !== "$" && n !== "$!" && n !== "$?") || t++;
				}
				e = e.nextSibling;
			}
			ze = null;
		}
	} else ze = Le ? Tt(e.stateNode.nextSibling) : null;
	return !0;
}
function Cc() {
	for (var e = ze; e; ) e = Tt(e.nextSibling);
}
function Mn() {
	(ze = Le = null), (q = !1);
}
function Ki(e) {
	Ge === null ? (Ge = [e]) : Ge.push(e);
}
var km = ot.ReactCurrentBatchConfig;
function kr(e, t, n) {
	if (
		((e = n.ref),
		e !== null &&
			typeof e != "function" &&
			typeof e != "object")
	) {
		if (n._owner) {
			if (((n = n._owner), n)) {
				if (n.tag !== 1) throw Error(_(309));
				var r = n.stateNode;
			}
			if (!r) throw Error(_(147, e));
			var a = r,
				l = "" + e;
			return t !== null &&
				t.ref !== null &&
				typeof t.ref == "function" &&
				t.ref._stringRef === l
				? t.ref
				: ((t = function (i) {
						var o = a.refs;
						i === null ? delete o[l] : (o[l] = i);
				  }),
				  (t._stringRef = l),
				  t);
		}
		if (typeof e != "string") throw Error(_(284));
		if (!n._owner) throw Error(_(290, e));
	}
	return e;
}
function za(e, t) {
	throw (
		((e = Object.prototype.toString.call(t)),
		Error(
			_(
				31,
				e === "[object Object]"
					? "object with keys {" +
							Object.keys(t).join(", ") +
							"}"
					: e
			)
		))
	);
}
function Tc(e) {
	var t = e._init;
	return t(e._payload);
}
function _c(e) {
	function t(h, u) {
		if (e) {
			var p = h.deletions;
			p === null
				? ((h.deletions = [u]), (h.flags |= 16))
				: p.push(u);
		}
	}
	function n(h, u) {
		if (!e) return null;
		for (; u !== null; ) t(h, u), (u = u.sibling);
		return null;
	}
	function r(h, u) {
		for (h = new Map(); u !== null; )
			u.key !== null ? h.set(u.key, u) : h.set(u.index, u),
				(u = u.sibling);
		return h;
	}
	function a(h, u) {
		return (
			(h = At(h, u)), (h.index = 0), (h.sibling = null), h
		);
	}
	function l(h, u, p) {
		return (
			(h.index = p),
			e
				? ((p = h.alternate),
				  p !== null
						? ((p = p.index), p < u ? ((h.flags |= 2), u) : p)
						: ((h.flags |= 2), u))
				: ((h.flags |= 1048576), u)
		);
	}
	function i(h) {
		return e && h.alternate === null && (h.flags |= 2), h;
	}
	function o(h, u, p, y) {
		return u === null || u.tag !== 6
			? ((u = Vo(p, h.mode, y)), (u.return = h), u)
			: ((u = a(u, p)), (u.return = h), u);
	}
	function s(h, u, p, y) {
		var S = p.type;
		return S === gn
			? d(h, u, p.props.children, y, p.key)
			: u !== null &&
			  (u.elementType === S ||
					(typeof S == "object" &&
						S !== null &&
						S.$$typeof === yt &&
						Tc(S) === u.type))
			? ((y = a(u, p.props)),
			  (y.ref = kr(h, u, p)),
			  (y.return = h),
			  y)
			: ((y = tl(p.type, p.key, p.props, null, h.mode, y)),
			  (y.ref = kr(h, u, p)),
			  (y.return = h),
			  y);
	}
	function c(h, u, p, y) {
		return u === null ||
			u.tag !== 4 ||
			u.stateNode.containerInfo !== p.containerInfo ||
			u.stateNode.implementation !== p.implementation
			? ((u = Ho(p, h.mode, y)), (u.return = h), u)
			: ((u = a(u, p.children || [])), (u.return = h), u);
	}
	function d(h, u, p, y, S) {
		return u === null || u.tag !== 7
			? ((u = rn(p, h.mode, y, S)), (u.return = h), u)
			: ((u = a(u, p)), (u.return = h), u);
	}
	function f(h, u, p) {
		if (
			(typeof u == "string" && u !== "") ||
			typeof u == "number"
		)
			return (u = Vo("" + u, h.mode, p)), (u.return = h), u;
		if (typeof u == "object" && u !== null) {
			switch (u.$$typeof) {
				case Zr:
					return (
						(p = tl(u.type, u.key, u.props, null, h.mode, p)),
						(p.ref = kr(h, null, u)),
						(p.return = h),
						p
					);
				case mn:
					return (u = Ho(u, h.mode, p)), (u.return = h), u;
				case yt:
					var y = u._init;
					return f(h, y(u._payload), p);
			}
			if (Zn(u) || Yn(u))
				return (u = rn(u, h.mode, p, null)), (u.return = h), u;
			za(h, u);
		}
		return null;
	}
	function m(h, u, p, y) {
		var S = u !== null ? u.key : null;
		if (
			(typeof p == "string" && p !== "") ||
			typeof p == "number"
		)
			return S !== null ? null : o(h, u, "" + p, y);
		if (typeof p == "object" && p !== null) {
			switch (p.$$typeof) {
				case Zr:
					return p.key === S ? s(h, u, p, y) : null;
				case mn:
					return p.key === S ? c(h, u, p, y) : null;
				case yt:
					return (S = p._init), m(h, u, S(p._payload), y);
			}
			if (Zn(p) || Yn(p))
				return S !== null ? null : d(h, u, p, y, null);
			za(h, p);
		}
		return null;
	}
	function v(h, u, p, y, S) {
		if (
			(typeof y == "string" && y !== "") ||
			typeof y == "number"
		)
			return (h = h.get(p) || null), o(u, h, "" + y, S);
		if (typeof y == "object" && y !== null) {
			switch (y.$$typeof) {
				case Zr:
					return (
						(h = h.get(y.key === null ? p : y.key) || null),
						s(u, h, y, S)
					);
				case mn:
					return (
						(h = h.get(y.key === null ? p : y.key) || null),
						c(u, h, y, S)
					);
				case yt:
					var x = y._init;
					return v(h, u, p, x(y._payload), S);
			}
			if (Zn(y) || Yn(y))
				return (h = h.get(p) || null), d(u, h, y, S, null);
			za(u, y);
		}
		return null;
	}
	function g(h, u, p, y) {
		for (
			var S = null, x = null, E = u, T = (u = 0), P = null;
			E !== null && T < p.length;
			T++
		) {
			E.index > T ? ((P = E), (E = null)) : (P = E.sibling);
			var k = m(h, E, p[T], y);
			if (k === null) {
				E === null && (E = P);
				break;
			}
			e && E && k.alternate === null && t(h, E),
				(u = l(k, u, T)),
				x === null ? (S = k) : (x.sibling = k),
				(x = k),
				(E = P);
		}
		if (T === p.length) return n(h, E), q && Xt(h, T), S;
		if (E === null) {
			for (; T < p.length; T++)
				(E = f(h, p[T], y)),
					E !== null &&
						((u = l(E, u, T)),
						x === null ? (S = E) : (x.sibling = E),
						(x = E));
			return q && Xt(h, T), S;
		}
		for (E = r(h, E); T < p.length; T++)
			(P = v(E, h, T, p[T], y)),
				P !== null &&
					(e &&
						P.alternate !== null &&
						E.delete(P.key === null ? T : P.key),
					(u = l(P, u, T)),
					x === null ? (S = P) : (x.sibling = P),
					(x = P));
		return (
			e &&
				E.forEach(function (z) {
					return t(h, z);
				}),
			q && Xt(h, T),
			S
		);
	}
	function b(h, u, p, y) {
		var S = Yn(p);
		if (typeof S != "function") throw Error(_(150));
		if (((p = S.call(p)), p == null)) throw Error(_(151));
		for (
			var x = (S = null),
				E = u,
				T = (u = 0),
				P = null,
				k = p.next();
			E !== null && !k.done;
			T++, k = p.next()
		) {
			E.index > T ? ((P = E), (E = null)) : (P = E.sibling);
			var z = m(h, E, k.value, y);
			if (z === null) {
				E === null && (E = P);
				break;
			}
			e && E && z.alternate === null && t(h, E),
				(u = l(z, u, T)),
				x === null ? (S = z) : (x.sibling = z),
				(x = z),
				(E = P);
		}
		if (k.done) return n(h, E), q && Xt(h, T), S;
		if (E === null) {
			for (; !k.done; T++, k = p.next())
				(k = f(h, k.value, y)),
					k !== null &&
						((u = l(k, u, T)),
						x === null ? (S = k) : (x.sibling = k),
						(x = k));
			return q && Xt(h, T), S;
		}
		for (E = r(h, E); !k.done; T++, k = p.next())
			(k = v(E, h, T, k.value, y)),
				k !== null &&
					(e &&
						k.alternate !== null &&
						E.delete(k.key === null ? T : k.key),
					(u = l(k, u, T)),
					x === null ? (S = k) : (x.sibling = k),
					(x = k));
		return (
			e &&
				E.forEach(function (L) {
					return t(h, L);
				}),
			q && Xt(h, T),
			S
		);
	}
	function w(h, u, p, y) {
		if (
			(typeof p == "object" &&
				p !== null &&
				p.type === gn &&
				p.key === null &&
				(p = p.props.children),
			typeof p == "object" && p !== null)
		) {
			switch (p.$$typeof) {
				case Zr:
					e: {
						for (var S = p.key, x = u; x !== null; ) {
							if (x.key === S) {
								if (((S = p.type), S === gn)) {
									if (x.tag === 7) {
										n(h, x.sibling),
											(u = a(x, p.props.children)),
											(u.return = h),
											(h = u);
										break e;
									}
								} else if (
									x.elementType === S ||
									(typeof S == "object" &&
										S !== null &&
										S.$$typeof === yt &&
										Tc(S) === x.type)
								) {
									n(h, x.sibling),
										(u = a(x, p.props)),
										(u.ref = kr(h, x, p)),
										(u.return = h),
										(h = u);
									break e;
								}
								n(h, x);
								break;
							} else t(h, x);
							x = x.sibling;
						}
						p.type === gn
							? ((u = rn(p.props.children, h.mode, y, p.key)),
							  (u.return = h),
							  (h = u))
							: ((y = tl(p.type, p.key, p.props, null, h.mode, y)),
							  (y.ref = kr(h, u, p)),
							  (y.return = h),
							  (h = y));
					}
					return i(h);
				case mn:
					e: {
						for (x = p.key; u !== null; ) {
							if (u.key === x)
								if (
									u.tag === 4 &&
									u.stateNode.containerInfo === p.containerInfo &&
									u.stateNode.implementation === p.implementation
								) {
									n(h, u.sibling),
										(u = a(u, p.children || [])),
										(u.return = h),
										(h = u);
									break e;
								} else {
									n(h, u);
									break;
								}
							else t(h, u);
							u = u.sibling;
						}
						(u = Ho(p, h.mode, y)), (u.return = h), (h = u);
					}
					return i(h);
				case yt:
					return (x = p._init), w(h, u, x(p._payload), y);
			}
			if (Zn(p)) return g(h, u, p, y);
			if (Yn(p)) return b(h, u, p, y);
			za(h, p);
		}
		return (typeof p == "string" && p !== "") ||
			typeof p == "number"
			? ((p = "" + p),
			  u !== null && u.tag === 6
					? (n(h, u.sibling),
					  (u = a(u, p)),
					  (u.return = h),
					  (h = u))
					: (n(h, u),
					  (u = Vo(p, h.mode, y)),
					  (u.return = h),
					  (h = u)),
			  i(h))
			: n(h, u);
	}
	return w;
}
var Nn = _c(!0),
	Pc = _c(!1),
	Ma = _t(null),
	Na = null,
	In = null,
	Zi = null;
function Ji() {
	Zi = In = Na = null;
}
function eo(e) {
	var t = Ma.current;
	G(Ma), (e._currentValue = t);
}
function to(e, t, n) {
	for (; e !== null; ) {
		var r = e.alternate;
		if (
			((e.childLanes & t) !== t
				? ((e.childLanes |= t),
				  r !== null && (r.childLanes |= t))
				: r !== null &&
				  (r.childLanes & t) !== t &&
				  (r.childLanes |= t),
			e === n)
		)
			break;
		e = e.return;
	}
}
function jn(e, t) {
	(Na = e),
		(Zi = In = null),
		(e = e.dependencies),
		e !== null &&
			e.firstContext !== null &&
			(e.lanes & t && (ke = !0), (e.firstContext = null));
}
function $e(e) {
	var t = e._currentValue;
	if (Zi !== e)
		if (
			((e = { context: e, memoizedValue: t, next: null }),
			In === null)
		) {
			if (Na === null) throw Error(_(308));
			(In = e),
				(Na.dependencies = { lanes: 0, firstContext: e });
		} else In = In.next = e;
	return t;
}
var Yt = null;
function no(e) {
	Yt === null ? (Yt = [e]) : Yt.push(e);
}
function Oc(e, t, n, r) {
	var a = t.interleaved;
	return (
		a === null
			? ((n.next = n), no(t))
			: ((n.next = a.next), (a.next = n)),
		(t.interleaved = n),
		ft(e, r)
	);
}
function ft(e, t) {
	e.lanes |= t;
	var n = e.alternate;
	for (
		n !== null && (n.lanes |= t), n = e, e = e.return;
		e !== null;

	)
		(e.childLanes |= t),
			(n = e.alternate),
			n !== null && (n.childLanes |= t),
			(n = e),
			(e = e.return);
	return n.tag === 3 ? n.stateNode : null;
}
var Lt = !1;
function ro(e) {
	e.updateQueue = {
		baseState: e.memoizedState,
		firstBaseUpdate: null,
		lastBaseUpdate: null,
		shared: { pending: null, interleaved: null, lanes: 0 },
		effects: null,
	};
}
function Lc(e, t) {
	(e = e.updateQueue),
		t.updateQueue === e &&
			(t.updateQueue = {
				baseState: e.baseState,
				firstBaseUpdate: e.firstBaseUpdate,
				lastBaseUpdate: e.lastBaseUpdate,
				shared: e.shared,
				effects: e.effects,
			});
}
function pt(e, t) {
	return {
		eventTime: e,
		lane: t,
		tag: 0,
		payload: null,
		callback: null,
		next: null,
	};
}
function zt(e, t, n) {
	var r = e.updateQueue;
	if (r === null) return null;
	if (((r = r.shared), F & 2)) {
		var a = r.pending;
		return (
			a === null
				? (t.next = t)
				: ((t.next = a.next), (a.next = t)),
			(r.pending = t),
			ft(e, n)
		);
	}
	return (
		(a = r.interleaved),
		a === null
			? ((t.next = t), no(r))
			: ((t.next = a.next), (a.next = t)),
		(r.interleaved = t),
		ft(e, n)
	);
}
function Ia(e, t, n) {
	if (
		((t = t.updateQueue),
		t !== null && ((t = t.shared), (n & 4194240) !== 0))
	) {
		var r = t.lanes;
		(r &= e.pendingLanes), (n |= r), (t.lanes = n), vi(e, n);
	}
}
function zc(e, t) {
	var n = e.updateQueue,
		r = e.alternate;
	if (r !== null && ((r = r.updateQueue), n === r)) {
		var a = null,
			l = null;
		if (((n = n.firstBaseUpdate), n !== null)) {
			do {
				var i = {
					eventTime: n.eventTime,
					lane: n.lane,
					tag: n.tag,
					payload: n.payload,
					callback: n.callback,
					next: null,
				};
				l === null ? (a = l = i) : (l = l.next = i),
					(n = n.next);
			} while (n !== null);
			l === null ? (a = l = t) : (l = l.next = t);
		} else a = l = t;
		(n = {
			baseState: r.baseState,
			firstBaseUpdate: a,
			lastBaseUpdate: l,
			shared: r.shared,
			effects: r.effects,
		}),
			(e.updateQueue = n);
		return;
	}
	(e = n.lastBaseUpdate),
		e === null ? (n.firstBaseUpdate = t) : (e.next = t),
		(n.lastBaseUpdate = t);
}
function ja(e, t, n, r) {
	var a = e.updateQueue;
	Lt = !1;
	var l = a.firstBaseUpdate,
		i = a.lastBaseUpdate,
		o = a.shared.pending;
	if (o !== null) {
		a.shared.pending = null;
		var s = o,
			c = s.next;
		(s.next = null),
			i === null ? (l = c) : (i.next = c),
			(i = s);
		var d = e.alternate;
		d !== null &&
			((d = d.updateQueue),
			(o = d.lastBaseUpdate),
			o !== i &&
				(o === null ? (d.firstBaseUpdate = c) : (o.next = c),
				(d.lastBaseUpdate = s)));
	}
	if (l !== null) {
		var f = a.baseState;
		(i = 0), (d = c = s = null), (o = l);
		do {
			var m = o.lane,
				v = o.eventTime;
			if ((r & m) === m) {
				d !== null &&
					(d = d.next =
						{
							eventTime: v,
							lane: 0,
							tag: o.tag,
							payload: o.payload,
							callback: o.callback,
							next: null,
						});
				e: {
					var g = e,
						b = o;
					switch (((m = t), (v = n), b.tag)) {
						case 1:
							if (((g = b.payload), typeof g == "function")) {
								f = g.call(v, f, m);
								break e;
							}
							f = g;
							break e;
						case 3:
							g.flags = (g.flags & -65537) | 128;
						case 0:
							if (
								((g = b.payload),
								(m = typeof g == "function" ? g.call(v, f, m) : g),
								m == null)
							)
								break e;
							f = X({}, f, m);
							break e;
						case 2:
							Lt = !0;
					}
				}
				o.callback !== null &&
					o.lane !== 0 &&
					((e.flags |= 64),
					(m = a.effects),
					m === null ? (a.effects = [o]) : m.push(o));
			} else
				(v = {
					eventTime: v,
					lane: m,
					tag: o.tag,
					payload: o.payload,
					callback: o.callback,
					next: null,
				}),
					d === null ? ((c = d = v), (s = f)) : (d = d.next = v),
					(i |= m);
			if (((o = o.next), o === null)) {
				if (((o = a.shared.pending), o === null)) break;
				(m = o),
					(o = m.next),
					(m.next = null),
					(a.lastBaseUpdate = m),
					(a.shared.pending = null);
			}
		} while (!0);
		if (
			(d === null && (s = f),
			(a.baseState = s),
			(a.firstBaseUpdate = c),
			(a.lastBaseUpdate = d),
			(t = a.shared.interleaved),
			t !== null)
		) {
			a = t;
			do (i |= a.lane), (a = a.next);
			while (a !== t);
		} else l === null && (a.shared.lanes = 0);
		(Jt |= i), (e.lanes = i), (e.memoizedState = f);
	}
}
function Mc(e, t, n) {
	if (((e = t.effects), (t.effects = null), e !== null))
		for (t = 0; t < e.length; t++) {
			var r = e[t],
				a = r.callback;
			if (a !== null) {
				if (
					((r.callback = null), (r = n), typeof a != "function")
				)
					throw Error(_(191, a));
				a.call(r);
			}
		}
}
var Er = {},
	et = _t(Er),
	Cr = _t(Er),
	Tr = _t(Er);
function Kt(e) {
	if (e === Er) throw Error(_(174));
	return e;
}
function ao(e, t) {
	switch (
		(U(Tr, t), U(Cr, e), U(et, Er), (e = t.nodeType), e)
	) {
		case 9:
		case 11:
			t = (t = t.documentElement)
				? t.namespaceURI
				: li(null, "");
			break;
		default:
			(e = e === 8 ? t.parentNode : t),
				(t = e.namespaceURI || null),
				(e = e.tagName),
				(t = li(t, e));
	}
	G(et), U(et, t);
}
function Rn() {
	G(et), G(Cr), G(Tr);
}
function Nc(e) {
	Kt(Tr.current);
	var t = Kt(et.current),
		n = li(t, e.type);
	t !== n && (U(Cr, e), U(et, n));
}
function lo(e) {
	Cr.current === e && (G(et), G(Cr));
}
var Y = _t(0);
function Ra(e) {
	for (var t = e; t !== null; ) {
		if (t.tag === 13) {
			var n = t.memoizedState;
			if (
				n !== null &&
				((n = n.dehydrated),
				n === null || n.data === "$?" || n.data === "$!")
			)
				return t;
		} else if (
			t.tag === 19 &&
			t.memoizedProps.revealOrder !== void 0
		) {
			if (t.flags & 128) return t;
		} else if (t.child !== null) {
			(t.child.return = t), (t = t.child);
			continue;
		}
		if (t === e) break;
		for (; t.sibling === null; ) {
			if (t.return === null || t.return === e) return null;
			t = t.return;
		}
		(t.sibling.return = t.return), (t = t.sibling);
	}
	return null;
}
var io = [];
function oo() {
	for (var e = 0; e < io.length; e++)
		io[e]._workInProgressVersionPrimary = null;
	io.length = 0;
}
var Aa = ot.ReactCurrentDispatcher,
	so = ot.ReactCurrentBatchConfig,
	Zt = 0,
	K = null,
	ne = null,
	le = null,
	Da = !1,
	_r = !1,
	Pr = 0,
	Em = 0;
function pe() {
	throw Error(_(321));
}
function uo(e, t) {
	if (t === null) return !1;
	for (var n = 0; n < t.length && n < e.length; n++)
		if (!We(e[n], t[n])) return !1;
	return !0;
}
function co(e, t, n, r, a, l) {
	if (
		((Zt = l),
		(K = t),
		(t.memoizedState = null),
		(t.updateQueue = null),
		(t.lanes = 0),
		(Aa.current =
			e === null || e.memoizedState === null ? Pm : Om),
		(e = n(r, a)),
		_r)
	) {
		l = 0;
		do {
			if (((_r = !1), (Pr = 0), 25 <= l)) throw Error(_(301));
			(l += 1),
				(le = ne = null),
				(t.updateQueue = null),
				(Aa.current = Lm),
				(e = n(r, a));
		} while (_r);
	}
	if (
		((Aa.current = Ba),
		(t = ne !== null && ne.next !== null),
		(Zt = 0),
		(le = ne = K = null),
		(Da = !1),
		t)
	)
		throw Error(_(300));
	return e;
}
function fo() {
	var e = Pr !== 0;
	return (Pr = 0), e;
}
function tt() {
	var e = {
		memoizedState: null,
		baseState: null,
		baseQueue: null,
		queue: null,
		next: null,
	};
	return (
		le === null
			? (K.memoizedState = le = e)
			: (le = le.next = e),
		le
	);
}
function Be() {
	if (ne === null) {
		var e = K.alternate;
		e = e !== null ? e.memoizedState : null;
	} else e = ne.next;
	var t = le === null ? K.memoizedState : le.next;
	if (t !== null) (le = t), (ne = e);
	else {
		if (e === null) throw Error(_(310));
		(ne = e),
			(e = {
				memoizedState: ne.memoizedState,
				baseState: ne.baseState,
				baseQueue: ne.baseQueue,
				queue: ne.queue,
				next: null,
			}),
			le === null
				? (K.memoizedState = le = e)
				: (le = le.next = e);
	}
	return le;
}
function Or(e, t) {
	return typeof t == "function" ? t(e) : t;
}
function po(e) {
	var t = Be(),
		n = t.queue;
	if (n === null) throw Error(_(311));
	n.lastRenderedReducer = e;
	var r = ne,
		a = r.baseQueue,
		l = n.pending;
	if (l !== null) {
		if (a !== null) {
			var i = a.next;
			(a.next = l.next), (l.next = i);
		}
		(r.baseQueue = a = l), (n.pending = null);
	}
	if (a !== null) {
		(l = a.next), (r = r.baseState);
		var o = (i = null),
			s = null,
			c = l;
		do {
			var d = c.lane;
			if ((Zt & d) === d)
				s !== null &&
					(s = s.next =
						{
							lane: 0,
							action: c.action,
							hasEagerState: c.hasEagerState,
							eagerState: c.eagerState,
							next: null,
						}),
					(r = c.hasEagerState ? c.eagerState : e(r, c.action));
			else {
				var f = {
					lane: d,
					action: c.action,
					hasEagerState: c.hasEagerState,
					eagerState: c.eagerState,
					next: null,
				};
				s === null ? ((o = s = f), (i = r)) : (s = s.next = f),
					(K.lanes |= d),
					(Jt |= d);
			}
			c = c.next;
		} while (c !== null && c !== l);
		s === null ? (i = r) : (s.next = o),
			We(r, t.memoizedState) || (ke = !0),
			(t.memoizedState = r),
			(t.baseState = i),
			(t.baseQueue = s),
			(n.lastRenderedState = r);
	}
	if (((e = n.interleaved), e !== null)) {
		a = e;
		do (l = a.lane), (K.lanes |= l), (Jt |= l), (a = a.next);
		while (a !== e);
	} else a === null && (n.lanes = 0);
	return [t.memoizedState, n.dispatch];
}
function ho(e) {
	var t = Be(),
		n = t.queue;
	if (n === null) throw Error(_(311));
	n.lastRenderedReducer = e;
	var r = n.dispatch,
		a = n.pending,
		l = t.memoizedState;
	if (a !== null) {
		n.pending = null;
		var i = (a = a.next);
		do (l = e(l, i.action)), (i = i.next);
		while (i !== a);
		We(l, t.memoizedState) || (ke = !0),
			(t.memoizedState = l),
			t.baseQueue === null && (t.baseState = l),
			(n.lastRenderedState = l);
	}
	return [l, r];
}
function Ic() {}
function jc(e, t) {
	var n = K,
		r = Be(),
		a = t(),
		l = !We(r.memoizedState, a);
	if (
		(l && ((r.memoizedState = a), (ke = !0)),
		(r = r.queue),
		mo(Dc.bind(null, n, r, e), [e]),
		r.getSnapshot !== t ||
			l ||
			(le !== null && le.memoizedState.tag & 1))
	) {
		if (
			((n.flags |= 2048),
			Lr(9, Ac.bind(null, n, r, a, t), void 0, null),
			ie === null)
		)
			throw Error(_(349));
		Zt & 30 || Rc(n, t, a);
	}
	return a;
}
function Rc(e, t, n) {
	(e.flags |= 16384),
		(e = { getSnapshot: t, value: n }),
		(t = K.updateQueue),
		t === null
			? ((t = { lastEffect: null, stores: null }),
			  (K.updateQueue = t),
			  (t.stores = [e]))
			: ((n = t.stores),
			  n === null ? (t.stores = [e]) : n.push(e));
}
function Ac(e, t, n, r) {
	(t.value = n), (t.getSnapshot = r), Fc(t) && $c(e);
}
function Dc(e, t, n) {
	return n(function () {
		Fc(t) && $c(e);
	});
}
function Fc(e) {
	var t = e.getSnapshot;
	e = e.value;
	try {
		var n = t();
		return !We(e, n);
	} catch {
		return !0;
	}
}
function $c(e) {
	var t = ft(e, 1);
	t !== null && Ye(t, e, 1, -1);
}
function Bc(e) {
	var t = tt();
	return (
		typeof e == "function" && (e = e()),
		(t.memoizedState = t.baseState = e),
		(e = {
			pending: null,
			interleaved: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Or,
			lastRenderedState: e,
		}),
		(t.queue = e),
		(e = e.dispatch = _m.bind(null, K, e)),
		[t.memoizedState, e]
	);
}
function Lr(e, t, n, r) {
	return (
		(e = {
			tag: e,
			create: t,
			destroy: n,
			deps: r,
			next: null,
		}),
		(t = K.updateQueue),
		t === null
			? ((t = { lastEffect: null, stores: null }),
			  (K.updateQueue = t),
			  (t.lastEffect = e.next = e))
			: ((n = t.lastEffect),
			  n === null
					? (t.lastEffect = e.next = e)
					: ((r = n.next),
					  (n.next = e),
					  (e.next = r),
					  (t.lastEffect = e))),
		e
	);
}
function Vc() {
	return Be().memoizedState;
}
function Fa(e, t, n, r) {
	var a = tt();
	(K.flags |= e),
		(a.memoizedState = Lr(
			1 | t,
			n,
			void 0,
			r === void 0 ? null : r
		));
}
function $a(e, t, n, r) {
	var a = Be();
	r = r === void 0 ? null : r;
	var l = void 0;
	if (ne !== null) {
		var i = ne.memoizedState;
		if (((l = i.destroy), r !== null && uo(r, i.deps))) {
			a.memoizedState = Lr(t, n, l, r);
			return;
		}
	}
	(K.flags |= e), (a.memoizedState = Lr(1 | t, n, l, r));
}
function Hc(e, t) {
	return Fa(8390656, 8, e, t);
}
function mo(e, t) {
	return $a(2048, 8, e, t);
}
function Uc(e, t) {
	return $a(4, 2, e, t);
}
function Wc(e, t) {
	return $a(4, 4, e, t);
}
function Gc(e, t) {
	if (typeof t == "function")
		return (
			(e = e()),
			t(e),
			function () {
				t(null);
			}
		);
	if (t != null)
		return (
			(e = e()),
			(t.current = e),
			function () {
				t.current = null;
			}
		);
}
function qc(e, t, n) {
	return (
		(n = n != null ? n.concat([e]) : null),
		$a(4, 4, Gc.bind(null, t, e), n)
	);
}
function go() {}
function Qc(e, t) {
	var n = Be();
	t = t === void 0 ? null : t;
	var r = n.memoizedState;
	return r !== null && t !== null && uo(t, r[1])
		? r[0]
		: ((n.memoizedState = [e, t]), e);
}
function Xc(e, t) {
	var n = Be();
	t = t === void 0 ? null : t;
	var r = n.memoizedState;
	return r !== null && t !== null && uo(t, r[1])
		? r[0]
		: ((e = e()), (n.memoizedState = [e, t]), e);
}
function Yc(e, t, n) {
	return Zt & 21
		? (We(n, t) ||
				((n = Tu()),
				(K.lanes |= n),
				(Jt |= n),
				(e.baseState = !0)),
		  t)
		: (e.baseState && ((e.baseState = !1), (ke = !0)),
		  (e.memoizedState = n));
}
function Cm(e, t) {
	var n = V;
	(V = n !== 0 && 4 > n ? n : 4), e(!0);
	var r = so.transition;
	so.transition = {};
	try {
		e(!1), t();
	} finally {
		(V = n), (so.transition = r);
	}
}
function Kc() {
	return Be().memoizedState;
}
function Tm(e, t, n) {
	var r = jt(e);
	if (
		((n = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null,
		}),
		Zc(e))
	)
		Jc(t, n);
	else if (((n = Oc(e, t, n, r)), n !== null)) {
		var a = be();
		Ye(n, e, r, a), ed(n, t, r);
	}
}
function _m(e, t, n) {
	var r = jt(e),
		a = {
			lane: r,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null,
		};
	if (Zc(e)) Jc(t, a);
	else {
		var l = e.alternate;
		if (
			e.lanes === 0 &&
			(l === null || l.lanes === 0) &&
			((l = t.lastRenderedReducer), l !== null)
		)
			try {
				var i = t.lastRenderedState,
					o = l(i, n);
				if (
					((a.hasEagerState = !0), (a.eagerState = o), We(o, i))
				) {
					var s = t.interleaved;
					s === null
						? ((a.next = a), no(t))
						: ((a.next = s.next), (s.next = a)),
						(t.interleaved = a);
					return;
				}
			} catch {
			} finally {
			}
		(n = Oc(e, t, a, r)),
			n !== null && ((a = be()), Ye(n, e, r, a), ed(n, t, r));
	}
}
function Zc(e) {
	var t = e.alternate;
	return e === K || (t !== null && t === K);
}
function Jc(e, t) {
	_r = Da = !0;
	var n = e.pending;
	n === null
		? (t.next = t)
		: ((t.next = n.next), (n.next = t)),
		(e.pending = t);
}
function ed(e, t, n) {
	if (n & 4194240) {
		var r = t.lanes;
		(r &= e.pendingLanes), (n |= r), (t.lanes = n), vi(e, n);
	}
}
var Ba = {
		readContext: $e,
		useCallback: pe,
		useContext: pe,
		useEffect: pe,
		useImperativeHandle: pe,
		useInsertionEffect: pe,
		useLayoutEffect: pe,
		useMemo: pe,
		useReducer: pe,
		useRef: pe,
		useState: pe,
		useDebugValue: pe,
		useDeferredValue: pe,
		useTransition: pe,
		useMutableSource: pe,
		useSyncExternalStore: pe,
		useId: pe,
		unstable_isNewReconciler: !1,
	},
	Pm = {
		readContext: $e,
		useCallback: function (e, t) {
			return (
				(tt().memoizedState = [e, t === void 0 ? null : t]), e
			);
		},
		useContext: $e,
		useEffect: Hc,
		useImperativeHandle: function (e, t, n) {
			return (
				(n = n != null ? n.concat([e]) : null),
				Fa(4194308, 4, Gc.bind(null, t, e), n)
			);
		},
		useLayoutEffect: function (e, t) {
			return Fa(4194308, 4, e, t);
		},
		useInsertionEffect: function (e, t) {
			return Fa(4, 2, e, t);
		},
		useMemo: function (e, t) {
			var n = tt();
			return (
				(t = t === void 0 ? null : t),
				(e = e()),
				(n.memoizedState = [e, t]),
				e
			);
		},
		useReducer: function (e, t, n) {
			var r = tt();
			return (
				(t = n !== void 0 ? n(t) : t),
				(r.memoizedState = r.baseState = t),
				(e = {
					pending: null,
					interleaved: null,
					lanes: 0,
					dispatch: null,
					lastRenderedReducer: e,
					lastRenderedState: t,
				}),
				(r.queue = e),
				(e = e.dispatch = Tm.bind(null, K, e)),
				[r.memoizedState, e]
			);
		},
		useRef: function (e) {
			var t = tt();
			return (e = { current: e }), (t.memoizedState = e);
		},
		useState: Bc,
		useDebugValue: go,
		useDeferredValue: function (e) {
			return (tt().memoizedState = e);
		},
		useTransition: function () {
			var e = Bc(!1),
				t = e[0];
			return (
				(e = Cm.bind(null, e[1])),
				(tt().memoizedState = e),
				[t, e]
			);
		},
		useMutableSource: function () {},
		useSyncExternalStore: function (e, t, n) {
			var r = K,
				a = tt();
			if (q) {
				if (n === void 0) throw Error(_(407));
				n = n();
			} else {
				if (((n = t()), ie === null)) throw Error(_(349));
				Zt & 30 || Rc(r, t, n);
			}
			a.memoizedState = n;
			var l = { value: n, getSnapshot: t };
			return (
				(a.queue = l),
				Hc(Dc.bind(null, r, l, e), [e]),
				(r.flags |= 2048),
				Lr(9, Ac.bind(null, r, l, n, t), void 0, null),
				n
			);
		},
		useId: function () {
			var e = tt(),
				t = ie.identifierPrefix;
			if (q) {
				var n = dt,
					r = ct;
				(n = (r & ~(1 << (32 - Ue(r) - 1))).toString(32) + n),
					(t = ":" + t + "R" + n),
					(n = Pr++),
					0 < n && (t += "H" + n.toString(32)),
					(t += ":");
			} else
				(n = Em++), (t = ":" + t + "r" + n.toString(32) + ":");
			return (e.memoizedState = t);
		},
		unstable_isNewReconciler: !1,
	},
	Om = {
		readContext: $e,
		useCallback: Qc,
		useContext: $e,
		useEffect: mo,
		useImperativeHandle: qc,
		useInsertionEffect: Uc,
		useLayoutEffect: Wc,
		useMemo: Xc,
		useReducer: po,
		useRef: Vc,
		useState: function () {
			return po(Or);
		},
		useDebugValue: go,
		useDeferredValue: function (e) {
			var t = Be();
			return Yc(t, ne.memoizedState, e);
		},
		useTransition: function () {
			var e = po(Or)[0],
				t = Be().memoizedState;
			return [e, t];
		},
		useMutableSource: Ic,
		useSyncExternalStore: jc,
		useId: Kc,
		unstable_isNewReconciler: !1,
	},
	Lm = {
		readContext: $e,
		useCallback: Qc,
		useContext: $e,
		useEffect: mo,
		useImperativeHandle: qc,
		useInsertionEffect: Uc,
		useLayoutEffect: Wc,
		useMemo: Xc,
		useReducer: ho,
		useRef: Vc,
		useState: function () {
			return ho(Or);
		},
		useDebugValue: go,
		useDeferredValue: function (e) {
			var t = Be();
			return ne === null
				? (t.memoizedState = e)
				: Yc(t, ne.memoizedState, e);
		},
		useTransition: function () {
			var e = ho(Or)[0],
				t = Be().memoizedState;
			return [e, t];
		},
		useMutableSource: Ic,
		useSyncExternalStore: jc,
		useId: Kc,
		unstable_isNewReconciler: !1,
	};
function qe(e, t) {
	if (e && e.defaultProps) {
		(t = X({}, t)), (e = e.defaultProps);
		for (var n in e) t[n] === void 0 && (t[n] = e[n]);
		return t;
	}
	return t;
}
function vo(e, t, n, r) {
	(t = e.memoizedState),
		(n = n(r, t)),
		(n = n == null ? t : X({}, t, n)),
		(e.memoizedState = n),
		e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Va = {
	isMounted: function (e) {
		return (e = e._reactInternals) ? Wt(e) === e : !1;
	},
	enqueueSetState: function (e, t, n) {
		e = e._reactInternals;
		var r = be(),
			a = jt(e),
			l = pt(r, a);
		(l.payload = t),
			n != null && (l.callback = n),
			(t = zt(e, l, a)),
			t !== null && (Ye(t, e, a, r), Ia(t, e, a));
	},
	enqueueReplaceState: function (e, t, n) {
		e = e._reactInternals;
		var r = be(),
			a = jt(e),
			l = pt(r, a);
		(l.tag = 1),
			(l.payload = t),
			n != null && (l.callback = n),
			(t = zt(e, l, a)),
			t !== null && (Ye(t, e, a, r), Ia(t, e, a));
	},
	enqueueForceUpdate: function (e, t) {
		e = e._reactInternals;
		var n = be(),
			r = jt(e),
			a = pt(n, r);
		(a.tag = 2),
			t != null && (a.callback = t),
			(t = zt(e, a, r)),
			t !== null && (Ye(t, e, r, n), Ia(t, e, r));
	},
};
function td(e, t, n, r, a, l, i) {
	return (
		(e = e.stateNode),
		typeof e.shouldComponentUpdate == "function"
			? e.shouldComponentUpdate(r, l, i)
			: t.prototype && t.prototype.isPureReactComponent
			? !gr(n, r) || !gr(a, l)
			: !0
	);
}
function nd(e, t, n) {
	var r = !1,
		a = Pt,
		l = t.contextType;
	return (
		typeof l == "object" && l !== null
			? (l = $e(l))
			: ((a = xe(t) ? qt : fe.current),
			  (r = t.contextTypes),
			  (l = (r = r != null) ? On(e, a) : Pt)),
		(t = new t(n, l)),
		(e.memoizedState =
			t.state !== null && t.state !== void 0 ? t.state : null),
		(t.updater = Va),
		(e.stateNode = t),
		(t._reactInternals = e),
		r &&
			((e = e.stateNode),
			(e.__reactInternalMemoizedUnmaskedChildContext = a),
			(e.__reactInternalMemoizedMaskedChildContext = l)),
		t
	);
}
function rd(e, t, n, r) {
	(e = t.state),
		typeof t.componentWillReceiveProps == "function" &&
			t.componentWillReceiveProps(n, r),
		typeof t.UNSAFE_componentWillReceiveProps == "function" &&
			t.UNSAFE_componentWillReceiveProps(n, r),
		t.state !== e && Va.enqueueReplaceState(t, t.state, null);
}
function yo(e, t, n, r) {
	var a = e.stateNode;
	(a.props = n),
		(a.state = e.memoizedState),
		(a.refs = {}),
		ro(e);
	var l = t.contextType;
	typeof l == "object" && l !== null
		? (a.context = $e(l))
		: ((l = xe(t) ? qt : fe.current), (a.context = On(e, l))),
		(a.state = e.memoizedState),
		(l = t.getDerivedStateFromProps),
		typeof l == "function" &&
			(vo(e, t, l, n), (a.state = e.memoizedState)),
		typeof t.getDerivedStateFromProps == "function" ||
			typeof a.getSnapshotBeforeUpdate == "function" ||
			(typeof a.UNSAFE_componentWillMount != "function" &&
				typeof a.componentWillMount != "function") ||
			((t = a.state),
			typeof a.componentWillMount == "function" &&
				a.componentWillMount(),
			typeof a.UNSAFE_componentWillMount == "function" &&
				a.UNSAFE_componentWillMount(),
			t !== a.state &&
				Va.enqueueReplaceState(a, a.state, null),
			ja(e, n, a, r),
			(a.state = e.memoizedState)),
		typeof a.componentDidMount == "function" &&
			(e.flags |= 4194308);
}
function An(e, t) {
	try {
		var n = "",
			r = t;
		do (n += ah(r)), (r = r.return);
		while (r);
		var a = n;
	} catch (l) {
		a =
			`
Error generating stack: ` +
			l.message +
			`
` +
			l.stack;
	}
	return { value: e, source: t, stack: a, digest: null };
}
function bo(e, t, n) {
	return {
		value: e,
		source: null,
		stack: n ?? null,
		digest: t ?? null,
	};
}
function wo(e, t) {
	try {
		console.error(t.value);
	} catch (n) {
		setTimeout(function () {
			throw n;
		});
	}
}
var zm = typeof WeakMap == "function" ? WeakMap : Map;
function ad(e, t, n) {
	(n = pt(-1, n)),
		(n.tag = 3),
		(n.payload = { element: null });
	var r = t.value;
	return (
		(n.callback = function () {
			Xa || ((Xa = !0), (Io = r)), wo(e, t);
		}),
		n
	);
}
function ld(e, t, n) {
	(n = pt(-1, n)), (n.tag = 3);
	var r = e.type.getDerivedStateFromError;
	if (typeof r == "function") {
		var a = t.value;
		(n.payload = function () {
			return r(a);
		}),
			(n.callback = function () {
				wo(e, t);
			});
	}
	var l = e.stateNode;
	return (
		l !== null &&
			typeof l.componentDidCatch == "function" &&
			(n.callback = function () {
				wo(e, t),
					typeof r != "function" &&
						(Nt === null ? (Nt = new Set([this])) : Nt.add(this));
				var i = t.stack;
				this.componentDidCatch(t.value, {
					componentStack: i !== null ? i : "",
				});
			}),
		n
	);
}
function id(e, t, n) {
	var r = e.pingCache;
	if (r === null) {
		r = e.pingCache = new zm();
		var a = new Set();
		r.set(t, a);
	} else
		(a = r.get(t)),
			a === void 0 && ((a = new Set()), r.set(t, a));
	a.has(n) ||
		(a.add(n), (e = Wm.bind(null, e, t, n)), t.then(e, e));
}
function od(e) {
	do {
		var t;
		if (
			((t = e.tag === 13) &&
				((t = e.memoizedState),
				(t = t !== null ? t.dehydrated !== null : !0)),
			t)
		)
			return e;
		e = e.return;
	} while (e !== null);
	return null;
}
function sd(e, t, n, r, a) {
	return e.mode & 1
		? ((e.flags |= 65536), (e.lanes = a), e)
		: (e === t
				? (e.flags |= 65536)
				: ((e.flags |= 128),
				  (n.flags |= 131072),
				  (n.flags &= -52805),
				  n.tag === 1 &&
						(n.alternate === null
							? (n.tag = 17)
							: ((t = pt(-1, 1)), (t.tag = 2), zt(n, t, 1))),
				  (n.lanes |= 1)),
		  e);
}
var Mm = ot.ReactCurrentOwner,
	ke = !1;
function ye(e, t, n, r) {
	t.child =
		e === null ? Pc(t, null, n, r) : Nn(t, e.child, n, r);
}
function ud(e, t, n, r, a) {
	n = n.render;
	var l = t.ref;
	return (
		jn(t, a),
		(r = co(e, t, n, r, l, a)),
		(n = fo()),
		e !== null && !ke
			? ((t.updateQueue = e.updateQueue),
			  (t.flags &= -2053),
			  (e.lanes &= ~a),
			  ht(e, t, a))
			: (q && n && qi(t),
			  (t.flags |= 1),
			  ye(e, t, r, a),
			  t.child)
	);
}
function cd(e, t, n, r, a) {
	if (e === null) {
		var l = n.type;
		return typeof l == "function" &&
			!Bo(l) &&
			l.defaultProps === void 0 &&
			n.compare === null &&
			n.defaultProps === void 0
			? ((t.tag = 15), (t.type = l), dd(e, t, l, r, a))
			: ((e = tl(n.type, null, r, t, t.mode, a)),
			  (e.ref = t.ref),
			  (e.return = t),
			  (t.child = e));
	}
	if (((l = e.child), !(e.lanes & a))) {
		var i = l.memoizedProps;
		if (
			((n = n.compare),
			(n = n !== null ? n : gr),
			n(i, r) && e.ref === t.ref)
		)
			return ht(e, t, a);
	}
	return (
		(t.flags |= 1),
		(e = At(l, r)),
		(e.ref = t.ref),
		(e.return = t),
		(t.child = e)
	);
}
function dd(e, t, n, r, a) {
	if (e !== null) {
		var l = e.memoizedProps;
		if (gr(l, r) && e.ref === t.ref)
			if (
				((ke = !1),
				(t.pendingProps = r = l),
				(e.lanes & a) !== 0)
			)
				e.flags & 131072 && (ke = !0);
			else return (t.lanes = e.lanes), ht(e, t, a);
	}
	return So(e, t, n, r, a);
}
function fd(e, t, n) {
	var r = t.pendingProps,
		a = r.children,
		l = e !== null ? e.memoizedState : null;
	if (r.mode === "hidden")
		if (!(t.mode & 1))
			(t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null,
			}),
				U(Fn, Me),
				(Me |= n);
		else {
			if (!(n & 1073741824))
				return (
					(e = l !== null ? l.baseLanes | n : n),
					(t.lanes = t.childLanes = 1073741824),
					(t.memoizedState = {
						baseLanes: e,
						cachePool: null,
						transitions: null,
					}),
					(t.updateQueue = null),
					U(Fn, Me),
					(Me |= e),
					null
				);
			(t.memoizedState = {
				baseLanes: 0,
				cachePool: null,
				transitions: null,
			}),
				(r = l !== null ? l.baseLanes : n),
				U(Fn, Me),
				(Me |= r);
		}
	else
		l !== null
			? ((r = l.baseLanes | n), (t.memoizedState = null))
			: (r = n),
			U(Fn, Me),
			(Me |= r);
	return ye(e, t, a, n), t.child;
}
function pd(e, t) {
	var n = t.ref;
	((e === null && n !== null) ||
		(e !== null && e.ref !== n)) &&
		((t.flags |= 512), (t.flags |= 2097152));
}
function So(e, t, n, r, a) {
	var l = xe(n) ? qt : fe.current;
	return (
		(l = On(t, l)),
		jn(t, a),
		(n = co(e, t, n, r, l, a)),
		(r = fo()),
		e !== null && !ke
			? ((t.updateQueue = e.updateQueue),
			  (t.flags &= -2053),
			  (e.lanes &= ~a),
			  ht(e, t, a))
			: (q && r && qi(t),
			  (t.flags |= 1),
			  ye(e, t, n, a),
			  t.child)
	);
}
function hd(e, t, n, r, a) {
	if (xe(n)) {
		var l = !0;
		Ta(t);
	} else l = !1;
	if ((jn(t, a), t.stateNode === null))
		Ua(e, t), nd(t, n, r), yo(t, n, r, a), (r = !0);
	else if (e === null) {
		var i = t.stateNode,
			o = t.memoizedProps;
		i.props = o;
		var s = i.context,
			c = n.contextType;
		typeof c == "object" && c !== null
			? (c = $e(c))
			: ((c = xe(n) ? qt : fe.current), (c = On(t, c)));
		var d = n.getDerivedStateFromProps,
			f =
				typeof d == "function" ||
				typeof i.getSnapshotBeforeUpdate == "function";
		f ||
			(typeof i.UNSAFE_componentWillReceiveProps !=
				"function" &&
				typeof i.componentWillReceiveProps != "function") ||
			((o !== r || s !== c) && rd(t, i, r, c)),
			(Lt = !1);
		var m = t.memoizedState;
		(i.state = m),
			ja(t, r, i, a),
			(s = t.memoizedState),
			o !== r || m !== s || Se.current || Lt
				? (typeof d == "function" &&
						(vo(t, n, d, r), (s = t.memoizedState)),
				  (o = Lt || td(t, n, o, r, m, s, c))
						? (f ||
								(typeof i.UNSAFE_componentWillMount != "function" &&
									typeof i.componentWillMount != "function") ||
								(typeof i.componentWillMount == "function" &&
									i.componentWillMount(),
								typeof i.UNSAFE_componentWillMount == "function" &&
									i.UNSAFE_componentWillMount()),
						  typeof i.componentDidMount == "function" &&
								(t.flags |= 4194308))
						: (typeof i.componentDidMount == "function" &&
								(t.flags |= 4194308),
						  (t.memoizedProps = r),
						  (t.memoizedState = s)),
				  (i.props = r),
				  (i.state = s),
				  (i.context = c),
				  (r = o))
				: (typeof i.componentDidMount == "function" &&
						(t.flags |= 4194308),
				  (r = !1));
	} else {
		(i = t.stateNode),
			Lc(e, t),
			(o = t.memoizedProps),
			(c = t.type === t.elementType ? o : qe(t.type, o)),
			(i.props = c),
			(f = t.pendingProps),
			(m = i.context),
			(s = n.contextType),
			typeof s == "object" && s !== null
				? (s = $e(s))
				: ((s = xe(n) ? qt : fe.current), (s = On(t, s)));
		var v = n.getDerivedStateFromProps;
		(d =
			typeof v == "function" ||
			typeof i.getSnapshotBeforeUpdate == "function") ||
			(typeof i.UNSAFE_componentWillReceiveProps !=
				"function" &&
				typeof i.componentWillReceiveProps != "function") ||
			((o !== f || m !== s) && rd(t, i, r, s)),
			(Lt = !1),
			(m = t.memoizedState),
			(i.state = m),
			ja(t, r, i, a);
		var g = t.memoizedState;
		o !== f || m !== g || Se.current || Lt
			? (typeof v == "function" &&
					(vo(t, n, v, r), (g = t.memoizedState)),
			  (c = Lt || td(t, n, c, r, m, g, s) || !1)
					? (d ||
							(typeof i.UNSAFE_componentWillUpdate != "function" &&
								typeof i.componentWillUpdate != "function") ||
							(typeof i.componentWillUpdate == "function" &&
								i.componentWillUpdate(r, g, s),
							typeof i.UNSAFE_componentWillUpdate == "function" &&
								i.UNSAFE_componentWillUpdate(r, g, s)),
					  typeof i.componentDidUpdate == "function" &&
							(t.flags |= 4),
					  typeof i.getSnapshotBeforeUpdate == "function" &&
							(t.flags |= 1024))
					: (typeof i.componentDidUpdate != "function" ||
							(o === e.memoizedProps && m === e.memoizedState) ||
							(t.flags |= 4),
					  typeof i.getSnapshotBeforeUpdate != "function" ||
							(o === e.memoizedProps && m === e.memoizedState) ||
							(t.flags |= 1024),
					  (t.memoizedProps = r),
					  (t.memoizedState = g)),
			  (i.props = r),
			  (i.state = g),
			  (i.context = s),
			  (r = c))
			: (typeof i.componentDidUpdate != "function" ||
					(o === e.memoizedProps && m === e.memoizedState) ||
					(t.flags |= 4),
			  typeof i.getSnapshotBeforeUpdate != "function" ||
					(o === e.memoizedProps && m === e.memoizedState) ||
					(t.flags |= 1024),
			  (r = !1));
	}
	return xo(e, t, n, r, l, a);
}
function xo(e, t, n, r, a, l) {
	pd(e, t);
	var i = (t.flags & 128) !== 0;
	if (!r && !i) return a && bc(t, n, !1), ht(e, t, l);
	(r = t.stateNode), (Mm.current = t);
	var o =
		i && typeof n.getDerivedStateFromError != "function"
			? null
			: r.render();
	return (
		(t.flags |= 1),
		e !== null && i
			? ((t.child = Nn(t, e.child, null, l)),
			  (t.child = Nn(t, null, o, l)))
			: ye(e, t, o, l),
		(t.memoizedState = r.state),
		a && bc(t, n, !0),
		t.child
	);
}
function md(e) {
	var t = e.stateNode;
	t.pendingContext
		? vc(e, t.pendingContext, t.pendingContext !== t.context)
		: t.context && vc(e, t.context, !1),
		ao(e, t.containerInfo);
}
function gd(e, t, n, r, a) {
	return (
		Mn(), Ki(a), (t.flags |= 256), ye(e, t, n, r), t.child
	);
}
var ko = {
	dehydrated: null,
	treeContext: null,
	retryLane: 0,
};
function Eo(e) {
	return {
		baseLanes: e,
		cachePool: null,
		transitions: null,
	};
}
function vd(e, t, n) {
	var r = t.pendingProps,
		a = Y.current,
		l = !1,
		i = (t.flags & 128) !== 0,
		o;
	if (
		((o = i) ||
			(o =
				e !== null && e.memoizedState === null
					? !1
					: (a & 2) !== 0),
		o
			? ((l = !0), (t.flags &= -129))
			: (e === null || e.memoizedState !== null) && (a |= 1),
		U(Y, a & 1),
		e === null)
	)
		return (
			Yi(t),
			(e = t.memoizedState),
			e !== null && ((e = e.dehydrated), e !== null)
				? (t.mode & 1
						? e.data === "$!"
							? (t.lanes = 8)
							: (t.lanes = 1073741824)
						: (t.lanes = 1),
				  null)
				: ((i = r.children),
				  (e = r.fallback),
				  l
						? ((r = t.mode),
						  (l = t.child),
						  (i = { mode: "hidden", children: i }),
						  !(r & 1) && l !== null
								? ((l.childLanes = 0), (l.pendingProps = i))
								: (l = nl(i, r, 0, null)),
						  (e = rn(e, r, n, null)),
						  (l.return = t),
						  (e.return = t),
						  (l.sibling = e),
						  (t.child = l),
						  (t.child.memoizedState = Eo(n)),
						  (t.memoizedState = ko),
						  e)
						: Co(t, i))
		);
	if (
		((a = e.memoizedState),
		a !== null && ((o = a.dehydrated), o !== null))
	)
		return Nm(e, t, i, r, o, a, n);
	if (l) {
		(l = r.fallback),
			(i = t.mode),
			(a = e.child),
			(o = a.sibling);
		var s = { mode: "hidden", children: r.children };
		return (
			!(i & 1) && t.child !== a
				? ((r = t.child),
				  (r.childLanes = 0),
				  (r.pendingProps = s),
				  (t.deletions = null))
				: ((r = At(a, s)),
				  (r.subtreeFlags = a.subtreeFlags & 14680064)),
			o !== null
				? (l = At(o, l))
				: ((l = rn(l, i, n, null)), (l.flags |= 2)),
			(l.return = t),
			(r.return = t),
			(r.sibling = l),
			(t.child = r),
			(r = l),
			(l = t.child),
			(i = e.child.memoizedState),
			(i =
				i === null
					? Eo(n)
					: {
							baseLanes: i.baseLanes | n,
							cachePool: null,
							transitions: i.transitions,
					  }),
			(l.memoizedState = i),
			(l.childLanes = e.childLanes & ~n),
			(t.memoizedState = ko),
			r
		);
	}
	return (
		(l = e.child),
		(e = l.sibling),
		(r = At(l, { mode: "visible", children: r.children })),
		!(t.mode & 1) && (r.lanes = n),
		(r.return = t),
		(r.sibling = null),
		e !== null &&
			((n = t.deletions),
			n === null
				? ((t.deletions = [e]), (t.flags |= 16))
				: n.push(e)),
		(t.child = r),
		(t.memoizedState = null),
		r
	);
}
function Co(e, t) {
	return (
		(t = nl(
			{ mode: "visible", children: t },
			e.mode,
			0,
			null
		)),
		(t.return = e),
		(e.child = t)
	);
}
function Ha(e, t, n, r) {
	return (
		r !== null && Ki(r),
		Nn(t, e.child, null, n),
		(e = Co(t, t.pendingProps.children)),
		(e.flags |= 2),
		(t.memoizedState = null),
		e
	);
}
function Nm(e, t, n, r, a, l, i) {
	if (n)
		return t.flags & 256
			? ((t.flags &= -257),
			  (r = bo(Error(_(422)))),
			  Ha(e, t, i, r))
			: t.memoizedState !== null
			? ((t.child = e.child), (t.flags |= 128), null)
			: ((l = r.fallback),
			  (a = t.mode),
			  (r = nl(
					{ mode: "visible", children: r.children },
					a,
					0,
					null
			  )),
			  (l = rn(l, a, i, null)),
			  (l.flags |= 2),
			  (r.return = t),
			  (l.return = t),
			  (r.sibling = l),
			  (t.child = r),
			  t.mode & 1 && Nn(t, e.child, null, i),
			  (t.child.memoizedState = Eo(i)),
			  (t.memoizedState = ko),
			  l);
	if (!(t.mode & 1)) return Ha(e, t, i, null);
	if (a.data === "$!") {
		if (((r = a.nextSibling && a.nextSibling.dataset), r))
			var o = r.dgst;
		return (
			(r = o),
			(l = Error(_(419))),
			(r = bo(l, r, void 0)),
			Ha(e, t, i, r)
		);
	}
	if (((o = (i & e.childLanes) !== 0), ke || o)) {
		if (((r = ie), r !== null)) {
			switch (i & -i) {
				case 4:
					a = 2;
					break;
				case 16:
					a = 8;
					break;
				case 64:
				case 128:
				case 256:
				case 512:
				case 1024:
				case 2048:
				case 4096:
				case 8192:
				case 16384:
				case 32768:
				case 65536:
				case 131072:
				case 262144:
				case 524288:
				case 1048576:
				case 2097152:
				case 4194304:
				case 8388608:
				case 16777216:
				case 33554432:
				case 67108864:
					a = 32;
					break;
				case 536870912:
					a = 268435456;
					break;
				default:
					a = 0;
			}
			(a = a & (r.suspendedLanes | i) ? 0 : a),
				a !== 0 &&
					a !== l.retryLane &&
					((l.retryLane = a), ft(e, a), Ye(r, e, a, -1));
		}
		return $o(), (r = bo(Error(_(421)))), Ha(e, t, i, r);
	}
	return a.data === "$?"
		? ((t.flags |= 128),
		  (t.child = e.child),
		  (t = Gm.bind(null, e)),
		  (a._reactRetry = t),
		  null)
		: ((e = l.treeContext),
		  (ze = Tt(a.nextSibling)),
		  (Le = t),
		  (q = !0),
		  (Ge = null),
		  e !== null &&
				((De[Fe++] = ct),
				(De[Fe++] = dt),
				(De[Fe++] = Qt),
				(ct = e.id),
				(dt = e.overflow),
				(Qt = t)),
		  (t = Co(t, r.children)),
		  (t.flags |= 4096),
		  t);
}
function yd(e, t, n) {
	e.lanes |= t;
	var r = e.alternate;
	r !== null && (r.lanes |= t), to(e.return, t, n);
}
function To(e, t, n, r, a) {
	var l = e.memoizedState;
	l === null
		? (e.memoizedState = {
				isBackwards: t,
				rendering: null,
				renderingStartTime: 0,
				last: r,
				tail: n,
				tailMode: a,
		  })
		: ((l.isBackwards = t),
		  (l.rendering = null),
		  (l.renderingStartTime = 0),
		  (l.last = r),
		  (l.tail = n),
		  (l.tailMode = a));
}
function bd(e, t, n) {
	var r = t.pendingProps,
		a = r.revealOrder,
		l = r.tail;
	if ((ye(e, t, r.children, n), (r = Y.current), r & 2))
		(r = (r & 1) | 2), (t.flags |= 128);
	else {
		if (e !== null && e.flags & 128)
			e: for (e = t.child; e !== null; ) {
				if (e.tag === 13)
					e.memoizedState !== null && yd(e, n, t);
				else if (e.tag === 19) yd(e, n, t);
				else if (e.child !== null) {
					(e.child.return = e), (e = e.child);
					continue;
				}
				if (e === t) break e;
				for (; e.sibling === null; ) {
					if (e.return === null || e.return === t) break e;
					e = e.return;
				}
				(e.sibling.return = e.return), (e = e.sibling);
			}
		r &= 1;
	}
	if ((U(Y, r), !(t.mode & 1))) t.memoizedState = null;
	else
		switch (a) {
			case "forwards":
				for (n = t.child, a = null; n !== null; )
					(e = n.alternate),
						e !== null && Ra(e) === null && (a = n),
						(n = n.sibling);
				(n = a),
					n === null
						? ((a = t.child), (t.child = null))
						: ((a = n.sibling), (n.sibling = null)),
					To(t, !1, a, n, l);
				break;
			case "backwards":
				for (
					n = null, a = t.child, t.child = null;
					a !== null;

				) {
					if (
						((e = a.alternate), e !== null && Ra(e) === null)
					) {
						t.child = a;
						break;
					}
					(e = a.sibling), (a.sibling = n), (n = a), (a = e);
				}
				To(t, !0, n, null, l);
				break;
			case "together":
				To(t, !1, null, null, void 0);
				break;
			default:
				t.memoizedState = null;
		}
	return t.child;
}
function Ua(e, t) {
	!(t.mode & 1) &&
		e !== null &&
		((e.alternate = null),
		(t.alternate = null),
		(t.flags |= 2));
}
function ht(e, t, n) {
	if (
		(e !== null && (t.dependencies = e.dependencies),
		(Jt |= t.lanes),
		!(n & t.childLanes))
	)
		return null;
	if (e !== null && t.child !== e.child) throw Error(_(153));
	if (t.child !== null) {
		for (
			e = t.child,
				n = At(e, e.pendingProps),
				t.child = n,
				n.return = t;
			e.sibling !== null;

		)
			(e = e.sibling),
				(n = n.sibling = At(e, e.pendingProps)),
				(n.return = t);
		n.sibling = null;
	}
	return t.child;
}
function Im(e, t, n) {
	switch (t.tag) {
		case 3:
			md(t), Mn();
			break;
		case 5:
			Nc(t);
			break;
		case 1:
			xe(t.type) && Ta(t);
			break;
		case 4:
			ao(t, t.stateNode.containerInfo);
			break;
		case 10:
			var r = t.type._context,
				a = t.memoizedProps.value;
			U(Ma, r._currentValue), (r._currentValue = a);
			break;
		case 13:
			if (((r = t.memoizedState), r !== null))
				return r.dehydrated !== null
					? (U(Y, Y.current & 1), (t.flags |= 128), null)
					: n & t.child.childLanes
					? vd(e, t, n)
					: (U(Y, Y.current & 1),
					  (e = ht(e, t, n)),
					  e !== null ? e.sibling : null);
			U(Y, Y.current & 1);
			break;
		case 19:
			if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
				if (r) return bd(e, t, n);
				t.flags |= 128;
			}
			if (
				((a = t.memoizedState),
				a !== null &&
					((a.rendering = null),
					(a.tail = null),
					(a.lastEffect = null)),
				U(Y, Y.current),
				r)
			)
				break;
			return null;
		case 22:
		case 23:
			return (t.lanes = 0), fd(e, t, n);
	}
	return ht(e, t, n);
}
var wd, _o, Sd, xd;
(wd = function (e, t) {
	for (var n = t.child; n !== null; ) {
		if (n.tag === 5 || n.tag === 6)
			e.appendChild(n.stateNode);
		else if (n.tag !== 4 && n.child !== null) {
			(n.child.return = n), (n = n.child);
			continue;
		}
		if (n === t) break;
		for (; n.sibling === null; ) {
			if (n.return === null || n.return === t) return;
			n = n.return;
		}
		(n.sibling.return = n.return), (n = n.sibling);
	}
}),
	(_o = function () {}),
	(Sd = function (e, t, n, r) {
		var a = e.memoizedProps;
		if (a !== r) {
			(e = t.stateNode), Kt(et.current);
			var l = null;
			switch (n) {
				case "input":
					(a = ti(e, a)), (r = ti(e, r)), (l = []);
					break;
				case "select":
					(a = X({}, a, { value: void 0 })),
						(r = X({}, r, { value: void 0 })),
						(l = []);
					break;
				case "textarea":
					(a = ai(e, a)), (r = ai(e, r)), (l = []);
					break;
				default:
					typeof a.onClick != "function" &&
						typeof r.onClick == "function" &&
						(e.onclick = ka);
			}
			ii(n, r);
			var i;
			n = null;
			for (c in a)
				if (
					!r.hasOwnProperty(c) &&
					a.hasOwnProperty(c) &&
					a[c] != null
				)
					if (c === "style") {
						var o = a[c];
						for (i in o)
							o.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
					} else
						c !== "dangerouslySetInnerHTML" &&
							c !== "children" &&
							c !== "suppressContentEditableWarning" &&
							c !== "suppressHydrationWarning" &&
							c !== "autoFocus" &&
							(Xn.hasOwnProperty(c)
								? l || (l = [])
								: (l = l || []).push(c, null));
			for (c in r) {
				var s = r[c];
				if (
					((o = a == null ? void 0 : a[c]),
					r.hasOwnProperty(c) &&
						s !== o &&
						(s != null || o != null))
				)
					if (c === "style")
						if (o) {
							for (i in o)
								!o.hasOwnProperty(i) ||
									(s && s.hasOwnProperty(i)) ||
									(n || (n = {}), (n[i] = ""));
							for (i in s)
								s.hasOwnProperty(i) &&
									o[i] !== s[i] &&
									(n || (n = {}), (n[i] = s[i]));
						} else n || (l || (l = []), l.push(c, n)), (n = s);
					else
						c === "dangerouslySetInnerHTML"
							? ((s = s ? s.__html : void 0),
							  (o = o ? o.__html : void 0),
							  s != null && o !== s && (l = l || []).push(c, s))
							: c === "children"
							? (typeof s != "string" && typeof s != "number") ||
							  (l = l || []).push(c, "" + s)
							: c !== "suppressContentEditableWarning" &&
							  c !== "suppressHydrationWarning" &&
							  (Xn.hasOwnProperty(c)
									? (s != null && c === "onScroll" && W("scroll", e),
									  l || o === s || (l = []))
									: (l = l || []).push(c, s));
			}
			n && (l = l || []).push("style", n);
			var c = l;
			(t.updateQueue = c) && (t.flags |= 4);
		}
	}),
	(xd = function (e, t, n, r) {
		n !== r && (t.flags |= 4);
	});
function zr(e, t) {
	if (!q)
		switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null; )
					t.alternate !== null && (n = t), (t = t.sibling);
				n === null ? (e.tail = null) : (n.sibling = null);
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null; )
					n.alternate !== null && (r = n), (n = n.sibling);
				r === null
					? t || e.tail === null
						? (e.tail = null)
						: (e.tail.sibling = null)
					: (r.sibling = null);
		}
}
function he(e) {
	var t =
			e.alternate !== null && e.alternate.child === e.child,
		n = 0,
		r = 0;
	if (t)
		for (var a = e.child; a !== null; )
			(n |= a.lanes | a.childLanes),
				(r |= a.subtreeFlags & 14680064),
				(r |= a.flags & 14680064),
				(a.return = e),
				(a = a.sibling);
	else
		for (a = e.child; a !== null; )
			(n |= a.lanes | a.childLanes),
				(r |= a.subtreeFlags),
				(r |= a.flags),
				(a.return = e),
				(a = a.sibling);
	return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function jm(e, t, n) {
	var r = t.pendingProps;
	switch ((Qi(t), t.tag)) {
		case 2:
		case 16:
		case 15:
		case 0:
		case 11:
		case 7:
		case 8:
		case 12:
		case 9:
		case 14:
			return he(t), null;
		case 1:
			return xe(t.type) && Ca(), he(t), null;
		case 3:
			return (
				(r = t.stateNode),
				Rn(),
				G(Se),
				G(fe),
				oo(),
				r.pendingContext &&
					((r.context = r.pendingContext),
					(r.pendingContext = null)),
				(e === null || e.child === null) &&
					(La(t)
						? (t.flags |= 4)
						: e === null ||
						  (e.memoizedState.isDehydrated &&
								!(t.flags & 256)) ||
						  ((t.flags |= 1024),
						  Ge !== null && (Ao(Ge), (Ge = null)))),
				_o(e, t),
				he(t),
				null
			);
		case 5:
			lo(t);
			var a = Kt(Tr.current);
			if (((n = t.type), e !== null && t.stateNode != null))
				Sd(e, t, n, r, a),
					e.ref !== t.ref &&
						((t.flags |= 512), (t.flags |= 2097152));
			else {
				if (!r) {
					if (t.stateNode === null) throw Error(_(166));
					return he(t), null;
				}
				if (((e = Kt(et.current)), La(t))) {
					(r = t.stateNode), (n = t.type);
					var l = t.memoizedProps;
					switch (
						((r[Je] = t),
						(r[Sr] = l),
						(e = (t.mode & 1) !== 0),
						n)
					) {
						case "dialog":
							W("cancel", r), W("close", r);
							break;
						case "iframe":
						case "object":
						case "embed":
							W("load", r);
							break;
						case "video":
						case "audio":
							for (a = 0; a < yr.length; a++) W(yr[a], r);
							break;
						case "source":
							W("error", r);
							break;
						case "img":
						case "image":
						case "link":
							W("error", r), W("load", r);
							break;
						case "details":
							W("toggle", r);
							break;
						case "input":
							nu(r, l), W("invalid", r);
							break;
						case "select":
							(r._wrapperState = { wasMultiple: !!l.multiple }),
								W("invalid", r);
							break;
						case "textarea":
							lu(r, l), W("invalid", r);
					}
					ii(n, l), (a = null);
					for (var i in l)
						if (l.hasOwnProperty(i)) {
							var o = l[i];
							i === "children"
								? typeof o == "string"
									? r.textContent !== o &&
									  (l.suppressHydrationWarning !== !0 &&
											xa(r.textContent, o, e),
									  (a = ["children", o]))
									: typeof o == "number" &&
									  r.textContent !== "" + o &&
									  (l.suppressHydrationWarning !== !0 &&
											xa(r.textContent, o, e),
									  (a = ["children", "" + o]))
								: Xn.hasOwnProperty(i) &&
								  o != null &&
								  i === "onScroll" &&
								  W("scroll", r);
						}
					switch (n) {
						case "input":
							Jr(r), au(r, l, !0);
							break;
						case "textarea":
							Jr(r), ou(r);
							break;
						case "select":
						case "option":
							break;
						default:
							typeof l.onClick == "function" && (r.onclick = ka);
					}
					(r = a),
						(t.updateQueue = r),
						r !== null && (t.flags |= 4);
				} else {
					(i = a.nodeType === 9 ? a : a.ownerDocument),
						e === "http://www.w3.org/1999/xhtml" && (e = su(n)),
						e === "http://www.w3.org/1999/xhtml"
							? n === "script"
								? ((e = i.createElement("div")),
								  (e.innerHTML = "<script></script>"),
								  (e = e.removeChild(e.firstChild)))
								: typeof r.is == "string"
								? (e = i.createElement(n, { is: r.is }))
								: ((e = i.createElement(n)),
								  n === "select" &&
										((i = e),
										r.multiple
											? (i.multiple = !0)
											: r.size && (i.size = r.size)))
							: (e = i.createElementNS(e, n)),
						(e[Je] = t),
						(e[Sr] = r),
						wd(e, t, !1, !1),
						(t.stateNode = e);
					e: {
						switch (((i = oi(n, r)), n)) {
							case "dialog":
								W("cancel", e), W("close", e), (a = r);
								break;
							case "iframe":
							case "object":
							case "embed":
								W("load", e), (a = r);
								break;
							case "video":
							case "audio":
								for (a = 0; a < yr.length; a++) W(yr[a], e);
								a = r;
								break;
							case "source":
								W("error", e), (a = r);
								break;
							case "img":
							case "image":
							case "link":
								W("error", e), W("load", e), (a = r);
								break;
							case "details":
								W("toggle", e), (a = r);
								break;
							case "input":
								nu(e, r), (a = ti(e, r)), W("invalid", e);
								break;
							case "option":
								a = r;
								break;
							case "select":
								(e._wrapperState = { wasMultiple: !!r.multiple }),
									(a = X({}, r, { value: void 0 })),
									W("invalid", e);
								break;
							case "textarea":
								lu(e, r), (a = ai(e, r)), W("invalid", e);
								break;
							default:
								a = r;
						}
						ii(n, a), (o = a);
						for (l in o)
							if (o.hasOwnProperty(l)) {
								var s = o[l];
								l === "style"
									? du(e, s)
									: l === "dangerouslySetInnerHTML"
									? ((s = s ? s.__html : void 0),
									  s != null && uu(e, s))
									: l === "children"
									? typeof s == "string"
										? (n !== "textarea" || s !== "") && Jn(e, s)
										: typeof s == "number" && Jn(e, "" + s)
									: l !== "suppressContentEditableWarning" &&
									  l !== "suppressHydrationWarning" &&
									  l !== "autoFocus" &&
									  (Xn.hasOwnProperty(l)
											? s != null && l === "onScroll" && W("scroll", e)
											: s != null && Ul(e, l, s, i));
							}
						switch (n) {
							case "input":
								Jr(e), au(e, r, !1);
								break;
							case "textarea":
								Jr(e), ou(e);
								break;
							case "option":
								r.value != null &&
									e.setAttribute("value", "" + bt(r.value));
								break;
							case "select":
								(e.multiple = !!r.multiple),
									(l = r.value),
									l != null
										? vn(e, !!r.multiple, l, !1)
										: r.defaultValue != null &&
										  vn(e, !!r.multiple, r.defaultValue, !0);
								break;
							default:
								typeof a.onClick == "function" && (e.onclick = ka);
						}
						switch (n) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break e;
							case "img":
								r = !0;
								break e;
							default:
								r = !1;
						}
					}
					r && (t.flags |= 4);
				}
				t.ref !== null &&
					((t.flags |= 512), (t.flags |= 2097152));
			}
			return he(t), null;
		case 6:
			if (e && t.stateNode != null)
				xd(e, t, e.memoizedProps, r);
			else {
				if (typeof r != "string" && t.stateNode === null)
					throw Error(_(166));
				if (((n = Kt(Tr.current)), Kt(et.current), La(t))) {
					if (
						((r = t.stateNode),
						(n = t.memoizedProps),
						(r[Je] = t),
						(l = r.nodeValue !== n) && ((e = Le), e !== null))
					)
						switch (e.tag) {
							case 3:
								xa(r.nodeValue, n, (e.mode & 1) !== 0);
								break;
							case 5:
								e.memoizedProps.suppressHydrationWarning !== !0 &&
									xa(r.nodeValue, n, (e.mode & 1) !== 0);
						}
					l && (t.flags |= 4);
				} else
					(r = (
						n.nodeType === 9 ? n : n.ownerDocument
					).createTextNode(r)),
						(r[Je] = t),
						(t.stateNode = r);
			}
			return he(t), null;
		case 13:
			if (
				(G(Y),
				(r = t.memoizedState),
				e === null ||
					(e.memoizedState !== null &&
						e.memoizedState.dehydrated !== null))
			) {
				if (q && ze !== null && t.mode & 1 && !(t.flags & 128))
					Cc(), Mn(), (t.flags |= 98560), (l = !1);
				else if (
					((l = La(t)), r !== null && r.dehydrated !== null)
				) {
					if (e === null) {
						if (!l) throw Error(_(318));
						if (
							((l = t.memoizedState),
							(l = l !== null ? l.dehydrated : null),
							!l)
						)
							throw Error(_(317));
						l[Je] = t;
					} else
						Mn(),
							!(t.flags & 128) && (t.memoizedState = null),
							(t.flags |= 4);
					he(t), (l = !1);
				} else Ge !== null && (Ao(Ge), (Ge = null)), (l = !0);
				if (!l) return t.flags & 65536 ? t : null;
			}
			return t.flags & 128
				? ((t.lanes = n), t)
				: ((r = r !== null),
				  r !== (e !== null && e.memoizedState !== null) &&
						r &&
						((t.child.flags |= 8192),
						t.mode & 1 &&
							(e === null || Y.current & 1
								? re === 0 && (re = 3)
								: $o())),
				  t.updateQueue !== null && (t.flags |= 4),
				  he(t),
				  null);
		case 4:
			return (
				Rn(),
				_o(e, t),
				e === null && br(t.stateNode.containerInfo),
				he(t),
				null
			);
		case 10:
			return eo(t.type._context), he(t), null;
		case 17:
			return xe(t.type) && Ca(), he(t), null;
		case 19:
			if ((G(Y), (l = t.memoizedState), l === null))
				return he(t), null;
			if (
				((r = (t.flags & 128) !== 0),
				(i = l.rendering),
				i === null)
			)
				if (r) zr(l, !1);
				else {
					if (re !== 0 || (e !== null && e.flags & 128))
						for (e = t.child; e !== null; ) {
							if (((i = Ra(e)), i !== null)) {
								for (
									t.flags |= 128,
										zr(l, !1),
										r = i.updateQueue,
										r !== null &&
											((t.updateQueue = r), (t.flags |= 4)),
										t.subtreeFlags = 0,
										r = n,
										n = t.child;
									n !== null;

								)
									(l = n),
										(e = r),
										(l.flags &= 14680066),
										(i = l.alternate),
										i === null
											? ((l.childLanes = 0),
											  (l.lanes = e),
											  (l.child = null),
											  (l.subtreeFlags = 0),
											  (l.memoizedProps = null),
											  (l.memoizedState = null),
											  (l.updateQueue = null),
											  (l.dependencies = null),
											  (l.stateNode = null))
											: ((l.childLanes = i.childLanes),
											  (l.lanes = i.lanes),
											  (l.child = i.child),
											  (l.subtreeFlags = 0),
											  (l.deletions = null),
											  (l.memoizedProps = i.memoizedProps),
											  (l.memoizedState = i.memoizedState),
											  (l.updateQueue = i.updateQueue),
											  (l.type = i.type),
											  (e = i.dependencies),
											  (l.dependencies =
													e === null
														? null
														: {
																lanes: e.lanes,
																firstContext: e.firstContext,
														  })),
										(n = n.sibling);
								return U(Y, (Y.current & 1) | 2), t.child;
							}
							e = e.sibling;
						}
					l.tail !== null &&
						J() > $n &&
						((t.flags |= 128),
						(r = !0),
						zr(l, !1),
						(t.lanes = 4194304));
				}
			else {
				if (!r)
					if (((e = Ra(i)), e !== null)) {
						if (
							((t.flags |= 128),
							(r = !0),
							(n = e.updateQueue),
							n !== null && ((t.updateQueue = n), (t.flags |= 4)),
							zr(l, !0),
							l.tail === null &&
								l.tailMode === "hidden" &&
								!i.alternate &&
								!q)
						)
							return he(t), null;
					} else
						2 * J() - l.renderingStartTime > $n &&
							n !== 1073741824 &&
							((t.flags |= 128),
							(r = !0),
							zr(l, !1),
							(t.lanes = 4194304));
				l.isBackwards
					? ((i.sibling = t.child), (t.child = i))
					: ((n = l.last),
					  n !== null ? (n.sibling = i) : (t.child = i),
					  (l.last = i));
			}
			return l.tail !== null
				? ((t = l.tail),
				  (l.rendering = t),
				  (l.tail = t.sibling),
				  (l.renderingStartTime = J()),
				  (t.sibling = null),
				  (n = Y.current),
				  U(Y, r ? (n & 1) | 2 : n & 1),
				  t)
				: (he(t), null);
		case 22:
		case 23:
			return (
				Fo(),
				(r = t.memoizedState !== null),
				e !== null &&
					(e.memoizedState !== null) !== r &&
					(t.flags |= 8192),
				r && t.mode & 1
					? Me & 1073741824 &&
					  (he(t), t.subtreeFlags & 6 && (t.flags |= 8192))
					: he(t),
				null
			);
		case 24:
			return null;
		case 25:
			return null;
	}
	throw Error(_(156, t.tag));
}
function Rm(e, t) {
	switch ((Qi(t), t.tag)) {
		case 1:
			return (
				xe(t.type) && Ca(),
				(e = t.flags),
				e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
			);
		case 3:
			return (
				Rn(),
				G(Se),
				G(fe),
				oo(),
				(e = t.flags),
				e & 65536 && !(e & 128)
					? ((t.flags = (e & -65537) | 128), t)
					: null
			);
		case 5:
			return lo(t), null;
		case 13:
			if (
				(G(Y),
				(e = t.memoizedState),
				e !== null && e.dehydrated !== null)
			) {
				if (t.alternate === null) throw Error(_(340));
				Mn();
			}
			return (
				(e = t.flags),
				e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
			);
		case 19:
			return G(Y), null;
		case 4:
			return Rn(), null;
		case 10:
			return eo(t.type._context), null;
		case 22:
		case 23:
			return Fo(), null;
		case 24:
			return null;
		default:
			return null;
	}
}
var Wa = !1,
	me = !1,
	Am = typeof WeakSet == "function" ? WeakSet : Set,
	N = null;
function Dn(e, t) {
	var n = e.ref;
	if (n !== null)
		if (typeof n == "function")
			try {
				n(null);
			} catch (r) {
				Z(e, t, r);
			}
		else n.current = null;
}
function kd(e, t, n) {
	try {
		n();
	} catch (r) {
		Z(e, t, r);
	}
}
var Ed = !1;
function Dm(e, t) {
	if (((Fi = da), (e = tc()), zi(e))) {
		if ("selectionStart" in e)
			var n = { start: e.selectionStart, end: e.selectionEnd };
		else
			e: {
				n = ((n = e.ownerDocument) && n.defaultView) || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset,
						l = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, l.nodeType;
					} catch {
						n = null;
						break e;
					}
					var i = 0,
						o = -1,
						s = -1,
						c = 0,
						d = 0,
						f = e,
						m = null;
					t: for (;;) {
						for (
							var v;
							f !== n ||
								(a !== 0 && f.nodeType !== 3) ||
								(o = i + a),
								f !== l ||
									(r !== 0 && f.nodeType !== 3) ||
									(s = i + r),
								f.nodeType === 3 && (i += f.nodeValue.length),
								(v = f.firstChild) !== null;

						)
							(m = f), (f = v);
						for (;;) {
							if (f === e) break t;
							if (
								(m === n && ++c === a && (o = i),
								m === l && ++d === r && (s = i),
								(v = f.nextSibling) !== null)
							)
								break;
							(f = m), (m = f.parentNode);
						}
						f = v;
					}
					n = o === -1 || s === -1 ? null : { start: o, end: s };
				} else n = null;
			}
		n = n || { start: 0, end: 0 };
	} else n = null;
	for (
		$i = { focusedElem: e, selectionRange: n },
			da = !1,
			N = t;
		N !== null;

	)
		if (
			((t = N),
			(e = t.child),
			(t.subtreeFlags & 1028) !== 0 && e !== null)
		)
			(e.return = t), (N = e);
		else
			for (; N !== null; ) {
				t = N;
				try {
					var g = t.alternate;
					if (t.flags & 1024)
						switch (t.tag) {
							case 0:
							case 11:
							case 15:
								break;
							case 1:
								if (g !== null) {
									var b = g.memoizedProps,
										w = g.memoizedState,
										h = t.stateNode,
										u = h.getSnapshotBeforeUpdate(
											t.elementType === t.type ? b : qe(t.type, b),
											w
										);
									h.__reactInternalSnapshotBeforeUpdate = u;
								}
								break;
							case 3:
								var p = t.stateNode.containerInfo;
								p.nodeType === 1
									? (p.textContent = "")
									: p.nodeType === 9 &&
									  p.documentElement &&
									  p.removeChild(p.documentElement);
								break;
							case 5:
							case 6:
							case 4:
							case 17:
								break;
							default:
								throw Error(_(163));
						}
				} catch (y) {
					Z(t, t.return, y);
				}
				if (((e = t.sibling), e !== null)) {
					(e.return = t.return), (N = e);
					break;
				}
				N = t.return;
			}
	return (g = Ed), (Ed = !1), g;
}
function Mr(e, t, n) {
	var r = t.updateQueue;
	if (((r = r !== null ? r.lastEffect : null), r !== null)) {
		var a = (r = r.next);
		do {
			if ((a.tag & e) === e) {
				var l = a.destroy;
				(a.destroy = void 0), l !== void 0 && kd(t, n, l);
			}
			a = a.next;
		} while (a !== r);
	}
}
function Ga(e, t) {
	if (
		((t = t.updateQueue),
		(t = t !== null ? t.lastEffect : null),
		t !== null)
	) {
		var n = (t = t.next);
		do {
			if ((n.tag & e) === e) {
				var r = n.create;
				n.destroy = r();
			}
			n = n.next;
		} while (n !== t);
	}
}
function Po(e) {
	var t = e.ref;
	if (t !== null) {
		var n = e.stateNode;
		switch (e.tag) {
			case 5:
				e = n;
				break;
			default:
				e = n;
		}
		typeof t == "function" ? t(e) : (t.current = e);
	}
}
function Cd(e) {
	var t = e.alternate;
	t !== null && ((e.alternate = null), Cd(t)),
		(e.child = null),
		(e.deletions = null),
		(e.sibling = null),
		e.tag === 5 &&
			((t = e.stateNode),
			t !== null &&
				(delete t[Je],
				delete t[Sr],
				delete t[Ui],
				delete t[wm],
				delete t[Sm])),
		(e.stateNode = null),
		(e.return = null),
		(e.dependencies = null),
		(e.memoizedProps = null),
		(e.memoizedState = null),
		(e.pendingProps = null),
		(e.stateNode = null),
		(e.updateQueue = null);
}
function Td(e) {
	return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function _d(e) {
	e: for (;;) {
		for (; e.sibling === null; ) {
			if (e.return === null || Td(e.return)) return null;
			e = e.return;
		}
		for (
			e.sibling.return = e.return, e = e.sibling;
			e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

		) {
			if (e.flags & 2 || e.child === null || e.tag === 4)
				continue e;
			(e.child.return = e), (e = e.child);
		}
		if (!(e.flags & 2)) return e.stateNode;
	}
}
function Oo(e, t, n) {
	var r = e.tag;
	if (r === 5 || r === 6)
		(e = e.stateNode),
			t
				? n.nodeType === 8
					? n.parentNode.insertBefore(e, t)
					: n.insertBefore(e, t)
				: (n.nodeType === 8
						? ((t = n.parentNode), t.insertBefore(e, n))
						: ((t = n), t.appendChild(e)),
				  (n = n._reactRootContainer),
				  n != null || t.onclick !== null || (t.onclick = ka));
	else if (r !== 4 && ((e = e.child), e !== null))
		for (Oo(e, t, n), e = e.sibling; e !== null; )
			Oo(e, t, n), (e = e.sibling);
}
function Lo(e, t, n) {
	var r = e.tag;
	if (r === 5 || r === 6)
		(e = e.stateNode),
			t ? n.insertBefore(e, t) : n.appendChild(e);
	else if (r !== 4 && ((e = e.child), e !== null))
		for (Lo(e, t, n), e = e.sibling; e !== null; )
			Lo(e, t, n), (e = e.sibling);
}
var ue = null,
	Qe = !1;
function Mt(e, t, n) {
	for (n = n.child; n !== null; )
		Pd(e, t, n), (n = n.sibling);
}
function Pd(e, t, n) {
	if (Ze && typeof Ze.onCommitFiberUnmount == "function")
		try {
			Ze.onCommitFiberUnmount(la, n);
		} catch {}
	switch (n.tag) {
		case 5:
			me || Dn(n, t);
		case 6:
			var r = ue,
				a = Qe;
			(ue = null),
				Mt(e, t, n),
				(ue = r),
				(Qe = a),
				ue !== null &&
					(Qe
						? ((e = ue),
						  (n = n.stateNode),
						  e.nodeType === 8
								? e.parentNode.removeChild(n)
								: e.removeChild(n))
						: ue.removeChild(n.stateNode));
			break;
		case 18:
			ue !== null &&
				(Qe
					? ((e = ue),
					  (n = n.stateNode),
					  e.nodeType === 8
							? Hi(e.parentNode, n)
							: e.nodeType === 1 && Hi(e, n),
					  cr(e))
					: Hi(ue, n.stateNode));
			break;
		case 4:
			(r = ue),
				(a = Qe),
				(ue = n.stateNode.containerInfo),
				(Qe = !0),
				Mt(e, t, n),
				(ue = r),
				(Qe = a);
			break;
		case 0:
		case 11:
		case 14:
		case 15:
			if (
				!me &&
				((r = n.updateQueue),
				r !== null && ((r = r.lastEffect), r !== null))
			) {
				a = r = r.next;
				do {
					var l = a,
						i = l.destroy;
					(l = l.tag),
						i !== void 0 && (l & 2 || l & 4) && kd(n, t, i),
						(a = a.next);
				} while (a !== r);
			}
			Mt(e, t, n);
			break;
		case 1:
			if (
				!me &&
				(Dn(n, t),
				(r = n.stateNode),
				typeof r.componentWillUnmount == "function")
			)
				try {
					(r.props = n.memoizedProps),
						(r.state = n.memoizedState),
						r.componentWillUnmount();
				} catch (o) {
					Z(n, t, o);
				}
			Mt(e, t, n);
			break;
		case 21:
			Mt(e, t, n);
			break;
		case 22:
			n.mode & 1
				? ((me = (r = me) || n.memoizedState !== null),
				  Mt(e, t, n),
				  (me = r))
				: Mt(e, t, n);
			break;
		default:
			Mt(e, t, n);
	}
}
function Od(e) {
	var t = e.updateQueue;
	if (t !== null) {
		e.updateQueue = null;
		var n = e.stateNode;
		n === null && (n = e.stateNode = new Am()),
			t.forEach(function (r) {
				var a = qm.bind(null, e, r);
				n.has(r) || (n.add(r), r.then(a, a));
			});
	}
}
function Xe(e, t) {
	var n = t.deletions;
	if (n !== null)
		for (var r = 0; r < n.length; r++) {
			var a = n[r];
			try {
				var l = e,
					i = t,
					o = i;
				e: for (; o !== null; ) {
					switch (o.tag) {
						case 5:
							(ue = o.stateNode), (Qe = !1);
							break e;
						case 3:
							(ue = o.stateNode.containerInfo), (Qe = !0);
							break e;
						case 4:
							(ue = o.stateNode.containerInfo), (Qe = !0);
							break e;
					}
					o = o.return;
				}
				if (ue === null) throw Error(_(160));
				Pd(l, i, a), (ue = null), (Qe = !1);
				var s = a.alternate;
				s !== null && (s.return = null), (a.return = null);
			} catch (c) {
				Z(a, t, c);
			}
		}
	if (t.subtreeFlags & 12854)
		for (t = t.child; t !== null; ) Ld(t, e), (t = t.sibling);
}
function Ld(e, t) {
	var n = e.alternate,
		r = e.flags;
	switch (e.tag) {
		case 0:
		case 11:
		case 14:
		case 15:
			if ((Xe(t, e), nt(e), r & 4)) {
				try {
					Mr(3, e, e.return), Ga(3, e);
				} catch (b) {
					Z(e, e.return, b);
				}
				try {
					Mr(5, e, e.return);
				} catch (b) {
					Z(e, e.return, b);
				}
			}
			break;
		case 1:
			Xe(t, e),
				nt(e),
				r & 512 && n !== null && Dn(n, n.return);
			break;
		case 5:
			if (
				(Xe(t, e),
				nt(e),
				r & 512 && n !== null && Dn(n, n.return),
				e.flags & 32)
			) {
				var a = e.stateNode;
				try {
					Jn(a, "");
				} catch (b) {
					Z(e, e.return, b);
				}
			}
			if (r & 4 && ((a = e.stateNode), a != null)) {
				var l = e.memoizedProps,
					i = n !== null ? n.memoizedProps : l,
					o = e.type,
					s = e.updateQueue;
				if (((e.updateQueue = null), s !== null))
					try {
						o === "input" &&
							l.type === "radio" &&
							l.name != null &&
							ru(a, l),
							oi(o, i);
						var c = oi(o, l);
						for (i = 0; i < s.length; i += 2) {
							var d = s[i],
								f = s[i + 1];
							d === "style"
								? du(a, f)
								: d === "dangerouslySetInnerHTML"
								? uu(a, f)
								: d === "children"
								? Jn(a, f)
								: Ul(a, d, f, c);
						}
						switch (o) {
							case "input":
								ni(a, l);
								break;
							case "textarea":
								iu(a, l);
								break;
							case "select":
								var m = a._wrapperState.wasMultiple;
								a._wrapperState.wasMultiple = !!l.multiple;
								var v = l.value;
								v != null
									? vn(a, !!l.multiple, v, !1)
									: m !== !!l.multiple &&
									  (l.defaultValue != null
											? vn(a, !!l.multiple, l.defaultValue, !0)
											: vn(a, !!l.multiple, l.multiple ? [] : "", !1));
						}
						a[Sr] = l;
					} catch (b) {
						Z(e, e.return, b);
					}
			}
			break;
		case 6:
			if ((Xe(t, e), nt(e), r & 4)) {
				if (e.stateNode === null) throw Error(_(162));
				(a = e.stateNode), (l = e.memoizedProps);
				try {
					a.nodeValue = l;
				} catch (b) {
					Z(e, e.return, b);
				}
			}
			break;
		case 3:
			if (
				(Xe(t, e),
				nt(e),
				r & 4 && n !== null && n.memoizedState.isDehydrated)
			)
				try {
					cr(t.containerInfo);
				} catch (b) {
					Z(e, e.return, b);
				}
			break;
		case 4:
			Xe(t, e), nt(e);
			break;
		case 13:
			Xe(t, e),
				nt(e),
				(a = e.child),
				a.flags & 8192 &&
					((l = a.memoizedState !== null),
					(a.stateNode.isHidden = l),
					!l ||
						(a.alternate !== null &&
							a.alternate.memoizedState !== null) ||
						(No = J())),
				r & 4 && Od(e);
			break;
		case 22:
			if (
				((d = n !== null && n.memoizedState !== null),
				e.mode & 1
					? ((me = (c = me) || d), Xe(t, e), (me = c))
					: Xe(t, e),
				nt(e),
				r & 8192)
			) {
				if (
					((c = e.memoizedState !== null),
					(e.stateNode.isHidden = c) && !d && e.mode & 1)
				)
					for (N = e, d = e.child; d !== null; ) {
						for (f = N = d; N !== null; ) {
							switch (((m = N), (v = m.child), m.tag)) {
								case 0:
								case 11:
								case 14:
								case 15:
									Mr(4, m, m.return);
									break;
								case 1:
									Dn(m, m.return);
									var g = m.stateNode;
									if (typeof g.componentWillUnmount == "function") {
										(r = m), (n = m.return);
										try {
											(t = r),
												(g.props = t.memoizedProps),
												(g.state = t.memoizedState),
												g.componentWillUnmount();
										} catch (b) {
											Z(r, n, b);
										}
									}
									break;
								case 5:
									Dn(m, m.return);
									break;
								case 22:
									if (m.memoizedState !== null) {
										Nd(f);
										continue;
									}
							}
							v !== null ? ((v.return = m), (N = v)) : Nd(f);
						}
						d = d.sibling;
					}
				e: for (d = null, f = e; ; ) {
					if (f.tag === 5) {
						if (d === null) {
							d = f;
							try {
								(a = f.stateNode),
									c
										? ((l = a.style),
										  typeof l.setProperty == "function"
												? l.setProperty("display", "none", "important")
												: (l.display = "none"))
										: ((o = f.stateNode),
										  (s = f.memoizedProps.style),
										  (i =
												s != null && s.hasOwnProperty("display")
													? s.display
													: null),
										  (o.style.display = cu("display", i)));
							} catch (b) {
								Z(e, e.return, b);
							}
						}
					} else if (f.tag === 6) {
						if (d === null)
							try {
								f.stateNode.nodeValue = c ? "" : f.memoizedProps;
							} catch (b) {
								Z(e, e.return, b);
							}
					} else if (
						((f.tag !== 22 && f.tag !== 23) ||
							f.memoizedState === null ||
							f === e) &&
						f.child !== null
					) {
						(f.child.return = f), (f = f.child);
						continue;
					}
					if (f === e) break e;
					for (; f.sibling === null; ) {
						if (f.return === null || f.return === e) break e;
						d === f && (d = null), (f = f.return);
					}
					d === f && (d = null),
						(f.sibling.return = f.return),
						(f = f.sibling);
				}
			}
			break;
		case 19:
			Xe(t, e), nt(e), r & 4 && Od(e);
			break;
		case 21:
			break;
		default:
			Xe(t, e), nt(e);
	}
}
function nt(e) {
	var t = e.flags;
	if (t & 2) {
		try {
			e: {
				for (var n = e.return; n !== null; ) {
					if (Td(n)) {
						var r = n;
						break e;
					}
					n = n.return;
				}
				throw Error(_(160));
			}
			switch (r.tag) {
				case 5:
					var a = r.stateNode;
					r.flags & 32 && (Jn(a, ""), (r.flags &= -33));
					var l = _d(e);
					Lo(e, l, a);
					break;
				case 3:
				case 4:
					var i = r.stateNode.containerInfo,
						o = _d(e);
					Oo(e, o, i);
					break;
				default:
					throw Error(_(161));
			}
		} catch (s) {
			Z(e, e.return, s);
		}
		e.flags &= -3;
	}
	t & 4096 && (e.flags &= -4097);
}
function Fm(e, t, n) {
	(N = e), zd(e);
}
function zd(e, t, n) {
	for (var r = (e.mode & 1) !== 0; N !== null; ) {
		var a = N,
			l = a.child;
		if (a.tag === 22 && r) {
			var i = a.memoizedState !== null || Wa;
			if (!i) {
				var o = a.alternate,
					s = (o !== null && o.memoizedState !== null) || me;
				o = Wa;
				var c = me;
				if (((Wa = i), (me = s) && !c))
					for (N = a; N !== null; )
						(i = N),
							(s = i.child),
							i.tag === 22 && i.memoizedState !== null
								? Id(a)
								: s !== null
								? ((s.return = i), (N = s))
								: Id(a);
				for (; l !== null; ) (N = l), zd(l), (l = l.sibling);
				(N = a), (Wa = o), (me = c);
			}
			Md(e);
		} else
			a.subtreeFlags & 8772 && l !== null
				? ((l.return = a), (N = l))
				: Md(e);
	}
}
function Md(e) {
	for (; N !== null; ) {
		var t = N;
		if (t.flags & 8772) {
			var n = t.alternate;
			try {
				if (t.flags & 8772)
					switch (t.tag) {
						case 0:
						case 11:
						case 15:
							me || Ga(5, t);
							break;
						case 1:
							var r = t.stateNode;
							if (t.flags & 4 && !me)
								if (n === null) r.componentDidMount();
								else {
									var a =
										t.elementType === t.type
											? n.memoizedProps
											: qe(t.type, n.memoizedProps);
									r.componentDidUpdate(
										a,
										n.memoizedState,
										r.__reactInternalSnapshotBeforeUpdate
									);
								}
							var l = t.updateQueue;
							l !== null && Mc(t, l, r);
							break;
						case 3:
							var i = t.updateQueue;
							if (i !== null) {
								if (((n = null), t.child !== null))
									switch (t.child.tag) {
										case 5:
											n = t.child.stateNode;
											break;
										case 1:
											n = t.child.stateNode;
									}
								Mc(t, i, n);
							}
							break;
						case 5:
							var o = t.stateNode;
							if (n === null && t.flags & 4) {
								n = o;
								var s = t.memoizedProps;
								switch (t.type) {
									case "button":
									case "input":
									case "select":
									case "textarea":
										s.autoFocus && n.focus();
										break;
									case "img":
										s.src && (n.src = s.src);
								}
							}
							break;
						case 6:
							break;
						case 4:
							break;
						case 12:
							break;
						case 13:
							if (t.memoizedState === null) {
								var c = t.alternate;
								if (c !== null) {
									var d = c.memoizedState;
									if (d !== null) {
										var f = d.dehydrated;
										f !== null && cr(f);
									}
								}
							}
							break;
						case 19:
						case 17:
						case 21:
						case 22:
						case 23:
						case 25:
							break;
						default:
							throw Error(_(163));
					}
				me || (t.flags & 512 && Po(t));
			} catch (m) {
				Z(t, t.return, m);
			}
		}
		if (t === e) {
			N = null;
			break;
		}
		if (((n = t.sibling), n !== null)) {
			(n.return = t.return), (N = n);
			break;
		}
		N = t.return;
	}
}
function Nd(e) {
	for (; N !== null; ) {
		var t = N;
		if (t === e) {
			N = null;
			break;
		}
		var n = t.sibling;
		if (n !== null) {
			(n.return = t.return), (N = n);
			break;
		}
		N = t.return;
	}
}
function Id(e) {
	for (; N !== null; ) {
		var t = N;
		try {
			switch (t.tag) {
				case 0:
				case 11:
				case 15:
					var n = t.return;
					try {
						Ga(4, t);
					} catch (s) {
						Z(t, n, s);
					}
					break;
				case 1:
					var r = t.stateNode;
					if (typeof r.componentDidMount == "function") {
						var a = t.return;
						try {
							r.componentDidMount();
						} catch (s) {
							Z(t, a, s);
						}
					}
					var l = t.return;
					try {
						Po(t);
					} catch (s) {
						Z(t, l, s);
					}
					break;
				case 5:
					var i = t.return;
					try {
						Po(t);
					} catch (s) {
						Z(t, i, s);
					}
			}
		} catch (s) {
			Z(t, t.return, s);
		}
		if (t === e) {
			N = null;
			break;
		}
		var o = t.sibling;
		if (o !== null) {
			(o.return = t.return), (N = o);
			break;
		}
		N = t.return;
	}
}
var $m = Math.ceil,
	qa = ot.ReactCurrentDispatcher,
	zo = ot.ReactCurrentOwner,
	Ve = ot.ReactCurrentBatchConfig,
	F = 0,
	ie = null,
	te = null,
	ce = 0,
	Me = 0,
	Fn = _t(0),
	re = 0,
	Nr = null,
	Jt = 0,
	Qa = 0,
	Mo = 0,
	Ir = null,
	Ee = null,
	No = 0,
	$n = 1 / 0,
	mt = null,
	Xa = !1,
	Io = null,
	Nt = null,
	Ya = !1,
	It = null,
	Ka = 0,
	jr = 0,
	jo = null,
	Za = -1,
	Ja = 0;
function be() {
	return F & 6 ? J() : Za !== -1 ? Za : (Za = J());
}
function jt(e) {
	return e.mode & 1
		? F & 2 && ce !== 0
			? ce & -ce
			: km.transition !== null
			? (Ja === 0 && (Ja = Tu()), Ja)
			: ((e = V),
			  e !== 0 ||
					((e = window.event),
					(e = e === void 0 ? 16 : ju(e.type))),
			  e)
		: 1;
}
function Ye(e, t, n, r) {
	if (50 < jr) throw ((jr = 0), (jo = null), Error(_(185)));
	lr(e, n, r),
		(!(F & 2) || e !== ie) &&
			(e === ie &&
				(!(F & 2) && (Qa |= n), re === 4 && Rt(e, ce)),
			Ce(e, r),
			n === 1 &&
				F === 0 &&
				!(t.mode & 1) &&
				(($n = J() + 500), _a && Ot()));
}
function Ce(e, t) {
	var n = e.callbackNode;
	kh(e, t);
	var r = sa(e, e === ie ? ce : 0);
	if (r === 0)
		n !== null && ku(n),
			(e.callbackNode = null),
			(e.callbackPriority = 0);
	else if (((t = r & -r), e.callbackPriority !== t)) {
		if ((n != null && ku(n), t === 1))
			e.tag === 0
				? xm(Rd.bind(null, e))
				: wc(Rd.bind(null, e)),
				ym(function () {
					!(F & 6) && Ot();
				}),
				(n = null);
		else {
			switch (_u(r)) {
				case 1:
					n = hi;
					break;
				case 4:
					n = Eu;
					break;
				case 16:
					n = aa;
					break;
				case 536870912:
					n = Cu;
					break;
				default:
					n = aa;
			}
			n = Ud(n, jd.bind(null, e));
		}
		(e.callbackPriority = t), (e.callbackNode = n);
	}
}
function jd(e, t) {
	if (((Za = -1), (Ja = 0), F & 6)) throw Error(_(327));
	var n = e.callbackNode;
	if (Bn() && e.callbackNode !== n) return null;
	var r = sa(e, e === ie ? ce : 0);
	if (r === 0) return null;
	if (r & 30 || r & e.expiredLanes || t) t = el(e, r);
	else {
		t = r;
		var a = F;
		F |= 2;
		var l = Dd();
		(ie !== e || ce !== t) &&
			((mt = null), ($n = J() + 500), tn(e, t));
		do
			try {
				Hm();
				break;
			} catch (o) {
				Ad(e, o);
			}
		while (!0);
		Ji(),
			(qa.current = l),
			(F = a),
			te !== null
				? (t = 0)
				: ((ie = null), (ce = 0), (t = re));
	}
	if (t !== 0) {
		if (
			(t === 2 &&
				((a = mi(e)), a !== 0 && ((r = a), (t = Ro(e, a)))),
			t === 1)
		)
			throw ((n = Nr), tn(e, 0), Rt(e, r), Ce(e, J()), n);
		if (t === 6) Rt(e, r);
		else {
			if (
				((a = e.current.alternate),
				!(r & 30) &&
					!Bm(a) &&
					((t = el(e, r)),
					t === 2 &&
						((l = mi(e)), l !== 0 && ((r = l), (t = Ro(e, l)))),
					t === 1))
			)
				throw ((n = Nr), tn(e, 0), Rt(e, r), Ce(e, J()), n);
			switch (
				((e.finishedWork = a), (e.finishedLanes = r), t)
			) {
				case 0:
				case 1:
					throw Error(_(345));
				case 2:
					nn(e, Ee, mt);
					break;
				case 3:
					if (
						(Rt(e, r),
						(r & 130023424) === r &&
							((t = No + 500 - J()), 10 < t))
					) {
						if (sa(e, 0) !== 0) break;
						if (((a = e.suspendedLanes), (a & r) !== r)) {
							be(), (e.pingedLanes |= e.suspendedLanes & a);
							break;
						}
						e.timeoutHandle = Vi(nn.bind(null, e, Ee, mt), t);
						break;
					}
					nn(e, Ee, mt);
					break;
				case 4:
					if ((Rt(e, r), (r & 4194240) === r)) break;
					for (t = e.eventTimes, a = -1; 0 < r; ) {
						var i = 31 - Ue(r);
						(l = 1 << i), (i = t[i]), i > a && (a = i), (r &= ~l);
					}
					if (
						((r = a),
						(r = J() - r),
						(r =
							(120 > r
								? 120
								: 480 > r
								? 480
								: 1080 > r
								? 1080
								: 1920 > r
								? 1920
								: 3e3 > r
								? 3e3
								: 4320 > r
								? 4320
								: 1960 * $m(r / 1960)) - r),
						10 < r)
					) {
						e.timeoutHandle = Vi(nn.bind(null, e, Ee, mt), r);
						break;
					}
					nn(e, Ee, mt);
					break;
				case 5:
					nn(e, Ee, mt);
					break;
				default:
					throw Error(_(329));
			}
		}
	}
	return (
		Ce(e, J()), e.callbackNode === n ? jd.bind(null, e) : null
	);
}
function Ro(e, t) {
	var n = Ir;
	return (
		e.current.memoizedState.isDehydrated &&
			(tn(e, t).flags |= 256),
		(e = el(e, t)),
		e !== 2 && ((t = Ee), (Ee = n), t !== null && Ao(t)),
		e
	);
}
function Ao(e) {
	Ee === null ? (Ee = e) : Ee.push.apply(Ee, e);
}
function Bm(e) {
	for (var t = e; ; ) {
		if (t.flags & 16384) {
			var n = t.updateQueue;
			if (n !== null && ((n = n.stores), n !== null))
				for (var r = 0; r < n.length; r++) {
					var a = n[r],
						l = a.getSnapshot;
					a = a.value;
					try {
						if (!We(l(), a)) return !1;
					} catch {
						return !1;
					}
				}
		}
		if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
			(n.return = t), (t = n);
		else {
			if (t === e) break;
			for (; t.sibling === null; ) {
				if (t.return === null || t.return === e) return !0;
				t = t.return;
			}
			(t.sibling.return = t.return), (t = t.sibling);
		}
	}
	return !0;
}
function Rt(e, t) {
	for (
		t &= ~Mo,
			t &= ~Qa,
			e.suspendedLanes |= t,
			e.pingedLanes &= ~t,
			e = e.expirationTimes;
		0 < t;

	) {
		var n = 31 - Ue(t),
			r = 1 << n;
		(e[n] = -1), (t &= ~r);
	}
}
function Rd(e) {
	if (F & 6) throw Error(_(327));
	Bn();
	var t = sa(e, 0);
	if (!(t & 1)) return Ce(e, J()), null;
	var n = el(e, t);
	if (e.tag !== 0 && n === 2) {
		var r = mi(e);
		r !== 0 && ((t = r), (n = Ro(e, r)));
	}
	if (n === 1)
		throw ((n = Nr), tn(e, 0), Rt(e, t), Ce(e, J()), n);
	if (n === 6) throw Error(_(345));
	return (
		(e.finishedWork = e.current.alternate),
		(e.finishedLanes = t),
		nn(e, Ee, mt),
		Ce(e, J()),
		null
	);
}
function Do(e, t) {
	var n = F;
	F |= 1;
	try {
		return e(t);
	} finally {
		(F = n), F === 0 && (($n = J() + 500), _a && Ot());
	}
}
function en(e) {
	It !== null && It.tag === 0 && !(F & 6) && Bn();
	var t = F;
	F |= 1;
	var n = Ve.transition,
		r = V;
	try {
		if (((Ve.transition = null), (V = 1), e)) return e();
	} finally {
		(V = r), (Ve.transition = n), (F = t), !(F & 6) && Ot();
	}
}
function Fo() {
	(Me = Fn.current), G(Fn);
}
function tn(e, t) {
	(e.finishedWork = null), (e.finishedLanes = 0);
	var n = e.timeoutHandle;
	if (
		(n !== -1 && ((e.timeoutHandle = -1), vm(n)), te !== null)
	)
		for (n = te.return; n !== null; ) {
			var r = n;
			switch ((Qi(r), r.tag)) {
				case 1:
					(r = r.type.childContextTypes), r != null && Ca();
					break;
				case 3:
					Rn(), G(Se), G(fe), oo();
					break;
				case 5:
					lo(r);
					break;
				case 4:
					Rn();
					break;
				case 13:
					G(Y);
					break;
				case 19:
					G(Y);
					break;
				case 10:
					eo(r.type._context);
					break;
				case 22:
				case 23:
					Fo();
			}
			n = n.return;
		}
	if (
		((ie = e),
		(te = e = At(e.current, null)),
		(ce = Me = t),
		(re = 0),
		(Nr = null),
		(Mo = Qa = Jt = 0),
		(Ee = Ir = null),
		Yt !== null)
	) {
		for (t = 0; t < Yt.length; t++)
			if (((n = Yt[t]), (r = n.interleaved), r !== null)) {
				n.interleaved = null;
				var a = r.next,
					l = n.pending;
				if (l !== null) {
					var i = l.next;
					(l.next = a), (r.next = i);
				}
				n.pending = r;
			}
		Yt = null;
	}
	return e;
}
function Ad(e, t) {
	do {
		var n = te;
		try {
			if ((Ji(), (Aa.current = Ba), Da)) {
				for (var r = K.memoizedState; r !== null; ) {
					var a = r.queue;
					a !== null && (a.pending = null), (r = r.next);
				}
				Da = !1;
			}
			if (
				((Zt = 0),
				(le = ne = K = null),
				(_r = !1),
				(Pr = 0),
				(zo.current = null),
				n === null || n.return === null)
			) {
				(re = 1), (Nr = t), (te = null);
				break;
			}
			e: {
				var l = e,
					i = n.return,
					o = n,
					s = t;
				if (
					((t = ce),
					(o.flags |= 32768),
					s !== null &&
						typeof s == "object" &&
						typeof s.then == "function")
				) {
					var c = s,
						d = o,
						f = d.tag;
					if (
						!(d.mode & 1) &&
						(f === 0 || f === 11 || f === 15)
					) {
						var m = d.alternate;
						m
							? ((d.updateQueue = m.updateQueue),
							  (d.memoizedState = m.memoizedState),
							  (d.lanes = m.lanes))
							: ((d.updateQueue = null), (d.memoizedState = null));
					}
					var v = od(i);
					if (v !== null) {
						(v.flags &= -257),
							sd(v, i, o, l, t),
							v.mode & 1 && id(l, c, t),
							(t = v),
							(s = c);
						var g = t.updateQueue;
						if (g === null) {
							var b = new Set();
							b.add(s), (t.updateQueue = b);
						} else g.add(s);
						break e;
					} else {
						if (!(t & 1)) {
							id(l, c, t), $o();
							break e;
						}
						s = Error(_(426));
					}
				} else if (q && o.mode & 1) {
					var w = od(i);
					if (w !== null) {
						!(w.flags & 65536) && (w.flags |= 256),
							sd(w, i, o, l, t),
							Ki(An(s, o));
						break e;
					}
				}
				(l = s = An(s, o)),
					re !== 4 && (re = 2),
					Ir === null ? (Ir = [l]) : Ir.push(l),
					(l = i);
				do {
					switch (l.tag) {
						case 3:
							(l.flags |= 65536), (t &= -t), (l.lanes |= t);
							var h = ad(l, s, t);
							zc(l, h);
							break e;
						case 1:
							o = s;
							var u = l.type,
								p = l.stateNode;
							if (
								!(l.flags & 128) &&
								(typeof u.getDerivedStateFromError == "function" ||
									(p !== null &&
										typeof p.componentDidCatch == "function" &&
										(Nt === null || !Nt.has(p))))
							) {
								(l.flags |= 65536), (t &= -t), (l.lanes |= t);
								var y = ld(l, o, t);
								zc(l, y);
								break e;
							}
					}
					l = l.return;
				} while (l !== null);
			}
			$d(n);
		} catch (S) {
			(t = S), te === n && n !== null && (te = n = n.return);
			continue;
		}
		break;
	} while (!0);
}
function Dd() {
	var e = qa.current;
	return (qa.current = Ba), e === null ? Ba : e;
}
function $o() {
	(re === 0 || re === 3 || re === 2) && (re = 4),
		ie === null ||
			(!(Jt & 268435455) && !(Qa & 268435455)) ||
			Rt(ie, ce);
}
function el(e, t) {
	var n = F;
	F |= 2;
	var r = Dd();
	(ie !== e || ce !== t) && ((mt = null), tn(e, t));
	do
		try {
			Vm();
			break;
		} catch (a) {
			Ad(e, a);
		}
	while (!0);
	if ((Ji(), (F = n), (qa.current = r), te !== null))
		throw Error(_(261));
	return (ie = null), (ce = 0), re;
}
function Vm() {
	for (; te !== null; ) Fd(te);
}
function Hm() {
	for (; te !== null && !hh(); ) Fd(te);
}
function Fd(e) {
	var t = Hd(e.alternate, e, Me);
	(e.memoizedProps = e.pendingProps),
		t === null ? $d(e) : (te = t),
		(zo.current = null);
}
function $d(e) {
	var t = e;
	do {
		var n = t.alternate;
		if (((e = t.return), t.flags & 32768)) {
			if (((n = Rm(n, t)), n !== null)) {
				(n.flags &= 32767), (te = n);
				return;
			}
			if (e !== null)
				(e.flags |= 32768),
					(e.subtreeFlags = 0),
					(e.deletions = null);
			else {
				(re = 6), (te = null);
				return;
			}
		} else if (((n = jm(n, t, Me)), n !== null)) {
			te = n;
			return;
		}
		if (((t = t.sibling), t !== null)) {
			te = t;
			return;
		}
		te = t = e;
	} while (t !== null);
	re === 0 && (re = 5);
}
function nn(e, t, n) {
	var r = V,
		a = Ve.transition;
	try {
		(Ve.transition = null), (V = 1), Um(e, t, n, r);
	} finally {
		(Ve.transition = a), (V = r);
	}
	return null;
}
function Um(e, t, n, r) {
	do Bn();
	while (It !== null);
	if (F & 6) throw Error(_(327));
	n = e.finishedWork;
	var a = e.finishedLanes;
	if (n === null) return null;
	if (
		((e.finishedWork = null),
		(e.finishedLanes = 0),
		n === e.current)
	)
		throw Error(_(177));
	(e.callbackNode = null), (e.callbackPriority = 0);
	var l = n.lanes | n.childLanes;
	if (
		(Eh(e, l),
		e === ie && ((te = ie = null), (ce = 0)),
		(!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
			Ya ||
			((Ya = !0),
			Ud(aa, function () {
				return Bn(), null;
			})),
		(l = (n.flags & 15990) !== 0),
		n.subtreeFlags & 15990 || l)
	) {
		(l = Ve.transition), (Ve.transition = null);
		var i = V;
		V = 1;
		var o = F;
		(F |= 4),
			(zo.current = null),
			Dm(e, n),
			Ld(n, e),
			cm($i),
			(da = !!Fi),
			($i = Fi = null),
			(e.current = n),
			Fm(n),
			mh(),
			(F = o),
			(V = i),
			(Ve.transition = l);
	} else e.current = n;
	if (
		(Ya && ((Ya = !1), (It = e), (Ka = a)),
		(l = e.pendingLanes),
		l === 0 && (Nt = null),
		yh(n.stateNode),
		Ce(e, J()),
		t !== null)
	)
		for (r = e.onRecoverableError, n = 0; n < t.length; n++)
			(a = t[n]),
				r(a.value, {
					componentStack: a.stack,
					digest: a.digest,
				});
	if (Xa) throw ((Xa = !1), (e = Io), (Io = null), e);
	return (
		Ka & 1 && e.tag !== 0 && Bn(),
		(l = e.pendingLanes),
		l & 1
			? e === jo
				? jr++
				: ((jr = 0), (jo = e))
			: (jr = 0),
		Ot(),
		null
	);
}
function Bn() {
	if (It !== null) {
		var e = _u(Ka),
			t = Ve.transition,
			n = V;
		try {
			if (
				((Ve.transition = null),
				(V = 16 > e ? 16 : e),
				It === null)
			)
				var r = !1;
			else {
				if (((e = It), (It = null), (Ka = 0), F & 6))
					throw Error(_(331));
				var a = F;
				for (F |= 4, N = e.current; N !== null; ) {
					var l = N,
						i = l.child;
					if (N.flags & 16) {
						var o = l.deletions;
						if (o !== null) {
							for (var s = 0; s < o.length; s++) {
								var c = o[s];
								for (N = c; N !== null; ) {
									var d = N;
									switch (d.tag) {
										case 0:
										case 11:
										case 15:
											Mr(8, d, l);
									}
									var f = d.child;
									if (f !== null) (f.return = d), (N = f);
									else
										for (; N !== null; ) {
											d = N;
											var m = d.sibling,
												v = d.return;
											if ((Cd(d), d === c)) {
												N = null;
												break;
											}
											if (m !== null) {
												(m.return = v), (N = m);
												break;
											}
											N = v;
										}
								}
							}
							var g = l.alternate;
							if (g !== null) {
								var b = g.child;
								if (b !== null) {
									g.child = null;
									do {
										var w = b.sibling;
										(b.sibling = null), (b = w);
									} while (b !== null);
								}
							}
							N = l;
						}
					}
					if (l.subtreeFlags & 2064 && i !== null)
						(i.return = l), (N = i);
					else
						e: for (; N !== null; ) {
							if (((l = N), l.flags & 2048))
								switch (l.tag) {
									case 0:
									case 11:
									case 15:
										Mr(9, l, l.return);
								}
							var h = l.sibling;
							if (h !== null) {
								(h.return = l.return), (N = h);
								break e;
							}
							N = l.return;
						}
				}
				var u = e.current;
				for (N = u; N !== null; ) {
					i = N;
					var p = i.child;
					if (i.subtreeFlags & 2064 && p !== null)
						(p.return = i), (N = p);
					else
						e: for (i = u; N !== null; ) {
							if (((o = N), o.flags & 2048))
								try {
									switch (o.tag) {
										case 0:
										case 11:
										case 15:
											Ga(9, o);
									}
								} catch (S) {
									Z(o, o.return, S);
								}
							if (o === i) {
								N = null;
								break e;
							}
							var y = o.sibling;
							if (y !== null) {
								(y.return = o.return), (N = y);
								break e;
							}
							N = o.return;
						}
				}
				if (
					((F = a),
					Ot(),
					Ze && typeof Ze.onPostCommitFiberRoot == "function")
				)
					try {
						Ze.onPostCommitFiberRoot(la, e);
					} catch {}
				r = !0;
			}
			return r;
		} finally {
			(V = n), (Ve.transition = t);
		}
	}
	return !1;
}
function Bd(e, t, n) {
	(t = An(n, t)),
		(t = ad(e, t, 1)),
		(e = zt(e, t, 1)),
		(t = be()),
		e !== null && (lr(e, 1, t), Ce(e, t));
}
function Z(e, t, n) {
	if (e.tag === 3) Bd(e, e, n);
	else
		for (; t !== null; ) {
			if (t.tag === 3) {
				Bd(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (
					typeof t.type.getDerivedStateFromError == "function" ||
					(typeof r.componentDidCatch == "function" &&
						(Nt === null || !Nt.has(r)))
				) {
					(e = An(n, e)),
						(e = ld(t, e, 1)),
						(t = zt(t, e, 1)),
						(e = be()),
						t !== null && (lr(t, 1, e), Ce(t, e));
					break;
				}
			}
			t = t.return;
		}
}
function Wm(e, t, n) {
	var r = e.pingCache;
	r !== null && r.delete(t),
		(t = be()),
		(e.pingedLanes |= e.suspendedLanes & n),
		ie === e &&
			(ce & n) === n &&
			(re === 4 ||
			(re === 3 && (ce & 130023424) === ce && 500 > J() - No)
				? tn(e, 0)
				: (Mo |= n)),
		Ce(e, t);
}
function Vd(e, t) {
	t === 0 &&
		(e.mode & 1
			? ((t = oa),
			  (oa <<= 1),
			  !(oa & 130023424) && (oa = 4194304))
			: (t = 1));
	var n = be();
	(e = ft(e, t)), e !== null && (lr(e, t, n), Ce(e, n));
}
function Gm(e) {
	var t = e.memoizedState,
		n = 0;
	t !== null && (n = t.retryLane), Vd(e, n);
}
function qm(e, t) {
	var n = 0;
	switch (e.tag) {
		case 13:
			var r = e.stateNode,
				a = e.memoizedState;
			a !== null && (n = a.retryLane);
			break;
		case 19:
			r = e.stateNode;
			break;
		default:
			throw Error(_(314));
	}
	r !== null && r.delete(t), Vd(e, n);
}
var Hd;
Hd = function (e, t, n) {
	if (e !== null)
		if (e.memoizedProps !== t.pendingProps || Se.current)
			ke = !0;
		else {
			if (!(e.lanes & n) && !(t.flags & 128))
				return (ke = !1), Im(e, t, n);
			ke = !!(e.flags & 131072);
		}
	else
		(ke = !1), q && t.flags & 1048576 && Sc(t, Oa, t.index);
	switch (((t.lanes = 0), t.tag)) {
		case 2:
			var r = t.type;
			Ua(e, t), (e = t.pendingProps);
			var a = On(t, fe.current);
			jn(t, n), (a = co(null, t, r, e, a, n));
			var l = fo();
			return (
				(t.flags |= 1),
				typeof a == "object" &&
				a !== null &&
				typeof a.render == "function" &&
				a.$$typeof === void 0
					? ((t.tag = 1),
					  (t.memoizedState = null),
					  (t.updateQueue = null),
					  xe(r) ? ((l = !0), Ta(t)) : (l = !1),
					  (t.memoizedState =
							a.state !== null && a.state !== void 0
								? a.state
								: null),
					  ro(t),
					  (a.updater = Va),
					  (t.stateNode = a),
					  (a._reactInternals = t),
					  yo(t, r, e, n),
					  (t = xo(null, t, r, !0, l, n)))
					: ((t.tag = 0),
					  q && l && qi(t),
					  ye(null, t, a, n),
					  (t = t.child)),
				t
			);
		case 16:
			r = t.elementType;
			e: {
				switch (
					(Ua(e, t),
					(e = t.pendingProps),
					(a = r._init),
					(r = a(r._payload)),
					(t.type = r),
					(a = t.tag = Xm(r)),
					(e = qe(r, e)),
					a)
				) {
					case 0:
						t = So(null, t, r, e, n);
						break e;
					case 1:
						t = hd(null, t, r, e, n);
						break e;
					case 11:
						t = ud(null, t, r, e, n);
						break e;
					case 14:
						t = cd(null, t, r, qe(r.type, e), n);
						break e;
				}
				throw Error(_(306, r, ""));
			}
			return t;
		case 0:
			return (
				(r = t.type),
				(a = t.pendingProps),
				(a = t.elementType === r ? a : qe(r, a)),
				So(e, t, r, a, n)
			);
		case 1:
			return (
				(r = t.type),
				(a = t.pendingProps),
				(a = t.elementType === r ? a : qe(r, a)),
				hd(e, t, r, a, n)
			);
		case 3:
			e: {
				if ((md(t), e === null)) throw Error(_(387));
				(r = t.pendingProps),
					(l = t.memoizedState),
					(a = l.element),
					Lc(e, t),
					ja(t, r, null, n);
				var i = t.memoizedState;
				if (((r = i.element), l.isDehydrated))
					if (
						((l = {
							element: r,
							isDehydrated: !1,
							cache: i.cache,
							pendingSuspenseBoundaries:
								i.pendingSuspenseBoundaries,
							transitions: i.transitions,
						}),
						(t.updateQueue.baseState = l),
						(t.memoizedState = l),
						t.flags & 256)
					) {
						(a = An(Error(_(423)), t)), (t = gd(e, t, r, n, a));
						break e;
					} else if (r !== a) {
						(a = An(Error(_(424)), t)), (t = gd(e, t, r, n, a));
						break e;
					} else
						for (
							ze = Tt(t.stateNode.containerInfo.firstChild),
								Le = t,
								q = !0,
								Ge = null,
								n = Pc(t, null, r, n),
								t.child = n;
							n;

						)
							(n.flags = (n.flags & -3) | 4096), (n = n.sibling);
				else {
					if ((Mn(), r === a)) {
						t = ht(e, t, n);
						break e;
					}
					ye(e, t, r, n);
				}
				t = t.child;
			}
			return t;
		case 5:
			return (
				Nc(t),
				e === null && Yi(t),
				(r = t.type),
				(a = t.pendingProps),
				(l = e !== null ? e.memoizedProps : null),
				(i = a.children),
				Bi(r, a)
					? (i = null)
					: l !== null && Bi(r, l) && (t.flags |= 32),
				pd(e, t),
				ye(e, t, i, n),
				t.child
			);
		case 6:
			return e === null && Yi(t), null;
		case 13:
			return vd(e, t, n);
		case 4:
			return (
				ao(t, t.stateNode.containerInfo),
				(r = t.pendingProps),
				e === null
					? (t.child = Nn(t, null, r, n))
					: ye(e, t, r, n),
				t.child
			);
		case 11:
			return (
				(r = t.type),
				(a = t.pendingProps),
				(a = t.elementType === r ? a : qe(r, a)),
				ud(e, t, r, a, n)
			);
		case 7:
			return ye(e, t, t.pendingProps, n), t.child;
		case 8:
			return ye(e, t, t.pendingProps.children, n), t.child;
		case 12:
			return ye(e, t, t.pendingProps.children, n), t.child;
		case 10:
			e: {
				if (
					((r = t.type._context),
					(a = t.pendingProps),
					(l = t.memoizedProps),
					(i = a.value),
					U(Ma, r._currentValue),
					(r._currentValue = i),
					l !== null)
				)
					if (We(l.value, i)) {
						if (l.children === a.children && !Se.current) {
							t = ht(e, t, n);
							break e;
						}
					} else
						for (
							l = t.child, l !== null && (l.return = t);
							l !== null;

						) {
							var o = l.dependencies;
							if (o !== null) {
								i = l.child;
								for (var s = o.firstContext; s !== null; ) {
									if (s.context === r) {
										if (l.tag === 1) {
											(s = pt(-1, n & -n)), (s.tag = 2);
											var c = l.updateQueue;
											if (c !== null) {
												c = c.shared;
												var d = c.pending;
												d === null
													? (s.next = s)
													: ((s.next = d.next), (d.next = s)),
													(c.pending = s);
											}
										}
										(l.lanes |= n),
											(s = l.alternate),
											s !== null && (s.lanes |= n),
											to(l.return, n, t),
											(o.lanes |= n);
										break;
									}
									s = s.next;
								}
							} else if (l.tag === 10)
								i = l.type === t.type ? null : l.child;
							else if (l.tag === 18) {
								if (((i = l.return), i === null))
									throw Error(_(341));
								(i.lanes |= n),
									(o = i.alternate),
									o !== null && (o.lanes |= n),
									to(i, n, t),
									(i = l.sibling);
							} else i = l.child;
							if (i !== null) i.return = l;
							else
								for (i = l; i !== null; ) {
									if (i === t) {
										i = null;
										break;
									}
									if (((l = i.sibling), l !== null)) {
										(l.return = i.return), (i = l);
										break;
									}
									i = i.return;
								}
							l = i;
						}
				ye(e, t, a.children, n), (t = t.child);
			}
			return t;
		case 9:
			return (
				(a = t.type),
				(r = t.pendingProps.children),
				jn(t, n),
				(a = $e(a)),
				(r = r(a)),
				(t.flags |= 1),
				ye(e, t, r, n),
				t.child
			);
		case 14:
			return (
				(r = t.type),
				(a = qe(r, t.pendingProps)),
				(a = qe(r.type, a)),
				cd(e, t, r, a, n)
			);
		case 15:
			return dd(e, t, t.type, t.pendingProps, n);
		case 17:
			return (
				(r = t.type),
				(a = t.pendingProps),
				(a = t.elementType === r ? a : qe(r, a)),
				Ua(e, t),
				(t.tag = 1),
				xe(r) ? ((e = !0), Ta(t)) : (e = !1),
				jn(t, n),
				nd(t, r, a),
				yo(t, r, a, n),
				xo(null, t, r, !0, e, n)
			);
		case 19:
			return bd(e, t, n);
		case 22:
			return fd(e, t, n);
	}
	throw Error(_(156, t.tag));
};
function Ud(e, t) {
	return xu(e, t);
}
function Qm(e, t, n, r) {
	(this.tag = e),
		(this.key = n),
		(this.sibling =
			this.child =
			this.return =
			this.stateNode =
			this.type =
			this.elementType =
				null),
		(this.index = 0),
		(this.ref = null),
		(this.pendingProps = t),
		(this.dependencies =
			this.memoizedState =
			this.updateQueue =
			this.memoizedProps =
				null),
		(this.mode = r),
		(this.subtreeFlags = this.flags = 0),
		(this.deletions = null),
		(this.childLanes = this.lanes = 0),
		(this.alternate = null);
}
function He(e, t, n, r) {
	return new Qm(e, t, n, r);
}
function Bo(e) {
	return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Xm(e) {
	if (typeof e == "function") return Bo(e) ? 1 : 0;
	if (e != null) {
		if (((e = e.$$typeof), e === ql)) return 11;
		if (e === Yl) return 14;
	}
	return 2;
}
function At(e, t) {
	var n = e.alternate;
	return (
		n === null
			? ((n = He(e.tag, t, e.key, e.mode)),
			  (n.elementType = e.elementType),
			  (n.type = e.type),
			  (n.stateNode = e.stateNode),
			  (n.alternate = e),
			  (e.alternate = n))
			: ((n.pendingProps = t),
			  (n.type = e.type),
			  (n.flags = 0),
			  (n.subtreeFlags = 0),
			  (n.deletions = null)),
		(n.flags = e.flags & 14680064),
		(n.childLanes = e.childLanes),
		(n.lanes = e.lanes),
		(n.child = e.child),
		(n.memoizedProps = e.memoizedProps),
		(n.memoizedState = e.memoizedState),
		(n.updateQueue = e.updateQueue),
		(t = e.dependencies),
		(n.dependencies =
			t === null
				? null
				: { lanes: t.lanes, firstContext: t.firstContext }),
		(n.sibling = e.sibling),
		(n.index = e.index),
		(n.ref = e.ref),
		n
	);
}
function tl(e, t, n, r, a, l) {
	var i = 2;
	if (((r = e), typeof e == "function")) Bo(e) && (i = 1);
	else if (typeof e == "string") i = 5;
	else
		e: switch (e) {
			case gn:
				return rn(n.children, a, l, t);
			case Wl:
				(i = 8), (a |= 8);
				break;
			case Gl:
				return (
					(e = He(12, n, t, a | 2)),
					(e.elementType = Gl),
					(e.lanes = l),
					e
				);
			case Ql:
				return (
					(e = He(13, n, t, a)),
					(e.elementType = Ql),
					(e.lanes = l),
					e
				);
			case Xl:
				return (
					(e = He(19, n, t, a)),
					(e.elementType = Xl),
					(e.lanes = l),
					e
				);
			case Zs:
				return nl(n, a, l, t);
			default:
				if (typeof e == "object" && e !== null)
					switch (e.$$typeof) {
						case Ys:
							i = 10;
							break e;
						case Ks:
							i = 9;
							break e;
						case ql:
							i = 11;
							break e;
						case Yl:
							i = 14;
							break e;
						case yt:
							(i = 16), (r = null);
							break e;
					}
				throw Error(_(130, e == null ? e : typeof e, ""));
		}
	return (
		(t = He(i, n, t, a)),
		(t.elementType = e),
		(t.type = r),
		(t.lanes = l),
		t
	);
}
function rn(e, t, n, r) {
	return (e = He(7, e, r, t)), (e.lanes = n), e;
}
function nl(e, t, n, r) {
	return (
		(e = He(22, e, r, t)),
		(e.elementType = Zs),
		(e.lanes = n),
		(e.stateNode = { isHidden: !1 }),
		e
	);
}
function Vo(e, t, n) {
	return (e = He(6, e, null, t)), (e.lanes = n), e;
}
function Ho(e, t, n) {
	return (
		(t = He(
			4,
			e.children !== null ? e.children : [],
			e.key,
			t
		)),
		(t.lanes = n),
		(t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation,
		}),
		t
	);
}
function Ym(e, t, n, r, a) {
	(this.tag = t),
		(this.containerInfo = e),
		(this.finishedWork =
			this.pingCache =
			this.current =
			this.pendingChildren =
				null),
		(this.timeoutHandle = -1),
		(this.callbackNode =
			this.pendingContext =
			this.context =
				null),
		(this.callbackPriority = 0),
		(this.eventTimes = gi(0)),
		(this.expirationTimes = gi(-1)),
		(this.entangledLanes =
			this.finishedLanes =
			this.mutableReadLanes =
			this.expiredLanes =
			this.pingedLanes =
			this.suspendedLanes =
			this.pendingLanes =
				0),
		(this.entanglements = gi(0)),
		(this.identifierPrefix = r),
		(this.onRecoverableError = a),
		(this.mutableSourceEagerHydrationData = null);
}
function Uo(e, t, n, r, a, l, i, o, s) {
	return (
		(e = new Ym(e, t, n, o, s)),
		t === 1 ? ((t = 1), l === !0 && (t |= 8)) : (t = 0),
		(l = He(3, null, null, t)),
		(e.current = l),
		(l.stateNode = e),
		(l.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: null,
			transitions: null,
			pendingSuspenseBoundaries: null,
		}),
		ro(l),
		e
	);
}
function Km(e, t, n) {
	var r =
		3 < arguments.length && arguments[3] !== void 0
			? arguments[3]
			: null;
	return {
		$$typeof: mn,
		key: r == null ? null : "" + r,
		children: e,
		containerInfo: t,
		implementation: n,
	};
}
function Wd(e) {
	if (!e) return Pt;
	e = e._reactInternals;
	e: {
		if (Wt(e) !== e || e.tag !== 1) throw Error(_(170));
		var t = e;
		do {
			switch (t.tag) {
				case 3:
					t = t.stateNode.context;
					break e;
				case 1:
					if (xe(t.type)) {
						t =
							t.stateNode
								.__reactInternalMemoizedMergedChildContext;
						break e;
					}
			}
			t = t.return;
		} while (t !== null);
		throw Error(_(171));
	}
	if (e.tag === 1) {
		var n = e.type;
		if (xe(n)) return yc(e, n, t);
	}
	return t;
}
function Gd(e, t, n, r, a, l, i, o, s) {
	return (
		(e = Uo(n, r, !0, e, a, l, i, o, s)),
		(e.context = Wd(null)),
		(n = e.current),
		(r = be()),
		(a = jt(n)),
		(l = pt(r, a)),
		(l.callback = t ?? null),
		zt(n, l, a),
		(e.current.lanes = a),
		lr(e, a, r),
		Ce(e, r),
		e
	);
}
function rl(e, t, n, r) {
	var a = t.current,
		l = be(),
		i = jt(a);
	return (
		(n = Wd(n)),
		t.context === null
			? (t.context = n)
			: (t.pendingContext = n),
		(t = pt(l, i)),
		(t.payload = { element: e }),
		(r = r === void 0 ? null : r),
		r !== null && (t.callback = r),
		(e = zt(a, t, i)),
		e !== null && (Ye(e, a, i, l), Ia(e, a, i)),
		i
	);
}
function al(e) {
	if (((e = e.current), !e.child)) return null;
	switch (e.child.tag) {
		case 5:
			return e.child.stateNode;
		default:
			return e.child.stateNode;
	}
}
function qd(e, t) {
	if (
		((e = e.memoizedState),
		e !== null && e.dehydrated !== null)
	) {
		var n = e.retryLane;
		e.retryLane = n !== 0 && n < t ? n : t;
	}
}
function Wo(e, t) {
	qd(e, t), (e = e.alternate) && qd(e, t);
}
function Zm() {
	return null;
}
var Qd =
	typeof reportError == "function"
		? reportError
		: function (e) {
				console.error(e);
		  };
function Go(e) {
	this._internalRoot = e;
}
(ll.prototype.render = Go.prototype.render =
	function (e) {
		var t = this._internalRoot;
		if (t === null) throw Error(_(409));
		rl(e, t, null, null);
	}),
	(ll.prototype.unmount = Go.prototype.unmount =
		function () {
			var e = this._internalRoot;
			if (e !== null) {
				this._internalRoot = null;
				var t = e.containerInfo;
				en(function () {
					rl(null, e, null, null);
				}),
					(t[st] = null);
			}
		});
function ll(e) {
	this._internalRoot = e;
}
ll.prototype.unstable_scheduleHydration = function (e) {
	if (e) {
		var t = Lu();
		e = { blockedOn: null, target: e, priority: t };
		for (
			var n = 0;
			n < kt.length && t !== 0 && t < kt[n].priority;
			n++
		);
		kt.splice(n, 0, e), n === 0 && Nu(e);
	}
};
function qo(e) {
	return !(
		!e ||
		(e.nodeType !== 1 &&
			e.nodeType !== 9 &&
			e.nodeType !== 11)
	);
}
function il(e) {
	return !(
		!e ||
		(e.nodeType !== 1 &&
			e.nodeType !== 9 &&
			e.nodeType !== 11 &&
			(e.nodeType !== 8 ||
				e.nodeValue !== " react-mount-point-unstable "))
	);
}
function Xd() {}
function Jm(e, t, n, r, a) {
	if (a) {
		if (typeof r == "function") {
			var l = r;
			r = function () {
				var c = al(i);
				l.call(c);
			};
		}
		var i = Gd(t, r, e, 0, null, !1, !1, "", Xd);
		return (
			(e._reactRootContainer = i),
			(e[st] = i.current),
			br(e.nodeType === 8 ? e.parentNode : e),
			en(),
			i
		);
	}
	for (; (a = e.lastChild); ) e.removeChild(a);
	if (typeof r == "function") {
		var o = r;
		r = function () {
			var c = al(s);
			o.call(c);
		};
	}
	var s = Uo(e, 0, !1, null, null, !1, !1, "", Xd);
	return (
		(e._reactRootContainer = s),
		(e[st] = s.current),
		br(e.nodeType === 8 ? e.parentNode : e),
		en(function () {
			rl(t, s, n, r);
		}),
		s
	);
}
function ol(e, t, n, r, a) {
	var l = n._reactRootContainer;
	if (l) {
		var i = l;
		if (typeof a == "function") {
			var o = a;
			a = function () {
				var s = al(i);
				o.call(s);
			};
		}
		rl(t, i, e, a);
	} else i = Jm(n, t, e, a, r);
	return al(i);
}
(Pu = function (e) {
	switch (e.tag) {
		case 3:
			var t = e.stateNode;
			if (t.current.memoizedState.isDehydrated) {
				var n = ar(t.pendingLanes);
				n !== 0 &&
					(vi(t, n | 1),
					Ce(t, J()),
					!(F & 6) && (($n = J() + 500), Ot()));
			}
			break;
		case 13:
			en(function () {
				var r = ft(e, 1);
				if (r !== null) {
					var a = be();
					Ye(r, e, 1, a);
				}
			}),
				Wo(e, 1);
	}
}),
	(yi = function (e) {
		if (e.tag === 13) {
			var t = ft(e, 134217728);
			if (t !== null) {
				var n = be();
				Ye(t, e, 134217728, n);
			}
			Wo(e, 134217728);
		}
	}),
	(Ou = function (e) {
		if (e.tag === 13) {
			var t = jt(e),
				n = ft(e, t);
			if (n !== null) {
				var r = be();
				Ye(n, e, t, r);
			}
			Wo(e, t);
		}
	}),
	(Lu = function () {
		return V;
	}),
	(zu = function (e, t) {
		var n = V;
		try {
			return (V = e), t();
		} finally {
			V = n;
		}
	}),
	(ci = function (e, t, n) {
		switch (t) {
			case "input":
				if (
					(ni(e, n),
					(t = n.name),
					n.type === "radio" && t != null)
				) {
					for (n = e; n.parentNode; ) n = n.parentNode;
					for (
						n = n.querySelectorAll(
							"input[name=" +
								JSON.stringify("" + t) +
								'][type="radio"]'
						),
							t = 0;
						t < n.length;
						t++
					) {
						var r = n[t];
						if (r !== e && r.form === e.form) {
							var a = Ea(r);
							if (!a) throw Error(_(90));
							tu(r), ni(r, a);
						}
					}
				}
				break;
			case "textarea":
				iu(e, n);
				break;
			case "select":
				(t = n.value), t != null && vn(e, !!n.multiple, t, !1);
		}
	}),
	(mu = Do),
	(gu = en);
var eg = {
		usingClientEntryPoint: !1,
		Events: [xr, _n, Ea, pu, hu, Do],
	},
	Rr = {
		findFiberByHostInstance: Gt,
		bundleType: 0,
		version: "18.3.1",
		rendererPackageName: "react-dom",
	},
	tg = {
		bundleType: Rr.bundleType,
		version: Rr.version,
		rendererPackageName: Rr.rendererPackageName,
		rendererConfig: Rr.rendererConfig,
		overrideHookState: null,
		overrideHookStateDeletePath: null,
		overrideHookStateRenamePath: null,
		overrideProps: null,
		overridePropsDeletePath: null,
		overridePropsRenamePath: null,
		setErrorHandler: null,
		setSuspenseHandler: null,
		scheduleUpdate: null,
		currentDispatcherRef: ot.ReactCurrentDispatcher,
		findHostInstanceByFiber: function (e) {
			return (e = wu(e)), e === null ? null : e.stateNode;
		},
		findFiberByHostInstance: Rr.findFiberByHostInstance || Zm,
		findHostInstancesForRefresh: null,
		scheduleRefresh: null,
		scheduleRoot: null,
		setRefreshHandler: null,
		getCurrentFiber: null,
		reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
	};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
	var sl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
	if (!sl.isDisabled && sl.supportsFiber)
		try {
			(la = sl.inject(tg)), (Ze = sl);
		} catch {}
}
(_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
	eg),
	(_e.createPortal = function (e, t) {
		var n =
			2 < arguments.length && arguments[2] !== void 0
				? arguments[2]
				: null;
		if (!qo(t)) throw Error(_(200));
		return Km(e, t, null, n);
	}),
	(_e.createRoot = function (e, t) {
		if (!qo(e)) throw Error(_(299));
		var n = !1,
			r = "",
			a = Qd;
		return (
			t != null &&
				(t.unstable_strictMode === !0 && (n = !0),
				t.identifierPrefix !== void 0 &&
					(r = t.identifierPrefix),
				t.onRecoverableError !== void 0 &&
					(a = t.onRecoverableError)),
			(t = Uo(e, 1, !1, null, null, n, !1, r, a)),
			(e[st] = t.current),
			br(e.nodeType === 8 ? e.parentNode : e),
			new Go(t)
		);
	}),
	(_e.findDOMNode = function (e) {
		if (e == null) return null;
		if (e.nodeType === 1) return e;
		var t = e._reactInternals;
		if (t === void 0)
			throw typeof e.render == "function"
				? Error(_(188))
				: ((e = Object.keys(e).join(",")), Error(_(268, e)));
		return (
			(e = wu(t)), (e = e === null ? null : e.stateNode), e
		);
	}),
	(_e.flushSync = function (e) {
		return en(e);
	}),
	(_e.hydrate = function (e, t, n) {
		if (!il(t)) throw Error(_(200));
		return ol(null, e, t, !0, n);
	}),
	(_e.hydrateRoot = function (e, t, n) {
		if (!qo(e)) throw Error(_(405));
		var r = (n != null && n.hydratedSources) || null,
			a = !1,
			l = "",
			i = Qd;
		if (
			(n != null &&
				(n.unstable_strictMode === !0 && (a = !0),
				n.identifierPrefix !== void 0 &&
					(l = n.identifierPrefix),
				n.onRecoverableError !== void 0 &&
					(i = n.onRecoverableError)),
			(t = Gd(t, null, e, 1, n ?? null, a, !1, l, i)),
			(e[st] = t.current),
			br(e),
			r)
		)
			for (e = 0; e < r.length; e++)
				(n = r[e]),
					(a = n._getVersion),
					(a = a(n._source)),
					t.mutableSourceEagerHydrationData == null
						? (t.mutableSourceEagerHydrationData = [n, a])
						: t.mutableSourceEagerHydrationData.push(n, a);
		return new ll(t);
	}),
	(_e.render = function (e, t, n) {
		if (!il(t)) throw Error(_(200));
		return ol(null, e, t, !1, n);
	}),
	(_e.unmountComponentAtNode = function (e) {
		if (!il(e)) throw Error(_(40));
		return e._reactRootContainer
			? (en(function () {
					ol(null, null, e, !1, function () {
						(e._reactRootContainer = null), (e[st] = null);
					});
			  }),
			  !0)
			: !1;
	}),
	(_e.unstable_batchedUpdates = Do),
	(_e.unstable_renderSubtreeIntoContainer = function (
		e,
		t,
		n,
		r
	) {
		if (!il(n)) throw Error(_(200));
		if (e == null || e._reactInternals === void 0)
			throw Error(_(38));
		return ol(e, t, n, !1, r);
	}),
	(_e.version = "18.3.1-next-f1338f8080-20240426");
function Yd() {
	if (
		!(
			typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
			typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !=
				"function"
		)
	)
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Yd);
		} catch (e) {
			console.error(e);
		}
}
Yd(), (Us.exports = _e);
var ng = Us.exports,
	Kd = ng;
($l.createRoot = Kd.createRoot),
	($l.hydrateRoot = Kd.hydrateRoot);
var Zd = { exports: {} },
	Jd = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Ar = O;
function rg(e, t) {
	return (
		(e === t && (e !== 0 || 1 / e === 1 / t)) ||
		(e !== e && t !== t)
	);
}
var ag = typeof Object.is == "function" ? Object.is : rg,
	lg = Ar.useSyncExternalStore,
	ig = Ar.useRef,
	og = Ar.useEffect,
	sg = Ar.useMemo,
	ug = Ar.useDebugValue;
(Jd.useSyncExternalStoreWithSelector = function (
	e,
	t,
	n,
	r,
	a
) {
	var l = ig(null);
	if (l.current === null) {
		var i = { hasValue: !1, value: null };
		l.current = i;
	} else i = l.current;
	l = sg(
		function () {
			function s(v) {
				if (!c) {
					if (
						((c = !0),
						(d = v),
						(v = r(v)),
						a !== void 0 && i.hasValue)
					) {
						var g = i.value;
						if (a(g, v)) return (f = g);
					}
					return (f = v);
				}
				if (((g = f), ag(d, v))) return g;
				var b = r(v);
				return a !== void 0 && a(g, b) ? g : ((d = v), (f = b));
			}
			var c = !1,
				d,
				f,
				m = n === void 0 ? null : n;
			return [
				function () {
					return s(t());
				},
				m === null
					? void 0
					: function () {
							return s(m());
					  },
			];
		},
		[t, n, r, a]
	);
	var o = lg(e, l[0], l[1]);
	return (
		og(
			function () {
				(i.hasValue = !0), (i.value = o);
			},
			[o]
		),
		ug(o),
		o
	);
}),
	(Zd.exports = Jd);
var cg = Zd.exports,
	Ne = "default" in Fl ? H : Fl,
	ef = Symbol.for("react-redux-context"),
	tf = typeof globalThis < "u" ? globalThis : {};
function dg() {
	if (!Ne.createContext) return {};
	const e = tf[ef] ?? (tf[ef] = new Map());
	let t = e.get(Ne.createContext);
	return (
		t ||
			((t = Ne.createContext(null)),
			e.set(Ne.createContext, t)),
		t
	);
}
var Dt = dg(),
	fg = () => {
		throw new Error("uSES not initialized!");
	};
function Qo(e = Dt) {
	return function () {
		return Ne.useContext(e);
	};
}
var nf = Qo(),
	rf = fg,
	pg = (e) => {
		rf = e;
	},
	hg = (e, t) => e === t;
function mg(e = Dt) {
	const t = e === Dt ? nf : Qo(e),
		n = (r, a = {}) => {
			const { equalityFn: l = hg, devModeChecks: i = {} } =
					typeof a == "function" ? { equalityFn: a } : a,
				{
					store: o,
					subscription: s,
					getServerState: c,
					stabilityCheck: d,
					identityFunctionCheck: f,
				} = t();
			Ne.useRef(!0);
			const m = Ne.useCallback(
					{
						[r.name](g) {
							return r(g);
						},
					}[r.name],
					[r, d, i.stabilityCheck]
				),
				v = rf(
					s.addNestedSub,
					o.getState,
					c || o.getState,
					m,
					l
				);
			return Ne.useDebugValue(v), v;
		};
	return Object.assign(n, { withTypes: () => n }), n;
}
var af = mg();
function gg(e) {
	e();
}
function vg() {
	let e = null,
		t = null;
	return {
		clear() {
			(e = null), (t = null);
		},
		notify() {
			gg(() => {
				let n = e;
				for (; n; ) n.callback(), (n = n.next);
			});
		},
		get() {
			const n = [];
			let r = e;
			for (; r; ) n.push(r), (r = r.next);
			return n;
		},
		subscribe(n) {
			let r = !0;
			const a = (t = { callback: n, next: null, prev: t });
			return (
				a.prev ? (a.prev.next = a) : (e = a),
				function () {
					!r ||
						e === null ||
						((r = !1),
						a.next ? (a.next.prev = a.prev) : (t = a.prev),
						a.prev ? (a.prev.next = a.next) : (e = a.next));
				}
			);
		},
	};
}
var lf = { notify() {}, get: () => [] };
function yg(e, t) {
	let n,
		r = lf,
		a = 0,
		l = !1;
	function i(b) {
		d();
		const w = r.subscribe(b);
		let h = !1;
		return () => {
			h || ((h = !0), w(), f());
		};
	}
	function o() {
		r.notify();
	}
	function s() {
		g.onStateChange && g.onStateChange();
	}
	function c() {
		return l;
	}
	function d() {
		a++, n || ((n = e.subscribe(s)), (r = vg()));
	}
	function f() {
		a--,
			n && a === 0 && (n(), (n = void 0), r.clear(), (r = lf));
	}
	function m() {
		l || ((l = !0), d());
	}
	function v() {
		l && ((l = !1), f());
	}
	const g = {
		addNestedSub: i,
		notifyNestedSubs: o,
		handleChangeWrapper: s,
		isSubscribed: c,
		trySubscribe: m,
		tryUnsubscribe: v,
		getListeners: () => r,
	};
	return g;
}
var bg =
		typeof window < "u" &&
		typeof window.document < "u" &&
		typeof window.document.createElement < "u",
	wg =
		typeof navigator < "u" &&
		navigator.product === "ReactNative",
	Sg = bg || wg ? Ne.useLayoutEffect : Ne.useEffect;
function xg({
	store: e,
	context: t,
	children: n,
	serverState: r,
	stabilityCheck: a = "once",
	identityFunctionCheck: l = "once",
}) {
	const i = Ne.useMemo(() => {
			const c = yg(e);
			return {
				store: e,
				subscription: c,
				getServerState: r ? () => r : void 0,
				stabilityCheck: a,
				identityFunctionCheck: l,
			};
		}, [e, r, a, l]),
		o = Ne.useMemo(() => e.getState(), [e]);
	Sg(() => {
		const { subscription: c } = i;
		return (
			(c.onStateChange = c.notifyNestedSubs),
			c.trySubscribe(),
			o !== e.getState() && c.notifyNestedSubs(),
			() => {
				c.tryUnsubscribe(), (c.onStateChange = void 0);
			}
		);
	}, [i, o]);
	const s = t || Dt;
	return Ne.createElement(s.Provider, { value: i }, n);
}
var kg = xg;
function of(e = Dt) {
	const t = e === Dt ? nf : Qo(e),
		n = () => {
			const { store: r } = t();
			return r;
		};
	return Object.assign(n, { withTypes: () => n }), n;
}
var Eg = of();
function Cg(e = Dt) {
	const t = e === Dt ? Eg : of(e),
		n = () => t().dispatch;
	return Object.assign(n, { withTypes: () => n }), n;
}
var Tg = Cg();
pg(cg.useSyncExternalStoreWithSelector);
function de(e) {
	return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var _g =
		(typeof Symbol == "function" && Symbol.observable) ||
		"@@observable",
	sf = _g,
	Xo = () =>
		Math.random()
			.toString(36)
			.substring(7)
			.split("")
			.join("."),
	Pg = {
		INIT: `@@redux/INIT${Xo()}`,
		REPLACE: `@@redux/REPLACE${Xo()}`,
		PROBE_UNKNOWN_ACTION: () =>
			`@@redux/PROBE_UNKNOWN_ACTION${Xo()}`,
	},
	ul = Pg;
function Yo(e) {
	if (typeof e != "object" || e === null) return !1;
	let t = e;
	for (; Object.getPrototypeOf(t) !== null; )
		t = Object.getPrototypeOf(t);
	return (
		Object.getPrototypeOf(e) === t ||
		Object.getPrototypeOf(e) === null
	);
}
function uf(e, t, n) {
	if (typeof e != "function") throw new Error(de(2));
	if (
		(typeof t == "function" && typeof n == "function") ||
		(typeof n == "function" &&
			typeof arguments[3] == "function")
	)
		throw new Error(de(0));
	if (
		(typeof t == "function" &&
			typeof n > "u" &&
			((n = t), (t = void 0)),
		typeof n < "u")
	) {
		if (typeof n != "function") throw new Error(de(1));
		return n(uf)(e, t);
	}
	let r = e,
		a = t,
		l = new Map(),
		i = l,
		o = 0,
		s = !1;
	function c() {
		i === l &&
			((i = new Map()),
			l.forEach((b, w) => {
				i.set(w, b);
			}));
	}
	function d() {
		if (s) throw new Error(de(3));
		return a;
	}
	function f(b) {
		if (typeof b != "function") throw new Error(de(4));
		if (s) throw new Error(de(5));
		let w = !0;
		c();
		const h = o++;
		return (
			i.set(h, b),
			function () {
				if (w) {
					if (s) throw new Error(de(6));
					(w = !1), c(), i.delete(h), (l = null);
				}
			}
		);
	}
	function m(b) {
		if (!Yo(b)) throw new Error(de(7));
		if (typeof b.type > "u") throw new Error(de(8));
		if (typeof b.type != "string") throw new Error(de(17));
		if (s) throw new Error(de(9));
		try {
			(s = !0), (a = r(a, b));
		} finally {
			s = !1;
		}
		return (
			(l = i).forEach((w) => {
				w();
			}),
			b
		);
	}
	function v(b) {
		if (typeof b != "function") throw new Error(de(10));
		(r = b), m({ type: ul.REPLACE });
	}
	function g() {
		const b = f;
		return {
			subscribe(w) {
				if (typeof w != "object" || w === null)
					throw new Error(de(11));
				function h() {
					const u = w;
					u.next && u.next(d());
				}
				return h(), { unsubscribe: b(h) };
			},
			[sf]() {
				return this;
			},
		};
	}
	return (
		m({ type: ul.INIT }),
		{
			dispatch: m,
			subscribe: f,
			getState: d,
			replaceReducer: v,
			[sf]: g,
		}
	);
}
function Og(e) {
	Object.keys(e).forEach((t) => {
		const n = e[t];
		if (typeof n(void 0, { type: ul.INIT }) > "u")
			throw new Error(de(12));
		if (
			typeof n(void 0, { type: ul.PROBE_UNKNOWN_ACTION() }) >
			"u"
		)
			throw new Error(de(13));
	});
}
function Lg(e) {
	const t = Object.keys(e),
		n = {};
	for (let l = 0; l < t.length; l++) {
		const i = t[l];
		typeof e[i] == "function" && (n[i] = e[i]);
	}
	const r = Object.keys(n);
	let a;
	try {
		Og(n);
	} catch (l) {
		a = l;
	}
	return function (l = {}, i) {
		if (a) throw a;
		let o = !1;
		const s = {};
		for (let c = 0; c < r.length; c++) {
			const d = r[c],
				f = n[d],
				m = l[d],
				v = f(m, i);
			if (typeof v > "u")
				throw (i && i.type, new Error(de(14)));
			(s[d] = v), (o = o || v !== m);
		}
		return (
			(o = o || r.length !== Object.keys(l).length), o ? s : l
		);
	};
}
function cl(...e) {
	return e.length === 0
		? (t) => t
		: e.length === 1
		? e[0]
		: e.reduce(
				(t, n) =>
					(...r) =>
						t(n(...r))
		  );
}
function zg(...e) {
	return (t) => (n, r) => {
		const a = t(n, r);
		let l = () => {
			throw new Error(de(15));
		};
		const i = {
				getState: a.getState,
				dispatch: (s, ...c) => l(s, ...c),
			},
			o = e.map((s) => s(i));
		return (l = cl(...o)(a.dispatch)), { ...a, dispatch: l };
	};
}
function Mg(e) {
	return Yo(e) && "type" in e && typeof e.type == "string";
}
var cf = Symbol.for("immer-nothing"),
	df = Symbol.for("immer-draftable"),
	Ie = Symbol.for("immer-state");
function Ke(e, ...t) {
	throw new Error(
		`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
	);
}
var Vn = Object.getPrototypeOf;
function an(e) {
	return !!e && !!e[Ie];
}
function gt(e) {
	var t;
	return e
		? ff(e) ||
				Array.isArray(e) ||
				!!e[df] ||
				!!((t = e.constructor) != null && t[df]) ||
				pl(e) ||
				hl(e)
		: !1;
}
var Ng = Object.prototype.constructor.toString();
function ff(e) {
	if (!e || typeof e != "object") return !1;
	const t = Vn(e);
	if (t === null) return !0;
	const n =
		Object.hasOwnProperty.call(t, "constructor") &&
		t.constructor;
	return n === Object
		? !0
		: typeof n == "function" &&
				Function.toString.call(n) === Ng;
}
function dl(e, t) {
	fl(e) === 0
		? Reflect.ownKeys(e).forEach((n) => {
				t(n, e[n], e);
		  })
		: e.forEach((n, r) => t(r, n, e));
}
function fl(e) {
	const t = e[Ie];
	return t
		? t.type_
		: Array.isArray(e)
		? 1
		: pl(e)
		? 2
		: hl(e)
		? 3
		: 0;
}
function Ko(e, t) {
	return fl(e) === 2
		? e.has(t)
		: Object.prototype.hasOwnProperty.call(e, t);
}
function pf(e, t, n) {
	const r = fl(e);
	r === 2 ? e.set(t, n) : r === 3 ? e.add(n) : (e[t] = n);
}
function Ig(e, t) {
	return e === t
		? e !== 0 || 1 / e === 1 / t
		: e !== e && t !== t;
}
function pl(e) {
	return e instanceof Map;
}
function hl(e) {
	return e instanceof Set;
}
function ln(e) {
	return e.copy_ || e.base_;
}
function Zo(e, t) {
	if (pl(e)) return new Map(e);
	if (hl(e)) return new Set(e);
	if (Array.isArray(e)) return Array.prototype.slice.call(e);
	const n = ff(e);
	if (t === !0 || (t === "class_only" && !n)) {
		const r = Object.getOwnPropertyDescriptors(e);
		delete r[Ie];
		let a = Reflect.ownKeys(r);
		for (let l = 0; l < a.length; l++) {
			const i = a[l],
				o = r[i];
			o.writable === !1 &&
				((o.writable = !0), (o.configurable = !0)),
				(o.get || o.set) &&
					(r[i] = {
						configurable: !0,
						writable: !0,
						enumerable: o.enumerable,
						value: e[i],
					});
		}
		return Object.create(Vn(e), r);
	} else {
		const r = Vn(e);
		if (r !== null && n) return { ...e };
		const a = Object.create(r);
		return Object.assign(a, e);
	}
}
function Jo(e, t = !1) {
	return (
		ml(e) ||
			an(e) ||
			!gt(e) ||
			(fl(e) > 1 && (e.set = e.add = e.clear = e.delete = jg),
			Object.freeze(e),
			t && Object.entries(e).forEach(([n, r]) => Jo(r, !0))),
		e
	);
}
function jg() {
	Ke(2);
}
function ml(e) {
	return Object.isFrozen(e);
}
var Rg = {};
function on(e) {
	const t = Rg[e];
	return t || Ke(0, e), t;
}
var Dr;
function hf() {
	return Dr;
}
function Ag(e, t) {
	return {
		drafts_: [],
		parent_: e,
		immer_: t,
		canAutoFreeze_: !0,
		unfinalizedDrafts_: 0,
	};
}
function mf(e, t) {
	t &&
		(on("Patches"),
		(e.patches_ = []),
		(e.inversePatches_ = []),
		(e.patchListener_ = t));
}
function es(e) {
	ts(e), e.drafts_.forEach(Dg), (e.drafts_ = null);
}
function ts(e) {
	e === Dr && (Dr = e.parent_);
}
function gf(e) {
	return (Dr = Ag(Dr, e));
}
function Dg(e) {
	const t = e[Ie];
	t.type_ === 0 || t.type_ === 1
		? t.revoke_()
		: (t.revoked_ = !0);
}
function vf(e, t) {
	t.unfinalizedDrafts_ = t.drafts_.length;
	const n = t.drafts_[0];
	return (
		e !== void 0 && e !== n
			? (n[Ie].modified_ && (es(t), Ke(4)),
			  gt(e) && ((e = gl(t, e)), t.parent_ || vl(t, e)),
			  t.patches_ &&
					on("Patches").generateReplacementPatches_(
						n[Ie].base_,
						e,
						t.patches_,
						t.inversePatches_
					))
			: (e = gl(t, n, [])),
		es(t),
		t.patches_ &&
			t.patchListener_(t.patches_, t.inversePatches_),
		e !== cf ? e : void 0
	);
}
function gl(e, t, n) {
	if (ml(t)) return t;
	const r = t[Ie];
	if (!r) return dl(t, (a, l) => yf(e, r, t, a, l, n)), t;
	if (r.scope_ !== e) return t;
	if (!r.modified_) return vl(e, r.base_, !0), r.base_;
	if (!r.finalized_) {
		(r.finalized_ = !0), r.scope_.unfinalizedDrafts_--;
		const a = r.copy_;
		let l = a,
			i = !1;
		r.type_ === 3 && ((l = new Set(a)), a.clear(), (i = !0)),
			dl(l, (o, s) => yf(e, r, a, o, s, n, i)),
			vl(e, a, !1),
			n &&
				e.patches_ &&
				on("Patches").generatePatches_(
					r,
					n,
					e.patches_,
					e.inversePatches_
				);
	}
	return r.copy_;
}
function yf(e, t, n, r, a, l, i) {
	if (an(a)) {
		const o =
				l && t && t.type_ !== 3 && !Ko(t.assigned_, r)
					? l.concat(r)
					: void 0,
			s = gl(e, a, o);
		if ((pf(n, r, s), an(s))) e.canAutoFreeze_ = !1;
		else return;
	} else i && n.add(a);
	if (gt(a) && !ml(a)) {
		if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1)
			return;
		gl(e, a),
			(!t || !t.scope_.parent_) &&
				typeof r != "symbol" &&
				Object.prototype.propertyIsEnumerable.call(n, r) &&
				vl(e, a);
	}
}
function vl(e, t, n = !1) {
	!e.parent_ &&
		e.immer_.autoFreeze_ &&
		e.canAutoFreeze_ &&
		Jo(t, n);
}
function Fg(e, t) {
	const n = Array.isArray(e),
		r = {
			type_: n ? 1 : 0,
			scope_: t ? t.scope_ : hf(),
			modified_: !1,
			finalized_: !1,
			assigned_: {},
			parent_: t,
			base_: e,
			draft_: null,
			copy_: null,
			revoke_: null,
			isManual_: !1,
		};
	let a = r,
		l = ns;
	n && ((a = [r]), (l = Fr));
	const { revoke: i, proxy: o } = Proxy.revocable(a, l);
	return (r.draft_ = o), (r.revoke_ = i), o;
}
var ns = {
		get(e, t) {
			if (t === Ie) return e;
			const n = ln(e);
			if (!Ko(n, t)) return $g(e, n, t);
			const r = n[t];
			return e.finalized_ || !gt(r)
				? r
				: r === rs(e.base_, t)
				? (ls(e), (e.copy_[t] = is(r, e)))
				: r;
		},
		has(e, t) {
			return t in ln(e);
		},
		ownKeys(e) {
			return Reflect.ownKeys(ln(e));
		},
		set(e, t, n) {
			const r = bf(ln(e), t);
			if (r != null && r.set)
				return r.set.call(e.draft_, n), !0;
			if (!e.modified_) {
				const a = rs(ln(e), t),
					l = a == null ? void 0 : a[Ie];
				if (l && l.base_ === n)
					return (e.copy_[t] = n), (e.assigned_[t] = !1), !0;
				if (Ig(n, a) && (n !== void 0 || Ko(e.base_, t)))
					return !0;
				ls(e), as(e);
			}
			return (
				(e.copy_[t] === n && (n !== void 0 || t in e.copy_)) ||
					(Number.isNaN(n) && Number.isNaN(e.copy_[t])) ||
					((e.copy_[t] = n), (e.assigned_[t] = !0)),
				!0
			);
		},
		deleteProperty(e, t) {
			return (
				rs(e.base_, t) !== void 0 || t in e.base_
					? ((e.assigned_[t] = !1), ls(e), as(e))
					: delete e.assigned_[t],
				e.copy_ && delete e.copy_[t],
				!0
			);
		},
		getOwnPropertyDescriptor(e, t) {
			const n = ln(e),
				r = Reflect.getOwnPropertyDescriptor(n, t);
			return (
				r && {
					writable: !0,
					configurable: e.type_ !== 1 || t !== "length",
					enumerable: r.enumerable,
					value: n[t],
				}
			);
		},
		defineProperty() {
			Ke(11);
		},
		getPrototypeOf(e) {
			return Vn(e.base_);
		},
		setPrototypeOf() {
			Ke(12);
		},
	},
	Fr = {};
dl(ns, (e, t) => {
	Fr[e] = function () {
		return (
			(arguments[0] = arguments[0][0]),
			t.apply(this, arguments)
		);
	};
}),
	(Fr.deleteProperty = function (e, t) {
		return Fr.set.call(this, e, t, void 0);
	}),
	(Fr.set = function (e, t, n) {
		return ns.set.call(this, e[0], t, n, e[0]);
	});
function rs(e, t) {
	const n = e[Ie];
	return (n ? ln(n) : e)[t];
}
function $g(e, t, n) {
	var a;
	const r = bf(t, n);
	return r
		? "value" in r
			? r.value
			: (a = r.get) == null
			? void 0
			: a.call(e.draft_)
		: void 0;
}
function bf(e, t) {
	if (!(t in e)) return;
	let n = Vn(e);
	for (; n; ) {
		const r = Object.getOwnPropertyDescriptor(n, t);
		if (r) return r;
		n = Vn(n);
	}
}
function as(e) {
	e.modified_ ||
		((e.modified_ = !0), e.parent_ && as(e.parent_));
}
function ls(e) {
	e.copy_ ||
		(e.copy_ = Zo(
			e.base_,
			e.scope_.immer_.useStrictShallowCopy_
		));
}
var Bg = class {
	constructor(e) {
		(this.autoFreeze_ = !0),
			(this.useStrictShallowCopy_ = !1),
			(this.produce = (t, n, r) => {
				if (typeof t == "function" && typeof n != "function") {
					const l = n;
					n = t;
					const i = this;
					return function (o = l, ...s) {
						return i.produce(o, (c) => n.call(this, c, ...s));
					};
				}
				typeof n != "function" && Ke(6),
					r !== void 0 && typeof r != "function" && Ke(7);
				let a;
				if (gt(t)) {
					const l = gf(this),
						i = is(t, void 0);
					let o = !0;
					try {
						(a = n(i)), (o = !1);
					} finally {
						o ? es(l) : ts(l);
					}
					return mf(l, r), vf(a, l);
				} else if (!t || typeof t != "object") {
					if (
						((a = n(t)),
						a === void 0 && (a = t),
						a === cf && (a = void 0),
						this.autoFreeze_ && Jo(a, !0),
						r)
					) {
						const l = [],
							i = [];
						on("Patches").generateReplacementPatches_(t, a, l, i),
							r(l, i);
					}
					return a;
				} else Ke(1, t);
			}),
			(this.produceWithPatches = (t, n) => {
				if (typeof t == "function")
					return (l, ...i) =>
						this.produceWithPatches(l, (o) => t(o, ...i));
				let r, a;
				return [
					this.produce(t, n, (l, i) => {
						(r = l), (a = i);
					}),
					r,
					a,
				];
			}),
			typeof (e == null ? void 0 : e.autoFreeze) ==
				"boolean" && this.setAutoFreeze(e.autoFreeze),
			typeof (e == null ? void 0 : e.useStrictShallowCopy) ==
				"boolean" &&
				this.setUseStrictShallowCopy(e.useStrictShallowCopy);
	}
	createDraft(e) {
		gt(e) || Ke(8), an(e) && (e = Vg(e));
		const t = gf(this),
			n = is(e, void 0);
		return (n[Ie].isManual_ = !0), ts(t), n;
	}
	finishDraft(e, t) {
		const n = e && e[Ie];
		(!n || !n.isManual_) && Ke(9);
		const { scope_: r } = n;
		return mf(r, t), vf(void 0, r);
	}
	setAutoFreeze(e) {
		this.autoFreeze_ = e;
	}
	setUseStrictShallowCopy(e) {
		this.useStrictShallowCopy_ = e;
	}
	applyPatches(e, t) {
		let n;
		for (n = t.length - 1; n >= 0; n--) {
			const a = t[n];
			if (a.path.length === 0 && a.op === "replace") {
				e = a.value;
				break;
			}
		}
		n > -1 && (t = t.slice(n + 1));
		const r = on("Patches").applyPatches_;
		return an(e) ? r(e, t) : this.produce(e, (a) => r(a, t));
	}
};
function is(e, t) {
	const n = pl(e)
		? on("MapSet").proxyMap_(e, t)
		: hl(e)
		? on("MapSet").proxySet_(e, t)
		: Fg(e, t);
	return (t ? t.scope_ : hf()).drafts_.push(n), n;
}
function Vg(e) {
	return an(e) || Ke(10, e), wf(e);
}
function wf(e) {
	if (!gt(e) || ml(e)) return e;
	const t = e[Ie];
	let n;
	if (t) {
		if (!t.modified_) return t.base_;
		(t.finalized_ = !0),
			(n = Zo(e, t.scope_.immer_.useStrictShallowCopy_));
	} else n = Zo(e, !0);
	return (
		dl(n, (r, a) => {
			pf(n, r, wf(a));
		}),
		t && (t.finalized_ = !1),
		n
	);
}
var je = new Bg(),
	Sf = je.produce;
je.produceWithPatches.bind(je),
	je.setAutoFreeze.bind(je),
	je.setUseStrictShallowCopy.bind(je),
	je.applyPatches.bind(je),
	je.createDraft.bind(je),
	je.finishDraft.bind(je);
function xf(e) {
	return ({ dispatch: t, getState: n }) =>
		(r) =>
		(a) =>
			typeof a == "function" ? a(t, n, e) : r(a);
}
var Hg = xf(),
	Ug = xf,
	Wg =
		typeof window < "u" &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
			: function () {
					if (arguments.length !== 0)
						return typeof arguments[0] == "object"
							? cl
							: cl.apply(null, arguments);
			  };
function kf(e, t) {
	function n(...r) {
		if (t) {
			let a = t(...r);
			if (!a) throw new Error(rt(0));
			return {
				type: e,
				payload: a.payload,
				...("meta" in a && { meta: a.meta }),
				...("error" in a && { error: a.error }),
			};
		}
		return { type: e, payload: r[0] };
	}
	return (
		(n.toString = () => `${e}`),
		(n.type = e),
		(n.match = (r) => Mg(r) && r.type === e),
		n
	);
}
var Ef = class Wr extends Array {
	constructor(...t) {
		super(...t), Object.setPrototypeOf(this, Wr.prototype);
	}
	static get [Symbol.species]() {
		return Wr;
	}
	concat(...t) {
		return super.concat.apply(this, t);
	}
	prepend(...t) {
		return t.length === 1 && Array.isArray(t[0])
			? new Wr(...t[0].concat(this))
			: new Wr(...t.concat(this));
	}
};
function Cf(e) {
	return gt(e) ? Sf(e, () => {}) : e;
}
function Tf(e, t, n) {
	if (e.has(t)) {
		let a = e.get(t);
		return (
			n.update && ((a = n.update(a, t, e)), e.set(t, a)), a
		);
	}
	if (!n.insert) throw new Error(rt(10));
	const r = n.insert(t, e);
	return e.set(t, r), r;
}
function Gg(e) {
	return typeof e == "boolean";
}
var qg = () =>
		function (e) {
			const {
				thunk: t = !0,
				immutableCheck: n = !0,
				serializableCheck: r = !0,
				actionCreatorCheck: a = !0,
			} = e ?? {};
			let l = new Ef();
			return (
				t && (Gg(t) ? l.push(Hg) : l.push(Ug(t.extraArgument))),
				l
			);
		},
	Qg = "RTK_autoBatch",
	_f = (e) => (t) => {
		setTimeout(t, e);
	},
	Xg =
		typeof window < "u" && window.requestAnimationFrame
			? window.requestAnimationFrame
			: _f(10),
	Yg =
		(e = { type: "raf" }) =>
		(t) =>
		(...n) => {
			const r = t(...n);
			let a = !0,
				l = !1,
				i = !1;
			const o = new Set(),
				s =
					e.type === "tick"
						? queueMicrotask
						: e.type === "raf"
						? Xg
						: e.type === "callback"
						? e.queueNotification
						: _f(e.timeout),
				c = () => {
					(i = !1), l && ((l = !1), o.forEach((d) => d()));
				};
			return Object.assign({}, r, {
				subscribe(d) {
					const f = () => a && d(),
						m = r.subscribe(f);
					return (
						o.add(d),
						() => {
							m(), o.delete(d);
						}
					);
				},
				dispatch(d) {
					var f;
					try {
						return (
							(a = !(
								(f = d == null ? void 0 : d.meta) != null && f[Qg]
							)),
							(l = !a),
							l && (i || ((i = !0), s(c))),
							r.dispatch(d)
						);
					} finally {
						a = !0;
					}
				},
			});
		},
	Kg = (e) =>
		function (t) {
			const { autoBatch: n = !0 } = t ?? {};
			let r = new Ef(e);
			return (
				n && r.push(Yg(typeof n == "object" ? n : void 0)), r
			);
		};
function Zg(e) {
	const t = qg(),
		{
			reducer: n = void 0,
			middleware: r,
			devTools: a = !0,
			preloadedState: l = void 0,
			enhancers: i = void 0,
		} = e || {};
	let o;
	if (typeof n == "function") o = n;
	else if (Yo(n)) o = Lg(n);
	else throw new Error(rt(1));
	let s;
	typeof r == "function" ? (s = r(t)) : (s = t());
	let c = cl;
	a &&
		(c = Wg({ trace: !1, ...(typeof a == "object" && a) }));
	const d = zg(...s),
		f = Kg(d);
	let m = typeof i == "function" ? i(f) : f();
	const v = c(...m);
	return uf(o, l, v);
}
function Pf(e) {
	const t = {},
		n = [];
	let r;
	const a = {
		addCase(l, i) {
			const o = typeof l == "string" ? l : l.type;
			if (!o) throw new Error(rt(28));
			if (o in t) throw new Error(rt(29));
			return (t[o] = i), a;
		},
		addMatcher(l, i) {
			return n.push({ matcher: l, reducer: i }), a;
		},
		addDefaultCase(l) {
			return (r = l), a;
		},
	};
	return e(a), [t, n, r];
}
function Jg(e) {
	return typeof e == "function";
}
function ev(e, t) {
	let [n, r, a] = Pf(t),
		l;
	if (Jg(e)) l = () => Cf(e());
	else {
		const o = Cf(e);
		l = () => o;
	}
	function i(o = l(), s) {
		let c = [
			n[s.type],
			...r
				.filter(({ matcher: d }) => d(s))
				.map(({ reducer: d }) => d),
		];
		return (
			c.filter((d) => !!d).length === 0 && (c = [a]),
			c.reduce((d, f) => {
				if (f)
					if (an(d)) {
						const m = f(d, s);
						return m === void 0 ? d : m;
					} else {
						if (gt(d)) return Sf(d, (m) => f(m, s));
						{
							const m = f(d, s);
							if (m === void 0) {
								if (d === null) return d;
								throw Error(
									"A case reducer on a non-draftable value must not return undefined"
								);
							}
							return m;
						}
					}
				return d;
			}, o)
		);
	}
	return (i.getInitialState = l), i;
}
var tv = Symbol.for("rtk-slice-createasyncthunk");
function nv(e, t) {
	return `${e}/${t}`;
}
function rv({ creators: e } = {}) {
	var n;
	const t =
		(n = e == null ? void 0 : e.asyncThunk) == null
			? void 0
			: n[tv];
	return function (r) {
		const { name: a, reducerPath: l = a } = r;
		if (!a) throw new Error(rt(11));
		typeof process < "u";
		const i =
				(typeof r.reducers == "function"
					? r.reducers(iv())
					: r.reducers) || {},
			o = Object.keys(i),
			s = {
				sliceCaseReducersByName: {},
				sliceCaseReducersByType: {},
				actionCreators: {},
				sliceMatchers: [],
			},
			c = {
				addCase(u, p) {
					const y = typeof u == "string" ? u : u.type;
					if (!y) throw new Error(rt(12));
					if (y in s.sliceCaseReducersByType)
						throw new Error(rt(13));
					return (s.sliceCaseReducersByType[y] = p), c;
				},
				addMatcher(u, p) {
					return (
						s.sliceMatchers.push({ matcher: u, reducer: p }), c
					);
				},
				exposeAction(u, p) {
					return (s.actionCreators[u] = p), c;
				},
				exposeCaseReducer(u, p) {
					return (s.sliceCaseReducersByName[u] = p), c;
				},
			};
		o.forEach((u) => {
			const p = i[u],
				y = {
					reducerName: u,
					type: nv(a, u),
					createNotation: typeof r.reducers == "function",
				};
			sv(p) ? cv(y, p, c, t) : ov(y, p, c);
		});
		function d() {
			const [u = {}, p = [], y = void 0] =
					typeof r.extraReducers == "function"
						? Pf(r.extraReducers)
						: [r.extraReducers],
				S = { ...u, ...s.sliceCaseReducersByType };
			return ev(r.initialState, (x) => {
				for (let E in S) x.addCase(E, S[E]);
				for (let E of s.sliceMatchers)
					x.addMatcher(E.matcher, E.reducer);
				for (let E of p) x.addMatcher(E.matcher, E.reducer);
				y && x.addDefaultCase(y);
			});
		}
		const f = (u) => u,
			m = new Map();
		let v;
		function g(u, p) {
			return v || (v = d()), v(u, p);
		}
		function b() {
			return v || (v = d()), v.getInitialState();
		}
		function w(u, p = !1) {
			function y(x) {
				let E = x[u];
				return typeof E > "u" && p && (E = b()), E;
			}
			function S(x = f) {
				const E = Tf(m, p, { insert: () => new WeakMap() });
				return Tf(E, x, {
					insert: () => {
						const T = {};
						for (const [P, k] of Object.entries(
							r.selectors ?? {}
						))
							T[P] = av(k, x, b, p);
						return T;
					},
				});
			}
			return {
				reducerPath: u,
				getSelectors: S,
				get selectors() {
					return S(y);
				},
				selectSlice: y,
			};
		}
		const h = {
			name: a,
			reducer: g,
			actions: s.actionCreators,
			caseReducers: s.sliceCaseReducersByName,
			getInitialState: b,
			...w(l),
			injectInto(u, { reducerPath: p, ...y } = {}) {
				const S = p ?? l;
				return (
					u.inject({ reducerPath: S, reducer: g }, y),
					{ ...h, ...w(S, !0) }
				);
			},
		};
		return h;
	};
}
function av(e, t, n, r) {
	function a(l, ...i) {
		let o = t(l);
		return typeof o > "u" && r && (o = n()), e(o, ...i);
	}
	return (a.unwrapped = e), a;
}
var lv = rv();
function iv() {
	function e(t, n) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator: t,
			...n,
		};
	}
	return (
		(e.withTypes = () => e),
		{
			reducer(t) {
				return Object.assign(
					{
						[t.name](...n) {
							return t(...n);
						},
					}[t.name],
					{ _reducerDefinitionType: "reducer" }
				);
			},
			preparedReducer(t, n) {
				return {
					_reducerDefinitionType: "reducerWithPrepare",
					prepare: t,
					reducer: n,
				};
			},
			asyncThunk: e,
		}
	);
}
function ov(
	{ type: e, reducerName: t, createNotation: n },
	r,
	a
) {
	let l, i;
	if ("reducer" in r) {
		if (n && !uv(r)) throw new Error(rt(17));
		(l = r.reducer), (i = r.prepare);
	} else l = r;
	a.addCase(e, l)
		.exposeCaseReducer(t, l)
		.exposeAction(t, i ? kf(e, i) : kf(e));
}
function sv(e) {
	return e._reducerDefinitionType === "asyncThunk";
}
function uv(e) {
	return e._reducerDefinitionType === "reducerWithPrepare";
}
function cv({ type: e, reducerName: t }, n, r, a) {
	if (!a) throw new Error(rt(18));
	const {
			payloadCreator: l,
			fulfilled: i,
			pending: o,
			rejected: s,
			settled: c,
			options: d,
		} = n,
		f = a(e, l, d);
	r.exposeAction(t, f),
		i && r.addCase(f.fulfilled, i),
		o && r.addCase(f.pending, o),
		s && r.addCase(f.rejected, s),
		c && r.addMatcher(f.settled, c),
		r.exposeCaseReducer(t, {
			fulfilled: i || yl,
			pending: o || yl,
			rejected: s || yl,
			settled: c || yl,
		});
}
function yl() {}
function rt(e) {
	return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const Of = lv({
		name: "theme",
		initialState: { darkMode: !0 },
		reducers: {
			toggleTheme(e) {
				(e.darkMode = !e.darkMode),
					localStorage.setItem(
						"theme",
						e.darkMode ? "dark" : "light"
					);
			},
			setTheme(e, t) {
				e.darkMode = t.payload === "dark";
			},
		},
	}),
	{ toggleTheme: dv, setTheme: fv } = Of.actions,
	Lf = (e) => e.theme.darkMode,
	pv = Of.reducer,
	hv = Zg({ reducer: { theme: pv } }),
	mv = "/assets/bharatbhusal-BiGoHfbz.jpeg";
var zf = {
		color: void 0,
		size: void 0,
		className: void 0,
		style: void 0,
		attr: void 0,
	},
	Mf = H.createContext && H.createContext(zf),
	gv = ["attr", "size", "title"];
function vv(e, t) {
	if (e == null) return {};
	var n = yv(e, t),
		r,
		a;
	if (Object.getOwnPropertySymbols) {
		var l = Object.getOwnPropertySymbols(e);
		for (a = 0; a < l.length; a++)
			(r = l[a]),
				!(t.indexOf(r) >= 0) &&
					Object.prototype.propertyIsEnumerable.call(e, r) &&
					(n[r] = e[r]);
	}
	return n;
}
function yv(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e)
		if (Object.prototype.hasOwnProperty.call(e, r)) {
			if (t.indexOf(r) >= 0) continue;
			n[r] = e[r];
		}
	return n;
}
function bl() {
	return (
		(bl = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n)
							Object.prototype.hasOwnProperty.call(n, r) &&
								(e[r] = n[r]);
					}
					return e;
			  }),
		bl.apply(this, arguments)
	);
}
function Nf(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t &&
			(r = r.filter(function (a) {
				return Object.getOwnPropertyDescriptor(e, a).enumerable;
			})),
			n.push.apply(n, r);
	}
	return n;
}
function wl(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] != null ? arguments[t] : {};
		t % 2
			? Nf(Object(n), !0).forEach(function (r) {
					bv(e, r, n[r]);
			  })
			: Object.getOwnPropertyDescriptors
			? Object.defineProperties(
					e,
					Object.getOwnPropertyDescriptors(n)
			  )
			: Nf(Object(n)).forEach(function (r) {
					Object.defineProperty(
						e,
						r,
						Object.getOwnPropertyDescriptor(n, r)
					);
			  });
	}
	return e;
}
function bv(e, t, n) {
	return (
		(t = wv(t)),
		t in e
			? Object.defineProperty(e, t, {
					value: n,
					enumerable: !0,
					configurable: !0,
					writable: !0,
			  })
			: (e[t] = n),
		e
	);
}
function wv(e) {
	var t = Sv(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Sv(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw new TypeError(
			"@@toPrimitive must return a primitive value."
		);
	}
	return (t === "string" ? String : Number)(e);
}
function If(e) {
	return (
		e &&
		e.map((t, n) =>
			H.createElement(
				t.tag,
				wl({ key: n }, t.attr),
				If(t.child)
			)
		)
	);
}
function Te(e) {
	return (t) =>
		H.createElement(
			xv,
			bl({ attr: wl({}, e.attr) }, t),
			If(e.child)
		);
}
function xv(e) {
	var t = (n) => {
		var { attr: r, size: a, title: l } = e,
			i = vv(e, gv),
			o = a || n.size || "1em",
			s;
		return (
			n.className && (s = n.className),
			e.className && (s = (s ? s + " " : "") + e.className),
			H.createElement(
				"svg",
				bl(
					{
						stroke: "currentColor",
						fill: "currentColor",
						strokeWidth: "0",
					},
					n.attr,
					r,
					i,
					{
						className: s,
						style: wl(
							wl({ color: e.color || n.color }, n.style),
							e.style
						),
						height: o,
						width: o,
						xmlns: "http://www.w3.org/2000/svg",
					}
				),
				l && H.createElement("title", null, l),
				e.children
			)
		);
	};
	return Mf !== void 0
		? H.createElement(Mf.Consumer, null, (n) => t(n))
		: t(zf);
}
function kv(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 16 16", fill: "currentColor" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 13V2a6 6 0 1 1 0 12z",
				},
				child: [],
			},
		],
	})(e);
}
const Hn = () => {
	const e = Tg(),
		t = af(Lf);
	return (
		O.useEffect(() => {
			const n = localStorage.getItem("theme");
			n && e(fv(n));
		}, [e]),
		{
			darkMode: t,
			toggleTheme: () => {
				e(dv());
			},
		}
	);
};
var jf = { exports: {} },
	Ev = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",
	Cv = Ev,
	Tv = Cv;
function Rf() {}
function Af() {}
Af.resetWarningCache = Rf;
var _v = function () {
	function e(r, a, l, i, o, s) {
		if (s !== Tv) {
			var c = new Error(
				"Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
			);
			throw ((c.name = "Invariant Violation"), c);
		}
	}
	e.isRequired = e;
	function t() {
		return e;
	}
	var n = {
		array: e,
		bigint: e,
		bool: e,
		func: e,
		number: e,
		object: e,
		string: e,
		symbol: e,
		any: e,
		arrayOf: t,
		element: e,
		elementType: e,
		instanceOf: t,
		node: e,
		objectOf: t,
		oneOf: t,
		oneOfType: t,
		shape: t,
		exact: t,
		checkPropTypes: Af,
		resetWarningCache: Rf,
	};
	return (n.PropTypes = n), n;
};
jf.exports = _v();
var Pv = jf.exports;
const $ = Os(Pv),
	at = ({
		label: e,
		onClick: t,
		className: n,
		type: r = "button",
		variant: a = "filled",
	}) => {
		const l = af(Lf),
			i =
				a === "filled"
					? "bg-gray-800 text-white hover:bg-gray-700"
					: l
					? "bg-transparent text-white hover:bg-gray-700"
					: "bg-transparent text-black hover:bg-gray-200";
		return C.jsx("button", {
			type: r,
			onClick: t,
			className: `shadow-lg transition duration-200 hover:text-green-600 rounded-full ${i} ${n}`,
			children: e,
		});
	};
at.propTypes = {
	label: $.node.isRequired,
	onClick: $.func,
	className: $.string,
	type: $.string,
	variant: $.oneOf(["filled", "outline"]),
};
function Ov() {
	const { toggleTheme: e } = Hn();
	return C.jsx(at, {
		label: C.jsx(kv, {}),
		onClick: e,
		variant: "filled",
		className: "fixed bottom-5 right-5 p-3",
	});
}
function Df(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 512 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z",
				},
				child: [],
			},
		],
	})(e);
}
function Lv(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 496 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
				},
				child: [],
			},
		],
	})(e);
}
function os(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 448 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
				},
				child: [],
			},
		],
	})(e);
}
function Ff(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 448 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
				},
				child: [],
			},
		],
	})(e);
}
function $r(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 496 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z",
				},
				child: [],
			},
		],
	})(e);
}
function zv(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 576 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z",
				},
				child: [],
			},
		],
	})(e);
}
function Un(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 512 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z",
				},
				child: [],
			},
		],
	})(e);
}
function Mv(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 640 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z",
				},
				child: [],
			},
		],
	})(e);
}
function Nv(e) {
	return Te({
		tag: "svg",
		attr: { role: "img", viewBox: "0 0 24 24" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z",
				},
				child: [],
			},
		],
	})(e);
}
const Iv = [
	{
		href: "https://github.com/bharatbhusal",
		icon: C.jsx(Lv, { className: "text-2xl" }),
		label: "GitHub",
	},
	{
		href: "https://twitter.com/bharatbhusal02",
		icon: C.jsx(Un, { className: "text-2xl" }),
		label: "Twitter",
	},
	{
		href: "https://t.me/petermartin0",
		icon: C.jsx($r, { className: "text-2xl" }),
		label: "Telegram",
	},
	{
		href: "https://substack.com/@bharatbhusal",
		icon: C.jsx(Nv, { className: "text-2xl" }),
		label: "Substack",
	},
	{
		href: "https://linkedin.com/in/bharatbhusal/",
		icon: C.jsx(Ff, { className: "text-2xl" }),
		label: "LinkedIn",
	},
	{
		href: "https://www.instagram.com/bharatbhusal",
		icon: C.jsx(os, { className: "text-2xl" }),
		label: "Instagram",
	},
];
function jv() {
	return C.jsx("div", {
		className: "mt-4 flex justify-center space-x-2",
		children: Iv.map((e, t) =>
			C.jsx(
				at,
				{
					label: e.icon,
					onClick: () =>
						window.open(e.href, "_blank", "noopener,noreferrer"),
					variant: "outline",
					className: "p-3",
				},
				t
			)
		),
	});
}
function Rv(e) {
	return Te({
		tag: "svg",
		attr: {
			viewBox: "0 0 24 24",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round",
			strokeLinejoin: "round",
		},
		child: [
			{
				tag: "rect",
				attr: {
					width: "18",
					height: "18",
					x: "3",
					y: "3",
					rx: "2",
				},
				child: [],
			},
			{ tag: "path", attr: { d: "M7 8h10" }, child: [] },
			{ tag: "path", attr: { d: "M7 12h10" }, child: [] },
			{ tag: "path", attr: { d: "M7 16h10" }, child: [] },
		],
	})(e);
}
function Av(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 256 256", fill: "currentColor" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Z",
				},
				child: [],
			},
		],
	})(e);
}
/**
 * @remix-run/router v1.20.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Br() {
	return (
		(Br = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n)
							Object.prototype.hasOwnProperty.call(n, r) &&
								(e[r] = n[r]);
					}
					return e;
			  }),
		Br.apply(this, arguments)
	);
}
var Ft;
(function (e) {
	(e.Pop = "POP"),
		(e.Push = "PUSH"),
		(e.Replace = "REPLACE");
})(Ft || (Ft = {}));
const $f = "popstate";
function Dv(e) {
	e === void 0 && (e = {});
	function t(r, a) {
		let { pathname: l, search: i, hash: o } = r.location;
		return ss(
			"",
			{ pathname: l, search: i, hash: o },
			(a.state && a.state.usr) || null,
			(a.state && a.state.key) || "default"
		);
	}
	function n(r, a) {
		return typeof a == "string" ? a : Hf(a);
	}
	return $v(t, n, null, e);
}
function ae(e, t) {
	if (e === !1 || e === null || typeof e > "u")
		throw new Error(t);
}
function Bf(e, t) {
	if (!e) {
		typeof console < "u" && console.warn(t);
		try {
			throw new Error(t);
		} catch {}
	}
}
function Fv() {
	return Math.random().toString(36).substr(2, 8);
}
function Vf(e, t) {
	return { usr: e.state, key: e.key, idx: t };
}
function ss(e, t, n, r) {
	return (
		n === void 0 && (n = null),
		Br(
			{
				pathname: typeof e == "string" ? e : e.pathname,
				search: "",
				hash: "",
			},
			typeof t == "string" ? Wn(t) : t,
			{ state: n, key: (t && t.key) || r || Fv() }
		)
	);
}
function Hf(e) {
	let {
		pathname: t = "/",
		search: n = "",
		hash: r = "",
	} = e;
	return (
		n &&
			n !== "?" &&
			(t += n.charAt(0) === "?" ? n : "?" + n),
		r &&
			r !== "#" &&
			(t += r.charAt(0) === "#" ? r : "#" + r),
		t
	);
}
function Wn(e) {
	let t = {};
	if (e) {
		let n = e.indexOf("#");
		n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
		let r = e.indexOf("?");
		r >= 0 &&
			((t.search = e.substr(r)), (e = e.substr(0, r))),
			e && (t.pathname = e);
	}
	return t;
}
function $v(e, t, n, r) {
	r === void 0 && (r = {});
	let {
			window: a = document.defaultView,
			v5Compat: l = !1,
		} = r,
		i = a.history,
		o = Ft.Pop,
		s = null,
		c = d();
	c == null &&
		((c = 0),
		i.replaceState(Br({}, i.state, { idx: c }), ""));
	function d() {
		return (i.state || { idx: null }).idx;
	}
	function f() {
		o = Ft.Pop;
		let w = d(),
			h = w == null ? null : w - c;
		(c = w),
			s && s({ action: o, location: b.location, delta: h });
	}
	function m(w, h) {
		o = Ft.Push;
		let u = ss(b.location, w, h);
		c = d() + 1;
		let p = Vf(u, c),
			y = b.createHref(u);
		try {
			i.pushState(p, "", y);
		} catch (S) {
			if (
				S instanceof DOMException &&
				S.name === "DataCloneError"
			)
				throw S;
			a.location.assign(y);
		}
		l &&
			s &&
			s({ action: o, location: b.location, delta: 1 });
	}
	function v(w, h) {
		o = Ft.Replace;
		let u = ss(b.location, w, h);
		c = d();
		let p = Vf(u, c),
			y = b.createHref(u);
		i.replaceState(p, "", y),
			l &&
				s &&
				s({ action: o, location: b.location, delta: 0 });
	}
	function g(w) {
		let h =
				a.location.origin !== "null"
					? a.location.origin
					: a.location.href,
			u = typeof w == "string" ? w : Hf(w);
		return (
			(u = u.replace(/ $/, "%20")),
			ae(
				h,
				"No window.location.(origin|href) available to create URL for href: " +
					u
			),
			new URL(u, h)
		);
	}
	let b = {
		get action() {
			return o;
		},
		get location() {
			return e(a, i);
		},
		listen(w) {
			if (s)
				throw new Error(
					"A history only accepts one active listener"
				);
			return (
				a.addEventListener($f, f),
				(s = w),
				() => {
					a.removeEventListener($f, f), (s = null);
				}
			);
		},
		createHref(w) {
			return t(a, w);
		},
		createURL: g,
		encodeLocation(w) {
			let h = g(w);
			return {
				pathname: h.pathname,
				search: h.search,
				hash: h.hash,
			};
		},
		push: m,
		replace: v,
		go(w) {
			return i.go(w);
		},
	};
	return b;
}
var Uf;
(function (e) {
	(e.data = "data"),
		(e.deferred = "deferred"),
		(e.redirect = "redirect"),
		(e.error = "error");
})(Uf || (Uf = {}));
function Bv(e, t, n) {
	return n === void 0 && (n = "/"), Vv(e, t, n, !1);
}
function Vv(e, t, n, r) {
	let a = typeof t == "string" ? Wn(t) : t,
		l = Xf(a.pathname || "/", n);
	if (l == null) return null;
	let i = Wf(e);
	Hv(i);
	let o = null;
	for (let s = 0; o == null && s < i.length; ++s) {
		let c = e0(l);
		o = Zv(i[s], c, r);
	}
	return o;
}
function Wf(e, t, n, r) {
	t === void 0 && (t = []),
		n === void 0 && (n = []),
		r === void 0 && (r = "");
	let a = (l, i, o) => {
		let s = {
			relativePath: o === void 0 ? l.path || "" : o,
			caseSensitive: l.caseSensitive === !0,
			childrenIndex: i,
			route: l,
		};
		s.relativePath.startsWith("/") &&
			(ae(
				s.relativePath.startsWith(r),
				'Absolute route path "' +
					s.relativePath +
					'" nested under path ' +
					('"' +
						r +
						'" is not valid. An absolute child route path ') +
					"must start with the combined path of all its parent routes."
			),
			(s.relativePath = s.relativePath.slice(r.length)));
		let c = sn([r, s.relativePath]),
			d = n.concat(s);
		l.children &&
			l.children.length > 0 &&
			(ae(
				l.index !== !0,
				"Index routes must not have child routes. Please remove " +
					('all child routes from route path "' + c + '".')
			),
			Wf(l.children, t, d, c)),
			!(l.path == null && !l.index) &&
				t.push({
					path: c,
					score: Yv(c, l.index),
					routesMeta: d,
				});
	};
	return (
		e.forEach((l, i) => {
			var o;
			if (
				l.path === "" ||
				!((o = l.path) != null && o.includes("?"))
			)
				a(l, i);
			else for (let s of Gf(l.path)) a(l, i, s);
		}),
		t
	);
}
function Gf(e) {
	let t = e.split("/");
	if (t.length === 0) return [];
	let [n, ...r] = t,
		a = n.endsWith("?"),
		l = n.replace(/\?$/, "");
	if (r.length === 0) return a ? [l, ""] : [l];
	let i = Gf(r.join("/")),
		o = [];
	return (
		o.push(
			...i.map((s) => (s === "" ? l : [l, s].join("/")))
		),
		a && o.push(...i),
		o.map((s) => (e.startsWith("/") && s === "" ? "/" : s))
	);
}
function Hv(e) {
	e.sort((t, n) =>
		t.score !== n.score
			? n.score - t.score
			: Kv(
					t.routesMeta.map((r) => r.childrenIndex),
					n.routesMeta.map((r) => r.childrenIndex)
			  )
	);
}
const Uv = /^:[\w-]+$/,
	Wv = 3,
	Gv = 2,
	qv = 1,
	Qv = 10,
	Xv = -2,
	qf = (e) => e === "*";
function Yv(e, t) {
	let n = e.split("/"),
		r = n.length;
	return (
		n.some(qf) && (r += Xv),
		t && (r += Gv),
		n
			.filter((a) => !qf(a))
			.reduce(
				(a, l) => a + (Uv.test(l) ? Wv : l === "" ? qv : Qv),
				r
			)
	);
}
function Kv(e, t) {
	return e.length === t.length &&
		e.slice(0, -1).every((n, r) => n === t[r])
		? e[e.length - 1] - t[t.length - 1]
		: 0;
}
function Zv(e, t, n) {
	let { routesMeta: r } = e,
		a = {},
		l = "/",
		i = [];
	for (let o = 0; o < r.length; ++o) {
		let s = r[o],
			c = o === r.length - 1,
			d = l === "/" ? t : t.slice(l.length) || "/",
			f = Qf(
				{
					path: s.relativePath,
					caseSensitive: s.caseSensitive,
					end: c,
				},
				d
			),
			m = s.route;
		if (
			(!f &&
				c &&
				n &&
				!r[r.length - 1].route.index &&
				(f = Qf(
					{
						path: s.relativePath,
						caseSensitive: s.caseSensitive,
						end: !1,
					},
					d
				)),
			!f)
		)
			return null;
		Object.assign(a, f.params),
			i.push({
				params: a,
				pathname: sn([l, f.pathname]),
				pathnameBase: i0(sn([l, f.pathnameBase])),
				route: m,
			}),
			f.pathnameBase !== "/" && (l = sn([l, f.pathnameBase]));
	}
	return i;
}
function Qf(e, t) {
	typeof e == "string" &&
		(e = { path: e, caseSensitive: !1, end: !0 });
	let [n, r] = Jv(e.path, e.caseSensitive, e.end),
		a = t.match(n);
	if (!a) return null;
	let l = a[0],
		i = l.replace(/(.)\/+$/, "$1"),
		o = a.slice(1);
	return {
		params: r.reduce((s, c, d) => {
			let { paramName: f, isOptional: m } = c;
			if (f === "*") {
				let g = o[d] || "";
				i = l
					.slice(0, l.length - g.length)
					.replace(/(.)\/+$/, "$1");
			}
			const v = o[d];
			return (
				m && !v
					? (s[f] = void 0)
					: (s[f] = (v || "").replace(/%2F/g, "/")),
				s
			);
		}, {}),
		pathname: l,
		pathnameBase: i,
		pattern: e,
	};
}
function Jv(e, t, n) {
	t === void 0 && (t = !1),
		n === void 0 && (n = !0),
		Bf(
			e === "*" || !e.endsWith("*") || e.endsWith("/*"),
			'Route path "' +
				e +
				'" will be treated as if it were ' +
				('"' +
					e.replace(/\*$/, "/*") +
					'" because the `*` character must ') +
				"always follow a `/` in the pattern. To get rid of this warning, " +
				('please change the route path to "' +
					e.replace(/\*$/, "/*") +
					'".')
		);
	let r = [],
		a =
			"^" +
			e
				.replace(/\/*\*?$/, "")
				.replace(/^\/*/, "/")
				.replace(/[\\.*+^${}|()[\]]/g, "\\$&")
				.replace(
					/\/:([\w-]+)(\?)?/g,
					(l, i, o) => (
						r.push({ paramName: i, isOptional: o != null }),
						o ? "/?([^\\/]+)?" : "/([^\\/]+)"
					)
				);
	return (
		e.endsWith("*")
			? (r.push({ paramName: "*" }),
			  (a +=
					e === "*" || e === "/*"
						? "(.*)$"
						: "(?:\\/(.+)|\\/*)$"))
			: n
			? (a += "\\/*$")
			: e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"),
		[new RegExp(a, t ? void 0 : "i"), r]
	);
}
function e0(e) {
	try {
		return e
			.split("/")
			.map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
			.join("/");
	} catch (t) {
		return (
			Bf(
				!1,
				'The URL path "' +
					e +
					'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
					("encoding (" + t + ").")
			),
			e
		);
	}
}
function Xf(e, t) {
	if (t === "/") return e;
	if (!e.toLowerCase().startsWith(t.toLowerCase()))
		return null;
	let n = t.endsWith("/") ? t.length - 1 : t.length,
		r = e.charAt(n);
	return r && r !== "/" ? null : e.slice(n) || "/";
}
function t0(e, t) {
	t === void 0 && (t = "/");
	let {
		pathname: n,
		search: r = "",
		hash: a = "",
	} = typeof e == "string" ? Wn(e) : e;
	return {
		pathname: n ? (n.startsWith("/") ? n : n0(n, t)) : t,
		search: o0(r),
		hash: s0(a),
	};
}
function n0(e, t) {
	let n = t.replace(/\/+$/, "").split("/");
	return (
		e.split("/").forEach((r) => {
			r === ".."
				? n.length > 1 && n.pop()
				: r !== "." && n.push(r);
		}),
		n.length > 1 ? n.join("/") : "/"
	);
}
function us(e, t, n, r) {
	return (
		"Cannot include a '" +
		e +
		"' character in a manually specified " +
		("`to." +
			t +
			"` field [" +
			JSON.stringify(r) +
			"].  Please separate it out to the ") +
		("`to." +
			n +
			"` field. Alternatively you may provide the full path as ") +
		'a string in <Link to="..."> and the router will parse it for you.'
	);
}
function r0(e) {
	return e.filter(
		(t, n) =>
			n === 0 || (t.route.path && t.route.path.length > 0)
	);
}
function a0(e, t) {
	let n = r0(e);
	return t
		? n.map((r, a) =>
				a === n.length - 1 ? r.pathname : r.pathnameBase
		  )
		: n.map((r) => r.pathnameBase);
}
function l0(e, t, n, r) {
	r === void 0 && (r = !1);
	let a;
	typeof e == "string"
		? (a = Wn(e))
		: ((a = Br({}, e)),
		  ae(
				!a.pathname || !a.pathname.includes("?"),
				us("?", "pathname", "search", a)
		  ),
		  ae(
				!a.pathname || !a.pathname.includes("#"),
				us("#", "pathname", "hash", a)
		  ),
		  ae(
				!a.search || !a.search.includes("#"),
				us("#", "search", "hash", a)
		  ));
	let l = e === "" || a.pathname === "",
		i = l ? "/" : a.pathname,
		o;
	if (i == null) o = n;
	else {
		let f = t.length - 1;
		if (!r && i.startsWith("..")) {
			let m = i.split("/");
			for (; m[0] === ".."; ) m.shift(), (f -= 1);
			a.pathname = m.join("/");
		}
		o = f >= 0 ? t[f] : "/";
	}
	let s = t0(a, o),
		c = i && i !== "/" && i.endsWith("/"),
		d = (l || i === ".") && n.endsWith("/");
	return (
		!s.pathname.endsWith("/") &&
			(c || d) &&
			(s.pathname += "/"),
		s
	);
}
const sn = (e) => e.join("/").replace(/\/\/+/g, "/"),
	i0 = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
	o0 = (e) =>
		!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e,
	s0 = (e) =>
		!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function u0(e) {
	return (
		e != null &&
		typeof e.status == "number" &&
		typeof e.statusText == "string" &&
		typeof e.internal == "boolean" &&
		"data" in e
	);
}
const Yf = ["post", "put", "patch", "delete"];
new Set(Yf);
const c0 = ["get", ...Yf];
new Set(c0);
/**
 * React Router v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ function Vr() {
	return (
		(Vr = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n)
							Object.prototype.hasOwnProperty.call(n, r) &&
								(e[r] = n[r]);
					}
					return e;
			  }),
		Vr.apply(this, arguments)
	);
}
const cs = O.createContext(null),
	d0 = O.createContext(null),
	Sl = O.createContext(null),
	xl = O.createContext(null),
	un = O.createContext({
		outlet: null,
		matches: [],
		isDataRoute: !1,
	}),
	Kf = O.createContext(null);
function kl() {
	return O.useContext(xl) != null;
}
function Zf() {
	return kl() || ae(!1), O.useContext(xl).location;
}
function Jf(e) {
	O.useContext(Sl).static || O.useLayoutEffect(e);
}
function ds() {
	let { isDataRoute: e } = O.useContext(un);
	return e ? T0() : f0();
}
function f0() {
	kl() || ae(!1);
	let e = O.useContext(cs),
		{
			basename: t,
			future: n,
			navigator: r,
		} = O.useContext(Sl),
		{ matches: a } = O.useContext(un),
		{ pathname: l } = Zf(),
		i = JSON.stringify(a0(a, n.v7_relativeSplatPath)),
		o = O.useRef(!1);
	return (
		Jf(() => {
			o.current = !0;
		}),
		O.useCallback(
			function (s, c) {
				if ((c === void 0 && (c = {}), !o.current)) return;
				if (typeof s == "number") {
					r.go(s);
					return;
				}
				let d = l0(s, JSON.parse(i), l, c.relative === "path");
				e == null &&
					t !== "/" &&
					(d.pathname =
						d.pathname === "/" ? t : sn([t, d.pathname])),
					(c.replace ? r.replace : r.push)(d, c.state, c);
			},
			[t, r, i, l, e]
		)
	);
}
const p0 = O.createContext(null);
function h0(e) {
	let t = O.useContext(un).outlet;
	return t && O.createElement(p0.Provider, { value: e }, t);
}
function m0(e, t) {
	return g0(e, t);
}
function g0(e, t, n, r) {
	kl() || ae(!1);
	let { navigator: a } = O.useContext(Sl),
		{ matches: l } = O.useContext(un),
		i = l[l.length - 1],
		o = i ? i.params : {};
	i && i.pathname;
	let s = i ? i.pathnameBase : "/";
	i && i.route;
	let c = Zf(),
		d;
	if (t) {
		var f;
		let w = typeof t == "string" ? Wn(t) : t;
		s === "/" ||
			((f = w.pathname) != null && f.startsWith(s)) ||
			ae(!1),
			(d = w);
	} else d = c;
	let m = d.pathname || "/",
		v = m;
	if (s !== "/") {
		let w = s.replace(/^\//, "").split("/");
		v =
			"/" +
			m
				.replace(/^\//, "")
				.split("/")
				.slice(w.length)
				.join("/");
	}
	let g = Bv(e, { pathname: v }),
		b = S0(
			g &&
				g.map((w) =>
					Object.assign({}, w, {
						params: Object.assign({}, o, w.params),
						pathname: sn([
							s,
							a.encodeLocation
								? a.encodeLocation(w.pathname).pathname
								: w.pathname,
						]),
						pathnameBase:
							w.pathnameBase === "/"
								? s
								: sn([
										s,
										a.encodeLocation
											? a.encodeLocation(w.pathnameBase).pathname
											: w.pathnameBase,
								  ]),
					})
				),
			l,
			n,
			r
		);
	return t && b
		? O.createElement(
				xl.Provider,
				{
					value: {
						location: Vr(
							{
								pathname: "/",
								search: "",
								hash: "",
								state: null,
								key: "default",
							},
							d
						),
						navigationType: Ft.Pop,
					},
				},
				b
		  )
		: b;
}
function v0() {
	let e = C0(),
		t = u0(e)
			? e.status + " " + e.statusText
			: e instanceof Error
			? e.message
			: JSON.stringify(e),
		n = e instanceof Error ? e.stack : null,
		r = {
			padding: "0.5rem",
			backgroundColor: "rgba(200,200,200, 0.5)",
		};
	return O.createElement(
		O.Fragment,
		null,
		O.createElement(
			"h2",
			null,
			"Unexpected Application Error!"
		),
		O.createElement(
			"h3",
			{ style: { fontStyle: "italic" } },
			t
		),
		n ? O.createElement("pre", { style: r }, n) : null,
		null
	);
}
const y0 = O.createElement(v0, null);
class b0 extends O.Component {
	constructor(t) {
		super(t),
			(this.state = {
				location: t.location,
				revalidation: t.revalidation,
				error: t.error,
			});
	}
	static getDerivedStateFromError(t) {
		return { error: t };
	}
	static getDerivedStateFromProps(t, n) {
		return n.location !== t.location ||
			(n.revalidation !== "idle" && t.revalidation === "idle")
			? {
					error: t.error,
					location: t.location,
					revalidation: t.revalidation,
			  }
			: {
					error: t.error !== void 0 ? t.error : n.error,
					location: n.location,
					revalidation: t.revalidation || n.revalidation,
			  };
	}
	componentDidCatch(t, n) {
		console.error(
			"React Router caught the following error during render",
			t,
			n
		);
	}
	render() {
		return this.state.error !== void 0
			? O.createElement(
					un.Provider,
					{ value: this.props.routeContext },
					O.createElement(Kf.Provider, {
						value: this.state.error,
						children: this.props.component,
					})
			  )
			: this.props.children;
	}
}
function w0(e) {
	let { routeContext: t, match: n, children: r } = e,
		a = O.useContext(cs);
	return (
		a &&
			a.static &&
			a.staticContext &&
			(n.route.errorElement || n.route.ErrorBoundary) &&
			(a.staticContext._deepestRenderedBoundaryId =
				n.route.id),
		O.createElement(un.Provider, { value: t }, r)
	);
}
function S0(e, t, n, r) {
	var a;
	if (
		(t === void 0 && (t = []),
		n === void 0 && (n = null),
		r === void 0 && (r = null),
		e == null)
	) {
		var l;
		if (!n) return null;
		if (n.errors) e = n.matches;
		else if (
			(l = r) != null &&
			l.v7_partialHydration &&
			t.length === 0 &&
			!n.initialized &&
			n.matches.length > 0
		)
			e = n.matches;
		else return null;
	}
	let i = e,
		o = (a = n) == null ? void 0 : a.errors;
	if (o != null) {
		let d = i.findIndex(
			(f) =>
				f.route.id &&
				(o == null ? void 0 : o[f.route.id]) !== void 0
		);
		d >= 0 || ae(!1),
			(i = i.slice(0, Math.min(i.length, d + 1)));
	}
	let s = !1,
		c = -1;
	if (n && r && r.v7_partialHydration)
		for (let d = 0; d < i.length; d++) {
			let f = i[d];
			if (
				((f.route.HydrateFallback ||
					f.route.hydrateFallbackElement) &&
					(c = d),
				f.route.id)
			) {
				let { loaderData: m, errors: v } = n,
					g =
						f.route.loader &&
						m[f.route.id] === void 0 &&
						(!v || v[f.route.id] === void 0);
				if (f.route.lazy || g) {
					(s = !0),
						c >= 0 ? (i = i.slice(0, c + 1)) : (i = [i[0]]);
					break;
				}
			}
		}
	return i.reduceRight((d, f, m) => {
		let v,
			g = !1,
			b = null,
			w = null;
		n &&
			((v = o && f.route.id ? o[f.route.id] : void 0),
			(b = f.route.errorElement || y0),
			s &&
				(c < 0 && m === 0
					? ((g = !0), (w = null))
					: c === m &&
					  ((g = !0),
					  (w = f.route.hydrateFallbackElement || null))));
		let h = t.concat(i.slice(0, m + 1)),
			u = () => {
				let p;
				return (
					v
						? (p = b)
						: g
						? (p = w)
						: f.route.Component
						? (p = O.createElement(f.route.Component, null))
						: f.route.element
						? (p = f.route.element)
						: (p = d),
					O.createElement(w0, {
						match: f,
						routeContext: {
							outlet: d,
							matches: h,
							isDataRoute: n != null,
						},
						children: p,
					})
				);
			};
		return n &&
			(f.route.ErrorBoundary ||
				f.route.errorElement ||
				m === 0)
			? O.createElement(b0, {
					location: n.location,
					revalidation: n.revalidation,
					component: b,
					error: v,
					children: u(),
					routeContext: {
						outlet: null,
						matches: h,
						isDataRoute: !0,
					},
			  })
			: u();
	}, null);
}
var ep = (function (e) {
		return (
			(e.UseBlocker = "useBlocker"),
			(e.UseRevalidator = "useRevalidator"),
			(e.UseNavigateStable = "useNavigate"),
			e
		);
	})(ep || {}),
	El = (function (e) {
		return (
			(e.UseBlocker = "useBlocker"),
			(e.UseLoaderData = "useLoaderData"),
			(e.UseActionData = "useActionData"),
			(e.UseRouteError = "useRouteError"),
			(e.UseNavigation = "useNavigation"),
			(e.UseRouteLoaderData = "useRouteLoaderData"),
			(e.UseMatches = "useMatches"),
			(e.UseRevalidator = "useRevalidator"),
			(e.UseNavigateStable = "useNavigate"),
			(e.UseRouteId = "useRouteId"),
			e
		);
	})(El || {});
function x0(e) {
	let t = O.useContext(cs);
	return t || ae(!1), t;
}
function k0(e) {
	let t = O.useContext(d0);
	return t || ae(!1), t;
}
function E0(e) {
	let t = O.useContext(un);
	return t || ae(!1), t;
}
function tp(e) {
	let t = E0(),
		n = t.matches[t.matches.length - 1];
	return n.route.id || ae(!1), n.route.id;
}
function C0() {
	var e;
	let t = O.useContext(Kf),
		n = k0(El.UseRouteError),
		r = tp(El.UseRouteError);
	return t !== void 0
		? t
		: (e = n.errors) == null
		? void 0
		: e[r];
}
function T0() {
	let { router: e } = x0(ep.UseNavigateStable),
		t = tp(El.UseNavigateStable),
		n = O.useRef(!1);
	return (
		Jf(() => {
			n.current = !0;
		}),
		O.useCallback(
			function (r, a) {
				a === void 0 && (a = {}),
					n.current &&
						(typeof r == "number"
							? e.navigate(r)
							: e.navigate(r, Vr({ fromRouteId: t }, a)));
			},
			[e, t]
		)
	);
}
function _0(e) {
	return h0(e.context);
}
function cn(e) {
	ae(!1);
}
function P0(e) {
	let {
		basename: t = "/",
		children: n = null,
		location: r,
		navigationType: a = Ft.Pop,
		navigator: l,
		static: i = !1,
		future: o,
	} = e;
	kl() && ae(!1);
	let s = t.replace(/^\/*/, "/"),
		c = O.useMemo(
			() => ({
				basename: s,
				navigator: l,
				static: i,
				future: Vr({ v7_relativeSplatPath: !1 }, o),
			}),
			[s, o, l, i]
		);
	typeof r == "string" && (r = Wn(r));
	let {
			pathname: d = "/",
			search: f = "",
			hash: m = "",
			state: v = null,
			key: g = "default",
		} = r,
		b = O.useMemo(() => {
			let w = Xf(d, s);
			return w == null
				? null
				: {
						location: {
							pathname: w,
							search: f,
							hash: m,
							state: v,
							key: g,
						},
						navigationType: a,
				  };
		}, [s, d, f, m, v, g, a]);
	return b == null
		? null
		: O.createElement(
				Sl.Provider,
				{ value: c },
				O.createElement(xl.Provider, { children: n, value: b })
		  );
}
function O0(e) {
	let { children: t, location: n } = e;
	return m0(fs(t), n);
}
new Promise(() => {});
function fs(e, t) {
	t === void 0 && (t = []);
	let n = [];
	return (
		O.Children.forEach(e, (r, a) => {
			if (!O.isValidElement(r)) return;
			let l = [...t, a];
			if (r.type === O.Fragment) {
				n.push.apply(n, fs(r.props.children, l));
				return;
			}
			r.type !== cn && ae(!1),
				!r.props.index || !r.props.children || ae(!1);
			let i = {
				id: r.props.id || l.join("-"),
				caseSensitive: r.props.caseSensitive,
				element: r.props.element,
				Component: r.props.Component,
				index: r.props.index,
				path: r.props.path,
				loader: r.props.loader,
				action: r.props.action,
				errorElement: r.props.errorElement,
				ErrorBoundary: r.props.ErrorBoundary,
				hasErrorBoundary:
					r.props.ErrorBoundary != null ||
					r.props.errorElement != null,
				shouldRevalidate: r.props.shouldRevalidate,
				handle: r.props.handle,
				lazy: r.props.lazy,
			};
			r.props.children &&
				(i.children = fs(r.props.children, l)),
				n.push(i);
		}),
		n
	);
}
/**
 * React Router DOM v6.27.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ const L0 = "6";
try {
	window.__reactRouterVersion = L0;
} catch {}
const z0 = "startTransition",
	np = Fl[z0];
function M0(e) {
	let { basename: t, children: n, future: r, window: a } = e,
		l = O.useRef();
	l.current == null &&
		(l.current = Dv({ window: a, v5Compat: !0 }));
	let i = l.current,
		[o, s] = O.useState({
			action: i.action,
			location: i.location,
		}),
		{ v7_startTransition: c } = r || {},
		d = O.useCallback(
			(f) => {
				c && np ? np(() => s(f)) : s(f);
			},
			[s, c]
		);
	return (
		O.useLayoutEffect(() => i.listen(d), [i, d]),
		O.createElement(P0, {
			basename: t,
			children: n,
			location: o.location,
			navigationType: o.action,
			navigator: i,
			future: r,
		})
	);
}
var rp;
(function (e) {
	(e.UseScrollRestoration = "useScrollRestoration"),
		(e.UseSubmit = "useSubmit"),
		(e.UseSubmitFetcher = "useSubmitFetcher"),
		(e.UseFetcher = "useFetcher"),
		(e.useViewTransitionState = "useViewTransitionState");
})(rp || (rp = {}));
var ap;
(function (e) {
	(e.UseFetcher = "useFetcher"),
		(e.UseFetchers = "useFetchers"),
		(e.UseScrollRestoration = "useScrollRestoration");
})(ap || (ap = {}));
function N0(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 512 512" },
		child: [
			{
				tag: "path",
				attr: {
					d: "M48 256c0 114.87 93.13 208 208 208s208-93.13 208-208S370.87 48 256 48 48 141.13 48 256zm212.65-91.36a16 16 0 0 1 .09 22.63L208.42 240H342a16 16 0 0 1 0 32H208.42l52.32 52.73A16 16 0 1 1 238 347.27l-79.39-80a16 16 0 0 1 0-22.54l79.39-80a16 16 0 0 1 22.65-.09z",
				},
				child: [],
			},
		],
	})(e);
}
const I0 = () => {
	const e = ds(),
		[t, n] = O.useState(!1),
		{ darkMode: r } = Hn(),
		a = () => {
			n(!t);
		};
	return C.jsxs("div", {
		className: "fixed top-5 right-5 z-50",
		children: [
			t
				? C.jsx(at, {
						label: C.jsx(N0, {}),
						onClick: () => {
							e(-1), n(!t);
						},
						variant: "filled",
						className: "p-3",
				  })
				: C.jsx(at, {
						label: C.jsx(Rv, {}),
						onClick: a,
						variant: "filled",
						className: "p-3",
				  }),
			C.jsx("div", {
				className: `absolute right-0 transition-all duration-300 overflow-hidden ${
					t ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
				}`,
				children: C.jsx("ul", {
					className: "px-0 py-3",
					children: [
						[C.jsx(zv, {}), ""],
						[C.jsx(Av, {}), "career"],
						[C.jsx(Mv, {}), "education"],
					].map((l, i) =>
						C.jsx(
							"li",
							{
								className: "pb-2",
								children: C.jsx(at, {
									label: l[0],
									onClick: () => {
										e(`${l[1]}`), n(!t);
									},
									variant: "outline",
									className: `p-3 border ${
										r ? "border-white" : "border-black"
									}`,
								}),
							},
							i
						)
					),
				}),
			}),
		],
	});
};
function j0() {
	const { darkMode: e } = Hn();
	return (
		O.useEffect(() => {
			e
				? (document.body.classList.add(
						"bg-gray-900",
						"text-white"
				  ),
				  document.body.classList.remove(
						"bg-gray-100",
						"text-black"
				  ))
				: (document.body.classList.add(
						"bg-gray-100",
						"text-black"
				  ),
				  document.body.classList.remove(
						"bg-gray-900",
						"text-white"
				  ));
		}, [e]),
		C.jsxs("div", {
			className: `min-h-screen p-5 flex flex-col items-center justify-center transition-colors duration-300 ${
				e ? "bg-[#1a1a1a] text-white" : "bg-gray-100 text-black"
			}`,
			children: [C.jsx(I0, {}), C.jsx(_0, {}), C.jsx(Ov, {})],
		})
	);
}
function R0() {
	return C.jsxs("div", {
		className: "text-center",
		children: [
			C.jsx("img", {
				src: mv,
				alt: "Profile",
				className: "w-65 h-60 rounded-full mx-auto mb-4",
			}),
			C.jsx("h1", {
				className: "text-4xl font-bold",
				children: "Bharat Bhusal",
			}),
			C.jsx("p", {
				className: "text-gray-400 mt-2",
				children:
					"Security Auditor | MERN Stack Developer | Community Manager",
			}),
			C.jsx(jv, {}),
		],
	});
}
function lp(e) {
	return (
		e !== null &&
		typeof e == "object" &&
		"constructor" in e &&
		e.constructor === Object
	);
}
function ps(e, t) {
	e === void 0 && (e = {}),
		t === void 0 && (t = {}),
		Object.keys(t).forEach((n) => {
			typeof e[n] > "u"
				? (e[n] = t[n])
				: lp(t[n]) &&
				  lp(e[n]) &&
				  Object.keys(t[n]).length > 0 &&
				  ps(e[n], t[n]);
		});
}
const ip = {
	body: {},
	addEventListener() {},
	removeEventListener() {},
	activeElement: { blur() {}, nodeName: "" },
	querySelector() {
		return null;
	},
	querySelectorAll() {
		return [];
	},
	getElementById() {
		return null;
	},
	createEvent() {
		return { initEvent() {} };
	},
	createElement() {
		return {
			children: [],
			childNodes: [],
			style: {},
			setAttribute() {},
			getElementsByTagName() {
				return [];
			},
		};
	},
	createElementNS() {
		return {};
	},
	importNode() {
		return null;
	},
	location: {
		hash: "",
		host: "",
		hostname: "",
		href: "",
		origin: "",
		pathname: "",
		protocol: "",
		search: "",
	},
};
function Gn() {
	const e = typeof document < "u" ? document : {};
	return ps(e, ip), e;
}
const A0 = {
	document: ip,
	navigator: { userAgent: "" },
	location: {
		hash: "",
		host: "",
		hostname: "",
		href: "",
		origin: "",
		pathname: "",
		protocol: "",
		search: "",
	},
	history: {
		replaceState() {},
		pushState() {},
		go() {},
		back() {},
	},
	CustomEvent: function () {
		return this;
	},
	addEventListener() {},
	removeEventListener() {},
	getComputedStyle() {
		return {
			getPropertyValue() {
				return "";
			},
		};
	},
	Image() {},
	Date() {},
	screen: {},
	setTimeout() {},
	clearTimeout() {},
	matchMedia() {
		return {};
	},
	requestAnimationFrame(e) {
		return typeof setTimeout > "u"
			? (e(), null)
			: setTimeout(e, 0);
	},
	cancelAnimationFrame(e) {
		typeof setTimeout > "u" || clearTimeout(e);
	},
};
function Re() {
	const e = typeof window < "u" ? window : {};
	return ps(e, A0), e;
}
function D0(e) {
	return (
		e === void 0 && (e = ""),
		e
			.trim()
			.split(" ")
			.filter((t) => !!t.trim())
	);
}
function F0(e) {
	const t = e;
	Object.keys(t).forEach((n) => {
		try {
			t[n] = null;
		} catch {}
		try {
			delete t[n];
		} catch {}
	});
}
function hs(e, t) {
	return t === void 0 && (t = 0), setTimeout(e, t);
}
function Cl() {
	return Date.now();
}
function $0(e) {
	const t = Re();
	let n;
	return (
		t.getComputedStyle && (n = t.getComputedStyle(e, null)),
		!n && e.currentStyle && (n = e.currentStyle),
		n || (n = e.style),
		n
	);
}
function B0(e, t) {
	t === void 0 && (t = "x");
	const n = Re();
	let r, a, l;
	const i = $0(e);
	return (
		n.WebKitCSSMatrix
			? ((a = i.transform || i.webkitTransform),
			  a.split(",").length > 6 &&
					(a = a
						.split(", ")
						.map((o) => o.replace(",", "."))
						.join(", ")),
			  (l = new n.WebKitCSSMatrix(a === "none" ? "" : a)))
			: ((l =
					i.MozTransform ||
					i.OTransform ||
					i.MsTransform ||
					i.msTransform ||
					i.transform ||
					i
						.getPropertyValue("transform")
						.replace("translate(", "matrix(1, 0, 0, 1,")),
			  (r = l.toString().split(","))),
		t === "x" &&
			(n.WebKitCSSMatrix
				? (a = l.m41)
				: r.length === 16
				? (a = parseFloat(r[12]))
				: (a = parseFloat(r[4]))),
		t === "y" &&
			(n.WebKitCSSMatrix
				? (a = l.m42)
				: r.length === 16
				? (a = parseFloat(r[13]))
				: (a = parseFloat(r[5]))),
		a || 0
	);
}
function Tl(e) {
	return (
		typeof e == "object" &&
		e !== null &&
		e.constructor &&
		Object.prototype.toString.call(e).slice(8, -1) ===
			"Object"
	);
}
function V0(e) {
	return typeof window < "u" &&
		typeof window.HTMLElement < "u"
		? e instanceof HTMLElement
		: e && (e.nodeType === 1 || e.nodeType === 11);
}
function Ae() {
	const e = Object(
			arguments.length <= 0 ? void 0 : arguments[0]
		),
		t = ["__proto__", "constructor", "prototype"];
	for (let n = 1; n < arguments.length; n += 1) {
		const r =
			n < 0 || arguments.length <= n ? void 0 : arguments[n];
		if (r != null && !V0(r)) {
			const a = Object.keys(Object(r)).filter(
				(l) => t.indexOf(l) < 0
			);
			for (let l = 0, i = a.length; l < i; l += 1) {
				const o = a[l],
					s = Object.getOwnPropertyDescriptor(r, o);
				s !== void 0 &&
					s.enumerable &&
					(Tl(e[o]) && Tl(r[o])
						? r[o].__swiper__
							? (e[o] = r[o])
							: Ae(e[o], r[o])
						: !Tl(e[o]) && Tl(r[o])
						? ((e[o] = {}),
						  r[o].__swiper__ ? (e[o] = r[o]) : Ae(e[o], r[o]))
						: (e[o] = r[o]));
			}
		}
	}
	return e;
}
function _l(e, t, n) {
	e.style.setProperty(t, n);
}
function op(e) {
	let { swiper: t, targetPosition: n, side: r } = e;
	const a = Re(),
		l = -t.translate;
	let i = null,
		o;
	const s = t.params.speed;
	(t.wrapperEl.style.scrollSnapType = "none"),
		a.cancelAnimationFrame(t.cssModeFrameID);
	const c = n > l ? "next" : "prev",
		d = (m, v) =>
			(c === "next" && m >= v) || (c === "prev" && m <= v),
		f = () => {
			(o = new Date().getTime()), i === null && (i = o);
			const m = Math.max(Math.min((o - i) / s, 1), 0),
				v = 0.5 - Math.cos(m * Math.PI) / 2;
			let g = l + v * (n - l);
			if (
				(d(g, n) && (g = n),
				t.wrapperEl.scrollTo({ [r]: g }),
				d(g, n))
			) {
				(t.wrapperEl.style.overflow = "hidden"),
					(t.wrapperEl.style.scrollSnapType = ""),
					setTimeout(() => {
						(t.wrapperEl.style.overflow = ""),
							t.wrapperEl.scrollTo({ [r]: g });
					}),
					a.cancelAnimationFrame(t.cssModeFrameID);
				return;
			}
			t.cssModeFrameID = a.requestAnimationFrame(f);
		};
	f();
}
function lt(e, t) {
	t === void 0 && (t = "");
	const n = [...e.children];
	return (
		e instanceof HTMLSlotElement &&
			n.push(...e.assignedElements()),
		t ? n.filter((r) => r.matches(t)) : n
	);
}
function H0(e, t) {
	const n = t.contains(e);
	return !n && t instanceof HTMLSlotElement
		? [...t.assignedElements()].includes(e)
		: n;
}
function Pl(e) {
	try {
		console.warn(e);
		return;
	} catch {}
}
function Ol(e, t) {
	t === void 0 && (t = []);
	const n = document.createElement(e);
	return (
		n.classList.add(...(Array.isArray(t) ? t : D0(t))), n
	);
}
function U0(e, t) {
	const n = [];
	for (; e.previousElementSibling; ) {
		const r = e.previousElementSibling;
		t ? r.matches(t) && n.push(r) : n.push(r), (e = r);
	}
	return n;
}
function W0(e, t) {
	const n = [];
	for (; e.nextElementSibling; ) {
		const r = e.nextElementSibling;
		t ? r.matches(t) && n.push(r) : n.push(r), (e = r);
	}
	return n;
}
function $t(e, t) {
	return Re().getComputedStyle(e, null).getPropertyValue(t);
}
function Ll(e) {
	let t = e,
		n;
	if (t) {
		for (n = 0; (t = t.previousSibling) !== null; )
			t.nodeType === 1 && (n += 1);
		return n;
	}
}
function sp(e, t) {
	const n = [];
	let r = e.parentElement;
	for (; r; )
		t ? r.matches(t) && n.push(r) : n.push(r),
			(r = r.parentElement);
	return n;
}
function ms(e, t, n) {
	const r = Re();
	return (
		e[t === "width" ? "offsetWidth" : "offsetHeight"] +
		parseFloat(
			r
				.getComputedStyle(e, null)
				.getPropertyValue(
					t === "width" ? "margin-right" : "margin-top"
				)
		) +
		parseFloat(
			r
				.getComputedStyle(e, null)
				.getPropertyValue(
					t === "width" ? "margin-left" : "margin-bottom"
				)
		)
	);
}
function oe(e) {
	return (Array.isArray(e) ? e : [e]).filter((t) => !!t);
}
let gs;
function G0() {
	const e = Re(),
		t = Gn();
	return {
		smoothScroll:
			t.documentElement &&
			t.documentElement.style &&
			"scrollBehavior" in t.documentElement.style,
		touch: !!(
			"ontouchstart" in e ||
			(e.DocumentTouch && t instanceof e.DocumentTouch)
		),
	};
}
function up() {
	return gs || (gs = G0()), gs;
}
let vs;
function q0(e) {
	let { userAgent: t } = e === void 0 ? {} : e;
	const n = up(),
		r = Re(),
		a = r.navigator.platform,
		l = t || r.navigator.userAgent,
		i = { ios: !1, android: !1 },
		o = r.screen.width,
		s = r.screen.height,
		c = l.match(/(Android);?[\s\/]+([\d.]+)?/);
	let d = l.match(/(iPad).*OS\s([\d_]+)/);
	const f = l.match(/(iPod)(.*OS\s([\d_]+))?/),
		m = !d && l.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
		v = a === "Win32";
	let g = a === "MacIntel";
	const b = [
		"1024x1366",
		"1366x1024",
		"834x1194",
		"1194x834",
		"834x1112",
		"1112x834",
		"768x1024",
		"1024x768",
		"820x1180",
		"1180x820",
		"810x1080",
		"1080x810",
	];
	return (
		!d &&
			g &&
			n.touch &&
			b.indexOf(`${o}x${s}`) >= 0 &&
			((d = l.match(/(Version)\/([\d.]+)/)),
			d || (d = [0, 1, "13_0_0"]),
			(g = !1)),
		c && !v && ((i.os = "android"), (i.android = !0)),
		(d || m || f) && ((i.os = "ios"), (i.ios = !0)),
		i
	);
}
function cp(e) {
	return e === void 0 && (e = {}), vs || (vs = q0(e)), vs;
}
let ys;
function Q0() {
	const e = Re(),
		t = cp();
	let n = !1;
	function r() {
		const o = e.navigator.userAgent.toLowerCase();
		return (
			o.indexOf("safari") >= 0 &&
			o.indexOf("chrome") < 0 &&
			o.indexOf("android") < 0
		);
	}
	if (r()) {
		const o = String(e.navigator.userAgent);
		if (o.includes("Version/")) {
			const [s, c] = o
				.split("Version/")[1]
				.split(" ")[0]
				.split(".")
				.map((d) => Number(d));
			n = s < 16 || (s === 16 && c < 2);
		}
	}
	const a =
			/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
				e.navigator.userAgent
			),
		l = r(),
		i = l || (a && t.ios);
	return {
		isSafari: n || l,
		needPerspectiveFix: n,
		need3dFix: i,
		isWebView: a,
	};
}
function X0() {
	return ys || (ys = Q0()), ys;
}
function Y0(e) {
	let { swiper: t, on: n, emit: r } = e;
	const a = Re();
	let l = null,
		i = null;
	const o = () => {
			!t ||
				t.destroyed ||
				!t.initialized ||
				(r("beforeResize"), r("resize"));
		},
		s = () => {
			!t ||
				t.destroyed ||
				!t.initialized ||
				((l = new ResizeObserver((f) => {
					i = a.requestAnimationFrame(() => {
						const { width: m, height: v } = t;
						let g = m,
							b = v;
						f.forEach((w) => {
							let {
								contentBoxSize: h,
								contentRect: u,
								target: p,
							} = w;
							(p && p !== t.el) ||
								((g = u ? u.width : (h[0] || h).inlineSize),
								(b = u ? u.height : (h[0] || h).blockSize));
						}),
							(g !== m || b !== v) && o();
					});
				})),
				l.observe(t.el));
		},
		c = () => {
			i && a.cancelAnimationFrame(i),
				l &&
					l.unobserve &&
					t.el &&
					(l.unobserve(t.el), (l = null));
		},
		d = () => {
			!t ||
				t.destroyed ||
				!t.initialized ||
				r("orientationchange");
		};
	n("init", () => {
		if (
			t.params.resizeObserver &&
			typeof a.ResizeObserver < "u"
		) {
			s();
			return;
		}
		a.addEventListener("resize", o),
			a.addEventListener("orientationchange", d);
	}),
		n("destroy", () => {
			c(),
				a.removeEventListener("resize", o),
				a.removeEventListener("orientationchange", d);
		});
}
function K0(e) {
	let { swiper: t, extendParams: n, on: r, emit: a } = e;
	const l = [],
		i = Re(),
		o = function (d, f) {
			f === void 0 && (f = {});
			const m = i.MutationObserver || i.WebkitMutationObserver,
				v = new m((g) => {
					if (t.__preventObserver__) return;
					if (g.length === 1) {
						a("observerUpdate", g[0]);
						return;
					}
					const b = function () {
						a("observerUpdate", g[0]);
					};
					i.requestAnimationFrame
						? i.requestAnimationFrame(b)
						: i.setTimeout(b, 0);
				});
			v.observe(d, {
				attributes:
					typeof f.attributes > "u" ? !0 : f.attributes,
				childList:
					t.isElement ||
					(typeof f.childList > "u" ? !0 : f).childList,
				characterData:
					typeof f.characterData > "u" ? !0 : f.characterData,
			}),
				l.push(v);
		},
		s = () => {
			if (t.params.observer) {
				if (t.params.observeParents) {
					const d = sp(t.hostEl);
					for (let f = 0; f < d.length; f += 1) o(d[f]);
				}
				o(t.hostEl, {
					childList: t.params.observeSlideChildren,
				}),
					o(t.wrapperEl, { attributes: !1 });
			}
		},
		c = () => {
			l.forEach((d) => {
				d.disconnect();
			}),
				l.splice(0, l.length);
		};
	n({
		observer: !1,
		observeParents: !1,
		observeSlideChildren: !1,
	}),
		r("init", s),
		r("destroy", c);
}
var Z0 = {
	on(e, t, n) {
		const r = this;
		if (
			!r.eventsListeners ||
			r.destroyed ||
			typeof t != "function"
		)
			return r;
		const a = n ? "unshift" : "push";
		return (
			e.split(" ").forEach((l) => {
				r.eventsListeners[l] || (r.eventsListeners[l] = []),
					r.eventsListeners[l][a](t);
			}),
			r
		);
	},
	once(e, t, n) {
		const r = this;
		if (
			!r.eventsListeners ||
			r.destroyed ||
			typeof t != "function"
		)
			return r;
		function a() {
			r.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
			for (
				var l = arguments.length, i = new Array(l), o = 0;
				o < l;
				o++
			)
				i[o] = arguments[o];
			t.apply(r, i);
		}
		return (a.__emitterProxy = t), r.on(e, a, n);
	},
	onAny(e, t) {
		const n = this;
		if (
			!n.eventsListeners ||
			n.destroyed ||
			typeof e != "function"
		)
			return n;
		const r = t ? "unshift" : "push";
		return (
			n.eventsAnyListeners.indexOf(e) < 0 &&
				n.eventsAnyListeners[r](e),
			n
		);
	},
	offAny(e) {
		const t = this;
		if (
			!t.eventsListeners ||
			t.destroyed ||
			!t.eventsAnyListeners
		)
			return t;
		const n = t.eventsAnyListeners.indexOf(e);
		return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
	},
	off(e, t) {
		const n = this;
		return (
			!n.eventsListeners ||
				n.destroyed ||
				!n.eventsListeners ||
				e.split(" ").forEach((r) => {
					typeof t > "u"
						? (n.eventsListeners[r] = [])
						: n.eventsListeners[r] &&
						  n.eventsListeners[r].forEach((a, l) => {
								(a === t ||
									(a.__emitterProxy && a.__emitterProxy === t)) &&
									n.eventsListeners[r].splice(l, 1);
						  });
				}),
			n
		);
	},
	emit() {
		const e = this;
		if (
			!e.eventsListeners ||
			e.destroyed ||
			!e.eventsListeners
		)
			return e;
		let t, n, r;
		for (
			var a = arguments.length, l = new Array(a), i = 0;
			i < a;
			i++
		)
			l[i] = arguments[i];
		return (
			typeof l[0] == "string" || Array.isArray(l[0])
				? ((t = l[0]), (n = l.slice(1, l.length)), (r = e))
				: ((t = l[0].events),
				  (n = l[0].data),
				  (r = l[0].context || e)),
			n.unshift(r),
			(Array.isArray(t) ? t : t.split(" ")).forEach((o) => {
				e.eventsAnyListeners &&
					e.eventsAnyListeners.length &&
					e.eventsAnyListeners.forEach((s) => {
						s.apply(r, [o, ...n]);
					}),
					e.eventsListeners &&
						e.eventsListeners[o] &&
						e.eventsListeners[o].forEach((s) => {
							s.apply(r, n);
						});
			}),
			e
		);
	},
};
function J0() {
	const e = this;
	let t, n;
	const r = e.el;
	typeof e.params.width < "u" && e.params.width !== null
		? (t = e.params.width)
		: (t = r.clientWidth),
		typeof e.params.height < "u" && e.params.height !== null
			? (n = e.params.height)
			: (n = r.clientHeight),
		!(
			(t === 0 && e.isHorizontal()) ||
			(n === 0 && e.isVertical())
		) &&
			((t =
				t -
				parseInt($t(r, "padding-left") || 0, 10) -
				parseInt($t(r, "padding-right") || 0, 10)),
			(n =
				n -
				parseInt($t(r, "padding-top") || 0, 10) -
				parseInt($t(r, "padding-bottom") || 0, 10)),
			Number.isNaN(t) && (t = 0),
			Number.isNaN(n) && (n = 0),
			Object.assign(e, {
				width: t,
				height: n,
				size: e.isHorizontal() ? t : n,
			}));
}
function e1() {
	const e = this;
	function t(k, z) {
		return parseFloat(
			k.getPropertyValue(e.getDirectionLabel(z)) || 0
		);
	}
	const n = e.params,
		{
			wrapperEl: r,
			slidesEl: a,
			size: l,
			rtlTranslate: i,
			wrongRTL: o,
		} = e,
		s = e.virtual && n.virtual.enabled,
		c = s ? e.virtual.slides.length : e.slides.length,
		d = lt(a, `.${e.params.slideClass}, swiper-slide`),
		f = s ? e.virtual.slides.length : d.length;
	let m = [];
	const v = [],
		g = [];
	let b = n.slidesOffsetBefore;
	typeof b == "function" &&
		(b = n.slidesOffsetBefore.call(e));
	let w = n.slidesOffsetAfter;
	typeof w == "function" &&
		(w = n.slidesOffsetAfter.call(e));
	const h = e.snapGrid.length,
		u = e.slidesGrid.length;
	let p = n.spaceBetween,
		y = -b,
		S = 0,
		x = 0;
	if (typeof l > "u") return;
	typeof p == "string" && p.indexOf("%") >= 0
		? (p = (parseFloat(p.replace("%", "")) / 100) * l)
		: typeof p == "string" && (p = parseFloat(p)),
		(e.virtualSize = -p),
		d.forEach((k) => {
			i
				? (k.style.marginLeft = "")
				: (k.style.marginRight = ""),
				(k.style.marginBottom = ""),
				(k.style.marginTop = "");
		}),
		n.centeredSlides &&
			n.cssMode &&
			(_l(r, "--swiper-centered-offset-before", ""),
			_l(r, "--swiper-centered-offset-after", ""));
	const E = n.grid && n.grid.rows > 1 && e.grid;
	E ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
	let T;
	const P =
		n.slidesPerView === "auto" &&
		n.breakpoints &&
		Object.keys(n.breakpoints).filter(
			(k) => typeof n.breakpoints[k].slidesPerView < "u"
		).length > 0;
	for (let k = 0; k < f; k += 1) {
		T = 0;
		let z;
		if (
			(d[k] && (z = d[k]),
			E && e.grid.updateSlide(k, z, d),
			!(d[k] && $t(z, "display") === "none"))
		) {
			if (n.slidesPerView === "auto") {
				P && (d[k].style[e.getDirectionLabel("width")] = "");
				const L = getComputedStyle(z),
					I = z.style.transform,
					D = z.style.webkitTransform;
				if (
					(I && (z.style.transform = "none"),
					D && (z.style.webkitTransform = "none"),
					n.roundLengths)
				)
					T = e.isHorizontal()
						? ms(z, "width")
						: ms(z, "height");
				else {
					const B = t(L, "width"),
						we = t(L, "padding-left"),
						Bt = t(L, "padding-right"),
						M = t(L, "margin-left"),
						j = t(L, "margin-right"),
						R = L.getPropertyValue("box-sizing");
					if (R && R === "border-box") T = B + M + j;
					else {
						const { clientWidth: Q, offsetWidth: ee } = z;
						T = B + we + Bt + M + j + (ee - Q);
					}
				}
				I && (z.style.transform = I),
					D && (z.style.webkitTransform = D),
					n.roundLengths && (T = Math.floor(T));
			} else
				(T = (l - (n.slidesPerView - 1) * p) / n.slidesPerView),
					n.roundLengths && (T = Math.floor(T)),
					d[k] &&
						(d[k].style[e.getDirectionLabel("width")] = `${T}px`);
			d[k] && (d[k].swiperSlideSize = T),
				g.push(T),
				n.centeredSlides
					? ((y = y + T / 2 + S / 2 + p),
					  S === 0 && k !== 0 && (y = y - l / 2 - p),
					  k === 0 && (y = y - l / 2 - p),
					  Math.abs(y) < 1 / 1e3 && (y = 0),
					  n.roundLengths && (y = Math.floor(y)),
					  x % n.slidesPerGroup === 0 && m.push(y),
					  v.push(y))
					: (n.roundLengths && (y = Math.floor(y)),
					  (x - Math.min(e.params.slidesPerGroupSkip, x)) %
							e.params.slidesPerGroup ===
							0 && m.push(y),
					  v.push(y),
					  (y = y + T + p)),
				(e.virtualSize += T + p),
				(S = T),
				(x += 1);
		}
	}
	if (
		((e.virtualSize = Math.max(e.virtualSize, l) + w),
		i &&
			o &&
			(n.effect === "slide" || n.effect === "coverflow") &&
			(r.style.width = `${e.virtualSize + p}px`),
		n.setWrapperSize &&
			(r.style[e.getDirectionLabel("width")] = `${
				e.virtualSize + p
			}px`),
		E && e.grid.updateWrapperSize(T, m),
		!n.centeredSlides)
	) {
		const k = [];
		for (let z = 0; z < m.length; z += 1) {
			let L = m[z];
			n.roundLengths && (L = Math.floor(L)),
				m[z] <= e.virtualSize - l && k.push(L);
		}
		(m = k),
			Math.floor(e.virtualSize - l) -
				Math.floor(m[m.length - 1]) >
				1 && m.push(e.virtualSize - l);
	}
	if (s && n.loop) {
		const k = g[0] + p;
		if (n.slidesPerGroup > 1) {
			const z = Math.ceil(
					(e.virtual.slidesBefore + e.virtual.slidesAfter) /
						n.slidesPerGroup
				),
				L = k * n.slidesPerGroup;
			for (let I = 0; I < z; I += 1)
				m.push(m[m.length - 1] + L);
		}
		for (
			let z = 0;
			z < e.virtual.slidesBefore + e.virtual.slidesAfter;
			z += 1
		)
			n.slidesPerGroup === 1 && m.push(m[m.length - 1] + k),
				v.push(v[v.length - 1] + k),
				(e.virtualSize += k);
	}
	if ((m.length === 0 && (m = [0]), p !== 0)) {
		const k =
			e.isHorizontal() && i
				? "marginLeft"
				: e.getDirectionLabel("marginRight");
		d.filter((z, L) =>
			!n.cssMode || n.loop ? !0 : L !== d.length - 1
		).forEach((z) => {
			z.style[k] = `${p}px`;
		});
	}
	if (n.centeredSlides && n.centeredSlidesBounds) {
		let k = 0;
		g.forEach((L) => {
			k += L + (p || 0);
		}),
			(k -= p);
		const z = k > l ? k - l : 0;
		m = m.map((L) => (L <= 0 ? -b : L > z ? z + w : L));
	}
	if (n.centerInsufficientSlides) {
		let k = 0;
		g.forEach((L) => {
			k += L + (p || 0);
		}),
			(k -= p);
		const z =
			(n.slidesOffsetBefore || 0) + (n.slidesOffsetAfter || 0);
		if (k + z < l) {
			const L = (l - k - z) / 2;
			m.forEach((I, D) => {
				m[D] = I - L;
			}),
				v.forEach((I, D) => {
					v[D] = I + L;
				});
		}
	}
	if (
		(Object.assign(e, {
			slides: d,
			snapGrid: m,
			slidesGrid: v,
			slidesSizesGrid: g,
		}),
		n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
	) {
		_l(r, "--swiper-centered-offset-before", `${-m[0]}px`),
			_l(
				r,
				"--swiper-centered-offset-after",
				`${e.size / 2 - g[g.length - 1] / 2}px`
			);
		const k = -e.snapGrid[0],
			z = -e.slidesGrid[0];
		(e.snapGrid = e.snapGrid.map((L) => L + k)),
			(e.slidesGrid = e.slidesGrid.map((L) => L + z));
	}
	if (
		(f !== c && e.emit("slidesLengthChange"),
		m.length !== h &&
			(e.params.watchOverflow && e.checkOverflow(),
			e.emit("snapGridLengthChange")),
		v.length !== u && e.emit("slidesGridLengthChange"),
		n.watchSlidesProgress && e.updateSlidesOffset(),
		e.emit("slidesUpdated"),
		!s &&
			!n.cssMode &&
			(n.effect === "slide" || n.effect === "fade"))
	) {
		const k = `${n.containerModifierClass}backface-hidden`,
			z = e.el.classList.contains(k);
		f <= n.maxBackfaceHiddenSlides
			? z || e.el.classList.add(k)
			: z && e.el.classList.remove(k);
	}
}
function t1(e) {
	const t = this,
		n = [],
		r = t.virtual && t.params.virtual.enabled;
	let a = 0,
		l;
	typeof e == "number"
		? t.setTransition(e)
		: e === !0 && t.setTransition(t.params.speed);
	const i = (o) =>
		r ? t.slides[t.getSlideIndexByData(o)] : t.slides[o];
	if (
		t.params.slidesPerView !== "auto" &&
		t.params.slidesPerView > 1
	)
		if (t.params.centeredSlides)
			(t.visibleSlides || []).forEach((o) => {
				n.push(o);
			});
		else
			for (
				l = 0;
				l < Math.ceil(t.params.slidesPerView);
				l += 1
			) {
				const o = t.activeIndex + l;
				if (o > t.slides.length && !r) break;
				n.push(i(o));
			}
	else n.push(i(t.activeIndex));
	for (l = 0; l < n.length; l += 1)
		if (typeof n[l] < "u") {
			const o = n[l].offsetHeight;
			a = o > a ? o : a;
		}
	(a || a === 0) && (t.wrapperEl.style.height = `${a}px`);
}
function n1() {
	const e = this,
		t = e.slides,
		n = e.isElement
			? e.isHorizontal()
				? e.wrapperEl.offsetLeft
				: e.wrapperEl.offsetTop
			: 0;
	for (let r = 0; r < t.length; r += 1)
		t[r].swiperSlideOffset =
			(e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) -
			n -
			e.cssOverflowAdjustment();
}
const dp = (e, t, n) => {
	t && !e.classList.contains(n)
		? e.classList.add(n)
		: !t && e.classList.contains(n) && e.classList.remove(n);
};
function r1(e) {
	e === void 0 && (e = (this && this.translate) || 0);
	const t = this,
		n = t.params,
		{ slides: r, rtlTranslate: a, snapGrid: l } = t;
	if (r.length === 0) return;
	typeof r[0].swiperSlideOffset > "u" &&
		t.updateSlidesOffset();
	let i = -e;
	a && (i = e),
		(t.visibleSlidesIndexes = []),
		(t.visibleSlides = []);
	let o = n.spaceBetween;
	typeof o == "string" && o.indexOf("%") >= 0
		? (o = (parseFloat(o.replace("%", "")) / 100) * t.size)
		: typeof o == "string" && (o = parseFloat(o));
	for (let s = 0; s < r.length; s += 1) {
		const c = r[s];
		let d = c.swiperSlideOffset;
		n.cssMode &&
			n.centeredSlides &&
			(d -= r[0].swiperSlideOffset);
		const f =
				(i + (n.centeredSlides ? t.minTranslate() : 0) - d) /
				(c.swiperSlideSize + o),
			m =
				(i -
					l[0] +
					(n.centeredSlides ? t.minTranslate() : 0) -
					d) /
				(c.swiperSlideSize + o),
			v = -(i - d),
			g = v + t.slidesSizesGrid[s],
			b = v >= 0 && v <= t.size - t.slidesSizesGrid[s],
			w =
				(v >= 0 && v < t.size - 1) ||
				(g > 1 && g <= t.size) ||
				(v <= 0 && g >= t.size);
		w &&
			(t.visibleSlides.push(c),
			t.visibleSlidesIndexes.push(s)),
			dp(c, w, n.slideVisibleClass),
			dp(c, b, n.slideFullyVisibleClass),
			(c.progress = a ? -f : f),
			(c.originalProgress = a ? -m : m);
	}
}
function a1(e) {
	const t = this;
	if (typeof e > "u") {
		const d = t.rtlTranslate ? -1 : 1;
		e = (t && t.translate && t.translate * d) || 0;
	}
	const n = t.params,
		r = t.maxTranslate() - t.minTranslate();
	let {
		progress: a,
		isBeginning: l,
		isEnd: i,
		progressLoop: o,
	} = t;
	const s = l,
		c = i;
	if (r === 0) (a = 0), (l = !0), (i = !0);
	else {
		a = (e - t.minTranslate()) / r;
		const d = Math.abs(e - t.minTranslate()) < 1,
			f = Math.abs(e - t.maxTranslate()) < 1;
		(l = d || a <= 0),
			(i = f || a >= 1),
			d && (a = 0),
			f && (a = 1);
	}
	if (n.loop) {
		const d = t.getSlideIndexByData(0),
			f = t.getSlideIndexByData(t.slides.length - 1),
			m = t.slidesGrid[d],
			v = t.slidesGrid[f],
			g = t.slidesGrid[t.slidesGrid.length - 1],
			b = Math.abs(e);
		b >= m ? (o = (b - m) / g) : (o = (b + g - v) / g),
			o > 1 && (o -= 1);
	}
	Object.assign(t, {
		progress: a,
		progressLoop: o,
		isBeginning: l,
		isEnd: i,
	}),
		(n.watchSlidesProgress ||
			(n.centeredSlides && n.autoHeight)) &&
			t.updateSlidesProgress(e),
		l && !s && t.emit("reachBeginning toEdge"),
		i && !c && t.emit("reachEnd toEdge"),
		((s && !l) || (c && !i)) && t.emit("fromEdge"),
		t.emit("progress", a);
}
const bs = (e, t, n) => {
	t && !e.classList.contains(n)
		? e.classList.add(n)
		: !t && e.classList.contains(n) && e.classList.remove(n);
};
function l1() {
	const e = this,
		{ slides: t, params: n, slidesEl: r, activeIndex: a } = e,
		l = e.virtual && n.virtual.enabled,
		i = e.grid && n.grid && n.grid.rows > 1,
		o = (f) =>
			lt(r, `.${n.slideClass}${f}, swiper-slide${f}`)[0];
	let s, c, d;
	if (l)
		if (n.loop) {
			let f = a - e.virtual.slidesBefore;
			f < 0 && (f = e.virtual.slides.length + f),
				f >= e.virtual.slides.length &&
					(f -= e.virtual.slides.length),
				(s = o(`[data-swiper-slide-index="${f}"]`));
		} else s = o(`[data-swiper-slide-index="${a}"]`);
	else
		i
			? ((s = t.filter((f) => f.column === a)[0]),
			  (d = t.filter((f) => f.column === a + 1)[0]),
			  (c = t.filter((f) => f.column === a - 1)[0]))
			: (s = t[a]);
	s &&
		(i ||
			((d = W0(s, `.${n.slideClass}, swiper-slide`)[0]),
			n.loop && !d && (d = t[0]),
			(c = U0(s, `.${n.slideClass}, swiper-slide`)[0]),
			n.loop && !c === 0 && (c = t[t.length - 1]))),
		t.forEach((f) => {
			bs(f, f === s, n.slideActiveClass),
				bs(f, f === d, n.slideNextClass),
				bs(f, f === c, n.slidePrevClass);
		}),
		e.emitSlidesClasses();
}
const zl = (e, t) => {
		if (!e || e.destroyed || !e.params) return;
		const n = () =>
				e.isElement
					? "swiper-slide"
					: `.${e.params.slideClass}`,
			r = t.closest(n());
		if (r) {
			let a = r.querySelector(
				`.${e.params.lazyPreloaderClass}`
			);
			!a &&
				e.isElement &&
				(r.shadowRoot
					? (a = r.shadowRoot.querySelector(
							`.${e.params.lazyPreloaderClass}`
					  ))
					: requestAnimationFrame(() => {
							r.shadowRoot &&
								((a = r.shadowRoot.querySelector(
									`.${e.params.lazyPreloaderClass}`
								)),
								a && a.remove());
					  })),
				a && a.remove();
		}
	},
	ws = (e, t) => {
		if (!e.slides[t]) return;
		const n = e.slides[t].querySelector('[loading="lazy"]');
		n && n.removeAttribute("loading");
	},
	Ss = (e) => {
		if (!e || e.destroyed || !e.params) return;
		let t = e.params.lazyPreloadPrevNext;
		const n = e.slides.length;
		if (!n || !t || t < 0) return;
		t = Math.min(t, n);
		const r =
				e.params.slidesPerView === "auto"
					? e.slidesPerViewDynamic()
					: Math.ceil(e.params.slidesPerView),
			a = e.activeIndex;
		if (e.params.grid && e.params.grid.rows > 1) {
			const i = a,
				o = [i - t];
			o.push(
				...Array.from({ length: t }).map((s, c) => i + r + c)
			),
				e.slides.forEach((s, c) => {
					o.includes(s.column) && ws(e, c);
				});
			return;
		}
		const l = a + r - 1;
		if (e.params.rewind || e.params.loop)
			for (let i = a - t; i <= l + t; i += 1) {
				const o = ((i % n) + n) % n;
				(o < a || o > l) && ws(e, o);
			}
		else
			for (
				let i = Math.max(a - t, 0);
				i <= Math.min(l + t, n - 1);
				i += 1
			)
				i !== a && (i > l || i < a) && ws(e, i);
	};
function i1(e) {
	const { slidesGrid: t, params: n } = e,
		r = e.rtlTranslate ? e.translate : -e.translate;
	let a;
	for (let l = 0; l < t.length; l += 1)
		typeof t[l + 1] < "u"
			? r >= t[l] && r < t[l + 1] - (t[l + 1] - t[l]) / 2
				? (a = l)
				: r >= t[l] && r < t[l + 1] && (a = l + 1)
			: r >= t[l] && (a = l);
	return (
		n.normalizeSlideIndex &&
			(a < 0 || typeof a > "u") &&
			(a = 0),
		a
	);
}
function o1(e) {
	const t = this,
		n = t.rtlTranslate ? t.translate : -t.translate,
		{
			snapGrid: r,
			params: a,
			activeIndex: l,
			realIndex: i,
			snapIndex: o,
		} = t;
	let s = e,
		c;
	const d = (v) => {
		let g = v - t.virtual.slidesBefore;
		return (
			g < 0 && (g = t.virtual.slides.length + g),
			g >= t.virtual.slides.length &&
				(g -= t.virtual.slides.length),
			g
		);
	};
	if ((typeof s > "u" && (s = i1(t)), r.indexOf(n) >= 0))
		c = r.indexOf(n);
	else {
		const v = Math.min(a.slidesPerGroupSkip, s);
		c = v + Math.floor((s - v) / a.slidesPerGroup);
	}
	if (
		(c >= r.length && (c = r.length - 1),
		s === l && !t.params.loop)
	) {
		c !== o && ((t.snapIndex = c), t.emit("snapIndexChange"));
		return;
	}
	if (
		s === l &&
		t.params.loop &&
		t.virtual &&
		t.params.virtual.enabled
	) {
		t.realIndex = d(s);
		return;
	}
	const f = t.grid && a.grid && a.grid.rows > 1;
	let m;
	if (t.virtual && a.virtual.enabled && a.loop) m = d(s);
	else if (f) {
		const v = t.slides.filter((b) => b.column === s)[0];
		let g = parseInt(
			v.getAttribute("data-swiper-slide-index"),
			10
		);
		Number.isNaN(g) && (g = Math.max(t.slides.indexOf(v), 0)),
			(m = Math.floor(g / a.grid.rows));
	} else if (t.slides[s]) {
		const v = t.slides[s].getAttribute(
			"data-swiper-slide-index"
		);
		v ? (m = parseInt(v, 10)) : (m = s);
	} else m = s;
	Object.assign(t, {
		previousSnapIndex: o,
		snapIndex: c,
		previousRealIndex: i,
		realIndex: m,
		previousIndex: l,
		activeIndex: s,
	}),
		t.initialized && Ss(t),
		t.emit("activeIndexChange"),
		t.emit("snapIndexChange"),
		(t.initialized || t.params.runCallbacksOnInit) &&
			(i !== m && t.emit("realIndexChange"),
			t.emit("slideChange"));
}
function s1(e, t) {
	const n = this,
		r = n.params;
	let a = e.closest(`.${r.slideClass}, swiper-slide`);
	!a &&
		n.isElement &&
		t &&
		t.length > 1 &&
		t.includes(e) &&
		[...t.slice(t.indexOf(e) + 1, t.length)].forEach((o) => {
			!a &&
				o.matches &&
				o.matches(`.${r.slideClass}, swiper-slide`) &&
				(a = o);
		});
	let l = !1,
		i;
	if (a) {
		for (let o = 0; o < n.slides.length; o += 1)
			if (n.slides[o] === a) {
				(l = !0), (i = o);
				break;
			}
	}
	if (a && l)
		(n.clickedSlide = a),
			n.virtual && n.params.virtual.enabled
				? (n.clickedIndex = parseInt(
						a.getAttribute("data-swiper-slide-index"),
						10
				  ))
				: (n.clickedIndex = i);
	else {
		(n.clickedSlide = void 0), (n.clickedIndex = void 0);
		return;
	}
	r.slideToClickedSlide &&
		n.clickedIndex !== void 0 &&
		n.clickedIndex !== n.activeIndex &&
		n.slideToClickedSlide();
}
var u1 = {
	updateSize: J0,
	updateSlides: e1,
	updateAutoHeight: t1,
	updateSlidesOffset: n1,
	updateSlidesProgress: r1,
	updateProgress: a1,
	updateSlidesClasses: l1,
	updateActiveIndex: o1,
	updateClickedSlide: s1,
};
function c1(e) {
	e === void 0 && (e = this.isHorizontal() ? "x" : "y");
	const t = this,
		{
			params: n,
			rtlTranslate: r,
			translate: a,
			wrapperEl: l,
		} = t;
	if (n.virtualTranslate) return r ? -a : a;
	if (n.cssMode) return a;
	let i = B0(l, e);
	return (
		(i += t.cssOverflowAdjustment()), r && (i = -i), i || 0
	);
}
function d1(e, t) {
	const n = this,
		{
			rtlTranslate: r,
			params: a,
			wrapperEl: l,
			progress: i,
		} = n;
	let o = 0,
		s = 0;
	const c = 0;
	n.isHorizontal() ? (o = r ? -e : e) : (s = e),
		a.roundLengths &&
			((o = Math.floor(o)), (s = Math.floor(s))),
		(n.previousTranslate = n.translate),
		(n.translate = n.isHorizontal() ? o : s),
		a.cssMode
			? (l[n.isHorizontal() ? "scrollLeft" : "scrollTop"] =
					n.isHorizontal() ? -o : -s)
			: a.virtualTranslate ||
			  (n.isHorizontal()
					? (o -= n.cssOverflowAdjustment())
					: (s -= n.cssOverflowAdjustment()),
			  (l.style.transform = `translate3d(${o}px, ${s}px, ${c}px)`));
	let d;
	const f = n.maxTranslate() - n.minTranslate();
	f === 0 ? (d = 0) : (d = (e - n.minTranslate()) / f),
		d !== i && n.updateProgress(e),
		n.emit("setTranslate", n.translate, t);
}
function f1() {
	return -this.snapGrid[0];
}
function p1() {
	return -this.snapGrid[this.snapGrid.length - 1];
}
function h1(e, t, n, r, a) {
	e === void 0 && (e = 0),
		t === void 0 && (t = this.params.speed),
		n === void 0 && (n = !0),
		r === void 0 && (r = !0);
	const l = this,
		{ params: i, wrapperEl: o } = l;
	if (l.animating && i.preventInteractionOnTransition)
		return !1;
	const s = l.minTranslate(),
		c = l.maxTranslate();
	let d;
	if (
		(r && e > s ? (d = s) : r && e < c ? (d = c) : (d = e),
		l.updateProgress(d),
		i.cssMode)
	) {
		const f = l.isHorizontal();
		if (t === 0) o[f ? "scrollLeft" : "scrollTop"] = -d;
		else {
			if (!l.support.smoothScroll)
				return (
					op({
						swiper: l,
						targetPosition: -d,
						side: f ? "left" : "top",
					}),
					!0
				);
			o.scrollTo({
				[f ? "left" : "top"]: -d,
				behavior: "smooth",
			});
		}
		return !0;
	}
	return (
		t === 0
			? (l.setTransition(0),
			  l.setTranslate(d),
			  n &&
					(l.emit("beforeTransitionStart", t, a),
					l.emit("transitionEnd")))
			: (l.setTransition(t),
			  l.setTranslate(d),
			  n &&
					(l.emit("beforeTransitionStart", t, a),
					l.emit("transitionStart")),
			  l.animating ||
					((l.animating = !0),
					l.onTranslateToWrapperTransitionEnd ||
						(l.onTranslateToWrapperTransitionEnd = function (f) {
							!l ||
								l.destroyed ||
								(f.target === this &&
									(l.wrapperEl.removeEventListener(
										"transitionend",
										l.onTranslateToWrapperTransitionEnd
									),
									(l.onTranslateToWrapperTransitionEnd = null),
									delete l.onTranslateToWrapperTransitionEnd,
									(l.animating = !1),
									n && l.emit("transitionEnd")));
						}),
					l.wrapperEl.addEventListener(
						"transitionend",
						l.onTranslateToWrapperTransitionEnd
					))),
		!0
	);
}
var m1 = {
	getTranslate: c1,
	setTranslate: d1,
	minTranslate: f1,
	maxTranslate: p1,
	translateTo: h1,
};
function g1(e, t) {
	const n = this;
	n.params.cssMode ||
		((n.wrapperEl.style.transitionDuration = `${e}ms`),
		(n.wrapperEl.style.transitionDelay =
			e === 0 ? "0ms" : "")),
		n.emit("setTransition", e, t);
}
function fp(e) {
	let {
		swiper: t,
		runCallbacks: n,
		direction: r,
		step: a,
	} = e;
	const { activeIndex: l, previousIndex: i } = t;
	let o = r;
	if (
		(o ||
			(l > i
				? (o = "next")
				: l < i
				? (o = "prev")
				: (o = "reset")),
		t.emit(`transition${a}`),
		n && l !== i)
	) {
		if (o === "reset") {
			t.emit(`slideResetTransition${a}`);
			return;
		}
		t.emit(`slideChangeTransition${a}`),
			o === "next"
				? t.emit(`slideNextTransition${a}`)
				: t.emit(`slidePrevTransition${a}`);
	}
}
function v1(e, t) {
	e === void 0 && (e = !0);
	const n = this,
		{ params: r } = n;
	r.cssMode ||
		(r.autoHeight && n.updateAutoHeight(),
		fp({
			swiper: n,
			runCallbacks: e,
			direction: t,
			step: "Start",
		}));
}
function y1(e, t) {
	e === void 0 && (e = !0);
	const n = this,
		{ params: r } = n;
	(n.animating = !1),
		!r.cssMode &&
			(n.setTransition(0),
			fp({
				swiper: n,
				runCallbacks: e,
				direction: t,
				step: "End",
			}));
}
var b1 = {
	setTransition: g1,
	transitionStart: v1,
	transitionEnd: y1,
};
function w1(e, t, n, r, a) {
	e === void 0 && (e = 0),
		n === void 0 && (n = !0),
		typeof e == "string" && (e = parseInt(e, 10));
	const l = this;
	let i = e;
	i < 0 && (i = 0);
	const {
		params: o,
		snapGrid: s,
		slidesGrid: c,
		previousIndex: d,
		activeIndex: f,
		rtlTranslate: m,
		wrapperEl: v,
		enabled: g,
	} = l;
	if (
		(!g && !r && !a) ||
		l.destroyed ||
		(l.animating && o.preventInteractionOnTransition)
	)
		return !1;
	typeof t > "u" && (t = l.params.speed);
	const b = Math.min(l.params.slidesPerGroupSkip, i);
	let w = b + Math.floor((i - b) / l.params.slidesPerGroup);
	w >= s.length && (w = s.length - 1);
	const h = -s[w];
	if (o.normalizeSlideIndex)
		for (let y = 0; y < c.length; y += 1) {
			const S = -Math.floor(h * 100),
				x = Math.floor(c[y] * 100),
				E = Math.floor(c[y + 1] * 100);
			typeof c[y + 1] < "u"
				? S >= x && S < E - (E - x) / 2
					? (i = y)
					: S >= x && S < E && (i = y + 1)
				: S >= x && (i = y);
		}
	if (
		l.initialized &&
		i !== f &&
		((!l.allowSlideNext &&
			(m
				? h > l.translate && h > l.minTranslate()
				: h < l.translate && h < l.minTranslate())) ||
			(!l.allowSlidePrev &&
				h > l.translate &&
				h > l.maxTranslate() &&
				(f || 0) !== i))
	)
		return !1;
	i !== (d || 0) && n && l.emit("beforeSlideChangeStart"),
		l.updateProgress(h);
	let u;
	i > f
		? (u = "next")
		: i < f
		? (u = "prev")
		: (u = "reset");
	const p = l.virtual && l.params.virtual.enabled;
	if (
		!(p && a) &&
		((m && -h === l.translate) || (!m && h === l.translate))
	)
		return (
			l.updateActiveIndex(i),
			o.autoHeight && l.updateAutoHeight(),
			l.updateSlidesClasses(),
			o.effect !== "slide" && l.setTranslate(h),
			u !== "reset" &&
				(l.transitionStart(n, u), l.transitionEnd(n, u)),
			!1
		);
	if (o.cssMode) {
		const y = l.isHorizontal(),
			S = m ? h : -h;
		if (t === 0)
			p &&
				((l.wrapperEl.style.scrollSnapType = "none"),
				(l._immediateVirtual = !0)),
				p &&
				!l._cssModeVirtualInitialSet &&
				l.params.initialSlide > 0
					? ((l._cssModeVirtualInitialSet = !0),
					  requestAnimationFrame(() => {
							v[y ? "scrollLeft" : "scrollTop"] = S;
					  }))
					: (v[y ? "scrollLeft" : "scrollTop"] = S),
				p &&
					requestAnimationFrame(() => {
						(l.wrapperEl.style.scrollSnapType = ""),
							(l._immediateVirtual = !1);
					});
		else {
			if (!l.support.smoothScroll)
				return (
					op({
						swiper: l,
						targetPosition: S,
						side: y ? "left" : "top",
					}),
					!0
				);
			v.scrollTo({
				[y ? "left" : "top"]: S,
				behavior: "smooth",
			});
		}
		return !0;
	}
	return (
		l.setTransition(t),
		l.setTranslate(h),
		l.updateActiveIndex(i),
		l.updateSlidesClasses(),
		l.emit("beforeTransitionStart", t, r),
		l.transitionStart(n, u),
		t === 0
			? l.transitionEnd(n, u)
			: l.animating ||
			  ((l.animating = !0),
			  l.onSlideToWrapperTransitionEnd ||
					(l.onSlideToWrapperTransitionEnd = function (y) {
						!l ||
							l.destroyed ||
							(y.target === this &&
								(l.wrapperEl.removeEventListener(
									"transitionend",
									l.onSlideToWrapperTransitionEnd
								),
								(l.onSlideToWrapperTransitionEnd = null),
								delete l.onSlideToWrapperTransitionEnd,
								l.transitionEnd(n, u)));
					}),
			  l.wrapperEl.addEventListener(
					"transitionend",
					l.onSlideToWrapperTransitionEnd
			  )),
		!0
	);
}
function S1(e, t, n, r) {
	e === void 0 && (e = 0),
		n === void 0 && (n = !0),
		typeof e == "string" && (e = parseInt(e, 10));
	const a = this;
	if (a.destroyed) return;
	typeof t > "u" && (t = a.params.speed);
	const l =
		a.grid && a.params.grid && a.params.grid.rows > 1;
	let i = e;
	if (a.params.loop)
		if (a.virtual && a.params.virtual.enabled)
			i = i + a.virtual.slidesBefore;
		else {
			let o;
			if (l) {
				const m = i * a.params.grid.rows;
				o = a.slides.filter(
					(v) =>
						v.getAttribute("data-swiper-slide-index") * 1 === m
				)[0].column;
			} else o = a.getSlideIndexByData(i);
			const s = l
					? Math.ceil(a.slides.length / a.params.grid.rows)
					: a.slides.length,
				{ centeredSlides: c } = a.params;
			let d = a.params.slidesPerView;
			d === "auto"
				? (d = a.slidesPerViewDynamic())
				: ((d = Math.ceil(
						parseFloat(a.params.slidesPerView, 10)
				  )),
				  c && d % 2 === 0 && (d = d + 1));
			let f = s - o < d;
			if (
				(c && (f = f || o < Math.ceil(d / 2)),
				r &&
					c &&
					a.params.slidesPerView !== "auto" &&
					!l &&
					(f = !1),
				f)
			) {
				const m = c
					? o < a.activeIndex
						? "prev"
						: "next"
					: o - a.activeIndex - 1 < a.params.slidesPerView
					? "next"
					: "prev";
				a.loopFix({
					direction: m,
					slideTo: !0,
					activeSlideIndex: m === "next" ? o + 1 : o - s + 1,
					slideRealIndex: m === "next" ? a.realIndex : void 0,
				});
			}
			if (l) {
				const m = i * a.params.grid.rows;
				i = a.slides.filter(
					(v) =>
						v.getAttribute("data-swiper-slide-index") * 1 === m
				)[0].column;
			} else i = a.getSlideIndexByData(i);
		}
	return (
		requestAnimationFrame(() => {
			a.slideTo(i, t, n, r);
		}),
		a
	);
}
function x1(e, t, n) {
	t === void 0 && (t = !0);
	const r = this,
		{ enabled: a, params: l, animating: i } = r;
	if (!a || r.destroyed) return r;
	typeof e > "u" && (e = r.params.speed);
	let o = l.slidesPerGroup;
	l.slidesPerView === "auto" &&
		l.slidesPerGroup === 1 &&
		l.slidesPerGroupAuto &&
		(o = Math.max(r.slidesPerViewDynamic("current", !0), 1));
	const s = r.activeIndex < l.slidesPerGroupSkip ? 1 : o,
		c = r.virtual && l.virtual.enabled;
	if (l.loop) {
		if (i && !c && l.loopPreventsSliding) return !1;
		if (
			(r.loopFix({ direction: "next" }),
			(r._clientLeft = r.wrapperEl.clientLeft),
			r.activeIndex === r.slides.length - 1 && l.cssMode)
		)
			return (
				requestAnimationFrame(() => {
					r.slideTo(r.activeIndex + s, e, t, n);
				}),
				!0
			);
	}
	return l.rewind && r.isEnd
		? r.slideTo(0, e, t, n)
		: r.slideTo(r.activeIndex + s, e, t, n);
}
function k1(e, t, n) {
	t === void 0 && (t = !0);
	const r = this,
		{
			params: a,
			snapGrid: l,
			slidesGrid: i,
			rtlTranslate: o,
			enabled: s,
			animating: c,
		} = r;
	if (!s || r.destroyed) return r;
	typeof e > "u" && (e = r.params.speed);
	const d = r.virtual && a.virtual.enabled;
	if (a.loop) {
		if (c && !d && a.loopPreventsSliding) return !1;
		r.loopFix({ direction: "prev" }),
			(r._clientLeft = r.wrapperEl.clientLeft);
	}
	const f = o ? r.translate : -r.translate;
	function m(h) {
		return h < 0 ? -Math.floor(Math.abs(h)) : Math.floor(h);
	}
	const v = m(f),
		g = l.map((h) => m(h));
	let b = l[g.indexOf(v) - 1];
	if (typeof b > "u" && a.cssMode) {
		let h;
		l.forEach((u, p) => {
			v >= u && (h = p);
		}),
			typeof h < "u" && (b = l[h > 0 ? h - 1 : h]);
	}
	let w = 0;
	if (
		(typeof b < "u" &&
			((w = i.indexOf(b)),
			w < 0 && (w = r.activeIndex - 1),
			a.slidesPerView === "auto" &&
				a.slidesPerGroup === 1 &&
				a.slidesPerGroupAuto &&
				((w = w - r.slidesPerViewDynamic("previous", !0) + 1),
				(w = Math.max(w, 0)))),
		a.rewind && r.isBeginning)
	) {
		const h =
			r.params.virtual && r.params.virtual.enabled && r.virtual
				? r.virtual.slides.length - 1
				: r.slides.length - 1;
		return r.slideTo(h, e, t, n);
	} else if (a.loop && r.activeIndex === 0 && a.cssMode)
		return (
			requestAnimationFrame(() => {
				r.slideTo(w, e, t, n);
			}),
			!0
		);
	return r.slideTo(w, e, t, n);
}
function E1(e, t, n) {
	t === void 0 && (t = !0);
	const r = this;
	if (!r.destroyed)
		return (
			typeof e > "u" && (e = r.params.speed),
			r.slideTo(r.activeIndex, e, t, n)
		);
}
function C1(e, t, n, r) {
	t === void 0 && (t = !0), r === void 0 && (r = 0.5);
	const a = this;
	if (a.destroyed) return;
	typeof e > "u" && (e = a.params.speed);
	let l = a.activeIndex;
	const i = Math.min(a.params.slidesPerGroupSkip, l),
		o = i + Math.floor((l - i) / a.params.slidesPerGroup),
		s = a.rtlTranslate ? a.translate : -a.translate;
	if (s >= a.snapGrid[o]) {
		const c = a.snapGrid[o],
			d = a.snapGrid[o + 1];
		s - c > (d - c) * r && (l += a.params.slidesPerGroup);
	} else {
		const c = a.snapGrid[o - 1],
			d = a.snapGrid[o];
		s - c <= (d - c) * r && (l -= a.params.slidesPerGroup);
	}
	return (
		(l = Math.max(l, 0)),
		(l = Math.min(l, a.slidesGrid.length - 1)),
		a.slideTo(l, e, t, n)
	);
}
function T1() {
	const e = this;
	if (e.destroyed) return;
	const { params: t, slidesEl: n } = e,
		r =
			t.slidesPerView === "auto"
				? e.slidesPerViewDynamic()
				: t.slidesPerView;
	let a = e.clickedIndex,
		l;
	const i = e.isElement
		? "swiper-slide"
		: `.${t.slideClass}`;
	if (t.loop) {
		if (e.animating) return;
		(l = parseInt(
			e.clickedSlide.getAttribute("data-swiper-slide-index"),
			10
		)),
			t.centeredSlides
				? a < e.loopedSlides - r / 2 ||
				  a > e.slides.length - e.loopedSlides + r / 2
					? (e.loopFix(),
					  (a = e.getSlideIndex(
							lt(n, `${i}[data-swiper-slide-index="${l}"]`)[0]
					  )),
					  hs(() => {
							e.slideTo(a);
					  }))
					: e.slideTo(a)
				: a > e.slides.length - r
				? (e.loopFix(),
				  (a = e.getSlideIndex(
						lt(n, `${i}[data-swiper-slide-index="${l}"]`)[0]
				  )),
				  hs(() => {
						e.slideTo(a);
				  }))
				: e.slideTo(a);
	} else e.slideTo(a);
}
var _1 = {
	slideTo: w1,
	slideToLoop: S1,
	slideNext: x1,
	slidePrev: k1,
	slideReset: E1,
	slideToClosest: C1,
	slideToClickedSlide: T1,
};
function P1(e) {
	const t = this,
		{ params: n, slidesEl: r } = t;
	if (!n.loop || (t.virtual && t.params.virtual.enabled))
		return;
	const a = () => {
			lt(r, `.${n.slideClass}, swiper-slide`).forEach(
				(d, f) => {
					d.setAttribute("data-swiper-slide-index", f);
				}
			);
		},
		l = t.grid && n.grid && n.grid.rows > 1,
		i = n.slidesPerGroup * (l ? n.grid.rows : 1),
		o = t.slides.length % i !== 0,
		s = l && t.slides.length % n.grid.rows !== 0,
		c = (d) => {
			for (let f = 0; f < d; f += 1) {
				const m = t.isElement
					? Ol("swiper-slide", [n.slideBlankClass])
					: Ol("div", [n.slideClass, n.slideBlankClass]);
				t.slidesEl.append(m);
			}
		};
	if (o) {
		if (n.loopAddBlankSlides) {
			const d = i - (t.slides.length % i);
			c(d), t.recalcSlides(), t.updateSlides();
		} else
			Pl(
				"Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
			);
		a();
	} else if (s) {
		if (n.loopAddBlankSlides) {
			const d = n.grid.rows - (t.slides.length % n.grid.rows);
			c(d), t.recalcSlides(), t.updateSlides();
		} else
			Pl(
				"Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
			);
		a();
	} else a();
	t.loopFix({
		slideRealIndex: e,
		direction: n.centeredSlides ? void 0 : "next",
	});
}
function O1(e) {
	let {
		slideRealIndex: t,
		slideTo: n = !0,
		direction: r,
		setTranslate: a,
		activeSlideIndex: l,
		byController: i,
		byMousewheel: o,
	} = e === void 0 ? {} : e;
	const s = this;
	if (!s.params.loop) return;
	s.emit("beforeLoopFix");
	const {
			slides: c,
			allowSlidePrev: d,
			allowSlideNext: f,
			slidesEl: m,
			params: v,
		} = s,
		{ centeredSlides: g } = v;
	if (
		((s.allowSlidePrev = !0),
		(s.allowSlideNext = !0),
		s.virtual && v.virtual.enabled)
	) {
		n &&
			(!v.centeredSlides && s.snapIndex === 0
				? s.slideTo(s.virtual.slides.length, 0, !1, !0)
				: v.centeredSlides && s.snapIndex < v.slidesPerView
				? s.slideTo(
						s.virtual.slides.length + s.snapIndex,
						0,
						!1,
						!0
				  )
				: s.snapIndex === s.snapGrid.length - 1 &&
				  s.slideTo(s.virtual.slidesBefore, 0, !1, !0)),
			(s.allowSlidePrev = d),
			(s.allowSlideNext = f),
			s.emit("loopFix");
		return;
	}
	let b = v.slidesPerView;
	b === "auto"
		? (b = s.slidesPerViewDynamic())
		: ((b = Math.ceil(parseFloat(v.slidesPerView, 10))),
		  g && b % 2 === 0 && (b = b + 1));
	const w = v.slidesPerGroupAuto ? b : v.slidesPerGroup;
	let h = w;
	h % w !== 0 && (h += w - (h % w)),
		(h += v.loopAdditionalSlides),
		(s.loopedSlides = h);
	const u = s.grid && v.grid && v.grid.rows > 1;
	c.length < b + h
		? Pl(
				"Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
		  )
		: u &&
		  v.grid.fill === "row" &&
		  Pl(
				"Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
		  );
	const p = [],
		y = [];
	let S = s.activeIndex;
	typeof l > "u"
		? (l = s.getSlideIndex(
				c.filter((L) =>
					L.classList.contains(v.slideActiveClass)
				)[0]
		  ))
		: (S = l);
	const x = r === "next" || !r,
		E = r === "prev" || !r;
	let T = 0,
		P = 0;
	const k = u ? Math.ceil(c.length / v.grid.rows) : c.length,
		z =
			(u ? c[l].column : l) +
			(g && typeof a > "u" ? -b / 2 + 0.5 : 0);
	if (z < h) {
		T = Math.max(h - z, w);
		for (let L = 0; L < h - z; L += 1) {
			const I = L - Math.floor(L / k) * k;
			if (u) {
				const D = k - I - 1;
				for (let B = c.length - 1; B >= 0; B -= 1)
					c[B].column === D && p.push(B);
			} else p.push(k - I - 1);
		}
	} else if (z + b > k - h) {
		P = Math.max(z - (k - h * 2), w);
		for (let L = 0; L < P; L += 1) {
			const I = L - Math.floor(L / k) * k;
			u
				? c.forEach((D, B) => {
						D.column === I && y.push(B);
				  })
				: y.push(I);
		}
	}
	if (
		((s.__preventObserver__ = !0),
		requestAnimationFrame(() => {
			s.__preventObserver__ = !1;
		}),
		E &&
			p.forEach((L) => {
				(c[L].swiperLoopMoveDOM = !0),
					m.prepend(c[L]),
					(c[L].swiperLoopMoveDOM = !1);
			}),
		x &&
			y.forEach((L) => {
				(c[L].swiperLoopMoveDOM = !0),
					m.append(c[L]),
					(c[L].swiperLoopMoveDOM = !1);
			}),
		s.recalcSlides(),
		v.slidesPerView === "auto"
			? s.updateSlides()
			: u &&
			  ((p.length > 0 && E) || (y.length > 0 && x)) &&
			  s.slides.forEach((L, I) => {
					s.grid.updateSlide(I, L, s.slides);
			  }),
		v.watchSlidesProgress && s.updateSlidesOffset(),
		n)
	) {
		if (p.length > 0 && E) {
			if (typeof t > "u") {
				const L = s.slidesGrid[S],
					I = s.slidesGrid[S + T] - L;
				o
					? s.setTranslate(s.translate - I)
					: (s.slideTo(S + Math.ceil(T), 0, !1, !0),
					  a &&
							((s.touchEventsData.startTranslate =
								s.touchEventsData.startTranslate - I),
							(s.touchEventsData.currentTranslate =
								s.touchEventsData.currentTranslate - I)));
			} else if (a) {
				const L = u ? p.length / v.grid.rows : p.length;
				s.slideTo(s.activeIndex + L, 0, !1, !0),
					(s.touchEventsData.currentTranslate = s.translate);
			}
		} else if (y.length > 0 && x)
			if (typeof t > "u") {
				const L = s.slidesGrid[S],
					I = s.slidesGrid[S - P] - L;
				o
					? s.setTranslate(s.translate - I)
					: (s.slideTo(S - P, 0, !1, !0),
					  a &&
							((s.touchEventsData.startTranslate =
								s.touchEventsData.startTranslate - I),
							(s.touchEventsData.currentTranslate =
								s.touchEventsData.currentTranslate - I)));
			} else {
				const L = u ? y.length / v.grid.rows : y.length;
				s.slideTo(s.activeIndex - L, 0, !1, !0);
			}
	}
	if (
		((s.allowSlidePrev = d),
		(s.allowSlideNext = f),
		s.controller && s.controller.control && !i)
	) {
		const L = {
			slideRealIndex: t,
			direction: r,
			setTranslate: a,
			activeSlideIndex: l,
			byController: !0,
		};
		Array.isArray(s.controller.control)
			? s.controller.control.forEach((I) => {
					!I.destroyed &&
						I.params.loop &&
						I.loopFix({
							...L,
							slideTo:
								I.params.slidesPerView === v.slidesPerView ? n : !1,
						});
			  })
			: s.controller.control instanceof s.constructor &&
			  s.controller.control.params.loop &&
			  s.controller.control.loopFix({
					...L,
					slideTo:
						s.controller.control.params.slidesPerView ===
						v.slidesPerView
							? n
							: !1,
			  });
	}
	s.emit("loopFix");
}
function L1() {
	const e = this,
		{ params: t, slidesEl: n } = e;
	if (!t.loop || (e.virtual && e.params.virtual.enabled))
		return;
	e.recalcSlides();
	const r = [];
	e.slides.forEach((a) => {
		const l =
			typeof a.swiperSlideIndex > "u"
				? a.getAttribute("data-swiper-slide-index") * 1
				: a.swiperSlideIndex;
		r[l] = a;
	}),
		e.slides.forEach((a) => {
			a.removeAttribute("data-swiper-slide-index");
		}),
		r.forEach((a) => {
			n.append(a);
		}),
		e.recalcSlides(),
		e.slideTo(e.realIndex, 0);
}
var z1 = { loopCreate: P1, loopFix: O1, loopDestroy: L1 };
function M1(e) {
	const t = this;
	if (
		!t.params.simulateTouch ||
		(t.params.watchOverflow && t.isLocked) ||
		t.params.cssMode
	)
		return;
	const n =
		t.params.touchEventsTarget === "container"
			? t.el
			: t.wrapperEl;
	t.isElement && (t.__preventObserver__ = !0),
		(n.style.cursor = "move"),
		(n.style.cursor = e ? "grabbing" : "grab"),
		t.isElement &&
			requestAnimationFrame(() => {
				t.__preventObserver__ = !1;
			});
}
function N1() {
	const e = this;
	(e.params.watchOverflow && e.isLocked) ||
		e.params.cssMode ||
		(e.isElement && (e.__preventObserver__ = !0),
		(e[
			e.params.touchEventsTarget === "container"
				? "el"
				: "wrapperEl"
		].style.cursor = ""),
		e.isElement &&
			requestAnimationFrame(() => {
				e.__preventObserver__ = !1;
			}));
}
var I1 = { setGrabCursor: M1, unsetGrabCursor: N1 };
function j1(e, t) {
	t === void 0 && (t = this);
	function n(r) {
		if (!r || r === Gn() || r === Re()) return null;
		r.assignedSlot && (r = r.assignedSlot);
		const a = r.closest(e);
		return !a && !r.getRootNode
			? null
			: a || n(r.getRootNode().host);
	}
	return n(t);
}
function pp(e, t, n) {
	const r = Re(),
		{ params: a } = e,
		l = a.edgeSwipeDetection,
		i = a.edgeSwipeThreshold;
	return l && (n <= i || n >= r.innerWidth - i)
		? l === "prevent"
			? (t.preventDefault(), !0)
			: !1
		: !0;
}
function R1(e) {
	const t = this,
		n = Gn();
	let r = e;
	r.originalEvent && (r = r.originalEvent);
	const a = t.touchEventsData;
	if (r.type === "pointerdown") {
		if (a.pointerId !== null && a.pointerId !== r.pointerId)
			return;
		a.pointerId = r.pointerId;
	} else
		r.type === "touchstart" &&
			r.targetTouches.length === 1 &&
			(a.touchId = r.targetTouches[0].identifier);
	if (r.type === "touchstart") {
		pp(t, r, r.targetTouches[0].pageX);
		return;
	}
	const { params: l, touches: i, enabled: o } = t;
	if (
		!o ||
		(!l.simulateTouch && r.pointerType === "mouse") ||
		(t.animating && l.preventInteractionOnTransition)
	)
		return;
	!t.animating && l.cssMode && l.loop && t.loopFix();
	let s = r.target;
	if (
		(l.touchEventsTarget === "wrapper" &&
			!H0(s, t.wrapperEl)) ||
		("which" in r && r.which === 3) ||
		("button" in r && r.button > 0) ||
		(a.isTouched && a.isMoved)
	)
		return;
	const c = !!l.noSwipingClass && l.noSwipingClass !== "",
		d = r.composedPath ? r.composedPath() : r.path;
	c && r.target && r.target.shadowRoot && d && (s = d[0]);
	const f = l.noSwipingSelector
			? l.noSwipingSelector
			: `.${l.noSwipingClass}`,
		m = !!(r.target && r.target.shadowRoot);
	if (l.noSwiping && (m ? j1(f, s) : s.closest(f))) {
		t.allowClick = !0;
		return;
	}
	if (l.swipeHandler && !s.closest(l.swipeHandler)) return;
	(i.currentX = r.pageX), (i.currentY = r.pageY);
	const v = i.currentX,
		g = i.currentY;
	if (!pp(t, r, v)) return;
	Object.assign(a, {
		isTouched: !0,
		isMoved: !1,
		allowTouchCallbacks: !0,
		isScrolling: void 0,
		startMoving: void 0,
	}),
		(i.startX = v),
		(i.startY = g),
		(a.touchStartTime = Cl()),
		(t.allowClick = !0),
		t.updateSize(),
		(t.swipeDirection = void 0),
		l.threshold > 0 && (a.allowThresholdMove = !1);
	let b = !0;
	s.matches(a.focusableElements) &&
		((b = !1), s.nodeName === "SELECT" && (a.isTouched = !1)),
		n.activeElement &&
			n.activeElement.matches(a.focusableElements) &&
			n.activeElement !== s &&
			(r.pointerType === "mouse" ||
				(r.pointerType !== "mouse" &&
					!s.matches(a.focusableElements))) &&
			n.activeElement.blur();
	const w =
		b && t.allowTouchMove && l.touchStartPreventDefault;
	(l.touchStartForcePreventDefault || w) &&
		!s.isContentEditable &&
		r.preventDefault(),
		l.freeMode &&
			l.freeMode.enabled &&
			t.freeMode &&
			t.animating &&
			!l.cssMode &&
			t.freeMode.onTouchStart(),
		t.emit("touchStart", r);
}
function A1(e) {
	const t = Gn(),
		n = this,
		r = n.touchEventsData,
		{
			params: a,
			touches: l,
			rtlTranslate: i,
			enabled: o,
		} = n;
	if (!o || (!a.simulateTouch && e.pointerType === "mouse"))
		return;
	let s = e;
	if (
		(s.originalEvent && (s = s.originalEvent),
		s.type === "pointermove" &&
			(r.touchId !== null || s.pointerId !== r.pointerId))
	)
		return;
	let c;
	if (s.type === "touchmove") {
		if (
			((c = [...s.changedTouches].filter(
				(x) => x.identifier === r.touchId
			)[0]),
			!c || c.identifier !== r.touchId)
		)
			return;
	} else c = s;
	if (!r.isTouched) {
		r.startMoving &&
			r.isScrolling &&
			n.emit("touchMoveOpposite", s);
		return;
	}
	const d = c.pageX,
		f = c.pageY;
	if (s.preventedByNestedSwiper) {
		(l.startX = d), (l.startY = f);
		return;
	}
	if (!n.allowTouchMove) {
		s.target.matches(r.focusableElements) ||
			(n.allowClick = !1),
			r.isTouched &&
				(Object.assign(l, {
					startX: d,
					startY: f,
					currentX: d,
					currentY: f,
				}),
				(r.touchStartTime = Cl()));
		return;
	}
	if (a.touchReleaseOnEdges && !a.loop) {
		if (n.isVertical()) {
			if (
				(f < l.startY && n.translate <= n.maxTranslate()) ||
				(f > l.startY && n.translate >= n.minTranslate())
			) {
				(r.isTouched = !1), (r.isMoved = !1);
				return;
			}
		} else if (
			(d < l.startX && n.translate <= n.maxTranslate()) ||
			(d > l.startX && n.translate >= n.minTranslate())
		)
			return;
	}
	if (
		(t.activeElement &&
			t.activeElement.matches(r.focusableElements) &&
			t.activeElement !== s.target &&
			s.pointerType !== "mouse" &&
			t.activeElement.blur(),
		t.activeElement &&
			s.target === t.activeElement &&
			s.target.matches(r.focusableElements))
	) {
		(r.isMoved = !0), (n.allowClick = !1);
		return;
	}
	r.allowTouchCallbacks && n.emit("touchMove", s),
		(l.previousX = l.currentX),
		(l.previousY = l.currentY),
		(l.currentX = d),
		(l.currentY = f);
	const m = l.currentX - l.startX,
		v = l.currentY - l.startY;
	if (
		n.params.threshold &&
		Math.sqrt(m ** 2 + v ** 2) < n.params.threshold
	)
		return;
	if (typeof r.isScrolling > "u") {
		let x;
		(n.isHorizontal() && l.currentY === l.startY) ||
		(n.isVertical() && l.currentX === l.startX)
			? (r.isScrolling = !1)
			: m * m + v * v >= 25 &&
			  ((x =
					(Math.atan2(Math.abs(v), Math.abs(m)) * 180) /
					Math.PI),
			  (r.isScrolling = n.isHorizontal()
					? x > a.touchAngle
					: 90 - x > a.touchAngle));
	}
	if (
		(r.isScrolling && n.emit("touchMoveOpposite", s),
		typeof r.startMoving > "u" &&
			(l.currentX !== l.startX || l.currentY !== l.startY) &&
			(r.startMoving = !0),
		r.isScrolling ||
			(s.type === "touchmove" &&
				r.preventTouchMoveFromPointerMove))
	) {
		r.isTouched = !1;
		return;
	}
	if (!r.startMoving) return;
	(n.allowClick = !1),
		!a.cssMode && s.cancelable && s.preventDefault(),
		a.touchMoveStopPropagation &&
			!a.nested &&
			s.stopPropagation();
	let g = n.isHorizontal() ? m : v,
		b = n.isHorizontal()
			? l.currentX - l.previousX
			: l.currentY - l.previousY;
	a.oneWayMovement &&
		((g = Math.abs(g) * (i ? 1 : -1)),
		(b = Math.abs(b) * (i ? 1 : -1))),
		(l.diff = g),
		(g *= a.touchRatio),
		i && ((g = -g), (b = -b));
	const w = n.touchesDirection;
	(n.swipeDirection = g > 0 ? "prev" : "next"),
		(n.touchesDirection = b > 0 ? "prev" : "next");
	const h = n.params.loop && !a.cssMode,
		u =
			(n.touchesDirection === "next" && n.allowSlideNext) ||
			(n.touchesDirection === "prev" && n.allowSlidePrev);
	if (!r.isMoved) {
		if (
			(h && u && n.loopFix({ direction: n.swipeDirection }),
			(r.startTranslate = n.getTranslate()),
			n.setTransition(0),
			n.animating)
		) {
			const x = new window.CustomEvent("transitionend", {
				bubbles: !0,
				cancelable: !0,
				detail: { bySwiperTouchMove: !0 },
			});
			n.wrapperEl.dispatchEvent(x);
		}
		(r.allowMomentumBounce = !1),
			a.grabCursor &&
				(n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
				n.setGrabCursor(!0),
			n.emit("sliderFirstMove", s);
	}
	let p;
	if (
		(new Date().getTime(),
		r.isMoved &&
			r.allowThresholdMove &&
			w !== n.touchesDirection &&
			h &&
			u &&
			Math.abs(g) >= 1)
	) {
		Object.assign(l, {
			startX: d,
			startY: f,
			currentX: d,
			currentY: f,
			startTranslate: r.currentTranslate,
		}),
			(r.loopSwapReset = !0),
			(r.startTranslate = r.currentTranslate);
		return;
	}
	n.emit("sliderMove", s),
		(r.isMoved = !0),
		(r.currentTranslate = g + r.startTranslate);
	let y = !0,
		S = a.resistanceRatio;
	if (
		(a.touchReleaseOnEdges && (S = 0),
		g > 0
			? (h &&
					u &&
					!p &&
					r.allowThresholdMove &&
					r.currentTranslate >
						(a.centeredSlides
							? n.minTranslate() -
							  n.slidesSizesGrid[n.activeIndex + 1] -
							  (a.slidesPerView !== "auto" &&
							  n.slides.length - a.slidesPerView >= 2
									? n.slidesSizesGrid[n.activeIndex + 1] +
									  n.params.spaceBetween
									: 0) -
							  n.params.spaceBetween
							: n.minTranslate()) &&
					n.loopFix({
						direction: "prev",
						setTranslate: !0,
						activeSlideIndex: 0,
					}),
			  r.currentTranslate > n.minTranslate() &&
					((y = !1),
					a.resistance &&
						(r.currentTranslate =
							n.minTranslate() -
							1 +
							(-n.minTranslate() + r.startTranslate + g) ** S)))
			: g < 0 &&
			  (h &&
					u &&
					!p &&
					r.allowThresholdMove &&
					r.currentTranslate <
						(a.centeredSlides
							? n.maxTranslate() +
							  n.slidesSizesGrid[n.slidesSizesGrid.length - 1] +
							  n.params.spaceBetween +
							  (a.slidesPerView !== "auto" &&
							  n.slides.length - a.slidesPerView >= 2
									? n.slidesSizesGrid[n.slidesSizesGrid.length - 1] +
									  n.params.spaceBetween
									: 0)
							: n.maxTranslate()) &&
					n.loopFix({
						direction: "next",
						setTranslate: !0,
						activeSlideIndex:
							n.slides.length -
							(a.slidesPerView === "auto"
								? n.slidesPerViewDynamic()
								: Math.ceil(parseFloat(a.slidesPerView, 10))),
					}),
			  r.currentTranslate < n.maxTranslate() &&
					((y = !1),
					a.resistance &&
						(r.currentTranslate =
							n.maxTranslate() +
							1 -
							(n.maxTranslate() - r.startTranslate - g) ** S))),
		y && (s.preventedByNestedSwiper = !0),
		!n.allowSlideNext &&
			n.swipeDirection === "next" &&
			r.currentTranslate < r.startTranslate &&
			(r.currentTranslate = r.startTranslate),
		!n.allowSlidePrev &&
			n.swipeDirection === "prev" &&
			r.currentTranslate > r.startTranslate &&
			(r.currentTranslate = r.startTranslate),
		!n.allowSlidePrev &&
			!n.allowSlideNext &&
			(r.currentTranslate = r.startTranslate),
		a.threshold > 0)
	)
		if (Math.abs(g) > a.threshold || r.allowThresholdMove) {
			if (!r.allowThresholdMove) {
				(r.allowThresholdMove = !0),
					(l.startX = l.currentX),
					(l.startY = l.currentY),
					(r.currentTranslate = r.startTranslate),
					(l.diff = n.isHorizontal()
						? l.currentX - l.startX
						: l.currentY - l.startY);
				return;
			}
		} else {
			r.currentTranslate = r.startTranslate;
			return;
		}
	!a.followFinger ||
		a.cssMode ||
		(((a.freeMode && a.freeMode.enabled && n.freeMode) ||
			a.watchSlidesProgress) &&
			(n.updateActiveIndex(), n.updateSlidesClasses()),
		a.freeMode &&
			a.freeMode.enabled &&
			n.freeMode &&
			n.freeMode.onTouchMove(),
		n.updateProgress(r.currentTranslate),
		n.setTranslate(r.currentTranslate));
}
function D1(e) {
	const t = this,
		n = t.touchEventsData;
	let r = e;
	r.originalEvent && (r = r.originalEvent);
	let a;
	if (r.type === "touchend" || r.type === "touchcancel") {
		if (
			((a = [...r.changedTouches].filter(
				(y) => y.identifier === n.touchId
			)[0]),
			!a || a.identifier !== n.touchId)
		)
			return;
	} else {
		if (n.touchId !== null || r.pointerId !== n.pointerId)
			return;
		a = r;
	}
	if (
		[
			"pointercancel",
			"pointerout",
			"pointerleave",
			"contextmenu",
		].includes(r.type) &&
		!(
			["pointercancel", "contextmenu"].includes(r.type) &&
			(t.browser.isSafari || t.browser.isWebView)
		)
	)
		return;
	(n.pointerId = null), (n.touchId = null);
	const {
		params: l,
		touches: i,
		rtlTranslate: o,
		slidesGrid: s,
		enabled: c,
	} = t;
	if (!c || (!l.simulateTouch && r.pointerType === "mouse"))
		return;
	if (
		(n.allowTouchCallbacks && t.emit("touchEnd", r),
		(n.allowTouchCallbacks = !1),
		!n.isTouched)
	) {
		n.isMoved && l.grabCursor && t.setGrabCursor(!1),
			(n.isMoved = !1),
			(n.startMoving = !1);
		return;
	}
	l.grabCursor &&
		n.isMoved &&
		n.isTouched &&
		(t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
		t.setGrabCursor(!1);
	const d = Cl(),
		f = d - n.touchStartTime;
	if (t.allowClick) {
		const y = r.path || (r.composedPath && r.composedPath());
		t.updateClickedSlide((y && y[0]) || r.target, y),
			t.emit("tap click", r),
			f < 300 &&
				d - n.lastClickTime < 300 &&
				t.emit("doubleTap doubleClick", r);
	}
	if (
		((n.lastClickTime = Cl()),
		hs(() => {
			t.destroyed || (t.allowClick = !0);
		}),
		!n.isTouched ||
			!n.isMoved ||
			!t.swipeDirection ||
			(i.diff === 0 && !n.loopSwapReset) ||
			(n.currentTranslate === n.startTranslate &&
				!n.loopSwapReset))
	) {
		(n.isTouched = !1),
			(n.isMoved = !1),
			(n.startMoving = !1);
		return;
	}
	(n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1);
	let m;
	if (
		(l.followFinger
			? (m = o ? t.translate : -t.translate)
			: (m = -n.currentTranslate),
		l.cssMode)
	)
		return;
	if (l.freeMode && l.freeMode.enabled) {
		t.freeMode.onTouchEnd({ currentPos: m });
		return;
	}
	const v = m >= -t.maxTranslate() && !t.params.loop;
	let g = 0,
		b = t.slidesSizesGrid[0];
	for (
		let y = 0;
		y < s.length;
		y += y < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup
	) {
		const S =
			y < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
		typeof s[y + S] < "u"
			? (v || (m >= s[y] && m < s[y + S])) &&
			  ((g = y), (b = s[y + S] - s[y]))
			: (v || m >= s[y]) &&
			  ((g = y), (b = s[s.length - 1] - s[s.length - 2]));
	}
	let w = null,
		h = null;
	l.rewind &&
		(t.isBeginning
			? (h =
					l.virtual && l.virtual.enabled && t.virtual
						? t.virtual.slides.length - 1
						: t.slides.length - 1)
			: t.isEnd && (w = 0));
	const u = (m - s[g]) / b,
		p = g < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup;
	if (f > l.longSwipesMs) {
		if (!l.longSwipes) {
			t.slideTo(t.activeIndex);
			return;
		}
		t.swipeDirection === "next" &&
			(u >= l.longSwipesRatio
				? t.slideTo(l.rewind && t.isEnd ? w : g + p)
				: t.slideTo(g)),
			t.swipeDirection === "prev" &&
				(u > 1 - l.longSwipesRatio
					? t.slideTo(g + p)
					: h !== null &&
					  u < 0 &&
					  Math.abs(u) > l.longSwipesRatio
					? t.slideTo(h)
					: t.slideTo(g));
	} else {
		if (!l.shortSwipes) {
			t.slideTo(t.activeIndex);
			return;
		}
		t.navigation &&
		(r.target === t.navigation.nextEl ||
			r.target === t.navigation.prevEl)
			? r.target === t.navigation.nextEl
				? t.slideTo(g + p)
				: t.slideTo(g)
			: (t.swipeDirection === "next" &&
					t.slideTo(w !== null ? w : g + p),
			  t.swipeDirection === "prev" &&
					t.slideTo(h !== null ? h : g));
	}
}
function hp() {
	const e = this,
		{ params: t, el: n } = e;
	if (n && n.offsetWidth === 0) return;
	t.breakpoints && e.setBreakpoint();
	const {
			allowSlideNext: r,
			allowSlidePrev: a,
			snapGrid: l,
		} = e,
		i = e.virtual && e.params.virtual.enabled;
	(e.allowSlideNext = !0),
		(e.allowSlidePrev = !0),
		e.updateSize(),
		e.updateSlides(),
		e.updateSlidesClasses();
	const o = i && t.loop;
	(t.slidesPerView === "auto" || t.slidesPerView > 1) &&
	e.isEnd &&
	!e.isBeginning &&
	!e.params.centeredSlides &&
	!o
		? e.slideTo(e.slides.length - 1, 0, !1, !0)
		: e.params.loop && !i
		? e.slideToLoop(e.realIndex, 0, !1, !0)
		: e.slideTo(e.activeIndex, 0, !1, !0),
		e.autoplay &&
			e.autoplay.running &&
			e.autoplay.paused &&
			(clearTimeout(e.autoplay.resizeTimeout),
			(e.autoplay.resizeTimeout = setTimeout(() => {
				e.autoplay &&
					e.autoplay.running &&
					e.autoplay.paused &&
					e.autoplay.resume();
			}, 500))),
		(e.allowSlidePrev = a),
		(e.allowSlideNext = r),
		e.params.watchOverflow &&
			l !== e.snapGrid &&
			e.checkOverflow();
}
function F1(e) {
	const t = this;
	t.enabled &&
		(t.allowClick ||
			(t.params.preventClicks && e.preventDefault(),
			t.params.preventClicksPropagation &&
				t.animating &&
				(e.stopPropagation(), e.stopImmediatePropagation())));
}
function $1() {
	const e = this,
		{ wrapperEl: t, rtlTranslate: n, enabled: r } = e;
	if (!r) return;
	(e.previousTranslate = e.translate),
		e.isHorizontal()
			? (e.translate = -t.scrollLeft)
			: (e.translate = -t.scrollTop),
		e.translate === 0 && (e.translate = 0),
		e.updateActiveIndex(),
		e.updateSlidesClasses();
	let a;
	const l = e.maxTranslate() - e.minTranslate();
	l === 0
		? (a = 0)
		: (a = (e.translate - e.minTranslate()) / l),
		a !== e.progress &&
			e.updateProgress(n ? -e.translate : e.translate),
		e.emit("setTranslate", e.translate, !1);
}
function B1(e) {
	const t = this;
	zl(t, e.target),
		!(
			t.params.cssMode ||
			(t.params.slidesPerView !== "auto" &&
				!t.params.autoHeight)
		) && t.update();
}
function V1() {
	const e = this;
	e.documentTouchHandlerProceeded ||
		((e.documentTouchHandlerProceeded = !0),
		e.params.touchReleaseOnEdges &&
			(e.el.style.touchAction = "auto"));
}
const mp = (e, t) => {
	const n = Gn(),
		{ params: r, el: a, wrapperEl: l, device: i } = e,
		o = !!r.nested,
		s =
			t === "on" ? "addEventListener" : "removeEventListener",
		c = t;
	!a ||
		typeof a == "string" ||
		(n[s]("touchstart", e.onDocumentTouchStart, {
			passive: !1,
			capture: o,
		}),
		a[s]("touchstart", e.onTouchStart, { passive: !1 }),
		a[s]("pointerdown", e.onTouchStart, { passive: !1 }),
		n[s]("touchmove", e.onTouchMove, {
			passive: !1,
			capture: o,
		}),
		n[s]("pointermove", e.onTouchMove, {
			passive: !1,
			capture: o,
		}),
		n[s]("touchend", e.onTouchEnd, { passive: !0 }),
		n[s]("pointerup", e.onTouchEnd, { passive: !0 }),
		n[s]("pointercancel", e.onTouchEnd, { passive: !0 }),
		n[s]("touchcancel", e.onTouchEnd, { passive: !0 }),
		n[s]("pointerout", e.onTouchEnd, { passive: !0 }),
		n[s]("pointerleave", e.onTouchEnd, { passive: !0 }),
		n[s]("contextmenu", e.onTouchEnd, { passive: !0 }),
		(r.preventClicks || r.preventClicksPropagation) &&
			a[s]("click", e.onClick, !0),
		r.cssMode && l[s]("scroll", e.onScroll),
		r.updateOnWindowResize
			? e[c](
					i.ios || i.android
						? "resize orientationchange observerUpdate"
						: "resize observerUpdate",
					hp,
					!0
			  )
			: e[c]("observerUpdate", hp, !0),
		a[s]("load", e.onLoad, { capture: !0 }));
};
function H1() {
	const e = this,
		{ params: t } = e;
	(e.onTouchStart = R1.bind(e)),
		(e.onTouchMove = A1.bind(e)),
		(e.onTouchEnd = D1.bind(e)),
		(e.onDocumentTouchStart = V1.bind(e)),
		t.cssMode && (e.onScroll = $1.bind(e)),
		(e.onClick = F1.bind(e)),
		(e.onLoad = B1.bind(e)),
		mp(e, "on");
}
function U1() {
	mp(this, "off");
}
var W1 = { attachEvents: H1, detachEvents: U1 };
const gp = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function G1() {
	const e = this,
		{ realIndex: t, initialized: n, params: r, el: a } = e,
		l = r.breakpoints;
	if (!l || (l && Object.keys(l).length === 0)) return;
	const i = e.getBreakpoint(
		l,
		e.params.breakpointsBase,
		e.el
	);
	if (!i || e.currentBreakpoint === i) return;
	const o = (i in l ? l[i] : void 0) || e.originalParams,
		s = gp(e, r),
		c = gp(e, o),
		d = e.params.grabCursor,
		f = o.grabCursor,
		m = r.enabled;
	s && !c
		? (a.classList.remove(
				`${r.containerModifierClass}grid`,
				`${r.containerModifierClass}grid-column`
		  ),
		  e.emitContainerClasses())
		: !s &&
		  c &&
		  (a.classList.add(`${r.containerModifierClass}grid`),
		  ((o.grid.fill && o.grid.fill === "column") ||
				(!o.grid.fill && r.grid.fill === "column")) &&
				a.classList.add(
					`${r.containerModifierClass}grid-column`
				),
		  e.emitContainerClasses()),
		d && !f
			? e.unsetGrabCursor()
			: !d && f && e.setGrabCursor(),
		["navigation", "pagination", "scrollbar"].forEach((u) => {
			if (typeof o[u] > "u") return;
			const p = r[u] && r[u].enabled,
				y = o[u] && o[u].enabled;
			p && !y && e[u].disable(), !p && y && e[u].enable();
		});
	const v = o.direction && o.direction !== r.direction,
		g = r.loop && (o.slidesPerView !== r.slidesPerView || v),
		b = r.loop;
	v && n && e.changeDirection(), Ae(e.params, o);
	const w = e.params.enabled,
		h = e.params.loop;
	Object.assign(e, {
		allowTouchMove: e.params.allowTouchMove,
		allowSlideNext: e.params.allowSlideNext,
		allowSlidePrev: e.params.allowSlidePrev,
	}),
		m && !w ? e.disable() : !m && w && e.enable(),
		(e.currentBreakpoint = i),
		e.emit("_beforeBreakpoint", o),
		n &&
			(g
				? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
				: !b && h
				? (e.loopCreate(t), e.updateSlides())
				: b && !h && e.loopDestroy()),
		e.emit("breakpoint", o);
}
function q1(e, t, n) {
	if (
		(t === void 0 && (t = "window"),
		!e || (t === "container" && !n))
	)
		return;
	let r = !1;
	const a = Re(),
		l = t === "window" ? a.innerHeight : n.clientHeight,
		i = Object.keys(e).map((o) => {
			if (typeof o == "string" && o.indexOf("@") === 0) {
				const s = parseFloat(o.substr(1));
				return { value: l * s, point: o };
			}
			return { value: o, point: o };
		});
	i.sort(
		(o, s) => parseInt(o.value, 10) - parseInt(s.value, 10)
	);
	for (let o = 0; o < i.length; o += 1) {
		const { point: s, value: c } = i[o];
		t === "window"
			? a.matchMedia(`(min-width: ${c}px)`).matches && (r = s)
			: c <= n.clientWidth && (r = s);
	}
	return r || "max";
}
var Q1 = { setBreakpoint: G1, getBreakpoint: q1 };
function X1(e, t) {
	const n = [];
	return (
		e.forEach((r) => {
			typeof r == "object"
				? Object.keys(r).forEach((a) => {
						r[a] && n.push(t + a);
				  })
				: typeof r == "string" && n.push(t + r);
		}),
		n
	);
}
function Y1() {
	const e = this,
		{
			classNames: t,
			params: n,
			rtl: r,
			el: a,
			device: l,
		} = e,
		i = X1(
			[
				"initialized",
				n.direction,
				{
					"free-mode": e.params.freeMode && n.freeMode.enabled,
				},
				{ autoheight: n.autoHeight },
				{ rtl: r },
				{ grid: n.grid && n.grid.rows > 1 },
				{
					"grid-column":
						n.grid && n.grid.rows > 1 && n.grid.fill === "column",
				},
				{ android: l.android },
				{ ios: l.ios },
				{ "css-mode": n.cssMode },
				{ centered: n.cssMode && n.centeredSlides },
				{ "watch-progress": n.watchSlidesProgress },
			],
			n.containerModifierClass
		);
	t.push(...i),
		a.classList.add(...t),
		e.emitContainerClasses();
}
function K1() {
	const e = this,
		{ el: t, classNames: n } = e;
	!t ||
		typeof t == "string" ||
		(t.classList.remove(...n), e.emitContainerClasses());
}
var Z1 = { addClasses: Y1, removeClasses: K1 };
function J1() {
	const e = this,
		{ isLocked: t, params: n } = e,
		{ slidesOffsetBefore: r } = n;
	if (r) {
		const a = e.slides.length - 1,
			l = e.slidesGrid[a] + e.slidesSizesGrid[a] + r * 2;
		e.isLocked = e.size > l;
	} else e.isLocked = e.snapGrid.length === 1;
	n.allowSlideNext === !0 &&
		(e.allowSlideNext = !e.isLocked),
		n.allowSlidePrev === !0 &&
			(e.allowSlidePrev = !e.isLocked),
		t && t !== e.isLocked && (e.isEnd = !1),
		t !== e.isLocked &&
			e.emit(e.isLocked ? "lock" : "unlock");
}
var ey = { checkOverflow: J1 },
	xs = {
		init: !0,
		direction: "horizontal",
		oneWayMovement: !1,
		swiperElementNodeName: "SWIPER-CONTAINER",
		touchEventsTarget: "wrapper",
		initialSlide: 0,
		speed: 300,
		cssMode: !1,
		updateOnWindowResize: !0,
		resizeObserver: !0,
		nested: !1,
		createElements: !1,
		eventsPrefix: "swiper",
		enabled: !0,
		focusableElements:
			"input, select, option, textarea, button, video, label",
		width: null,
		height: null,
		preventInteractionOnTransition: !1,
		userAgent: null,
		url: null,
		edgeSwipeDetection: !1,
		edgeSwipeThreshold: 20,
		autoHeight: !1,
		setWrapperSize: !1,
		virtualTranslate: !1,
		effect: "slide",
		breakpoints: void 0,
		breakpointsBase: "window",
		spaceBetween: 0,
		slidesPerView: 1,
		slidesPerGroup: 1,
		slidesPerGroupSkip: 0,
		slidesPerGroupAuto: !1,
		centeredSlides: !1,
		centeredSlidesBounds: !1,
		slidesOffsetBefore: 0,
		slidesOffsetAfter: 0,
		normalizeSlideIndex: !0,
		centerInsufficientSlides: !1,
		watchOverflow: !0,
		roundLengths: !1,
		touchRatio: 1,
		touchAngle: 45,
		simulateTouch: !0,
		shortSwipes: !0,
		longSwipes: !0,
		longSwipesRatio: 0.5,
		longSwipesMs: 300,
		followFinger: !0,
		allowTouchMove: !0,
		threshold: 5,
		touchMoveStopPropagation: !1,
		touchStartPreventDefault: !0,
		touchStartForcePreventDefault: !1,
		touchReleaseOnEdges: !1,
		uniqueNavElements: !0,
		resistance: !0,
		resistanceRatio: 0.85,
		watchSlidesProgress: !1,
		grabCursor: !1,
		preventClicks: !0,
		preventClicksPropagation: !0,
		slideToClickedSlide: !1,
		loop: !1,
		loopAddBlankSlides: !0,
		loopAdditionalSlides: 0,
		loopPreventsSliding: !0,
		rewind: !1,
		allowSlidePrev: !0,
		allowSlideNext: !0,
		swipeHandler: null,
		noSwiping: !0,
		noSwipingClass: "swiper-no-swiping",
		noSwipingSelector: null,
		passiveListeners: !0,
		maxBackfaceHiddenSlides: 10,
		containerModifierClass: "swiper-",
		slideClass: "swiper-slide",
		slideBlankClass: "swiper-slide-blank",
		slideActiveClass: "swiper-slide-active",
		slideVisibleClass: "swiper-slide-visible",
		slideFullyVisibleClass: "swiper-slide-fully-visible",
		slideNextClass: "swiper-slide-next",
		slidePrevClass: "swiper-slide-prev",
		wrapperClass: "swiper-wrapper",
		lazyPreloaderClass: "swiper-lazy-preloader",
		lazyPreloadPrevNext: 0,
		runCallbacksOnInit: !0,
		_emitClasses: !1,
	};
function ty(e, t) {
	return function (n) {
		n === void 0 && (n = {});
		const r = Object.keys(n)[0],
			a = n[r];
		if (typeof a != "object" || a === null) {
			Ae(t, n);
			return;
		}
		if (
			(e[r] === !0 && (e[r] = { enabled: !0 }),
			r === "navigation" &&
				e[r] &&
				e[r].enabled &&
				!e[r].prevEl &&
				!e[r].nextEl &&
				(e[r].auto = !0),
			["pagination", "scrollbar"].indexOf(r) >= 0 &&
				e[r] &&
				e[r].enabled &&
				!e[r].el &&
				(e[r].auto = !0),
			!(r in e && "enabled" in a))
		) {
			Ae(t, n);
			return;
		}
		typeof e[r] == "object" &&
			!("enabled" in e[r]) &&
			(e[r].enabled = !0),
			e[r] || (e[r] = { enabled: !1 }),
			Ae(t, n);
	};
}
const ks = {
		eventsEmitter: Z0,
		update: u1,
		translate: m1,
		transition: b1,
		slide: _1,
		loop: z1,
		grabCursor: I1,
		events: W1,
		breakpoints: Q1,
		checkOverflow: ey,
		classes: Z1,
	},
	Es = {};
let Cs = class vt {
	constructor() {
		let t, n;
		for (
			var r = arguments.length, a = new Array(r), l = 0;
			l < r;
			l++
		)
			a[l] = arguments[l];
		a.length === 1 &&
		a[0].constructor &&
		Object.prototype.toString.call(a[0]).slice(8, -1) ===
			"Object"
			? (n = a[0])
			: ([t, n] = a),
			n || (n = {}),
			(n = Ae({}, n)),
			t && !n.el && (n.el = t);
		const i = Gn();
		if (
			n.el &&
			typeof n.el == "string" &&
			i.querySelectorAll(n.el).length > 1
		) {
			const d = [];
			return (
				i.querySelectorAll(n.el).forEach((f) => {
					const m = Ae({}, n, { el: f });
					d.push(new vt(m));
				}),
				d
			);
		}
		const o = this;
		(o.__swiper__ = !0),
			(o.support = up()),
			(o.device = cp({ userAgent: n.userAgent })),
			(o.browser = X0()),
			(o.eventsListeners = {}),
			(o.eventsAnyListeners = []),
			(o.modules = [...o.__modules__]),
			n.modules &&
				Array.isArray(n.modules) &&
				o.modules.push(...n.modules);
		const s = {};
		o.modules.forEach((d) => {
			d({
				params: n,
				swiper: o,
				extendParams: ty(n, s),
				on: o.on.bind(o),
				once: o.once.bind(o),
				off: o.off.bind(o),
				emit: o.emit.bind(o),
			});
		});
		const c = Ae({}, xs, s);
		return (
			(o.params = Ae({}, c, Es, n)),
			(o.originalParams = Ae({}, o.params)),
			(o.passedParams = Ae({}, n)),
			o.params &&
				o.params.on &&
				Object.keys(o.params.on).forEach((d) => {
					o.on(d, o.params.on[d]);
				}),
			o.params && o.params.onAny && o.onAny(o.params.onAny),
			Object.assign(o, {
				enabled: o.params.enabled,
				el: t,
				classNames: [],
				slides: [],
				slidesGrid: [],
				snapGrid: [],
				slidesSizesGrid: [],
				isHorizontal() {
					return o.params.direction === "horizontal";
				},
				isVertical() {
					return o.params.direction === "vertical";
				},
				activeIndex: 0,
				realIndex: 0,
				isBeginning: !0,
				isEnd: !1,
				translate: 0,
				previousTranslate: 0,
				progress: 0,
				velocity: 0,
				animating: !1,
				cssOverflowAdjustment() {
					return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
				},
				allowSlideNext: o.params.allowSlideNext,
				allowSlidePrev: o.params.allowSlidePrev,
				touchEventsData: {
					isTouched: void 0,
					isMoved: void 0,
					allowTouchCallbacks: void 0,
					touchStartTime: void 0,
					isScrolling: void 0,
					currentTranslate: void 0,
					startTranslate: void 0,
					allowThresholdMove: void 0,
					focusableElements: o.params.focusableElements,
					lastClickTime: 0,
					clickTimeout: void 0,
					velocities: [],
					allowMomentumBounce: void 0,
					startMoving: void 0,
					pointerId: null,
					touchId: null,
				},
				allowClick: !0,
				allowTouchMove: o.params.allowTouchMove,
				touches: {
					startX: 0,
					startY: 0,
					currentX: 0,
					currentY: 0,
					diff: 0,
				},
				imagesToLoad: [],
				imagesLoaded: 0,
			}),
			o.emit("_swiper"),
			o.params.init && o.init(),
			o
		);
	}
	getDirectionLabel(t) {
		return this.isHorizontal()
			? t
			: {
					width: "height",
					"margin-top": "margin-left",
					"margin-bottom ": "margin-right",
					"margin-left": "margin-top",
					"margin-right": "margin-bottom",
					"padding-left": "padding-top",
					"padding-right": "padding-bottom",
					marginRight: "marginBottom",
			  }[t];
	}
	getSlideIndex(t) {
		const { slidesEl: n, params: r } = this,
			a = lt(n, `.${r.slideClass}, swiper-slide`),
			l = Ll(a[0]);
		return Ll(t) - l;
	}
	getSlideIndexByData(t) {
		return this.getSlideIndex(
			this.slides.filter(
				(n) =>
					n.getAttribute("data-swiper-slide-index") * 1 === t
			)[0]
		);
	}
	recalcSlides() {
		const t = this,
			{ slidesEl: n, params: r } = t;
		t.slides = lt(n, `.${r.slideClass}, swiper-slide`);
	}
	enable() {
		const t = this;
		t.enabled ||
			((t.enabled = !0),
			t.params.grabCursor && t.setGrabCursor(),
			t.emit("enable"));
	}
	disable() {
		const t = this;
		t.enabled &&
			((t.enabled = !1),
			t.params.grabCursor && t.unsetGrabCursor(),
			t.emit("disable"));
	}
	setProgress(t, n) {
		const r = this;
		t = Math.min(Math.max(t, 0), 1);
		const a = r.minTranslate(),
			l = (r.maxTranslate() - a) * t + a;
		r.translateTo(l, typeof n > "u" ? 0 : n),
			r.updateActiveIndex(),
			r.updateSlidesClasses();
	}
	emitContainerClasses() {
		const t = this;
		if (!t.params._emitClasses || !t.el) return;
		const n = t.el.className
			.split(" ")
			.filter(
				(r) =>
					r.indexOf("swiper") === 0 ||
					r.indexOf(t.params.containerModifierClass) === 0
			);
		t.emit("_containerClasses", n.join(" "));
	}
	getSlideClasses(t) {
		const n = this;
		return n.destroyed
			? ""
			: t.className
					.split(" ")
					.filter(
						(r) =>
							r.indexOf("swiper-slide") === 0 ||
							r.indexOf(n.params.slideClass) === 0
					)
					.join(" ");
	}
	emitSlidesClasses() {
		const t = this;
		if (!t.params._emitClasses || !t.el) return;
		const n = [];
		t.slides.forEach((r) => {
			const a = t.getSlideClasses(r);
			n.push({ slideEl: r, classNames: a }),
				t.emit("_slideClass", r, a);
		}),
			t.emit("_slideClasses", n);
	}
	slidesPerViewDynamic(t, n) {
		t === void 0 && (t = "current"), n === void 0 && (n = !1);
		const r = this,
			{
				params: a,
				slides: l,
				slidesGrid: i,
				slidesSizesGrid: o,
				size: s,
				activeIndex: c,
			} = r;
		let d = 1;
		if (typeof a.slidesPerView == "number")
			return a.slidesPerView;
		if (a.centeredSlides) {
			let f = l[c] ? Math.ceil(l[c].swiperSlideSize) : 0,
				m;
			for (let v = c + 1; v < l.length; v += 1)
				l[v] &&
					!m &&
					((f += Math.ceil(l[v].swiperSlideSize)),
					(d += 1),
					f > s && (m = !0));
			for (let v = c - 1; v >= 0; v -= 1)
				l[v] &&
					!m &&
					((f += l[v].swiperSlideSize),
					(d += 1),
					f > s && (m = !0));
		} else if (t === "current")
			for (let f = c + 1; f < l.length; f += 1)
				(n ? i[f] + o[f] - i[c] < s : i[f] - i[c] < s) &&
					(d += 1);
		else
			for (let f = c - 1; f >= 0; f -= 1)
				i[c] - i[f] < s && (d += 1);
		return d;
	}
	update() {
		const t = this;
		if (!t || t.destroyed) return;
		const { snapGrid: n, params: r } = t;
		r.breakpoints && t.setBreakpoint(),
			[...t.el.querySelectorAll('[loading="lazy"]')].forEach(
				(i) => {
					i.complete && zl(t, i);
				}
			),
			t.updateSize(),
			t.updateSlides(),
			t.updateProgress(),
			t.updateSlidesClasses();
		function a() {
			const i = t.rtlTranslate
					? t.translate * -1
					: t.translate,
				o = Math.min(
					Math.max(i, t.maxTranslate()),
					t.minTranslate()
				);
			t.setTranslate(o),
				t.updateActiveIndex(),
				t.updateSlidesClasses();
		}
		let l;
		if (r.freeMode && r.freeMode.enabled && !r.cssMode)
			a(), r.autoHeight && t.updateAutoHeight();
		else {
			if (
				(r.slidesPerView === "auto" || r.slidesPerView > 1) &&
				t.isEnd &&
				!r.centeredSlides
			) {
				const i =
					t.virtual && r.virtual.enabled
						? t.virtual.slides
						: t.slides;
				l = t.slideTo(i.length - 1, 0, !1, !0);
			} else l = t.slideTo(t.activeIndex, 0, !1, !0);
			l || a();
		}
		r.watchOverflow && n !== t.snapGrid && t.checkOverflow(),
			t.emit("update");
	}
	changeDirection(t, n) {
		n === void 0 && (n = !0);
		const r = this,
			a = r.params.direction;
		return (
			t ||
				(t = a === "horizontal" ? "vertical" : "horizontal"),
			t === a ||
				(t !== "horizontal" && t !== "vertical") ||
				(r.el.classList.remove(
					`${r.params.containerModifierClass}${a}`
				),
				r.el.classList.add(
					`${r.params.containerModifierClass}${t}`
				),
				r.emitContainerClasses(),
				(r.params.direction = t),
				r.slides.forEach((l) => {
					t === "vertical"
						? (l.style.width = "")
						: (l.style.height = "");
				}),
				r.emit("changeDirection"),
				n && r.update()),
			r
		);
	}
	changeLanguageDirection(t) {
		const n = this;
		(n.rtl && t === "rtl") ||
			(!n.rtl && t === "ltr") ||
			((n.rtl = t === "rtl"),
			(n.rtlTranslate =
				n.params.direction === "horizontal" && n.rtl),
			n.rtl
				? (n.el.classList.add(
						`${n.params.containerModifierClass}rtl`
				  ),
				  (n.el.dir = "rtl"))
				: (n.el.classList.remove(
						`${n.params.containerModifierClass}rtl`
				  ),
				  (n.el.dir = "ltr")),
			n.update());
	}
	mount(t) {
		const n = this;
		if (n.mounted) return !0;
		let r = t || n.params.el;
		if (
			(typeof r == "string" && (r = document.querySelector(r)),
			!r)
		)
			return !1;
		(r.swiper = n),
			r.parentNode &&
				r.parentNode.host &&
				r.parentNode.host.nodeName ===
					n.params.swiperElementNodeName.toUpperCase() &&
				(n.isElement = !0);
		const a = () =>
			`.${(n.params.wrapperClass || "")
				.trim()
				.split(" ")
				.join(".")}`;
		let l =
			r && r.shadowRoot && r.shadowRoot.querySelector
				? r.shadowRoot.querySelector(a())
				: lt(r, a())[0];
		return (
			!l &&
				n.params.createElements &&
				((l = Ol("div", n.params.wrapperClass)),
				r.append(l),
				lt(r, `.${n.params.slideClass}`).forEach((i) => {
					l.append(i);
				})),
			Object.assign(n, {
				el: r,
				wrapperEl: l,
				slidesEl:
					n.isElement && !r.parentNode.host.slideSlots
						? r.parentNode.host
						: l,
				hostEl: n.isElement ? r.parentNode.host : r,
				mounted: !0,
				rtl:
					r.dir.toLowerCase() === "rtl" ||
					$t(r, "direction") === "rtl",
				rtlTranslate:
					n.params.direction === "horizontal" &&
					(r.dir.toLowerCase() === "rtl" ||
						$t(r, "direction") === "rtl"),
				wrongRTL: $t(l, "display") === "-webkit-box",
			}),
			!0
		);
	}
	init(t) {
		const n = this;
		if (n.initialized || n.mount(t) === !1) return n;
		n.emit("beforeInit"),
			n.params.breakpoints && n.setBreakpoint(),
			n.addClasses(),
			n.updateSize(),
			n.updateSlides(),
			n.params.watchOverflow && n.checkOverflow(),
			n.params.grabCursor && n.enabled && n.setGrabCursor(),
			n.params.loop && n.virtual && n.params.virtual.enabled
				? n.slideTo(
						n.params.initialSlide + n.virtual.slidesBefore,
						0,
						n.params.runCallbacksOnInit,
						!1,
						!0
				  )
				: n.slideTo(
						n.params.initialSlide,
						0,
						n.params.runCallbacksOnInit,
						!1,
						!0
				  ),
			n.params.loop && n.loopCreate(),
			n.attachEvents();
		const r = [...n.el.querySelectorAll('[loading="lazy"]')];
		return (
			n.isElement &&
				r.push(
					...n.hostEl.querySelectorAll('[loading="lazy"]')
				),
			r.forEach((a) => {
				a.complete
					? zl(n, a)
					: a.addEventListener("load", (l) => {
							zl(n, l.target);
					  });
			}),
			Ss(n),
			(n.initialized = !0),
			Ss(n),
			n.emit("init"),
			n.emit("afterInit"),
			n
		);
	}
	destroy(t, n) {
		t === void 0 && (t = !0), n === void 0 && (n = !0);
		const r = this,
			{ params: a, el: l, wrapperEl: i, slides: o } = r;
		return (
			typeof r.params > "u" ||
				r.destroyed ||
				(r.emit("beforeDestroy"),
				(r.initialized = !1),
				r.detachEvents(),
				a.loop && r.loopDestroy(),
				n &&
					(r.removeClasses(),
					l &&
						typeof l != "string" &&
						l.removeAttribute("style"),
					i && i.removeAttribute("style"),
					o &&
						o.length &&
						o.forEach((s) => {
							s.classList.remove(
								a.slideVisibleClass,
								a.slideFullyVisibleClass,
								a.slideActiveClass,
								a.slideNextClass,
								a.slidePrevClass
							),
								s.removeAttribute("style"),
								s.removeAttribute("data-swiper-slide-index");
						})),
				r.emit("destroy"),
				Object.keys(r.eventsListeners).forEach((s) => {
					r.off(s);
				}),
				t !== !1 &&
					(r.el &&
						typeof r.el != "string" &&
						(r.el.swiper = null),
					F0(r)),
				(r.destroyed = !0)),
			null
		);
	}
	static extendDefaults(t) {
		Ae(Es, t);
	}
	static get extendedDefaults() {
		return Es;
	}
	static get defaults() {
		return xs;
	}
	static installModule(t) {
		vt.prototype.__modules__ ||
			(vt.prototype.__modules__ = []);
		const n = vt.prototype.__modules__;
		typeof t == "function" && n.indexOf(t) < 0 && n.push(t);
	}
	static use(t) {
		return Array.isArray(t)
			? (t.forEach((n) => vt.installModule(n)), vt)
			: (vt.installModule(t), vt);
	}
};
Object.keys(ks).forEach((e) => {
	Object.keys(ks[e]).forEach((t) => {
		Cs.prototype[t] = ks[e][t];
	});
}),
	Cs.use([Y0, K0]);
const vp = [
	"eventsPrefix",
	"injectStyles",
	"injectStylesUrls",
	"modules",
	"init",
	"_direction",
	"oneWayMovement",
	"swiperElementNodeName",
	"touchEventsTarget",
	"initialSlide",
	"_speed",
	"cssMode",
	"updateOnWindowResize",
	"resizeObserver",
	"nested",
	"focusableElements",
	"_enabled",
	"_width",
	"_height",
	"preventInteractionOnTransition",
	"userAgent",
	"url",
	"_edgeSwipeDetection",
	"_edgeSwipeThreshold",
	"_freeMode",
	"_autoHeight",
	"setWrapperSize",
	"virtualTranslate",
	"_effect",
	"breakpoints",
	"breakpointsBase",
	"_spaceBetween",
	"_slidesPerView",
	"maxBackfaceHiddenSlides",
	"_grid",
	"_slidesPerGroup",
	"_slidesPerGroupSkip",
	"_slidesPerGroupAuto",
	"_centeredSlides",
	"_centeredSlidesBounds",
	"_slidesOffsetBefore",
	"_slidesOffsetAfter",
	"normalizeSlideIndex",
	"_centerInsufficientSlides",
	"_watchOverflow",
	"roundLengths",
	"touchRatio",
	"touchAngle",
	"simulateTouch",
	"_shortSwipes",
	"_longSwipes",
	"longSwipesRatio",
	"longSwipesMs",
	"_followFinger",
	"allowTouchMove",
	"_threshold",
	"touchMoveStopPropagation",
	"touchStartPreventDefault",
	"touchStartForcePreventDefault",
	"touchReleaseOnEdges",
	"uniqueNavElements",
	"_resistance",
	"_resistanceRatio",
	"_watchSlidesProgress",
	"_grabCursor",
	"preventClicks",
	"preventClicksPropagation",
	"_slideToClickedSlide",
	"_loop",
	"loopAdditionalSlides",
	"loopAddBlankSlides",
	"loopPreventsSliding",
	"_rewind",
	"_allowSlidePrev",
	"_allowSlideNext",
	"_swipeHandler",
	"_noSwiping",
	"noSwipingClass",
	"noSwipingSelector",
	"passiveListeners",
	"containerModifierClass",
	"slideClass",
	"slideActiveClass",
	"slideVisibleClass",
	"slideFullyVisibleClass",
	"slideNextClass",
	"slidePrevClass",
	"slideBlankClass",
	"wrapperClass",
	"lazyPreloaderClass",
	"lazyPreloadPrevNext",
	"runCallbacksOnInit",
	"observer",
	"observeParents",
	"observeSlideChildren",
	"a11y",
	"_autoplay",
	"_controller",
	"coverflowEffect",
	"cubeEffect",
	"fadeEffect",
	"flipEffect",
	"creativeEffect",
	"cardsEffect",
	"hashNavigation",
	"history",
	"keyboard",
	"mousewheel",
	"_navigation",
	"_pagination",
	"parallax",
	"_scrollbar",
	"_thumbs",
	"virtual",
	"zoom",
	"control",
];
function dn(e) {
	return (
		typeof e == "object" &&
		e !== null &&
		e.constructor &&
		Object.prototype.toString.call(e).slice(8, -1) ===
			"Object" &&
		!e.__swiper__
	);
}
function qn(e, t) {
	const n = ["__proto__", "constructor", "prototype"];
	Object.keys(t)
		.filter((r) => n.indexOf(r) < 0)
		.forEach((r) => {
			typeof e[r] > "u"
				? (e[r] = t[r])
				: dn(t[r]) && dn(e[r]) && Object.keys(t[r]).length > 0
				? t[r].__swiper__
					? (e[r] = t[r])
					: qn(e[r], t[r])
				: (e[r] = t[r]);
		});
}
function yp(e) {
	return (
		e === void 0 && (e = {}),
		e.navigation &&
			typeof e.navigation.nextEl > "u" &&
			typeof e.navigation.prevEl > "u"
	);
}
function bp(e) {
	return (
		e === void 0 && (e = {}),
		e.pagination && typeof e.pagination.el > "u"
	);
}
function wp(e) {
	return (
		e === void 0 && (e = {}),
		e.scrollbar && typeof e.scrollbar.el > "u"
	);
}
function Sp(e) {
	e === void 0 && (e = "");
	const t = e
			.split(" ")
			.map((r) => r.trim())
			.filter((r) => !!r),
		n = [];
	return (
		t.forEach((r) => {
			n.indexOf(r) < 0 && n.push(r);
		}),
		n.join(" ")
	);
}
function ny(e) {
	return (
		e === void 0 && (e = ""),
		e
			? e.includes("swiper-wrapper")
				? e
				: `swiper-wrapper ${e}`
			: "swiper-wrapper"
	);
}
function ry(e) {
	let {
		swiper: t,
		slides: n,
		passedParams: r,
		changedParams: a,
		nextEl: l,
		prevEl: i,
		scrollbarEl: o,
		paginationEl: s,
	} = e;
	const c = a.filter(
			(P) =>
				P !== "children" &&
				P !== "direction" &&
				P !== "wrapperClass"
		),
		{
			params: d,
			pagination: f,
			navigation: m,
			scrollbar: v,
			virtual: g,
			thumbs: b,
		} = t;
	let w, h, u, p, y, S, x, E;
	a.includes("thumbs") &&
		r.thumbs &&
		r.thumbs.swiper &&
		d.thumbs &&
		!d.thumbs.swiper &&
		(w = !0),
		a.includes("controller") &&
			r.controller &&
			r.controller.control &&
			d.controller &&
			!d.controller.control &&
			(h = !0),
		a.includes("pagination") &&
			r.pagination &&
			(r.pagination.el || s) &&
			(d.pagination || d.pagination === !1) &&
			f &&
			!f.el &&
			(u = !0),
		a.includes("scrollbar") &&
			r.scrollbar &&
			(r.scrollbar.el || o) &&
			(d.scrollbar || d.scrollbar === !1) &&
			v &&
			!v.el &&
			(p = !0),
		a.includes("navigation") &&
			r.navigation &&
			(r.navigation.prevEl || i) &&
			(r.navigation.nextEl || l) &&
			(d.navigation || d.navigation === !1) &&
			m &&
			!m.prevEl &&
			!m.nextEl &&
			(y = !0);
	const T = (P) => {
		t[P] &&
			(t[P].destroy(),
			P === "navigation"
				? (t.isElement &&
						(t[P].prevEl.remove(), t[P].nextEl.remove()),
				  (d[P].prevEl = void 0),
				  (d[P].nextEl = void 0),
				  (t[P].prevEl = void 0),
				  (t[P].nextEl = void 0))
				: (t.isElement && t[P].el.remove(),
				  (d[P].el = void 0),
				  (t[P].el = void 0)));
	};
	a.includes("loop") &&
		t.isElement &&
		(d.loop && !r.loop
			? (S = !0)
			: !d.loop && r.loop
			? (x = !0)
			: (E = !0)),
		c.forEach((P) => {
			if (dn(d[P]) && dn(r[P]))
				Object.assign(d[P], r[P]),
					(P === "navigation" ||
						P === "pagination" ||
						P === "scrollbar") &&
						"enabled" in r[P] &&
						!r[P].enabled &&
						T(P);
			else {
				const k = r[P];
				(k === !0 || k === !1) &&
				(P === "navigation" ||
					P === "pagination" ||
					P === "scrollbar")
					? k === !1 && T(P)
					: (d[P] = r[P]);
			}
		}),
		c.includes("controller") &&
			!h &&
			t.controller &&
			t.controller.control &&
			d.controller &&
			d.controller.control &&
			(t.controller.control = d.controller.control),
		a.includes("children") && n && g && d.virtual.enabled
			? ((g.slides = n), g.update(!0))
			: a.includes("virtual") &&
			  g &&
			  d.virtual.enabled &&
			  (n && (g.slides = n), g.update(!0)),
		a.includes("children") && n && d.loop && (E = !0),
		w && b.init() && b.update(!0),
		h && (t.controller.control = d.controller.control),
		u &&
			(t.isElement &&
				(!s || typeof s == "string") &&
				((s = document.createElement("div")),
				s.classList.add("swiper-pagination"),
				s.part.add("pagination"),
				t.el.appendChild(s)),
			s && (d.pagination.el = s),
			f.init(),
			f.render(),
			f.update()),
		p &&
			(t.isElement &&
				(!o || typeof o == "string") &&
				((o = document.createElement("div")),
				o.classList.add("swiper-scrollbar"),
				o.part.add("scrollbar"),
				t.el.appendChild(o)),
			o && (d.scrollbar.el = o),
			v.init(),
			v.updateSize(),
			v.setTranslate()),
		y &&
			(t.isElement &&
				((!l || typeof l == "string") &&
					((l = document.createElement("div")),
					l.classList.add("swiper-button-next"),
					(l.innerHTML = t.hostEl.constructor.nextButtonSvg),
					l.part.add("button-next"),
					t.el.appendChild(l)),
				(!i || typeof i == "string") &&
					((i = document.createElement("div")),
					i.classList.add("swiper-button-prev"),
					(i.innerHTML = t.hostEl.constructor.prevButtonSvg),
					i.part.add("button-prev"),
					t.el.appendChild(i))),
			l && (d.navigation.nextEl = l),
			i && (d.navigation.prevEl = i),
			m.init(),
			m.update()),
		a.includes("allowSlideNext") &&
			(t.allowSlideNext = r.allowSlideNext),
		a.includes("allowSlidePrev") &&
			(t.allowSlidePrev = r.allowSlidePrev),
		a.includes("direction") &&
			t.changeDirection(r.direction, !1),
		(S || E) && t.loopDestroy(),
		(x || E) && t.loopCreate(),
		t.update();
}
function ay(e, t) {
	e === void 0 && (e = {}), t === void 0 && (t = !0);
	const n = { on: {} },
		r = {},
		a = {};
	qn(n, xs), (n._emitClasses = !0), (n.init = !1);
	const l = {},
		i = vp.map((s) => s.replace(/_/, "")),
		o = Object.assign({}, e);
	return (
		Object.keys(o).forEach((s) => {
			typeof e[s] > "u" ||
				(i.indexOf(s) >= 0
					? dn(e[s])
						? ((n[s] = {}),
						  (a[s] = {}),
						  qn(n[s], e[s]),
						  qn(a[s], e[s]))
						: ((n[s] = e[s]), (a[s] = e[s]))
					: s.search(/on[A-Z]/) === 0 &&
					  typeof e[s] == "function"
					? t
						? (r[`${s[2].toLowerCase()}${s.substr(3)}`] = e[s])
						: (n.on[`${s[2].toLowerCase()}${s.substr(3)}`] = e[s])
					: (l[s] = e[s]));
		}),
		["navigation", "pagination", "scrollbar"].forEach((s) => {
			n[s] === !0 && (n[s] = {}), n[s] === !1 && delete n[s];
		}),
		{ params: n, passedParams: a, rest: l, events: r }
	);
}
function ly(e, t) {
	let {
		el: n,
		nextEl: r,
		prevEl: a,
		paginationEl: l,
		scrollbarEl: i,
		swiper: o,
	} = e;
	yp(t) &&
		r &&
		a &&
		((o.params.navigation.nextEl = r),
		(o.originalParams.navigation.nextEl = r),
		(o.params.navigation.prevEl = a),
		(o.originalParams.navigation.prevEl = a)),
		bp(t) &&
			l &&
			((o.params.pagination.el = l),
			(o.originalParams.pagination.el = l)),
		wp(t) &&
			i &&
			((o.params.scrollbar.el = i),
			(o.originalParams.scrollbar.el = i)),
		o.init(n);
}
function iy(e, t, n, r, a) {
	const l = [];
	if (!t) return l;
	const i = (o) => {
		l.indexOf(o) < 0 && l.push(o);
	};
	if (n && r) {
		const o = r.map(a),
			s = n.map(a);
		o.join("") !== s.join("") && i("children"),
			r.length !== n.length && i("children");
	}
	return (
		vp
			.filter((o) => o[0] === "_")
			.map((o) => o.replace(/_/, ""))
			.forEach((o) => {
				if (o in e && o in t)
					if (dn(e[o]) && dn(t[o])) {
						const s = Object.keys(e[o]),
							c = Object.keys(t[o]);
						s.length !== c.length
							? i(o)
							: (s.forEach((d) => {
									e[o][d] !== t[o][d] && i(o);
							  }),
							  c.forEach((d) => {
									e[o][d] !== t[o][d] && i(o);
							  }));
					} else e[o] !== t[o] && i(o);
			}),
		l
	);
}
const oy = (e) => {
	!e ||
		e.destroyed ||
		!e.params.virtual ||
		(e.params.virtual && !e.params.virtual.enabled) ||
		(e.updateSlides(),
		e.updateProgress(),
		e.updateSlidesClasses(),
		e.parallax &&
			e.params.parallax &&
			e.params.parallax.enabled &&
			e.parallax.setTranslate());
};
function Ml() {
	return (
		(Ml = Object.assign
			? Object.assign.bind()
			: function (e) {
					for (var t = 1; t < arguments.length; t++) {
						var n = arguments[t];
						for (var r in n)
							Object.prototype.hasOwnProperty.call(n, r) &&
								(e[r] = n[r]);
					}
					return e;
			  }),
		Ml.apply(this, arguments)
	);
}
function xp(e) {
	return (
		e.type &&
		e.type.displayName &&
		e.type.displayName.includes("SwiperSlide")
	);
}
function kp(e) {
	const t = [];
	return (
		H.Children.toArray(e).forEach((n) => {
			xp(n)
				? t.push(n)
				: n.props &&
				  n.props.children &&
				  kp(n.props.children).forEach((r) => t.push(r));
		}),
		t
	);
}
function sy(e) {
	const t = [],
		n = {
			"container-start": [],
			"container-end": [],
			"wrapper-start": [],
			"wrapper-end": [],
		};
	return (
		H.Children.toArray(e).forEach((r) => {
			if (xp(r)) t.push(r);
			else if (r.props && r.props.slot && n[r.props.slot])
				n[r.props.slot].push(r);
			else if (r.props && r.props.children) {
				const a = kp(r.props.children);
				a.length > 0
					? a.forEach((l) => t.push(l))
					: n["container-end"].push(r);
			} else n["container-end"].push(r);
		}),
		{ slides: t, slots: n }
	);
}
function uy(e, t, n) {
	if (!n) return null;
	const r = (d) => {
			let f = d;
			return (
				d < 0
					? (f = t.length + d)
					: f >= t.length && (f = f - t.length),
				f
			);
		},
		a = e.isHorizontal()
			? {
					[e.rtlTranslate ? "right" : "left"]: `${n.offset}px`,
			  }
			: { top: `${n.offset}px` },
		{ from: l, to: i } = n,
		o = e.params.loop ? -t.length : 0,
		s = e.params.loop ? t.length * 2 : t.length,
		c = [];
	for (let d = o; d < s; d += 1)
		d >= l && d <= i && c.push(t[r(d)]);
	return c.map((d, f) =>
		H.cloneElement(d, {
			swiper: e,
			style: a,
			key: d.props.virtualIndex || d.key || `slide-${f}`,
		})
	);
}
function Hr(e, t) {
	return typeof window > "u"
		? O.useEffect(e, t)
		: O.useLayoutEffect(e, t);
}
const Ep = O.createContext(null),
	cy = O.createContext(null),
	Ts = O.forwardRef(function (e, t) {
		let {
				className: n,
				tag: r = "div",
				wrapperTag: a = "div",
				children: l,
				onSwiper: i,
				...o
			} = e === void 0 ? {} : e,
			s = !1;
		const [c, d] = O.useState("swiper"),
			[f, m] = O.useState(null),
			[v, g] = O.useState(!1),
			b = O.useRef(!1),
			w = O.useRef(null),
			h = O.useRef(null),
			u = O.useRef(null),
			p = O.useRef(null),
			y = O.useRef(null),
			S = O.useRef(null),
			x = O.useRef(null),
			E = O.useRef(null),
			{
				params: T,
				passedParams: P,
				rest: k,
				events: z,
			} = ay(o),
			{ slides: L, slots: I } = sy(l),
			D = () => {
				g(!v);
			};
		Object.assign(T.on, {
			_containerClasses(j, R) {
				d(R);
			},
		});
		const B = () => {
			Object.assign(T.on, z), (s = !0);
			const j = { ...T };
			if (
				(delete j.wrapperClass,
				(h.current = new Cs(j)),
				h.current.virtual && h.current.params.virtual.enabled)
			) {
				h.current.virtual.slides = L;
				const R = {
					cache: !1,
					slides: L,
					renderExternal: m,
					renderExternalUpdate: !1,
				};
				qn(h.current.params.virtual, R),
					qn(h.current.originalParams.virtual, R);
			}
		};
		w.current || B(),
			h.current && h.current.on("_beforeBreakpoint", D);
		const we = () => {
				s ||
					!z ||
					!h.current ||
					Object.keys(z).forEach((j) => {
						h.current.on(j, z[j]);
					});
			},
			Bt = () => {
				!z ||
					!h.current ||
					Object.keys(z).forEach((j) => {
						h.current.off(j, z[j]);
					});
			};
		O.useEffect(() => () => {
			h.current && h.current.off("_beforeBreakpoint", D);
		}),
			O.useEffect(() => {
				!b.current &&
					h.current &&
					(h.current.emitSlidesClasses(), (b.current = !0));
			}),
			Hr(() => {
				if ((t && (t.current = w.current), !!w.current))
					return (
						h.current.destroyed && B(),
						ly(
							{
								el: w.current,
								nextEl: y.current,
								prevEl: S.current,
								paginationEl: x.current,
								scrollbarEl: E.current,
								swiper: h.current,
							},
							T
						),
						i && !h.current.destroyed && i(h.current),
						() => {
							h.current &&
								!h.current.destroyed &&
								h.current.destroy(!0, !1);
						}
					);
			}, []),
			Hr(() => {
				we();
				const j = iy(P, u.current, L, p.current, (R) => R.key);
				return (
					(u.current = P),
					(p.current = L),
					j.length &&
						h.current &&
						!h.current.destroyed &&
						ry({
							swiper: h.current,
							slides: L,
							passedParams: P,
							changedParams: j,
							nextEl: y.current,
							prevEl: S.current,
							scrollbarEl: E.current,
							paginationEl: x.current,
						}),
					() => {
						Bt();
					}
				);
			}),
			Hr(() => {
				oy(h.current);
			}, [f]);
		function M() {
			return T.virtual
				? uy(h.current, L, f)
				: L.map((j, R) =>
						H.cloneElement(j, {
							swiper: h.current,
							swiperSlideIndex: R,
						})
				  );
		}
		return H.createElement(
			r,
			Ml(
				{ ref: w, className: Sp(`${c}${n ? ` ${n}` : ""}`) },
				k
			),
			H.createElement(
				cy.Provider,
				{ value: h.current },
				I["container-start"],
				H.createElement(
					a,
					{ className: ny(T.wrapperClass) },
					I["wrapper-start"],
					M(),
					I["wrapper-end"]
				),
				yp(T) &&
					H.createElement(
						H.Fragment,
						null,
						H.createElement("div", {
							ref: S,
							className: "swiper-button-prev",
						}),
						H.createElement("div", {
							ref: y,
							className: "swiper-button-next",
						})
					),
				wp(T) &&
					H.createElement("div", {
						ref: E,
						className: "swiper-scrollbar",
					}),
				bp(T) &&
					H.createElement("div", {
						ref: x,
						className: "swiper-pagination",
					}),
				I["container-end"]
			)
		);
	});
Ts.displayName = "Swiper";
const _s = O.forwardRef(function (e, t) {
	let {
		tag: n = "div",
		children: r,
		className: a = "",
		swiper: l,
		zoom: i,
		lazy: o,
		virtualIndex: s,
		swiperSlideIndex: c,
		...d
	} = e === void 0 ? {} : e;
	const f = O.useRef(null),
		[m, v] = O.useState("swiper-slide"),
		[g, b] = O.useState(!1);
	function w(y, S, x) {
		S === f.current && v(x);
	}
	Hr(() => {
		if (
			(typeof c < "u" && (f.current.swiperSlideIndex = c),
			t && (t.current = f.current),
			!(!f.current || !l))
		) {
			if (l.destroyed) {
				m !== "swiper-slide" && v("swiper-slide");
				return;
			}
			return (
				l.on("_slideClass", w),
				() => {
					l && l.off("_slideClass", w);
				}
			);
		}
	}),
		Hr(() => {
			l &&
				f.current &&
				!l.destroyed &&
				v(l.getSlideClasses(f.current));
		}, [l]);
	const h = {
			isActive: m.indexOf("swiper-slide-active") >= 0,
			isVisible: m.indexOf("swiper-slide-visible") >= 0,
			isPrev: m.indexOf("swiper-slide-prev") >= 0,
			isNext: m.indexOf("swiper-slide-next") >= 0,
		},
		u = () => (typeof r == "function" ? r(h) : r),
		p = () => {
			b(!0);
		};
	return H.createElement(
		n,
		Ml(
			{
				ref: f,
				className: Sp(`${m}${a ? ` ${a}` : ""}`),
				"data-swiper-slide-index": s,
				onLoad: p,
			},
			d
		),
		i &&
			H.createElement(
				Ep.Provider,
				{ value: h },
				H.createElement(
					"div",
					{
						className: "swiper-zoom-container",
						"data-swiper-zoom": typeof i == "number" ? i : void 0,
					},
					u(),
					o &&
						!g &&
						H.createElement("div", {
							className: "swiper-lazy-preloader",
						})
				)
			),
		!i &&
			H.createElement(
				Ep.Provider,
				{ value: h },
				u(),
				o &&
					!g &&
					H.createElement("div", {
						className: "swiper-lazy-preloader",
					})
			)
	);
});
_s.displayName = "SwiperSlide";
function Cp(e, t, n, r) {
	return (
		e.params.createElements &&
			Object.keys(r).forEach((a) => {
				if (!n[a] && n.auto === !0) {
					let l = lt(e.el, `.${r[a]}`)[0];
					l ||
						((l = Ol("div", r[a])),
						(l.className = r[a]),
						e.el.append(l)),
						(n[a] = l),
						(t[a] = l);
				}
			}),
		n
	);
}
function Tp(e) {
	let { swiper: t, extendParams: n, on: r, emit: a } = e;
	n({
		navigation: {
			nextEl: null,
			prevEl: null,
			hideOnClick: !1,
			disabledClass: "swiper-button-disabled",
			hiddenClass: "swiper-button-hidden",
			lockClass: "swiper-button-lock",
			navigationDisabledClass: "swiper-navigation-disabled",
		},
	}),
		(t.navigation = { nextEl: null, prevEl: null });
	function l(g) {
		let b;
		return g &&
			typeof g == "string" &&
			t.isElement &&
			((b =
				t.el.querySelector(g) || t.hostEl.querySelector(g)),
			b)
			? b
			: (g &&
					(typeof g == "string" &&
						(b = [...document.querySelectorAll(g)]),
					t.params.uniqueNavElements &&
					typeof g == "string" &&
					b &&
					b.length > 1 &&
					t.el.querySelectorAll(g).length === 1
						? (b = t.el.querySelector(g))
						: b && b.length === 1 && (b = b[0])),
			  g && !b ? g : b);
	}
	function i(g, b) {
		const w = t.params.navigation;
		(g = oe(g)),
			g.forEach((h) => {
				h &&
					(h.classList[b ? "add" : "remove"](
						...w.disabledClass.split(" ")
					),
					h.tagName === "BUTTON" && (h.disabled = b),
					t.params.watchOverflow &&
						t.enabled &&
						h.classList[t.isLocked ? "add" : "remove"](
							w.lockClass
						));
			});
	}
	function o() {
		const { nextEl: g, prevEl: b } = t.navigation;
		if (t.params.loop) {
			i(b, !1), i(g, !1);
			return;
		}
		i(b, t.isBeginning && !t.params.rewind),
			i(g, t.isEnd && !t.params.rewind);
	}
	function s(g) {
		g.preventDefault(),
			!(t.isBeginning && !t.params.loop && !t.params.rewind) &&
				(t.slidePrev(), a("navigationPrev"));
	}
	function c(g) {
		g.preventDefault(),
			!(t.isEnd && !t.params.loop && !t.params.rewind) &&
				(t.slideNext(), a("navigationNext"));
	}
	function d() {
		const g = t.params.navigation;
		if (
			((t.params.navigation = Cp(
				t,
				t.originalParams.navigation,
				t.params.navigation,
				{
					nextEl: "swiper-button-next",
					prevEl: "swiper-button-prev",
				}
			)),
			!(g.nextEl || g.prevEl))
		)
			return;
		let b = l(g.nextEl),
			w = l(g.prevEl);
		Object.assign(t.navigation, { nextEl: b, prevEl: w }),
			(b = oe(b)),
			(w = oe(w));
		const h = (u, p) => {
			u && u.addEventListener("click", p === "next" ? c : s),
				!t.enabled &&
					u &&
					u.classList.add(...g.lockClass.split(" "));
		};
		b.forEach((u) => h(u, "next")),
			w.forEach((u) => h(u, "prev"));
	}
	function f() {
		let { nextEl: g, prevEl: b } = t.navigation;
		(g = oe(g)), (b = oe(b));
		const w = (h, u) => {
			h.removeEventListener("click", u === "next" ? c : s),
				h.classList.remove(
					...t.params.navigation.disabledClass.split(" ")
				);
		};
		g.forEach((h) => w(h, "next")),
			b.forEach((h) => w(h, "prev"));
	}
	r("init", () => {
		t.params.navigation.enabled === !1 ? v() : (d(), o());
	}),
		r("toEdge fromEdge lock unlock", () => {
			o();
		}),
		r("destroy", () => {
			f();
		}),
		r("enable disable", () => {
			let { nextEl: g, prevEl: b } = t.navigation;
			if (((g = oe(g)), (b = oe(b)), t.enabled)) {
				o();
				return;
			}
			[...g, ...b]
				.filter((w) => !!w)
				.forEach((w) =>
					w.classList.add(t.params.navigation.lockClass)
				);
		}),
		r("click", (g, b) => {
			let { nextEl: w, prevEl: h } = t.navigation;
			(w = oe(w)), (h = oe(h));
			const u = b.target;
			let p = h.includes(u) || w.includes(u);
			if (t.isElement && !p) {
				const y =
					b.path || (b.composedPath && b.composedPath());
				y &&
					(p = y.find((S) => w.includes(S) || h.includes(S)));
			}
			if (t.params.navigation.hideOnClick && !p) {
				if (
					t.pagination &&
					t.params.pagination &&
					t.params.pagination.clickable &&
					(t.pagination.el === u || t.pagination.el.contains(u))
				)
					return;
				let y;
				w.length
					? (y = w[0].classList.contains(
							t.params.navigation.hiddenClass
					  ))
					: h.length &&
					  (y = h[0].classList.contains(
							t.params.navigation.hiddenClass
					  )),
					a(y === !0 ? "navigationShow" : "navigationHide"),
					[...w, ...h]
						.filter((S) => !!S)
						.forEach((S) =>
							S.classList.toggle(t.params.navigation.hiddenClass)
						);
			}
		});
	const m = () => {
			t.el.classList.remove(
				...t.params.navigation.navigationDisabledClass.split(
					" "
				)
			),
				d(),
				o();
		},
		v = () => {
			t.el.classList.add(
				...t.params.navigation.navigationDisabledClass.split(
					" "
				)
			),
				f();
		};
	Object.assign(t.navigation, {
		enable: m,
		disable: v,
		update: o,
		init: d,
		destroy: f,
	});
}
function Ur(e) {
	return (
		e === void 0 && (e = ""),
		`.${e
			.trim()
			.replace(/([\.:!+\/])/g, "\\$1")
			.replace(/ /g, ".")}`
	);
}
function _p(e) {
	let { swiper: t, extendParams: n, on: r, emit: a } = e;
	const l = "swiper-pagination";
	n({
		pagination: {
			el: null,
			bulletElement: "span",
			clickable: !1,
			hideOnClick: !1,
			renderBullet: null,
			renderProgressbar: null,
			renderFraction: null,
			renderCustom: null,
			progressbarOpposite: !1,
			type: "bullets",
			dynamicBullets: !1,
			dynamicMainBullets: 1,
			formatFractionCurrent: (u) => u,
			formatFractionTotal: (u) => u,
			bulletClass: `${l}-bullet`,
			bulletActiveClass: `${l}-bullet-active`,
			modifierClass: `${l}-`,
			currentClass: `${l}-current`,
			totalClass: `${l}-total`,
			hiddenClass: `${l}-hidden`,
			progressbarFillClass: `${l}-progressbar-fill`,
			progressbarOppositeClass: `${l}-progressbar-opposite`,
			clickableClass: `${l}-clickable`,
			lockClass: `${l}-lock`,
			horizontalClass: `${l}-horizontal`,
			verticalClass: `${l}-vertical`,
			paginationDisabledClass: `${l}-disabled`,
		},
	}),
		(t.pagination = { el: null, bullets: [] });
	let i,
		o = 0;
	function s() {
		return (
			!t.params.pagination.el ||
			!t.pagination.el ||
			(Array.isArray(t.pagination.el) &&
				t.pagination.el.length === 0)
		);
	}
	function c(u, p) {
		const { bulletActiveClass: y } = t.params.pagination;
		u &&
			((u =
				u[
					`${p === "prev" ? "previous" : "next"}ElementSibling`
				]),
			u &&
				(u.classList.add(`${y}-${p}`),
				(u =
					u[
						`${p === "prev" ? "previous" : "next"}ElementSibling`
					]),
				u && u.classList.add(`${y}-${p}-${p}`)));
	}
	function d(u, p, y) {
		if (((u = u % y), (p = p % y), p === u + 1))
			return "next";
		if (p === u - 1) return "previous";
	}
	function f(u) {
		const p = u.target.closest(
			Ur(t.params.pagination.bulletClass)
		);
		if (!p) return;
		u.preventDefault();
		const y = Ll(p) * t.params.slidesPerGroup;
		if (t.params.loop) {
			if (t.realIndex === y) return;
			const S = d(t.realIndex, y, t.slides.length);
			S === "next"
				? t.slideNext()
				: S === "previous"
				? t.slidePrev()
				: t.slideToLoop(y);
		} else t.slideTo(y);
	}
	function m() {
		const u = t.rtl,
			p = t.params.pagination;
		if (s()) return;
		let y = t.pagination.el;
		y = oe(y);
		let S, x;
		const E =
				t.virtual && t.params.virtual.enabled
					? t.virtual.slides.length
					: t.slides.length,
			T = t.params.loop
				? Math.ceil(E / t.params.slidesPerGroup)
				: t.snapGrid.length;
		if (
			(t.params.loop
				? ((x = t.previousRealIndex || 0),
				  (S =
						t.params.slidesPerGroup > 1
							? Math.floor(t.realIndex / t.params.slidesPerGroup)
							: t.realIndex))
				: typeof t.snapIndex < "u"
				? ((S = t.snapIndex), (x = t.previousSnapIndex))
				: ((x = t.previousIndex || 0),
				  (S = t.activeIndex || 0)),
			p.type === "bullets" &&
				t.pagination.bullets &&
				t.pagination.bullets.length > 0)
		) {
			const P = t.pagination.bullets;
			let k, z, L;
			if (
				(p.dynamicBullets &&
					((i = ms(P[0], t.isHorizontal() ? "width" : "height")),
					y.forEach((I) => {
						I.style[t.isHorizontal() ? "width" : "height"] = `${
							i * (p.dynamicMainBullets + 4)
						}px`;
					}),
					p.dynamicMainBullets > 1 &&
						x !== void 0 &&
						((o += S - (x || 0)),
						o > p.dynamicMainBullets - 1
							? (o = p.dynamicMainBullets - 1)
							: o < 0 && (o = 0)),
					(k = Math.max(S - o, 0)),
					(z =
						k + (Math.min(P.length, p.dynamicMainBullets) - 1)),
					(L = (z + k) / 2)),
				P.forEach((I) => {
					const D = [
						...[
							"",
							"-next",
							"-next-next",
							"-prev",
							"-prev-prev",
							"-main",
						].map((B) => `${p.bulletActiveClass}${B}`),
					]
						.map((B) =>
							typeof B == "string" && B.includes(" ")
								? B.split(" ")
								: B
						)
						.flat();
					I.classList.remove(...D);
				}),
				y.length > 1)
			)
				P.forEach((I) => {
					const D = Ll(I);
					D === S
						? I.classList.add(...p.bulletActiveClass.split(" "))
						: t.isElement && I.setAttribute("part", "bullet"),
						p.dynamicBullets &&
							(D >= k &&
								D <= z &&
								I.classList.add(
									...`${p.bulletActiveClass}-main`.split(" ")
								),
							D === k && c(I, "prev"),
							D === z && c(I, "next"));
				});
			else {
				const I = P[S];
				if (
					(I &&
						I.classList.add(...p.bulletActiveClass.split(" ")),
					t.isElement &&
						P.forEach((D, B) => {
							D.setAttribute(
								"part",
								B === S ? "bullet-active" : "bullet"
							);
						}),
					p.dynamicBullets)
				) {
					const D = P[k],
						B = P[z];
					for (let we = k; we <= z; we += 1)
						P[we] &&
							P[we].classList.add(
								...`${p.bulletActiveClass}-main`.split(" ")
							);
					c(D, "prev"), c(B, "next");
				}
			}
			if (p.dynamicBullets) {
				const I = Math.min(P.length, p.dynamicMainBullets + 4),
					D = (i * I - i) / 2 - L * i,
					B = u ? "right" : "left";
				P.forEach((we) => {
					we.style[t.isHorizontal() ? B : "top"] = `${D}px`;
				});
			}
		}
		y.forEach((P, k) => {
			if (
				(p.type === "fraction" &&
					(P.querySelectorAll(Ur(p.currentClass)).forEach(
						(z) => {
							z.textContent = p.formatFractionCurrent(S + 1);
						}
					),
					P.querySelectorAll(Ur(p.totalClass)).forEach((z) => {
						z.textContent = p.formatFractionTotal(T);
					})),
				p.type === "progressbar")
			) {
				let z;
				p.progressbarOpposite
					? (z = t.isHorizontal() ? "vertical" : "horizontal")
					: (z = t.isHorizontal() ? "horizontal" : "vertical");
				const L = (S + 1) / T;
				let I = 1,
					D = 1;
				z === "horizontal" ? (I = L) : (D = L),
					P.querySelectorAll(Ur(p.progressbarFillClass)).forEach(
						(B) => {
							(B.style.transform = `translate3d(0,0,0) scaleX(${I}) scaleY(${D})`),
								(B.style.transitionDuration = `${t.params.speed}ms`);
						}
					);
			}
			p.type === "custom" && p.renderCustom
				? ((P.innerHTML = p.renderCustom(t, S + 1, T)),
				  k === 0 && a("paginationRender", P))
				: (k === 0 && a("paginationRender", P),
				  a("paginationUpdate", P)),
				t.params.watchOverflow &&
					t.enabled &&
					P.classList[t.isLocked ? "add" : "remove"](
						p.lockClass
					);
		});
	}
	function v() {
		const u = t.params.pagination;
		if (s()) return;
		const p =
			t.virtual && t.params.virtual.enabled
				? t.virtual.slides.length
				: t.grid && t.params.grid.rows > 1
				? t.slides.length / Math.ceil(t.params.grid.rows)
				: t.slides.length;
		let y = t.pagination.el;
		y = oe(y);
		let S = "";
		if (u.type === "bullets") {
			let x = t.params.loop
				? Math.ceil(p / t.params.slidesPerGroup)
				: t.snapGrid.length;
			t.params.freeMode &&
				t.params.freeMode.enabled &&
				x > p &&
				(x = p);
			for (let E = 0; E < x; E += 1)
				u.renderBullet
					? (S += u.renderBullet.call(t, E, u.bulletClass))
					: (S += `<${u.bulletElement} ${
							t.isElement ? 'part="bullet"' : ""
					  } class="${u.bulletClass}"></${u.bulletElement}>`);
		}
		u.type === "fraction" &&
			(u.renderFraction
				? (S = u.renderFraction.call(
						t,
						u.currentClass,
						u.totalClass
				  ))
				: (S = `<span class="${u.currentClass}"></span> / <span class="${u.totalClass}"></span>`)),
			u.type === "progressbar" &&
				(u.renderProgressbar
					? (S = u.renderProgressbar.call(
							t,
							u.progressbarFillClass
					  ))
					: (S = `<span class="${u.progressbarFillClass}"></span>`)),
			(t.pagination.bullets = []),
			y.forEach((x) => {
				u.type !== "custom" && (x.innerHTML = S || ""),
					u.type === "bullets" &&
						t.pagination.bullets.push(
							...x.querySelectorAll(Ur(u.bulletClass))
						);
			}),
			u.type !== "custom" && a("paginationRender", y[0]);
	}
	function g() {
		t.params.pagination = Cp(
			t,
			t.originalParams.pagination,
			t.params.pagination,
			{ el: "swiper-pagination" }
		);
		const u = t.params.pagination;
		if (!u.el) return;
		let p;
		typeof u.el == "string" &&
			t.isElement &&
			(p = t.el.querySelector(u.el)),
			!p &&
				typeof u.el == "string" &&
				(p = [...document.querySelectorAll(u.el)]),
			p || (p = u.el),
			!(!p || p.length === 0) &&
				(t.params.uniqueNavElements &&
					typeof u.el == "string" &&
					Array.isArray(p) &&
					p.length > 1 &&
					((p = [...t.el.querySelectorAll(u.el)]),
					p.length > 1 &&
						(p = p.filter(
							(y) => sp(y, ".swiper")[0] === t.el
						)[0])),
				Array.isArray(p) && p.length === 1 && (p = p[0]),
				Object.assign(t.pagination, { el: p }),
				(p = oe(p)),
				p.forEach((y) => {
					u.type === "bullets" &&
						u.clickable &&
						y.classList.add(
							...(u.clickableClass || "").split(" ")
						),
						y.classList.add(u.modifierClass + u.type),
						y.classList.add(
							t.isHorizontal()
								? u.horizontalClass
								: u.verticalClass
						),
						u.type === "bullets" &&
							u.dynamicBullets &&
							(y.classList.add(
								`${u.modifierClass}${u.type}-dynamic`
							),
							(o = 0),
							u.dynamicMainBullets < 1 &&
								(u.dynamicMainBullets = 1)),
						u.type === "progressbar" &&
							u.progressbarOpposite &&
							y.classList.add(u.progressbarOppositeClass),
						u.clickable && y.addEventListener("click", f),
						t.enabled || y.classList.add(u.lockClass);
				}));
	}
	function b() {
		const u = t.params.pagination;
		if (s()) return;
		let p = t.pagination.el;
		p &&
			((p = oe(p)),
			p.forEach((y) => {
				y.classList.remove(u.hiddenClass),
					y.classList.remove(u.modifierClass + u.type),
					y.classList.remove(
						t.isHorizontal() ? u.horizontalClass : u.verticalClass
					),
					u.clickable &&
						(y.classList.remove(
							...(u.clickableClass || "").split(" ")
						),
						y.removeEventListener("click", f));
			})),
			t.pagination.bullets &&
				t.pagination.bullets.forEach((y) =>
					y.classList.remove(...u.bulletActiveClass.split(" "))
				);
	}
	r("changeDirection", () => {
		if (!t.pagination || !t.pagination.el) return;
		const u = t.params.pagination;
		let { el: p } = t.pagination;
		(p = oe(p)),
			p.forEach((y) => {
				y.classList.remove(u.horizontalClass, u.verticalClass),
					y.classList.add(
						t.isHorizontal() ? u.horizontalClass : u.verticalClass
					);
			});
	}),
		r("init", () => {
			t.params.pagination.enabled === !1
				? h()
				: (g(), v(), m());
		}),
		r("activeIndexChange", () => {
			typeof t.snapIndex > "u" && m();
		}),
		r("snapIndexChange", () => {
			m();
		}),
		r("snapGridLengthChange", () => {
			v(), m();
		}),
		r("destroy", () => {
			b();
		}),
		r("enable disable", () => {
			let { el: u } = t.pagination;
			u &&
				((u = oe(u)),
				u.forEach((p) =>
					p.classList[t.enabled ? "remove" : "add"](
						t.params.pagination.lockClass
					)
				));
		}),
		r("lock unlock", () => {
			m();
		}),
		r("click", (u, p) => {
			const y = p.target,
				S = oe(t.pagination.el);
			if (
				t.params.pagination.el &&
				t.params.pagination.hideOnClick &&
				S &&
				S.length > 0 &&
				!y.classList.contains(t.params.pagination.bulletClass)
			) {
				if (
					t.navigation &&
					((t.navigation.nextEl && y === t.navigation.nextEl) ||
						(t.navigation.prevEl && y === t.navigation.prevEl))
				)
					return;
				const x = S[0].classList.contains(
					t.params.pagination.hiddenClass
				);
				a(x === !0 ? "paginationShow" : "paginationHide"),
					S.forEach((E) =>
						E.classList.toggle(t.params.pagination.hiddenClass)
					);
			}
		});
	const w = () => {
			t.el.classList.remove(
				t.params.pagination.paginationDisabledClass
			);
			let { el: u } = t.pagination;
			u &&
				((u = oe(u)),
				u.forEach((p) =>
					p.classList.remove(
						t.params.pagination.paginationDisabledClass
					)
				)),
				g(),
				v(),
				m();
		},
		h = () => {
			t.el.classList.add(
				t.params.pagination.paginationDisabledClass
			);
			let { el: u } = t.pagination;
			u &&
				((u = oe(u)),
				u.forEach((p) =>
					p.classList.add(
						t.params.pagination.paginationDisabledClass
					)
				)),
				b();
		};
	Object.assign(t.pagination, {
		enable: w,
		disable: h,
		render: v,
		update: m,
		init: g,
		destroy: b,
	});
}
const Ps = ({
	title: e,
	description: t,
	children: n,
	className: r,
}) => {
	const { darkMode: a } = Hn();
	return C.jsxs("div", {
		className: `p-6 rounded-lg shadow-md transition-all transform duration-300 ${
			a
				? "bg-gray-800 text-white hover:bg-gray-700"
				: "bg-white text-black hover:bg-gray-100"
		} ${r} w-full max-w-screen-md md:max-w-screen-lg lg:max-w-4xl mx-auto`,
		children: [
			C.jsx("h2", {
				className: "text-2xl font-semibold mb-3",
				children: e,
			}),
			C.jsx("p", {
				className: `${
					a ? "text-gray-300" : "text-gray-500"
				} mb-4 text-green-600`,
				children: t,
			}),
			C.jsx("div", { children: n }),
		],
	});
};
Ps.propTypes = {
	title: $.string.isRequired,
	description: $.string,
	children: $.node,
	className: $.string,
};
const Pp = ({
	company: e,
	role: t,
	duration: n,
	address: r,
	description: a,
	achievements: l,
	links: i,
}) => {
	const { darkMode: o } = Hn();
	return C.jsxs(Ps, {
		title: e,
		description: t,
		children: [
			C.jsxs("div", {
				className: "flex flex-col gap-2 mb-3 text-center",
				children: [
					C.jsxs("div", {
						className:
							"flex justify-between text-sm text-gray-500 dark:text-gray-400",
						children: [
							C.jsx("span", { className: "italic", children: n }),
							C.jsx("span", { className: "italic", children: r }),
						],
					}),
					C.jsx("p", {
						className:
							"text-lg text-gray-700 dark:text-gray-300 text-left",
						children: a,
					}),
				],
			}),
			C.jsxs("div", {
				children: [
					C.jsx("h3", {
						className: "text-md font-semibold mb-2",
						children: "Key Achievements/Tasks:",
					}),
					C.jsx("ul", {
						className:
							"list-disc list-inside text-gray-600 dark:text-gray-400",
						children: l.map((s, c) =>
							C.jsx("li", { children: s }, c)
						),
					}),
				],
			}),
			C.jsx("div", {
				className: "flex justify-center mt-4",
				children: i.map((s, c) =>
					C.jsx(
						at,
						{
							label: C.jsx(s.icon, {}),
							onClick: () =>
								window.open(
									s.link,
									"_blank",
									"noopener,noreferrer"
								),
							variant: "outline",
							className: `p-3 border ml-5 ${
								o ? "border-white" : "border-black"
							}`,
						},
						c
					)
				),
			}),
		],
	});
};
Pp.propTypes = {
	company: $.string.isRequired,
	role: $.string.isRequired,
	duration: $.string.isRequired,
	address: $.string.isRequired,
	description: $.string.isRequired,
	achievements: $.arrayOf($.string).isRequired,
	links: $.arrayOf(
		$.shape({
			link: $.string.isRequired,
			icon: $.elementType.isRequired,
			type: $.string.isRequired,
		})
	).isRequired,
};
function fn(e) {
	return Te({
		tag: "svg",
		attr: { viewBox: "0 0 24 24", fill: "none" },
		child: [
			{
				tag: "path",
				attr: {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z",
					fill: "currentColor",
				},
				child: [],
			},
			{
				tag: "path",
				attr: {
					d: "M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z",
					fill: "currentColor",
				},
				child: [],
			},
			{
				tag: "path",
				attr: {
					d: "M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z",
					fill: "currentColor",
				},
				child: [],
			},
			{
				tag: "path",
				attr: {
					d: "M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z",
					fill: "currentColor",
				},
				child: [],
			},
			{
				tag: "path",
				attr: {
					fillRule: "evenodd",
					clipRule: "evenodd",
					d: "M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z",
					fill: "currentColor",
				},
				child: [],
			},
		],
	})(e);
}
const dy = [
		{
			company: "0xCommit",
			role: "Security Auditor",
			duration: "02/2024 - Present",
			address: "Remote",
			description:
				"Smart Contract Security Audits to fortify decentralized systems and ensure the integrity of blockchain networks.",
			achievements: [
				"Auditing client's smart contracts - Solo and Teamed.",
				"Preparing Audit report with simpler explanation of the issues found.",
			],
			links: [
				{
					link: "https://0xcommit.com",
					icon: fn,
					type: "website",
				},
				{
					link: "https://x.com/0xcommitaudits",
					icon: Un,
					type: "twitter",
				},
				{
					link: "https://t.me/OxCommitAudits",
					icon: $r,
					type: "telegram",
				},
			],
		},
		{
			company: "0xCommit",
			role: "Community Manager",
			duration: "07/2024 - Present",
			address: "Remote",
			description:
				"Smart Contract Security Audits to fortify decentralized systems and ensure the integrity of blockchain networks.",
			achievements: [
				"Establish a brand new community around security and smart contract audits.",
				"Consistently frame and post articles, tweets, and articles on various social media platforms.",
				"Prepare weekly and monthly Hack tracks and analysis.",
				"Conducting AMA sessions with the community and partners.",
			],
			links: [
				{
					link: "https://0xcommit.com",
					icon: fn,
					type: "website",
				},
				{
					link: "https://x.com/0xcommitaudits",
					icon: Un,
					type: "twitter",
				},
				{
					link: "https://t.me/OxCommitAudits",
					icon: $r,
					type: "telegram",
				},
			],
		},
		{
			company: "Router Protocol",
			role: "Community Manager",
			duration: "08/2023 - Present",
			address: "Remote",
			description:
				"Onboarding the next billion users to web3 by destroying blockchain segregation.",
			achievements: [
				"Community Engagement, Support, and Troubleshooting.",
				"Research and presentation about interoperability news in the web3 space.",
				"Discord & Telegram bot optimization & task automation.",
				"Community Guidelines Enforcement.",
			],
			links: [
				{
					link: "https://www.routerprotocol.com/",
					icon: fn,
					type: "website",
				},
				{
					link: "https://x.com/routerprotocol",
					icon: Un,
					type: "twitter",
				},
				{
					link: "https://t.me/routerprotocol",
					icon: $r,
					type: "telegram",
				},
			],
		},
		{
			company: "Terraform Labs",
			role: "Community Moderator",
			duration: "09/2021 - 08/2023",
			address: "Remote",
			description:
				"Fueled by a passionate community and deep developer talent pool, the Terra blockchain is built to enable the next generation of Web3 products and services.",
			achievements: [
				"Community Engagement, Support, and Troubleshooting.",
				"Community Guidelines Enforcement.",
				"Telegram bot optimization and task automation.",
				"Keeping users updated with the company's upcoming ecosystem and development decisions.",
			],
			links: [
				{
					link: "https://www.terra.money/",
					icon: fn,
					type: "website",
				},
				{
					link: "https://x.com/terra_money",
					icon: Un,
					type: "twitter",
				},
				{
					link: "https://t.me/TerraNetworkLobby",
					icon: $r,
					type: "telegram",
				},
			],
		},
	],
	fy = () =>
		C.jsxs("div", {
			className:
				"p-6 flex flex-col justify-between w-full h-screen",
			children: [
				C.jsx("h1", {
					className: "text-4xl font-bold text-center",
					children: "Career",
				}),
				C.jsx("div", {
					className: "flex w-full h-[100%]",
					children: C.jsx(Ts, {
						spaceBetween: 2,
						slidesPerView: 1,
						pagination: { clickable: !0 },
						navigation: !0,
						modules: [_p, Tp],
						children: dy.map((e, t) =>
							C.jsx(
								_s,
								{
									className:
										"p-5 flex flex-col justify-center items-center",
									children: C.jsx(Pp, {
										company: e.company,
										role: e.role,
										duration: e.duration,
										address: e.address,
										description: e.description,
										achievements: e.achievements,
										links: e.links,
									}),
								},
								t
							)
						),
					}),
				}),
			],
		}),
	Op = ({
		institution: e,
		courses: t,
		cgpa: n,
		duration: r,
		address: a,
		links: l,
	}) => {
		const { darkMode: i } = Hn();
		return C.jsxs(Ps, {
			title: e,
			description: `CGPA: ${n}`,
			children: [
				C.jsx("div", {
					className: "flex flex-col gap-2 mb-3 text-center",
					children: C.jsxs("div", {
						className:
							"flex justify-between text-sm text-gray-500 dark:text-gray-400",
						children: [
							C.jsx("span", { className: "italic", children: a }),
							C.jsx("span", { className: "italic", children: r }),
						],
					}),
				}),
				C.jsxs("div", {
					children: [
						C.jsx("h3", {
							className: "text-md font-semibold mb-2",
							children: "Key Courses:",
						}),
						C.jsx("ul", {
							className:
								"list-disc list-inside text-gray-600 dark:text-gray-400",
							children: t.map((o, s) =>
								C.jsx("li", { children: o }, s)
							),
						}),
					],
				}),
				C.jsx("div", {
					className: "flex justify-center mt-4",
					children: l.map((o, s) =>
						C.jsx(
							at,
							{
								label: C.jsx(o.icon, {}),
								onClick: () =>
									window.open(
										o.link,
										"_blank",
										"noopener,noreferrer"
									),
								variant: "outline",
								className: `p-3 border ml-5 ${
									i ? "border-white" : "border-black"
								}`,
							},
							s
						)
					),
				}),
			],
		});
	};
Op.propTypes = {
	institution: $.string.isRequired,
	duration: $.string.isRequired,
	address: $.string.isRequired,
	courses: $.arrayOf($.string).isRequired,
	links: $.arrayOf(
		$.shape({
			link: $.string.isRequired,
			icon: $.elementType.isRequired,
			type: $.string.isRequired,
		})
	).isRequired,
};
const py = [
		{
			institution: "GITAM University",
			duration: "10/2021 - Present",
			address: "Hyderabad, India",
			cgpa: "9.14/10",
			links: [
				{
					link: "https://www.gitam.edu/",
					icon: fn,
					type: "website",
				},
				{
					link:
						"https://www.linkedin.com/school/gitam-deemed-university/",
					icon: Ff,
					type: "linkedin",
				},
				{
					link: "https://x.com/GITAMUniversity",
					icon: Un,
					type: "twitter",
				},
				{
					link:
						"https://www.instagram.com/gitamdeemeduniversity/",
					icon: os,
					type: "instagram",
				},
			],
			courses: [
				"Bachelor of Technology in Computer Science and Engineering",
			],
		},
		{
			institution: "Kathmandu World School",
			duration: "2019 - 2020",
			address: "Bhaktapur, Nepal",
			cgpa: "3.61/4",
			links: [
				{
					link: "https://kws.edu.np/",
					icon: fn,
					type: "website",
				},
				{
					link: "https://www.instagram.com/kathmanduws/",
					icon: os,
					type: "instagram",
				},
				{
					link: "https://www.facebook.com/KathmanduWS",
					icon: Df,
					type: "facebook",
				},
			],
			courses: [
				"Physics",
				"Chemistry",
				"Mathematics",
				"Computer Science",
				"English",
			],
		},
		{
			institution:
				"SOS Hermann Gmeiner Higher Secondary School",
			duration: "2017 - 2018",
			address: "Surkhet, Nepal",
			cgpa: "9.14/10",
			links: [
				{
					link: "https://www.soshgssurkhet.edu.np/",
					icon: fn,
					type: "website",
				},
				{
					link:
						"https://www.facebook.com/people/SOS-Hermann-Gmeiner-School-Surkhet/100083000935528/",
					icon: Df,
					type: "facebook",
				},
			],
			courses: [
				"Science",
				"Mathematics",
				"English",
				"Social Studies",
				"Computer Science",
			],
		},
	],
	hy = () =>
		C.jsxs("div", {
			className: "p-6 flex flex-col gap-6 w-full h-screen",
			children: [
				C.jsx("h1", {
					className: "text-4xl font-bold text-center",
					children: "Education",
				}),
				C.jsx("div", {
					className: "flex w-full h-[100%]",
					children: C.jsx(Ts, {
						spaceBetween: 2,
						slidesPerView: 1,
						pagination: { clickable: !0 },
						navigation: !0,
						modules: [_p, Tp],
						children: py.map((e, t) =>
							C.jsx(
								_s,
								{
									className:
										"p-5 flex flex-col justify-center items-center",
									children: C.jsx(Op, {
										institution: e.institution,
										duration: e.duration,
										address: e.address,
										links: e.links,
										courses: e.courses,
										cgpa: e.cgpa,
									}),
								},
								t
							)
						),
					}),
				}),
			],
		}),
	my = () => {
		const e = ds();
		return C.jsxs("div", {
			className: "text-center",
			children: [
				C.jsx("h1", {
					className: "text-6xl font-bold mb-4",
					children: "Coming Soon",
				}),
				C.jsx("p", {
					className: "text-2xl text-gray-500 mb-8",
					children:
						"I am working hard to bring you something amazing on this website. Stay tuned!",
				}),
				C.jsx(at, {
					label: "Go Home",
					variant: "filled",
					className: "p-4 border border-white font-semibold",
					onClick: () => e("/"),
				}),
			],
		});
	},
	gy = () => {
		const e = ds();
		return C.jsxs("div", {
			className: "text-center",
			children: [
				C.jsx("h1", {
					className: "text-6xl font-bold mb-4",
					children: "404",
				}),
				C.jsx("p", {
					className: "text-2xl text-gray-500 mb-8",
					children:
						"Oops! The page you are looking for does not exist.",
				}),
				C.jsx(at, {
					label: "Go Home",
					variant: "filled",
					className: "p-4 border border-white font-semibold",
					onClick: () => e("/"),
				}),
			],
		});
	},
	vy = $l.createRoot(document.getElementById("root"));
vy.render(
	C.jsx(kg, {
		store: hv,
		children: C.jsx(M0, {
			children: C.jsx(O0, {
				children: C.jsxs(cn, {
					path: "/",
					element: C.jsx(j0, {}),
					children: [
						C.jsx(cn, { path: "/", element: C.jsx(R0, {}) }),
						C.jsx(cn, {
							path: "/career",
							element: C.jsx(fy, {}),
						}),
						C.jsx(cn, {
							path: "/education",
							element: C.jsx(hy, {}),
						}),
						C.jsx(cn, {
							path: "/coming-soon",
							element: C.jsx(my, {}),
						}),
						C.jsx(cn, { path: "*", element: C.jsx(gy, {}) }),
						" ",
					],
				}),
			}),
		}),
	})
);
