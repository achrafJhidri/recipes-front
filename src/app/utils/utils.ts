import { Form, FormGroup, NgForm } from "@angular/forms";

export const isValid = (form : FormGroup,elementName : string) : boolean => {    
    const element = form.get(elementName); 
    return element.touched && !element.valid  ;
} 