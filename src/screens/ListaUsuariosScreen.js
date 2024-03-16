import React, { useEffect, useState } from 'react';
import { Button, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import db from '../../bd/FireBase'; // Importa db en lugar de firebase

export const ListaUsuariosScreen = () => {
    const [users, setUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = db.collection('users').onSnapshot((querySnapshot) => { // Usa db en lugar de firebase.firestore()
            const users = [];
            querySnapshot.docs.forEach((doc) => {
                const { username, email, birthdate, identification } = doc.data();
                users.push({
                    id: doc.id,
                    username,
                    email,
                    birthdate,
                    identification,
                });
            });
            setUsers(users);
        });

        // Limpiar la suscripción al desmontar
        return () => unsubscribe();
    }, []);

    return (
        <ScrollView>
            <Button
                onPress={() => navigation.navigate('RegisterScreen')}
                title="Create User"
            />
            {users.map((user) => {
                return (
                    <ListItem
                        key={user.id}
                        bottomDivider
                        onPress={() => {
                            navigation.navigate('UserDetailScreen', {
                                userId: user.id,
                            });
                        }}
                    >
                        <ListItem.Chevron />
                        <Avatar
                            source={{
                                uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                            }}
                            rounded
                        />
                        <ListItem.Content>
                            <ListItem.Title>{user.username}</ListItem.Title>
                            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                );
            })}
        </ScrollView>
    );
};