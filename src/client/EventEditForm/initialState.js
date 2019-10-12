const initialState = {
    status: {
        recieveResponse: false,
        isSubmiting: false,
        isDisabled: false,
        submitFailed: false
    },
    fieldset: {
        statusBar: "",    
        inputs: [
            {
                name: "title",
                label: "Title",
                value: "",
                errorMessage: "",
                required: "required",
                type: "text",
                dataSubmiting: false
            },            
            {
                name: "event_type_id",
                label: "Type",
                value: "",
                errorMessage: "",
                required: "",
                type: "combobox",
                dataSubmiting: false
            },
            {
                name: "date",
                label: "Date",
                value: "",
                errorMessage: "",
                required: "",
                type: "text",
                dataSubmiting: false
            }

        ]
        }
};

export default initialState;