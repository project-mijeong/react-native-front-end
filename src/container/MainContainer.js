import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Keyboard,
    TouchableWithoutFeedback,
    StyleSheet,
} from "react-native";

import {useState, useEffect} from 'react';
import {useSelector} from "react-redux";

export default function MainContainer({navigation}) {

    const [rooms, setRooms] = useState([
        {
            room_id: 1,
            room_name: '프론트 스터디',
        },
        {
            room_id: 2,
            room_name: '즐공',
        },
        {
            room_id: 3,
            room_name: '같공',
        },
        {
            room_id: 4,
            room_name: '열공',
        },
        {
            room_id: 5,
            room_name: '화이팅',
        },
    ])

    const room_list_top = [];
    for (let i = 0; i < 4; i++) {
        if(rooms[i] !== undefined) {
            room_list_top.push(
                <View key={i} style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 1}}/>
                    <TouchableOpacity style={styles.room}>
                        <Text style={styles.button_text}>{rooms[i].room_name}</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}}/>
                </View>
            )
        }
        else {
            room_list_top.push(
                <View key={i} style={{flex: 1}}/>
            );
        }
    }

    const room_list_bottom = [];
    if (rooms.length > 4) {
        for (let i = 4; i < 8; i++) {
            if(rooms[i] !== undefined) {
                room_list_bottom.push(
                    <View key={i} style={{flex: 1, alignItems: 'center'}}>
                        <View style={{flex: 1}}/>
                        <TouchableOpacity style={styles.room}>
                            <Text style={styles.button_text}>{rooms[i].room_name}</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                    </View>
                )
            }
            else {
                room_list_bottom.push(
                    <View key={i} style={{flex: 1}}/>
                );
            }
        }
    }

    const goToJoinRoomScreen = () => {
        navigation.navigate('login')
    }

    return (
        <View style={styles.container}>

            <View style={{flex: 4}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 2}}>
                    <Image source={require('../../assets/images/logo.png')} resizeMode='contain'
                           style={styles.logo_image}/>
                </View>
                <View style={{flex: 1}}/>
            </View>

            <View style={styles.button_container}>
                <View style={{flex: 0.5}}/>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.button_text}>방 만들기</Text>
                </TouchableOpacity>
                <View style={{flex: 1}}/>
                <TouchableOpacity style={styles.button} onPress={goToJoinRoomScreen}>
                    <Text style={styles.button_text}>참여하기</Text>
                </TouchableOpacity>
                <View style={{flex: 0.5}}/>
            </View>

            <View style={{flex: 3, alignItems: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={styles.rooms_container}>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 4.5, flexDirection: 'row',}}>
                        {room_list_top}
                    </View>
                    <View style={{flex: 4.5, flexDirection: 'row',}}>
                        {room_list_bottom}
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 1}}/>
            </View>

            <View style={{flex: 2}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    logo_image: {
        flex: 1,
        alignSelf: 'center',
        width: '80%',
    },
    button_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 4,
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#DBDBDB'
    },
    button_text: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 20,
    },
    rooms_container: {
        flex: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DBDBDB',
        borderRadius: 20,
        width: '90%',
    },
    room: {
        flex: 8,
        backgroundColor: '#FFFFFF', 
        width: '90%', 
        borderRadius: 20,
        borderWidth: 5,
        borderColor: '#BFBFBF',
        justifyContent: 'center'
    }
});
