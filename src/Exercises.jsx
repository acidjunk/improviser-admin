import React from "react";
import {
    ArrayField,
    Button,
    ChipField,
    Create,
    Datagrid,
    DateField,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    Link,
    List,
    ListButton,
    LongTextInput,
    SingleFieldList,
    BooleanField,
    BooleanInput,
    NumberField,
    required,
    Show,
    SimpleForm,
    SimpleShowLayout,
    Pagination,
    TextField,
    TextInput
} from "react-admin";
import { Add, MusicNote } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import MaterialList from "@material-ui/core/List";
import CardActions from "@material-ui/core/CardActions";

export const ExerciseIcon = MusicNote;


const exerciseRowStyle = (record, index) => ({
    backgroundColor: record.is_public === true ? 'palegreen' : 'white',
});

const TagsField = ({ record }) =>
  record.tags.map(item => <Chip key={item} label={item}/>);

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
            <TagsField/>
            <DateField source="created_at" />
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

const ShowSide = ({ record }) => (
    <div style={{ width: 350, margin: "1em" }}>
        <Typography variant="title">Effects</Typography>
        {record && (
            <MaterialList>
                {record.tags.map(tag => (
                    <ListItem>
                        {tag.name}
                        <EditButton basePath="/exercises-to-tags" record={tag} />
                    </ListItem>
                ))}
            </MaterialList>
        )}
    </div>
);

export const ExerciseShow = props => (
    <Show title={<ExerciseTitle />} aside={<ShowSide />} actions={<ExerciseShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <ArrayField source="tags" sortable={false}>
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
            <DateField source="created_at" />
        </SimpleShowLayout>
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
