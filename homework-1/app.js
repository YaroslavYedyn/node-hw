const fs = require('fs')
const path = require('path')
const timePath = path.join(__dirname, 'time')
fs.readdir(timePath, (err, dir) => {
        if (err) {
            console.log(err);
            return;
        }
        for (const filePath of dir) {
            const fullPathDir = path.join(timePath, filePath)
            fs.readdir(fullPathDir, (err1, files) => {
                if (err1) {
                    console.log(err1);
                }
                for (const file of files) {
                    const fullPathFile = path.join(fullPathDir, file)
                    fs.readFile(fullPathFile,(err2, data) => {
                        if (err2){
                            console.log(err2);
                        }
                        const jsonObject=JSON.parse(data.toString())
                        const pathSixTime=path.join(timePath,'1800')
                        const pathTwentyTime=path.join(timePath,'2000')
                        if(jsonObject.gender==='male'){
                            const oldPath=path.join(pathSixTime,file)
                            const newPath=path.join(pathTwentyTime,file)
                            fs.rename(oldPath,newPath,err3 => {
                                if (err3){
                                    console.log(err3);
                                }
                            })

                        } else {
                            const newPath=path.join(pathSixTime,file)
                            const oldPath=path.join(pathTwentyTime,file)
                            fs.rename(oldPath,newPath,err3 => {
                                if (err3){
                                    console.log(err3);
                                }
                            })
                        }
                    })
                }
            })
        }
    }
)


