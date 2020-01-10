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

export const RiffIcon = MusicNote;


const riffRowStyle = (record, index) => ({
    backgroundColor: record.render_valid === true ? 'white' : 'orange',
});

const TagsField = ({ record }) =>
  record.tags.map(item => <Chip key={item.id} label={item.name}/>);

TagsField.defaultProps = { addLabel: true };

const SVGField = ({ record }) =>
    <img src={record.image}/>;

SVGField.defaultProps = { addLabel: true };


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
            <TagsField/>
            <DateField source="created_at" />
            <SVGField/>
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

const ShowSide = ({ record }) => (
    <div style={{ width: 350, margin: "1em" }}>
        <Typography variant="title">Tags</Typography>
        {record && (
            <MaterialList>
                {record.tags.map(tag => (
                    <ListItem>
                        {tag.name}
                        <EditButton basePath="/riffs-to-tags" record={tag} />
                    </ListItem>
                ))}
            </MaterialList>
        )}
    </div>
);

export const RiffShow = props => (
    <Show title={<RiffTitle />} aside={<ShowSide />} actions={<RiffShowActions />} {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <BooleanField source="render_valid" />
            <TextField source="image_info" />
            <DateField source="created_date" />
        </SimpleShowLayout>
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
