import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset'
import Container from '../Container/Container'
//@ts-ignore
let socket

export default function Games() {
  const [games, setGames] = useState([])

  useEffect(() => {
    socketInitializer()
    return () => {
      //@ts-ignore
      socket?.off('games')
    }
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/games')
    socket = io()
    socket.on('games', (retrievedGames) => {
      setGames(retrievedGames)
    })
    socket.emit('games', games)
  }

  return (
    <>
      <Container>
        <List style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
          {games &&
            games.map((game: any, idx) => {
              return (
                <Button variant='outlined' key={idx}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <VideogameAssetIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={game.name} secondary={`${game.players.length} players waiting`} />
                  </ListItem>
                </Button>
              )
            })}
        </List>
      </Container>
    </>
  )
}
