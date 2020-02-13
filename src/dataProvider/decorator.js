const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.rawFile);

        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

const addUploadFeature = requestHandler => (type, resource, params) => {
    if ((type === "UPDATE" || type === "CREATE") && resource === "backing-tracks") {
        if (params.data.file && params.data.file.hasOwnProperty("src")) {
            const file = params.data.file;
            if (!file.rawFile instanceof File) {
                return Promise.reject("Error: Not a file..."); // Didn't test this...
            }

            return Promise.resolve(convertFileToBase64(file))
                .then(file64 => ({
                    src: file64,
                    title: `${file.title}`
                }))
                .then(transformedMyFile =>
                    requestHandler(type, resource, {
                        ...params,
                        data: {
                            ...params.data,
                            file: transformedMyFile
                        }
                    })
                );
        }
    }
    return requestHandler(type, resource, params);
};
export default addUploadFeature;
