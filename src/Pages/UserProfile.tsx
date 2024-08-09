import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  VStack,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"

// Define the structure of the user profile data
interface UserProfileProps {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export const UserProfile: React.FC = () => {
  // Extract user ID from URL parameters
  const { id } = useParams<{ id: string }>()

  // State to hold user profile data
  const [userProfile, setUserProfile] = useState<UserProfileProps | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch user data based on the user ID
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        )
        if (!response.ok) {
          throw new Error("User not found")
        }
        const data: UserProfileProps = await response.json()
        setUserProfile(data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchUserProfile()
    }
  }, [id])

  if (loading) return <Spinner size="xl" />
  if (error)
    return (
      <Alert status="error">
        <AlertIcon /> Error: {error}
      </Alert>
    )
  if (!userProfile) return <Text>User not found</Text>

  return (
    <Box p={5}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl">
          {userProfile.name}
        </Heading>
        <Text fontSize="lg" fontWeight="bold">
          Username: {userProfile.username}
        </Text>
        <Text fontSize="lg">Email: {userProfile.email}</Text>
        <Divider />
        <Heading as="h3" size="md">
          Address
        </Heading>
        <List spacing={2}>
          <ListItem>Street: {userProfile.address.street}</ListItem>
          <ListItem>Suite: {userProfile.address.suite}</ListItem>
          <ListItem>City: {userProfile.address.city}</ListItem>
          <ListItem>Zipcode: {userProfile.address.zipcode}</ListItem>
        </List>
        <Divider />
        <Heading as="h3" size="md">
          Contact
        </Heading>
        <List spacing={2}>
          <ListItem>Phone: {userProfile.phone}</ListItem>
          <ListItem>
            Website:{" "}
            <a
              href={`https://${userProfile.website}`}
              target="_blank"
              rel="noopener noreferrer">
              {userProfile.website}
            </a>
          </ListItem>
        </List>
        <Divider />
        <Heading as="h3" size="md">
          Company
        </Heading>
        <List spacing={2}>
          <ListItem>Name: {userProfile.company.name}</ListItem>
          <ListItem>Catchphrase: {userProfile.company.catchPhrase}</ListItem>
          <ListItem>BS: {userProfile.company.bs}</ListItem>
        </List>
      </VStack>
    </Box>
  )
}
