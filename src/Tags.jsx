import React from "react";
import {
    required,
    List,
    Datagrid,
    DisabledInput,
    Edit,
    Create,
    SimpleForm,
    Filter,
    TextField,
    EditButton,
    TextInput
} from "react-admin";
import { Label } from "@material-ui/icons";
export const TagIcon = Label;

const TagFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const TagList = props => (
    <List {...props} perPage="25" filters={<TagFilter />}>
        <Datagrid>
            <TextField source="name" validate={required()} />
            <EditButton basePath="/tags" />
        </Datagrid>
    </List>
);

const TagTitle = ({ record }) => {
    return <span>Tag {record ? `"${record.name}"` : ""}</span>;
};

export const TagEdit = props => (
    <Edit title={<TagTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Edit>
);

export const TagCreate = props => (
    <Create title="Create a Effect" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} />
        </SimpleForm>
    </Create>
);
