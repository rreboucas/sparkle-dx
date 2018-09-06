({
    doInit : function(component, event, helper) {
        console.log("FileNameController.doInit: entered");

        var fileID = component.get("v.fileId");
        console.log('File id: ' + fileID);

        var extension = component.get("v.fileExtension");
        switch (extension) {
            case "jpg":
            case "jpeg":
            case "png":
            case "gif":    
            case "bmp":  

                component.set("v.sldsIconName", 'doctype:image');
                break;

            case "ppt":
            case "pptx":    
                
                component.set("v.sldsIconName", 'doctype:ppt');
                break;
                
           case "zip":
                

                break;
                
          case "xml":
                

                break;
                
         case "mp4":
                

                break;
        }

        console.log("FileNameController.doInit: exit");

    },

    openFileViewer : function(component, event, helper) {

        console.log("FileNameController.openFileViewer: entered");
        
        var uploadedAs = component.get("v.UploadedAsType");
        var fileID = component.get("v.fileId");
        console.log('File id: ' + fileID);

        var parentRecId = component.get("v.parentId");

        


        if (parentRecId){

            // There is a Parent Record ID so it is either a File or an Attachment so the navigation is different

            switch (uploadedAs) {
                case "Attachment":

                var pageRef = {
                        type: "standard__recordRelationshipPage",
                        attributes: {
                            recordId: component.get("v.parentId"),
                            relationshipName: "NotesAndAttachments",
                            actionName: "view"
                        }
                    };

                    
                    component.find("navigationService").navigate(pageRef);

                    break;
                    
                case "File":
                    
                var pageRef = {
                    type: "standard__recordRelationshipPage",
                    attributes: {
                        recordId: component.get("v.parentId"),
                        relationshipName: "AttachedContentDocuments",
                        actionName: "view"
                    }
                };
                
                component.find("navigationService").navigate(pageRef);

                    break;
            }
        }
        else {
            // We know it is a Content without parent id:


        }

        
       
            


        console.log("FileNameController.openFileViewer: exit");

    }
})