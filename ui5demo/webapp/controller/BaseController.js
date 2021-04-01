sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
	"use strict";

	return Controller.extend("hkmc.poc.ns.ui5demo.controller.BaseController", {
		onInit: function () {

		},
		
		getRouter: function(){
			return UIComponent.getRouterFor(this);
		}
	});
});