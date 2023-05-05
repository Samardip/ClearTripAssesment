import React, { useCallback, useEffect, useState } from 'react'

export const useHomeSearch = () => {
    const [openMessage, setOpenMessage] = useState(false);
    const [ItemsList, setItemsList] = useState([]);
    const [messageArray, setMessageArray] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    // const [id, setId] = useState(0);


    const handleItemClick =(id, newITemArray, send) => {
        console.log(id)
        // if(id===(index+1)){
        //     setOpenMessage(openMessage);

        // }
        // setId(id);
        if(!send){
        if (id == messageArray[0]?.id) {
            setOpenMessage(!openMessage);
        }
        else{
            setOpenMessage(true);
        }
    }
console.log(messageArray)

        let NewMessageArray = [];
        NewMessageArray = newITemArray?.filter((items, i) => {
            return items?.id === id;
        })
        console.log(NewMessageArray)
        setMessageArray(NewMessageArray)
    }
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/codebuds-fk/chat/chats')
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res);
                setItemsList(res);
                setOriginalList(res);
            })
            .catch((e) => {
                alert(e);
            })
    }, [])
    const handleSearch = (search) => {
        console.log('====================================');
        console.log(search);
        console.log('====================================');
        if (search !== '') {
            let searchItems = [];
            console.log(ItemsList)
            searchItems = ItemsList?.filter((items) => {
                return Object.values(items)
                    .join(" ")
                    .toLowerCase()
                    .includes(search.toLowerCase());
            })
            setItemsList(searchItems)
        }
        else {
            setItemsList(originalList)
        }
    }
    const handleDebounceSearch = (func) => {
        let timer = null;
        return function (...args) {
            let context = this;
            if (timer) { clearTimeout(timer) }
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args)
            }, 500)
        }
    }
    const handleItemSearch = useCallback(handleDebounceSearch(handleSearch), [])

    const handleAddUSerMessage = useCallback((messageArray,send) => {
        var date = new Date();
        let messageId = 'newMsg'
        const newMessage = {
            message: userMessage,
            messageId: messageId,
            messageType: "text",
            sender: "USER",
            timestamp: date
        }

        // messageArray = [...messageArray,newMessage];
        console.log(messageArray, userMessage)
        let newITemArray = [];
        ItemsList?.map((items) => {
            if (items?.id === messageArray[0]?.id) {
                newITemArray = [...newITemArray, {
                    ...items,
                    messageList: [...items?.messageList, newMessage],
                }
                    // [...messageArray[0]?.messageList,...newMessage]
                ]
            }
            else {
                newITemArray = [...newITemArray, items]
            }
        })
        console.log(newITemArray)
        setItemsList(newITemArray)
        handleItemClick(messageArray[0]?.id, newITemArray,send)
        setUserMessage('');
    }, [ItemsList, userMessage])
    return {
        openMessage,
        setOpenMessage,
        messageArray,
        setMessageArray,
        ItemsList,
        setItemsList,
        handleItemClick,
        handleSearch,
        setUserMessage,
        handleAddUSerMessage,
        userMessage,
        handleItemSearch
    }
}
