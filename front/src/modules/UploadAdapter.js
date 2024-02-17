import axios from "axios";
const noConextPathUrl = import.meta.env.VITE_APP_NO_CONTEXT_PATH_URL;

export default class UploadAdapter {
    constructor(loader, url) {
        this.url = url;
        this.loader = loader;
        this.loader.file.then((pic) => {
            // console.log(pic)
            this.file = pic

        });

        // console.log(loader, url);
        // this.upload();
        // console.log(1);
    }

    // Starts the upload process.
    upload() {
        return this.loader.file.then((uploadedFile) => {
            return new Promise((resolve, reject) => {
                const params = {
                    upload: uploadedFile,
                };

                const formData = new FormData();
                formData.append("file", uploadedFile);

                axios({
                    headers: { "Content-Type": "multipart/form-data", },
                    url: "/api/public/upload", // 파일 업로드 요청 URL
                    method: "POST",
                    data: formData,
                }).then((res) => {
                    // console.log(res);
                    resolve( {
                        default: res.data.path
                    } );
                }).catch((error) => {
                    console.log(error);
                    reject(error.response.data.message);
                });
            });
        });
    }
}