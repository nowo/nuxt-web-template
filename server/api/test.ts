import path from 'node:path'
import fs from 'node:fs'
import type { IncomingMessage } from 'node:http'
import formidable from 'formidable'

const STATIC_PATH = path.join(process.cwd(), '/public/files')
export default defineEventHandler(async (e) => {
    const info = await parseFile(e.node.req, 'videos') as FileInfo
    return info
})

interface FileInfo {
    file?: any
    hash?: string
    filename?: string
    chunkHash?: string
}

function parseFile(req: IncomingMessage, uploadDir: string): Promise<{ [key: string]: any }> {
    return new Promise((resolve, reject) => {
        const form = formidable({
            uploadDir: path.join(STATIC_PATH, uploadDir),
        })
        form.once('error', (err) => {
            console.log(err)
        })
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err)
                return
            }
            const keys = Object.keys(fields) as string[]
            const info: { [key: string]: any } = {}
            if (keys.length > 0) {
                const len = fields[keys[0]] as []
                for (let i = 0; i < len.length; i++) {
                    for (let k = 0; k < keys.length; k++) {
                        const d = fields[keys[k]]
                        info[keys[k]] = d ? d[0] : ''
                    }
                    const file = files.file
                    if (file) {
                        const f = file[i]
                        const d = path.parse(file[i].filepath)
                        fs.renameSync(f.filepath, path.join(d.dir, info.chunkHash))
                        info.file = {
                            filepath: f.filepath,
                            size: file[i].size,
                        }
                    };
                }
            }
            resolve(info)
        })
    })
}
