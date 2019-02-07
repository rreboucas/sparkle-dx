import { logger } from 'c/lwcLogger';

export function tableHelper(
    columnNames,
    raw,
    log = true,
) {
    //validate input
    if (!columnNames || !raw || columnNames.length === 0) {
        return {};
    }
    const source = 'dataTableHelper';
    const output = {
        data: [],
        columns: [],
    };
    //logger(log, source, 'editableFieldNames', editableFieldNames);
    logger(log, source, 'columnNames', columnNames);

    const _columnNames = Array.from(columnNames);

    let columnsCreated = true;

    // iterate through the records
    for (const recId in raw.records) {
        if ({}.hasOwnProperty.call(raw.records, recId)) {
            const dataToOutput = {};

            dataToOutput.Id = recId;
            dataToOutput.nav = `/${recId}`;

            const record = raw.records[recId];
            // iterate through the record's fields
            for (const columnName of _columnNames) {
                // window.console.log(`doing column ${columnName}`);

                // add to our data
                // Check if it is a parent relationship field
                if (columnName.includes('__r')){
                    logger(log, source, 'Column Name is a child Relationship: ', columnName);
                    dataToOutput[columnName] = record.fields[columnName].displayValue;
                }
                else {
                    dataToOutput[columnName] =
                    record.fields[columnName].displayValue ||
                    record.fields[columnName].value ||
                    null;
                }
                
                // do the columns if they haven't been done yet

                const fieldMetadata =
                    raw.objectInfos[record.apiName].fields[columnName];

                if (!columnsCreated) {
                    if (fieldMetadata.nameField) {
                        output.columns.push({
                            label: fieldMetadata.label,
                            fieldName: 'nav',
                            type: 'url',
                            typeAttributes: {
                                label: { fieldName: columnName },
                                target: '_blank',
                            },
                            sortable: true,
                        });
                    } else {
                        output.columns.push({
                            label: fieldMetadata.label,
                            fieldName: columnName,
                            sortable: true,
                        });
                    }
                } else {
                    // window.console.log('skipping columns b/c already done');
                }
            }
            columnsCreated = true;
            output.data.push(dataToOutput);
        }
    }

    // only do this once, with whatever was the final row
    logger(log, source, 'dataTableHelper output', output);
    return output;
}