import { Label, LibraryMusic } from "@material-ui/icons";
import React from "react";
import {
  BooleanInput,
  BooleanField,
  DateField,
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
  NumberInput,
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
      <TextField source="chord_info" />
      <NumberField source="tempo" />
      <TextField source="file" />
      <EditButton basePath="/backing-tracks" />
      <DateField source="modified_at"/>
      <DateField source="approved_at"/>
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
      <NumberInput source="tempo" validate={required()} step={5} />
      <TextInput source="chord_info" />
      <FileInput source="file" label="Backing track (mp3)" accept="audio/mp3">
        <FileField source="src" title="title" />
      </FileInput>
      <BooleanInput source="approved" />
    </SimpleForm>
  </Edit>
);

export const BackingTrackCreate = props => (
  <Create title="Create a Backing Track" {...props}>
    <SimpleForm>
      <TextInput source="name" validate={required()} />
      <NumberInput source="tempo" validate={required()} defaultValue={100} step={5} />
      <TextInput source="chord_info" />
      <FileInput source="file" label="Backing track (mp3)" accept="audio/mp3">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);
