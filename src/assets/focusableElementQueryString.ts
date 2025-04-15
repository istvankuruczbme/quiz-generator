const focusableElementQueryString =
	'a[href]:not([tabindex="-1"]):not([disabled]), ' +
	'button:not([disabled]):not([tabindex="-1"]), ' +
	'textarea:not([disabled]):not([tabindex="-1"]), ' +
	'input:not([type="hidden"]):not([disabled]):not([tabindex="-1"]), ' +
	'select:not([disabled]):not([tabindex="-1"]), ' +
	'[tabindex]:not([tabindex="-1"]):not([disabled])';

export default focusableElementQueryString;
