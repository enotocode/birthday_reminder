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
                name: "email",
                label: "Email",
                value: "df@df",
                errorMessage: "",
                required: "required",
                type: "email",
                dataSubmiting: false
            },
            {
                name: "userName",
                label: "Username",
                value: "userName", //default value 
                errorMessage: "",
                required: "",
                type: "text",                
                dataSubmiting: false //for showing preloader when submiting async request
            },
            {
                name: "password",
                label: "Password",
                value: "f12",
                errorMessage: "",
                required: "required",
                type: "password",
                dataSubmiting: false
            }
        ]
        }
};

export default initialState;