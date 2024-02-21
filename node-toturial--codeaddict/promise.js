const fs = require("fs");

const getData = (path = "") => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, "utf8", (err, res) => {
            if(!err)
                resolve(res);
            else
                reject(err)
        });
    });
}

/** promise */
// getData("./data/file.txt")
//     .then(data => console.log(data))
//     .catch( err => console.log(err) );

/** async/await */
const data = async() => {
    try {
        const result = await getData("./data/file.txt");
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

data();