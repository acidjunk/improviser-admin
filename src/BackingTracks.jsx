import { Label, LibraryMusic } from "@material-ui/icons";
import React from "react";
import {
  Create,
  Datagrid,
  DisabledInput,
  Edit,
  EditButton,
  FileField,
  FileInput,
  Filter,
  List,
  NumberField,
  SimpleForm,
  TextField,
  TextInput,
  required
} from "react-admin";
export const BackingTrackIcon = LibraryMusic;

const BackingTrackFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
);

export const BackingTrackList = props => (
  <List {...props} perPage="25" filters={<BackingTrackFilter />}>
    <Datagrid>
      <TextField source="name" />
      <NumberField source="tempo" />
      <TextField source="file" />
      <EditButton basePath="/backing-tracks" />
    </Datagrid>
  </List>
);

const BackingTrackTitle = ({ record }) => {
  return <span>BackingTrack {record ? `"${record.name}"` : ""}</span>;
};

export const BackingTrackEdit = props => (
  <Edit title={<BackingTrackTitle />} {...props}>
    <SimpleForm>
      <DisabledInput source="id" />
      <TextInput source="name" validate={required()} />
      <TextInput source="chord_info" validate={required()} />
      <FileInput source="file" label="Backing track (mp3)" accept="audio/mp3">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);

export const BackingTrackCreate = props => (
  <Create title="Create a Backing Track" {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <TextInput source="chord_info" validate={required()} />
      <FileInput source="file" label="Backing track (mp3)" accept="audio/mp3">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);
