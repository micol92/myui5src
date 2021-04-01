sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	'sap/ui/model/Filter',
    "../model/formatter",
    "sap/m/MessageToast"      
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (BaseController, JSONModel, MessageBox, Filter, formatter, MessageToast) {
		"use strict";

		return BaseController.extend("hkmc.poc.ns.ui5demo.controller.View1", {
    	formatter: formatter,
	
		onInit: function () {
            //debugger;
            this._getEmployees();
            //this.getOwnerComponent().reload = true;
			this.i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this.getRouter().getRoute("View1").attachMatched(this._onRouteMatchedEduBizMain, this);
            //console.log("test00001");
            //debugger;

        },
        
        onAfterRendering: function() { 
			//this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		
		_onRouteMatchedEduBizMain: function(){
            //   if(this.getOwnerComponent().reload){
                    this._getEduBizPlans(event, 'K0120000');
            //        this.getOwnerComponent().reload = false;
            //    }
                var appLayout = {
                    createBtn : { visible: true, enabled: false },
                    pasteBtn: { visible: true, enabled: false },
                    resetSortBtn: { enabled: false },
                };
                if(this.getView().getModel("appLayout")){
                    this.getView().getModel("appLayout").setData(appLayout);
                }else{
                    this.getView().setModel(new JSONModel(appLayout), "appLayout");
                }
                this.getView().byId("DIVNAMEID").setText("기아차/국내사업본부-K0120000");

            },

            //laod mockdata 
		_getEmployees: function(event){
                var that = this;
                $.ajax({
                    url: './model/mockData.json',
                    dataType: 'json',
                    success: function(data){
                        that.getView().setModel(new JSONModel(data.CompDivInfo),"DivInfo");
                    },
                    error: function(error){
                        MessageBox.error(that.i18n.getText("EduBizMain.controller.error"));
                    }
                });
            },
		_getEduBizPlans: function(event, divcode){
                var that = this;
                var page = this.getView().byId("eduBizMain");
                var urlstring = '';
             //   page.setBusy(true);
                
                if(divcode == undefined) {
                    debugger;
                    urlstring = "/hcodata2/hkmc2/TBL240?$filter=PROMDIV eq 'K0120000'";
                }    
                else {   
                    debugger;
                    urlstring =  "/hcodata2/hkmc2/TBL240?$filter=PROMDIV eq '" + divcode + "'" ;
                    debugger;
                };

                $.ajax({
                    //url: "/hcodata2/hkmc2/TBL240?$FILTER=PROMDIV eq 'HK90'",  //생성시간 기준
                    //url : `/hcodata2/hkmc2/TBL240?$FILTER=PROMDIV eq '${divcode}')`,
                    url: urlstring,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    success: function(data, headers){
                        debugger;
                        //var nData = that._getTextByKey(data.value);
                        if(that.getView().getModel("bizModel")){
                            //that.getView().getModel("bizModel").setData(nData); 
                            that.getView().getModel("bizModel").setData(data.value); 
                        }else{
                            //that.getView().setModel(new JSONModel(nData), "bizModel");
                            that.getView().setModel(new JSONModel(data.value), "bizModel");
                        }
                    },
                    error: function(error){
                        debugger;
                        MessageBox.error(that.i18n.getText("EduBizMain.controller.error"));
                    },
                    complete: function(){
                //        page.setBusy(false);
                    }
                });
            },        //신규생성
		onCreate: function(event){
                //복사된 데이터 초기화
                var createComponentModel = this.getOwnerComponent().getModel("create");
                if(createComponentModel){createComponentModel.setData({});}
                this.getRouter().navTo("CreateTODiv");
            },

		onChangeDiv: function(event){
            var key = event.getParameter("selectedItem").getKey();
            var txtval = event.getParameter("selectedItem").getText();
            this.getView().byId("DIVNAMEID").setText(txtval);
            this._getEduBizPlans(event,key);
       
        },

        onCalculateData: function(event) {
            var model = this.getView().getModel("bizModel");
            var currentRows = model.getProperty("/");
            var totalPROMHDL1 = 0;
            var totalPROMTGL1 = 0;
            var totalPROMRIO = 0;
            var initflag = 0;
            var cnt = 0;
            var divcode;
            var tempVal = 0;

            currentRows.forEach(function(item){
                //debugger;
                //debugger;
                if (item.PROMSNO != "TA") {
                    if (item.PROMTGL1 > 0) {
                        //debugger;
                        //item.PROMRIO = Math.round(item.PROMHDL1 / item.PROMTGL1 * 100);
                        tempVal = item.PROMHDL1 / item.PROMTGL1 * 100;
                        item.PROMRIO = tempVal.toFixed(2);
                        //debugger;
                    }
                    totalPROMHDL1 = totalPROMHDL1 + Number(item.PROMHDL1);
                    totalPROMTGL1 = totalPROMTGL1 + Number(item.PROMTGL1);
                   // totalPROMRIO  = totalPROMRIO + Number(item.PROMRIO);
                    divcode = item.PROMDIV;
                    //debugger;

                }
                else {
                    
                    currentRows.splice(cnt++,1);
                    if (totalPROMTGL1 > 0) {
                            //debugger;
                        tempVal = totalPROMHDL1/ totalPROMTGL1 * 100;
                        totalPROMRIO = tempVal.toFixed(2);    
                        //totalPROMRIO = Math.round(totalPROMHDL1/ totalPROMTGL1 * 100);
                    }                       
                    var bizModel2 = {PROMYY:"2021", PROMDIV:divcode, PROMSNO:"TA", PROMTYP:"Total", PROMHDL1:totalPROMHDL1, PROMTGL1:totalPROMTGL1, PROMRIO:totalPROMRIO};
                    var newRows = currentRows.concat(bizModel2);
                    model.setProperty("/", newRows);
                    initflag = 1;
                    debugger;
                }
                cnt++;
            });
            //debugger;
            //model.setData(currentRows); 

            if ( initflag == 0 ) {
                if (totalPROMTGL1 > 0) {
                        //debugger;
                   //totalPROMRIO = Math.round(totalPROMHDL1/ totalPROMTGL1 * 100);
                    tempVal = totalPROMHDL1/ totalPROMTGL1 * 100;
                    totalPROMRIO = tempVal.toFixed(2);   
                }                   
                var bizModel2 = {PROMYY:"2021", PROMDIV:divcode, PROMSNO:"TA", PROMTYP:"Total", PROMHDL1:totalPROMHDL1, PROMTGL1:totalPROMTGL1, PROMRIO:totalPROMRIO};
                var newRows = currentRows.concat(bizModel2);
                model.setProperty("/", newRows);
            }
            
        },            
		/*
        Update all items
        */
        onUpdateData: function(event){
            var that = this;
            var page = this.getView().byId("eduBizMain");
            var aIndices  = this.getView().byId("readonly_eduBiz").getSelectedIndices();

            if ( aIndices.length == 0 ) {
                debugger;
                MessageBox.error(that.i18n.getText("수정할 데이타를 체크하세요."));
                return;
            }
            debugger;

            var data = this._makeBatchData();
            if(!data ) return; 

        //    page.setBusy(true);
            var divinfo  = this.getView().byId("selectDivision").getSelectedKey();
            $.ajax({
                url : "/hcodata2/hkmc2/$batch",
                method : "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                data : JSON.stringify(data),
                success: function(data){
                    debugger;
                    MessageBox.success(that.i18n.getText("수정을 성공 했습니다."), {
                        onClose: function (oAction) { 
                            if(oAction === "OK"){
                               // that._getEduBizPlans(event,'HK90');
                                that._getEduBizPlans(event,divinfo);
                            }
                        }
                    });
                },
                error: function(error){
                    debugger;
                    MessageBox.error(that.i18n.getText("EduBizMain.controller.error"));
                },
                complete: function(){

         //           page.setBusy(false);
                }
            })
        },
            
        //make batch data
        _makeBatchData : function(){
            var page = this.getView().byId("eduBizMain");
            var data = this.getView().getModel("bizModel").getData();
            //debugger;
            var aIndices  = this.getView().byId("readonly_eduBiz").getSelectedIndices();
            //debugger;
            if(data.length <= 0){ 
       //         page.setBusy(false);
                return MessageBox.warning(this.i18n.getText("EduBizMain.controller.NoDataToDelete")); 
            }
            var requestsValue = [];
            var cnt = 0;
            var idx = 0;

            data.forEach(function(item){
               // debugger;
                if (aIndices[idx] == cnt && item.PROMSNO != "TA") {
                   // debugger;
                    var keyQs = `(PROMYY='${item.PROMYY}',PROMDIV='${item.PROMDIV}',PROMSNO='${item.PROMSNO}')`;
                    item.PROMRIO = String(item.PROMRIO);
                    item.PROMHDL1 = Number(item.PROMHDL1);
                    item.PROMTGL1 = Number(item.PROMTGL1);
                    var reqObj = {
                        atomicityGroup: 'group1',
                        id: "update-TBL240-req" + cnt,
                        method: "PUT",
                        url: "TBL240" + keyQs,
                        headers: {
                            'content-type': 'application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=true',
                        },
                        body: item
                    }
                    requestsValue.push(reqObj);
                    cnt ++;
                    idx ++;    
                } else {
                    cnt ++;
                }    
            });
            return {requests: requestsValue};
        },

	    /*
        Delete all items
        */
        onDeleteData: function(event){
                var that = this;
                var page = this.getView().byId("eduBizMain");
                var data = this._makeBatchData2();
                if(!data) return; 
         //       page.setBusy(true);
                var divinfo  = this.getView().byId("selectDivision").getSelectedKey();

                $.ajax({
                    url : "/hcodata2/hkmc2/$batch",
                    method : "POST",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    data : JSON.stringify(data),
                    success: function(data){
                        debugger;
                        MessageBox.success(that.i18n.getText("EduBizMain.controller.successResetData"), {
                            onClose: function (oAction) { 
                                if(oAction === "OK"){
                                    that._getEduBizPlans(event, divinfo);
                                }
                            }
                        });
                    },
                    error: function(error){
                        debugger;
                        MessageBox.error(that.i18n.getText("EduBizMain.controller.error"));
                    },
                    complete: function(){
           //             page.setBusy(false);
                    }
                })
            },
            
        //make batch data
        _makeBatchData2 : function(){
                var page = this.getView().byId("eduBizMain");
                var data = this.getView().getModel("bizModel").getData();
                if(data.length <= 0){ 
               //     page.setBusy(false);
                    return MessageBox.warning(this.i18n.getText("EduBizMain.controller.NoDataToDelete")); 
                }
                var requestsValue = [];
                var cnt = 0;

                data.forEach(function(item){
                    var keyQs = `(PROMYY='${item.PROMYY}',PROMDIV='${item.PROMDIV}',PROMSNO='${item.PROMSNO}')`;
                    var reqObj = {
                        atomicityGroup: 'group2',
                        id: "delete-TBL240-req" + cnt,
                        method: "DELETE",
                        url: "TBL240" + keyQs
                    }
                    requestsValue.push(reqObj);
                    cnt ++;
                });
                return {requests: requestsValue};
            },

		//년도 필터링
		onSearch: function(event){
                var filters = [];
                var table = this.getView().byId("readonly_eduBiz");

                event.getParameter("selectionSet").forEach(item=>{
                    if(item.getValue()){ 
                        filters.push(new Filter("FILED01", sap.ui.model.FilterOperator.EQ, item.getValue()) );
                    };
                });
                table.getBinding("rows").filter(filters);
            },

		});
	});
