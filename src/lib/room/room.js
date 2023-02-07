import client from "../client";

export const fetchRooms = (accessToken) =>
    client.get(
        `/rooms`,
        {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        }
    );
export const fetchRoom = ({accessToken, room_id, query}) =>
    client.get(
        `/rooms/${room_id}`,
        {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
            params: {
                ...query,
            },
        }
    );

export const fetchRules = (accessToken) =>
    client.get(
        `/rules`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

export const createRoom = ({accessToken, request}) => {

    console.log('createRoom' + request);
    const {title, max_user_num, start_date, week,current_week, entry_fee, rule_id, account} = request;
    console.log(title, max_user_num, start_date);
    return client.post(
        `/rooms`,
        {
            title,
            max_user_num,
            start_date,
            "target_date": "2023-02-16T04:10:36.000Z",
            week,
            current_week,
            entry_fee,
            rule_id,
            account
        },
        {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        }
    );
};

export const joinRoom = ({accessToken, room_code}) =>
    client.post(
        `/rooms/join`,
        {
            room_code
        },
        {
            headers: {
                authorization: `Bearer ${accessToken}`,
            },
        }
    );
