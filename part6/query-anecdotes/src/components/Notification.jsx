const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification.message) return null

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
