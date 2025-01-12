import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="ChatPage"  />
        <Stack.Screen name="LawDetail/LawDetailScreen"  />
    </Stack>
  )
}

export default _layout