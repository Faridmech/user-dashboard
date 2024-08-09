import {
  Box,
  Center,
  Text,
  VStack,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
} from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

interface User {
  id: number
  name: string
}

export const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error))
  }, [])

  // Use responsive width based on breakpoints
  const tableWidth = useBreakpointValue({
    base: "90%",
    md: "80%",
    lg: "1200px",
  })

  return (
    <Box>
      <VStack bg="blue.100" height={{ base: "50px", md: "60px" }}>
        <Text fontSize={{ base: "16px", md: "20px" }} padding="15px">
          USERS' DASHBOARD
        </Text>
      </VStack>
      <Center>
        <Box width={tableWidth} mt="40px" px={{ base: "4", md: "8" }}>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize={{ base: "12px", md: "15px" }}>
                    User Photo
                  </Th>
                  <Th fontWeight="bold" fontSize={{ base: "12px", md: "15px" }}>
                    Name
                  </Th>
                  <Th
                    fontWeight="bold"
                    fontSize={{ base: "12px", md: "15px" }}
                    textAlign="end">
                    User Profile Info
                  </Th>
                  <Th
                    fontWeight="bold"
                    fontSize={{ base: "12px", md: "15px" }}
                    textAlign="end">
                    User Activities Info
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td>
                      <AvatarGroup spacing="1rem">
                        <Avatar bg="teal.500" />
                      </AvatarGroup>
                    </Td>
                    <Td>{user.name}</Td>
                    <Td isNumeric>
                      <Link to={`/user/${user.id}/profile`}>
                        <IconButton
                          colorScheme="blue"
                          aria-label="Search database"
                          icon={<SearchIcon />}
                          size={{ base: "sm", md: "md" }}
                        />
                      </Link>
                    </Td>
                    <Td isNumeric>
                      <Link to={`/user/${user.id}/activities`}>
                        <IconButton
                          colorScheme="green"
                          aria-label="User activities"
                          icon={<SearchIcon />}
                          size={{ base: "sm", md: "md" }}
                        />
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </Box>
  )
}
