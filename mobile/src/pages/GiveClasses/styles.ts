import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8257E5',
    justifyContent: 'center',
    padding: 40
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#FFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 32,
    lineHeight: 37,
    maxWidth: 180
  },

  description: {
    color: '#FFF',
    marginTop: 24,
    fontSize: 16,
    lineHeight: 26,
    fontFamily: 'Poppins_400Regular',
    maxWidth: 240
  },

  okButton: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 40,
    backgroundColor: '#04d361',
    height: 58,
    justifyContent: 'center',
    borderRadius: 8,
  },

  okButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Archivo_700Bold'
  }
})

export default styles;