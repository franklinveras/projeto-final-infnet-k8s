import sharp from "sharp"
import fs    from "fs"

const THUMBS = {
	xsm:{
		width : 32,
		height: 32,
		fit   : 'inside'
	},
	sm:{
		width : 64,
		height: 64,
		fit   : 'inside'
	},
	md:{
		width : 128,
		height: 128,
		fit   : 'inside'
	},
	lg:{
        width : 512,
        height: 512,
	}
}

/**
 * Cria os thumbnails nos tamanhos pré-definidos na variável THUMB, e salva-os na mesma pasta da imagem original
 * @param {string} fullpath
 */
export async function generateThumbs (path){
	path = imagePath + '/' + path

    let asyncChain = []

    const sizes = Object.keys(THUMBS)

    sizes.forEach(size=>{
        const thumb  = THUMBS[size]
        const suffix = size

        asyncChain.push(
            generateThumb({path, suffix, ...thumb})
        ) 
    })

    try{
        await Promise.all(asyncChain)
        return true
    }catch(e){
        throw('Erro ao gravar miniaturas')
    }
    
}

function generateThumb({suffix, path, width, height, fit}){
	path = imagePath + '/' + path
    
    const inputFile = fs.createReadStream(path)

    return new Promise(function(resolve, reject){
        const s = sharp();

        if (fit){
            inputFile.pipe(
                s.resize(width, height, {fit})
            )
        }else{
            inputFile.pipe(
                s.resize(width)
            )
        }

        const outputFilePath =  path + '_' + suffix
        const outputFile     = fs.createWriteStream(outputFilePath)
        s.pipe(outputFile)

        outputFile.on('close', function(){
            resolve()
        })

        outputFile.on('error', function(){
            reject(e)
        })
    })			
}

export async function getInfo(path){
    return sharp(path).metadata()
}