import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({

    globalMargin: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 10,
        position: 'relative',
        textAlign: 'center',
        marginTop: '50%'
    },
    boton: {
        width: 100,
        height: 100,
        color:'white',
        borderRadius: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fondo: {
        flex: 1,
        backgroundColor: ''
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    menuContainer: {
        marginHorizontal: 20,
        marginVertical: 30
    },
    menuBoton: {
        marginVertical: 10
    },
    menuTexto: {
        fontSize: 20
    },
    title2: {
        fontSize: 30,
        marginBottom: 5,
        position: 'relative',
        textAlign: 'center',
        marginTop: '30%',
        fontWeight: 'bold'
    },
    title3: {
        fontSize: 25,
        marginBottom: 5,
        position: 'relative',
        textAlign: 'center',
        marginTop: '10%',
    },
    boton2: {
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#c1121f',
        padding: 10,
        borderRadius: 30
    },
    respuestas:{
        height:60,
        fontSize: 25,
        marginBottom: 5,
        position: 'relative',
        textAlign: "right",
        marginTop: '10%',

    },
    preguntas:{
        height:60,
        fontSize: 25,
        marginBottom: 5,
        position: 'relative',
        textAlign: "left",
        marginTop: '10%',

    },
    features:{
        height:60,
        fontSize: 25,
        marginBottom: 5,
        position: 'relative',
        textAlign: "left",
        marginTop: '10%',
    },
    FondoCuadrado:{
        backgroundColor: '#c1121f',
        width: 400,
        height: 100,
        borderRadius: 20,

alignItems: 'flex-start',
padding: 10,
    },
    Texto:{
        fontSize: 15,
        fontStyle: 'italic',
        color: 'white',
    },
    containerCompleto: {
        justifyContent: 'center', 
        backgroundColor: '#D9D9D9', 
        width: 340,
        height: 400,
        borderRadius: 10,
      },
      titleX: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subtitle: {
        fontSize: 18,
        fontStyle: 'italic',
      },
      containerMensajes: {
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Cambia 'baseline' por 'flex-start
        padding: 10,
    },

    containerRespuestas: {
        justifyContent: 'center', 
        backgroundColor: '#D9D9D9', 
        width: 300,
        height: 50,
        borderRadius: 10,
      },

    container: {
        justifyContent: 'center', 
        backgroundColor: '#D9D9D9', 
        width: 300,
        height: 50,
        borderRadius: 10,
      },
      scroll: {

      },
      containerMensajes2: {
        justifyContent: 'space-between',
        alignItems: 'flex-end', // Cambia 'baseline' por 'flex-start
        padding: 10,
        backgroundColor: '#c1121f'
        

    },
    containerMensajes3: {
        justifyContent: 'center',
        alignItems: 'center', // Cambia 'baseline' por 'flex-start
        padding: 10,
        backgroundColor: '#ffffff',
        marginLeft: 100

    },
    IconContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    Icon:{
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    Fab:{
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#c1121f',
    },
    globalMargin2: {
        marginHorizontal: 20,
        marginTop:'50%'
    },
    Icon2: {
        width: 220,
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
    },
    boton3: {
        alignItems: 'center',
        marginTop: -10,
        backgroundColor: '#c1121f',
        padding: 10,
        borderRadius: 30,
        marginHorizontal: 20,
            marginVertical: 30,
        marginLeft: 100,
        marginRight: 100,
    },
    container4: 
    { flex: 1, 
    backgroundColor: "#FEFAE0",
     marginTop: 50 },

    messageContainer: 
    { padding: 10,
         marginVertical: 5 },

    messageText: 
    { fontSize: 18 },

    userMessage:{
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold',
        flexDirection: 'row',
    },

    userMessageContainer: { 
        backgroundColor: "#c1121f",
        borderRadius: 10,
        marginLeft: 100,
        marginRight: 10,
        flexDirection: 'row',
    }, // color de fondo para los mensajes del usuario
    aiMessageContainer: { 
        backgroundColor: "#f1faee",
        borderRadius: 10,
        marginRight: 50,
        marginLeft:10,
    
    }, // color de fondo para los mensajes del asistente
    inputContainer:
     { flexDirection: "row", 
     alignItems: "center",
      padding: 10,
      backgroundColor: "#c1121f",},
    input: {
      flex: 1,
      padding: 10,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      height: 50,
    },
    micIcon: {
      padding: 10,
      backgroundColor: "#FFFFFF",
      borderRadius: 25,
      height: 50,
      width: 50,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 5,
    },
    aiImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
    contenidoMedicinas:{
        marginHorizontal: 20,
        marginVertical: 30,
        marginTop: -30,
        padding: 10,
    },
    tituloMedicinas:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    boton4: {
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: '#c1121f',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 10,
            marginVertical: 10,
        marginLeft: 10,
        marginRight:10,
        
    }
})