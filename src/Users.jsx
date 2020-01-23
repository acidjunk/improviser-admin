import { AccountCircle } from "@material-ui/icons";
import React from "react";
import {
    Create,
    Datagrid,
    DateField,
    DateInput,
    DisabledInput,
    Edit,
    Filter,
    List,
    LongTextInput,
    Pagination,
    SimpleForm,
    TextField,
    TextInput,
    required
} from "react-admin";
export const UserIcon = AccountCircle;

const UserFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const UserPagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

export const UserList = props => (
    <List {...props} filters={<UserFilter />} pagination={<UserPagination />} perPage={50}>
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
