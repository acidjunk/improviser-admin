import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

import API_URL from "./Constants";
import addUploadFeature from "./dataProvider/decorator";

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    // Setup cookie auth
    options.credentials = "include";
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(`${API_URL}/v1`, httpClient);
export const uploadDataProvider = addUploadFeature(dataProvider);
