sap.ui.define([
	"./BaseController",
	"sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (BaseController, MessageBox, JSONModel, MessageToast) {
	"use strict";

    return BaseController.extend("hkmc.poc.ns.ui5demo.controller.CreateTODiv2", {

        onInit: function(event){
         debugger;   
            this._getEmployees();
            this._getMockData();
            this.i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            this.getRouter().getRoute("CreateTODiv2").attachMatched(this._onRouteMatchedEduBizCreate, this);
            debugger;            
        },

        onAfterRendering: function(event){
          //  this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
        },

        _onRouteMatchedEduBizCreate: function(event){
            debugger;
            var bizData= [
                {PROMYY:"2021", PROMDIV:"K0120000", PROMDEP1:"K0121000", PROMDEP2:"K0122000", PROMSNO:"1", PROMTYP:"G1->G2", PROMHDL1:0, PROMTGL1:54, PROMRIO1:0, PROMHDL2:0, PROMTGL2:54, PROMRIO2:0},
                {PROMYY:"2021", PROMDIV:"K0120000", PROMDEP1:"K0121000", PROMDEP2:"K0122000", PROMSNO:"1", PROMTYP:"G2->G3", PROMHDL1:0, PROMTGL1:41, PROMRIO1:0, PROMHDL2:0, PROMTGL2:41, PROMRIO2:0},
                {PROMYY:"2021", PROMDIV:"K0120000", PROMDEP1:"K0121000", PROMDEP2:"K0122000", PROMSNO:"1", PROMTYP:"G3->G4", PROMHDL1:0, PROMTGL1:99, PROMRIO1:0, PROMHDL2:0, PROMTGL2:99, PROMRIO2:0},
                {PROMYY:"2021", PROMDIV:"K0120000", PROMDEP1:"K0121000", PROMDEP2:"K0122000", PROMSNO:"1", PROMTYP:"탄력운영 T/O일반직", PROMHDL1:0, PROMTGL1:0, PROMRIO1:0, PROMHDL2:0, PROMTGL2:0, PROMRIO2:0}
              ];

            //debugger;
            //Create Model

            if(!this.getView().getModel("newEduBiz2")){ this.getView().setModel(new JSONModel({}), "newEduBiz2"); }
            //debugger;
          
            this.getView().getModel("newEduBiz2").setData(bizData);
            //debugger;
            this._setDeptname(event);
        },
        _setDeptname: function(event) {
            var model = this.getView().getModel("newEduBiz2");
            var currentRows = model.getProperty("/");
            var divcode = currentRows[1].PROMDIV;

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
        onCalculateData: function(event) {
            var model = this.getView().getModel("newEduBiz2");
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
            var data = this.getView().getModel("newEduBiz2").getData();

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

            var deptcode1 = "";
            var deptcode2 = "";

            if (divcode == "K0120000" ) {
                deptcode1 = "K0121000";
                deptcode2 = "K0122000";
            } else if ( divcode == "K0110000" ) {
                deptcode1 = "K0110100";
                deptcode2 = "K0110200";                
            } else if ( divcode == "K0130000" ) {
                deptcode1 = "K0130100";
                deptcode2 = "K0130200";                
            } else if ( divcode == "K0140000" ) {
                deptcode1 = "K0140100";
                deptcode2 = "K0140200";                
            } else if ( divcode == "K0150000" ) {
                deptcode1 = "K0150100";
                deptcode2 = "K0150200"; 
            } else if (divcode == "H0120000" ) {
                deptcode1 = "H0121000";
                deptcode2 = "H0122000";
            } else if ( divcode == "H0110000" ) {
                deptcode1 = "H0110100";
                deptcode2 = "H0110200";                
            } else if ( divcode == "H0130000" ) {
                deptcode1 = "H0130100";
                deptcode2 = "H0130200";                
            } else if ( divcode == "H0140000" ) {
                deptcode1 = "H0140100";
                deptcode2 = "H0140200";                
            } else if ( divcode == "H0150000" ) {
                deptcode1 = "H0150100";
                deptcode2 = "H0150200";                 
            } else {
                deptcode1 = "K9150100";
                deptcode2 = "K9150200"; 
            }

            var bizData= [
                {PROMYY:"2021", PROMDIV:divcode, PROMDEP1:deptcode1, PROMDEP2:deptcode2, PROMSNO:"1", PROMTYP:"G1->G2", PROMHDL1:0, PROMTGL1:54, PROMRIO1:0, PROMHDL2:0, PROMTGL2:54, PROMRIO2:0},
                {PROMYY:"2021", PROMDIV:divcode, PROMDEP1:deptcode1, PROMDEP2:deptcode2, PROMSNO:"1", PROMTYP:"G2->G3", PROMHDL1:0, PROMTGL1:41, PROMRIO1:0, PROMHDL2:0, PROMTGL2:41, PROMRIO2:0},
                {PROMYY:"2021", PROMDIV:divcode, PROMDEP1:deptcode1, PROMDEP2:deptcode2, PROMSNO:"1", PROMTYP:"G3->G4", PROMHDL1:0, PROMTGL1:99, PROMRIO1:0, PROMHDL2:0, PROMTGL2:99, PROMRIO2:0},
                {PROMYY:"2021", PROMDIV:divcode, PROMDEP1:deptcode1, PROMDEP2:deptcode2, PROMSNO:"1", PROMTYP:"탄력운영 T/O일반직", PROMHDL1:0, PROMTGL1:0, PROMRIO1:0, PROMHDL2:0, PROMTGL2:0, PROMRIO2:0}
              ];

            this.getView().getModel("newEduBiz2").setData(bizData);
            this._setDeptname(event);

        },
        onChangeDiv: function(event){
            var key = event.getParameter("selectedItem").getKey();
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
            page.setBusy(true);
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
                                that.getRouter().navTo("View2");
                                debugger;
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
            var page = this.getView().byId("eduBizCreate");
            var data = this.getView().getModel("newEduBiz2").getData();
            if(data.length <= 0){ 
                page.setBusy(false);
                return MessageBox.warning(this.i18n.getText("EduBizMain.controller.NoDataToDelete")); 
            }
            var requestsValue = [];
            var cnt = 0;

            data.forEach(function(item){
                if (item.PROMSNO != "TA") {
                        item.PROMRIO1 = String(item.PROMRIO1);
                        item.PROMHDL1 = Number(item.PROMHDL1);
                        item.PROMTGL1 = Number(item.PROMTGL1);
                        item.PROMRIO2 = String(item.PROMRIO2);
                        item.PROMHDL2 = Number(item.PROMHDL2);
                        item.PROMTGL2 = Number(item.PROMTGL2);      
                        item.PROMSNO = String(item.PROMSNO) + String(cnt);
                        var reqObj = {
                            atomicityGroup: 'group3',
                            id: "insert-TBL250-req" + cnt,
                            method: "POST",
                            url: "TBL250",  // + keyQs,
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

            var model = this.getView().getModel("newEduBiz2");
            var currentRows = model.getProperty("/");
            var divcode = currentRows[1].PROMDIV;
            var deptcode1 = currentRows[1].PROMDEP1;
            var deptcode2 = currentRows[1].PROMDEP2;

            var cnt = 0;
            var totflag = 0;
            //var bizData2 = {PROMYY:"2021", PROMDIV:divcode, PROMSNO:"1", PROMTYP:"", PROMHDL1:0, PROMTGL1:0, PROMRIO:0};
            var bizData2 = {PROMYY:"2021", PROMDIV:divcode, PROMDEP1:deptcode1, PROMDEP2:deptcode2, PROMSNO:"1", PROMTYP:"", PROMHDL1:0, PROMTGL1:0, PROMRIO1:0,PROMHDL2:0, PROMTGL2:0, PROMRIO2:0};
        
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
            var page = this.getView().byId("newEduBiz2");
            var aIndices  = this.getView().byId("readonly_eduBiz").getSelectedIndices();

            if ( aIndices.length == 0 ) {
                debugger;
                MessageBox.error(that.i18n.getText("삭제할 데이타를 체크하세요."));
                return;
            }

            var model = this.getView().getModel("newEduBiz2");
            var currentRows = model.getProperty("/");
           //debugger;
            currentRows.splice(aIndices,1);
            model.setProperty("/",currentRows);
           //debugger;
           //var selectedIdx = event.getSource().getParent().getParent().getSelectedIndex();
        }        
    })
});