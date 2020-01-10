import React from "react";
import {parse} from "query-string";

import {required, Create, DisabledInput, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import {Link} from "@material-ui/icons";

export const RiffsToTagsIcon = Link;

const RiffsToTagsTitle = ({ record }) => {
    return <span>RiffsToTags {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/riffs/${data.riff_id}/show`;


export const RiffsToTagsEdit = props => (
    <Edit title={<RiffsToTagsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <ReferenceInput source="tag_id" reference="tags" perPage={100} validate={required()}>
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
            <ReferenceInput source="tag_id" reference="tags" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
    )
};
