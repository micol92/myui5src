/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"hkmc/poc/ns/ui5demo/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
