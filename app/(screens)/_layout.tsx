import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="ChatPage"  options={{ headerShown: false }}/>
        <Stack.Screen name="LawDetail/LawDetailScreen"  options={{title: "Details"}}/>
        <Stack.Screen name="SectionText" options={{ headerShown: false }} />
    </Stack>
  )
}

export default _layout