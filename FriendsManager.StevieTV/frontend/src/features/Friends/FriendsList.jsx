import React from "react"
import classnames from "classnames"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"

import "./FriendsList.css"


import { useGetFriendsQuery } from "../api/apiSlice.js"


let FriendEntry = ({ friend }) => {
  return (
    <React.Fragment>
      <Box sx={{ maxWidth: 475 }}>
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar>
                {friend.name.substring(0, 1)}
              </Avatar>
            }
            title={friend.name}
          />
          <CardContent>
            <dl>
              <dt>Last Contact Date</dt>
              <dd>{friend.lastContactDate}</dd>
              <dt>Last Contact Type</dt>
              <dd>{friend.lastContactType}</dd>
              <dt>Desired Contact Frequency</dt>
              <dd>{friend.desiredContactFrequency}</dd>
              <dt>Category</dt>
              <dd>{friend.category.name}</dd>
            </dl>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  )
}


export const FriendsList = () => {

  const {
    data: friends = [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetFriendsQuery()

  let content

  if (isLoading) {
    content = "LOADING..."
  } else if (isSuccess) {

    const containerClassname = classnames("friends-container", {
      disabled: isFetching
    })

    content = <div className={containerClassname}>{friends.map((friend) => (
      <FriendEntry key={friend.id} friend={friend} />
    ))
    }</div>
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }

  return (
    <section className="friends-list">
      <h2>Friends</h2>
      {content}
    </section>
  )
}