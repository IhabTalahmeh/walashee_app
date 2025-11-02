import { LabelValueType } from "src/types/types/Types";

export const SEARCH_BY_LIST: LabelValueType[] = [
    {
        label: "Patient Info",
        value: 'INFO',
        key: 'INFO'
    },
    {
        label: "Institution",
        value: 'INSTITUTION',
        key: 'INSTITUTION'
    },
    {
        label: "Procedure",
        value: 'PROCEDURE',
        key: 'PROCEDURE'
    },
    {
        label: "Keyword",
        value: 'KEYWORD',
        key: 'KEYWORD'
    },
];

export const PERMISSIONS_LIST: LabelValueType[] = [
    {
        label: 'Editor',
        value: 'EDITOR',
        key: 'EDITOR',
    },
    {
        label: 'Viewer',
        value: 'VIEWER',
        key: 'VIEWER',
    },
]