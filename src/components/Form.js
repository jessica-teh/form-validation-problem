import React, {useState} from 'react';

const Form = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        colour: '',
        animal: [],
        tiger_type: ''
    })

    const [errors, setErrors] = useState({});

    const submitForm = e => {
        e.preventDefault();

        setErrors(validate(formData));

        // If there are no errors, proceed
        if (Object.keys(errors).length === 0) {
        }
    }

    const handleOnChange = e => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        // Reset error after changing value
        setErrors({
            ...errors,
            [name]: false
        })
    }

    const handleCheckboxOnChange = e => {
        const { name, value } = e.target;

        let newValue = [...formData[name], value];

        if (formData[name].includes(value)) {
            newValue = newValue.filter(item => item !== value);
        }

        setFormData({
            ...formData,
            [name]: newValue
        });

        // Reset error after changing value
        setErrors({
            ...errors,
            [name]: false
        })
    }

    const validate = (formData) => {
        const newErrors = {};

        // Validate email is a valid email
        if (!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address.'
        }

        // Password required, with 8 char minimum
        if (formData.password.length < 8) {
            newErrors.password = 'Please enter a password longer than 7 characters.';
        }

        // Colour required
        if (!formData.colour) {
            newErrors.colour = 'Please select a colour.';
        }

        // 2 animals required
        if (formData.animal.length < 2) {
            newErrors.animal = 'Please select at least 2 animals.';
        }

        // If animals includes 'tiger', tiger_type is required
        if (formData.animal.includes('tiger') && !formData.tiger_type) {
            newErrors.tiger_type = 'Please enter a type of tiger.';
        }

        return newErrors;
    }

    return <form method='post' onSubmit={submitForm}>
        <h1>Fill out this awesome form</h1>
        <fieldset>
            <h2>Your details</h2>
            <p className={errors.email ? 'error' : ''}>
                <label className='label' htmlFor='email'>
                    Email
                </label>
                <input type='text'
                       id='email'
                       name='email'
                       value={formData.email}
                       onChange={handleOnChange}
                       aria-required
                       aria-describedby='error-email'
                       aria-invalid={errors.email}
                       data-testid="email"/>
                <span id='error-email' className='error-message'>{errors.email}</span>
            </p>
            <p className={errors.password ? 'error' : ''}>
                <label className='label' htmlFor='password'>
                    Password
                </label>
                <input className='error'
                       type='password'
                       id='password'
                       name='password'
                       value={formData.password}
                       onChange={handleOnChange}
                       aria-required
                       aria-describedby='error-password'
                       aria-invalid={errors.password}
                       data-testid="password"/>
                {errors.password && <span id='error-password' className='error-message'>{errors.password}</span>}
            </p>
        </fieldset>

        <fieldset>
            <h2>Your animal</h2>
            <p className={errors.colour ? 'error' : ''}>
                <label className='label' htmlFor='colour'>
                    Colour
                </label>
                <select id='colour'
                        name='colour'
                        value={formData.colour}
                        onChange={handleOnChange}
                        aria-required
                        aria-describedby='error-colour'
                        aria-invalid={errors.colour}
                        data-testid="colour">
                    <option value=''>Choose colour</option>
                    <option value='blue'>Blue</option>
                    <option value='green'>Green</option>
                    <option value='red'>Red</option>
                    <option value='black'>Black</option>
                    <option value='brown'>Brown</option>
                </select>
                {errors.colour && <span id='error-colour' className='error-message'>{errors.colour}</span>}
            </p>
            <p className={errors.animal ? 'error' : ''}>
                <span className="label">
                    Animal
                </span>

                <input type='checkbox'
                    name='animal'
                    value='bear'
                    id='bear'
                    onChange={handleCheckboxOnChange}
                    aria-describedby='error-animal'
                    data-testid="bear-checkbox"/>
                    <label htmlFor='bear'>
                        Bear
                    </label>

                <input type='checkbox'
                       name='animal'
                       value='tiger'
                       id='tiger'
                       onChange={handleCheckboxOnChange}
                       aria-describedby='error-animal'
                       data-testid="tiger-checkbox"/>
                    <label htmlFor='tiger'>
                        Tiger
                    </label>

                <input type='checkbox'
                       name='animal'
                       value='snake'
                       id='snake'
                       onChange={handleCheckboxOnChange}
                       aria-describedby='error-animal'
                       data-testid="snake-checkbox"/>
                    <label htmlFor='snake'>
                        Snake
                    </label>

                <input type='checkbox'
                       name='animal'
                       value='donkey'
                       id='donkey'
                       onChange={handleCheckboxOnChange}
                       aria-describedby='error-animal'
                       data-testid="donkey-checkbox"/>
                    <label htmlFor='donkey'>
                        Donkey
                    </label>
                {errors.animal && <span id='error-animal' className='error-message'>{errors.animal}</span>}
            </p>
            {formData.animal.includes('tiger') && <p className={errors.tiger_type ? 'error' : ''}>
                <label className='label' htmlFor='tiger_type'>
                    Type of tiger
                </label>
                <input type='text'
                       name='tiger_type'
                       id='tiger_type'
                       value={formData.tiger_type}
                       onChange={handleOnChange}
                       aria-required
                       aria-describedby='error-tiger_type'
                       data-testid="tiger_type"/>
                {errors.tiger_type && <span id='error-tiger_type' className='error-message'>{errors.tiger_type}</span>}
            </p>}
        </fieldset>
        <fieldset>
            <p>
                <input type='submit' value='Create account' data-testid="submit-button"/>
            </p>
        </fieldset>
    </form>
}

export default Form