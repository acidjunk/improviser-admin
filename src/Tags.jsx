import { Label } from "@material-ui/icons";
import React from "react";
import {
    BooleanField,
    Create,
    Datagrid,
    DateField,
    DeleteButton,
    DisabledInput,
    Edit,
    EditButton,
    Filter,
    List,
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
export const TagIcon = Label;

const TagFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);

const TagTitle = ({ record }) => {
    return <span>Tag: {record ? `"${record.name}"` : ""}</span>;
};

export const TagList = props => (
    <List {...props} perPage="25" filters={<TagFilter />}>
        <Datagrid rowClick="show">
            <TextField source="name" validate={required()} />
            <ShowButton />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const TagShow = props => (
    <Show title={<TagTitle />} {...props}>
        <TabbedShowLayout>
            <Tab label="Riffs" path="riffs-to-tags">
                <h2>Riffs with this tag</h2>
                <ReferenceManyField reference="riffs-to-tags" target="tag_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="riff_id" reference="riffs">
                            <TextField source="name" />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
            <Tab label="Exercises" path="exercises-to-tags">
                <h2>Exercises with this tag</h2>
                <ReferenceManyField reference="exercises-to-tags" target="tag_id" addLabel={false}>
                    <Datagrid>
                        <ReferenceField source="riff_exercise_id" reference="exercises">
                            <TextField source="name" />
                        </ReferenceField>
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>
    </Show>
);

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
