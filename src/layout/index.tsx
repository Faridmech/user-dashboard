import { Box } from "@chakra-ui/react"
import React from "react"
import { Outlet } from "react-router-dom"

export const Layout: React.FC = () => {
  return (
    <Box w="100vw" h="100vh">
      <Outlet />
    </Box>
  )
}
