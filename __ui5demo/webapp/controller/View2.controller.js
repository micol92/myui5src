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

		return BaseController.extend("hkmc.poc.ns.ui5demo.controller.View2", {
    	formatter: formatter,
	
		onInit: function () {
            //debugger;
            this._getEmployees();
            //this.getOwnerComponent().reload = true;
			this.i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this.getRouter().getRoute("View2").attachMatched(this._onRouteMatchedEduBizMain, this);
            //console.log("test00001");
            //debugger;
            //this._setDeptname(event);

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
            
                this._setDeptname("K0120000");
               // debugger;
               // debugger;
                //comment by jwhan for 2 rows below
                //this.getView().byId("readonly_eduBiz").setSelectedIndex(-1);
                //this.getView().byId("selectPerson").setSelectedKey("0");
            },

       _setDeptname: function(divcode) {
           //debugger;
            //var model = this.getView().getModel("bizModel");
            //debugger;
            //var currentRows = model.getProperty("/");
            //var divcode = currentRows[1].PROMDIV;
            //debugger;
            if (divcode == "K0120000") {
                this.getView().byId("DEPTNAME1-1").setText("국내사업지원");
                this.getView().byId("DEPTNAME2-1").setText("판매사업부");
            } else if (divcode == "K0110000") {
                this.getView().byId("DEPTNAME1-1").setText("경영지원사업부");
                this.getView().byId("DEPTNAME2-1").setText("기타사업부");                
            } else if (divcode == "K0130000" ) {
                this.getView().byId("DEPTNAME1-1").setText("ICT기획실");
                this.getView().byId("DEPTNAME2-1").setText("ICT관리실");      
            } else if (divcode == "K0140000" ) {
                this.getView().byId("DEPTNAME1-1").setText("화성공장");
                this.getView().byId("DEPTNAME2-1").setText("생산관리부");         
            } else if (divcode == "K0150000" ) {
                this.getView().byId("DEPTNAME1-1").setText("유럽본부-경영지원");
                this.getView().byId("DEPTNAME2-1").setText("유럽본부-판매실");   
            } else if (divcode == "H0120000") {
                this.getView().byId("DEPTNAME1-1").setText("국내사업지원");
                this.getView().byId("DEPTNAME2-1").setText("판매사업부");
            } else if (divcode == "H0110000") {
                this.getView().byId("DEPTNAME1-1").setText("경영지원사업부");
                this.getView().byId("DEPTNAME2-1").setText("기타사업부");                
            } else if (divcode == "H0130000" ) {
                this.getView().byId("DEPTNAME1-1").setText("ICT기획실");
                this.getView().byId("DEPTNAME2-1").setText("ICT관리실");      
            } else if (divcode == "H0140000" ) {
                this.getView().byId("DEPTNAME1-1").setText("울산1공장");
                this.getView().byId("DEPTNAME2-1").setText("기타생산부");         
            } else if (divcode == "H0150000" ) {
                this.getView().byId("DEPTNAME1-1").setText("유럽본부-경영지원");
                this.getView().byId("DEPTNAME2-1").setText("유럽본부-판매실");                                               
            } else {
                this.getView().byId("DEPTNAME1-1").setText("기타사업부-01");
                this.getView().byId("DEPTNAME2-1").setText("기타사업부-02");                       
            }
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
                page.setBusy(true);
                
                if(divcode == undefined) {
                   // debugger;
                    urlstring = "/hcodata2/hkmc2/TBL250?$filter=PROMDIV eq 'K0120000'";
                }    
                else {   
                   // debugger;
                    urlstring =  "/hcodata2/hkmc2/TBL250?$filter=PROMDIV eq '" + divcode + "'" ;
                   // debugger;
                };

                $.ajax({

                    url: urlstring,
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    success: function(data, headers){
                       // debugger;
                        //var nData = that._getTextByKey(data.value);
                        if(that.getView().getModel("bizModel")){
                            //that.getView().getModel("bizModel").setData(nData); 
                            that.getView().getModel("bizModel").setData(data.value); 
                            //that._setDeptname(event);
                        }else{
                            //that.getView().setModel(new JSONModel(nData), "bizModel");
                            debugger;
                            that.getView().setModel(new JSONModel(data.value), "bizModel");
                            //that._setDeptname(event);

                            debugger;
                        }
                    },
                    error: function(error){
                       // debugger;
                        MessageBox.error(that.i18n.getText("EduBizMain.controller.error"));
                    },
                    complete: function(){
                        page.setBusy(false);
                    }
                });
            },        //신규생성
		onCreate: function(event){
                //복사된 데이터 초기화
                var createComponentModel = this.getOwnerComponent().getModel("create");
                if(createComponentModel){createComponentModel.setData({});}
                this.getRouter().navTo("CreateTODiv2");
            },

		onChangeDiv: function(event){
            var key = event.getParameter("selectedItem").getKey();
            debugger;
            this._getEduBizPlans(event,key);
            this._setDeptname(key);
        },

        onCalculateData: function(event) {
            var model = this.getView().getModel("bizModel");
            var currentRows = model.getProperty("/");
            var totalPROMHDL1 = 0;
            var totalPROMTGL1 = 0;
            var totalPROMRIO1 = 0;

            var totalPROMHDL2 = 0;
            var totalPROMTGL2 = 0;
            var totalPROMRIO2 = 0;            
            var initflag = 0;
            var cnt = 0;
            var divcode;
            var deptcode1;
            var deptcode2;
            var tempVal = 0;

            currentRows.forEach(function(item){
                //debugger;
                if (item.PROMSNO != "TA") {
                    if (item.PROMTGL1 > 0) {
                        //debugger;
                        //item.PROMRIO = Math.round(item.PROMHDL1 / item.PROMTGL1 * 100);
                        tempVal = item.PROMHDL1 / item.PROMTGL1 * 100;
                        item.PROMRIO1 = tempVal.toFixed(2);                      
                    }
                    if (item.PROMTGL2 > 0) {
                        //debugger;
                        //item.PROMRIO = Math.round(item.PROMHDL1 / item.PROMTGL1 * 100);
                        tempVal = item.PROMHDL2 / item.PROMTGL2 * 100;
                        item.PROMRIO2 = tempVal.toFixed(2);                      
                    }                    
                    totalPROMHDL1 = totalPROMHDL1 + Number(item.PROMHDL1);
                    totalPROMTGL1 = totalPROMTGL1 + Number(item.PROMTGL1);
                    totalPROMHDL2 = totalPROMHDL2 + Number(item.PROMHDL2);
                    totalPROMTGL2 = totalPROMTGL2 + Number(item.PROMTGL2);                    
                    divcode = item.PROMDIV;
                    deptcode1 = item.PROMDEP1;
                    deptcode2 = item.PROMDEP2;

                    //debugger;

                }
                else {
                    
                    currentRows.splice(cnt++,1);
                    if (totalPROMTGL1 > 0) {
                        //debugger;
                        //totalPROMRIO = Math.round(totalPROMHDL1/ totalPROMTGL1 * 100);
                        tempVal = totalPROMHDL1/ totalPROMTGL1 * 100;
                        totalPROMRIO1 = tempVal.toFixed(2);                            
                    }         
                    if (totalPROMTGL2 > 0) {
                        //debugger;
                        //totalPROMRIO = Math.round(totalPROMHDL1/ totalPROMTGL1 * 100);
                        tempVal = totalPROMHDL2/ totalPROMTGL2 * 100;
                        totalPROMRIO2 = tempVal.toFixed(2);                            
                    }                 
                    var bizModel2 = {PROMYY:"2021", PROMDIV:divcode, PROMDEP1:deptcode1, PROMDEP2:deptcode2, PROMSNO:"TA", PROMTYP:"Total", PROMHDL1:totalPROMHDL1, PROMTGL1:totalPROMTGL1, PROMRIO1:totalPROMRIO1,PROMHDL2:totalPROMHDL2, PROMTGL2:totalPROMTGL2, PROMRIO2:totalPROMRIO2};
                    var newRows = currentRows.concat(bizModel2);
                    model.setProperty("/", newRows);
                    initflag = 1;
                    debugger;
                }
                cnt++;
            });
            //debugger;
            //model.setData(currentRows); 
            //debugger;
            //debugger;
            if ( initflag == 0 ) {
                if (totalPROMTGL1 > 0) {
                    //debugger;
                    //totalPROMRIO = Math.round(totalPROMHDL1/ totalPROMTGL1 * 100);
                    tempVal = totalPROMHDL1/ totalPROMTGL1 * 100;
                    totalPROMRIO1 = tempVal.toFixed(2);                        
                }   
                if (totalPROMTGL2 > 0) {
                    //debugger;
                    //totalPROMRIO = Math.round(totalPROMHDL1/ totalPROMTGL1 * 100);
                    tempVal = totalPROMHDL2/ totalPROMTGL2 * 100;
                    totalPROMRIO2 = tempVal.toFixed(2);                        
                }                   
                var bizModel2 = {PROMYY:"2021", PROMDIV:divcode, PROMDEP1:deptcode1, PROMDEP2:deptcode2, PROMSNO:"TA", PROMTYP:"Total", PROMHDL1:totalPROMHDL1, PROMTGL1:totalPROMTGL1, PROMRIO1:totalPROMRIO1,PROMHDL2:totalPROMHDL2, PROMTGL2:totalPROMTGL2, PROMRIO2:totalPROMRIO2};
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

            page.setBusy(true);
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

                    page.setBusy(false);
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
                page.setBusy(false);
                return MessageBox.warning(this.i18n.getText("EduBizMain.controller.NoDataToDelete")); 
            }
            var requestsValue = [];
            var cnt = 0;
            var idx = 0;

            data.forEach(function(item){
               // debugger;
                if (aIndices[idx] == cnt && item.PROMSNO != "TA") {
                   // debugger;
                    var keyQs = `(PROMYY='${item.PROMYY}',PROMDIV='${item.PROMDIV}',PROMDEP1='${item.PROMDEP1}',PROMDEP2='${item.PROMDEP2}',PROMSNO='${item.PROMSNO}')`;
                    item.PROMRIO1 = String(item.PROMRIO1);
                    item.PROMHDL1 = Number(item.PROMHDL1);
                    item.PROMTGL1 = Number(item.PROMTGL1);
                    item.PROMRIO2 = String(item.PROMRIO2);
                    item.PROMHDL2 = Number(item.PROMHDL2);
                    item.PROMTGL2 = Number(item.PROMTGL2);                    
                    var reqObj = {
                        atomicityGroup: 'group1',
                        id: "update-TBL250-req" + cnt,
                        method: "PUT",
                        url: "TBL250" + keyQs,
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
                page.setBusy(true);
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
                        page.setBusy(false);
                    }
                })
            },
            
        //make batch data
        _makeBatchData2 : function(){
                var page = this.getView().byId("eduBizMain");
                var data = this.getView().getModel("bizModel").getData();
                if(data.length <= 0){ 
                    page.setBusy(false);
                    return MessageBox.warning(this.i18n.getText("EduBizMain.controller.NoDataToDelete")); 
                }
                var requestsValue = [];
                var cnt = 0;

                data.forEach(function(item){
                    var keyQs = `(PROMYY='${item.PROMYY}',PROMDIV='${item.PROMDIV}',PROMDEP1='${item.PROMDEP1}',PROMDEP2='${item.PROMDEP2}',PROMSNO='${item.PROMSNO}')`;
                    var reqObj = {
                        atomicityGroup: 'group2',
                        id: "delete-TBL250-req" + cnt,
                        method: "DELETE",
                        url: "TBL250" + keyQs
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
