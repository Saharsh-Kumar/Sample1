import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import firebase from 'firebase/compat/app';
import 'firebase/compat/analytics';

export default function Form() {

    // State to track if the form has been submitted
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Initialize react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    // Function to handle form submission
    const onSubmit = data => {
        console.log(data);

        // Get a reference to the Firestore database
        const db = firebase.firestore();

        // Create the collection name from the first name and first word in branch
        const firstName = data.Name.split(' ')[0];
        const firstWordInBranch = data.Branch.split(' ')[0];
        const collectionName = `${firstName}${firstWordInBranch}`;

        // Add the form data to the collection
        db.collection(collectionName).add(data).then(() => {
            console.log('Data added successfully');
        }).catch(error => {
            console.log('Error adding data:', error);
        });

        // Set formSubmitted state to true
        setFormSubmitted(true);

        // Log event to Firebase Analytics
        firebase.analytics().logEvent('form_submitted', data);
    };
    
  return (
    <section>
        <div className="register">
            <div className="col-1">
                {/* Show the form if it hasn't been submitted yet */}
                {!formSubmitted ? (
                    <>
                        <h2>E-Cell Tech Team Expansion</h2>
                        <span><p style={{color: 'red'}}>*required</p></span>

                        {/* Form element with onSubmit handler */}
                        <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                            {/* Name input field */}
                            <input style={{fontSize: '16px'}} type="text" {...register("Name", {required : true})} placeholder='Name*' />
                            {/* Show error message if Name field is empty */}
                            {errors.Name && <p style={{color: 'red'}}>This field is required</p>}

                            {/* Branch input field */}
                            <input style={{fontSize: '16px'}} type="text" {...register("Branch", {required : true})} placeholder='Branch*' />
                            {/* Show error message if Branch field is empty */}
                            {errors.Branch && <p style={{color: 'red'}}>This field is required</p>}

                            {/* Email input field */}
                            <input style={{fontSize: '16px'}} type="email" {...register("Email", {required : true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/})} placeholder='Email*' />
                            {/* Show error message if Email field is empty or invalid */}
                            {errors.Email && errors.Email.type === "required" && <p style={{color: 'red'}}>This field is required</p>}
                            {errors.Email && errors.Email.type === "pattern" && <p style={{color: 'red'}}>Invalid email address</p>}

                            {/* Phone Number input field */}
                            <input style={{fontSize: '16px'}} type="tel" {...register("Phone Number", { required : true, maxLength: 10, minLength: 10 })} placeholder='Phone Number*' />
                            {/* Show error message if Phone Number field is empty or not exactly 10 digits */}
                            {errors['Phone Number'] && errors['Phone Number'].type === "required" && <p style={{color: 'red'}}>This field is required</p>}
                            {errors['Phone Number'] && (errors['Phone Number'].type === "maxLength" || errors['Phone Number'].type === "minLength") && <p style={{color: 'red'}}>Phone number must be exactly 10 digits</p>}

                            {/* Submit button */}
                            <button className='btn'>Submit</button>
                        </form>
                    </>
                ) : (
                    // Show "Form submitted!" message if the form has been submitted
                    <>
                        <h2>Form submitted!</h2>
                    </>
                )}
            </div>
        </div>
    </section>
  )
}
