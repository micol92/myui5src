sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (BaseController, MessageBox, JSONModel, MessageToast) {
	"use strict";

    return BaseController.extend("hkmc.poc.ns.ui5demo.controller.CreateTODiv", {

        onInit: function(event){
         debugger;   
            this._getEmployees();
            this._getMockData();
            this.i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this.getRouter().getRoute("CreateTODiv").attachMatched(this._onRouteMatchedEduBizCreate, this);
            debugger;            
        },

        onAfterRendering: function(event){
          //  this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },

        _onRouteMatchedEduBizCreate: function(event){
            debugger;
            var bizData= [
                {PROMYY:"2021", PROMDIV:"K0120000", PROMSNO:"1", PROMTYP:"G1->G2", PROMHDL1:0, PROMTGL1:54, PROMRIO:0},
                {PROMYY:"2021", PROMDIV:"K0120000", PROMSNO:"1", PROMTYP:"G2->G3", PROMHDL1:0, PROMTGL1:41, PROMRIO:0},
                {PROMYY:"2021", PROMDIV:"K0120000", PROMSNO:"1", PROMTYP:"G3->G4", PROMHDL1:0, PROMTGL1:99, PROMRIO:0},
                {PROMYY:"2021", PROMDIV:"K0120000", PROMSNO:"1", PROMTYP:"탄력운영 T/O일반직", PROMHDL1:0, PROMTGL1:0, PROMRIO:0}
              ];
           // var bizData2 = {PROMYY:"2021", PROMDIV:"HK90", PROMSNO:"50", PROMTYP:"T/O일반직", PROMHDL1:0, PROMTGL1:0, PROMRIO:0};

            //debugger;
            //Create Model
            if(!this.getView().getModel("newEduBiz")){ this.getView().setModel(new JSONModel({}), "newEduBiz"); }
            //debugger;
          
            this.getView().getModel("newEduBiz").setData(bizData);
            //debugger;

            this.getView().byId("DIVNAMEID").setText("기아차/국내사업본부-K0120000");
        },
        onCalculateData: function(event) {
            var model = this.getView().getModel("newEduBiz");
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
                if (item.PROMSNO != "TA") {
                    if (item.PROMTGL1 > 0) {
                        //debugger;
                        //item.PROMRIO = Math.round(item.PROMHDL1 / item.PROMTGL1 * 100);
                        tempVal = item.PROMHDL1 / item.PROMTGL1 * 100;
                        item.PROMRIO = tempVal.toFixed(2);
                    }
                    totalPROMHDL1 = totalPROMHDL1 + Number(item.PROMHDL1);
                    totalPROMTGL1 = totalPROMTGL1 + Number(item.PROMTGL1);
                    divcode = item.PROMDIV;
                    //debugger;

                }
                else {
                    
                    currentRows.splice(cnt++,1);
                    if (totalPROMTGL1 > 0) {
                        //debugger;
                        //totalPROMRIO = Math.round(totalPROMHDL1/ totalPROMTGL1 * 100);
                        tempVal = totalPROMHDL1/ totalPROMTGL1 * 100;
                        totalPROMRIO = tempVal.toFixed(2);                            
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
            //debugger;
            //debugger;
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
            //debugger;         
            //this.displayTotalData(event,currentRows,totalPROMHDL1,totalPROMTGL1,totalPROMRIO);
            
        },

        onCancel: function(event){
			var that = this; 
            
			if(this._isDataChanged()){
				MessageBox.confirm(this.i18n.getText("EduBizCreate.controller.Cancel"),{
					onClose: function (oAction) {
						if(oAction === "OK"){
                            that.getRouter().navTo("View1");
						};
					}
				}); 
			}else{
                that.getRouter().navTo("View1");
			}
        },
		_isDataChanged: function(event){
			var that = this;
            var data = this.getView().getModel("newEduBiz").getData();

			for(var key in data){
				if(data[`${key}`] === ""){
					// 데이터 값 없는 경우
					data[`${key}`] = null;	
				}else{
					//데이터 있는경우
					var newData = data[`${key}`];
				}
				if(newData) return true;
			}
			//어느 데이터도 바꾸지 않은 경우
			return false;
		},        
        _onSelectDiv: function(event,divcode){

            var bizData= [
                {PROMYY:"2021", PROMDIV:divcode, PROMSNO:"1", PROMTYP:"G1->G2", PROMHDL1:0, PROMTGL1:54, PROMRIO:0},
                {PROMYY:"2021", PROMDIV:divcode, PROMSNO:"1", PROMTYP:"G2->G3", PROMHDL1:0, PROMTGL1:41, PROMRIO:0},
                {PROMYY:"2021", PROMDIV:divcode, PROMSNO:"1", PROMTYP:"G3->G4", PROMHDL1:0, PROMTGL1:99, PROMRIO:0},
                {PROMYY:"2021", PROMDIV:divcode, PROMSNO:"1", PROMTYP:"탄력운영 T/O일반직", PROMHDL1:0, PROMTGL1:0, PROMRIO:0}
              ];

            this.getView().getModel("newEduBiz").setData(bizData);

        },
        onChangeDiv: function(event){
            var key = event.getParameter("selectedItem").getKey();
            var txtval = event.getParameter("selectedItem").getText();
            this.getView().byId("DIVNAMEID").setText(txtval);
                        
            debugger;
            this._onSelectDiv(event,key);           
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
        //Load mock data
        _getMockData: function(event){
            var that = this;
            $.ajax({
                url: './model/mockData.json',
                dataType : 'json',
                success: function(data){
                    that.getView().setModel(new JSONModel(data), "fieldData");
                },
                error: function(error){
                    MessageBox.error(that.i18n.getText("EduBizCreate.controller.error"))
                }
            });
        },

        
		/*
        Insert all items
        */
        onInitData: function(event){
            var that = this;
            var page = this.getView().byId("eduBizCreate");
            var data = this._makeBatchData();
            if(!data) return; 
           // page.setBusy(true);
            debugger;

            $.ajax({
                url : "/hcodata2/hkmc2/$batch",
                method : "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                data : JSON.stringify(data),
                success: function(data){
                    debugger;
                    MessageBox.success(that.i18n.getText("성공적으로 입력이 되었습니다."), {
                        onClose: function (oAction) { 
                            if(oAction === "OK"){
                                //that._getEduBizPlans();
                                debugger;
                                that.getRouter().navTo("View1");
                                debugger;
                            }
                        }
                    });
                },
                error: function(error){
                    //debugger;
                    MessageBox.error(that.i18n.getText("EduBizMain.controller.error"));
                },
                complete: function(){

                //    page.setBusy(false);
                }
            })
        },
            
        //make batch data
        _makeBatchData : function(){
            var page = this.getView().byId("eduBizCreate");
            var data = this.getView().getModel("newEduBiz").getData();
            if(data.length <= 0){ 
             //   page.setBusy(false);
                return MessageBox.warning(this.i18n.getText("EduBizMain.controller.NoDataToDelete")); 
            }
            var requestsValue = [];
            var cnt = 0;

            data.forEach(function(item){
                if (item.PROMSNO != "TA") {
                        item.PROMRIO = String(item.PROMRIO);
                        item.PROMHDL1 = Number(item.PROMHDL1);
                        item.PROMTGL1 = Number(item.PROMTGL1);
                        item.PROMSNO = String(item.PROMSNO) + String(cnt);
                        debugger;
                        var reqObj = {
                            atomicityGroup: 'group3',
                            id: "insert-TBL240-req" + cnt,
                            method: "POST",
                            url: "TBL240",  // + keyQs,
                            headers: {
                                'content-type': 'application/json;odata.metadata=minimal;odata.streaming=true;IEEE754Compatible=true',
                            },
                            body: item
                        }
                        requestsValue.push(reqObj);
                        cnt ++;
                }
                });
            return {requests: requestsValue};
        },

        //
        onAddRows : function(event) {

            var model = this.getView().getModel("newEduBiz");
            var currentRows = model.getProperty("/");
            var divcode = currentRows[1].PROMDIV;
            var cnt = 0;
            var totflag = 0;
            var bizData2 = {PROMYY:"2021", PROMDIV:divcode, PROMSNO:"1", PROMTYP:"", PROMHDL1:0, PROMTGL1:0, PROMRIO:0};
            debugger;
            currentRows.forEach(function(item){
                debugger;
                if (item.PROMSNO == "TA") {
                    currentRows.splice(cnt,1);
                    var newRows = currentRows.concat(bizData2);
                    model.setProperty("/", newRows);
                    totflag = 1;
                    debugger;
                }
                cnt++;
            });   

            if (totflag != 1) {
                var newRows = currentRows.concat(bizData2);
                model.setProperty("/", newRows);                    
            }         
        },
        onDeleteRows : function(event) {
            var that = this;
            var page = this.getView().byId("newEduBiz");
            var aIndices  = this.getView().byId("readonly_eduBiz").getSelectedIndices();

            if ( aIndices.length == 0 ) {
                debugger;
                MessageBox.error(that.i18n.getText("삭제할 데이타를 체크하세요."));
                return;
            }

            var model = this.getView().getModel("newEduBiz");
            var currentRows = model.getProperty("/");
           //debugger;
            currentRows.splice(aIndices,1);
            model.setProperty("/",currentRows);
           //debugger;
           //var selectedIdx = event.getSource().getParent().getParent().getSelectedIndex();
        }        
    })
});