const ErrorMessage = ({ message }) => {
    console.log("ErrorMessage component received:", message);
  
      if (message === null) {
        return null
      }
    
      return (
        <div className='error'>
          {message}
        </div>
      )
    }
  
    export {ErrorMessage}