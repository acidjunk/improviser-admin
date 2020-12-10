import CardActions from "@material-ui/core/CardActions";
import Chip from "@material-ui/core/Chip";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Add, SportsEsports } from "@material-ui/icons";
import React from "react";
import {
    BooleanField,
    BooleanInput,
    Button,
    Create,
    Datagrid,
    DateField,
    DeleteButton,
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
    ShowButton,
    SimpleForm,
    Tab,
    TabbedShowLayout,
    TextField,
    TextInput,
    required
} from "react-admin";

export const ExerciseIcon = SportsEsports;

const exerciseRowStyle = record => ({
    backgroundColor: record.is_public === true ? "#E8F5E9" : "white"
});

const TagsField = ({ record }) => record.tags.map(item => <Chip key={item.id} label={item.name} />);
TagsField.defaultProps = { addLabel: true };

const ExerciseFilter = props => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <BooleanInput source="is_public" defaultValue={true} />
    </Filter>
);

const ExercisePagination = props => <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />;

const AllRiffs = ({ record }) => {
    return record.exercise_items.map(riff => (
        <img
            alt={`riff-${riff.riff_id}`}
            src={`https://www.improviser.education/static/rendered/120/riff_${riff.riff_id}_${riff.pitch}${
                riff.octave ? `_${riff.octave}` : ""
            }.png`}
        />
    ));
};
AllRiffs.defaultProps = { addLabel: false };

const AllChords = ({ record }) => {
    const rows = record.exercise_items.map(riff => (
        <TableRow>
            <TableCell component="th" scope="row">
                {riff.order_number + 1}
            </TableCell>
            <TableCell>
                <Link to={`/riffs/${riff.riff_id}/`}>{riff.riff_id}</Link>
            </TableCell>
            <TableCell>{riff.number_of_bars}</TableCell>
            <TableCell>{riff.chord_info}</TableCell>
            <TableCell>{riff.chord_info_alternate}</TableCell>
            <TableCell>{riff.chord_info_backing_track}</TableCell>
        </TableRow>
    ));
    return (
        <Table style={{ maxWidth: "700px" }}>
            <TableHead>
                <TableRow>
                    <TableCell numeric>Number</TableCell>
                    <TableCell numeric>Riff</TableCell>
                    <TableCell>Number of bars</TableCell>
                    <TableCell>Chord Info</TableCell>
                    <TableCell>Alternate Chord Info</TableCell>
                    <TableCell>Backing-track Chord Info</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
        </Table>
    );
};
AllChords.defaultProps = { addLabel: false };

export const ExerciseList = props => (
    <List
        {...props}
        sort={{ field: "modified_at", order: "DESC" }}
        filters={<ExerciseFilter />}
        pagination={<ExercisePagination />}
        perPage={50}
    >
        <Datagrid rowClick="show" rowStyle={exerciseRowStyle}>
            <TextField source="name" />
            <TagsField />
            <BooleanField source="is_public" />
            <DateField source="created_at" />
            <DateField source="modified_at" />
            <ShowButton />
            <EditButton />
            <DeleteButton />
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
            <Tab label="Chords" path="chords">
                <h2>Chord list</h2>
                <AllChords />
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
            <TextInput source="id" disabled />
            <TextInput source="name" validate={required()} fullWidth autoFocus />
            <BooleanField source="is_public" />
        </SimpleForm>
    </Edit>
);

export const ExerciseCreate = props => (
    <Create title="Create a Exercise" {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required()} fullWidth autoFocus />
            <TextInput source="description" fullWidth />
        </SimpleForm>
    </Create>
);
