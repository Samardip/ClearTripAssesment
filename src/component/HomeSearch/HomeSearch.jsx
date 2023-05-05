import React, { useEffect, useState } from 'react'
import './HomeSearch.css'
import { useHomeSearch } from '../../utility/useHomeSearch'

export const HomeSearch = () => {
    const { openMessage,
        setOpenMessage,
        messageArray,
        setMessageArray,
        ItemsList,
        setItemsList,
        handleItemClick,
        handleSearch,
        handleAddUSerMessage,
        setUserMessage,
        userMessage,
        handleItemSearch
    } = useHomeSearch();

console.log(ItemsList,ItemsList[0]?.messageList[ItemsList[0]?.messageList?.length-1])
// let activeMessage = ItemLis
    return (
        <div className={'homeDiv'}>
            <div className='topDiv'>
                <div className={`${openMessage ? 'homeMessageDiv' : 'newDiv'}`}>
                    <h1 className='filterText'>
                        Filter by Title / Order ID
                    </h1>
                    <div className='inputParent'>
                        <input className='inputSearch' placeholder="Start typing to search" onChange={(e) => { handleItemSearch(e.target.value) }} />
                    </div>
                    {
                        ItemsList?.map((items, index) => {
                            var date = new Date(items?.latestMessageTimestamp);
                            // items[0]?.messageList[ItemsList[0]?.messageList?.length-1]

                            return (
                                <div className='parentItem' key={items.id}>
                                    <div className='newParentItem' onClick={(e) => { handleItemClick(items.id, ItemsList,index) }}>
                                        <div className='centerRow'>
                                            <img className='itemImg' src={items?.imageURL} alt="logo" />
                                        </div>
                                        <div className='itemDataParent'>
                                            <div className='itemData'>{items?.title}</div>
                                            <div className='itemData'>order :{items?.orderId}</div>
                                            <div>{items?.messageList[items?.messageList?.length-1]?.message}</div>
                                        </div>
                                        
                                    </div>
                                    <div className='centerRow borderGrey'>
                                        {date.getDay()}/{date.getMonth()}/{date.getFullYear()}
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
                {
                    openMessage &&
                    <>{messageArray[0]?.messageList?.length > 0 ?

                        <div className='messageDiv'>
                            <div className='messageHeading'>
                                <img className='itemImg' src={messageArray[0]?.imageURL} alt="logo" />
                                <div>{messageArray[0]?.title}</div>
                            </div>
                            <div className='gap'>
                                {
                                    messageArray[0]?.messageList?.map((items, index) => {
                                        return (
                                            <div>
                                                {
                                                    items?.sender === 'BOT' ?
                                                        <div className='botWidth'>
                                                            <div className='bot'>{items?.message}</div>

                                                        </div>
                                                        :
                                                        <div className='userWidth'>
                                                            <div className='user'>{items?.message}</div>

                                                        </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='messageParent'>
                                <div className='sendMessage'>
                                    <div className='inputParent'>
                                        <input className='inputSearch' placeholder="Start typing to search" value={userMessage} onChange={(e) => { setUserMessage(e.target.value) }} />
                                    </div>
                                    <button disabled={userMessage !== '' ? false : true} onClick={() => { handleAddUSerMessage(messageArray,true) }} style={{cursor:userMessage !== '' ?'pointer':''}}>Send</button>
                                </div>
                            </div>
                        </div>

                        :
                        <div className='messageDiv'>
                            <div className='messageHeading'>
                                <img className='itemImg' src={messageArray[0]?.imageURL} alt="logo" />
                                <div>{messageArray[0]?.title}</div>
                            </div>
                            <div className='messageBody'>
                                Send a Message to start chatting
                            </div>
                            <div className='messageParent'>
                                <div className='sendMessage'>
                                    <div className='inputParent'>
                                        <input className='inputSearch' value={userMessage} onChange={(e) => { setUserMessage(e.target.value) }} placeholder="Start typing to search" />
                                    </div>
                                    <button disabled={userMessage !== '' ? false : true} onClick={() => { handleAddUSerMessage(messageArray,true) }} style={{cursor:userMessage !== '' ?'pointer':''}}>Send</button>
                                </div>
                            </div>
                        </div>
                    }</>
                }
            </div>
        </div>
    )
}
