import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../bd/FireBase';

export const ListaUsuariosScreen = () => {
    const [users, setUsers] = useState([]);
    const db = FIREBASE_DB;

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => doc.data());
            setUsers(usersList);
        };

        fetchUsers();
    }, []);

    return (
        <View>
            {users.map((user, index) => (
                <View key={index}>
                    <Text>Nombre de usuario: {user.name}</Text>
                    <Text>Correo electrónico: {user.email}</Text>
                    <Text>Fecha de nacimiento: {user.birthdate}</Text>
                    <Text>Identificación: {user.identification}</Text>
                </View>
            ))}
        </View>
    );
};
