import React from "react";
import {
    required,
    List,
    Datagrid,
    DisabledInput,
    Edit,
    Create,
    SimpleForm,
    DateField,
    Filter,
    TextField,
    TextInput,
    LongTextInput,
    DateInput
} from "react-admin";
import { AccountCircle } from "@material-ui/icons";
export const UserIcon = AccountCircle;

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

export const UserList = props => (
    <List {...props} filters={<UserFilter/>}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <TextField source="email" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <DateField source="created_at" />
            <TextField source="roles" />
        </Datagrid>
    </List>
);

const UserTitle = ({ record }) => {
    return <span>User {record ? `"${record.email}"` : ""}</span>;
};

export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="username" />
            <TextInput source="email" validate={required()} />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
        </SimpleForm>
    </Edit>
);

export const UserCreate = props => (
    <Create title="Create a User" {...props}>
        <SimpleForm>
            <TextInput source="username" validate={required()} />
            <TextInput source="email" />
            <TextInput source="first_name" />
            <TextInput source="last_name" />
        </SimpleForm>
    </Create>
);
