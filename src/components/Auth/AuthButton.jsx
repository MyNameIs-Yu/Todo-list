const AuthButton = (props) => {
  const {
    className = '',
    type = 'button',
    children,
    onClick
  } = props

  return (
    <button 
      className = {`${className}`}
      type = {type}
      onClick = {onClick}
    >
      {children}
    </button>
  )
}

export default AuthButton