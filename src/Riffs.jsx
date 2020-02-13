import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import { Add, MusicNote } from "@material-ui/icons";
import React from "react";
import {
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
    LongTextInput,
    NumberField,
    Pagination,
    ReferenceField,
    ReferenceManyField,
    Show,
    SimpleForm,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput,
    required
} from "react-admin";

import { getRiffSVGName } from "./utils/utils";

export const RiffIcon = MusicNote;

const riffRowStyle = (record, index) => ({
    backgroundColor: record.render_valid === true ? "white" : "orange"
});

const TagsField = ({ record }) => record.tags.map(item => <Chip key={item.id} label={item.name} />);
TagsField.defaultProps = { addLabel: true };

const SVGField = ({ record }) => <img src={record.image} />;
SVGField.defaultProps = { addLabel: true };

const AllSVGFields = ({ record, octave }) => {
    const notes = ["c", "d", "e", "f"];
    return notes.map(note => (
        <React.Fragment>
            <img src={getRiffSVGName(record.image, note, octave)} />
            <span style={{ marginLeft: "-5px" }}>{note}</span>
        </React.Fragment>
    ));
};
AllSVGFields.defaultProps = { addLabel: true };

const RiffFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <BooleanInput source="rendered" />
    </Filter>
);

const RiffPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const RiffList = props => (
    <List
        {...props}
        sort={{ field: "name", order: "ASC" }}
        filters={<RiffFilter />}
        pagination={<RiffPagination />}
        perPage={50}
    >
        <Datagrid rowClick="show" rowStyle={riffRowStyle}>
            <TextField source="name" />
            <NumberField source="number_of_bars" />
            <BooleanField source="render_valid" />
            {/*<TextField source="image_info" sortable={false} />*/}
            <TagsField />
            <DateField source="created_at" />
            <SVGField />
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
                <TagsField label="Tags" />
                <TextField source="notes" />
                <TextField source="number_of_bars" />
                <SVGField label="Image" />
                <DateField source="created_at" />
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
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} />
            <BooleanInput source="render_valid" />
        </SimpleForm>
    </Edit>
);

export const RiffCreate = props => (
    <Create title="Create a Riff" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="short_description_nl" />
            <LongTextInput source="description_nl" />
            <TextInput source="short_description_en" />
            <LongTextInput source="description_en" />
            <BooleanInput source="c" />
            <BooleanInput source="h" />
            <BooleanInput source="i" />
            <BooleanInput source="s" />
        </SimpleForm>
    </Create>
);
