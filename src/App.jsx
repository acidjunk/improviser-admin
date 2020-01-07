import React, {Component} from "react";

import {Admin, fetchUtils, Resource} from "react-admin";

import simpleRestProvider from "ra-data-simple-rest";
import AuthProvider from "./AuthProvider";
import englishMessages from "./i18n/en";
import {TagCreate, TagEdit, TagIcon, TagList} from "./Tags";
import {RiffCreate, RiffEdit, RiffIcon, RiffList, RiffShow} from "./Riffs";
import {UserCreate, UserEdit, UserIcon, UserList} from "./Users";
import apiUrl from "./Constants";
import addUploadFeature from "./dataProvider/decorator";


const i18nProvider = locale => {
    if (locale === "nl") {
        return import("./i18n/nl").then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
};

const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: "application/json" });
    }
    // Setup cookie auth
    options.credentials = "include";
    return fetchUtils.fetchJson(url, options);
};

const dataProvider = simpleRestProvider(`${apiUrl}/v1`, httpClient);
const uploadDataProvider = addUploadFeature(dataProvider);

class App extends Component {
    render() {
        return (
            <Admin
                dataProvider={uploadDataProvider}
                title="iMproviser Admin"
                authProvider={AuthProvider}
                // dashboard={Dashboard}
                i18nProvider={i18nProvider}
            >
                <Resource
                    name="riffs"
                    list={RiffList}
                    edit={RiffEdit}
                    create={RiffCreate}
                    show={RiffShow}
                    icon={RiffIcon}
                />
                {/*<Resource*/}
                {/*    name="exercises"*/}
                {/*    list={RiffList}*/}
                {/*    edit={RiffEdit}*/}
                {/*    create={RiffCreate}*/}
                {/*    icon={RiffIcon}*/}
                {/*/>               */}
                <Resource
                    name="tags"
                    list={TagList}
                    edit={TagEdit}
                    create={TagCreate}
                    icon={TagIcon}
                />
                <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} />
            </Admin>
        );
    }
}
export default App;
