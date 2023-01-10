import React from 'react'
import { RootState, useAppDispatch } from '../redux/store';
import { useForm } from 'react-hook-form';
import { fetchLogin, fetchReg } from '../redux/slices/authSlice';
import { useSelector } from 'react-redux';

type FormValues = {
  email: string;
  password: string;
  name: string;
  lastName: string;
  address: string
};


const Auth: React.FC = () =>  {

    const isAuth = useSelector((state: RootState) => state.authSlice.data)


    const [authPage, SetAuthPage] = React.useState('Login')

    const auth = ['Login', 'Sign Up']

    const dispatch = useAppDispatch()

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid } 
    } = useForm<FormValues>({
        defaultValues: {
            email: 'shopadmin@gmail.com',
            password: '123456'
        },
        mode: 'onChange'
    });
    
    const onSubmitLogin = async (values: FormValues) => {
        const data = await dispatch(fetchLogin(values))
    
        if (!data.payload) {
          return alert(`Failed to login`)
        }
        if ('token' in data.payload) {
          window.localStorage.setItem('token', data.payload.token)
        }
      }

    const onSubmitReg = async (values: FormValues) => {
    const data = await dispatch(fetchReg(values))

    if (!data.payload) {
        return alert(`Failed to reg`)
    }
    if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token)
    }
    }

    return (
        <div className='auth'>
            <div className="form-box">
                <div className="form--titles">
                    {auth.map(item => (
                        <p 
                        key={item}
                        onClick={() => SetAuthPage(item)}
                        className={authPage === item ? 'active' : ''}
                        >{item}</p>
                    ))}
                </div>
                {authPage === 'Login' ? 
                <form onSubmit={handleSubmit(onSubmitLogin)}>
                    <div className='input'>
                        <label className='item-block--title' htmlFor="email">
                            Email:
                        </label>
                        <input 
                        type="email" 
                        placeholder='Email...'
                        {...register('email', {required: 'Input email'})}
                        />
                        {errors?.email && <p>{errors.email?.message}</p>}
                    </div>
                    <div className='input'>
                        <label className='item-block--title' htmlFor="email">
                            Password:
                        </label>
                        <input 
                        type="password" 
                        placeholder='Password...'
                        {...register('password', {required: 'Input password'})}
                        />
                        {errors?.password && <p>{errors.password?.message}</p>}
                    </div>
                    <button disabled={!isValid} className='button button--black'>
                        Login
                    </button>
                </form>
                :
                <form onSubmit={handleSubmit(onSubmitReg)}>
                    <div className='input'>
                        <label className='item-block--title' htmlFor="email">
                            Email:
                        </label>
                        <input 
                        type="email" 
                        placeholder='Email...'
                        {...register('email', {required: 'Input email'})}
                        />
                        {errors?.email && <p>{errors.email?.message}</p>}
                    </div>
                    <div className='input'>
                        <label className='item-block--title' htmlFor="email">
                            Password:
                        </label>
                        <input 
                        type="password" 
                        placeholder='Password...'
                        {...register('password', {required: 'Input password'})}
                        />
                        {errors?.password && <p>{errors.password?.message}</p>}
                    </div>
                    <div className='input'>
                        <label className='item-block--title' htmlFor="name">
                            Name:
                        </label>
                        <input 
                        type="text" 
                        placeholder='Name...'
                        {...register('name', {required: 'Input name'})}
                        />
                        {errors?.name && <p>{errors.name?.message}</p>}
                    </div>
                    <div className='input'>
                        <label className='item-block--title' htmlFor="lastName">
                            Last name:
                        </label>
                        <input 
                        type="text" 
                        placeholder='Last name...'
                        {...register('lastName', {required: 'Input password'})}
                        />
                        {errors?.lastName && <p>{errors.lastName?.message}</p>}
                    </div>
                    <div className='input'>
                        <label className='item-block--title' htmlFor="address">
                            Address:
                        </label>
                        <input 
                        type="text" 
                        placeholder='Address...'
                        {...register('address', {required: 'Input password'})}
                        />
                        {errors?.address && <p>{errors.address?.message}</p>}
                    </div>
                    <button disabled={!isValid} className='button button--black'>
                        Sign Up
                    </button>
                </form>}
            </div>
        </div>
    )
}

export default Auth;