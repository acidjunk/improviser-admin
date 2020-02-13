import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import MaterialList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { Add, SportsEsports } from "@material-ui/icons";
import React from "react";
import {
    BooleanField,
    Button,
    ChipField,
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

export const ExerciseIcon = SportsEsports;

const exerciseRowStyle = (record, index) => ({
    backgroundColor: record.is_public === true ? "palegreen" : "white"
});

const TagsField = ({ record }) => record.tags.map(item => <Chip key={item.id} label={item.name} />);
TagsField.defaultProps = { addLabel: true };

// const SVGField = ({ record }) =>
//     <img src={record.image}/>;
//
// SVGField.defaultProps = { addLabel: true };

const ExerciseFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const ExercisePagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const AllRiffs = ({ record }) => {
    // const suffix = record.riff.octave ? "" : "";
    return record.exercise_items.map(riff => (
        <img
            src={`https://www.improviser.education/static/rendered/120/riff_${riff.riff_id}_${riff.pitch}${
                riff.octave ? `_${riff.octave}` : ""
            }.png`}
        />
    ));
};
AllRiffs.defaultProps = { addLabel: false };

export const ExerciseList = props => (
    <List
        {...props}
        sort={{ field: "name", order: "ASC" }}
        filters={<ExerciseFilter />}
        pagination={<ExercisePagination />}
        perPage={50}
    >
        <Datagrid rowClick="show" rowStyle={exerciseRowStyle}>
            <TextField source="name" />
            {/*<TextField source="image_info" sortable={false} />*/}
            <TagsField />
            <DateField source="created_at" />
            <DateField source="modified_at" />

            {/*<SVGField/>*/}
        </Datagrid>
    </List>
);

const ExerciseTitle = ({ record }) => {
    return <span>Exercise: {record ? `"${record.name}"` : ""}</span>;
};

const AddTagButton = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: "/exercises-to-tags/create",
            search: `?exercise_id=${record ? record.id : ""}`
        }}
        label="Add a tag"
    >
        <Add />
    </Button>
);

const ExerciseShowActions = ({ basePath, data }) => (
    <CardActions>
        <ListButton basePath={basePath} />
        <EditButton basePath="/exercises" record={data} />
        <AddTagButton record={data} />
    </CardActions>
);

export const ExerciseShow = props => (
    <Show title={<ExerciseTitle />} actions={<ExerciseShowActions />} {...props}>
        <TabbedShowLayout>
            <Tab label="summary">
                <h2>Exercise Summary</h2>
                <TextField source="id" />
                <BooleanField source="render_valid" />
                <TextField source="name" />
                <TagsField label="Tags" />
                <DateField source="created_at" />
                <DateField source="modified_at" />
            </Tab>
            <Tab label="Tags" path="exercises-to-tags">
                <h2>Tags</h2>
                <ReferenceManyField reference="exercises-to-tags" target="riff_exercise_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="tag_id" reference="tags">
                            <TextField source="name" />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Riffs" path="riffs">
                <h2>Riffs used in this exercise</h2>
                <AllRiffs />
            </Tab>
        </TabbedShowLayout>
    </Show>
);

export const ExerciseEdit = props => (
    <Edit title={<ExerciseTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);

export const ExerciseCreate = props => (
    <Create title="Create a Exercise" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);
