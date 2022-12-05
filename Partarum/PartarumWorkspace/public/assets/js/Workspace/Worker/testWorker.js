
self.socketCache = {};

self.onmessage = (m) => {
    
    console.dir(m.data);
    
    let name = self.name;
    
    if(!self.socketCache[name]){
        
        self.socketCache[name] = new WebSocket("wss://dev.partarum.net:10443");

        console.dir(self.socketCache);

        self.postMessage("test");
    } else {
        
        console.log("Socket ist schon offen");
    }
    //self.close();
}