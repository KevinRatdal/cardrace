import Hearts from './Hearts'
import Clubs from './Clubs'
import Diamonds from './Diamonds'
import Spades from './Spades'

// eslint-disable-next-line react/prop-types
const SuitIcon = ({suit, ...props}) => {
  switch (suit) {
    case 'hearts':
        return <Hearts {...props}/>
    case 'clubs':
        return <Clubs {...props} />
    case 'diamonds':
        return <Diamonds {...props} />
    case 'spades':
        return <Spades {...props} />
    default:
        return undefined
  }
}

export default SuitIcon