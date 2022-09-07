import React,{useEffect,useRef} from 'react'
import { NavigationContainer } from '@react-navigation/native'

import InitializingNavigator from './InitializingNavigator'
import AuthenticatedNavigator from './AuthenticatedNavigator'
import OnboardingNavigator from './OnboardingNavigator'
import OnboardedNavigator from './OnboardedNavigator'

import { selectAuthState } from 'src/redux/authSlice'
import {useSelector } from 'react-redux'
import GLOBALS from 'src/Globals'
import { useDispatch} from 'react-redux'
import {setLogout} from 'src/redux/authSlice'


const Screens = () => {
  const authState = useSelector(selectAuthState)
  console.log("auth state was",authState);
  const dispatch = useDispatch()

  // reset user login
  useEffect(()=>{
    dispatch(setLogout(null))
  },[])

  return (
    <NavigationContainer>
      {authState === GLOBALS.AUTH_STATE.INITIALIZING && (
        <InitializingNavigator />
      )}
      {authState === GLOBALS.AUTH_STATE.ONBOARDING && <OnboardingNavigator />}
      
      {authState === GLOBALS.AUTH_STATE.ONBOARDED && <OnboardedNavigator />}

      {authState === GLOBALS.AUTH_STATE.AUTHENTICATED && (
        <AuthenticatedNavigator />
      )}  
    </NavigationContainer>
  )
}

export default Screens
