import simpleRestProvider from "ra-data-simple-rest";
import React, { Component } from "react";
import { Admin, Resource, fetchUtils } from "react-admin";

import AuthProvider from "./AuthProvider";
import { BackingTrackCreate, BackingTrackEdit, BackingTrackIcon, BackingTrackList } from "./BackingTracks";
import Dashboard from "./dashboard/Dashboard";
import { uploadDataProvider } from "./dataProvider";
import { ExerciseCreate, ExerciseEdit, ExerciseIcon, ExerciseList, ExerciseShow } from "./Exercises";
import { ExercisesToTagsCreate, ExercisesToTagsEdit } from "./ExercisesToTags";
import englishMessages from "./i18n/en";
import { RiffCreate, RiffEdit, RiffIcon, RiffList, RiffShow } from "./Riffs";
import { RiffsToTagsCreate, RiffsToTagsEdit } from "./RiffsToTags";
import { TagCreate, TagEdit, TagIcon, TagList, TagShow } from "./Tags";
import { adminTheme } from "./Theme";
import { UserCreate, UserEdit, UserIcon, UserList } from "./Users";

const i18nProvider = locale => {
    if (locale === "nl") {
        return import("./i18n/nl").then(messages => messages.default);
    }

    // Always fallback on english
    return englishMessages;
};

class App extends Component {
    render() {
        return (
            <Admin
                dataProvider={uploadDataProvider}
                title="iMproviser Admin"
                authProvider={AuthProvider}
                dashboard={Dashboard}
                i18nProvider={i18nProvider}
                theme={adminTheme}
            >
                <Resource
                    name="riffs"
                    list={RiffList}
                    edit={RiffEdit}
                    create={RiffCreate}
                    show={RiffShow}
                    icon={RiffIcon}
                />
                <Resource
                    name="exercises"
                    list={ExerciseList}
                    edit={ExerciseEdit}
                    create={ExerciseCreate}
                    show={ExerciseShow}
                    icon={ExerciseIcon}
                />
                <Resource
                    name="backing-tracks"
                    list={BackingTrackList}
                    edit={BackingTrackEdit}
                    create={BackingTrackCreate}
                    // show={BackingTrackShow}
                    icon={BackingTrackIcon}
                />
                <Resource name="tags" list={TagList} edit={TagEdit} show={TagShow} create={TagCreate} icon={TagIcon} />
                <Resource name="riffs-to-tags" edit={RiffsToTagsEdit} create={RiffsToTagsCreate} icon={UserIcon} />
                <Resource
                    name="exercises-to-tags"
                    edit={ExercisesToTagsEdit}
                    create={ExercisesToTagsCreate}
                    icon={UserIcon}
                />

                <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} icon={UserIcon} />
            </Admin>
        );
    }
}
export default App;
