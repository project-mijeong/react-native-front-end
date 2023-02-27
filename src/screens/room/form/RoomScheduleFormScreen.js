import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {onChangeRoomRequest} from "../../../module/room";
import Toast from "react-native-root-toast";
import {StyleSheet, Text, View} from "react-native";
import Logo from "../../../components/common/Logo";
import FormattedDate from "../../../components/common/FormattedDate";
import {AntDesign} from "@expo/vector-icons";
import InputGroup from "../../../components/room/form/InputGroup";
import SelectGroup from "../../../components/room/form/SelectGroup";
import ContinueButton from "../../../components/room/form/ContinueButton";
import Calendar from "../../../components/room/form/Calendar";

function RoomScheduleFormScreen({navigation}) {
    const SCREEN_TITLE = "스터디방 일정을 설정하세요";
    const INPUT_TITLE = "스터디방 시작일";
    const SELECT_TITLE = "스터디 기간(주)";
    const TODAY = new Date();

    const dispatch = useDispatch();

    const {request} = useSelector(({room}) => ({
        request: room.roomRequest,
    }));

    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());


    const getSelectItems = useCallback(() => {

        const MAX_USER_NUM = 32;
        let items = [];
        for (let i = 1; i <= MAX_USER_NUM; i++) {
            items.push({label: i + '주', value: i, key: i - 1});
        }
        return items;
    }, []);

    const onChangeWeek = (targetName, value) => {
        const next = {
            ...request,
            [targetName]: value,
        };
        dispatch(onChangeRoomRequest(next));
    };

    const onChangeDateIOS = (e, selectedDate) => {
        const {type} = e;
        if (type === 'set') {
            setDate(selectedDate);
        }
    };

    const onConfirm = () => {
        const next = {
            ...request,
            "start_date": date,
        };
        dispatch(onChangeRoomRequest(next));
        setShow(false);
    }

    const onCancel = () => {
        setShow(false);
    }

    const onChangeDateAndroid = (e, selectedDate) => {
        const {type} = e;

        if (type === 'set') {
            const next = {
                ...request,
                "start_date": selectedDate,
            };
            dispatch(onChangeRoomRequest(next));
            setDate(selectedDate);
            setShow(false);
        } else if (type === 'dismiss') {
            setShow(false);
        }
    }

    const onPressNext = () => {
        const {start_date, week} = request;

        const cmpStartDate = start_date.toLocaleDateString();
        const cmpTODAY = TODAY.toLocaleDateString();

        if (start_date == null || week == null) {
            Toast.show('모든 정보를 입력하세요', {duration: Toast.durations.LONG});
        } else if (cmpStartDate < cmpTODAY) {
            Toast.show('올바른 날짜를 선택하세요', {duration: Toast.durations.LONG});
        } else {
            navigation.navigate('room-create-entry-fee-form');
        }

    }

    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.content_container}>
                <Text style={styles.screen_title}>{SCREEN_TITLE}</Text>
                <View style={styles.calendar_group_container}>
                    <Text style={styles.text}>{INPUT_TITLE}</Text>
                    <View style={styles.calendar_container}>
                        <Text style={styles.date_viewer}>
                            {request.start_date && <FormattedDate targetDate={request.start_date}/>}
                        </Text>
                        <AntDesign name="calendar" size={36} color="black" onPress={() => setShow(true)}/>
                    </View>
                </View>
                <InputGroup title={SELECT_TITLE}>
                    <SelectGroup selected={request.week} targetName={"week"} items={getSelectItems()}
                                 onChange={onChangeWeek}/>
                </InputGroup>
                <ContinueButton onPress={onPressNext}/>
            </View>
            {show && <Calendar show={show}
                               onChangeDateAndroid={onChangeDateAndroid}
                               onChangeDateIOS={onChangeDateIOS}
                               onConfirm={onConfirm}
                               onCancel={onCancel}
                               date={date}
            />}
        </View>
    );
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: 'white',
        },

        content_container: {
            flex: 2,
            alignItems: "center",
        },
        text: {
            fontSize: 18,
        },

        calendar_group_container: {
            marginTop: 30,
            justifyContent: 'space-between',
            alignItems: "center",
            flexDirection: 'row',
            width: '90%',
        },

        calendar_container: {
            flexDirection: "row",
            width: "60%",
            justifyContent: 'space-between',
            alignItems: "center",

        },

        date_viewer: {
            textAlign: "center",
            lineHeight: 60,
            width: "80%",
            height: 60,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: 'black',
        },

        screen_title: {
            alignItems: 'flex-start',
            fontSize: 22,
            width: '90%',
            fontWeight: 'bold',
        },
    }
);
export default RoomScheduleFormScreen;
