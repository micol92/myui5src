sap.ui.define([], function () {
	"use strict";
	return {
		getSelected : function(DETAIL){
            if(DETAIL){

                var recentApprovalInfo = JSON.parse(JSON.stringify(DETAIL)).reverse().find(function(data){
                    if(data.APPR_STATUS === "A"){return data;}    //최신 결재자정보
                });
                if(recentApprovalInfo){
                    if(recentApprovalInfo.NO1 === "10"){
                        return true;
                    }else{
                        return this.currentPerson < recentApprovalInfo.NO1 ? false : true; 
                    }
                }else{
                    this.getView().getModel("auditList").refresh();
                }
            }else{
                this.getView().getModel("auditList").refresh();
            }
		},
		
		getRowCount: function(bindingData){
			return bindingData.length >= 10 ? 10 : bindingData.length;
        },
        
		getRowCountAudit: function(bindingData){
			return bindingData.length >= 4 ? 4 : bindingData.length;
		},
		
	};
});