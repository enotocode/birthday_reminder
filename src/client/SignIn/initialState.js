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
                name: "_username",
                label: "Username",
                value: "admin",
                errorMessage: "",
                required: "required",
                type: "text",
                dataSubmiting: false
            },            
            {
                name: "_password",
                label: "Password",
                value: "foo",
                errorMessage: "",
                required: "required",
                type: "password",
                dataSubmiting: false
            }
        ]
        }
};

export default initialState;