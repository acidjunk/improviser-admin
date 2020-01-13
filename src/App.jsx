import simpleRestProvider from "ra-data-simple-rest";
import React, { Component } from "react";
import { Admin, Resource, fetchUtils } from "react-admin";

import AuthProvider from "./AuthProvider";
import {
  BackingTrackCreate,
  BackingTrackEdit,
  BackingTrackIcon,
  BackingTrackList
} from "./BackingTracks";
import apiUrl from "./Constants";
import addUploadFeature from "./dataProvider/decorator";
import {
  ExerciseCreate,
  ExerciseEdit,
  ExerciseIcon,
  ExerciseList,
  ExerciseShow
} from "./Exercises";
import englishMessages from "./i18n/en";
import { RiffCreate, RiffEdit, RiffIcon, RiffList, RiffShow } from "./Riffs";
import { RiffsToTagsCreate, RiffsToTagsEdit } from "./RiffsToTags";
import { TagCreate, TagEdit, TagIcon, TagList } from "./Tags";
import { UserCreate, UserEdit, UserIcon, UserList } from "./Users";
import { ExercisesToTagsCreate, ExercisesToTagsEdit } from "./ExercisesToTags";
import Dashboard from "./dashboard/Dashboard";

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
        dashboard={Dashboard}
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
        <Resource
          name="tags"
          list={TagList}
          edit={TagEdit}
          create={TagCreate}
          icon={TagIcon}
        />
        <Resource
          name="riffs-to-tags"
          edit={RiffsToTagsEdit}
          create={RiffsToTagsCreate}
          icon={UserIcon}
        />
        <Resource
          name="exercises-to-tags"
          edit={ExercisesToTagsEdit}
          create={ExercisesToTagsCreate}
          icon={UserIcon}
        />

        <Resource
          name="users"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          icon={UserIcon}
        />
      </Admin>
    );
  }
}
export default App;
