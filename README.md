# mfpAdapterTester
This will be a web app that will act like Postman which aim to test secured IBM Mobilefirst adapters with custom authentication specially that save and use data within active session as Postman basic authentication debugging detailed in MFP docs won't fit.

The Web app will have the following features:<br />
1- Enable you to make custom login by adding your security scope name and login parameters.<br />
2- Enable you after login to add your requests and this will be saved then you can run/edit/delete.<br />
3- enable you to enter the parameters of both requests or login as JSON or seperated parameters.
4- Enable you to export your requests collection (all your requests within JSON file).<br />
5- Enable you to import an exported requests collection (future by import file and now can be done by inserting it in localstorage by requests key).<br />
6- Enable you to run all requests then export to xls file.<br />

Setup:<br />
1- Clone the repo.<br />
2- Add your encryption module (login password encryption) if any within mfpAdapterTester\src\main\webapp\lib\encryption.js and make the interface the compute function already exist.<br />
3- Go to the project path inside Terminal/cmd then run mvn clean install.<br />
4- Add <application name="mfpAdapterTester" location="{{Path}}\mfpAdapterTester\target\mfpAdapterTester.war" type="war"></application> to server.xml within Mobilefirst server local installation or deploy the war if remote install.<br />
5- Add web app that uses your security scope with the name and id of mfpAdapterTester.<br />
6- Access it with http://localhost:9080/mfpAdapterTester if locally or {{url}}/mfpAdapterTester if remote :).<br />
