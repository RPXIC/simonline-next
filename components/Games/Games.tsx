import { useState, useEffect } from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import Container from '../Container/Container'
//@ts-ignore
let socket: any

export default function Games() {
  const [games, setGames] = useState([])

  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()
    socket.on('games', (retrievedGames: any) => {
      setGames(retrievedGames)
    })
    socket.emit('games', games)
  }

  return (
    <>
      <Container>
        <List style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', alignItems: 'center' }}>
          {games &&
            games.map((game: any, idx) => {
              return (
                <Link key={idx} href={`/joinGame/${game._id}`} style={{ textDecoration: 'none' }}>
                  <Button variant='outlined'>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <VideogameAssetIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={game.name} secondary={`${game.players.length} players waiting`} />
                    </ListItem>
                  </Button>
                </Link>
              )
            })}
        </List>
      </Container>
    </>
  )
}
