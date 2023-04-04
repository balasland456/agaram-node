import multer from 'multer';
import { NextFunction, Request, Response } from "express";
import fs from 'fs';
import { ResponseDTO, statusCode } from "../types";

const getMainDir = function () {
    let newpath = __dirname;
    if (process.env.NODE_ENV == "production") {
        newpath = newpath.replace("\src", "").replace("/controller", "") + "client/files/";
    }
    else {
        newpath = newpath.replace("\src", "").replace("\controller", "") + "client\\files\\";
    }
    return newpath;
}
export default class FileController {

    constructor() {
        this.upload = this.upload.bind(this);
        this.load = this.load.bind(this);
    }

    async upload(
        req: Request<FileSystem>,
        res: Response<ResponseDTO<string>>,
        next: NextFunction
    ): Promise<Response<ResponseDTO<string>> | void> {
        try {
            if (req.files) {
                let newpath = getMainDir();
                const allowedExt = ["png", "jpg", "jpeg", "pdf"]
                let errors = [];
                let messages = [];
                let validUplodateFiles = [];
                for (const fileKey of Object.entries(req.files)) {
                    let file: any = fileKey[1];
                    const filename = file.name || "";
                    const ext = filename.split(".").pop().toLowerCase();
                    if (allowedExt.indexOf(ext) != -1 && file.size <= 1000000) {
                        let folderpath = fileKey[0].replace(/\/[^\/]+$/, '').replace("/", "\\");
                        folderpath = folderpath.replace(filename, "");
                        if (!fs.existsSync(`${newpath}${folderpath}`)) {
                            fs.mkdirSync(`${newpath}${folderpath}`, { recursive: true });
                        }
                        try {
                            if (fs.existsSync(`${newpath}${folderpath}\\${filename}`)) {
                                fs.unlinkSync(`${newpath}${folderpath}\\${filename}`);
                            }
                            await file.mv(`${newpath}${folderpath}\\${filename}`);
                            validUplodateFiles.push(filename);
                        }
                        catch (err) {
                            messages.push(filename + " upload is failed");
                            errors.push({
                                filename: filename,
                                error: err
                            });
                        }
                    }
                    else {
                        messages.push(filename + " is not valid file");
                        errors.push({
                            filename: filename,
                            error: filename + " is not valid file"
                        });
                    }
                }
                if (errors.length == 0) {
                    const responseDTO = new ResponseDTO<string>(
                        statusCode.CREATED,
                        true,
                        "File uploaded successfully",
                        null
                    );
                    return res.status(statusCode.CREATED).json(responseDTO);
                }
                else {
                    const responseDTO = new ResponseDTO<string>(
                        statusCode.CREATED,
                        true,
                        messages.join(", "),
                        null
                    );
                    return res.status(statusCode.CREATED).json(responseDTO);
                }
            }
            else {
                const responseDTO = new ResponseDTO<string>(
                    statusCode.CREATED,
                    true,
                    "No files found",
                    null
                );
                return res.status(statusCode.CREATED).json(responseDTO);
            }
        } catch (error) {
            return next(error);
        }
    }
    async load(
        req: Request,
        res: Response<any>,
        next: NextFunction
    ): Promise<Response<any> | void> {
        try {
            const { filename } = req.query;
            if (!fs.existsSync(getMainDir() + filename)) {
                return res.sendFile(getMainDir() + "404.png");
            }
            return res.sendFile(getMainDir() + filename);
        } catch (error) {
            return next(error);
        }
    }
}
