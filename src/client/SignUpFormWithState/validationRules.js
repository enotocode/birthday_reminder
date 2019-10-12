/* 
 * Validation rules
 */
export const validationRules = {
    userName: {
        rules: [   
            {
                func: value => value != "",
                msg: "Please write your user name"
            },
            {
                func: value => value.length <= 90,
                msg: "Length of user name must be equal 90 characters or less"
            }            
        ],
        serverValidation: true        
    },
    email: {
        rules: [
            {
                func: value => value != "",
                msg: "Please write your email"
            },
            {
                func: value => value.length <= 63,
                msg: "Length of email must be equal 63 characters or less"
            }
        ],
        serverValidation: true 
    },
    password: {
        rules: [    
            {
                func: value => value != "",
                msg: "Please set your password"
            },
            {
                func: value => value.length > 5,
                msg: "Password must be longer or equal 5 characters"
            }
        ],
        serverValidation: false
    }
}
