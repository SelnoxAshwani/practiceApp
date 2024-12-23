import React,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function Signup() {
    const navigator = useNavigate()
    const [previewimage  ,setpreviewimage] = useState('')
    const {  register,  handleSubmit, getValues  ,formState: { errors }, watch} = useForm();
    const onSubmit = (data) => {  
        
        console.log(data)
        const formData = new FormData();
        formData.append('image', data.UserImage[0]);
        formData.append('email', data.email);
        formData.append('username', data.name);
        formData.append('mobile', data.mobile);
        formData.append('password', data.password);
        axios.post('http://localhost:6001/auth/signup' , formData).then((res)=>{
          alert('Signup Successful!');
          navigator('/login')
        })
    };   
    // const imagg = setpreviewimage(URL.createObjectURL(value.UserImage[0]))
    // console.log( watch('UserImage')[0])
    const password = watch('password');
    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
            <h2>{'Signup'}</h2>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}
                </div>
                <div>
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                        id="mobile"
                        type="tel"
                        {...register('mobile', {
                            required: 'Mobile is required',
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Mobile must be 10 digits',
                            },
                        })}
                    />
                    {errors.mobile && <p style={{ color: 'red' }}>{errors.mobile.message}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        type="email"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Invalid email format',
                            },
                        })}
                    />
                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        type="password"
                        {...register('password', {
                            required: 'Password is required',
                            minLength: {
                                value: 6,
                                message: 'Password must be at least 6 characters',
                            },
                        })}
                    />
                    {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>
                <div>
                    <label htmlFor="UserImage">{'User Image:'}</label>
                    <input
                        id="UserImage"
                        type="file"
                        {...register('UserImage', {
                            required: 'User Image is required',
                        })}
                    />
                    {errors.UserImage && <p style={{ color: 'red' }}>{errors.UserImage.message}</p>}
                    <img src={previewimage} alt='image'  width={100} height={100} />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === password || 'Passwords do not match',
                        })}
                    />
                    {errors.confirmPassword && (
                        <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>
                    )}
                </div>
                <div style={{ marginTop: '20px' }}>
                    <button type="submit">Signup</button>
                </div>
            </form>
        </div>
    );
}
export default Signup;