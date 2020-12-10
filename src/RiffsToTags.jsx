import { parse } from "query-string";
import React from "react";
import { Create, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

const RiffsToTagsTitle = ({ record }) => {
    return <span>RiffsToTags {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/riffs/${data.riff_id}/show/riffs-to-tags`;

export const RiffsToTagsEdit = props => (
    <Edit title={<RiffsToTagsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <TextInput source="id" disabled />
            <ReferenceInput source="tag_id" reference="tags" perPage={100} validate={required()} autoFocus>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const RiffsToTagsCreate = props => {
    const { riff_id } = parse(props.location.search);

    return (
        <Create title="Create a RiffsToTags" {...props}>
            <SimpleForm redirect={redirect} defaultValue={{ riff_id }}>
                <ReferenceInput source="riff_id" reference="riffs" perPage={100} validate={required()}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <ReferenceInput source="tag_id" reference="tags" perPage={100} validate={required()} autoFocus>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
    );
};
