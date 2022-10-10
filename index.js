const http = require('http');
const url = require('url');
const fs = require('fs');

// creating function to change template
const replaceTemplate = require(`${__dirname}/modules/replaceTemplate.js`);

// creating variables

const cardTemp = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const overviewTemp = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const productTemp = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/jsonfiles/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


// setting up server

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    // routing
    if (pathname === "/" || pathname === "/overview") {

        // changing data from templates
        const finalData = dataObj.map((ele) => {
            return replaceTemplate(ele, cardTemp)
        }).join("");

        res.writeHead(200, {
            "Content-type": "text/html"
        })
        res.end(overviewTemp.replace("{%PRODUCTCARDS%}", finalData));
    }
    else if (pathname === "/product") {
        res.writeHead(200, {
            "Content-type": "text/html"
        });
        const product = dataObj[query.id];
        const output = replaceTemplate(product, productTemp);
        res.end(output);
    }
    else {
        res.writeHead(404, "page not found", {
            "Content-type": "text/html"
        })
        res.end("<h1>Page Not Found :(</h1>")
    }


})

//listening to the port

server.listen(8000, "127.0.0.1", () => {
    console.log("server has been started");
})