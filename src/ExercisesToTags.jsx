import React from "react";
import {parse} from "query-string";

import {required, Create, DisabledInput, Edit, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import {Link} from "@material-ui/icons";

export const ExercisesToTagsIcon = Link;

const ExercisesToTagsTitle = ({ record }) => {
    return <span>ExercisesToTags {record ? `"${record.id}"` : ""}</span>;
};

const redirect = (basePath, id, data) => `/exercises/${data.riff_exercise_id ? data.riff_exercise_id: data.exercise_id}/show`;


export const ExercisesToTagsEdit = props => (
    <Edit title={<ExercisesToTagsTitle />} {...props}>
        <SimpleForm redirect={redirect}>
            <DisabledInput source="id" />
            <ReferenceInput source="tag_id" reference="tags" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);


export const ExercisesToTagsCreate = props => {
    const { exercise_id } = parse(props.location.search);

    return (
    <Create title="Create a ExercisesToTags" {...props}>
        <SimpleForm redirect={redirect} defaultValue={{ exercise_id }}>
            <ReferenceInput source="exercise_id" reference="exercises" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="tag_id" reference="tags" perPage={100} validate={required()}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
    )
};
