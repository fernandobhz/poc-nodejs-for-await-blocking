# POC - for/while await loops

## This POC is to show that for/while loops DO NOT block the main thread/event loop/task queue

On the webpage there are 2 commands who will perform longs loop on server side, pick one and watch the health-check  
The health-check is a simple response from the server of the current date time, that page refreshes every 1 sec  
Please note that on one billion inserts the embedded health-check you get a delay, but it's because the browser it self.  
Open the health check on another browser or tab to see that it isn't blocking   
  
## KISS - Keep it short and simple
I like to keep my POCs as simple as possible to only focous on what is being tested.  
So, please dont blame me about the missing of design pattern, organization, poor html, etc..  
The code here is the best way to teache and prof a thing :-)  
