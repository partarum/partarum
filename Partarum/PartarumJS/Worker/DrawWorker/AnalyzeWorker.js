
function getBaseVertices(node){

    return new Promise((resolve) => {

        let {width, height, top, left} =  node;

        resolve({
            width: width,
            height: height,
            left: left,
            right: left + width,
            top: top,
            bottom: top + height,
            leftTop: {
                x: left,
                y: top
            },
            rightTop: {
                x: left + width,
                y: top
            },
            rightBottom: {
                x: left + width,
                y: top + height
            },
            leftBottom: {
                x: left,
                y: top + height
            }
        });
    });
}

function getAllVertices(board, node){

    return new Promise((resolve) => {

        const OVER = 1;

        const UNDER = 2;

        let place = 0;

        if(board.top > node.top){
            // node liegt über ctx
            place = OVER;
        } else {
            // node liegt im oder unter ctx
            if(node.top > board.bottom){
                //node liegt unter ctx
                place = UNDER;
            }
        }

        let res = {
            ...node,
            ctx: board,
            ctxWidth: board.width,
            ctxHeight: board.height,
            type: place,
            nodeCTX: {
                leftTop: {
                    x: node.left,
                    y: (place === 1) ? 0 : board.height
                },
                rightTop: {
                    x: (node.left - board.left) + node.width,
                    y: (place === 1) ? 0 : board.height
                },
                rightBottom: {
                    x: (node.left - board.left) + node.width,
                    y: (place === 2) ? board.height : 0
                },
                leftBottom: {
                    x: (node.left),
                    y: (place === 2) ? board.height : 0
                },
                centerTop: {
                    x: (node.left - board.left) + (node.width / 2),
                    y: (place === 1) ? 0 : board.height
                },
                centerBottom: {
                    x: (node.left - board.left) + (node.width / 2),
                    y: (place === 2) ? board.height : 0
                }
            }
        };

        resolve(res);
    });
}

onmessage = (message) => {

    let board  = message.data[0];

    let nodes = message.data[1];

    let id = message.data[2];


    /*
        ! Hier jetzt mit Hilfe von getAllVertex die Eckpunkte sammeln
     */

    let res = {
        board: getBaseVertices(board),
        nodes: new WeakMap()
    }

    let response = {
        id: id,
        nodes: []
    }

    res.board.then((boardData) => {

        response.board = boardData;

        let counter = 0;

        for(let node of nodes){

            getBaseVertices(node).then((baseData) => {

                res.nodes.set(node, getAllVertices(boardData, node));

                res.nodes.get(node).then((data) => {

                    response.nodes.push(data);

                    if(counter === nodes.length - 1){

                        console.dir(id);

                        postMessage(response);

                    } else {
                        counter++;
                    }
                })
            });
        }
    });
}