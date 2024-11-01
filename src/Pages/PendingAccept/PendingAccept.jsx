import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Breadcrumb, Button, Empty, List, Typography } from 'antd'
import { useContext, useState } from 'react'
import './PendingAccept.scss'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../Contexts/AuthContext'
import { getListInviteGroup } from '../../apis/student'

export default function PendingAccept() {
     const { Title, Text } = Typography
     const { currentUser } = useContext(AuthContext)

     const { data: listInviteData } = useQuery({ queryKey: [`invite-list-${currentUser?.accountId}`], queryFn: () => getListInviteGroup(currentUser?.accountId) })

     console.log(listInviteData)

     const [invitations, setInvitations] = useState([
          { id: 1, groupName: "React Developers", inviter: "John Doe", avatar: "https://xsgames.co/randomusers/avatar.php?g=male", timestamp: "2 hours ago" },
          { id: 2, groupName: "UI/UX Designers", inviter: "Jane Smith", avatar: "https://xsgames.co/randomusers/avatar.php?g=female", timestamp: "5 hours ago" },
          { id: 3, groupName: "Data Scientists", inviter: "Bob Johnson", avatar: "https://xsgames.co/randomusers/avatar.php?g=male", timestamp: "1 day ago" },
          { id: 4, groupName: "Product Managers", inviter: "Alice Brown", avatar: "https://xsgames.co/randomusers/avatar.php?g=female", timestamp: "2 days ago" },
     ])

     const handleAccept = (id) => {
          setInvitations(invitations.filter(item => item.id !== id))
     }

     const handleDeny = (id) => {
          setInvitations(invitations.filter(item => item.id !== id))
     }

     return (
          <div className="group-invitation-list container">
               <Breadcrumb
                    style={{ padding: '20px 0' }}
                    items={[
                         {
                              title: <Link to='/'>Home</Link>,
                         },
                         {
                              title: <Link to='/browser-mentors'>Browse mentors</Link>,
                         },
                         {
                              title: 'Invitation Pending',
                         },
                    ]}
               />
               <div className="header">
                    <div className="header-content">
                         <Title level={2}>Group Invitations</Title>
                         <Text className="invitation-count">{invitations.length} Pending</Text>
                    </div>
               </div>
               <div className="content">
                    {invitations.length > 0 ? (
                         <List
                              className="invitation-list"
                              itemLayout="horizontal"
                              dataSource={invitations}
                              renderItem={(item) => (
                                   <List.Item className="invitation-item">
                                        <div className="item-main">
                                             <Avatar src={item.avatar} size={56} icon={<UserOutlined />} />
                                             <div className="item-info">
                                                  <Text strong className="group-name">{item.groupName}</Text>
                                                  <Text className="inviter">Invited by {item.inviter}</Text>
                                                  <Text className="timestamp">{item.timestamp}</Text>
                                             </div>
                                        </div>
                                        <div className="action-buttons">
                                             <Button
                                                  type="primary"
                                                  icon={<CheckOutlined />}
                                                  onClick={() => handleAccept(item.id)}
                                                  className="accept-btn"
                                             >
                                                  Accept
                                             </Button>
                                             <Button
                                                  danger
                                                  icon={<CloseOutlined />}
                                                  onClick={() => handleDeny(item.id)}
                                                  className="deny-btn"
                                             >
                                                  Deny
                                             </Button>
                                        </div>
                                   </List.Item>
                              )}
                         />
                    ) : (
                         <Empty
                              description="No pending invitations"
                              className="empty-state"
                         />
                    )}
               </div>
          </div>
     )
}