import { LibraryMusic } from "@material-ui/icons";
import React from "react";
import {
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    DateField,
    DeleteButton,
    DisabledInput,
    Edit,
    EditButton,
    FileField,
    FileInput,
    Filter,
    List,
    LongTextInput,
    NumberField,
    NumberInput,
    SimpleForm,
    TextField,
    TextInput,
    required
} from "react-admin";

import RenderToggleApproveButton from "./components/RenderToggleApproveButton";

export const BackingTrackIcon = LibraryMusic;

const BackingTrackFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const BackingTrackList = props => (
    <List {...props} perPage="25" filters={<BackingTrackFilter />}>
        <Datagrid rowClick="show">
            <TextField source="name" />
            <TextField source="chord_info" />
            <TextField source="intro_number_of_bars" label="Intro" />
            <TextField source="number_of_bars" label="Loop Length" />
            <TextField source="coda_number_of_bars" label="Coda" />
            <NumberField source="tempo" />
            <TextField source="file" />
            <DateField source="modified_at" />
            <BooleanField source="approved" />
            <DateField source="approved_at" />
            <RenderToggleApproveButton source="approved" />
            <EditButton />
            <DeleteButton />
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
            <TextInput source="name" validate={required()} fullWidth autoFocus />
            <NumberInput source="tempo" validate={required()} step={5} />
            <LongTextInput source="chord_info" fullWidth />
            <NumberInput
                source="number_of_bars"
                fullWidth
                validate={required()}
                step={1}
                label="Loop Length (in bars)"
            />
            <NumberInput
                source="intro_number_of_bars"
                fullWidth
                label="Backing track intro in bars. Only touch this when the backing track has an intro before the main loop"
                validate={required()}
            />
            <NumberInput
                source="coda_number_of_bars"
                fullWidth
                label="Backing track outtro in bars. Only touch this when the backing track has some extra bars after the main loop"
                validate={required()}
            />
            <FileInput source="file" label="Backing track (mp3)" accept="audio/mp3">
                <FileField source="src" title="title" />
            </FileInput>
            <BooleanInput source="approved" />
            <TextField source="file" label="File name on disk" fullWidth />
        </SimpleForm>
    </Edit>
);

export const BackingTrackCreate = props => (
    <Create title="Create a Backing Track" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} fullWidth autoFocus />
            <NumberInput source="tempo" validate={required()} defaultValue={100} step={5} />
            <LongTextInput source="chord_info" fullWidth />
            <NumberInput
                source="number_of_bars"
                fullWidth
                validate={required()}
                step={1}
                label="Loop Length (in bars)"
            />
            <NumberInput
                source="intro_number_of_bars"
                fullWidth
                defaultValue={0}
                label="Backing track intro in bars. Only touch this when the backing track has an intro before the main loop"
                validate={required()}
            />
            <NumberInput
                source="coda_number_of_bars"
                fullWidth
                defaultValue={0}
                label="Backing track outtro in bars. Only touch this when the backing track has some extra bars after the main loop"
                validate={required()}
            />
            <FileInput source="file" label="Backing track (mp3)" accept="audio/mp3">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);
