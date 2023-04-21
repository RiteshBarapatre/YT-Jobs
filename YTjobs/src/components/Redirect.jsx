import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import "../css/redirect.css"
import { Spinner } from '@chakra-ui/react'

const Redirect = ({hireEmail}) => {
  const [searchParams] = useSearchParams();
  const afterVerifyEmail = searchParams.get('email')
  const navigate = useNavigate()
  

  useEffect(()=>{
    if(afterVerifyEmail === hireEmail){
      
    }
    cookies.set('email', afterVerifyEmail, { path: '/' }); 
    setTimeout(() => {
      navigate('/')
    }, 4000);
  },[])

  return (
    <div className='redirect'>
      <div>Redirecting to Home page !</div>
      <p>You're authentication is complete now you can continue to our site.</p>
      <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>
    </div>
  )
}

export default Redirect