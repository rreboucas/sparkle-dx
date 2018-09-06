({
    save : function(component) {
        
        var MAX_FILE_SIZE = 750000; /* 1 000 000 * 3/4 to account for base64 */
        
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        if(file.name)
            component.set("v.fileName", file.name);
        
        if(file.type)
            component.set("v.fileExtension", file.type);
   
        if (file.size > this.MAX_FILE_SIZE) {
            alert('File size cannot exceed ' + this.MAX_FILE_SIZE + ' bytes.\n' +
    		  'Selected file size: ' + file.size);
    	    return;
        }
    
        var fr = new FileReader();
        
	var self = this;
       	fr.onload = function() {
            console.log('fr.result: '+ fr.result);
            var fileContents = fr.result;
    	    var base64Mark = 'base64,';
            var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;

            fileContents = fileContents.substring(dataStart);
        
    	    self.upload(component, file, fileContents);
        };

        fr.readAsDataURL(file);
    },

    upload: function(component, file, fileContents) {
        var action = component.get("c.saveTheFile"); 

        action.setParams({
            parentId: component.get("v.recordId"),
            fileName: file.name,
            base64Data: encodeURIComponent(fileContents), 
            contentType: file.type,
            uploadAsType: component.get("v.uploadTypevalue")
        });

        component.set("v.isUploading", true); 
        
         

        action.setCallback(this, function(a) {
            
            
            
            
            var contentURL = a.getReturnValue();
            console.log('content URL: '+ contentURL);
            if (contentURL){
                component.set("v.contentURL", contentURL);
                component.set("v.hasContentURL", true);
                
                $A.createComponent(
                    "c:fileName",
                    {
                        "fileName": component.get("v.fileName"),
                        "fileId": contentURL,
                        "fileExtension": component.get("v.fileExtension"),
                        "UploadedAsType": component.get("v.uploadTypevalue"),
                        "parentId": component.get("v.recordId"),
                        "sObjectName": component.get("v.sObjectName")
                    },
                    function(newFile, status, errorMessage){
                        //Add the new button to the body array
                        if (status === "SUCCESS") {
                            var body = component.get("v.body");
                            body.push(newFile);
                            component.set("v.body", body);
                        }
                        else if (status === "INCOMPLETE") {
                            console.log("No response from server or client is offline.")
                            // Show offline error
                        }
                        else if (status === "ERROR") {
                            console.log("Error: " + errorMessage);
                            // Show error message
                        }
                    }
                );
            }
            

        });
            
        $A.enqueueAction(action); 
 
    }
})