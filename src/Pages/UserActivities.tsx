import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  Box,
  Heading,
  Text,
  List,
  ListItem,
  Divider,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
} from "@chakra-ui/react"

// Define the structure of an activity
interface UserActivityProps {
  userId: number
  id: number
  title: string
  body: string
}

export const UserActivities: React.FC = () => {
  // Extract user ID from URL parameters
  const { id } = useParams<{ id: string }>()

  // State to hold activities data
  const [activities, setActivities] = useState<UserActivityProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch user activities based on the user ID
    const fetchUserActivities = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        )
        if (!response.ok) {
          throw new Error("Activities not found")
        }
        const data: UserActivityProps[] = await response.json()
        setActivities(data)
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchUserActivities()
    }
  }, [id])

  if (loading) return <Spinner size="xl" />
  if (error)
    return (
      <Alert status="error">
        <AlertIcon /> Error: {error}
      </Alert>
    )
  if (activities.length === 0) return <Text>No activities found</Text>

  return (
    <Box p={5}>
      <VStack spacing={4} align="start">
        <Heading as="h1" size="xl">
          User Activities
        </Heading>
        <List spacing={4}>
          {activities.map((activity) => (
            <Box key={activity.id} p={4} borderWidth={1} borderRadius="md">
              <Heading as="h3" size="md">
                {activity.title}
              </Heading>
              <Text mt={2}>{activity.body}</Text>
              <Divider mt={4} />
            </Box>
          ))}
        </List>
      </VStack>
    </Box>
  )
}
