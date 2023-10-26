import Reac, { useState } from 'react'
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native'
import { useRouter } from 'expo-router';

import styles from './welcome.style'
import { icons, SIZES } from '../../../constants'

const Welcome = () => {

  const router = useRouter();
  const [input, setInput] = useState("");

  return (
    <View>
      <View style={styles.container}>
        <Text style={ styles.userName }>Hello, Julian</Text>
        <Text style={ styles.welcomeMessage }>Find your perfect job</Text>

        <View style={ styles.searchContainer }>
          <View style={ styles.searchWrapper}>
            <TextInput
            style={ styles.searchInput}
            value={input}
            onChange={(e) => {setInput(e.target.valueOf)}}
            placeholder='What are you looking for?'
            />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Welcome