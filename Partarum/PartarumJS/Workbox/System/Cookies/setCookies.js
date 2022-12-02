onmessage = (e)=> {

    let cookieBefore = e.data;

    let intID = setInterval(isCookie, 100);

    function isCookie() {

        if (document.cookie === cookieBefore) {

            console.log(document.cookie);
        } else {

            console.log(document.cookie);

            postMessage(document.cookie);
            clearInterval(intID);
        }
    }
}