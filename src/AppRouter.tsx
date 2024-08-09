// src/App.tsx
import React from "react"
import { Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { UserProfile } from "./Pages/UserProfile"
import { UserActivities } from "./Pages/UserActivities"

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id/profile" element={<UserProfile />} />
      <Route path="/user/:id/activities" element={<UserActivities />} />
    </Routes>
  )
}

export default AppRouter
