public class FlexFileUploadController {
	
    @AuraEnabled
    public static Id saveTheFile(Id parentId, String fileName, String base64Data, String contentType, String uploadAsType) { 
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        
        ID createdID;

        switch on uploadAsType {
            when 'Attachment' {
                System.debug('Attachment chosen:');

                Attachment a = new Attachment();
                a.parentId = parentId;

                a.Body = EncodingUtil.base64Decode(base64Data);
                a.Name = fileName;
                a.ContentType = contentType;
                
                insert a;
                createdID = a.id;
            }
            when 'Content' {
                System.debug('create Content / Not Associated to Any records');

                ContentVersion contentInsert =new ContentVersion(); 
                contentInsert.Title =fileName; 
                contentInsert.VersionData=EncodingUtil.base64Decode(base64Data);
                contentInsert.PathOnClient='/' + fileName ;
                insert contentInsert; 
                system.debug('contentInsert.id '+ contentInsert.id);
                system.debug('contentInsert.ContentUrl '+ contentInsert.ContentUrl);
                contentInsert = [select id, ContentUrl from ContentVersion WHERE Id =: contentInsert.Id];
                

                createdID = contentInsert.ContentUrl;
            }
            when else {
                System.debug('Default is File so create a File');

                ContentVersion contentInsert =new ContentVersion(); 
                contentInsert.Title =fileName; 
                contentInsert.VersionData=EncodingUtil.base64Decode(base64Data);
                contentInsert.PathOnClient='/' + fileName ;
                insert contentInsert; 
                system.debug('contentInsert.id '+ contentInsert.id);
                system.debug('contentInsert.ContentUrl '+ contentInsert.ContentUrl);
                contentInsert = [select id, ContentDocumentId from ContentVersion WHERE Id =: contentInsert.Id];
                ContentDocumentLink cl = new ContentDocumentLink();
                cl.ContentDocumentId = contentInsert.ContentDocumentId;
                cl.LinkedEntityId = parentId; 
                cl.ShareType = 'V';
                cl.Visibility = 'AllUsers';
                insert cl;
                system.debug('contentInsert.id');

                createdID = contentInsert.id;
            }
        }



        
        
        return createdID;
    }
}