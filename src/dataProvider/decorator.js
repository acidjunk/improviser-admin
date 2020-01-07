const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);


    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

const addUploadFeature = requestHandler => (type, resource, params) => {

    if (type === 'UPDATE' && resource === 'backing-tracks') {

        if (params.data.image_1 && params.data.image_1.hasOwnProperty("src")) {

            // NEW CODE HERE (to upload just one file):
            const image_1 = params.data.image_1;
            if ( !image_1.rawFile instanceof File ){
                return Promise.reject('Error: Not a file...'); // Didn't test this...
            }

            return Promise.resolve( convertFileToBase64(image_1) )
                .then( (picture64) => ({
                    src: picture64,
                    title: `${image_1.title}`
                }))
                .then( transformedMyFile => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image_1: transformedMyFile
                    }
                }));
        }

        if (params.data.image_2 && params.data.image_2.hasOwnProperty("src")) {

            // NEW CODE HERE (to upload just one file):
            const image_2 = params.data.image_2;
            if ( !image_2.rawFile instanceof File ){
                return Promise.reject('Error: Not a file...'); // Didn't test this...
            }

            return Promise.resolve( convertFileToBase64(image_2) )
                .then( (picture64) => ({
                    src: picture64,
                    title: `${image_2.title}`
                }))
                .then( transformedMyFile => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image_2: transformedMyFile
                    }
                }));
        }

        if (params.data.image_3 && params.data.image_3.hasOwnProperty("src")) {

            // NEW CODE HERE (to upload just one file):
            const image_3 = params.data.image_3;
            if ( !image_3.rawFile instanceof File ){
                return Promise.reject('Error: Not a file...'); // Didn't test this...
            }

            return Promise.resolve( convertFileToBase64(image_3) )
                .then( (picture64) => ({
                    src: picture64,
                    title: `${image_3.title}`
                }))
                .then( transformedMyFile => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image_3: transformedMyFile
                    }
                }));
        }

        if (params.data.image_4 && params.data.image_4.hasOwnProperty("src")) {

            // NEW CODE HERE (to upload just one file):
            const image_4 = params.data.image_4;
            if ( !image_4.rawFile instanceof File ){
                return Promise.reject('Error: Not a file...'); // Didn't test this...
            }

            return Promise.resolve( convertFileToBase64(image_4) )
                .then( (picture64) => ({
                    src: picture64,
                    title: `${image_4.title}`
                }))
                .then( transformedMyFile => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image_4: transformedMyFile
                    }
                }));
        }

        if (params.data.image_5 && params.data.image_5.hasOwnProperty("src")) {

            // NEW CODE HERE (to upload just one file):
            const image_5 = params.data.image_5;
            if ( !image_5.rawFile instanceof File ){
                return Promise.reject('Error: Not a file...'); // Didn't test this...
            }

            return Promise.resolve( convertFileToBase64(image_5) )
                .then( (picture65) => ({
                    src: picture65,
                    title: `${image_5.title}`
                }))
                .then( transformedMyFile => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image_5: transformedMyFile
                    }
                }));
        }

        if (params.data.image_6 && params.data.image_6.hasOwnProperty("src")) {

            // NEW CODE HERE (to upload just one file):
            const image_6 = params.data.image_6;
            if ( !image_6.rawFile instanceof File ){
                return Promise.reject('Error: Not a file...'); // Didn't test this...
            }

            return Promise.resolve( convertFileToBase64(image_6) )
                .then( (picture66) => ({
                    src: picture66,
                    title: `${image_6.title}`
                }))
                .then( transformedMyFile => requestHandler(type, resource, {
                    ...params,
                    data: {
                        ...params.data,
                        image_6: transformedMyFile
                    }
                }));
        }

    }
    return requestHandler(type, resource, params);
};
export default addUploadFeature
