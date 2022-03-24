import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import { Add, MusicNote } from "@material-ui/icons";
import React from "react";
import {
    AutocompleteInput,
    BooleanField,
    BooleanInput,
    Button,
    Create,
    Datagrid,
    DateField,
    DeleteButton,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    Link,
    List,
    ListButton,
    NumberField,
    Pagination,
    ReferenceField,
    ReferenceManyField,
    Show,
    ShowButton,
    SimpleForm,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput,
    required
} from "react-admin";

import RenderInvalidButton from "./components/RenderInvalidButton";
import { getRiffSVGName } from "./utils/utils";

export const RiffIcon = MusicNote;

const numberOfBarsChoices = [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }];

const redirect = (basePath, id, data) => {
    return `/riffs/${data.id}/show/riffs-to-tags`;
};
const riffRowStyle = (record, index) => ({
    backgroundColor: record.render_valid === true ? "white" : "#FFEBEE"
});

const TagsField = ({ record }) => {
    if (!record.tags) {
        return null;
    }
    return record.tags.map(item => <Chip key={item.id} label={item.name} />);
};
TagsField.defaultProps = { addLabel: true };

const SVGField = ({ record }) => {
    if (!record.image) {
        return null;
    }
    return record.render_valid ? (
        <img alt={`riff-${record.name}`} height="75%" src={getRiffSVGName(record.image, "c", 0)} />
    ) : (
        <div>N/A</div>
    );
};
SVGField.defaultProps = { addLabel: true };

const AllSVGFields = ({ record, octave }) => {
    const notes = ["c", "d", "e", "f"];
    if (!record.render_valid) {
        return <div>N/A</div>;
    }
    return notes.map(note => (
        <React.Fragment>
            <img alt={`riff-${record.name}`} src={getRiffSVGName(record.image, note, octave)} />
            <span style={{ marginLeft: "-5px" }}>{note}</span>
        </React.Fragment>
    ));
};
AllSVGFields.defaultProps = { addLabel: true };

const RiffFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <BooleanInput source="render_valid" />
    </Filter>
);

const RiffPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const RiffList = props => (
    <List
        {...props}
        sort={{ field: "created_at", order: "DESC" }}
        filters={<RiffFilter />}
        pagination={<RiffPagination />}
        perPage={25}
    >
        <Datagrid rowClick="show" rowStyle={riffRowStyle}>
            <TextField source="name" />
            <NumberField source="number_of_bars" />
            <TextField source="chord" />
            <BooleanField source="render_valid" />
            <BooleanField source="scale_trainer_enabled" />
            <BooleanField source="is_public" />
            {/*<TextField source="image_info" sortable={false} />*/}
            <TagsField />
            <DateField source="created_at" />
            <SVGField />
            <ShowButton />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

const RiffTitle = ({ record }) => {
    return <span>Riff: {record ? `"${record.name}"` : ""}</span>;
};

const AddTagButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: "/riffs-to-tags/create",
            search: `?riff_id=${record ? record.id : ""}`
        }}
        label="Add a tag"
    >
        <Add />
    </Button>
);

const RiffShowActions = ({ basePath, data }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <EditButton basePath="/riffs" record={data} />
        <AddTagButton record={data} />
        <RenderInvalidButton record={data} />
    </CardActions>
);

export const RiffShow = props => (
    <Show title={<RiffTitle />} actions={<RiffShowActions />} {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <h2>Riff Summary</h2>
                <TextField source="id" />
                <BooleanField source="render_valid" />
                <TextField source="name" />
                <TextField source="notes" />
                <TextField source="number_of_bars" />
                <TextField source="chord" />
                <TextField source="chord_info" />
                <BooleanField source="multi_chord" />
                <TagsField label="Tags" />
                <SVGField label="Image" />
                <DateField source="created_at" />
                <TextField source="created_by" />
                <BooleanField source="is_public" />
                <DateField source="render_date" />
                <TextField source="image_info" />
            </Tab>
            <Tab label="Tags" path="riffs-to-tags">
                <h2>Tags</h2>
                <ReferenceManyField reference="riffs-to-tags" target="riff_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="tag_id" reference="tags">
                            <TextField source="name" />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Images">
                <h2>Images</h2>
                <AllSVGFields label="Octave -1" octave={-1} style={{ float: "left" }} />
                <AllSVGFields label="Octave 0" octave={0} style={{ float: "left" }} />
                <AllSVGFields label="Octave 1" octave={1} style={{ float: "left" }} />
                <AllSVGFields label="Octave 2" octave={1} style={{ float: "left" }} />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const RiffEdit = props => (
    <Edit title={<RiffTitle />} {...props}>
        <SimpleForm redirect="list">
            <DisabledInput source="id" />
            <BooleanInput source="render_valid" />
            <TextInput source="name" validate={required()} fullWidth autoFocus />
            <TextInput source="notes" validate={required()} fullWidth />
            <AutocompleteInput
                source="number_of_bars"
                choices={numberOfBarsChoices}
                optionText="name"
                optionValue="name"
            />
            <TextInput source="chord" />
            <TextInput source="chord_info" />
            <BooleanInput source="multi_chord" />
            <BooleanInput source="scale_trainer_enabled" />
            <BooleanInput source="is_public" />
        </SimpleForm>
    </Edit>
);

export const RiffCreate = props => (
    <Create title="Create a Riff" {...props}>
        <SimpleForm redirect={redirect}>
            <TextInput source="name" validate={required()} fullWidth autoFocus />
            <TextInput source="notes" validate={required()} fullWidth />
            <AutocompleteInput
                source="number_of_bars"
                choices={numberOfBarsChoices}
                optionText="name"
                optionValue="name"
            />
            <TextInput source="chord" />
            <TextInput source="chord_info" />
            <BooleanInput source="multi_chord" />
            <BooleanInput source="scale_trainer_enabled" />
            <BooleanInput source="is_public" defaultValue={true} />
        </SimpleForm>
    </Create>
);
