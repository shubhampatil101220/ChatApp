<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>README</title>
    <style>
      h1 {
        text-align: center;
        margin-bottom: 50px;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin-bottom: 10px;
      }
      li > ul {
        margin-left: 20px;
      }
    </style>
  </head>
  <body>
    <h1>Project Overview</h1>
    <ul>
      <li>
        <h2>BackEnd:</h2>
        Create a Microsoft C# web API on Visual Studio 2022
        <ul>
          <li>Install the Microsoft.AspNet.SignalR nuget package</li>
          <li>Add the following code to the project:</li>
          <pre>
            //Write your code in Backend
          </pre>
        </ul>
      </li>
      <li>
         <h2>FrontEnd:</h2>
        Create an Angular app with the name ClientApp
        <ul>
          <li>
            Install the Microsoft SignalR package in the Angular app
            <ul>
              <li>
                <code>~npm install @microsoft/signalr</code>
              </li>
            </ul>
          </li>
          <li>
            Install the ng-angular-popup package for displaying toast messages
            <ul>
              <li>
                <code>~npm install ng-angular-popup</code>
              </li>
            </ul>
          </li>
          <li>Generate the following components:</li>
          <ul>
            <li><code>~ ng g c chat</code></li>
            <li><code>~ng g c join-room</code></li>
            <li><code>~ng g c welcome</code></li>
          </ul>
          <li>Configure the routing for the Angular app</li>
        </ul>
      </li>
    </ul>
  </body>
</html>
