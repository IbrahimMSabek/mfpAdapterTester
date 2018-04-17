Requests.service("exportUtility",function(CONSTANTS,GENERIC_UTILITIES){

    /************************************ For SpreadSheet ************************************/
    var emitXmlHeader = function (columns) {
        var headerRow =  '<ss:Row>\n';
        for (var colName in columns) {
            headerRow += '  <ss:Cell>\n';
            headerRow += '    <ss:Data ss:Type="String">';
            headerRow += colName + '</ss:Data>\n';
            headerRow += '  </ss:Cell>\n';        
        }
        headerRow += '</ss:Row>\n';    
        return '<?xml version="1.0"?>\n' +
               '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
               '<ss:Worksheet ss:Name="Sheet1">\n' +
               '<ss:Table>\n\n' + headerRow;
    };
    
    var emitXmlFooter = function() {
        return '\n</ss:Table>\n' +
               '</ss:Worksheet>\n' +
               '</ss:Workbook>\n';
    };
    
    var jsonToSsXml = function (jsonObject,columns) {
        var row;
        var col;
        var xml;
        var data = typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;
        
        xml = emitXmlHeader(columns);
    
        for (row = 0; row < data.length; row++) {
            xml += '<ss:Row>\n';
          
            for (col in data[row]) {
                if( col === "$$hashKey" ) {
                    continue;
                }
                xml += '  <ss:Cell>\n';
                xml += '    <ss:Data ss:Type="' + columns[col]  + '">';
                xml += data[row][col] + '</ss:Data>\n';
                xml += '  </ss:Cell>\n';
            }
    
            xml += '</ss:Row>\n';
        }
        
        xml += emitXmlFooter();
        return xml;  
    };
    /************************************ End ************************************/
        
    this.export = function (contentJSON, filename, contentType, id, columns) {
        var content = contentJSON;
        if(columns){
            content = jsonToSsXml(contentJSON,columns);
        }
        if (!contentType) contentType = 'application/octet-stream';
        var a = document.getElementById(id);
        var blob = new Blob([content], {
            'type': contentType
        });
        a.href = window.URL.createObjectURL(blob);
        a.download = filename;

        // window.location.href = a.href;
    };

});